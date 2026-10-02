import React, { useState } from 'react';
import { TECHNICAL_SPECIFICATIONS, EQUIPMENT_ASSETS } from '../data/researchData';
import { 
  Cpu, 
  Layers, 
  Wifi, 
  Zap, 
  Maximize2, 
  Search, 
  Sliders, 
  ExternalLink,
  Shield,
  Clock,
  Sparkles,
  Camera,
  ZoomIn,
  Download,
  X
} from 'lucide-react';

export const EquipmentSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'specs' | 'software' | 'scanner'>('specs');
  const [searchFilter, setSearchFilter] = useState('');
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string; filename: string } | null>(null);

  return (
    <section id="equipamentos" className="py-20 bg-slate-900/60 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
            <span>Hardware & Software</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>SHINING 3D</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight text-balance">
            Equipamentos e Softwares Utilizados
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            Metodologia baseada no escaner óptico portátil de alta resolução <strong className="text-slate-200">EinScan Rigil</strong> e no software de calibração e fusão volumétrica <strong className="text-slate-200">EXScan Pro versão 1.3.2-7</strong>.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 p-1 bg-slate-950/80 rounded-xl border border-slate-800 max-w-xl mb-8">
          <button
            onClick={() => setActiveTab('specs')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'specs'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Ficha Técnica & Imagem Oficial
          </button>
          <button
            onClick={() => setActiveTab('software')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'software'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Software EXScan Rigil 1.3.2-7
          </button>
          <button
            onClick={() => setActiveTab('scanner')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'scanner'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Escaner EinScan Rigil
          </button>
        </div>

        {/* TAB 1: Specifications (Real Document Image + Searchable Interactive Table) */}
        {activeTab === 'specs' && (
          <div id="especificacoes" className="space-y-8">
            {/* Visual Card showing the Real Document Image */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
              <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                  <span className="font-semibold text-slate-200 text-xs sm:text-sm">
                    Documento de Especificações Oficiais (SHINING 3D)
                  </span>
                  <span className="font-mono text-[11px] text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
                    {EQUIPMENT_ASSETS.scannerSpecs.fileName}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setLightboxImage({
                      url: EQUIPMENT_ASSETS.scannerSpecs.url,
                      title: "Especificações Scanner Rigil",
                      filename: EQUIPMENT_ASSETS.scannerSpecs.fileName
                    })}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                  >
                    <ZoomIn className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Ampliar</span>
                  </button>
                  <a
                    href={EQUIPMENT_ASSETS.scannerSpecs.url}
                    download={EQUIPMENT_ASSETS.scannerSpecs.fileName}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                    title="Baixar imagem original"
                  >
                    <Download className="w-3.5 h-3.5 text-cyan-400" />
                  </a>
                </div>
              </div>

              {/* Real Image Preview */}
              <div 
                className="relative bg-slate-950 p-3 sm:p-6 flex items-center justify-center cursor-pointer group"
                onClick={() => setLightboxImage({
                  url: EQUIPMENT_ASSETS.scannerSpecs.url,
                  title: "Especificações Scanner Rigil",
                  filename: EQUIPMENT_ASSETS.scannerSpecs.fileName
                })}
              >
                <img
                  src={EQUIPMENT_ASSETS.scannerSpecs.url}
                  alt={EQUIPMENT_ASSETS.scannerSpecs.caption}
                  className="max-h-[460px] w-auto object-contain rounded-lg border border-slate-800 shadow-xl group-hover:border-cyan-500/50 transition-colors"
                />
                <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="bg-slate-950/90 text-cyan-300 px-3 py-1.5 rounded-lg border border-cyan-500/40 text-xs flex items-center gap-1.5 shadow-xl">
                    <ZoomIn className="w-4 h-4" />
                    Clique para tela cheia
                  </span>
                </div>
              </div>
            </div>

            {/* Categorized Specifications Table */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
              <div className="p-4 sm:p-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/50">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-cyan-400" />
                    <span>Consulta Paramétrica Rápida</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Filtragem interativa para consulta rápida de dados operacionais
                  </p>
                </div>

                {/* Filter Search Input */}
                <div className="relative min-w-[240px]">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Filtrar por modo, resolução..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              <div className="divide-y divide-slate-800">
                {TECHNICAL_SPECIFICATIONS.map((category, catIdx) => {
                  const filteredItems = category.items.filter(
                    item => item.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
                            item.value.toLowerCase().includes(searchFilter.toLowerCase())
                  );

                  if (filteredItems.length === 0) return null;

                  return (
                    <div key={catIdx} className="p-4 sm:p-6">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                        {category.category}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {filteredItems.map((item, itemIdx) => (
                          <div 
                            key={itemIdx}
                            className={`p-3 rounded-lg border transition-all ${
                              item.highlight 
                                ? 'bg-cyan-950/20 border-cyan-800/60 shadow-sm'
                                : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                            }`}
                          >
                            <span className="text-[11px] text-slate-400 block mb-1">{item.name}</span>
                            <span className={`text-xs font-semibold ${item.highlight ? 'text-cyan-300' : 'text-slate-200'}`}>
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Software EXScan Rigil (Real Screenshot + Context) */}
        {activeTab === 'software' && (
          <div className="space-y-6">
            <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
              <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  <span className="font-semibold text-slate-200 text-xs sm:text-sm">
                    Captura Real da Tela do Software EXScan Pro (v1.3.2-7)
                  </span>
                  <span className="font-mono text-[11px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                    {EQUIPMENT_ASSETS.softwareSplash.fileName}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setLightboxImage({
                      url: EQUIPMENT_ASSETS.softwareSplash.url,
                      title: "Tela Software EXScan Pro v1.3.2-7",
                      filename: EQUIPMENT_ASSETS.softwareSplash.fileName
                    })}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                  >
                    <ZoomIn className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Ampliar</span>
                  </button>
                  <a
                    href={EQUIPMENT_ASSETS.softwareSplash.url}
                    download={EQUIPMENT_ASSETS.softwareSplash.fileName}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                    title="Baixar imagem original"
                  >
                    <Download className="w-3.5 h-3.5 text-cyan-400" />
                  </a>
                </div>
              </div>

              {/* Real Software Image */}
              <div 
                className="relative bg-slate-950 p-4 sm:p-8 flex items-center justify-center cursor-pointer group"
                onClick={() => setLightboxImage({
                  url: EQUIPMENT_ASSETS.softwareSplash.url,
                  title: "Tela Software EXScan Pro v1.3.2-7",
                  filename: EQUIPMENT_ASSETS.softwareSplash.fileName
                })}
              >
                <img
                  src={EQUIPMENT_ASSETS.softwareSplash.url}
                  alt={EQUIPMENT_ASSETS.softwareSplash.caption}
                  className="max-h-[500px] w-full object-contain rounded-lg border border-slate-800 shadow-2xl group-hover:border-cyan-500/50 transition-colors"
                />
                <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="bg-slate-950/90 text-cyan-300 px-3 py-1.5 rounded-lg border border-cyan-500/40 text-xs flex items-center gap-1.5 shadow-xl">
                    <ZoomIn className="w-4 h-4" />
                    Clique para tela cheia
                  </span>
                </div>
              </div>
            </div>

            {/* Software Capabilities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-2 mb-2 text-cyan-400 text-xs font-semibold uppercase">
                  <Layers className="w-4 h-4" />
                  <span>Calibração Óptica</span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1">
                  Protocolo Automático de 9 Posições
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Realizado com a placa cerâmica de calibração para assegurar desvio volumétrico inferior a 0,02 mm antes de cada bateria de varredura.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-2 mb-2 text-emerald-400 text-xs font-semibold uppercase">
                  <Sparkles className="w-4 h-4" />
                  <span>Fusão Watertight</span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1">
                  Algoritmo de Fechamento de Malha
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Cria modelos tridimensionais estanques (sólidos fechados), ideais para análise volumétrica precisa e manufatura aditiva 3D sem furos.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-2 mb-2 text-indigo-400 text-xs font-semibold uppercase">
                  <Sliders className="w-4 h-4" />
                  <span>Controle Fotométrico</span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1">
                  Varredura sem Spray Antirreflexo
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  O laser azul de alta densidade capturou a superfície óssea natural mantendo a textura e os sulcos anatômicos sem impregnação química.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Handheld Scanner Hardware Details */}
        {activeTab === 'scanner' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Visual Card Representing the EinScan Rigil */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-8 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

              {/* Product Photo of Scanner */}
              <div className="relative z-10 flex flex-col items-center justify-center py-4">
                <div className="relative group flex items-center justify-center">
                  <div className="absolute inset-0 bg-cyan-500/15 rounded-full blur-2xl group-hover:bg-cyan-500/25 transition-all duration-500"></div>
                  <img
                    src="/EinScan_Rigil_Hardware.png"
                    alt="Scanner 3D EinScan Rigil - SHINING 3D"
                    className="relative z-10 w-64 h-56 object-contain drop-shadow-[0_15px_30px_rgba(6,182,212,0.25)] hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="mt-4 text-center">
                  <span className="text-base font-bold text-white block">EinScan Rigil</span>
                  <span className="text-xs text-cyan-400 font-mono">SHINING 3D Handheld Precision</span>
                </div>
              </div>
            </div>

            {/* Hardware Features Breakdown */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-2 mb-2 text-cyan-400 text-xs font-semibold uppercase">
                  <Zap className="w-4 h-4" />
                  <span>Dupla Tecnologia Óptica & Resolução</span>
                </div>
                <h4 className="text-base font-bold text-white mb-1">
                  Laser HD & IR Rápido (Laser Azul | IR VCSEL)
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Resolução de 0,05 ~ 10 mm (Modo Laser HD) e 0,2 ~ 10 mm (Modo IR Rápido). Distância de trabalho de 170 ~ 550 mm (Laser HD) e 160 ~ 1500 mm (IR Rápido).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-2 mb-2 text-emerald-400 text-xs font-semibold uppercase">
                  <Wifi className="w-4 h-4" />
                  <span>Modos de Trabalho & Alinhamento</span>
                </div>
                <h4 className="text-base font-bold text-white mb-1">
                  Conexão Sem Fio Independente | PC Sem Fio | PC com Fio
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Alinhamento avançado por Marcadores Globais, Marcadores, Características, Textura e Híbrido, garantindo liberdade total na mesa laboratorial.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-2 mb-2 text-indigo-400 text-xs font-semibold uppercase">
                  <Clock className="w-4 h-4" />
                  <span>Velocidade de Digitalização</span>
                </div>
                <h4 className="text-base font-bold text-white mb-1">
                  Modo Laser HD: até 4.800.000 pts/s | Modo IR: 16.000.000 pts/s
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Altíssima taxa de amostragem que reduz o tempo de permanência da peça exposta em bancada para menos de 6 minutos por vértebra, acelerando o fluxo de pesquisa laboratorial.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal for Equipment Assets */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setLightboxImage(null)}
        >
          <div 
            className="relative max-w-5xl max-h-[92vh] w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between pb-3 text-slate-200 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm sm:text-base">{lightboxImage.title}</span>
                <span className="font-mono text-xs text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
                  {lightboxImage.filename}
                </span>
              </div>
              <button
                onClick={() => setLightboxImage(null)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 w-full flex items-center justify-center max-h-[80vh]">
              <img
                src={lightboxImage.url}
                alt={lightboxImage.title}
                className="max-h-[75vh] max-w-full object-contain rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
