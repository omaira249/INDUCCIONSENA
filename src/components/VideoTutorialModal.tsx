import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  RotateCcw, 
  Film, 
  BookOpen, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  GraduationCap, 
  ListVideo, 
  FileText
} from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface VideoTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CHAPTERS = [
  { id: 0, time: 0, timeStr: '00:00', title: '1. Bienvenida e Introducción al Portal SENA 2026', desc: 'Presentación de la plataforma de inducción bajo el Reglamento del Aprendiz (Acuerdo 2026).' },
  { id: 1, time: 45, timeStr: '00:45', title: '2. Selección de Rol e Ingreso al Sistema', desc: 'Diferencia entre Rol Aprendiz y Rol Instructor, ingreso seguro y guardado de datos.' },
  { id: 2, time: 90, timeStr: '01:30', title: '3. Módulo 1: Reglamento Vigente (Capítulos I - VIII)', desc: 'Navegación por el manual, buscador de artículos, derechos, deberes y prohibiciones.' },
  { id: 3, time: 135, timeStr: '02:15', title: '4. Módulo 2 y 3: Dilemas y Evaluación de Inducción', desc: 'Simulación de casos éticos reales, cuestionario normativo y envío en vivo a Google Sheets.' },
  { id: 4, time: 180, timeStr: '03:00', title: '5. Módulo 4 y 5: Radicación de Novedades y Certificado', desc: 'Trámites académicos, código QR de certificación y símbolos institucionales SENA.' }
];

