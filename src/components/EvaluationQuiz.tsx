import React, { useState } from 'react';
import { syncAnswerInRealTime, syncEvaluationFinalResult } from '../services/sheetsService';
import confetti from 'canvas-confetti';
import { PREGUNTAS_EVALUACION } from '../data/senaData';
import { PreguntaEvaluacion, ResultadoEvaluacion, Aprendiz } from '../types/sena';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Award, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  AlertCircle, 
  BookOpen 
} from 'lucide-react';

const MODULO_LABELS: Record<string, string> = {
  identidad: 'Identidad y Valores SENA',
  derechos: 'Derechos del Aprendiz',
  deberes: 'Deberes y Prohibiciones',
  etapas_formacion: 'Etapas de Formación y Certificación',
  bienestar_y_tramites: 'Bienestar y Apoyos Socioeconómicos',
  novedades_y_desercion: 'Trámites, Novedades y Deserción',
  debido_proceso: 'Debido Proceso y Comité (Acuerdo 2026)',
  fpi_y_pedagogia: 'FPI y Fases del Proyecto Formativo',
  herramientas_y_canales: 'Herramientas Digitales y Conducto Regular'
};


interface EvaluationQuizProps {
  activeAprendiz: Aprendiz;
  onEvaluationCompleted: (result: ResultadoEvaluacion) => void;
  onOpenCertificate: () => void;
  onReviewIdentity: () => void;
  onReviewRights: () => void;
}

