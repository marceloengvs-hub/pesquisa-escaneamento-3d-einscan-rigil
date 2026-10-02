import React from 'react';
import { X, Printer, Download, CheckCircle, ShieldCheck, FileText } from 'lucide-react';
import { SPECIMENS, TECHNICAL_SPECIFICATIONS } from '../data/researchData';

interface ResearchProtocolModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResearchProtocolModal: React.FC<ResearchProtocolModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-8 print:border-none print:shadow-none print:bg-white print:text-black">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-white">
              Protocolo Metodológico de Digitalização 3D
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / Salvar PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto print:max-h-none print:overflow-visible print:p-0">
          {/* Institutional Title */}
          <div className="border-b border-slate-800 pb-4 print:border-black">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-1 print:text-gray-700">
              Documento Técnico de Pesquisa Científica · Procedimento Operacional Padrão (POP)
            </span>
            <h2 className="text-2xl font-bold text-white print:text-black">
              Digitalização Óptica Tridimensional de Espécimes Ósseos com EinScan Rigil
            </h2>
            <div className="flex flex-wrap gap-4 mt-2 text-xs text-slate-400 print:text-gray-600">
              <span><strong>Hardware:</strong> EinScan Rigil (SHINING 3D)</span>
              <span><strong>Software:</strong> EXScan Rigil / EXScan Pro v1.3.2-7</span>
              <span><strong>Validação:</strong> Creality Print 7.0 (Smooth PEI Plate)</span>
            </div>
          </div>

          {/* 1. Objetivos da Pesquisa */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-200 uppercase print:text-black">
              1. Objetivo Geral e Escopo
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed print:text-gray-800">
              Estabelecer e validar um método padronizado de escaneamento tridimensional sem contato físico e sem uso de marcadores adesivos invasivos para a preservação digital e mensuração morfométrica de estruturas ósseas humanas com alta resolução geométrica (0,05 mm).
            </p>
          </div>

          {/* 2. Resumo dos Parâmetros por Espécime */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-200 uppercase print:text-black">
              2. Parâmetros Metodológicos por Amostra
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-800 print:border-gray-300">
                <thead className="bg-slate-950 text-slate-300 font-semibold print:bg-gray-100 print:text-black">
                  <tr>
                    <th className="p-2 border-b border-slate-800 print:border-gray-300">Amostra</th>
                    <th className="p-2 border-b border-slate-800 print:border-gray-300">Modo Óptico</th>
                    <th className="p-2 border-b border-slate-800 print:border-gray-300">Resolução</th>
                    <th className="p-2 border-b border-slate-800 print:border-gray-300">Distância Focal</th>
                    <th className="p-2 border-b border-slate-800 print:border-gray-300">Nuvem de Pontos</th>
                    <th className="p-2 border-b border-slate-800 print:border-gray-300">Alinhamento</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 print:divide-gray-300 font-mono text-[11px]">
                  {SPECIMENS.map((sp) => (
                    <tr key={sp.id}>
                      <td className="p-2 font-sans font-medium text-slate-200 print:text-black">
                        {sp.title}
                      </td>
                      <td className="p-2 text-slate-300 print:text-gray-800">{sp.parameters.mode}</td>
                      <td className="p-2 text-cyan-400 font-bold print:text-black">{sp.parameters.resolution}</td>
                      <td className="p-2 text-slate-300 print:text-gray-800">{sp.parameters.workingDistance}</td>
                      <td className="p-2 text-emerald-400 print:text-black">{sp.parameters.pointsAcquired}</td>
                      <td className="p-2 font-sans text-slate-300 print:text-gray-800">{sp.parameters.alignmentMethod}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 3. Recomendações e Boas Práticas */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-200 uppercase print:text-black">
              3. Regras de Preservação e Boas Práticas Laboratoriais
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400 print:text-gray-700 list-disc list-inside">
              <li>Nunca aplicar tintas de contraste, pós brancos abrasivos ou adesivos reflexivos sobre material ósseo fóssil ou osteológico delicado.</li>
              <li>Ajustar a taxa de exposição do laser azul de modo a evitar saturação nas bordas corticais claras.</li>
              <li>Sempre validar se a malha final fechada (Watertight) preservou os forames anatômicos passantes antes de arquivar o arquivo .STL/.OBJ.</li>
              <li>Registrar no caderno de laboratório a versão exata do software de aquisição: EXScan Rigil 1.3.2-7.</li>
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between print:hidden">
          <span className="text-xs text-slate-500 font-mono">
            Documento gerado para subsidiar pesquisa acadêmica discente
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
