import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Aprendiz, ResultadoEvaluacion } from '../types/sena';
import { syncNovedadInRealTime } from '../services/sheetsService';
import { CoordinatorDashboard } from '../components/CoordinatorDashboard';
import { ApprenticeProfileBar } from '../components/ApprenticeProfileBar';
import { IdentityModule } from '../components/IdentityModule';
import { RightsDutiesModule } from '../components/RightsDutiesModule';
import { DilemmasSimulator } from '../components/DilemmasSimulator';
import { EvaluationQuiz } from '../components/EvaluationQuiz';
import { CertificateModal } from '../components/CertificateModal';
import { NewApprenticeModal } from '../components/NewApprenticeModal';
import { 
  Compass, 
  Scale, 
  HelpCircle, 
  Award, 
  FileCheck2, 
  GraduationCap, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Calendar,
  Send,
  Info
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { 
    user, 
    role, 
    aprendices, 
    fichas, 
    activeAprendiz, 
    setActiveAprendiz, 
    updateAprendiz, 
    addAprendiz 
  } = useAuth();

  // Navigation for Aprendiz tabs
  const [aprendizActiveTab, setAprendizActiveTab] = useState<
    'reglamento' | 'dilemas' | 'evaluacion' | 'novedades' | 'identidad'
  >('reglamento');

  // Modals state
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [certificateAprendiz, setCertificateAprendiz] = useState<Aprendiz>(activeAprendiz);
  const [isNewAprendizOpen, setIsNewAprendizOpen] = useState(false);

  // Solicitud de Novedad Form State (Aprendiz)
  const [tipoNovedad, setTipoNovedad] = useState<'Traslado' | 'Aplazamiento' | 'Reingreso' | 'Retiro Voluntario'>('Traslado');
  const [motivoNovedad, setMotivoNovedad] = useState('');
  const [novedadSubmitted, setNovedadSubmitted] = useState(false);

  // Handler when evaluation is completed
  const handleEvaluationCompleted = (result: ResultadoEvaluacion) => {
    const isApproved = result.aprobado;
    const completedModules = Array.from(new Set([...activeAprendiz.modulosCompletados, 'evaluacion']));
    
    const updated: Aprendiz = {
      ...activeAprendiz,
      estadoEvaluacion: isApproved ? 'Aprobado' : 'No aprobado',
      calificacionEvaluacion: result.puntaje,
      progresoInduccion: isApproved ? 100 : Math.max(activeAprendiz.progresoInduccion, 85),
      modulosCompletados: completedModules,
      fechaCompletado: isApproved ? new Date().toISOString().split('T')[0] : activeAprendiz.fechaCompletado,
      codigoCertificado: isApproved ? (activeAprendiz.codigoCertificado || `SENA-REG-2026-${activeAprendiz.documento.slice(-5)}A`) : undefined
    };


    updateAprendiz(updated);
    if (isApproved) {
      setCertificateAprendiz(updated);
    }
  };

  const handleCompleteModule = (moduleId: string) => {
    if (!activeAprendiz.modulosCompletados.includes(moduleId)) {
      const updatedModules = [...activeAprendiz.modulosCompletados, moduleId];
      const newProgress = Math.min(100, Math.round((updatedModules.length / 4) * 100));
      updateAprendiz({
        ...activeAprendiz,
        modulosCompletados: updatedModules,
        progresoInduccion: Math.max(activeAprendiz.progresoInduccion, newProgress)
      });
    }
  };

  const handleOpenCertificate = (targetAprendiz?: Aprendiz) => {
    setCertificateAprendiz(targetAprendiz || activeAprendiz);
    setIsCertificateOpen(true);
  };

  const handleNovedadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!motivoNovedad.trim()) return;
    setNovedadSubmitted(true);
    const radicadoNum = `SEN-NOV-${Date.now().toString().slice(-6)}`;

    // Sync Novedad to Google Sheets in real-time
    syncNovedadInRealTime({
      radicado: radicadoNum,
      documento: activeAprendiz.documento,
      nombre: activeAprendiz.nombre,
      programa: activeAprendiz.programaFormacion,
      ficha: activeAprendiz.fichaNumero,
      tipoNovedad,
      motivo: motivoNovedad.trim()
    }).catch(console.error);

    setTimeout(() => {
      setMotivoNovedad('');
    }, 4000);
  };

  // If role is INSTRUCTOR: render Instructor / Coordinator Dashboard
  if (role === 'instructor') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-emerald-900 text-white shadow-lg">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-800 text-emerald-200 text-xs font-semibold mb-1">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Rol Activo: Instructor / Coordinación Académica</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black">
              Panel de Control Docente y Seguimiento a Fichas
            </h1>
            <p className="text-xs text-emerald-200 mt-0.5">
              Supervisión de competencias, evaluación y comités bajo el Reglamento Vigente (Acuerdo 2026 - Deroga Acuerdo 007 de 2012)
            </p>

          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsNewAprendizOpen(true)}
              className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs rounded-xl transition shadow-md cursor-pointer flex items-center gap-2"
            >
              <span>+ Matricular Aprendiz</span>
            </button>
          </div>
        </div>

        {/* Full Coordinator Dashboard Component */}
        <CoordinatorDashboard
          aprendices={aprendices}
          fichas={fichas}
          onSelectAprendiz={(apr) => {
            setActiveAprendiz(apr);
            handleOpenCertificate(apr);
          }}
          onOpenNewAprendizModal={() => setIsNewAprendizOpen(true)}
          onViewCertificateForAprendiz={(apr) => handleOpenCertificate(apr)}
        />

        {/* Certificate Modal */}
        <CertificateModal
          aprendiz={certificateAprendiz}
          isOpen={isCertificateOpen}
          onClose={() => setIsCertificateOpen(false)}
        />

        {/* New Apprentice Modal */}
        <NewApprenticeModal
          isOpen={isNewAprendizOpen}
          onClose={() => setIsNewAprendizOpen(false)}
          fichas={fichas}
          onAddAprendiz={(newApr) => addAprendiz(newApr)}
        />
      </div>
    );
  }

  // If role is APRENDIZ: render Apprentice Induction and Regulation Dashboard
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-fadeIn">
      
      {/* Top Apprentice Profile & Quick Switch Bar */}
      <ApprenticeProfileBar
        aprendices={aprendices}
        activeAprendiz={activeAprendiz}
        onSelectAprendiz={(apr) => setActiveAprendiz(apr)}
        fichas={fichas}
        onOpenCertificate={() => handleOpenCertificate(activeAprendiz)}
      />

      {/* Navigation Tabs for Apprentice */}
      <div className="bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap gap-2">
        
        <button
          onClick={() => setAprendizActiveTab('reglamento')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
            aprendizActiveTab === 'reglamento'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>1. Reglamento Vigente (Acuerdo 2026)</span>

          {activeAprendiz.modulosCompletados.includes('derechos_deberes') && (
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
          )}
        </button>

        <button
          onClick={() => setAprendizActiveTab('dilemas')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
            aprendizActiveTab === 'dilemas'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>2. Casos y Dilemas Reglamentarios</span>
          {activeAprendiz.modulosCompletados.includes('casos_practicos') && (
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
          )}
        </button>

        <button
          onClick={() => setAprendizActiveTab('evaluacion')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
            aprendizActiveTab === 'evaluacion'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>3. Evaluación de Conocimiento Normativo</span>
          {activeAprendiz.estadoEvaluacion === 'Aprobado' && (
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
          )}
        </button>

        <button
          onClick={() => setAprendizActiveTab('novedades')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
            aprendizActiveTab === 'novedades'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <FileCheck2 className="w-4 h-4" />
          <span>4. Trámites y Radicación de Novedades</span>
        </button>

        <button
          onClick={() => setAprendizActiveTab('identidad')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
            aprendizActiveTab === 'identidad'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>5. Símbolos SENA</span>
          {activeAprendiz.modulosCompletados.includes('identidad') && (
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
          )}
        </button>

      </div>


      {/* Tab 1: Identidad SENA & FPI */}
      {aprendizActiveTab === 'identidad' && (
        <IdentityModule
          onCompleteModule={() => handleCompleteModule('identidad')}
          isCompleted={activeAprendiz.modulosCompletados.includes('identidad')}
          onGoToNext={() => {
            handleCompleteModule('identidad');
            setAprendizActiveTab('reglamento');
          }}
        />
      )}

      {/* Tab 1: Reglamento del Aprendiz (Acuerdo 2026 - Vigente) */}
      {aprendizActiveTab === 'reglamento' && (
        <RightsDutiesModule
          onCompleteModule={() => handleCompleteModule('derechos_deberes')}
          isCompleted={activeAprendiz.modulosCompletados.includes('derechos_deberes')}
          onGoToNext={() => {
            handleCompleteModule('derechos_deberes');
            setAprendizActiveTab('dilemas');
          }}
        />
      )}

      {/* Tab 3: Dilemas Éticos */}
      {aprendizActiveTab === 'dilemas' && (
        <DilemmasSimulator
          onCompleteModule={() => handleCompleteModule('casos_practicos')}
          isCompleted={activeAprendiz.modulosCompletados.includes('casos_practicos')}
          onGoToEvaluation={() => {
            handleCompleteModule('casos_practicos');
            setAprendizActiveTab('evaluacion');
          }}
        />
      )}

      {/* Tab 4: Evaluación de Inducción */}
      {aprendizActiveTab === 'evaluacion' && (
        <EvaluationQuiz
          activeAprendiz={activeAprendiz}
          onEvaluationCompleted={handleEvaluationCompleted}
          onOpenCertificate={() => handleOpenCertificate(activeAprendiz)}
          onReviewIdentity={() => setAprendizActiveTab('identidad')}
          onReviewRights={() => setAprendizActiveTab('reglamento')}
        />
      )}

      {/* Tab 5: Radicación de Novedades del Aprendiz */}
      {aprendizActiveTab === 'novedades' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-emerald-600" />
              Ventanilla de Radicación de Novedades Académicas y Administrativas
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Conforme al Capítulo de Trámites y Novedades del Reglamento del Aprendiz (Acuerdo 2026).
            </p>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Aprendiz Solicitante:</span>
              <p className="font-bold text-sm text-slate-900 dark:text-white">{activeAprendiz.nombre}</p>
              <p className="text-xs text-slate-500">{activeAprendiz.tipoDocumento}: {activeAprendiz.documento}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Ficha de Caracterización:</span>
              <p className="font-bold text-sm text-slate-900 dark:text-white">{activeAprendiz.fichaNumero}</p>
              <p className="text-xs text-slate-500">{activeAprendiz.programaFormacion}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Centro & Jornada:</span>
              <p className="font-bold text-sm text-slate-900 dark:text-white">{activeAprendiz.centroFormacion}</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Jornada {activeAprendiz.jornada}</p>
            </div>
          </div>

          {novedadSubmitted && (
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 flex items-start gap-2 animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">¡Solicitud radicada formalmente ante Coordinación Académica!</p>
                <p className="text-emerald-800 dark:text-emerald-300 mt-0.5">
                  Radicado: <strong>SEN-NOV-{Date.now().toString().slice(-6)}</strong>. Tiempo reglamentario de respuesta: 10 a 15 días hábiles conforme al debido proceso.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleNovedadSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Tipo de Trámite o Novedad:
              </label>
              <select
                value={tipoNovedad}
                onChange={(e) => setTipoNovedad(e.target.value as any)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Traslado">Traslado de Centro de Formación o Jornada</option>
                <option value="Aplazamiento">Aplazamiento de la Formación (Hasta 6 meses reglamentarios)</option>
                <option value="Reingreso">Reingreso a la Formación (Mínimo 15 días hábiles antes de iniciar periodo)</option>
                <option value="Retiro Voluntario">Retiro Voluntario de la Formación</option>
              </select>
            </div>

            {/* Informational Regulation Note based on selected novedad */}
            <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 text-xs text-blue-900 dark:text-blue-200 flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                {tipoNovedad === 'Traslado' && (
                  <span><strong>Regla reglamentaria:</strong> Requiere haber aprobado como mínimo el primer trimestre lectivo y contar con disponibilidad de cupo en la ficha receptora.</span>
                )}
                {tipoNovedad === 'Aplazamiento' && (
                  <span><strong>Regla reglamentaria:</strong> Se otorga por un máximo de seis (6) meses continuos o discontinuos, prorrogable por única vez hasta 6 meses más con justa causa demostrada.</span>
                )}
                {tipoNovedad === 'Reingreso' && (
                  <span><strong>Regla reglamentaria:</strong> Debe radicarse con al menos 15 días hábiles de antelación al inicio del trimestre para verificar vigencia del programa curricular.</span>
                )}
                {tipoNovedad === 'Retiro Voluntario' && (
                  <span><strong>Regla reglamentaria:</strong> El retiro voluntario debe manifestarse por escrito para evitar la declaratoria formal de deserción y sanciones asociadas.</span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Justificación y Exposición de Motivos:
              </label>
              <textarea
                required
                rows={4}
                value={motivoNovedad}
                onChange={(e) => setMotivoNovedad(e.target.value)}
                placeholder="Describe detalladamente los motivos personales, laborales, de salud o de fuerza mayor que sustentan tu solicitud..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition flex items-center gap-2 text-xs shadow-md shadow-emerald-600/20 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Radicar Novedad Oficial</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Certificate Modal */}
      <CertificateModal
        aprendiz={certificateAprendiz}
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
      />

    </div>
  );
};
