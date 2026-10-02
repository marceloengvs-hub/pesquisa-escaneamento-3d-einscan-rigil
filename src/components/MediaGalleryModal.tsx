import React, { useState } from 'react';
import { X, Camera, Film, FileText, Download, CheckCircle, ExternalLink, ZoomIn } from 'lucide-react';
import { EQUIPMENT_ASSETS } from '../data/researchData';

interface MediaItem {
  name: string;
  category: 'software' | 'specimen' | 'video';
  specimenName: string;
  angleOrType: string;
  url: string;
}

const ALL_MEDIA_FILES: MediaItem[] = [
  {
    name: 'Tela_Software_v.1.3.2-7.png',
    category: 'software',
    specimenName: 'Software EXScan Pro v1.3.2-7',
    angleOrType: 'Tela de Abertura / Calibração Óptica',
    url: '/Tela_Software_v.1.3.2-7.png'
  },
  {
    name: 'Especificações_Scanner_Rigil.png',
    category: 'software',
    specimenName: 'Scanner EinScan Rigil (SHINING 3D)',
    angleOrType: 'Ficha Técnica Oficial de Engenharia',
    url: '/Especificações_Scanner_Rigil.png'
  },
  // --- Peça 01: Fragmento Ósseo Craniano (Osso Temporal) ---
  {
    name: 'Peça_01.jpg',
    category: 'specimen',
    specimenName: 'Amostra 01 (Peça 01): Fragmento Ósseo Craniano',
    angleOrType: 'Vista Endocraniana / Face Interna',
    url: '/Peça_01.jpg'
  },
  {
    name: 'Peça_001.jpg',
    category: 'specimen',
    specimenName: 'Amostra 01 (Peça 01): Fragmento Ósseo Craniano',
    angleOrType: 'Vista Endocraniana Petrosa / Poro Acústico Interno',
    url: '/Peça_001.jpg'
  },
  {
    name: 'Peça_0001.jpg',
    category: 'specimen',
    specimenName: 'Amostra 01 (Peça 01): Fragmento Ósseo Craniano',
    angleOrType: 'Vista Inferior / Base e Fossa Mandibular',
    url: '/Peça_0001.jpg'
  },
  {
    name: 'Peça_00001.jpg',
    category: 'specimen',
    specimenName: 'Amostra 01 (Peça 01): Fragmento Ósseo Craniano',
    angleOrType: 'Vista Superior / Porção Escamosa e Borda Sutural',
    url: '/Peça_00001.jpg'
  },
  {
    name: 'Peça_000001.jpg',
    category: 'specimen',
    specimenName: 'Amostra 01 (Peça 01): Fragmento Ósseo Craniano',
    angleOrType: 'Vista Lateral (Exocraniana) - Meato Acústico Externo e Mastoide',
    url: '/Peça_000001.jpg'
  },
  // --- Peça 02: Vértebra Cervical C1 (Atlas) ---
  {
    name: 'Peça_02.jpg',
    category: 'specimen',
    specimenName: 'Amostra 02 (Peça 02): Vértebra C1 (Atlas)',
    angleOrType: 'Vista Superior (Cranial) - Cavidades Glenóides',
    url: '/Peça_02.jpg'
  },
  {
    name: 'Peça_002.jpg',
    category: 'specimen',
    specimenName: 'Amostra 02 (Peça 02): Vértebra C1 (Atlas)',
    angleOrType: 'Vista Inferior (Caudal) - Facetas Planas Articulares',
    url: '/Peça_002.jpg'
  },
  // --- Peça 03: Vértebra Cervical C2 (Áxis) ---
  {
    name: 'Peça_03.jpg',
    category: 'specimen',
    specimenName: 'Amostra 03 (Peça 03): Vértebra C2 (Áxis)',
    angleOrType: 'Vista Superior - Dente do Áxis e Facetas Convexas',
    url: '/Peça_03.jpg'
  },
  {
    name: 'Peça_003.jpg',
    category: 'specimen',
    specimenName: 'Amostra 03 (Peça 03): Vértebra C2 (Áxis)',
    angleOrType: 'Vista Anterior (Frontal) - Corpo Vertebral e Odontóide',
    url: '/Peça_003.jpg'
  },
  // --- Animações GIF 360° ---
  {
    name: 'Peça_01.gif',
    category: 'video',
    specimenName: 'Amostra 01 (Peça 01): Fragmento Ósseo Craniano',
    angleOrType: 'Animação GIF 360° de Rotação (STL Slicer View)',
    url: '/Peca_01.gif'
  },
  {
    name: 'Peça_02.gif',
    category: 'video',
    specimenName: 'Amostra 02 (Peça 02): Vértebra C1 (Atlas)',
    angleOrType: 'Animação GIF 360° de Rotação (STL Slicer View)',
    url: '/Peca_02.gif'
  },
  {
    name: 'Peça_03.gif',
    category: 'video',
    specimenName: 'Amostra 03 (Peça 03): Vértebra C2 (Áxis)',
    angleOrType: 'Animação GIF 360° de Rotação (STL Slicer View)',
    url: '/Peca_03.gif'
  },
  // --- Vídeos MP4 de Fatiamento ---
  {
    name: 'Peça_01.mp4',
    category: 'video',
    specimenName: 'Amostra 01 (Peça 01): Fragmento Ósseo Craniano',
    angleOrType: 'Vídeo MP4 de Validação (Creality Print 7.0 / Smooth PEI Plate)',
    url: '/Peça_01.mp4'
  },
  {
    name: 'Peça_02.mp4',
    category: 'video',
    specimenName: 'Amostra 02 (Peça 02): Vértebra C1 (Atlas)',
    angleOrType: 'Vídeo MP4 de Validação (Creality Print 7.0 / Smooth PEI Plate)',
    url: '/Peça_02.mp4'
  },
  {
    name: 'Peça_03.mp4',
    category: 'video',
    specimenName: 'Amostra 03 (Peça 03): Vértebra C2 (Áxis)',
    angleOrType: 'Vídeo MP4 de Validação (Creality Print 7.0 / Smooth PEI Plate)',
    url: '/Peça_03.mp4'
  }
];