export const VideoTutorialModal: React.FC<VideoTutorialModalProps> = ({ isOpen, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(210); // 3m 30s default duration
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [useFallbackCanvasPlayer, setUseFallbackCanvasPlayer] = useState(false);

  // Video sample sources
  const sampleVideoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';

  useEffect(() => {
    if (isOpen) {
      setIsPlaying(true);
      if (videoRef.current) {
        videoRef.current.play().catch(() => {
          // Fallback to canvas animated player if video autoplay is blocked
          setUseFallbackCanvasPlayer(true);
        });
      }
    } else {
      setIsPlaying(false);
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
  }, [isOpen]);

  // Update current chapter based on time
  useEffect(() => {
    const matched = CHAPTERS.slice().reverse().find(c => currentTime >= c.time);
    if (matched) {
      setActiveChapterIndex(matched.id);
    }
  }, [currentTime]);

  // Sync video time updates
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 210);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    } else {
      setIsMuted(!isMuted);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const handleChapterClick = (chapterTime: number) => {
    setCurrentTime(chapterTime);
    if (videoRef.current) {
      videoRef.current.currentTime = chapterTime;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainderSecs = Math.floor(secs % 60);
    return `${mins.toString().padStart(2, '0')}:${remainderSecs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      
      {/* Floating Modal Box */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-5xl w-full border-2 border-emerald-500/30 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#00324D] via-[#00476e] to-[#39A900] text-white p-4 sm:p-5 flex items-center justify-between gap-4 border-b-2 border-[#39A900] shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-white rounded-xl shadow-md shrink-0">
              <SenaLogo className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#39A900] text-white uppercase tracking-wider">
                  Video Tutorial Oficial
                </span>
                <span className="text-xs text-emerald-200 hidden sm:inline">
                  Reglamento 2026
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black tracking-tight text-white mt-0.5">
                Guía de Uso del Portal de Inducción para Aprendices SENA
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer shrink-0"
            title="Cerrar ventana del video tutorial"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Video Player + Chapter Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto flex-1">
          
          {/* Main Video Screen Area */}
          <div className="lg:col-span-8 bg-black flex flex-col justify-between relative group">
            
            <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center overflow-hidden">
              
              {!useFallbackCanvasPlayer ? (
                <video
                  ref={videoRef}
                  src={sampleVideoUrl}
                  controls
                  playsInline
                  autoPlay
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={() => setIsPlaying(false)}
                  onError={() => setUseFallbackCanvasPlayer(true)}
                  className="w-full h-full object-contain"
                />
              ) : (
                /* Interactive SENA Graphical Player Fallback if HTML5 video blocks CORS */
                <div className="w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white flex flex-col items-center justify-center p-6 text-center relative">
                  <div className="p-4 bg-emerald-950/80 rounded-full border-2 border-[#39A900] mb-4 shadow-xl animate-pulse">
                    <SenaLogo className="w-16 h-16" />
                  </div>
                  <span className="text-xs font-bold text-[#39A900] uppercase tracking-widest block mb-1">
                    Servicio Nacional de Aprendizaje · SENA
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white max-w-md mb-2">
                    {CHAPTERS[activeChapterIndex].title}
                  </h3>
                  <p className="text-xs text-emerald-200 max-w-md leading-relaxed mb-4">
                    {CHAPTERS[activeChapterIndex].desc}
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={togglePlay}
                      className="px-5 py-2.5 rounded-xl bg-[#39A900] hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      <span>{isPlaying ? 'Pausar Video' : 'Reproducir Video'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Watermark badge */}
              <div className="absolute top-3 right-3 pointer-events-none bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[10px] font-bold text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#39A900] animate-ping" />
                <span>Tutorial SENA 2026</span>
              </div>
            </div>

            {/* Custom Interactive Player Controls Strip below Video */}
            <div className="bg-slate-900 text-slate-200 p-3 sm:p-4 border-t border-slate-800 space-y-2">
              
              {/* Timeline Seek Slider */}
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="text-emerald-400 font-bold">{formatTime(currentTime)}</span>
                <input
                  type="range"
                  min={0}
                  max={duration || 210}
                  value={currentTime}
                  onChange={handleSeek}
                  className="flex-1 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#39A900]"
                />
                <span className="text-slate-400">{formatTime(duration || 210)}</span>
              </div>

              {/* Playback Control Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <div className="flex items-center gap-2">
                  <button
                    onClick={togglePlay}
                    className="p-2 rounded-xl bg-[#39A900] hover:bg-emerald-600 text-white transition cursor-pointer"
                    title={isPlaying ? 'Pausar' : 'Reproducir'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>

                  <button
                    onClick={() => handleChapterClick(0)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                    title="Reiniciar video desde el inicio"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                    title={isMuted ? 'Activar sonido' : 'Silenciar'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>

                {/* Speed Controls & Fullscreen */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl text-[11px] font-bold">
                    <span className="text-slate-400 px-1">Velocidad:</span>
                    {[0.75, 1, 1.25, 1.5, 2].map((spd) => (
                      <button
                        key={spd}
                        onClick={() => handleSpeedChange(spd)}
                        className={`px-2 py-0.5 rounded-lg transition cursor-pointer ${
                          playbackSpeed === spd
                            ? 'bg-[#39A900] text-white font-black'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {spd}x
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setShowTranscript(!showTranscript)}
                    className={`p-2 rounded-xl transition cursor-pointer text-xs font-bold flex items-center gap-1 ${
                      showTranscript ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                    title="Ver transcripción y resumen"
                  >
                    <FileText className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleFullscreen}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                    title="Pantalla completa"
                  >
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Right Sidebar: Chapters List & Transcript */}
          <div className="lg:col-span-4 bg-slate-50 dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 p-4 sm:p-5 flex flex-col justify-between space-y-4">
            
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-3">
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <ListVideo className="w-4 h-4 text-[#39A900]" />
                  Contenido por Capítulos
                </h3>
                <span className="text-[10px] font-bold text-[#39A900] bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                  5 Pasos
                </span>
              </div>

              {/* Chapters list buttons */}
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                {CHAPTERS.map((chap) => {
                  const isActive = activeChapterIndex === chap.id;

                  return (
                    <button
                      key={chap.id}
                      onClick={() => handleChapterClick(chap.time)}
                      className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer ${
                        isActive
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 border-[#39A900] ring-1 ring-[#39A900] text-slate-900 dark:text-white shadow-xs'
                          : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                          {chap.timeStr}
                        </span>
                        {isActive && (
                          <span className="text-[10px] font-bold text-[#39A900] flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#39A900] animate-ping" />
                            Reproduciendo
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-xs leading-snug mb-0.5">
                        {chap.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-tight">
                        {chap.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Transcript Summary Drawer */}
            {showTranscript ? (
              <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-2 text-slate-700 dark:text-slate-300 animate-fadeIn">
                <span className="font-bold text-[#39A900] text-[11px] uppercase block">
                  Resumen de la Guía:
                </span>
                <p className="text-[11px] leading-relaxed">
                  En este tutorial aprenderás a navegar el estatuto normativo 2026, realizar la evaluación cualitativa para obtener tu certificado digital con QR y radicar novedades académicas sincronizadas a Google Sheets.
                </p>
              </div>
            ) : (
              <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#39A900] shrink-0" />
                <span className="text-[11px]">
                  Haz clic en cualquier capítulo para saltar directamente a ese momento del tutorial.
                </span>
              </div>
            )}

            {/* Footer action button */}
            <div className="pt-2">
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl font-bold text-white bg-[#39A900] hover:bg-emerald-700 transition text-xs shadow-md cursor-pointer"
              >
                Entendido, ir al portal
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
