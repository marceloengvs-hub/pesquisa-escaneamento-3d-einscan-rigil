import React, { useState } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const [copiedCitation, setCopiedCitation] = useState(false);

  const citationText = `METODOLOGIA DE DIGITALIZAÇÃO 3D EM PEÇAS ANATÔMICAS: APLICAÇÃO DO ESCANER EINSCAN RIGIL E EXSCAN PRO v1.3.2-7. Laboratório de Morfologia e Antropologia, 2026.`;

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(citationText);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2500);
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-900">
          <div>
            <span className="text-base font-bold text-white tracking-tight block">
              BIO-SCAN 3D
            </span>
            <p className="text-xs text-slate-500 mt-1 max-w-md">
              Plataforma de subsídio científico à pesquisa discente de escaneamento tridimensional de peças anatômicas.
            </p>
          </div>

          {/* Quick Citation Box */}
          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 max-w-lg w-full flex items-center justify-between gap-3">
            <div className="text-[11px] text-slate-400 font-mono truncate">
              <span className="text-cyan-400 font-semibold">Citação ABNT: </span>
              <span>{citationText}</span>
            </div>
            <button
              onClick={handleCopyCitation}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors shrink-0"
              title="Copiar citação ABNT"
            >
              {copiedCitation ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Bottom Credits & Acknowledgements */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-2 flex-wrap">
            <span>Equipamentos: SHINING 3D EinScan Rigil</span>
            <span>·</span>
            <span>Software: EXScan Rigil v1.3.2-7</span>
            <span>·</span>
            <span>Validação 3D: Creality Print 7.0 (Smooth PEI)</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/marceloengvs-hub/pesquisa-escaneamento-3d-einscan-rigil/releases/tag/v1.0.0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 font-mono"
            >
              <span>GitHub Releases v1.0.0</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>·</span>
            <a
              href="https://github.com/marceloengvs-hub/pesquisa-escaneamento-3d-einscan-rigil"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-1"
            >
              <span>Repositório GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