interface MediaGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MediaGalleryModal: React.FC<MediaGalleryModalProps> = ({ isOpen, onClose }) => {
  const [filter, setFilter] = useState<'all' | 'specimen' | 'software' | 'video'>('all');
  const [selectedPreview, setSelectedPreview] = useState<MediaItem | null>(null);

  if (!isOpen) return null;

  const filteredMedia = filter === 'all'
    ? ALL_MEDIA_FILES
    : ALL_MEDIA_FILES.filter(m => m.category === filter);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono uppercase mb-1">
              <span>Repositório de Dados Brutos</span>
              <span>·</span>
              <span>17 Mídias Oficiais</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Galeria de Mídias e Arquivos Reais da Pesquisa
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Todas as 11 imagens de alta resolução, 3 GIFs animadas 360° e 3 vídeos MP4 vinculados diretamente na aplicação.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters */}
        <div className="p-4 bg-slate-950/40 border-b border-slate-800 flex flex-wrap gap-2 text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              filter === 'all' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Todas as Mídias ({ALL_MEDIA_FILES.length})
          </button>
          <button
            onClick={() => setFilter('specimen')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              filter === 'specimen' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Fotos dos Espécimes (9)
          </button>
          <button
            onClick={() => setFilter('video')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              filter === 'video' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            GIFs 360° & Vídeos MP4 (6)
          </button>
          <button
            onClick={() => setFilter('software')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              filter === 'software' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Equipamentos & Software (2)
          </button>
        </div>

        {/* Media Grid */}
        <div className="p-5 max-h-[65vh] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredMedia.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden hover:border-cyan-500/50 transition-all flex flex-col group"
            >
              {/* Thumbnail Container */}
              <div 
                className="h-44 bg-stone-950 flex items-center justify-center p-2 relative overflow-hidden cursor-pointer"
                onClick={() => setSelectedPreview(item)}
              >
                {item.category === 'video' ? (
                  <video
                    src={item.url}
                    className="w-full h-full object-contain pointer-events-none"
                    muted
                    loop
                  />
                ) : (
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-full h-full object-contain transition-transform group-hover:scale-105"
                  />
                )}

                <div className="absolute top-2 left-2">
                  {item.category === 'video' ? (
                    <span className="bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 px-2 py-0.5 rounded text-[10px] font-mono flex items-center gap-1">
                      <Film className="w-3 h-3" /> MP4
                    </span>
                  ) : item.category === 'software' ? (
                    <span className="bg-cyan-950/80 text-cyan-300 border border-cyan-700/60 px-2 py-0.5 rounded text-[10px] font-mono flex items-center gap-1">
                      <FileText className="w-3 h-3" /> PNG
                    </span>
                  ) : (
                    <span className="bg-amber-950/80 text-amber-300 border border-amber-700/60 px-2 py-0.5 rounded text-[10px] font-mono flex items-center gap-1">
                      <Camera className="w-3 h-3" /> JPG
                    </span>
                  )}
                </div>

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-slate-900/90 text-white px-3 py-1 rounded text-xs flex items-center gap-1 border border-slate-700">
                    <ZoomIn className="w-3.5 h-3.5 text-cyan-400" />
                    Visualizar
                  </span>
                </div>
              </div>

              {/* Info Bar */}
              <div className="p-3 bg-slate-900/80 border-t border-slate-800 flex flex-col justify-between flex-1 gap-2">
                <div>
                  <div className="font-mono text-xs font-semibold text-cyan-300 truncate" title={item.name}>
                    {item.name}
                  </div>
                  <div className="text-xs font-medium text-slate-200 mt-0.5">{item.specimenName}</div>
                  <div className="text-[11px] text-slate-400 leading-tight">{item.angleOrType}</div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
                  <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Online
                  </span>
                  <a
                    href={item.url}
                    download={item.name}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    title={`Baixar ${item.name}`}
                  >
                    <Download className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Arquivos armazenados na pasta pública do servidor e disponíveis para reprodução imediata.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition-colors"
          >
            Fechar Galeria
          </button>
        </div>
      </div>

      {/* Lightbox for Selected Item */}
      {selectedPreview && (
        <div
          className="fixed inset-0 z-60 bg-black/95 flex items-center justify-center p-4 sm:p-8"
          onClick={() => setSelectedPreview(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between pb-3 text-slate-200 border-b border-slate-800">
              <div>
                <span className="font-semibold text-sm sm:text-base">{selectedPreview.specimenName}</span>
                <span className="font-mono text-xs text-cyan-400 ml-2">({selectedPreview.name})</span>
              </div>
              <button
                onClick={() => setSelectedPreview(null)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 w-full flex items-center justify-center max-h-[75vh]">
              {selectedPreview.category === 'video' ? (
                <video
                  src={selectedPreview.url}
                  className="max-h-[72vh] max-w-full object-contain rounded-lg shadow-2xl"
                  controls
                  autoPlay
                  loop
                />
              ) : (
                <img
                  src={selectedPreview.url}
                  alt={selectedPreview.name}
                  className="max-h-[72vh] max-w-full object-contain rounded-lg shadow-2xl"
                />
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-300 text-center">
              {selectedPreview.angleOrType}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
