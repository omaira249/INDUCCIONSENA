import React, { useState } from 'react';
import { 
  NORMAS_REGLAMENTO, 
  TRAMITES_NOVEDADES, 
  TIPOS_EVIDENCIAS, 
  CAUSALES_DESERCION, 
  REPRESENTATIVIDAD_ROLES, 
  REQUISITOS_CERTIFICACION
} from '../data/senaData';
import { 
  Shield, 
  CheckCircle2, 
  ChevronRight, 
  BookOpen, 
  Search, 
  Scale, 
  Clock, 
  Layers, 
  AlertTriangle, 
  Award, 
  UserCheck, 
  Sparkles,
  BookmarkCheck,
  ArrowRight
} from 'lucide-react';

interface RightsDutiesModuleProps {
  onCompleteModule: () => void;
  isCompleted: boolean;
  onGoToNext: () => void;
  initialChapterId?: string;
}

export const CHAPTERS_REGLAMENTO_2026 = [
  {
    id: 'cap_1',
    numero: 1,
    titulo: 'Capítulo I: Principios, Valores y Disposiciones Generales',
    subtitulo: 'Objeto, Campo de Aplicación y Valores Éticos Institucionales',
    articulosRango: 'Artículos 1 al 6',
    descripcion: 'Establece la naturaleza de la Formación Profesional Integral (FPI) y los valores éticos que rigen a toda la comunidad formativa SENA.',
    icono: 'Shield',
    badge: 'Disposiciones Generales',
    puntosClave: [
      'Aplica a estudiantes en modalidades presencial, virtual y a distancia.',
      'Honestidad, Respeto, Compromiso, Diligencia, Justicia y Solidaridad.',
      'El aprendiz como centro autónomo y crítico del proceso pedagógico.'
    ]
  },
  {
    id: 'cap_2',
    numero: 2,
    titulo: 'Capítulo II: Derechos del Aprendiz SENA',
    subtitulo: 'Garantías Académicas, Bienestar y Debido Proceso',
    articulosRango: 'Artículo 7 (Numerales 1 al 16)',
    descripcion: 'Consagra las garantías fundamentales para recibir formación de excelencia, acceder a servicios de bienestar y ser escuchado en procesos disciplinarios.',
    icono: 'Award',
    badge: 'Derecho Fundamental',
    puntosClave: [
      'Recibir FPI de calidad con recursos técnicos y docentes competentes.',
      'Garantía del Debido Proceso e intervención obligatoria del Vocero.',
      'Libre elección y participación democrática en vocerías de centro.'
    ]
  },
  {
    id: 'cap_3',
    numero: 3,
    titulo: 'Capítulo III: Deberes del Aprendiz SENA',
    subtitulo: 'Puntualidad, Identidad Institucional y Convivencia',
    articulosRango: 'Artículo 8 (Numerales 1 al 22)',
    descripcion: 'Compromisos éticos y académicos que asume el aprendiz al formalizar su matrícula para preservar la excelencia formativa.',
    icono: 'CheckCircle2',
    badge: 'Deberes Ciudadanos',
    puntosClave: [
      'Porte visible del carné institucional y uso de uniforme/EPP en talleres.',
      'Asistencia puntual y justificación de inasistencias en máx. 3 días hábiles.',
      'Respeto absoluto a los derechos de autor y cero tolerancia al plagio.'
    ]
  },
  {
    id: 'cap_4',
    numero: 4,
    titulo: 'Capítulo IV: Prohibiciones y Clasificación de Faltas',
    subtitulo: 'Conductas Prohibidas, Faltas Leves, Graves y Gravísimas',
    articulosRango: 'Artículos 9 al 15',
    descripcion: 'Tipifica de forma clara las conductas que afectan la convivencia, la seguridad, la integridad o el prestigio institucional.',
    icono: 'AlertTriangle',
    badge: 'Tipificación de Faltas',
    puntosClave: [
      'Prohibición de armas, alcohol y sustancias psicoactivas en centros.',
      'Tipificación de violencia basada en género y acoso como falta gravísima.',
      'Criterios para calificar faltas: dolo, culpa, daño y reincidencia.'
    ]
  },
  {
    id: 'cap_5',
    numero: 5,
    titulo: 'Capítulo V: Trámites Académicos, Novedades y Deserción',
    subtitulo: 'Traslados, Aplazamientos, Reingresos y Causales de Deserción',
    articulosRango: 'Artículos 16 al 25',
    descripcion: 'Reglamenta los procedimientos para gestionar cambios de estado en la matrícula y el debido procedimiento en inasistencias prolongadas.',
    icono: 'Layers',
    badge: 'Trámites de Matrícula',
    puntosClave: [
      'Aplazamiento hasta por 6 meses prorrogable por 6 meses más con justa causa.',
      'Deserción por 3 días hábiles consecutivos sin justificar o 10 días en LMS.',
      'Plazo de 5 días hábiles para presentar descargos ante notificación de deserción.'
    ]
  },
  {
    id: 'cap_6',
    numero: 6,
    titulo: 'Capítulo VI: Gestión de Evidencias, Evaluación y Certificación',
    subtitulo: 'Criterios de Evaluación, Etapa Productiva y Titulación',
    articulosRango: 'Artículos 26 al 38',
    descripcion: 'Define la valoración cualitativa (Aprobado / No Aprobado), alternativas de etapa productiva y paz y salvos de certificación.',
    icono: 'BookOpen',
    badge: 'Evaluación y Titulación',
    puntosClave: [
      'Evidencias de Conocimiento, Desempeño y Producto.',
      'Planes de mejoramiento concertados con acompañamiento pedagógico.',
      'Catorce (12) bitácoras quincenales y evaluación final de Etapa Productiva.'
    ]
  },
  {
    id: 'cap_7',
    numero: 7,
    titulo: 'Capítulo VII: Procedimiento Disciplinario y Medidas Formativas',
    subtitulo: 'Comité de Evaluación y Seguimiento y Flujo Garantista (Art. 48)',
    articulosRango: 'Artículos 39 al 50',
    descripcion: 'Procedimiento garantista con derecho de defensa, citación previa formal y recurso de reposición en 5 días hábiles.',
    icono: 'Scale',
    badge: 'Debido Proceso Garantizado',
    puntosClave: [
      'Citación previa mínima de 3 días hábiles por medios electrónicos trazables.',
      'Participación obligatoria con voz del Vocero de Ficha del aprendiz.',
      'Recurso de Reposición en 5 días hábiles contra actos sancionatorios.'
    ]
  },
  {
    id: 'cap_8',
    numero: 8,
    titulo: 'Capítulo VIII: Representatividad, Voceros y Participación Democrática',
    subtitulo: 'Voceros de Ficha y Representante de Centro',
    articulosRango: 'Artículos 51 al 60',
    descripcion: 'Mecanismos de representación estudiantil, elección democrática y liderazgo juvenil en la comunidad SENA.',
    icono: 'UserCheck',
    badge: 'Liderazgo Estudiantil',
    puntosClave: [
      'Elección democrática del Vocero de Ficha por sus compañeros de grupo.',
      'Periodo de un año para el Representante de Aprendices ante Consejo Directivo.',
      'Revocatoria de mandato por incumplimiento o decisión mayoritaria.'
    ]
  }
];

