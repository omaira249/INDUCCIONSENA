import React, { useState } from 'react';
import { Aprendiz } from '../types/sena';
import { Award, Printer, Download, Check, X, ShieldCheck, QrCode } from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface CertificateModalProps {
  aprendiz: Aprendiz;
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  aprendiz,
  isOpen,
  onClose
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const certificateCode = aprendiz.codigoCertificado || `SENA-REG-2026-${aprendiz.documento.slice(-5)}X`;
  const fechaHoy = aprendiz.fechaCompletado || new Date().toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(certificateCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Top Control Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <SenaLogo className="w-5 h-5" />
            <span className="text-sm font-bold tracking-tight">
              Constancia Oficial de Inducción SENA
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-[#39A900] hover:bg-[#329600] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              title="Cerrar ventana"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Certificate Printable Body */}
        <div 
          id="sena-certificate-print"
          className="p-8 sm:p-12 bg-[#FDFEFA] text-slate-900 border-8 border-double border-emerald-900/20 relative"
        >
          {/* Watermark background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04] select-none">
            <SenaLogo className="w-[500px] h-[500px]" />
          </div>

          {/* Certificate Header */}
          <div className="text-center pb-6 border-b-2 border-emerald-800/30">
            <div className="flex items-center justify-center gap-4 mb-2">
              <div className="w-16 h-16 p-1.5 rounded-xl bg-white border border-emerald-200 shadow-xs flex items-center justify-center">
                <SenaLogo className="w-14 h-14" />
              </div>
              <div className="text-left">
                <div className="text-xs uppercase tracking-widest font-extrabold text-emerald-800">
                  República de Colombia
                </div>
                <div className="text-lg font-black tracking-tight text-slate-900 leading-none">
                  SERVICIO NACIONAL DE APRENDIZAJE - SENA
                </div>
                <div className="text-[10px] uppercase font-bold text-slate-500">
                  Dirección de Formación Profesional Integral
                </div>
              </div>
            </div>

            <div className="mt-4 inline-block px-4 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-extrabold text-emerald-900 tracking-wider uppercase">
              Constancia de Inducción y Apropiación Institucional
            </div>
          </div>

          {/* Certificate Main Text */}
          <div className="my-8 text-center max-w-2xl mx-auto space-y-4">
            <p className="text-xs uppercase tracking-widest font-bold text-slate-500">
              La Subdirección de Centro y la Coordinación Académica hacen constar que:
            </p>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-serif uppercase py-1 border-b border-slate-200 inline-block">
              {aprendiz.nombre}
            </h2>

            <p className="text-xs sm:text-sm text-slate-700">
              Identificado(a) con <strong>{aprendiz.tipoDocumento} No. {aprendiz.documento}</strong>
            </p>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-xl mx-auto pt-2">
              Completó y aprobó con éxito la fundamentación sobre el <strong>Reglamento del Aprendiz SENA vigente (Acuerdo 2026, el cual deroga en su totalidad el anterior Acuerdo 007 de 2012)</strong>, demostrando idoneidad en sus deberes, derechos, trámites académicos, causales de deserción y garantías del debido proceso formativo.
            </p>

            {/* Details Box */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-xl border border-slate-200 text-left my-6 shadow-xs">
              <div>
                <span className="text-[10px] uppercase text-slate-400 font-bold block">Programa</span>
                <span className="text-xs font-bold text-slate-800 line-clamp-2">{aprendiz.programaFormacion}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-slate-400 font-bold block">Ficha Caracterización</span>
                <span className="text-xs font-bold text-slate-800">{aprendiz.fichaNumero}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-slate-400 font-bold block">Calificación</span>
                <span className="text-xs font-bold text-[#39A900]">{aprendiz.calificacionEvaluacion || 92}% (Competente)</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-slate-400 font-bold block">Sede / Regional</span>
                <span className="text-xs font-bold text-slate-800 truncate block">{aprendiz.regional}</span>
              </div>
            </div>
          </div>

          {/* Certificate Signatures */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-200 text-center items-end">
            <div>
              <div className="w-36 mx-auto border-b border-slate-400 pb-1 mb-1 font-serif text-sm italic text-slate-600">
                Dr. Germán Rivera M.
              </div>
              <span className="text-[10px] font-bold uppercase text-slate-700 block">
                Subdirector de Centro
              </span>
              <span className="text-[9px] text-slate-500">SENA Dirección Regional</span>
            </div>

            {/* Verification QR simulation */}
            <div className="flex flex-col items-center justify-center p-2">
              <div className="w-16 h-16 bg-slate-100 border border-slate-300 rounded p-1 flex items-center justify-center mb-1">
                <QrCode className="w-12 h-12 text-slate-800" />
              </div>
              <span className="text-[9px] font-mono font-bold text-slate-600">
                {certificateCode}
              </span>
              <span className="text-[8px] text-slate-400">Verificación Digital SENA</span>
            </div>

            <div>
              <div className="w-36 mx-auto border-b border-slate-400 pb-1 mb-1 font-serif text-sm italic text-slate-600">
                Lic. Sandra Gómez P.
              </div>
              <span className="text-[10px] font-bold uppercase text-slate-700 block">
                Coordinadora Académica
              </span>
              <span className="text-[9px] text-slate-500">Gestión de la Formación</span>
            </div>
          </div>

          <div className="mt-8 text-center text-[10px] text-slate-400 flex items-center justify-between border-t border-slate-100 pt-3">
            <span>Expedido el {fechaHoy} · Conforme al Acuerdo 2026 del Consejo Directivo Nacional del SENA · Colombia</span>
            <span className="flex items-center gap-1 text-[#39A900] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Documento Oficial Certificado</span>
            </span>
          </div>

        </div>

        {/* Modal Bottom Actions */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span>Código de verificación:</span>
            <code className="bg-white px-2 py-0.5 rounded border border-slate-300 font-mono font-bold text-slate-800">
              {certificateCode}
            </code>
            <button
              onClick={handleCopyCode}
              className="text-xs text-[#39A900] font-semibold hover:underline flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : null}
              <span>{copied ? 'Copiado' : 'Copiar'}</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir Constancia</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-semibold transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
