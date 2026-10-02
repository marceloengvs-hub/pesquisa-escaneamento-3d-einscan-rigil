import React from 'react';
import { ArrowDown, Cpu, Sparkles, Box, ShieldCheck } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-slate-950">
      {/* Background radial gradients for scientific depth */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-radial from-cyan-950/30 via-slate-950/20 to-transparent pointer-events-none" />
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-emerald-950/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Unboxed clean metadata kicker */}
        <div className="flex items-center gap-2 text-xs font-medium text-cyan-400 mb-4 tracking-wide">
          <span>Pesquisa Científica</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Digitalização Óssea 3D</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Laboratório de Antropologia e Morfologia</span>
        </div>

        {/* Marquee Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] max-w-4xl text-balance">
          Metodologia de Escaneamento 3D Óptico em Peças Anatômicas
        </h1>

        {/* Concrete research premise */}
        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
          Subsídio e documentação técnica da pesquisa de digitalização tridimensional sem marcadores invasivos. 
          Investigação da precisão morfométrica através do escaner portátil 
          <strong className="text-white font-semibold"> EinScan Rigil</strong> e software de processamento 
          <strong className="text-white font-semibold"> EXScan Pro v1.3.2-7</strong>, com validação de malhas estanques para fatiamento no ambiente <strong className="text-emerald-400 font-semibold">Creality Print 7.0 (Smooth PEI Plate)</strong>.
        </p>

        {/* Quantified Research Invariants (Zero-Pill, Typographic Separators) */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div>
            <span className="text-xs text-slate-400 block font-normal">Acurácia & Resolução</span>
            <span className="text-xl sm:text-2xl font-bold text-white font-mono tabular-nums">0,05 mm</span>
            <span className="text-[11px] text-slate-500 block mt-0.5">Modo Laser HD Azul</span>
          </div>

          <div>
            <span className="text-xs text-slate-400 block font-normal">Taxa de Aquisição</span>
            <span className="text-xl sm:text-2xl font-bold text-cyan-400 font-mono tabular-nums">4.800.000 pts/s</span>
            <span className="text-[11px] text-slate-500 block mt-0.5">Amostragem em tempo real</span>
          </div>

          <div>
            <span className="text-xs text-slate-400 block font-normal">Suite de Processamento</span>
            <span className="text-xl sm:text-2xl font-bold text-white font-mono tabular-nums">v1.3.2-7</span>
            <span className="text-[11px] text-slate-500 block mt-0.5">EXScan Rigil (SHINING 3D)</span>
          </div>

          <div>
            <span className="text-xs text-slate-400 block font-normal">Integridade da Peça</span>
            <span className="text-xl sm:text-2xl font-bold text-emerald-400">100% Preservada</span>
            <span className="text-[11px] text-slate-500 block mt-0.5">Sem spray ou adesivos</span>
          </div>
        </div>

        {/* Primary Action Row */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#amostras"
            className="px-5 py-3 text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-all duration-200 shadow-lg shadow-cyan-500/20 flex items-center gap-2 whitespace-nowrap"
          >
            <Box className="w-4 h-4" />
            <span>Comparar Amostras e Vídeos 3D</span>
          </a>

          <a
            href="#metodologia"
            className="px-5 py-3 text-sm font-medium text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-all duration-200 flex items-center gap-2 whitespace-nowrap"
          >
            <span>Ver Metodologia Passo a Passo</span>
            <ArrowDown className="w-4 h-4 text-slate-400" />
          </a>
        </div>
      </div>
    </section>
  );
};