export const RightsDutiesModule: React.FC<RightsDutiesModuleProps> = ({
  onCompleteModule,
  isCompleted,
  onGoToNext,
  initialChapterId = 'all'
}) => {
  const [selectedChapterId, setSelectedChapterId] = useState<string>(initialChapterId);
  const [searchQuery, setSearchQuery] = useState('');
  const [readChapters, setReadChapters] = useState<Record<string, boolean>>({});

  const toggleChapterRead = (chapId: string) => {
    setReadChapters(prev => ({ ...prev, [chapId]: !prev[chapId] }));
  };

  const readCount = Object.keys(readChapters).filter(k => readChapters[k]).length;
  const progressPercent = Math.round((readCount / CHAPTERS_REGLAMENTO_2026.length) * 100);

  // Filtered norms
  const filteredNorms = NORMAS_REGLAMENTO.filter((norma) => {
    const matchesQuery = 
      norma.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      norma.descripcion.toLowerCase().includes(searchQuery.toLowerCase()) ||
      norma.articulo.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesQuery;
  });

  return (
    <div className="space-y-8 pb-16">
      
      {/* Module Title Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#39A900] mb-2">
              <Shield className="w-4 h-4" />
              <span>Reglamento del Aprendiz SENA · Acuerdo 2026 (Vigente Actualizado)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Estatuto Formativo y Manual del Aprendiz (Capítulos I al VIII)
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              El <strong>Acuerdo 2026</strong> deroga de forma expresa al anterior Acuerdo 007 de 2012. Explora directamente cada uno de los capítulos del manual para conocer tus derechos, deberes, trámites y el debido proceso.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shrink-0 text-center md:text-right">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Apropiación de Capítulos</div>
            <div className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">
              {readCount} / {CHAPTERS_REGLAMENTO_2026.length} <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">({progressPercent}%)</span>
            </div>
            <div className="w-36 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-1.5 mx-auto md:ml-auto">
              <div 
                className="h-full bg-[#39A900] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Interactive Search Bar */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar norma o palabra clave (ej. inasistencia, plagio, traslado, carné, comité)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
            />
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              Limpiar
            </button>
          )}
        </div>
      </div>

      {/* Chapter Selection Hub Grid (Direct Entry to Any Chapter) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#39A900]" />
            Capítulos del Manual del Aprendiz SENA (Acuerdo 2026)
          </h2>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedChapterId('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedChapterId === 'all'
                  ? 'bg-[#39A900] text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              Ver Todos ({CHAPTERS_REGLAMENTO_2026.length})
            </button>
          </div>
        </div>

        {/* Chapter Card Selection Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {CHAPTERS_REGLAMENTO_2026.map((chap) => {
            const isSelected = selectedChapterId === chap.id;
            const isRead = !!readChapters[chap.id];

            return (
              <div
                key={chap.id}
                onClick={() => setSelectedChapterId(chap.id === selectedChapterId ? 'all' : chap.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-[#39A900] ring-2 ring-[#39A900] text-slate-900 dark:text-white shadow-md'
                    : isRead
                    ? 'bg-white dark:bg-slate-900 border-emerald-300 dark:border-emerald-800 hover:border-[#39A900]'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#39A900] text-white">
                      {chap.badge}
                    </span>
                    {isRead ? (
                      <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Leído
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-semibold">{chap.articulosRango}</span>
                    )}
                  </div>

                  <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white mb-1 leading-snug">
                    {chap.titulo}
                  </h3>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {chap.descripcion}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-bold text-[#39A900]">
                    {isSelected ? 'Ocultar Detalles' : 'Ingresar a Capítulo'}
                  </span>
                  <ChevronRight className={`w-4 h-4 text-[#39A900] transition-transform ${isSelected ? 'rotate-90' : ''}`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Chapter View or Detailed Cards */}
      <div className="space-y-6">
        {CHAPTERS_REGLAMENTO_2026.filter(c => selectedChapterId === 'all' || selectedChapterId === c.id).map((chap) => {
          const isRead = !!readChapters[chap.id];

          return (
            <div key={chap.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-4 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-bold text-[#39A900] uppercase tracking-wider block mb-1">
                    {chap.articulosRango} · {chap.badge}
                  </span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">
                    {chap.titulo}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {chap.subtitulo}
                  </p>
                </div>

                <button
                  onClick={() => toggleChapterRead(chap.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0 ${
                    isRead
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  <CheckCircle2 className={`w-4 h-4 ${isRead ? 'text-[#39A900]' : 'text-slate-400'}`} />
                  <span>{isRead ? 'Capítulo Leído ✓' : 'Marcar Capítulo como Leído'}</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {chap.descripcion}
              </p>

              {/* Key takeaways bullet points */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-2 text-xs">
                <span className="font-bold text-slate-900 dark:text-white uppercase text-[11px] tracking-wider block">
                  Aspectos Clave del Capítulo {chap.numero}:
                </span>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {chap.puntosClave.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#39A900] shrink-0 mt-1.5"></span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Related Norms / Articles Matching Filter or Chapter */}
              <div className="pt-2">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                  Artículos y Normas Reglamentarias Vinculadas:
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredNorms.filter(n => {
                    if (chap.id === 'cap_2') return n.tipo === 'derecho';
                    if (chap.id === 'cap_3') return n.tipo === 'deber';
                    if (chap.id === 'cap_4') return n.tipo === 'prohibicion';
                    return true;
                  }).slice(0, 4).map((norma) => (
                    <div key={norma.id} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-[#39A900] text-[11px]">{norma.articulo}</span>
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {norma.categoria}
                        </span>
                      </div>
                      <h5 className="font-bold text-slate-900 dark:text-white mb-1">{norma.titulo}</h5>
                      <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed mb-2">{norma.descripcion}</p>
                      <div className="text-[10px] text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-lg border border-emerald-100 dark:border-emerald-800/60">
                        <strong>Ejemplo en aula:</strong> {norma.ejemploContexto}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Footer Completion Banner */}
      <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white">
            ¿Exploraste y apropiaste los Capítulos del Manual del Aprendiz (Acuerdo 2026)?
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
            Has completado la lectura de {readCount} de {CHAPTERS_REGLAMENTO_2026.length} capítulos reglamentarios.
          </p>
        </div>

        <button
          onClick={onCompleteModule}
          className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#39A900] text-white hover:bg-[#329600] transition shadow-xs cursor-pointer shrink-0"
        >
          {isCompleted ? 'Módulo Completado ✓' : 'Marcar Módulo como Completado'}
        </button>
      </div>

    </div>
  );
};
