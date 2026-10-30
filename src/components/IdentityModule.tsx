import React, { useState } from 'react';
import { 
  SIMBOLOS_SENA, 
  VALORES_SENA,
  COMPONENTES_FPI,
  FASES_PROYECTO,
  EJES_BIENESTAR,
  HERRAMIENTAS_INSTITUCIONALES,
  CANALES_ATENCION,
  CONDUCTO_REGULAR
} from '../data/senaData';
import { SenaLogo } from './SenaLogo';
import { 
  Award, 
  BookOpen, 
  CheckCircle2, 
  ChevronRight, 
  Compass, 
  Flag, 
  Globe2, 
  HeartHandshake, 
  Music, 
  Play, 
  Pause, 
  ShieldCheck, 
  Sparkles, 
  Volume2,
  GraduationCap,
  Layers,
  Workflow,
  HeartPulse,
  Palette,
  Trophy,
  Users,
  Brain,
  Coins,
  Laptop,
  Database,
  Mail,
  BookMarked,
  Microscope,
  Briefcase,
  Phone,
  MessageSquare,
  AlertCircle,
  FileText,
  ArrowRight,
  ExternalLink,
  Check
} from 'lucide-react';

interface IdentityModuleProps {
  onCompleteModule: () => void;
  isCompleted: boolean;
  onGoToNext: () => void;
}

type PedagogicalTabId = 
  | 'institucion' 
  | 'fpi' 
  | 'proceso_formativo' 
  | 'bienestar' 
  | 'herramientas' 
  | 'canales';

