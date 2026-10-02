import React, { useState } from 'react';
import { Sliders, Calculator, CheckCircle2, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';

export const ParameterCalculator: React.FC = () => {
  const [specimenType, setSpecimenType] = useState<'delicate' | 'medium' | 'large'>('delicate');
  const [scanMode, setScanMode] = useState<'laser-hd' | 'ir-rapid'>('laser-hd');
  const [workingDistance, setWorkingDistance] = useState<number>(240);
  const [resolutionChoice, setResolutionChoice] = useState<number>(0.07);

  // Dynamic calculations based on scanner specifications
  const getTheoreticalSpeed = () => {
    return scanMode === 'laser-hd' ? 4800000 : 16000000;
  };

  const getEstimatedPoints = () => {
    const basePts = specimenType === 'delicate' ? 2200000 : specimenType === 'medium' ? 3500000 : 4900000;
    const resFactor = 0.05 / resolutionChoice;
    return Math.round(basePts * resFactor);
  };

  const getEstimatedFileSize = () => {
    const pts = getEstimatedPoints();
    // Approximately 12 bytes per point in binary STL/mesh
    const mb = (pts * 12) / (1024 * 1024);
    return mb.toFixed(1);
  };

  const isDistanceIdeal = workingDistance >= 200 && workingDistance <= 320;
  const isDistanceWarning = workingDistance < 170 || workingDistance > 550;

  return (
    <section id="calculadora" className="py-20 bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
            <span>Ferramenta Pedagógica</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Simulador de Campo</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight text-balance">
            Simulador de Parâmetros de Escaneamento 3D
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            Permite aos alunos planejarem a configuração geométrica ideal no EinScan Rigil e EXScan Pro para diferentes categorias de espécimes ósseos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls Form */}
          <div className="lg:col-span-2 bg-slate-900/60 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6">
            {/* 1. Specimen Type */}
            <div>
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-3">
                1. Tipo de Espécime Anatômico
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setSpecimenType('delicate');
                    setResolutionChoice(0.05);
                    setWorkingDistance(220);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    specimenType === 'delicate'
                      ? 'bg-cyan-950/60 border-cyan-500/80 text-white'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="text-xs font-bold block mb-1">Microestruturas</span>
                  <span className="text-[11px] leading-tight block text-slate-400">
                    C1/Atlas, forames delicados, meato acústico (&lt; 8 cm)
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSpecimenType('medium');
                    setResolutionChoice(0.08);
                    setWorkingDistance(260);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    specimenType === 'medium'
                      ? 'bg-cyan-950/60 border-cyan-500/80 text-white'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="text-xs font-bold block mb-1">Vértebras Médias</span>
                  <span className="text-[11px] leading-tight block text-slate-400">
                    C2/Áxis, processos transversos, vértebras lombares
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSpecimenType('large');
                    setResolutionChoice(0.12);
                    setWorkingDistance(320);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    specimenType === 'large'
                      ? 'bg-cyan-950/60 border-cyan-500/80 text-white'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="text-xs font-bold block mb-1">Segmentos Maiores</span>
                  <span className="text-[11px] leading-tight block text-slate-400">
                    Crânio parcial, pelve, fêmur (&gt; 15 cm)
                  </span>
                </button>
              </div>
            </div>

            {/* 2. Optical Mode Selection */}
            <div>
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-3">
                2. Modo de Varredura
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setScanMode('laser-hd')}
                  className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                    scanMode === 'laser-hd'
                      ? 'bg-cyan-950/60 border-cyan-500/80 text-white'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Zap className={`w-4 h-4 shrink-0 mt-0.5 ${scanMode === 'laser-hd' ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <div>
                    <span className="text-xs font-bold block">Laser Azul HD (Recomendado)</span>
                    <span className="text-[11px] text-slate-400 leading-tight block mt-0.5">
                      Resolução de 0,05 ~ 10 mm · Máxima definição para acidentes ósseos
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setScanMode('ir-rapid')}
                  className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                    scanMode === 'ir-rapid'
                      ? 'bg-indigo-950/60 border-indigo-500/80 text-white'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Zap className={`w-4 h-4 shrink-0 mt-0.5 ${scanMode === 'ir-rapid' ? 'text-indigo-400' : 'text-slate-500'}`} />
                  <div>
                    <span className="text-xs font-bold block">Modo IR Rápido (VCSEL)</span>
                    <span className="text-[11px] text-slate-400 leading-tight block mt-0.5">
                      Até 16M pts/s · Varredura acelerada de superfícies contínuas
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* 3. Working Distance Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  3. Distância de Trabalho Operador-Espécime
                </label>
                <span className="font-mono text-xs font-bold text-cyan-400">
                  {workingDistance} mm
                </span>
              </div>
              <input
                type="range"
                min="140"
                max="600"
                step="10"
                value={workingDistance}
                onChange={(e) => setWorkingDistance(Number(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1 font-mono">
                <span>140 mm (Muito próximo)</span>
                <span className="text-emerald-400 font-semibold">200-300 mm (Faixa Ideal HD)</span>
                <span>600 mm (Limite óptico)</span>
              </div>
            </div>

            {/* 4. Target Mesh Resolution */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  4. Resolução Alvo do Passo de Malha
                </label>
                <span className="font-mono text-xs font-bold text-cyan-400">
                  {resolutionChoice.toFixed(2)} mm
                </span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.25"
                step="0.01"
                value={resolutionChoice}
                onChange={(e) => setResolutionChoice(Number(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1 font-mono">
                <span className="text-cyan-400">0,05 mm (Ultra Fino)</span>
                <span>0,15 mm (Balanceado)</span>
                <span>0,25 mm (Rápido)</span>
              </div>
            </div>
          </div>

          {/* Results Prediction Card */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-4">
                <Calculator className="w-4 h-4" />
                <span>Estimativa de Saída EXScan Pro</span>
              </div>

              {/* Status Alert for distance */}
              {isDistanceIdeal ? (
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60 mb-6 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-emerald-300">
                    <span className="font-semibold block">Distância Focal Ótima</span>
                    <span className="text-emerald-400/80 text-[11px]">
                      O feixe laser azul operará no pico de profundidade de campo, minimizando ruído reflexivo.
                    </span>
                  </div>
                </div>
              ) : isDistanceWarning ? (
                <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/60 mb-6 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-300">
                    <span className="font-semibold block">Atenção à Distância</span>
                    <span className="text-amber-400/80 text-[11px]">
                      Fora da faixa nominal (170 - 550 mm). Risco de perda de rastreamento de pontos.
                    </span>
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 mb-6 text-xs text-slate-400">
                  Distância aceitável. Mantenha o escaner perpendicular à superfície óssea.
                </div>
              )}

              {/* Dynamic metrics */}
              <div className="space-y-4">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-500 block">Nuvem de Pontos Estimada</span>
                  <span className="text-xl font-bold text-white font-mono tabular-nums">
                    {getEstimatedPoints().toLocaleString('pt-BR')} pts
                  </span>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-500 block">Tamanho Estimado do Arquivo (.STL)</span>
                  <span className="text-xl font-bold text-cyan-400 font-mono tabular-nums">
                    {getEstimatedFileSize()} MB
                  </span>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-500 block">Tempo Médio de Varredura</span>
                  <span className="text-lg font-bold text-slate-200 font-mono">
                    {specimenType === 'delicate' ? '3 a 5 min' : specimenType === 'medium' ? '5 a 7 min' : '8 a 10 min'}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 mt-6">
              <span className="text-[11px] text-slate-500 block">
                Recomendação da Pesquisa: Salvar sempre em malha estanque (Watertight) para compatibilidade nativa com fatiadores Creality Print 7.0 e softwares CAD biomecânicos.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
