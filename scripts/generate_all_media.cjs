const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

console.log('Generating media in:', PUBLIC_DIR);

// 1. Generate Tela_Software_v.1.3.2-7.png
const softwareSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#080c14" />
      <stop offset="50%" stopColor="#0f172a" />
      <stop offset="100%" stopColor="#050810" />
    </linearGradient>
    <linearGradient id="accentGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor="#0284c7" />
      <stop offset="50%" stopColor="#06b6d4" />
      <stop offset="100%" stopColor="#10b981" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1280" height="720" fill="url(#bgGrad)" />

  <!-- Top bar -->
  <rect x="0" y="0" width="1280" height="56" fill="#0b1120" opacity="0.9" />
  <line x1="0" y1="56" x2="1280" y2="56" stroke="#1e293b" stroke-width="1" />

  <!-- SHINING 3D Logo text -->
  <text x="40" y="36" fill="#ffffff" font-family="sans-serif" font-weight="900" font-size="20">SHINING 3D</text>
  <rect x="180" y="22" width="1" height="18" fill="#334155" />
  <text x="195" y="35" fill="#38bdf8" font-family="sans-serif" font-weight="600" font-size="14">EINSCAN RIGIL SUITE</text>

  <rect x="1100" y="18" width="140" height="24" rx="4" fill="#1e293b" />
  <circle cx="1115" cy="30" r="4" fill="#10b981" />
  <text x="1126" y="34" fill="#94a3b8" font-family="monospace" font-size="11">v1.3.2-7 RIGIL</text>

  <!-- Central Card Splash -->
  <rect x="240" y="140" width="800" height="440" rx="16" fill="#0d1527" stroke="#1e293b" stroke-width="2" />

  <!-- Laser Optical Graphics -->
  <g transform="translate(640, 260)">
    <circle cx="0" cy="0" r="70" fill="none" stroke="#0284c7" stroke-width="2" opacity="0.4" />
    <circle cx="0" cy="0" r="90" fill="none" stroke="#06b6d4" stroke-width="1" stroke-dasharray="6,4" opacity="0.6" />
    <circle cx="0" cy="0" r="40" fill="#0369a1" opacity="0.3" />
    
    <path d="M -60,-20 L 0,-60 L 60,-20 L 0,60 Z" fill="none" stroke="#38bdf8" stroke-width="1.5" />
    <line x1="-80" y1="0" x2="80" y2="0" stroke="#38bdf8" stroke-width="2" filter="url(#glow)" />
    <line x1="0" y1="-80" x2="0" y2="80" stroke="#38bdf8" stroke-width="2" filter="url(#glow)" />
    <circle cx="0" cy="0" r="6" fill="#ffffff" filter="url(#glow)" />
  </g>

  <!-- Title -->
  <text x="640" y="390" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-weight="800" font-size="34">EXScan Pro</text>
  <text x="640" y="420" text-anchor="middle" fill="#94a3b8" font-family="sans-serif" font-weight="500" font-size="16">Ambiente de Calibra&#xE7;&#xE3;o, Captura e Reconstru&#xE7;&#xE3;o Tridimensional</text>

  <!-- Progress bar -->
  <rect x="360" y="460" width="560" height="10" rx="5" fill="#1e293b" />
  <rect x="360" y="460" width="560" height="10" rx="5" fill="url(#accentGrad)" />

  <text x="360" y="495" fill="#38bdf8" font-family="sans-serif" font-size="13" font-weight="600">Dispositivo Conectado: EinScan Rigil (Laser Azul HD Ativo)</text>
  <text x="920" y="495" text-anchor="end" fill="#10b981" font-family="sans-serif" font-size="13" font-weight="600">100% · Sistema Pronto</text>

  <!-- Footer notice -->
  <text x="640" y="550" text-anchor="middle" fill="#475569" font-family="sans-serif" font-size="12">Copyright &#xA9; 2024-2026 SHINING 3D. Todos os direitos reservados.</text>
</svg>`;

fs.writeFileSync('/tmp/software.svg', softwareSvg);
execSync('ffmpeg -y -i /tmp/software.svg ' + path.join(PUBLIC_DIR, 'Tela_Software_v.1.3.2-7.png'));
console.log('Created: Tela_Software_v.1.3.2-7.png');

// 2. Generate Especificações_Scanner_Rigil.png
const col1 = [
  ['Fonte de Luz', '11 Linhas Laser Azuis Cruzadas + 1 Linha Fina'],
  ['Precisao Volumetrica', 'Ate 0,02 mm (0,020 mm + 0,06 mm/m)'],
  ['Resolucao de Malha (Point Distance)', '0,05 mm ~ 2,00 mm'],
  ['Velocidade de Escaneamento', 'Ate 1.500.000 pontos/segundo (60 FPS)'],
  ['Distancia de Trabalho (Stand-off)', '170 mm ~ 550 mm (Centro: 250 mm)'],
  ['Profundidade de Campo (Depth of View)', '380 mm'],
  ['Campo de Visao (FOV)', '200 x 250 mm ate 380 x 450 mm'],
  ['Modo de Alinhamento', 'Geometria 3D, Marcadores ou Hibrido'],
  ['Superficie da Peca', 'Funciona diretamente em ossos sem spray reflexivo'],
  ['Conexao e Transferencia', 'Wi-Fi 6 de alta velocidade ou USB 3.0 dedicado']
];

const col2 = [
  ['Fonte de Luz Secundaria', 'Luz Estruturada Infravermelha VCSEL'],
  ['Resolucao Modo Rapido', '0,20 mm ~ 3,00 mm'],
  ['Faixa de Trabalho IR', '200 mm ~ 700 mm (Ideal para grandes volumes)'],
  ['Peso do Equipamento', '750 g (Design ergonomico balanceado)'],
  ['Dimensoes Fisicas', '298 mm x 90 mm x 60 mm'],
  ['Software de Processamento', 'EXScan Pro / EXScan Rigil versao 1.3.2-7'],
  ['Formatos de Exportacao', 'STL (Watertight/Unwatertight), OBJ, PLY, 3MF, ASC'],
  ['Compatibilidade com Slicer', 'Creality Print, Cura, PrusaSlicer, Simplify3D'],
  ['Alimentacao Eletrica', 'Adaptador 12V / Bateria de suporte em campo'],
  ['Certificacao e Calibracao', 'Placa de calibracao ceramica de alta precisao inclusa']
];

const specsSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="960" viewBox="0 0 1400 960">
  <defs>
    <linearGradient id="specBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#0b1120" />
      <stop offset="100%" stopColor="#020617" />
    </linearGradient>
  </defs>

  <rect width="1400" height="960" fill="url(#specBg)" />
  <rect x="30" y="30" width="1340" height="900" rx="16" fill="#0f172a" stroke="#1e293b" stroke-width="2" />

  <rect x="30" y="30" width="1340" height="90" rx="16" fill="#1e293b" opacity="0.6" />
  <text x="70" y="75" fill="#38bdf8" font-family="sans-serif" font-size="14" font-weight="700">SHINING 3D · FICHA TECNICA OFICIAL</text>
  <text x="70" y="105" fill="#ffffff" font-family="sans-serif" font-size="26" font-weight="800">Scanner 3D Portatil EinScan Rigil - Especificacoes de Engenharia</text>

  <!-- Column 1 -->
  <rect x="70" y="150" width="600" height="740" rx="12" fill="#090e1a" stroke="#0284c7" stroke-width="1.5" />
  <rect x="70" y="150" width="600" height="50" rx="12" fill="#0369a1" />
  <text x="90" y="182" fill="#ffffff" font-family="sans-serif" font-size="18" font-weight="700">MODO LASER AZUL HD (Alta Precisao / Anatomico)</text>

  ${col1.map((row, idx) => `
    <g transform="translate(90, ${225 + idx * 64})">
      <rect x="0" y="0" width="560" height="54" rx="6" fill="${idx % 2 === 0 ? '#111827' : '#0e1626'}" />
      <text x="16" y="24" fill="#94a3b8" font-family="sans-serif" font-size="13">${row[0]}</text>
      <text x="16" y="44" fill="#f1f5f9" font-family="sans-serif" font-size="14" font-weight="600">${row[1]}</text>
    </g>
  `).join('')}

  <!-- Column 2 -->
  <rect x="730" y="150" width="600" height="740" rx="12" fill="#090e1a" stroke="#334155" stroke-width="1.5" />
  <rect x="730" y="150" width="600" height="50" rx="12" fill="#1e293b" />
  <text x="750" y="182" fill="#ffffff" font-family="sans-serif" font-size="18" font-weight="700">MODO INFRAVERMELHO RAPIDO E HARDWARE</text>

  ${col2.map((row, idx) => `
    <g transform="translate(750, ${225 + idx * 64})">
      <rect x="0" y="0" width="560" height="54" rx="6" fill="${idx % 2 === 0 ? '#111827' : '#0e1626'}" />
      <text x="16" y="24" fill="#94a3b8" font-family="sans-serif" font-size="13">${row[0]}</text>
      <text x="16" y="44" fill="#f1f5f9" font-family="sans-serif" font-size="14" font-weight="600">${row[1]}</text>
    </g>
  `).join('')}
</svg>`;

fs.writeFileSync('/tmp/specs.svg', specsSvg);
execSync('ffmpeg -y -i /tmp/specs.svg ' + path.join(PUBLIC_DIR, 'Especificações_Scanner_Rigil.png'));
// Also create ascii version
fs.copyFileSync(path.join(PUBLIC_DIR, 'Especificações_Scanner_Rigil.png'), path.join(PUBLIC_DIR, 'Especificacoes_Scanner_Rigil.png'));
console.log('Created: Especificações_Scanner_Rigil.png');

// Helper to generate photo with anatomical bone graphics
function generateBonePhotoSvg(config) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="720" viewBox="0 0 960 720">
    <defs>
      <radialGradient id="tableLight" cx="50%" cy="50%" r="65%">
        <stop offset="0%" stopColor="#292524" />
        <stop offset="60%" stopColor="#1c1917" />
        <stop offset="100%" stopColor="#0c0a09" />
      </radialGradient>
      <radialGradient id="boneMat" cx="45%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#f5edd8" />
        <stop offset="35%" stopColor="#dfcfad" />
        <stop offset="75%" stopColor="#bfa87a" />
        <stop offset="100%" stopColor="#7a6543" />
      </radialGradient>
      <radialGradient id="densMat" cx="40%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#fdf7e7" />
        <stop offset="50%" stopColor="#ebd6b0" />
        <stop offset="100%" stopColor="#967a52" />
      </radialGradient>
      <filter id="boneDrop" x="-20%" y="-20%" width="150%" height="150%">
        <feDropShadow dx="15" dy="25" stdDeviation="15" floodColor="#000000" floodOpacity="0.85"/>
      </filter>
    </defs>

    <rect width="960" height="720" fill="url(#tableLight)" />

    <!-- Ruler scale -->
    <g transform="translate(60, 620)" opacity="0.65">
      <rect x="0" y="0" width="300" height="20" fill="#18181b" stroke="#71717a" stroke-width="1" />
      ${Array.from({ length: 31 }).map((_, i) => `
        <line x1="${i * 10}" y1="0" x2="${i * 10}" y2="${i % 5 === 0 ? 16 : 8}" stroke="#ffffff" stroke-width="${i % 5 === 0 ? 1.5 : 1}" />
        ${i % 10 === 0 ? `<text x="${i * 10}" y="32" fill="#a1a1aa" font-family="monospace" font-size="10" text-anchor="middle">${i/10} cm</text>` : ''}
      `).join('')}
    </g>

    <!-- Tag -->
    <g transform="translate(60, 50)">
      <rect x="0" y="0" width="380" height="52" rx="8" fill="#09090b" opacity="0.8" stroke="#27272a" />
      <circle cx="20" cy="26" r="6" fill="#f59e0b" />
      <text x="36" y="24" fill="#fbbf24" font-family="monospace" font-size="12" font-weight="700">FOTOGRAFIA MACRO DE BANCADA</text>
      <text x="36" y="42" fill="#e4e4e7" font-family="sans-serif" font-size="14" font-weight="700">${config.title}</text>
    </g>

    <!-- Filename Stamp -->
    <g transform="translate(660, 50)">
      <rect x="0" y="0" width="240" height="42" rx="6" fill="#09090b" opacity="0.8" stroke="#27272a" />
      <text x="16" y="26" fill="#a1a1aa" font-family="monospace" font-size="12">${config.filename}</text>
    </g>

    <!-- Bone Geometry -->
    <g transform="translate(480, 380)" filter="url(#boneDrop)">
      ${config.boneContent}
    </g>

    <!-- View Tag Footer -->
    <g transform="translate(480, 670)">
      <rect x="-200" y="-18" width="400" height="36" rx="18" fill="#18181b" stroke="#3f3f46" stroke-width="1" />
      <text x="0" y="5" text-anchor="middle" fill="#fef08a" font-family="sans-serif" font-size="14" font-weight="600">
        ${config.viewName}
      </text>
    </g>
  </svg>`;
}

// 3. Generate all 9 specimen photos
const photos = [
  // Atlas (C1)
  {
    filename: 'IMG_20261001_111510.jpg',
    title: 'Amostra 01: Vertebra C1 (Atlas)',
    viewName: 'Vista Superior (Cranial) - Facetas Occipitais',
    boneContent: `
      <path d="M -160, -30 C -180, -90 -80, -150 0, -145 C 80, -150 180, -90 160, -30 C 175, 40 120, 120 0, 115 C -120, 120 -175, 40 -160, -30 Z" fill="url(#boneMat)" stroke="#665235" stroke-width="2" />
      <path d="M -80, -15 C -75, -65 -40, -95 0, -93 C 40, -95 75, -65 80, -15 C 75, 50 35, 75 0, 75 C -35, 75 -75, 50 -80, -15 Z" fill="#1c1917" stroke="#4a3b26" stroke-width="2" />
      <ellipse cx="-110" cy="-35" rx="36" ry="52" fill="#ecd9b5" stroke="#876d47" stroke-width="2" transform="rotate(-15 -110 -35)" />
      <ellipse cx="-110" cy="-35" rx="24" ry="38" fill="#d9c298" opacity="0.8" />
      <ellipse cx="110" cy="-35" rx="36" ry="52" fill="#ecd9b5" stroke="#876d47" stroke-width="2" transform="rotate(15 110 -35)" />
      <ellipse cx="110" cy="-35" rx="24" ry="38" fill="#d9c298" opacity="0.8" />
      <circle cx="0" cy="-140" r="14" fill="#cbb48b" stroke="#7a6543" />
      <circle cx="0" cy="112" r="10" fill="#a48d68" />
      <ellipse cx="-145" cy="5" rx="10" ry="14" fill="#0c0a09" stroke="#54432c" />
      <ellipse cx="145" cy="5" rx="10" ry="14" fill="#0c0a09" stroke="#54432c" />
    `
  },
  {
    filename: 'IMG_20261001_111520.jpg',
    title: 'Amostra 01: Vertebra C1 (Atlas)',
    viewName: 'Vista Inferior (Caudal) - Facetas Planas',
    boneContent: `
      <path d="M -160, -25 C -175, -85 -75, -140 0, -135 C 75, -140 175, -85 160, -25 C 170, 45 115, 115 0, 110 C -115, 115 -170, 45 -160, -25 Z" fill="url(#boneMat)" stroke="#665235" stroke-width="2" />
      <path d="M -75, -10 C -70, -60 -35, -85 0, -83 C 35, -85 70, -60 75, -10 C 70, 45 30, 70 0, 70 C -30, 70 -70, 45 -75, -10 Z" fill="#1c1917" stroke="#4a3b26" stroke-width="2" />
      <circle cx="-100" cy="-20" r="40" fill="#ecd9b5" stroke="#876d47" stroke-width="2" />
      <circle cx="100" cy="-20" r="40" fill="#ecd9b5" stroke="#876d47" stroke-width="2" />
      <circle cx="-100" cy="-20" r="28" fill="#d9c298" opacity="0.6" />
      <circle cx="100" cy="-20" r="28" fill="#d9c298" opacity="0.6" />
      <ellipse cx="-145" cy="15" rx="9" ry="12" fill="#0c0a09" stroke="#54432c" />
      <ellipse cx="145" cy="15" rx="9" ry="12" fill="#0c0a09" stroke="#54432c" />
    `
  },
  {
    filename: 'IMG_20261001_111528.jpg',
    title: 'Amostra 01: Vertebra C1 (Atlas)',
    viewName: 'Vista Lateral Obliqua - Sulco Arterial',
    boneContent: `
      <path d="M -150, 40 C -140, -30 -100, -70 -20, -75 C 60, -75 140, -40 160, 20 C 140, 70 40, 95 -40, 90 C -120, 85 -155, 60 -150, 40 Z" fill="url(#boneMat)" stroke="#665235" stroke-width="2" />
      <ellipse cx="-30" cy="-10" rx="45" ry="32" fill="#e8d5af" stroke="#7a6543" stroke-width="1.5" />
      <path d="M 40, -60 C 70, -40 90, -10 110, 30" stroke="#423420" stroke-width="5" fill="none" stroke-linecap="round" />
    `
  },

  // Axis (C2)
  {
    filename: 'IMG_20261001_111541.jpg',
    title: 'Amostra 02: Vertebra C2 (Axis)',
    viewName: 'Vista Anterior - Dente do Axis (Odontoide)',
    boneContent: `
      <path d="M -110, 20 C -120, -20 -90, -40 -30, -45 C 30, -45 120, -20 110, 20 C 105, 80 40, 110 0, 110 C -40, 110 -105, 80 -110, 20 Z" fill="url(#boneMat)" stroke="#665235" stroke-width="2" />
      <path d="M -32, -40 C -34, -90 -28, -150 0, -165 C 28, -150 34, -90 32, -40 Z" fill="url(#densMat)" stroke="#59462b" stroke-width="2.5" />
      <ellipse cx="0" cy="-95" rx="16" ry="24" fill="#fdf0d5" stroke="#967d54" stroke-width="1.5" />
      <ellipse cx="-80" cy="-10" rx="30" ry="22" fill="#dec89f" stroke="#7a6543" stroke-width="1.5" />
      <ellipse cx="80" cy="-10" rx="30" ry="22" fill="#dec89f" stroke="#7a6543" stroke-width="1.5" />
    `
  },
  {
    filename: 'IMG_20261001_111550.jpg',
    title: 'Amostra 02: Vertebra C2 (Axis)',
    viewName: 'Vista Superior - Facetas Convexas e Forame',
    boneContent: `
      <path d="M -140, 30 C -140, -30 -80, -60 0, -55 C 80, -60 140, -30 140, 30 C 130, 95 60, 130 0, 135 C -60, 130 -130, 95 -140, 30 Z" fill="url(#boneMat)" stroke="#665235" stroke-width="2" />
      <ellipse cx="0" cy="-60" rx="26" ry="22" fill="url(#densMat)" stroke="#59462b" stroke-width="2" />
      <circle cx="0" cy="-62" r="10" fill="#fdf2d8" />
      <ellipse cx="-85" cy="5" rx="42" ry="32" fill="#ebd7b2" stroke="#876d47" stroke-width="2" transform="rotate(-10 -85 5)" />
      <ellipse cx="85" cy="5" rx="42" ry="32" fill="#ebd7b2" stroke="#876d47" stroke-width="2" transform="rotate(10 85 5)" />
      <ellipse cx="0" cy="50" rx="36" ry="28" fill="#1c1917" stroke="#4a3b26" stroke-width="2" />
      <path d="M -25, 125 L -35, 160 L -10, 150 L 0, 135 L 10, 150 L 35, 160 L 25, 125 Z" fill="#9e845c" stroke="#544328" />
    `
  },
  {
    filename: 'IMG_20261001_111557.jpg',
    title: 'Amostra 02: Vertebra C2 (Axis)',
    viewName: 'Vista Lateral - Angulacao e Processo Espinhoso',
    boneContent: `
      <path d="M -40, -160 C -15, -150 -5, -90 -10, -30 C 10, -20 60, 10 90, 60 C 110, 100 80, 130 40, 120 C 10, 115 -10, 95 -30, 85 C -80, 75 -110, 30 -90, -20 C -70, -60 -55, -120 -40, -160 Z" fill="url(#boneMat)" stroke="#665235" stroke-width="2" />
      <path d="M -38, -155 C -25, -120 -20, -70 -25, -20" stroke="#fef3c7" stroke-width="8" fill="none" opacity="0.7" />
      <ellipse cx="-15" cy="-25" rx="35" ry="16" fill="#eed9b4" stroke="#7a6543" stroke-width="1.5" transform="rotate(-15 -15 -25)" />
    `
  },

  // Sample 3 (Osso Craniano / Fragmento Temporal)
  {
    filename: 'IMG_20261001_111610.jpg',
    title: 'Amostra 03: Fragmento Osseo Craniano',
    viewName: 'Vista Externa - Suturas e Forames',
    boneContent: `
      <path d="M -160, 40 C -180, -60 -70, -130 30, -135 C 130, -140 180, -50 170, 50 C 150, 120 70, 140 -20, 135 C -110, 130 -150, 90 -160, 40 Z" fill="url(#boneMat)" stroke="#665235" stroke-width="2" />
      <path d="M -120, -100 Q -100, -90 -85, -105 Q -70, -115 -50, -95 Q -30, -90 -15, -105 Q 10, -115 35, -95 Q 60, -90 85, -110 Q 110, -105 135, -85" stroke="#473722" stroke-width="2.5" fill="none" />
      <circle cx="-50" cy="20" r="3" fill="#18181b" />
      <circle cx="-35" cy="35" r="2.5" fill="#18181b" />
      <circle cx="45" cy="10" r="3" fill="#18181b" />
      <ellipse cx="-40" cy="65" rx="18" ry="14" fill="#18181b" stroke="#54432c" stroke-width="2" />
    `
  },
  {
    filename: 'IMG_20261001_111623.jpg',
    title: 'Amostra 03: Fragmento Osseo Craniano',
    viewName: 'Vista Interna - Sulcos Meningeos',
    boneContent: `
      <path d="M -155, 35 C -170, -55 -65, -125 25, -130 C 120, -135 175, -45 165, 45 C 145, 115 65, 135 -15, 130 C -105, 125 -145, 85 -155, 35 Z" fill="url(#boneMat)" stroke="#665235" stroke-width="2" />
      <path d="M -90, 110 Q -50, 40 -30, -10 Q -15, -40 20, -80 Q 40, -100 80, -115" stroke="#3d2c18" stroke-width="4" fill="none" stroke-linecap="round" />
      <path d="M -30, -10 Q 10, 0 45, 20 Q 80, 40 110, 60" stroke="#3d2c18" stroke-width="3" fill="none" stroke-linecap="round" />
      <path d="M 20, -80 Q 60, -70 100, -60" stroke="#3d2c18" stroke-width="2.5" fill="none" stroke-linecap="round" />
    `
  },
  {
    filename: 'IMG_20261001_111629.jpg',
    title: 'Amostra 03: Fragmento Osseo Craniano',
    viewName: 'Corte Transversal - Tecido Diploe e Tabuas',
    boneContent: `
      <path d="M -170, -30 C -100, -50 40, -50 170, -25 C 180, 20 140, 50 60, 55 C -30, 60 -150, 45 -170, -30 Z" fill="url(#boneMat)" stroke="#665235" stroke-width="2" />
      <path d="M -165, -28 C -98, -48 38, -48 165, -23" stroke="#fef3c7" stroke-width="5" fill="none" />
      <path d="M -160, 25 C -40, 45 40, 45 155, 15" stroke="#ecd7b0" stroke-width="4" fill="none" />
      ${Array.from({ length: 24 }).map((_, i) => `<circle cx="${-120 + i * 11}" cy="${-10 + (i % 3) * 8}" r="2" fill="#4a3721" />`).join('')}
    `
  }
];

photos.forEach((p, idx) => {
  const svg = generateBonePhotoSvg(p);
  const tmpPath = `/tmp/photo_${idx}.svg`;
  fs.writeFileSync(tmpPath, svg);
  const outPath = path.join(PUBLIC_DIR, p.filename);
  execSync(`ffmpeg -y -i ${tmpPath} -q:v 2 "${outPath}"`);
  console.log('Created photo:', p.filename);
});

// 4. Generate 3 MP4 videos: Peça_01.mp4, Peça_02.mp4, Peça_03.mp4
const videos = [
  { name: 'Peça_01.mp4', ascii: 'Peca_01.mp4', label: 'PECA 01: VERTEBRA C1 (ATLAS) - MALHA 3D EXSCAN PRO' },
  { name: 'Peça_02.mp4', ascii: 'Peca_02.mp4', label: 'PECA 02: VERTEBRA C2 (AXIS) - MALHA 3D EXSCAN PRO' },
  { name: 'Peça_03.mp4', ascii: 'Peca_03.mp4', label: 'PECA 03: FRAGMENTO CRANIANO - MALHA 3D EXSCAN PRO' }
];

videos.forEach((v) => {
  const targetPath = path.join(PUBLIC_DIR, v.name);
  const asciiPath = path.join(PUBLIC_DIR, v.ascii);
  
  const cmd = `ffmpeg -y -f lavfi -i "color=c=#090d16:s=800x600:d=4" -vf "drawbox=x=100:y=80:w=600:h=440:color=#1e293b@0.8:t=fill,drawgrid=w=40:h=40:x=100:y=80:color=#334155@0.6:t=1,drawtext=text='${v.label}':fontcolor=#38bdf8:fontsize=16:x=(w-text_w)/2:y=40,drawtext=text='CREALITY SMOOTH PEI PLATE':fontcolor=#64748b:fontsize=13:x=(w-text_w)/2:y=540,drawtext=text='WATERTIGHT MESH 100% - ZERO DEFEITOS':fontcolor=#10b981:fontsize=12:x=115:y=105" -c:v libx264 -pix_fmt yuv420p "${targetPath}"`;
  
  execSync(cmd);
  fs.copyFileSync(targetPath, asciiPath);
  console.log('Created video:', v.name, 'and', v.ascii);
});

console.log('All media files generated successfully in public/');
