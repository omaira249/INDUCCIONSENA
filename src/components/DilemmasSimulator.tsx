import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { syncDilemaInRealTime } from '../services/sheetsService';
import { CASOS_DILEMAS } from '../data/senaData';
import { CasoDilema } from '../types/sena';
import { 
  UserCheck, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ChevronRight, 
  RotateCcw, 
  ArrowRight, 
  ShieldAlert 
} from 'lucide-react';

interface DilemmasSimulatorProps {
  onCompleteModule: () => void;
  isCompleted: boolean;
  onGoToEvaluation: () => void;
}

export const DilemmasSimulator: React.FC<DilemmasSimulatorProps> = ({
  onCompleteModule,
  isCompleted,
  onGoToEvaluation
}) => {
  const { activeAprendiz } = useAuth();
  const [currentDilemmaIndex, setCurrentDilemmaIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState<Record<string, boolean>>({});

  const currentDilemma = CASOS_DILEMAS[currentDilemmaIndex];
  const selectedOptionId = selectedAnswers[currentDilemma.id];
  const isAnswered = !!selectedOptionId;
  const isRevealed = showFeedback[currentDilemma.id];

  const handleSelectOption = (optionId: string) => {
    if (isRevealed) return; // Prevent changing after revealing
    setSelectedAnswers(prev => ({ ...prev, [currentDilemma.id]: optionId }));
    setShowFeedback(prev => ({ ...prev, [currentDilemma.id]: true }));

    // Sync dilemma answer in real-time to Google Sheets
    const chosenOption = currentDilemma.opciones.find(o => o.id === optionId);
    if (activeAprendiz && chosenOption) {
      syncDilemaInRealTime({
        documento: activeAprendiz.documento,
        nombre: activeAprendiz.nombre,
        programa: activeAprendiz.programaFormacion,
        ficha: activeAprendiz.fichaNumero,
        casoTitulo: currentDilemma.titulo,
        decisionElegida: chosenOption.texto,
        esEtica: chosenOption.esCorrecta,
        justificacion: chosenOption.retroalimentacion
      }).catch(console.error);
    }
  };

  const handleResetCurrent = () => {
    setSelectedAnswers(prev => {
      const copy = { ...prev };
      delete copy[currentDilemma.id];
      return copy;
    });
    setShowFeedback(prev => {
      const copy = { ...prev };
      delete copy[currentDilemma.id];
      return copy;
    });
  };

  const totalAnswered = Object.keys(showFeedback).length;
  const allAnswered = totalAnswered === CASOS_DILEMAS.length;

  return (
    <div className="space-y-10 pb-16">
      
      {/* Title Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#39A900] mb-2">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Módulo 3 · Simulador de Dilemas Prácticos</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Situaciones Reales de la Vida del Aprendiz
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
            Aprender el reglamento no es memorizar artículos, sino saber aplicarlos con ética y criterio en tu día a día en el SENA. 
            Resuelve estos casos cotidianos y recibe retroalimentación inmediata sobre la conducta esperada.
          </p>
        </div>

        {/* Case Progression Dots */}
        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
          <div className="flex items-center gap-2">
            {CASOS_DILEMAS.map((caso, index) => {
              const answered = showFeedback[caso.id];
              const isCurrent = currentDilemmaIndex === index;
              return (
                <button
                  key={caso.id}
                  onClick={() => setCurrentDilemmaIndex(index)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    isCurrent
                      ? 'bg-slate-900 text-white'
                      : answered
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span>Caso {index + 1}</span>
                  {answered && <CheckCircle2 className="w-3 h-3 text-[#39A900]" />}
                </button>
              );
            })}
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Progreso: {totalAnswered} de {CASOS_DILEMAS.length} resueltos
          </div>
        </div>
      </div>

      {/* Active Dilemma Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold uppercase tracking-wider text-[#39A900]">
              {currentDilemma.contexto}
            </span>
            <span>Caso {currentDilemmaIndex + 1} de {CASOS_DILEMAS.length}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            {currentDilemma.titulo}
          </h2>

          <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm sm:text-base leading-relaxed">
            {currentDilemma.situacion}
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            ¿Qué decisión debe tomar el aprendiz según el reglamento?
          </span>

          {currentDilemma.opciones.map((opcion) => {
            const isSelected = selectedOptionId === opcion.id;
            let optionStyle = 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800';

            if (isRevealed) {
              if (opcion.esCorrecta) {
                optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-medium';
              } else if (isSelected) {
                optionStyle = 'border-rose-400 bg-rose-50 text-rose-950';
              } else {
                optionStyle = 'border-slate-200 opacity-60 text-slate-500';
              }
            } else if (isSelected) {
              optionStyle = 'border-[#39A900] bg-emerald-50/50 text-slate-900';
            }

            return (
              <button
                key={opcion.id}
                onClick={() => handleSelectOption(opcion.id)}
                disabled={isRevealed}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-3.5 ${optionStyle}`}
              >
                <div className="mt-0.5 shrink-0">
                  {isRevealed ? (
                    opcion.esCorrecta ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : isSelected ? (
                      <XCircle className="w-5 h-5 text-rose-600" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-slate-300" />
                    )
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-300 flex items-center justify-center">
                      {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#39A900]" />}
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="text-xs sm:text-sm leading-relaxed">
                    {opcion.texto}
                  </div>

                  {/* Feedback explanation if revealed and selected or correct */}
                  {isRevealed && (isSelected || opcion.esCorrecta) && (
                    <div className={`mt-3 pt-3 border-t text-xs ${
                      opcion.esCorrecta ? 'border-emerald-200 text-emerald-900' : 'border-rose-200 text-rose-900'
                    }`}>
                      <div className="font-bold mb-1">
                        {opcion.esCorrecta ? '✓ Justificación Institucional:' : '✕ Motivo:'}
                      </div>
                      <p className="leading-relaxed mb-1.5">{opcion.retroalimentacion}</p>
                      <div className="text-[11px] font-semibold text-slate-600">
                        Fundamento: {opcion.normaAsociada}
                      </div>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Action Controls for current dilemma */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          {isRevealed ? (
            <button
              onClick={handleResetCurrent}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Intentar de nuevo este caso</span>
            </button>
          ) : (
            <span className="text-xs text-slate-400">
              Selecciona una opción para ver la justificación pedagógica
            </span>
          )}

          <div className="flex items-center gap-3">
            {currentDilemmaIndex < CASOS_DILEMAS.length - 1 ? (
              <button
                onClick={() => setCurrentDilemmaIndex(prev => prev + 1)}
                className="px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>Siguiente Caso</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onGoToEvaluation}
                className="px-4 py-2 bg-[#39A900] text-white hover:bg-[#329600] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>Ir a la Evaluación Final</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Completion & Evaluation CTA */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#39A900] text-white flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900">
              ¿Completaste el análisis de los casos prácticos?
            </h4>
            <p className="text-xs text-slate-600">
              Estás listo para presentar la evaluación oficial interactiva y obtener tu constancia.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={onCompleteModule}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2 w-full sm:w-auto ${
              isCompleted
                ? 'bg-white text-emerald-800 border border-emerald-300'
                : 'bg-[#39A900] text-white hover:bg-[#329600]'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isCompleted ? 'Módulo Completado ✓' : 'Marcar como Completado'}</span>
          </button>

          <button
            onClick={onGoToEvaluation}
            className="px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <span>Presentar Evaluación</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