export const EvaluationQuiz: React.FC<EvaluationQuizProps> = ({
  activeAprendiz,
  onEvaluationCompleted,
  onOpenCertificate,
  onReviewIdentity,
  onReviewRights
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [confirmedQuestions, setConfirmedQuestions] = useState<Record<string, boolean>>({});
  const [isFinished, setIsFinished] = useState(activeAprendiz.estadoEvaluacion === 'Aprobado');
  const [evaluationResult, setEvaluationResult] = useState<ResultadoEvaluacion | null>(null);
  const [filterReview, setFilterReview] = useState<'all' | 'incorrect'>('all');

  const currentQuestion = PREGUNTAS_EVALUACION[currentQuestionIndex];
  const selectedAnswerId = userAnswers[currentQuestion.id];
  const isCurrentConfirmed = !!confirmedQuestions[currentQuestion.id];

  const handleSelectOption = (optionId: string) => {
    if (isCurrentConfirmed) return;
    setUserAnswers(prev => ({ ...prev, [currentQuestion.id]: optionId }));
  };

  const handleConfirmAnswer = () => {
    if (!selectedAnswerId) return;
    setConfirmedQuestions(prev => ({ ...prev, [currentQuestion.id]: true }));

    // Sync answer in real time to Google Sheets
    const selectedOpt = currentQuestion.opciones.find(o => o.id === selectedAnswerId);
    const isCorrect = selectedAnswerId === currentQuestion.opcionCorrectaId;
    
    syncAnswerInRealTime({
      documento: activeAprendiz.documento,
      nombre: activeAprendiz.nombre,
      programa: activeAprendiz.programaFormacion,
      ficha: activeAprendiz.fichaNumero,
      modulo: MODULO_LABELS[currentQuestion.modulo] || currentQuestion.modulo,
      pregunta: currentQuestion.enunciado,
      respuestaSeleccionada: selectedOpt?.texto || selectedAnswerId,
      esCorrecta: isCorrect,
      fundamento: `${currentQuestion.articuloReferencia} - ${currentQuestion.explicacionPedagogica}`
    }).catch(console.error);
  };

  const handleFinishQuiz = () => {
    let correctas = 0;
    const desglose: Record<string, { correctas: number; total: number }> = {};

    PREGUNTAS_EVALUACION.forEach((q) => {
      if (!desglose[q.modulo]) {
        desglose[q.modulo] = { correctas: 0, total: 0 };
      }
      desglose[q.modulo].total += 1;

      if (userAnswers[q.id] === q.opcionCorrectaId) {
        correctas += 1;
        desglose[q.modulo].correctas += 1;
      }
    });

    const total = PREGUNTAS_EVALUACION.length;
    const puntaje = Math.round((correctas / total) * 100);
    const aprobado = puntaje >= 80;

    const result: ResultadoEvaluacion = {
      aprendizId: activeAprendiz.id,
      puntaje,
      totalPreguntas: total,
      correctas,
      incorrectas: total - correctas,
      aprobado,
      fecha: new Date().toISOString().split('T')[0],
      desglosePorModulo: desglose,
      respuestasUsuario: userAnswers
    };

    setEvaluationResult(result);
    setIsFinished(true);
    
    // Sync final result to Google Sheets
    syncEvaluationFinalResult({
      documento: activeAprendiz.documento,
      nombre: activeAprendiz.nombre,
      programa: activeAprendiz.programaFormacion,
      ficha: activeAprendiz.fichaNumero,
      puntaje,
      correctas,
      incorrectas: total - correctas,
      aprobado,
      codigoCertificado: aprobado ? (activeAprendiz.codigoCertificado || `SENA-REG-2026-${activeAprendiz.documento.slice(-5)}A`) : undefined
    }).catch(console.error);

    onEvaluationCompleted(result);

    if (aprobado) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#39A900', '#00324D', '#FBBF24', '#10B981']
        });
      } catch (e) {
        // Confetti fallback
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < PREGUNTAS_EVALUACION.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleRestartQuiz = () => {
    setUserAnswers({});
    setConfirmedQuestions({});
    setCurrentQuestionIndex(0);
    setIsFinished(false);
    setEvaluationResult(null);
  };

  const totalAnswered = Object.keys(userAnswers).length;
  const progressPercent = Math.round((totalAnswered / PREGUNTAS_EVALUACION.length) * 100);
  const minRequiredScore = Math.ceil(PREGUNTAS_EVALUACION.length * 0.8);

  // If finished, show review and results
  if (isFinished) {
    const currentScore = evaluationResult?.puntaje ?? activeAprendiz.calificacionEvaluacion ?? 0;
    const isApproved = currentScore >= 80;

    return (
      <div className="space-y-8 pb-16">
        
        {/* Results Banner */}
        <div className={`rounded-2xl border p-6 sm:p-10 text-center shadow-xs transition-colors ${
          isApproved 
            ? 'bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-950/40 dark:to-slate-900 border-emerald-300 dark:border-emerald-800' 
            : 'bg-gradient-to-b from-amber-50 to-white dark:from-amber-950/40 dark:to-slate-900 border-amber-300 dark:border-amber-800'
        }`}>
          <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 shadow-xs">
            {isApproved ? (
              <div className="w-16 h-16 rounded-full bg-[#39A900] text-white flex items-center justify-center">
                <Award className="w-9 h-9" />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-amber-500 text-white flex items-center justify-center">
                <AlertCircle className="w-9 h-9" />
              </div>
            )}
          </div>

          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
            Dictamen del Proceso de Inducción SENA
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {isApproved ? '¡Felicitaciones! Has Aprobado la Inducción' : 'Refuerzo Pedagógico Requerido'}
          </h2>

          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            {isApproved
              ? `Has demostrado un dominio ejemplar del reglamento vigente (Acuerdo 2026, que deroga el Acuerdo 007 de 2012) con una calificación de ${currentScore}%. Tu constancia oficial ya se encuentra disponible para visualización y descarga.`
              : `Alcanzaste una calificación de ${currentScore}%. Para obtener la constancia oficial de inducción debes alcanzar mínimo el 80% (${minRequiredScore} aciertos). Te sugerimos repasar los módulos y reintentar.`}
          </p>

          {/* Metric Badges */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="bg-white dark:bg-slate-800/80 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">Calificación</span>
              <span className="text-xl font-extrabold text-slate-900 dark:text-white tabular-nums">{currentScore}%</span>
            </div>
            <div className="bg-white dark:bg-slate-800/80 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">Aciertos</span>
              <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">
                {evaluationResult?.correctas ?? Math.round((currentScore / 100) * PREGUNTAS_EVALUACION.length)} / {PREGUNTAS_EVALUACION.length}
              </span>
            </div>
            <div className="bg-white dark:bg-slate-800/80 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">Estado</span>
              <span className={`text-sm font-bold block mt-1 ${isApproved ? 'text-[#39A900]' : 'text-amber-600'}`}>
                {isApproved ? 'COMPETENTE' : 'EN REFUERZO'}
              </span>
            </div>
            <div className="bg-white dark:bg-slate-800/80 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">Mínimo Exigido</span>
              <span className="text-xl font-extrabold text-slate-600 dark:text-slate-300 tabular-nums">80%</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {isApproved && (
              <button
                onClick={onOpenCertificate}
                className="px-5 py-2.5 bg-[#39A900] text-white hover:bg-[#329600] rounded-xl text-sm font-semibold flex items-center gap-2 shadow-sm transition-all"
              >
                <Award className="w-4 h-4" />
                <span>Ver y Descargar Constancia Oficial</span>
              </button>
            )}

            <button
              onClick={handleRestartQuiz}
              className="px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Presentar Evaluación Nuevamente</span>
            </button>

            {!isApproved && (
              <button
                onClick={onReviewRights}
                className="px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                <span>Repasar Reglamento y Normativa</span>
              </button>
            )}
          </div>
        </div>

        {/* Detailed Question Review Section */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Revisión Pedagógica de Preguntas
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Analiza las justificaciones reglamentarias para consolidar tu apropiación institucional.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilterReview('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  filterReview === 'all' 
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                Todas ({PREGUNTAS_EVALUACION.length})
              </button>
              <button
                onClick={() => setFilterReview('incorrect')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  filterReview === 'incorrect' 
                    ? 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                Incorrectas ({PREGUNTAS_EVALUACION.filter(q => userAnswers[q.id] !== q.opcionCorrectaId).length})
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {PREGUNTAS_EVALUACION.filter(q => {
              if (filterReview === 'incorrect') {
                return userAnswers[q.id] !== q.opcionCorrectaId;
              }
              return true;
            }).map((q) => {
              const selectedOpt = q.opciones.find(o => o.id === userAnswers[q.id]);
              const correctOpt = q.opciones.find(o => o.id === q.opcionCorrectaId);
              const isCorrect = userAnswers[q.id] === q.opcionCorrectaId;

              return (
                <div key={q.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5">
                    <span className="font-semibold uppercase tracking-wider text-[#39A900]">
                      {MODULO_LABELS[q.modulo] || q.modulo.replace(/_/g, ' ')}
                    </span>
                    <span className="flex items-center gap-1 font-bold">
                      {isCorrect ? (
                        <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Correcto
                        </span>
                      ) : (
                        <span className="text-rose-700 dark:text-rose-400 flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" /> Para Reforzar
                        </span>
                      )}
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
                    {q.enunciado}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3">
                    <div className={`p-2.5 rounded-lg border ${
                      isCorrect 
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200' 
                        : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200'
                    }`}>
                      <span className="font-bold block mb-0.5">Tu respuesta:</span>
                      <span>{selectedOpt?.texto || 'No respondida'}</span>
                    </div>

                    {!isCorrect && (
                      <div className="p-2.5 rounded-lg border bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
                        <span className="font-bold block mb-0.5">Respuesta correcta:</span>
                        <span>{correctOpt?.texto}</span>
                      </div>
                    )}
                  </div>

                  <div className="text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                    <span className="font-bold text-slate-800 dark:text-slate-200">Fundamento: </span>
                    <span>{q.explicacionPedagogica}</span>
                    <span className="block mt-1 text-[11px] text-slate-500 dark:text-slate-400 font-semibold">
                      Referencia: {q.articuloReferencia}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      
      {/* Quiz Introduction Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#39A900] mb-2">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Módulo 4 · Evaluación Integral de Conocimientos</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Evaluación Interactiva de Apropiación
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Responde las {PREGUNTAS_EVALUACION.length} preguntas reglamentarias sobre derechos, deberes, trámites, causales de deserción, etapas y el debido proceso bajo el Reglamento Vigente (Acuerdo 2026). Requiere al menos el 80% ({minRequiredScore} aciertos) para emitir tu certificado de inducción.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shrink-0 text-center md:text-right">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Progreso de la prueba</div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              {totalAnswered} / {PREGUNTAS_EVALUACION.length}
            </div>
            <div className="w-36 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-1 mx-auto md:ml-auto">
              <div 
                className="h-full bg-[#39A900] transition-all duration-300" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question Selector Strip */}
        <div className="mt-6 flex flex-wrap gap-1.5 pt-4 border-t border-slate-100 dark:border-slate-800">
          {PREGUNTAS_EVALUACION.map((q, idx) => {
            const isAnswered = !!userAnswers[q.id];
            const isCurrent = currentQuestionIndex === idx;
            return (
              <button
                key={q.id}
                onClick={() => setCurrentQuestionIndex(idx)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${
                  isCurrent
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                    : isAnswered
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Question Box */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs transition-colors">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-3">
          <span className="font-bold uppercase tracking-wider text-[#39A900]">
            Eje Temático: {MODULO_LABELS[currentQuestion.modulo] || currentQuestion.modulo.replace(/_/g, ' ')}
          </span>
          <span className="font-semibold">
            Pregunta {currentQuestionIndex + 1} de {PREGUNTAS_EVALUACION.length}
          </span>
        </div>

        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-6 leading-snug">
          {currentQuestion.enunciado}
        </h2>

        {/* Question Options */}
        <div className="space-y-3 mb-6">
          {currentQuestion.opciones.map((opcion) => {
            const isSelected = selectedAnswerId === opcion.id;
            let optStyle = 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60 bg-white dark:bg-slate-900';

            if (isCurrentConfirmed) {
              if (opcion.id === currentQuestion.opcionCorrectaId) {
                optStyle = 'border-emerald-500 dark:border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold';
              } else if (isSelected) {
                optStyle = 'border-rose-500 dark:border-rose-600 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200';
              } else {
                optStyle = 'border-slate-200 dark:border-slate-800 opacity-60 bg-slate-50 dark:bg-slate-800/30';
              }
            } else if (isSelected) {
              optStyle = 'border-[#39A900] bg-emerald-50/70 dark:bg-emerald-950/30 ring-2 ring-[#39A900] text-emerald-950 dark:text-white';
            }

            return (
              <button
                key={opcion.id}
                onClick={() => handleSelectOption(opcion.id)}
                disabled={isCurrentConfirmed}
                className={`w-full p-4 rounded-xl border text-left transition-all flex items-start gap-3 text-xs sm:text-sm ${optStyle}`}
              >
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                  isSelected ? 'border-[#39A900] bg-[#39A900] text-white' : 'border-slate-300 dark:border-slate-600 text-slate-500'
                }`}>
                  {isCurrentConfirmed && opcion.id === currentQuestion.opcionCorrectaId ? '✓' : ''}
                </div>
                <span className="flex-1 text-slate-800 dark:text-slate-200">{opcion.texto}</span>
              </button>
            );
          })}
        </div>

        {/* Immediate Pedagogical Feedback */}
        {isCurrentConfirmed && (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 mb-6 text-xs sm:text-sm">
            <div className="flex items-center gap-2 font-bold mb-1">
              {selectedAnswerId === currentQuestion.opcionCorrectaId ? (
                <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ¡Respuesta Correcta!
                </span>
              ) : (
                <span className="text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  Respuesta Incorrecta
                </span>
              )}
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {currentQuestion.explicacionPedagogica}
            </p>
            <div className="mt-2 text-[11px] text-slate-400 dark:text-slate-500 font-semibold">
              Sustento Reglamentario: {currentQuestion.articuloReferencia}
            </div>
          </div>
        )}

        {/* Navigation / Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="w-full sm:w-auto px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Pregunta Anterior</span>
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {!isCurrentConfirmed ? (
              <button
                onClick={handleConfirmAnswer}
                disabled={!selectedAnswerId}
                className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 disabled:opacity-40 rounded-xl text-xs font-semibold transition-all shadow-xs"
              >
                Confirmar Respuesta
              </button>
            ) : currentQuestionIndex < PREGUNTAS_EVALUACION.length - 1 ? (
              <button
                onClick={handleNextQuestion}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#39A900] text-white hover:bg-[#329600] rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs"
              >
                <span>Siguiente Pregunta</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleFinishQuiz}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#39A900] text-white hover:bg-[#329600] rounded-xl text-xs font-bold transition-all shadow-md"
              >
                Finalizar y Ver Resultados
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
