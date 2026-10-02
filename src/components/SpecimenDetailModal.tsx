import React, { useState } from 'react';
import { SpecimenData } from '../data/researchData';
import { SpecimenViewer3D } from './SpecimenViewer3D';
import { X, Check, FileCheck, Layers, Eye, ShieldCheck, Microscope, Camera, Compass, Download, Box, ExternalLink } from 'lucide-react';

interface SpecimenDetailModalProps {
  specimen: SpecimenData | null;
  onClose: () => void;
}

export const SpecimenDetailModal: React.FC<SpecimenDetailModalProps> = ({ specimen, onClose }) => {
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState(0);

  if (!specimen) return null;

  const currentPhoto = specimen.photos[selectedPhotoIdx] || specimen.photos[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono uppercase mb-1">
              <span>{specimen.sampleTag}</span>
              <span>·</span>
              <span>{specimen.category}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {specimen.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 italic">
              {specimen.scientificName}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-8 max-h-[75vh] overflow-y-auto">
          {/* Real Specimen Photography Gallery Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Camera className="w-4 h-4 text-amber-400" />
                <span>Registro Fotográfico do Espécime Real</span>
              </h4>
              <span className="font-mono text-xs text-amber-400 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-800">
                {currentPhoto.fileName}
              </span>
            </div>

            <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
              <div className="h-72 sm:h-80 w-full flex items-center justify-center bg-stone-950/80 p-4">
                <img
                  src={currentPhoto.url}
                  alt={currentPhoto.caption}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="p-3 bg-slate-900/80 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                  {specimen.photos.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPhotoIdx(idx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                        selectedPhotoIdx === idx
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span>{p.view}</span>
                    </button>
                  ))}
                </div>
                <div className="text-xs text-slate-400">
                  {currentPhoto.caption}
                </div>
              </div>
            </div>
          </div>

          {/* Summary and Significance */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
              Descrição Morfométrica e Relevância Científica
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {specimen.summary}
            </p>
            <p className="text-xs text-slate-400 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 leading-relaxed">
              <strong className="text-cyan-400 font-medium">Importância na Pesquisa: </strong>
              {specimen.importance}
            </p>
          </div>

          {/* Interactive 3D Model Inspection inside Modal */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Microscope className="w-4 h-4 text-emerald-400" />
                <span>Inspeção Interativa 3D (Simulação Creality PEI Plate)</span>
              </h4>
              <span className="text-xs text-slate-400 font-mono">Modo Watertight Mesh</span>
            </div>
            <div className="h-80 w-full rounded-xl overflow-hidden border border-slate-800">
              <SpecimenViewer3D
                specimenId={specimen.id}
                specimenTitle={specimen.title}
                height="h-full"
                interactive={true}
              />
            </div>
          </div>

          {/* Anatomical Landmarks Checklist */}
          <div>
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Marcos Anatômicos Preservados na Malha Digital
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {specimen.anatomicalLandmarks.map((landmark, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-300"
                >
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{landmark}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Full Technical Parameter Grid */}
          <div>
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Ficha Técnica & Telemetria do EXScan Pro (Rigil)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[11px]">Frame Rate</span>
                <span className="text-emerald-400 font-mono font-bold">{specimen.parameters.frameRate || '0'} FPS</span>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[11px]">Frames in Total</span>
                <span className="text-slate-200 font-mono font-medium">{specimen.parameters.framesInTotal || '22.729'}</span>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[11px]">Points in Total</span>
                <span className="text-cyan-400 font-mono font-bold">{specimen.parameters.pointsInTotal || specimen.parameters.pointsAcquired}</span>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[11px]">Markers in Total</span>
                <span className="text-amber-400 font-mono font-medium">{specimen.parameters.markersInTotal || '30'}</span>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[11px]">Modo de Aquisição</span>
                <span className="text-slate-200 font-medium">{specimen.parameters.mode}</span>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[11px]">Resolução Espacial</span>
                <span className="text-cyan-400 font-mono font-medium">{specimen.parameters.resolution}</span>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[11px]">Distância de Trabalho</span>
                <span className="text-slate-200">{specimen.parameters.workingDistance}</span>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[11px]">Polígonos da Malha</span>
                <span className="text-slate-200 font-mono">{specimen.parameters.meshTriangles}</span>
              </div>
            </div>
          </div>

          {/* Downloads de Malhas 3D Originais (GitHub Releases) */}
          {specimen.downloads && specimen.downloads.length > 0 && (
            <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-slate-950 border border-cyan-800/60 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Download className="w-4 h-4 text-cyan-400" />
                    <span>Download das Malhas 3D Oficiais (GitHub Releases)</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Arquivos brutos de escaneamento sem perda de resolução (0,05 mm), prontos para CAD e fatiamento.
                  </p>
                </div>
                <span className="font-mono text-[11px] text-cyan-300 bg-cyan-950/80 border border-cyan-700/80 px-2.5 py-1 rounded-full self-start sm:self-auto font-semibold">
                  Release v1.0.0 Oficial
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {specimen.downloads.map((dl, idx) => (
                  <a
                    key={idx}
                    href={dl.url}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-cyan-500 hover:bg-slate-800/90 transition-all flex items-center justify-between group shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-cyan-950/90 border border-cyan-800 flex items-center justify-center text-cyan-400 group-hover:scale-105 group-hover:bg-cyan-900 transition-all">
                        <Box className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                            Formato {dl.format} ({dl.fileName})
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 block line-clamp-1 mt-0.5">
                          {dl.description}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/60 font-semibold">
                        {dl.size}
                      </span>
                      <Download className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 group-hover:translate-y-0.5 transition-all" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Key Methodological Challenges Solved */}
          <div>
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-2">
              Desafios Ópticos Superados nesta Amostra
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {specimen.resultDetails.keyChallengesSolved.map((challenge, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-cyan-400">·</span>
                  <span>{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Validação realizada no software EXScan Pro v1.3.2-7 & Creality Print 7.0
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition-colors"
          >
            Fechar Ficha
          </button>
        </div>
      </div>
    </div>
  );
};
