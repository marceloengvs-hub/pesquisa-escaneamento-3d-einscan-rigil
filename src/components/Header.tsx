import React, { useState } from 'react';
import { Menu, X, FileText, Camera, Film, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenProtocol: () => void;
  onOpenMediaGallery: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenProtocol, onOpenMediaGallery }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Brand wordmark */}
        <a href="#hero" className="text-lg font-bold tracking-tight text-white hover:text-cyan-400 transition-colors whitespace-nowrap flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
          <span>BIO-SCAN 3D</span>
        </a>

        {/* Zone 2: Navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="#metodologia" className="hover:text-cyan-400 transition-colors">
            Metodologia
          </a>
          <a href="#equipamentos" className="hover:text-cyan-400 transition-colors">
            Equipamentos
          </a>
          <a href="#especificacoes" className="hover:text-cyan-400 transition-colors">
            Especificações
          </a>
          <a href="#amostras" className="hover:text-cyan-400 transition-colors">
            Amostras 3D & MP4
          </a>
        </nav>

        {/* Zone 3: Primary actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenMediaGallery}
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-300 bg-amber-950/40 hover:bg-amber-900/50 border border-amber-700/60 rounded-lg transition-colors whitespace-nowrap"
            title="Ver todas as 11 imagens e 3 vídeos MP4 enviados"
          >
            <Camera className="w-3.5 h-3.5 text-amber-400" />
            <span>Mídias Reais (14)</span>
          </button>

          <button
            onClick={onOpenProtocol}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors whitespace-nowrap shadow-sm shadow-cyan-500/20"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Protocolo POP</span>
          </button>

          <a
            href="#amostras"
            className="px-3.5 py-1.5 text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
          >
            Ver Amostras
          </a>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/98 px-4 pt-2 pb-4 space-y-2">
          <a
            href="#metodologia"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800"
          >
            Metodologia
          </a>
          <a
            href="#equipamentos"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800"
          >
            Equipamentos & Software
          </a>
          <a
            href="#especificacoes"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800"
          >
            Especificações Técnicas
          </a>
          <a
            href="#amostras"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800"
          >
            Amostras e Resultados (MP4)
          </a>
          
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenMediaGallery();
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-amber-300 bg-amber-950/60 border border-amber-700/60 rounded-lg transition-colors"
          >
            <Camera className="w-3.5 h-3.5 text-amber-400" />
            <span>Ver Mídias Reais Enviadas (14)</span>
          </button>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenProtocol();
            }}
            className="w-full mt-2 flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Protocolo de Pesquisa (Imprimir)</span>
          </button>
        </div>
      )}
    </header>
  );
};
