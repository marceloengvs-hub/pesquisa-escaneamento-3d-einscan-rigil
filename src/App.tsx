import React, { useState } from 'react';
import { SPECIMENS, SpecimenData } from './data/researchData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MethodologySection } from './components/MethodologySection';
import { EquipmentSection } from './components/EquipmentSection';
import { ComparisonBox } from './components/ComparisonBox';
import { SpecimenDetailModal } from './components/SpecimenDetailModal';
import { ResearchProtocolModal } from './components/ResearchProtocolModal';
import { MediaGalleryModal } from './components/MediaGalleryModal';
import { Footer } from './components/Footer';
import { Camera, Film, CheckCircle } from 'lucide-react';

export default function App() {
  const [selectedSpecimenFilter, setSelectedSpecimenFilter] = useState<string>('all');
  const [activeModalSpecimen, setActiveModalSpecimen] = useState<SpecimenData | null>(null);
  const [isProtocolOpen, setIsProtocolOpen] = useState(false);
  const [isMediaGalleryOpen, setIsMediaGalleryOpen] = useState(false);

  const filteredSpecimens = selectedSpecimenFilter === 'all'
    ? SPECIMENS
    : SPECIMENS.filter((s) => s.id === selectedSpecimenFilter);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* 1. Header (Top Bar Contract) */}
      <Header 
        onOpenProtocol={() => setIsProtocolOpen(true)}
        onOpenMediaGallery={() => setIsMediaGalleryOpen(true)}
      />

      {/* Main Content Arena */}
      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Methodology Section */}
        <MethodologySection />

        {/* 4. Equipment & Software Section (EinScan Rigil & EXScan Pro v1.3.2-7 with real images) */}
        <EquipmentSection />

        {/* 5. Scanned Objects & Comparative Boxes (Core User Request: real photos + final MP4) */}
        <section id="amostras" className="py-20 bg-slate-950 border-t border-slate-850">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
                  <span>Resultados Experimentais</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>Inspeção Comparativa</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight text-balance">
                  Objetos Escaneados e Análise Comparativa
                </h2>
                <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
                  Caixas de visualização comparativa sincronizada: confronte a fotografia dos espécimes ósseos originais com os vídeos de fatiamento no ambiente <strong className="text-emerald-400 font-medium">Creality Print 7.0 (Smooth PEI Plate)</strong> e modelos 3D interativos.
                </p>
                <div className="mt-3 flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 text-amber-400 font-medium">
                    <Camera className="w-3.5 h-3.5" />
                    Fotos Reais de Bancada (Macro)
                  </span>
                  <span className="text-slate-600">·</span>
                  <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                    <Film className="w-3.5 h-3.5" />
                    Vídeos MP4 Slicer (Peça 01, 02 e 03)
                  </span>
                </div>
              </div>

              {/* Functional Segmented Filter Buttons */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs self-start md:self-auto">
                <button
                  onClick={() => setSelectedSpecimenFilter('all')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    selectedSpecimenFilter === 'all'
                      ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Todas ({SPECIMENS.length})
                </button>
                <button
                  onClick={() => setSelectedSpecimenFilter('fragmento-temporal')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    selectedSpecimenFilter === 'fragmento-temporal'
                      ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Peça 01: Frag. Craniano
                </button>
                <button
                  onClick={() => setSelectedSpecimenFilter('atlas-c1')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    selectedSpecimenFilter === 'atlas-c1'
                      ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Peça 02: C1 (Atlas)
                </button>
                <button
                  onClick={() => setSelectedSpecimenFilter('axis-c2')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    selectedSpecimenFilter === 'axis-c2'
                      ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Peça 03: C2 (Áxis)
                </button>
              </div>
            </div>

            {/* List of Comparative Boxes */}
            <div className="space-y-12">
              {filteredSpecimens.map((specimen) => (
                <ComparisonBox
                  key={specimen.id}
                  specimen={specimen}
                  onOpenDetails={(s) => setActiveModalSpecimen(s)}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* 7. Footer */}
      <Footer />

      {/* 8. Modals */}
      <SpecimenDetailModal
        specimen={activeModalSpecimen}
        onClose={() => setActiveModalSpecimen(null)}
      />

      <ResearchProtocolModal
        isOpen={isProtocolOpen}
        onClose={() => setIsProtocolOpen(false)}
      />

      <MediaGalleryModal
        isOpen={isMediaGalleryOpen}
        onClose={() => setIsMediaGalleryOpen(false)}
      />
    </div>
  );
}
