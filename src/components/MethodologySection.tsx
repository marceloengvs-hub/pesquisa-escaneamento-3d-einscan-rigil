import React, { useState } from 'react';
import { METHODOLOGY_STEPS } from '../data/researchData';
import { Check, ShieldAlert, BookOpen, Layers, Sparkles, ArrowRight } from 'lucide-react';

export const MethodologySection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = METHODOLOGY_STEPS[activeStepIndex];

  return (
    <section id="metodologia" className="py-20 bg-slate-950 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
            <span>Protocolo Científico</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Reprodutibilidade Experimental</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight text-balance">
            Metodologia Sistemática de Digitalização 3D
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            Estrutura metodológica desenhada especificamente para acervos ósseos e materiais osteológicos frágeis, onde a preservação física do espécime é a prioridade absoluta.
          </p>
        </div>

        {/* Horizontal Editorial Step Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-1.5 bg-slate-900/80 rounded-xl border border-slate-800 mb-8">
          {METHODOLOGY_STEPS.map((step, idx) => (
            <button
              key={step.stepNumber}
              onClick={() => setActiveStepIndex(idx)}
              className={`p-3 rounded-lg text-left transition-all ${
                activeStepIndex === idx
                  ? 'bg-slate-800 text-white shadow-md border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-xs font-bold text-cyan-400">{step.stepNumber}</span>
                {idx < activeStepIndex && <Check className="w-3.5 h-3.5 text-emerald-400" />}
              </div>
              <div className="text-xs font-semibold line-clamp-1">{step.phase}</div>
              <div className="text-[11px] text-slate-500 line-clamp-1">{step.title}</div>
            </button>
          ))}
        </div>

        {/* Active Step Deep Explanation Box */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Description */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 text-xs font-mono font-semibold">
                Etapa {activeStep.stepNumber} de 05
              </span>
              <span className="text-xs text-slate-500">·</span>
              <span className="text-xs text-slate-400">{activeStep.phase}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {activeStep.title}
            </h3>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {activeStep.description}
            </p>

            {/* Key Action Callout */}
            <div className="pt-4 border-t border-slate-800 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-200 block">Ações Críticas na Pesquisa:</span>
                <ul className="text-xs text-slate-400 mt-1 space-y-1 list-disc list-inside">
                  {activeStep.keyActions.map((action, aIdx) => (
                    <li key={aIdx}>{action}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar Specs & Device Context */}
          <div className="bg-slate-950/80 rounded-xl p-5 border border-slate-800 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3">
                Configuração & Software
              </span>
              
              <div className="space-y-3">
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-xs">
                  <span className="text-slate-500 block text-[11px]">Parâmetro EinScan Rigil</span>
                  <span className="text-slate-200 font-medium">{activeStep.rigilSetting}</span>
                </div>

                <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-xs">
                  <span className="text-slate-500 block text-[11px]">Documento de Saída</span>
                  <span className="text-cyan-400 font-medium">{activeStep.outputDoc}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-xs text-slate-400">
              <span className="font-semibold text-slate-300 block mb-1">Dica para Estudantes:</span>
              <p className="text-[11px] leading-relaxed text-slate-400">
                {activeStepIndex === 0 && "Evite qualquer adesivo sobre ossos secos; utilize alinhamento por features."}
                {activeStepIndex === 1 && "Mantenha a temperatura da sala estável (21°C - 24°C) para calibração óptica precisa."}
                {activeStepIndex === 2 && "Realize movimentos helicoidais lentos, mantendo o indicador de distância na barra verde."}
                {activeStepIndex === 3 && "No EXScan Pro 1.3.2-7, utilize a malha estanque (Watertight) apenas após conferir forames."}
                {activeStepIndex === 4 && "No slicer Creality Print 7.0, avalie a espessura de parede para garantir que não haja vazios."}
              </p>
            </div>
          </div>
        </div>

        {/* Methodological Highlights Bento Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800/80">
            <span className="text-xs font-semibold text-cyan-400 block mb-1">01. Alinhamento Sem Marcadores</span>
            <p className="text-xs text-slate-400 leading-relaxed">
              O algoritmo do EinScan Rigil reconhece as curvaturas ósseas naturais como pontos de ancoragem trigonométrica, dispensando adesivos.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800/80">
            <span className="text-xs font-semibold text-emerald-400 block mb-1">02. Dualidade Laser HD vs IR</span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Para microestruturas (processo odontóide, meato acústico), o Laser HD entrega 0,05 mm de detalhamento superior à luz difusa.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800/80">
            <span className="text-xs font-semibold text-amber-400 block mb-1">03. Validação em Slicer 3D</span>
            <p className="text-xs text-slate-400 leading-relaxed">
              A exportação para o Creality Print 7.0 na base Smooth PEI simula a orientação real de manufatura ou impressão biomédica.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
