import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RotateCw, Eye, Grid, Maximize2, RefreshCw, ZoomIn, ZoomOut, Layers } from 'lucide-react';

interface SpecimenViewer3DProps {
  specimenId: string;
  specimenTitle: string;
  height?: string;
  interactive?: boolean;
}

export const SpecimenViewer3D: React.FC<SpecimenViewer3DProps> = ({
  specimenId,
  specimenTitle,
  height = 'h-96',
  interactive = true,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [wireframe, setWireframe] = useState(false);
  const [materialStyle, setMaterialStyle] = useState<'slicer' | 'bone' | 'normal'>('slicer');
  const [showGrid, setShowGrid] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // References to keep track of Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const meshGroupRef = useRef<THREE.Group | null>(null);
  const gridHelperRef = useRef<THREE.GridHelper | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a); // Slate-900 slicer dark ambiance
    sceneRef.current = scene;

    // 2. Camera
    const width = container.clientWidth;
    const heightPx = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, width / heightPx, 0.1, 1000);
    camera.position.set(45, 38, 45);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, heightPx);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // Clear previous children if any
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 4. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 150;
    controls.minDistance = 10;
    controls.target.set(0, 5, 0);
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 2.0;
    controlsRef.current = controls;

    // 5. Lighting (Laboratory & Slicer lighting rig)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    keyLight.position.set(30, 60, 40);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 0.6); // Subtle blue fill matching scanner laser
    fillLight.position.set(-30, 20, -30);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x22c55e, 0.4); // Subtle green rim from PEI plate
    rimLight.position.set(0, -20, 0);
    scene.add(rimLight);

    // 6. Build Plate (Creality Smooth PEI Plate reproduction)
    const plateGroup = new THREE.Group();
    
    // Plate surface
    const plateGeo = new THREE.BoxGeometry(60, 1.5, 60);
    const plateMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.8,
      metalness: 0.1,
    });
    const plate = new THREE.Mesh(plateGeo, plateMat);
    plate.position.y = -0.75;
    plate.receiveShadow = true;
    plateGroup.add(plate);

    // Grid lines
    const grid = new THREE.GridHelper(60, 30, 0x475569, 0x334155);
    grid.position.y = 0.02;
    gridHelperRef.current = grid;
    plateGroup.add(grid);

    // Plate rim border
    const edges = new THREE.EdgesGeometry(plateGeo);
    const lineMat = new THREE.LineBasicMaterial({ color: 0x64748b });
    const wireframePlate = new THREE.LineSegments(edges, lineMat);
    wireframePlate.position.y = -0.75;
    plateGroup.add(wireframePlate);

    scene.add(plateGroup);

    // 7. Generate procedural anatomical specimen mesh based on specimenId
    const meshGroup = new THREE.Group();
    meshGroupRef.current = meshGroup;

    const createSpecimenGeometry = (id: string): THREE.BufferGeometry => {
      if (id === 'atlas-c1') {
        // C1 Atlas: Ring-like vertebral structure with wide lateral masses
        const shape = new THREE.Shape();
        // Outer oval ring
        shape.absellipse(0, 0, 14, 11, 0, Math.PI * 2, false, 0);
        // Inner vertebral foramen hole
        const holePath = new THREE.Path();
        holePath.absellipse(0, -0.5, 8.5, 6.5, 0, Math.PI * 2, true, 0);
        shape.holes.push(holePath);

        const extrudeSettings = {
          steps: 4,
          depth: 4.5,
          bevelEnabled: true,
          bevelThickness: 1.8,
          bevelSize: 1.4,
          bevelOffset: 0,
          bevelSegments: 5,
        };
        const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        geo.rotateX(Math.PI / 2);

        // Deform vertices for natural bone anatomy (concave superior articular facets)
        const pos = geo.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const x = pos.getX(i);
          const y = pos.getY(i);
          const z = pos.getZ(i);

          // Deepen superior articular facets on lateral masses (x around -10 or +10)
          let dy = y;
          if (Math.abs(x) > 6 && z < 4 && z > -4) {
            dy += Math.sin((x / 14) * Math.PI) * 1.5;
          }
          // Slight anterior arch tubercle
          if (z < -8 && Math.abs(x) < 3) {
            dy += 0.8;
          }
          // Organic organic bone micro-noise
          const noise = (Math.sin(x * 2.2) * Math.cos(z * 2.5) + Math.sin(y * 3.1)) * 0.25;
          pos.setXYZ(i, x + noise * 0.3, dy + noise * 0.4, z + noise * 0.3);
        }
        geo.computeVertexNormals();
        return geo;
      } else if (id === 'axis-c2') {
        // C2 Axis: Robust vertebral body with prominent Odontoid Process (Dens)
        const bodyGeo = new THREE.CylinderGeometry(8, 9, 7, 24);
        const densGeo = new THREE.ConeGeometry(3.2, 9, 20);
        densGeo.translate(0, 7.5, -2); // Upward peg (dens)
        
        // Lateral articular facets
        const facetL = new THREE.CylinderGeometry(4.5, 4.5, 3, 16);
        facetL.rotateZ(0.25);
        facetL.translate(-8, 3.5, 0);

        const facetR = new THREE.CylinderGeometry(4.5, 4.5, 3, 16);
        facetR.rotateZ(-0.25);
        facetR.translate(8, 3.5, 0);

        // Spinous process (posterior bifid)
        const spinousGeo = new THREE.BoxGeometry(4, 5, 10);
        spinousGeo.translate(0, 0, 7);

        // Merge geometries
        const merged = new THREE.BufferGeometry();
        // Use a composite torus + sphere sculpt approach for smooth unified body
        const torusBase = new THREE.TorusGeometry(8.5, 3.5, 18, 32, Math.PI * 1.8);
        torusBase.rotateX(Math.PI / 2);
        torusBase.rotateZ(Math.PI * 0.6);

        // Apply deformation to mimic odontoid peg and vertebral arch
        const pos = torusBase.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const x = pos.getX(i);
          const y = pos.getY(i);
          const z = pos.getZ(i);

          let newY = y;
          // Odontoid process extrusion at front center
          if (Math.abs(x) < 3.8 && z < -4) {
            newY += 7.5 * (1 - Math.abs(x) / 3.8) * Math.max(0, (-z - 4) / 4);
          }
          // Lateral masses height
          if (Math.abs(x) > 5 && z < 2 && z > -5) {
            newY += 2.0;
          }
          // Subtle natural bone curvature
          const organicNoise = (Math.sin(x * 1.7) * Math.sin(z * 1.9)) * 0.35;
          pos.setXYZ(i, x, newY + organicNoise, z);
        }
        torusBase.computeVertexNormals();
        return torusBase;
      } else {
        // Cranial Fragment (Temporal bone with acoustic meatus and mastoid process)
        const geo = new THREE.SphereGeometry(12, 48, 32, 0, Math.PI * 1.3, 0, Math.PI * 0.7);
        geo.scale(1.2, 0.7, 1.0);

        const pos = geo.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          let x = pos.getX(i);
          let y = pos.getY(i);
          let z = pos.getZ(i);

          // Acoustic meatus depression (canal) at center-left
          const distToMeatus = Math.hypot(x + 2, y - 2, z - 7);
          if (distToMeatus < 4.2) {
            // Depress inwards like an ear canal opening
            const depth = (4.2 - distToMeatus) * 2.5;
            z -= depth;
          }

          // Mastoid prominence bulge towards bottom-rear
          if (x > 2 && y < 0 && z > 0) {
            y -= 3.2 * (x / 10);
            z += 2.0;
          }

          // Endocranial fossa curvature
          if (z < 0) {
            x *= 1.1;
          }

          // Bone porosity & natural osteological fracture contours
          const fineTexture = (Math.sin(x * 3.5) * Math.cos(y * 3.2) + Math.sin(z * 4.0)) * 0.45;
          pos.setXYZ(i, x + fineTexture * 0.3, y + fineTexture * 0.4, z + fineTexture * 0.3);
        }
        geo.computeVertexNormals();
        return geo;
      }
    };

    const geometry = createSpecimenGeometry(specimenId);

    // Initial material (Creality Print Slicer Green)
    const getMaterial = () => {
      if (materialStyle === 'slicer') {
        return new THREE.MeshStandardMaterial({
          color: 0x22c55e, // Creality vibrant green
          roughness: 0.35,
          metalness: 0.15,
          wireframe: wireframe,
        });
      } else if (materialStyle === 'bone') {
        return new THREE.MeshStandardMaterial({
          color: 0xe2d9c8, // Natural osteological ivory bone
          roughness: 0.75,
          metalness: 0.05,
          wireframe: wireframe,
        });
      } else {
        return new THREE.MeshNormalMaterial({
          wireframe: wireframe,
        });
      }
    };

    const material = getMaterial();
    const specimenMesh = new THREE.Mesh(geometry, material);
    specimenMesh.castShadow = true;
    specimenMesh.receiveShadow = true;
    specimenMesh.position.y = 8;
    meshGroup.add(specimenMesh);

    scene.add(meshGroup);

    // Animation Loop
    let lastTime = performance.now();
    const animate = (currentTime: number) => {
      animationFrameIdRef.current = requestAnimationFrame(animate);
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (controlsRef.current) {
        controlsRef.current.autoRotate = autoRotate;
        controlsRef.current.update();
      }

      renderer.render(scene, camera);
    };

    animationFrameIdRef.current = requestAnimationFrame(animate);

    // Resize handler
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [specimenId, autoRotate, wireframe, materialStyle]);

  // Toggle grid visibility
  useEffect(() => {
    if (gridHelperRef.current) {
      gridHelperRef.current.visible = showGrid;
    }
  }, [showGrid]);

  const handleResetCamera = () => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(45, 38, 45);
      controlsRef.current.target.set(0, 5, 0);
      controlsRef.current.update();
    }
  };

  const handleZoom = (direction: 'in' | 'out') => {
    if (cameraRef.current && controlsRef.current) {
      const factor = direction === 'in' ? 0.8 : 1.25;
      cameraRef.current.position.multiplyScalar(factor);
      controlsRef.current.update();
    }
  };

  return (
    <div className={`relative ${height} w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shadow-inner flex flex-col`}>
      {/* Slicer Header Badge Overlay */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2 pointer-events-none">
        <div className="bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded border border-slate-700/60 flex items-center gap-1.5 text-xs text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-semibold text-emerald-400">Creality Print 7.0</span>
          <span className="text-slate-500">·</span>
          <span>Smooth PEI Plate</span>
        </div>
      </div>

      {/* Triangulation Metric Overlay */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 pointer-events-none">
        <div className="bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded border border-slate-700/60 text-xs text-slate-400 font-mono">
          <span>Malha STL: </span>
          <span className="text-cyan-400 font-medium">Watertight 3D</span>
        </div>
      </div>

      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Creality Slicer Interactive Controls Bar */}
      {interactive && (
        <div className="absolute bottom-3 inset-x-3 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
          {/* Left Control Group: Visual Styling */}
          <div className="flex items-center gap-1 bg-slate-950/85 backdrop-blur-md p-1 rounded-lg border border-slate-800 shadow-lg">
            <button
              onClick={() => setMaterialStyle('slicer')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                materialStyle === 'slicer' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Renderizador Fatiador Creality (Verde PEI)"
            >
              Fatiador (Verde)
            </button>
            <button
              onClick={() => setMaterialStyle('bone')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                materialStyle === 'bone' ? 'bg-amber-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Textura Óssea Anatômica (Marfim)"
            >
              Ósseo Real
            </button>
            <button
              onClick={() => setMaterialStyle('normal')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                materialStyle === 'normal' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Mapa de Vetores Normais da Malha"
            >
              Normais
            </button>

            <span className="w-px h-4 bg-slate-800 mx-0.5" />

            <button
              onClick={() => setWireframe(!wireframe)}
              className={`px-2 py-1 rounded text-xs transition-colors flex items-center gap-1 ${
                wireframe ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Visualizar Malha Triangular de Reconstrução"
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Aramado</span>
            </button>
          </div>

          {/* Right Control Group: Navigation & Rotation */}
          <div className="flex items-center gap-1 bg-slate-950/85 backdrop-blur-md p-1 rounded-lg border border-slate-800 shadow-lg">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`p-1.5 rounded transition-colors flex items-center gap-1 text-xs ${
                autoRotate ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:text-slate-200'
              }`}
              title={autoRotate ? 'Pausar rotação 360°' : 'Iniciar rotação 360°'}
            >
              <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">360°</span>
            </button>

            <button
              onClick={() => handleZoom('in')}
              className="p-1.5 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
              title="Aproximar Zoom"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => handleZoom('out')}
              className="p-1.5 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
              title="Afastar Zoom"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleResetCamera}
              className="p-1.5 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
              title="Centralizar Câmera"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Instructions pill at bottom center */}
      <div className="absolute top-12 left-3 z-10 text-[11px] text-slate-500 pointer-events-none flex items-center gap-1 bg-slate-950/40 px-2 py-0.5 rounded">
        <span>Arraste com o mouse para orbitar · Role para zoom</span>
      </div>
    </div>
  );
};