export const IdentityModule: React.FC<IdentityModuleProps> = ({
  onCompleteModule,
  isCompleted,
  onGoToNext
}) => {
  // Tab state for the pedagogical manual
  const [activeTab, setActiveTab] = useState<PedagogicalTabId>('institucion');

  // Sub-states inside sections
  const [selectedSimbolo, setSelectedSimbolo] = useState<string>('escudo');
  const [isPlayingHimno, setIsPlayingHimno] = useState(false);
  const [activeEstrofa, setActiveEstrofa] = useState<number>(0);
  const [selectedFase, setSelectedFase] = useState<number>(1);
  const [selectedEjeBienestar, setSelectedEjeBienestar] = useState<string>(EJES_BIENESTAR[0].id);
  const [selectedHerramienta, setSelectedHerramienta] = useState<string>(HERRAMIENTAS_INSTITUCIONALES[0].id);

  const currentSimbolo = SIMBOLOS_SENA.find(s => s.id === selectedSimbolo) || SIMBOLOS_SENA[0];
  const currentFase = FASES_PROYECTO.find(f => f.numero === selectedFase) || FASES_PROYECTO[0];
  const currentEje = EJES_BIENESTAR.find(e => e.id === selectedEjeBienestar) || EJES_BIENESTAR[0];
  const currentHerramienta = HERRAMIENTAS_INSTITUCIONALES.find(h => h.id === selectedHerramienta) || HERRAMIENTAS_INSTITUCIONALES[0];

  const toggleHimno = () => {
    setIsPlayingHimno(prev => !prev);
  };

  const estrofasHimno = [
    {
      tipo: 'Coro',
      texto: 'Estudiantes del SENA ¡adelante!\nPor Colombia luchad con amor,\ncon el ánimo noble y radiante,\ntransformemos el mundo en mejor.'
    },
    {
      tipo: 'Estrofa I',
      texto: 'De la patria el futuro destino,\nen las manos del joven está,\nel trabajo es seguro camino,\nque el progreso a Colombia dará.'
    },
    {
      tipo: 'Estrofa II',
      texto: 'En la forja del SENA se forman,\nhombres libres que saben triunfar,\ncon la ciencia y la técnica norman,\nsu deber y su fe en el hogar.'
    },
    {
      tipo: 'Estrofa III',
      texto: 'Hoy la patria nos llama al trabajo,\ncon orgullo marchemos en pos,\nlevantemos la voz sin desmayo,\ncon la patria, la ciencia y con Dios.'
    }
  ];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Hero Banner with Official SENA Identity */}
      <section className="relative overflow-hidden rounded-2xl bg-[#032313] text-white shadow-xl border border-emerald-500/30">
        <div className="absolute inset-0">
          <img
            src="/src/assets/images/hero_sena_induction_1793115110506.jpg"
            alt="Aprendices del SENA en ambiente de formación tecnológica"
            className="w-full h-full object-cover object-center opacity-45 filter hue-rotate-15 contrast-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#021b0e] via-[#04361c]/90 to-[#39A900]/45" />
          <div className="absolute inset-0 bg-[#39A900]/20 mix-blend-color pointer-events-none" />
        </div>

        <div className="relative max-w-5xl px-6 py-10 sm:px-10 sm:py-14 lg:py-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#39A900]/20 border border-[#39A900]/40 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Manual Pedagógico e Institucional del Aprendiz · Inducción Integral</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-3xl text-balance">
            La Institución, su Modelo Pedagógico y los Canales de Apoyo al Aprendiz
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-200 max-w-3xl leading-relaxed">
            Conoce la historia y valores del SENA, apropia el modelo de Formación Profesional Integral (FPI), 
            domina las fases de tu proyecto formativo, accede a los beneficios de Bienestar al Aprendiz y navega 
            con soltura por las herramientas digitales institucionales.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/10">
              <span className="font-bold text-white text-base tabular-nums">33</span>
              <span>Regionales en todo el país</span>
            </div>
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/10">
              <span className="font-bold text-white text-base tabular-nums">118+</span>
              <span>Centros de Formación</span>
            </div>
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/10">
              <span className="font-bold text-emerald-400 font-semibold">100%</span>
              <span>Pública, Gratuita y de Calidad</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Pedagogical Navigation Tabs */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 shadow-xs sticky top-20 z-30 backdrop-blur-md">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5">
          <button
            onClick={() => setActiveTab('institucion')}
            className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'institucion'
                ? 'bg-[#39A900] text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Compass className="w-4 h-4 shrink-0" />
            <span className="truncate">1. Institución</span>
          </button>

          <button
            onClick={() => setActiveTab('fpi')}
            className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'fpi'
                ? 'bg-[#39A900] text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <GraduationCap className="w-4 h-4 shrink-0" />
            <span className="truncate">2. FPI</span>
          </button>

          <button
            onClick={() => setActiveTab('proceso_formativo')}
            className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'proceso_formativo'
                ? 'bg-[#39A900] text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Workflow className="w-4 h-4 shrink-0" />
            <span className="truncate">3. Proyecto</span>
          </button>

          <button
            onClick={() => setActiveTab('bienestar')}
            className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'bienestar'
                ? 'bg-[#39A900] text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <HeartPulse className="w-4 h-4 shrink-0" />
            <span className="truncate">4. Bienestar</span>
          </button>

          <button
            onClick={() => setActiveTab('herramientas')}
            className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'herramientas'
                ? 'bg-[#39A900] text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Laptop className="w-4 h-4 shrink-0" />
            <span className="truncate">5. Herramientas</span>
          </button>

          <button
            onClick={() => setActiveTab('canales')}
            className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'canales'
                ? 'bg-[#39A900] text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Phone className="w-4 h-4 shrink-0" />
            <span className="truncate">6. Canales</span>
          </button>
        </div>
      </div>

      {/* TAB 1: LA INSTITUCIÓN Y SÍMBOLOS */}
      {activeTab === 'institucion' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Historical Overview and Foundation */}
          <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-1 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#39A900]">
                  <Compass className="w-4 h-4" />
                  <span>Reseña Histórica y Naturaleza Jurídica</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Más de 6 décadas transformando a Colombia
                </h2>
                <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                  El <strong>Servicio Nacional de Aprendizaje (SENA)</strong> nació en <strong>1957</strong> como una iniciativa visionaria del economista cartagenero <strong>Rodolfo Martínez Tono</strong>, con el decidido respaldo de las organizaciones de trabajadores, las asociaciones empresariales y el Ministro de Trabajo de la época, Raimundo Emiliani Román, formalizado a través del <em>Decreto Ley 118 de 1957</em>.
                </p>
                <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                  Es un establecimiento público del orden nacional, adscrito al Ministerio del Trabajo, con personería jurídica, patrimonio propio e independiente, y autonomía administrativa. Brinda formación integral gratuita a millones de colombianos en todos los rincones del país.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/70 dark:border-slate-700/60">
                    <span className="text-[11px] font-bold text-slate-500 uppercase block">Fundación</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">21 de Junio de 1957</span>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/70 dark:border-slate-700/60">
                    <span className="text-[11px] font-bold text-slate-500 uppercase block">Fundador</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">Rodolfo Martínez Tono</span>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/70 dark:border-slate-700/60">
                    <span className="text-[11px] font-bold text-slate-500 uppercase block">Naturaleza</span>
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">100% Pública y Gratuita</span>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-72 shrink-0 bg-slate-50 dark:bg-slate-800/70 rounded-xl p-5 border border-slate-200 dark:border-slate-700 text-center space-y-3">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-white dark:bg-slate-900 p-2 border border-slate-200 dark:border-slate-700 shadow-xs flex items-center justify-center">
                  <SenaLogo className="w-16 h-16" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">Entidad de Clase Mundial</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Líder en formación técnica, tecnológica e innovación productiva en América Latina.
                  </p>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-200 dark:border-slate-700 flex flex-col gap-1 text-left">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#39A900]" />
                    <span>33 Regionales</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#39A900]" />
                    <span>118+ Centros de Formación</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#39A900]" />
                    <span>Presencia en los 32 departamentos</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Misión y Visión Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-[#39A900] flex items-center justify-center font-bold">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Misión Institucional</h3>
                  <span className="text-xs text-slate-500">Razón de ser del SENA</span>
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                El SENA está encargado de cumplir la función que le corresponde al Estado de invertir en el desarrollo 
                social y técnico de los trabajadores colombianos, ofreciendo y ejecutando la formación profesional integral, 
                para la incorporación y el desarrollo de las personas en actividades productivas que contribuyan al 
                desarrollo social, económico y tecnológico del país.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-[#39A900] flex items-center justify-center font-bold">
                  <Globe2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Visión Institucional</h3>
                  <span className="text-xs text-slate-500">Proyección estratégica de impacto</span>
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Consolidarse como una entidad referente internacional en formación técnica y tecnológica con estándares 
                globales, caracterizada por la innovación pedagógica, el arraigo territorial, la inclusión social y la 
                capacidad de respuesta oportuna ante los desafíos de la transformación digital y la sostenibilidad ambiental.
              </p>
            </div>
          </section>

          {/* Símbolos Oficiales del SENA */}
          <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
            <div className="max-w-3xl mb-6">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Símbolos Oficiales del SENA
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Explora el escudo, logosímbolo, bandera y el himno que representan el espíritu y la identidad del aprendiz en todo el país.
              </p>
            </div>

            {/* Simbolo Selector Buttons */}
            <div className="flex flex-wrap gap-2 mb-8 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
              {SIMBOLOS_SENA.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSimbolo(s.id)}
                  className={`flex-1 min-w-[140px] px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all text-center whitespace-nowrap ${
                    selectedSimbolo === s.id
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs border border-slate-200/80 dark:border-slate-700'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700'
                  }`}
                >
                  {s.nombre}
                </button>
              ))}
            </div>

            {/* Detailed Simbolo Display */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Visual Representation */}
              <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col items-center justify-center text-center">
                {currentSimbolo.id === 'escudo' && (
                  <div className="space-y-4 w-full">
                    <div className="w-36 h-36 mx-auto rounded-2xl bg-white dark:bg-slate-900 border-2 border-emerald-500/30 shadow-md p-3 flex flex-col items-center justify-center text-emerald-700">
                      <SenaLogo className="w-24 h-24 mb-1" alt="Logo Oficial SENA" />
                      <div className="text-[10px] uppercase font-bold tracking-widest text-slate-600 dark:text-slate-300">
                        Industria · Comercio · Agro
                      </div>
                    </div>
                    <div className="text-xs text-slate-500 font-medium">
                      Escudo Oficial SENA (Tres Sectores de la Economía Nacional)
                    </div>
                  </div>
                )}

                {currentSimbolo.id === 'logosimbolo' && (
                  <div className="space-y-4 w-full">
                    <div className="w-36 h-36 mx-auto rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-md p-4 flex flex-col items-center justify-center">
                      <SenaLogo className="w-28 h-28" />
                    </div>
                    <div className="text-xs text-slate-500 font-medium">
                      Logosímbolo Oficial SENA (Pantone 361C #39A900)
                    </div>
                  </div>
                )}

                {currentSimbolo.id === 'bandera' && (
                  <div className="space-y-4 w-full">
                    <div className="w-48 h-32 mx-auto rounded-xl bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-600 shadow-md p-3 flex flex-col items-center justify-center relative overflow-hidden">
                      <SenaLogo className="w-16 h-16" alt="Logo SENA en Bandera" />
                      <div className="absolute bottom-1 right-2 text-[9px] text-slate-400">
                        Pabellón Blanco
                      </div>
                    </div>
                    <div className="text-xs text-slate-500 font-medium">
                      Bandera de fondo blanco con el logo oficial central (Símbolo de Paz y Transparencia)
                    </div>
                  </div>
                )}

                {currentSimbolo.id === 'himno' && (
                  <div className="space-y-4 w-full">
                    <div className="w-36 h-36 mx-auto rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex flex-col items-center justify-center text-[#39A900] p-4">
                      <Music className="w-12 h-12 mb-2" />
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Himno Oficial</span>
                    </div>
                    
                    {/* Audio simulation player */}
                    <div className="w-full bg-white dark:bg-slate-900 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between gap-3">
                        <button
                          onClick={toggleHimno}
                          className="w-8 h-8 rounded-full bg-[#39A900] text-white flex items-center justify-center hover:bg-[#329600] transition-colors"
                          title={isPlayingHimno ? 'Pausar' : 'Reproducir melodía'}
                        >
                          {isPlayingHimno ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                        </button>
                        <div className="flex-1 text-left">
                          <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                            {isPlayingHimno ? 'Reproduciendo Himno del SENA' : 'Escuchar Himno'}
                          </div>
                          <div className="text-[10px] text-slate-500">Música marcial institucional</div>
                        </div>
                        <Volume2 className="w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Description & Explanations */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#39A900]">
                    {currentSimbolo.subtitulo}
                  </span>
                  <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                    {currentSimbolo.nombre}
                  </h4>
                  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">
                    {currentSimbolo.descripcion}
                  </p>
                </div>

                {/* Breakdown details */}
                <div className="space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Significado y Componentes Clave:
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentSimbolo.detalles.map((d, idx) => (
                      <div key={idx} className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 rounded-lg p-3.5">
                        <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#39A900]" />
                          <span>{d.titulo}</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-normal">
                          {d.texto}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Special display for Himno lyrics */}
                {currentSimbolo.id === 'himno' && (
                  <div className="mt-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-3 border-b border-slate-200 dark:border-slate-700 pb-2">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Letra del Himno Institucional</span>
                      <div className="flex gap-1">
                        {estrofasHimno.map((est, i) => (
                          <button
                            key={i}
                            onClick={() => setActiveEstrofa(i)}
                            className={`text-xs px-2 py-0.5 rounded ${
                              activeEstrofa === i ? 'bg-[#39A900] text-white font-bold' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                            }`}
                          >
                            {est.tipo}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="text-center py-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#39A900] block mb-1">
                        {estrofasHimno[activeEstrofa].tipo}
                      </span>
                      <p className="text-sm sm:text-base font-serif italic text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed">
                        {estrofasHimno[activeEstrofa].texto}
                      </p>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </section>

          {/* Código de Integridad SENA */}
          <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
            <div className="max-w-3xl mb-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#39A900] mb-1">
                <HeartHandshake className="w-4 h-4" />
                <span>Código de Integridad Institucional</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Nuestros 6 Valores Cardinales
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Cada aprendiz asume el compromiso ético de actuar con transparencia, respeto y excelencia en los ambientes de aprendizaje y en su entorno social.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {VALORES_SENA.map((val) => (
                <div 
                  key={val.id}
                  className="bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-5 hover:border-emerald-300 dark:hover:border-emerald-500 transition-all shadow-xs"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">{val.nombre}</h4>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#39A900]" />
                  </div>
                  <div className="text-xs font-semibold text-[#39A900] mb-2 italic">
                    "{val.lema}"
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
                    {val.descripcion}
                  </p>
                  <div className="pt-3 border-t border-slate-200/80 dark:border-slate-700">
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">En el día a día:</span>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {val.aplicacionCotidiana}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      )}

      {/* TAB 2: FORMACIÓN PROFESIONAL INTEGRAL (FPI) */}
      {activeTab === 'fpi' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* FPI Header Box */}
          <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#39A900] mb-2">
                <GraduationCap className="w-4 h-4" />
                <span>Modelo Pedagógico Institucional</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                La Formación Profesional Integral (FPI)
              </h2>
              <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
                La FPI es la esencia pedagógica del SENA. No se limita a transmitir instrucciones mecánicas; 
                forma seres humanos reflexivos, éticos y competentes técnicamente para liderar la transformación 
                del aparato productivo colombiano.
              </p>
            </div>
          </section>

          {/* 3 Pillars of FPI */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COMPONENTES_FPI.map((comp) => (
              <div 
                key={comp.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#39A900] flex items-center justify-center font-bold mb-4">
                    {comp.id === 'fpi_concepto' && <GraduationCap className="w-6 h-6" />}
                    {comp.id === 'fpi_competencias' && <Layers className="w-6 h-6" />}
                    {comp.id === 'fpi_metodologia' && <Workflow className="w-6 h-6" />}
                  </div>

                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                    {comp.subtitulo}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {comp.titulo}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {comp.descripcion}
                  </p>

                  <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-3">
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block">
                      Principios y Elementos:
                    </span>
                    {comp.principiosClave.map((prin, i) => (
                      <div key={i} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#39A900] shrink-0 mt-0.5" />
                        <span>{prin}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 p-3 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-xl border border-emerald-200/60 dark:border-emerald-800/40 text-xs text-emerald-800 dark:text-emerald-300 font-medium">
                  {comp.enfoque}
                </div>
              </div>
            ))}
          </section>

          {/* Triad of Competencies: Saber, Hacer, Ser y Convivir */}
          <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              La Tríada de Competencias del Aprendiz SENA
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              Para certificarte no basta con saber la teoría o realizar la práctica: la evaluación del SENA mide de forma integrada el desarrollo de estas tres dimensiones humanas.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/60">
                <div className="flex items-center gap-2 mb-2 text-blue-700 dark:text-blue-300 font-bold text-base">
                  <Brain className="w-5 h-5" />
                  <span>SABER (Cognitivo)</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                  Apropiación de conceptos, ciencias básicas, tecnologías de la información, normas técnicas de calidad y fundamentos teóricos de la profesión.
                </p>
                <div className="text-[11px] font-semibold text-blue-800 dark:text-blue-400">
                  Evidencia en: Cuestionarios, mapas conceptuales, análisis de casos y pruebas escritas.
                </div>
              </div>

              <div className="p-5 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/60">
                <div className="flex items-center gap-2 mb-2 text-amber-700 dark:text-amber-300 font-bold text-base">
                  <Workflow className="w-5 h-5" />
                  <span>SABER HACER (Procedimental)</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                  Destrezas motrices y técnicas, aplicación de protocolos de seguridad industrial, resolución de incidentes técnicos en taller o software, y entrega de productos acabados.
                </p>
                <div className="text-[11px] font-semibold text-amber-800 dark:text-amber-400">
                  Evidencia en: Listas de chequeo de desempeño, simulación en taller y productos tangibles.
                </div>
              </div>

              <div className="p-5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/60">
                <div className="flex items-center gap-2 mb-2 text-emerald-700 dark:text-emerald-300 font-bold text-base">
                  <HeartHandshake className="w-5 h-5" />
                  <span>SABER SER Y CONVIVIR (Axiológico)</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                  Valores del Código de Integridad (honestidad, respeto, compromiso), comunicación empática, trabajo colaborativo, cuidado del ambiente y resolución pacífica de conflictos.
                </p>
                <div className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-400">
                  Evidencia en: Convivencia en el aula, liderazgo de ficha, puntualidad y actitud formativa.
                </div>
              </div>
            </div>
          </section>

          {/* Comparative Table: Roles in the Model */}
          <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Roles en la Formación Profesional Integral
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base mb-2">
                  <GraduationCap className="w-5 h-5 text-[#39A900]" />
                  <span>Rol del Aprendiz SENA</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">
                  Sujeto activo, reflexivo y autogestor de su propio proceso formativo.
                </p>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#39A900] shrink-0 mt-0.5" />
                    <span>Desarrollar autónomamente las guías de aprendizaje.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#39A900] shrink-0 mt-0.5" />
                    <span>Construir el portafolio digital de evidencias individuales y grupales.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#39A900] shrink-0 mt-0.5" />
                    <span>Trabajar en equipo con empatía, respeto y puntualidad.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#39A900] shrink-0 mt-0.5" />
                    <span>Participar en las decisiones democráticas y de vocería de la ficha.</span>
                  </li>
                </ul>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base mb-2">
                  <Compass className="w-5 h-5 text-blue-600" />
                  <span>Rol del Instructor SENA</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">
                  Mediador pedagógico, facilitador cognitivo y evaluador concertado.
                </p>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span>Orientar el desarrollo curricular y diseñar guías contextualizadas.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span>Monitorear ambientes de aprendizaje asegurando condiciones de seguridad.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span>Retroalimentar oportunamente las evidencias y concertar planes de mejoramiento.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span>Inspirar y acompañar el crecimiento personal y profesional del aprendiz.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

        </div>
      )}

      {/* TAB 3: EL PROCESO FORMATIVO Y PROYECTO */}
      {activeTab === 'proceso_formativo' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Project-Based Learning Introduction */}
          <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#39A900] mb-2">
                <Workflow className="w-4 h-4" />
                <span>Estrategia Pedagógica Activa</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                El Proyecto Formativo y sus 4 Fases Metodológicas
              </h2>
              <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
                En el SENA no memorizas asignaturas aisladas: aprendes a través de un <strong>Proyecto Formativo</strong> que da respuesta a un problema real de una empresa o comunidad. Toda tu formación transcurre a lo largo de 4 fases secuenciales.
              </p>
            </div>
          </section>

          {/* Interactive Phase Selector */}
          <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {FASES_PROYECTO.map((fase) => (
                <button
                  key={fase.numero}
                  onClick={() => setSelectedFase(fase.numero)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    selectedFase === fase.numero
                      ? 'border-[#39A900] bg-emerald-50/60 dark:bg-emerald-950/40 shadow-xs'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span 
                      className="w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center"
                      style={{ backgroundColor: fase.color }}
                    >
                      {fase.numero}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Fase {fase.numero}
                    </span>
                  </div>
                  <div className="text-base font-bold text-slate-900 dark:text-white">
                    {fase.fase}
                  </div>
                </button>
              ))}
            </div>

            {/* Selected Phase Deep Dive */}
            <div className="border border-slate-200 dark:border-slate-700 rounded-2xl p-6 sm:p-8 bg-slate-50/50 dark:bg-slate-800/40">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-700">
                <div>
                  <div className="flex items-center gap-2">
                    <span 
                      className="px-2.5 py-0.5 rounded text-white text-xs font-bold"
                      style={{ backgroundColor: currentFase.color }}
                    >
                      Fase {currentFase.numero} de 4
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                      Fase de {currentFase.fase}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 font-medium">
                    {currentFase.objetivo}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                
                {/* Activities */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#39A900]" />
                    <span>Actividades del Aprendiz</span>
                  </h4>
                  <ul className="space-y-2">
                    {currentFase.actividadesAprendiz.map((act, idx) => (
                      <li key={idx} className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 leading-normal">
                        {act}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deliverables */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span>Entregables / Evidencias</span>
                  </h4>
                  <ul className="space-y-2">
                    {currentFase.entregablesComunes.map((ent, idx) => (
                      <li key={idx} className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 leading-normal">
                        {ent}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Instructor Role */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-amber-500" />
                    <span>Acompañamiento del Instructor</span>
                  </h4>
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {currentFase.rolInstructor}
                  </div>

                  <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-300">
                    <span className="font-bold block mb-1">Portafolio en Zajuna LMS:</span>
                    Todas las evidencias de esta fase deben subirse y quedar con juicio aprobatorio antes de avanzar al siguiente corte formativo.
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Key Pedagogical Instruments */}
          <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Instrumentos Clave del Proceso Formativo
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <BookOpen className="w-6 h-6 text-[#39A900] mb-2" />
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">Guías de Aprendizaje</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Documento orientador que contiene la contextualización, las actividades de reflexión inicial, contextualización, apropiación del conocimiento y transferencia práctica que debes realizar.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <Database className="w-6 h-6 text-blue-600 mb-2" />
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">Portafolio de Evidencias</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Espacio digital individual dentro de la plataforma Zajuna donde compilas tus evidencias de conocimiento, desempeño y producto con las respectivas observaciones de los instructores.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <Layers className="w-6 h-6 text-amber-500 mb-2" />
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">Ambientes de Aprendizaje</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Espacios dotados con tecnología idéntica a la industria real: talleres mecánicos, laboratorios de biotecnología, centros de cómputo, simuladores y aulas virtuales conectadas.
                </p>
              </div>
            </div>
          </section>

        </div>
      )}

      {/* TAB 4: BIENESTAR AL APRENDIZ */}
      {activeTab === 'bienestar' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Bienestar Header */}
          <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#39A900] mb-2">
                <HeartPulse className="w-4 h-4" />
                <span>Desarrollo Biopsicosocial y Permanencia</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                Plan Nacional Integral de Bienestar al Aprendiz
              </h2>
              <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
                El SENA cuida integralmente de ti durante tu paso por la institución. A través de 6 ejes estratégicos, 
                brinda apoyo en salud, recreación, arte, cultura, liderazgo y subsidios económicos para que ninguna dificultad te impida culminar tu meta profesional.
              </p>
            </div>
          </section>

          {/* 6 Strategic Bienestar Axes */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EJES_BIENESTAR.map((eje) => (
              <div 
                key={eje.id}
                onClick={() => setSelectedEjeBienestar(eje.id)}
                className={`cursor-pointer rounded-2xl border p-6 transition-all flex flex-col justify-between ${
                  selectedEjeBienestar === eje.id
                    ? 'border-[#39A900] bg-emerald-50/50 dark:bg-emerald-950/40 shadow-sm ring-1 ring-[#39A900]'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100/70 dark:bg-emerald-950/60 text-[#39A900] flex items-center justify-center font-bold">
                      {eje.id === 'eje_salud' && <HeartPulse className="w-6 h-6" />}
                      {eje.id === 'eje_cultura' && <Palette className="w-6 h-6" />}
                      {eje.id === 'eje_deporte' && <Trophy className="w-6 h-6" />}
                      {eje.id === 'eje_liderazgo' && <Users className="w-6 h-6" />}
                      {eje.id === 'eje_psicosocial' && <Brain className="w-6 h-6" />}
                      {eje.id === 'eje_socioeconomico' && <Coins className="w-6 h-6" />}
                    </div>
                    {selectedEjeBienestar === eje.id && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#39A900] bg-white dark:bg-slate-900 px-2 py-0.5 rounded-full border border-emerald-300">
                        Seleccionado
                      </span>
                    )}
                  </div>

                  <span className="text-xs font-semibold text-[#39A900] block mb-1">
                    "{eje.lema}"
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {eje.nombre}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {eje.descripcion}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 text-xs">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-1">Punto de Contacto:</span>
                  <span className="text-slate-500 dark:text-slate-400">{eje.contactoOCentro}</span>
                </div>
              </div>
            ))}
          </section>

          {/* Active Eje Deep Dive Details */}
          <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-700">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#39A900]">
                  Detalle del Eje Seleccionado
                </span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  {currentEje.nombre}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                  "{currentEje.lema}"
                </p>
              </div>

              <div className="px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 font-semibold">
                Oficina de Bienestar al Aprendiz
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#39A900]" />
                  <span>Programas, Servicios y Beneficios Disponibles</span>
                </h4>
                <ul className="space-y-2.5">
                  {currentEje.programasYBeneficios.map((prog, idx) => (
                    <li key={idx} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{prog}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    ¿Cómo postularte o acceder a este beneficio?
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {currentEje.comoAcceder}
                  </p>
                </div>

                {currentEje.id === 'eje_socioeconomico' && (
                  <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200">
                    <span className="font-bold block mb-1">Requisitos para Apoyo de Sostenimiento:</span>
                    Estar matriculado en programa titulado, pertenecer a estratos 1 o 2 (o SISBEN A/B), tener un promedio académico sobresaliente, no tener sanciones disciplinarias y no poseer contrato de aprendizaje simultáneo ni vínculo laboral.
                  </div>
                )}
              </div>
            </div>
          </section>

        </div>
      )}

      {/* TAB 5: HERRAMIENTAS INSTITUCIONALES */}
      {activeTab === 'herramientas' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Tools Header */}
          <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#39A900] mb-2">
                <Laptop className="w-4 h-4" />
                <span>Ecosistema Digital y Plataformas Oficiales</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                Herramientas Institucionales del Aprendiz
              </h2>
              <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
                El SENA dispone de un conjunto de plataformas tecnológicas integradas para gestionar tu vida académica, tus clases virtuales, tus proyectos de investigación y tu inserción al mundo laboral.
              </p>
            </div>
          </section>

          {/* Tools Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {HERRAMIENTAS_INSTITUCIONALES.map((tool) => (
              <div 
                key={tool.id}
                onClick={() => setSelectedHerramienta(tool.id)}
                className={`cursor-pointer rounded-2xl border p-6 transition-all flex flex-col justify-between ${
                  selectedHerramienta === tool.id
                    ? 'border-[#39A900] bg-emerald-50/50 dark:bg-emerald-950/40 shadow-sm ring-1 ring-[#39A900]'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                      {tool.categoria}
                    </span>
                    {selectedHerramienta === tool.id && (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#39A900]" />
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                    {tool.nombre}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed mb-4">
                    {tool.descripcion}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono text-[11px] truncate max-w-[180px]">
                    {tool.sigla}
                  </span>
                  <span className="text-[#39A900] font-semibold flex items-center gap-1">
                    <span>Ver funciones</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </section>

          {/* Selected Tool Details Card */}
          <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-700">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#39A900]">
                  {currentHerramienta.categoria}
                </span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  {currentHerramienta.nombre}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-2xl leading-relaxed">
                  {currentHerramienta.descripcion}
                </p>
              </div>

              <div className="flex flex-col gap-1 text-right">
                <span className="text-xs font-bold text-slate-500">Acceso oficial:</span>
                <span className="text-xs font-mono text-[#39A900] underline">{currentHerramienta.enlaceOAcceso}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#39A900]" />
                  <span>¿Qué puedes hacer en esta plataforma?</span>
                </h4>
                <ul className="space-y-2">
                  {currentHerramienta.funcionesPrincipales.map((func, idx) => (
                    <li key={idx} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#39A900] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{func}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
                      Credenciales de Acceso
                    </span>
                    <p className="text-xs text-slate-700 dark:text-slate-300">
                      {currentHerramienta.usuarioClave}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
                    <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
                      Soporte Técnico y Mesa de Ayuda
                    </span>
                    <p className="text-xs text-slate-700 dark:text-slate-300">
                      {currentHerramienta.soporteTecnico}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-300">
                  <span className="font-bold block mb-1">Consejo de Seguridad Digital SENA:</span>
                  Nunca compartas tu contraseña de Sofia Plus ni Zajuna con terceros ni intermediarios. Todos los trámites del SENA son personales y 100% gratuitos.
                </div>
              </div>
            </div>
          </section>

        </div>
      )}

      {/* TAB 6: CANALES DE ATENCIÓN Y CONDUCTO REGULAR */}
      {activeTab === 'canales' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Channels Header */}
          <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#39A900] mb-2">
                <Phone className="w-4 h-4" />
                <span>Servicio al Ciudadano y Conducto Regular</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                Canales Oficiales de Atención y Conducto Regular
              </h2>
              <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
                Conoce las líneas oficiales de contacto, el sistema de peticiones y reclamos (PQRSD) y las 5 instancias institucionales para resolver cualquier inquietud académica o disciplinaria de forma ordenada y garantista.
              </p>
            </div>
          </section>

          {/* Conducto Regular Step-by-Step Flow */}
          <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#39A900]">
                Protocolo Institucional
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                El Conducto Regular del Aprendiz (5 Instancias)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                Ante cualquier inconformidad con evaluaciones, inasistencias o convivencia, debes seguir esta escala gradual sin saltarte pasos:
              </p>
            </div>

            <div className="space-y-4">
              {CONDUCTO_REGULAR.map((nivel) => (
                <div 
                  key={nivel.paso}
                  className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/50 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#39A900] text-white flex items-center justify-center font-bold text-base shrink-0 shadow-xs">
                      {nivel.paso}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        {nivel.instancia}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 max-w-2xl leading-relaxed">
                        {nivel.rol}
                      </p>
                      <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                        <strong className="text-slate-700 dark:text-slate-300">Cuándo acudir:</strong> {nivel.cuandoAcudir}
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 text-left md:text-right bg-white dark:bg-slate-900 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Respuesta Estimada</span>
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">{nivel.tiempoRespuestaEstimado}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Official Contact Channels Cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CANALES_ATENCION.map((canal) => (
              <div 
                key={canal.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-[#39A900] border border-emerald-200 dark:border-emerald-800">
                      {canal.tipo}
                    </span>
                    {canal.tipo === 'Telefonico' && <Phone className="w-4 h-4 text-emerald-600" />}
                    {canal.tipo === 'Digital / Web' && <Globe2 className="w-4 h-4 text-blue-600" />}
                    {canal.tipo === 'Presencial' && <Compass className="w-4 h-4 text-amber-500" />}
                    {canal.tipo === 'Redes Sociales' && <MessageSquare className="w-4 h-4 text-purple-600" />}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {canal.nombre}
                  </h3>

                  <div className="p-3 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-slate-200 dark:border-slate-700 mb-3">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block mb-0.5">Dato de Contacto</span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white break-all">{canal.datoContacto}</span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                    {canal.proposito}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 space-y-1">
                  <span className="font-semibold block text-slate-700 dark:text-slate-300">Horario de Atención:</span>
                  <span>{canal.horario}</span>
                </div>
              </div>
            ))}
          </section>

        </div>
      )}

      {/* Completion & Next Module Action */}
      <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#39A900] text-white flex items-center justify-center shrink-0 shadow-xs">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              ¿Comprendiste la Identidad, la FPI, el Bienestar y las Herramientas?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5">
              Registra este módulo como completado para certificar tu avance en el manual institucional.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <button
            onClick={onCompleteModule}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 w-full sm:w-auto ${
              isCompleted
                ? 'bg-white dark:bg-slate-900 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-700 shadow-2xs'
                : 'bg-[#39A900] text-white hover:bg-[#329600] shadow-2xs'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isCompleted ? 'Manual Completado ✓' : 'Marcar como Completado'}</span>
          </button>

          <button
            onClick={onGoToNext}
            className="px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 w-full sm:w-auto shadow-2xs"
          >
            <span>Ir a Derechos y Deberes</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
