import React from 'react';
import { Aprendiz, FichaCaract } from '../types/sena';
import { User, ChevronDown, CheckCircle2, Clock, XCircle, Award } from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface ApprenticeProfileBarProps {
  aprendices: Aprendiz[];
  activeAprendiz: Aprendiz;
  onSelectAprendiz: (aprendiz: Aprendiz) => void;
  fichas: FichaCaract[];
  onOpenCertificate: () => void;
}

export const ApprenticeProfileBar: React.FC<ApprenticeProfileBarProps> = ({
  aprendices,
  activeAprendiz,
  onSelectAprendiz,
  fichas,
  onOpenCertificate
}) => {
  const currentFicha = fichas.find(f => f.id === activeAprendiz.fichaId);

  const getStatusBadge = () => {
    switch (activeAprendiz.estadoEvaluacion) {
      case 'Aprobado':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Aprobado ({activeAprendiz.calificacionEvaluacion}%)</span>
          </span>
        );
      case 'No aprobado':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-700">
            <XCircle className="w-3.5 h-3.5" />
            <span>Refuerzo requerido ({activeAprendiz.calificacionEvaluacion}%)</span>
          </span>
        );
      case 'En proceso':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700">
            <Clock className="w-3.5 h-3.5" />
            <span>En proceso</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500">
            <Clock className="w-3.5 h-3.5" />
            <span>Pendiente de evaluación</span>
          </span>
        );
    }
  };

  return (
    <div className="bg-white border-b border-slate-200 py-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Apprentice identity info with selector */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 p-1.5 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center shrink-0">
            <SenaLogo className="w-7 h-7" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                Aprendiz Activo:
              </span>
              <div className="relative inline-block">
                <select
                  value={activeAprendiz.id}
                  onChange={(e) => {
                    const selected = aprendices.find(a => a.id === e.target.value);
                    if (selected) onSelectAprendiz(selected);
                  }}
                  className="text-sm font-bold text-slate-900 bg-transparent hover:bg-slate-50 rounded pr-6 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#39A900]"
                >
                  {aprendices.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.nombre} ({a.documento})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-1 top-1.5 pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 mt-0.5">
              <span>Ficha {activeAprendiz.fichaNumero}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="truncate max-w-xs">{activeAprendiz.programaFormacion}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>{activeAprendiz.regional}</span>
            </div>
          </div>
        </div>

        {/* Induction progress & certificate action */}
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-3 text-xs">
              <span className="text-slate-500 font-medium">Progreso de Inducción:</span>
              <span className="font-bold text-slate-900 tabular-nums">
                {activeAprendiz.progresoInduccion}%
              </span>
              <span aria-hidden="true" className="text-slate-300">|</span>
              {getStatusBadge()}
            </div>

            {/* Progress bar */}
            <div className="w-48 h-2 bg-slate-100 rounded-full overflow-hidden mt-1.5 border border-slate-200">
              <div 
                className="h-full bg-[#39A900] transition-all duration-500 rounded-full"
                style={{ width: `${activeAprendiz.progresoInduccion}%` }}
              />
            </div>
          </div>

          {activeAprendiz.estadoEvaluacion === 'Aprobado' && (
            <button
              onClick={onOpenCertificate}
              className="px-3 py-1.5 bg-[#39A900] text-white hover:bg-[#329600] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Ver Constancia</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
