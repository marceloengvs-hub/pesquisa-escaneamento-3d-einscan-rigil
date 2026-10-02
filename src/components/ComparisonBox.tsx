import React, { useState, useRef, useEffect } from 'react';
import { SpecimenData } from '../data/researchData';
import { SpecimenViewer3D } from './SpecimenViewer3D';
import { 
  Play, 
  Pause, 
  CheckCircle2, 
  Info, 
  Compass, 
  ZoomIn, 
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Camera,
  Film,
  Download,
  X,
  Image as ImageIcon,
  Box,
  Layers,
  Target,
  Activity,
  RotateCw
} from 'lucide-react';

interface ComparisonBoxProps {
  specimen: SpecimenData;
  onOpenDetails: (specimen: SpecimenData) => void;
}

export const ComparisonBox: React.FC<ComparisonBoxProps> = ({ specimen, onOpenDetails }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [leftTab, setLeftTab] = useState<'video' | 'photos'>('video');
  const [activeTab, setActiveTab] = useState<'photos' | '3d-interactive' | 'video-player' | 'gif-player'>('photos');
  const [isPlayingVideo, setIsPlayingVideo] = useState(true);
  const [isLeftVideoPlaying, setIsLeftVideoPlaying] = useState(true);
  const [videoSpeed, setVideoSpeed] = useState<number>(1);
  const [leftVideoSpeed, setLeftVideoSpeed] = useState<number>(1);
  const [isPhotoLightboxOpen, setIsPhotoLightboxOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const leftVideoRef = useRef<HTMLVideoElement | null>(null);

  const safePhotoIndex = selectedPhotoIndex < specimen.photos.length ? selectedPhotoIndex : 0;
  const currentPhoto = specimen.photos[safePhotoIndex] || specimen.photos[0];
  const activeImageUrl = currentPhoto?.url || '';
  const activeVideoUrl = specimen.videoUrl;
  const activeGifUrl = specimen.gifUrl || specimen.videoUrl;

  useEffect(() => {
    setSelectedPhotoIndex(0);
  }, [specimen.id]);

  useEffect(() => {
    if (leftTab === 'video' && leftVideoRef.current) {
      leftVideoRef.current.play().catch(() => {});
      setIsLeftVideoPlaying(true);
    }
  }, [leftTab, specimen.id]);

  useEffect(() => {
    if (activeTab === 'video-player' && videoRef.current) {
      videoRef.current.play().catch(() => {});
      setIsPlayingVideo(true);
    }
  }, [activeTab, specimen.id]);

  const toggleLeftVideoPlay = () => {
    if (leftVideoRef.current) {
      if (leftVideoRef.current.paused) {
        leftVideoRef.current.play();
        setIsLeftVideoPlaying(true);
      } else {
        leftVideoRef.current.pause();
        setIsLeftVideoPlaying(false);
      }
    }
  };

  const handleLeftSpeedChange = (speed: number) => {
    setLeftVideoSpeed(speed);
    if (leftVideoRef.current) {
      leftVideoRef.current.playbackRate = speed;
    }
  };

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlayingVideo(true);
      } else {
        videoRef.current.pause();
        setIsPlayingVideo(false);
      }
    }
  };

  const handleSpeedChange = (speed: number) => {
    setVideoSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const handleSwapPanels = () => {
    if (leftTab === 'video') {
      setLeftTab('photos');
      setActiveTab('video-player');
    } else {
      setLeftTab('video');
      setActiveTab('3d-interactive');
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:border-slate-700/80 transition-all duration-300">
      {/* Box Header: Specimen Identity and Navigation Actions */}
      <div className="p-5 md:p-6 border-b border-slate-800/80 bg-slate-950/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-medium tracking-wide uppercase mb-1">
            <span>{specimen.sampleTag}</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400">{specimen.category}</span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            {specimen.title}
          </h3>
          <p className="text-xs md:text-sm text-slate-400 italic font-serif">
            {specimen.scientificName}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
          <button
            onClick={handleSwapPanels}
            className="px-2.5 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors flex items-center gap-1"
            title="Inverter mídia entre o quadro esquerdo e direito"
          >
            <RotateCw className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Inverter Quadros</span>
          </button>

          <button
            onClick={() => onOpenDetails(specimen)}
            className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors flex items-center gap-1"
          >
            <Info className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Ficha Completa</span>
          </button>
        </div>
      </div>

      {/* Main Comparative Arena */}
      <div className="p-5 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* LEFT COLUMN: Vídeo MP4 em Execução Contínua (Default) OU Foto Real */}
            <div className="flex flex-col bg-slate-950/90 rounded-xl border border-slate-800 overflow-hidden shadow-inner">
              {/* Card Label Bar */}
              <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  {leftTab === 'video' ? (
                    <>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50 animate-pulse"></span>
                      <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                        <Film className="w-3.5 h-3.5 text-emerald-400" />
                        Quadro Esquerdo: Vídeo MP4 (Em Execução)
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50"></span>
                      <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                        <Camera className="w-3.5 h-3.5 text-amber-400" />
                        Foto do Objeto Real (Espécime)
                      </span>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {leftTab === 'photos' && (
                    <span className="text-amber-400/90 font-mono text-[11px] bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/50">
                      {currentPhoto.fileName} ({selectedPhotoIndex + 1}/{specimen.photos.length})
                    </span>
                  )}
                  {/* Selector tabs on left card */}
                  <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded border border-slate-800 text-[11px]">
                    <button
                      onClick={() => setLeftTab('video')}
                      className={`px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 ${
                        leftTab === 'video'
                          ? 'bg-emerald-600 text-white font-medium shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                      title="Exibir vídeo MP4 em execução contínua"
                    >
                      <Film className="w-3 h-3 text-emerald-300" />
                      <span>Vídeo MP4</span>
                    </button>
                    <button
                      onClick={() => setLeftTab('photos')}
                      className={`px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 ${
                        leftTab === 'photos'
                          ? 'bg-amber-600 text-white font-medium shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                      title="Exibir fotos reais do espécime"
                    >
                      <Camera className="w-3 h-3 text-amber-300" />
                      <span>Fotos</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Left Display Frame */}
              <div className="relative h-80 sm:h-96 w-full bg-slate-950 flex items-center justify-center overflow-hidden group">
                {leftTab === 'video' ? (
                  /* Video MP4 Player Live Running */
                  <div className="w-full h-full flex flex-col justify-between bg-slate-950 relative overflow-hidden group">
                    <video
                      ref={leftVideoRef}
                      src={activeVideoUrl}
                      className="w-full h-full object-contain bg-slate-950"
                      loop
                      autoPlay
                      muted
                      playsInline
                      onPlay={() => setIsLeftVideoPlaying(true)}
                      onPause={() => setIsLeftVideoPlaying(false)}
                    />

                    {/* Video Watermark Badge */}
                    <div className="absolute top-3 left-3 z-10 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-700/70 text-[11px] flex items-center gap-1.5 shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span className="text-emerald-400 font-semibold">{specimen.videoFileName}</span>
                      <span className="text-slate-600">·</span>
                      <span className="text-slate-300">Vídeo MP4 em Execução</span>
                    </div>

                    {/* Download action top-right */}
                    <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                      <a
                        href={activeVideoUrl}
                        download={specimen.videoFileName}
                        className="bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 px-2 py-1 rounded-md text-xs flex items-center gap-1 transition-colors shadow-lg"
                        title="Baixar vídeo MP4"
                      >
                        <Download className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="hidden sm:inline text-[11px]">Baixar MP4</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  /* Real Specimen Photograph */
                  <div className="relative w-full h-full flex items-center justify-center p-3 bg-stone-950/90">
                    <img
                      src={activeImageUrl}
                      alt={`${specimen.title} - ${currentPhoto.view}`}
                      className="w-full h-full object-contain select-none transition-transform duration-300 group-hover:scale-[1.02]"
                      loading="eager"
                    />

                    {/* Overlaid Angle Watermark */}
                    <div className="absolute top-3 left-3 z-10 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-700/70 text-[11px] flex items-center gap-1.5 shadow-lg">
                      <Compass className="w-3 h-3 text-amber-400" />
                      <span className="text-amber-300 font-medium">{currentPhoto.view}</span>
                      <span className="text-slate-600">·</span>
                      <span className="text-slate-400">{currentPhoto.angleTag}</span>
                    </div>

                    {/* Quick action top-right: Lightbox zoom */}
                    <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setIsPhotoLightboxOpen(true)}
                        className="p-1.5 rounded-md bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition-colors shadow-lg flex items-center gap-1 text-xs"
                        title="Ampliar foto em alta resolução"
                      >
                        <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
                        <span className="hidden sm:inline text-[11px]">Ampliar</span>
                      </button>
                    </div>

                    {/* Navigation arrows */}
                    {specimen.photos.length > 1 && (
                      <>
                        <button
                          onClick={() => setSelectedPhotoIndex((prev) => (prev > 0 ? prev - 1 : specimen.photos.length - 1))}
                          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-all opacity-0 group-hover:opacity-100 shadow-xl"
                          title="Ângulo anterior"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setSelectedPhotoIndex((prev) => (prev < specimen.photos.length - 1 ? prev + 1 : 0))}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-all opacity-0 group-hover:opacity-100 shadow-xl"
                          title="Próximo ângulo"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Left Bottom Control / Thumbnails Bar */}
              {leftTab === 'video' ? (
                <div className="p-3 bg-slate-900/60 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleLeftVideoPlay}
                      className="p-1.5 rounded bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 transition-colors flex items-center gap-1"
                    >
                      {isLeftVideoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      <span>{isLeftVideoPlaying ? 'Pausar' : 'Reproduzir'}</span>
                    </button>
                    <div className="flex items-center bg-slate-900 rounded border border-slate-800 p-0.5 text-[10px]">
                      {[0.5, 1, 1.5, 2].map((speed) => (
                        <button
                          key={speed}
                          onClick={() => handleLeftSpeedChange(speed)}
                          className={`px-1.5 py-0.5 rounded ${
                            leftVideoSpeed === speed
                              ? 'bg-slate-700 text-white font-bold'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {speed}x
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 font-mono text-[11px] text-slate-400">
                    <span>Vídeo: <strong className="text-slate-200">{specimen.videoFileName}</strong></span>
                    <span className="text-slate-600">|</span>
                    <span className="text-emerald-400 font-semibold">Execução Contínua</span>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-slate-900/60 border-t border-slate-800/80">
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {specimen.photos.map((photo, idx) => (
                      <button
                        key={photo.id}
                        onClick={() => setSelectedPhotoIndex(idx)}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                          selectedPhotoIndex === idx
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                            : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-transparent'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                        <span>{photo.view}</span>
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    {currentPhoto.caption}
                  </p>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Real Anatomical Specimen Photo (Default) OU Resultado do Escaneamento (3D / MP4 / GIF) */}
            <div className="flex flex-col bg-slate-950/90 rounded-xl border border-slate-800 overflow-hidden shadow-inner">
              {/* Card Label Bar with Switcher */}
              <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full shadow-sm ${
                    activeTab === 'photos'
                      ? 'bg-amber-500 shadow-amber-500/50'
                      : activeTab === 'video-player' 
                      ? 'bg-emerald-500 shadow-emerald-500/50 animate-pulse'
                      : activeTab === 'gif-player'
                      ? 'bg-purple-500 shadow-purple-500/50'
                      : 'bg-cyan-500 shadow-cyan-500/50'
                  }`}></span>
                  <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                    {activeTab === 'photos' ? (
                      <Camera className="w-3.5 h-3.5 text-amber-400" />
                    ) : activeTab === 'video-player' ? (
                      <Film className="w-3.5 h-3.5 text-emerald-400" />
                    ) : activeTab === 'gif-player' ? (
                      <ImageIcon className="w-3.5 h-3.5 text-purple-400" />
                    ) : (
                      <Box className="w-3.5 h-3.5 text-cyan-400" />
                    )}
                    {activeTab === 'photos'
                      ? 'Quadro Direito: Foto do Objeto Real (Espécime)'
                      : activeTab === 'video-player'
                      ? 'Resultado do Escaneamento (Vídeo MP4)'
                      : activeTab === 'gif-player'
                      ? 'Resultado do Escaneamento (GIF 360°)'
                      : 'Resultado do Escaneamento (3D Interativo)'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {activeTab === 'photos' && (
                    <span className="text-amber-400/90 font-mono text-[11px] bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/50">
                      {currentPhoto.fileName} ({safePhotoIndex + 1}/{specimen.photos.length})
                    </span>
                  )}
                  {/* Sub-tab toggle: Fotos Reais vs 3D Interativo vs Vídeo MP4 vs GIF 360° */}
                  <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded border border-slate-800 text-[11px]">
                    <button
                      onClick={() => setActiveTab('photos')}
                      className={`px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 ${
                        activeTab === 'photos'
                          ? 'bg-amber-600 text-white font-medium shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                      title="Visualizar fotos reais do espécime para comparação"
                    >
                      <Camera className="w-3 h-3 text-amber-300" />
                      <span>Fotos Reais</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('3d-interactive')}
                      className={`px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 ${
                        activeTab === '3d-interactive'
                          ? 'bg-cyan-600 text-white font-medium shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                      title="Visualizar modelo 3D interativo"
                    >
                      <Box className="w-3 h-3" />
                      <span>3D Interativo</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('video-player')}
                      className={`px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 ${
                        activeTab === 'video-player'
                          ? 'bg-emerald-600 text-white font-medium shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                      title="Visualizar vídeo MP4"
                    >
                      <Film className="w-3 h-3" />
                      <span>Vídeo MP4</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('gif-player')}
                      className={`px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 ${
                        activeTab === 'gif-player'
                          ? 'bg-purple-600 text-white font-medium shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                      title="Visualizar animação GIF 360°"
                    >
                      <ImageIcon className="w-3 h-3" />
                      <span>GIF 360°</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Display Area */}
              <div className="relative h-80 sm:h-96 w-full bg-slate-950 flex items-center justify-center overflow-hidden group">
                {activeTab === 'photos' ? (
                  /* Real Specimen Photograph */
                  <div className="relative w-full h-full flex items-center justify-center p-3 bg-stone-950/90 overflow-hidden group">
                    <img
                      src={activeImageUrl}
                      alt={`${specimen.title} - ${currentPhoto.view}`}
                      className="w-full h-full object-contain select-none transition-transform duration-300 group-hover:scale-[1.02]"
                      loading="eager"
                    />

                    {/* Overlaid Angle & Filename Watermark */}
                    <div className="absolute top-3 left-3 z-10 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-700/70 text-[11px] flex items-center gap-1.5 shadow-lg">
                      <Camera className="w-3 h-3 text-amber-400" />
                      <span className="text-amber-300 font-semibold">{currentPhoto.fileName}</span>
                      <span className="text-slate-600">·</span>
                      <span className="text-slate-300">{currentPhoto.view}</span>
                    </div>

                    {/* Quick action top-right: Lightbox zoom */}
                    <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setIsPhotoLightboxOpen(true)}
                        className="p-1.5 rounded-md bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition-colors shadow-lg flex items-center gap-1 text-xs"
                        title="Ampliar foto em alta resolução"
                      >
                        <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
                        <span className="hidden sm:inline text-[11px]">Ampliar</span>
                      </button>
                    </div>

                    {/* Navigation arrows */}
                    {specimen.photos.length > 1 && (
                      <>
                        <button
                          onClick={() => setSelectedPhotoIndex((prev) => (prev > 0 ? prev - 1 : specimen.photos.length - 1))}
                          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-all opacity-0 group-hover:opacity-100 shadow-xl"
                          title="Ângulo anterior"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setSelectedPhotoIndex((prev) => (prev < specimen.photos.length - 1 ? prev + 1 : 0))}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-all opacity-0 group-hover:opacity-100 shadow-xl"
                          title="Próximo ângulo"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                ) : activeTab === 'video-player' ? (
                  /* Real MP4 Video Player */
                  <div className="w-full h-full flex flex-col justify-between bg-slate-950 relative overflow-hidden group">
                    <video
                      ref={videoRef}
                      src={activeVideoUrl}
                      className="w-full h-full object-contain bg-slate-950"
                      loop
                      autoPlay
                      muted
                      playsInline
                      onPlay={() => setIsPlayingVideo(true)}
                      onPause={() => setIsPlayingVideo(false)}
                    />

                    {/* Video Watermark & Slicer Plate Title */}
                    <div className="absolute top-3 left-3 z-10 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-700/70 text-[11px] flex items-center gap-1.5 shadow-lg">
                      <span className="text-emerald-400 font-semibold">{specimen.videoFileName}</span>
                      <span className="text-slate-600">·</span>
                      <span className="text-slate-300">Creality Print 7.0 (Smooth PEI Plate)</span>
                    </div>

                    {/* Download action top-right */}
                    <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                      <a
                        href={activeVideoUrl}
                        download={specimen.videoFileName}
                        className="bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 px-2 py-1 rounded-md text-xs flex items-center gap-1 transition-colors shadow-lg"
                        title="Baixar vídeo MP4"
                      >
                        <Download className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="hidden sm:inline text-[11px]">Baixar MP4</span>
                      </a>
                    </div>
                  </div>
                ) : activeTab === 'gif-player' ? (
                  /* Animated GIF 360° Display */
                  <div className="w-full h-full flex flex-col justify-between bg-slate-950 relative overflow-hidden group">
                    <img
                      src={activeGifUrl}
                      alt={`Animação GIF 360° - ${specimen.title}`}
                      className="w-full h-full object-contain bg-slate-950"
                    />

                    {/* GIF Watermark & Badges */}
                    <div className="absolute top-3 left-3 z-10 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-700/70 text-[11px] flex items-center gap-1.5 shadow-lg">
                      <span className="text-purple-400 font-semibold">{specimen.gifFileName || 'Peca_01.gif'}</span>
                      <span className="text-slate-600">·</span>
                      <span className="text-purple-300 font-mono text-[10px] bg-purple-950/60 px-1.5 py-0.5 rounded border border-purple-800/50">
                        GIF 360° Loop
                      </span>
                    </div>

                    {/* Download action top-right */}
                    <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                      <a
                        href={activeGifUrl}
                        download={specimen.gifFileName || 'animacao_3d.gif'}
                        className="bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 px-2 py-1 rounded-md text-xs flex items-center gap-1 transition-colors shadow-lg"
                        title="Baixar animação GIF 360°"
                      >
                        <Download className="w-3.5 h-3.5 text-purple-400" />
                        <span className="hidden sm:inline text-[11px]">Baixar GIF</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  /* 3D Interativo WebGL Three.js */
                  <SpecimenViewer3D
                    specimenId={specimen.id}
                    specimenTitle={specimen.title}
                    height="h-full"
                    interactive={true}
                  />
                )}
              </div>

              {/* Right Bottom Result Status Bar & Controls */}
              {activeTab === 'photos' ? (
                <div className="p-3 bg-slate-900/60 border-t border-slate-800/80">
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {specimen.photos.map((photo, idx) => (
                      <button
                        key={photo.id}
                        onClick={() => setSelectedPhotoIndex(idx)}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                          selectedPhotoIndex === idx
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                            : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-transparent'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                        <span>{photo.view}</span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-slate-400 gap-2">
                    <p className="leading-relaxed truncate">{currentPhoto.caption}</p>
                    <span className="font-mono text-[11px] text-amber-400/90 whitespace-nowrap bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/50">
                      {selectedPhotoIndex + 1}/{specimen.photos.length} fotos
                    </span>
                  </div>
                </div>
              ) : activeTab === 'video-player' ? (
                <div className="p-3 bg-slate-900/60 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleVideoPlay}
                      className="p-1.5 rounded bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 transition-colors flex items-center gap-1"
                    >
                      {isPlayingVideo ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      <span>{isPlayingVideo ? 'Pausar' : 'Reproduzir'}</span>
                    </button>
                    <div className="flex items-center bg-slate-900 rounded border border-slate-800 p-0.5 text-[10px]">
                      {[0.5, 1, 1.5, 2].map((speed) => (
                        <button
                          key={speed}
                          onClick={() => handleSpeedChange(speed)}
                          className={`px-1.5 py-0.5 rounded ${
                            videoSpeed === speed
                              ? 'bg-slate-700 text-white font-bold'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {speed}x
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 font-mono text-[11px] text-slate-400">
                    <span>Tam: <strong className="text-slate-200">{specimen.resultDetails.fileSizeEstimate}</strong></span>
                    <span className="text-slate-600">|</span>
                    <span className="text-emerald-400 font-semibold">{specimen.resultDetails.format}</span>
                  </div>
                </div>
              ) : activeTab === 'gif-player' ? (
                <div className="p-3 bg-slate-900/60 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 text-purple-300">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span>Animação GIF em Rotação Contínua 360°</span>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-[11px] text-slate-400">
                    <span>Tam: <strong className="text-slate-200">{specimen.resultDetails.fileSizeEstimate}</strong></span>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-slate-900/60 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Malha Watertight (Creality Print 7.0 View)</span>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-[11px] text-slate-400">
                    <span>Tam: <strong className="text-slate-200">{specimen.resultDetails.fileSizeEstimate}</strong></span>
                    <span className="text-slate-600">|</span>
                    <span className="text-emerald-400 font-semibold">{specimen.resultDetails.format}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

        {/* Telemetry & Scanning Specifications Grid (Conforme painel do EXScan Pro) */}
        <div className="mt-5 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span>Telemetria Oficial de Aquisição EXScan Pro (Rigil)</span>
            </h4>
            <span className="text-[11px] text-slate-400 font-mono">
              Status: Captura Finalizada
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
            {/* Frame Rate */}
            <div className="bg-slate-950/80 border border-slate-800 p-2.5 rounded-lg flex flex-col">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Frame Rate</span>
              <span className="text-xs font-bold text-emerald-400 font-mono mt-0.5">
                {specimen.parameters.frameRate || '0'} FPS
              </span>
            </div>

            {/* Frames in Total */}
            <div className="bg-slate-950/80 border border-slate-800 p-2.5 rounded-lg flex flex-col">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Frames in Total</span>
              <span className="text-xs font-bold text-slate-200 font-mono mt-0.5">
                {specimen.parameters.framesInTotal || '22.729'}
              </span>
            </div>

            {/* Points in Total */}
            <div className="bg-slate-950/80 border border-slate-800 p-2.5 rounded-lg flex flex-col">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Points in Total</span>
              <span className="text-xs font-bold text-cyan-400 font-mono mt-0.5">
                {specimen.parameters.pointsInTotal || specimen.parameters.pointsAcquired}
              </span>
            </div>

            {/* Markers in Total */}
            <div className="bg-slate-950/80 border border-slate-800 p-2.5 rounded-lg flex flex-col">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Markers in Total</span>
              <span className="text-xs font-bold text-amber-400 font-mono mt-0.5">
                {specimen.parameters.markersInTotal || '30'}
              </span>
            </div>

            {/* Resolução Óptica */}
            <div className="bg-slate-950/80 border border-slate-800 p-2.5 rounded-lg flex flex-col">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Resolução Óptica</span>
              <span className="text-xs font-bold text-slate-200 font-mono mt-0.5">
                {specimen.parameters.resolution}
              </span>
            </div>

            {/* Integridade da Malha */}
            <div className="bg-slate-950/80 border border-slate-800 p-2.5 rounded-lg flex flex-col justify-center">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Integridade 3D</span>
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                Watertight
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Lightbox Modal */}
      {isPhotoLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setIsPhotoLightboxOpen(false)}
        >
          <div 
            className="relative max-w-5xl max-h-[90vh] w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between pb-3 text-slate-200 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-amber-400" />
                <span className="font-semibold text-sm sm:text-base">{specimen.title} · {currentPhoto.view}</span>
                <span className="font-mono text-xs text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">
                  {currentPhoto.fileName}
                </span>
              </div>
              <button
                onClick={() => setIsPhotoLightboxOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 w-full flex items-center justify-center max-h-[75vh]">
              <img
                src={activeImageUrl}
                alt={currentPhoto.caption}
                className="max-h-[72vh] max-w-full object-contain rounded-lg shadow-2xl"
              />
            </div>

            <p className="text-xs sm:text-sm text-slate-300 text-center max-w-2xl px-4">
              {currentPhoto.caption} — {currentPhoto.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
