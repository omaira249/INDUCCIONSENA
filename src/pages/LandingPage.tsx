import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { SenaLogo } from '../components/SenaLogo';
import { VideoTutorialModal } from '../components/VideoTutorialModal';
import heroImage from '../assets/images/sena_portal_hero_1793205077364.jpg';
import { 
  ShieldCheck, 
  Award, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Scale, 
  Layers, 
  Workflow, 
  GraduationCap, 
  Phone, 
  FileText, 
  Clock, 
  AlertTriangle, 
  UserCheck, 
  KeyRound, 
  Eye, 
  EyeOff, 
  Save, 
  Trash2, 
  Sparkles, 
  HelpCircle,
  X,
  PlayCircle
} from 'lucide-react';


interface SavedCredentials {
  role: 'instructor' | 'aprendiz';
  documentType: string;
  identifier: string;
  password: string;
  savedAt: string;
}

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, loginAs } = useAuth();

  // Selected Login Role (Only Instructor and Aprendiz)
  const [loginRole, setLoginRole] = useState<'instructor' | 'aprendiz'>('aprendiz');
  const [documentType, setDocumentType] = useState('CC');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberCredentials, setRememberCredentials] = useState(false);
  
  // Feedback states
  const [errorMessage, setErrorMessage] = useState('');
  const [savedCredentialsInfo, setSavedCredentialsInfo] = useState<SavedCredentials | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRecoveryModalOpen, setIsRecoveryModalOpen] = useState(false);
  const [recoveryInput, setRecoveryInput] = useState('');
  const [recoveryMessage, setRecoveryMessage] = useState('');
  const [isVideoTutorialOpen, setIsVideoTutorialOpen] = useState(false);

  // Load saved credentials on component mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('sena_saved_credentials');
      if (saved) {
        const parsed: SavedCredentials = JSON.parse(saved);
        setSavedCredentialsInfo(parsed);
        setLoginRole(parsed.role || 'aprendiz');
        setDocumentType(parsed.documentType || 'CC');
        setIdentifier(parsed.identifier || '');
        setPassword(parsed.password || '');
        setRememberCredentials(true);
      }
    } catch {
      localStorage.removeItem('sena_saved_credentials');
    }
  }, []);

  // Handle Form Submission
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!identifier.trim()) {
      setErrorMessage('Por favor ingresa tu número de documento o usuario institucional.');
      return;
    }

    if (!password.trim()) {
      setErrorMessage('Por favor ingresa tu contraseña de acceso.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const success = login(identifier.trim(), password.trim(), loginRole);

      if (success) {
        // Save or remove credentials based on user checkbox preference
        if (rememberCredentials) {
          const credentialsToSave: SavedCredentials = {
            role: loginRole,
            documentType,
            identifier: identifier.trim(),
            password: password.trim(),
            savedAt: new Date().toLocaleDateString('es-CO')
          };
          localStorage.setItem('sena_saved_credentials', JSON.stringify(credentialsToSave));
        } else {
          localStorage.removeItem('sena_saved_credentials');
        }

        navigate('/dashboard');
      } else {
        setErrorMessage('Credenciales no válidas. Puedes usar la clave demo: 123 o verificar el documento.');
        setIsSubmitting(false);
      }
    }, 400);
  };

  // Quick 1-click login using saved credentials
  const handleQuickLoginFromSaved = () => {
    if (!savedCredentialsInfo) return;
    setIsSubmitting(true);
    setTimeout(() => {
      const success = login(savedCredentialsInfo.identifier, savedCredentialsInfo.password, savedCredentialsInfo.role);
      if (success) {
        navigate('/dashboard');
      } else {
        loginAs(savedCredentialsInfo.role);
        navigate('/dashboard');
      }
    }, 300);
  };

  const [clearedNotice, setClearedNotice] = useState('');

  // Clear saved credentials
  const handleClearSavedCredentials = () => {
    localStorage.removeItem('sena_saved_credentials');
    setSavedCredentialsInfo(null);
    setIdentifier('');
    setPassword('');
    setRememberCredentials(false);
    setClearedNotice('¡Datos de ingreso eliminados de este equipo! El prototipo está limpio y listo.');
    setTimeout(() => setClearedNotice(''), 4000);
  };

  // Fill sample credentials for instant testing
  const handleFillDemo = (role: 'instructor' | 'aprendiz') => {
    setLoginRole(role);
    setErrorMessage('');
    if (role === 'instructor') {
      setDocumentType('CC');
      setIdentifier('52891044');
      setPassword('123');
    } else {
      setDocumentType('CC');
      setIdentifier('1020491823');
      setPassword('123');
    }
  };

  // Password Recovery handler
  const handleRecoverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recoveryInput.trim()) return;
    setRecoveryMessage(
      `Se han enviado las instrucciones de restablecimiento de contraseña al correo institucional asociado a "${recoveryInput}".`
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* Institutional Top Bar */}
      <div className="bg-[#39A900] text-white text-xs md:text-sm font-semibold py-2.5 px-4 text-center shadow-xs flex flex-wrap items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse"></span>
        <span>Portal Institucional SENA · Acceso Diferenciado para <strong>Instructores</strong> y <strong>Aprendices</strong> (Acuerdo 2026 Vigente · Sustituye Acuerdo 007 de 2012)</span>
        <button
          onClick={() => setIsVideoTutorialOpen(true)}
          className="ml-2 px-3 py-1 rounded-full bg-white text-[#39A900] hover:bg-emerald-100 font-bold text-xs inline-flex items-center gap-1.5 shadow-md transition cursor-pointer"
          title="Ver Video Tutorial con Controles de Reproducción"
        >
          <PlayCircle className="w-4 h-4 text-[#39A900] animate-pulse" />
          <span>Video Tutorial</span>
        </button>
      </div>


      {/* Main Hero & Authentication Area */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/30 to-slate-50 dark:from-slate-900 dark:via-slate-900/60 dark:to-slate-950 py-10 md:py-16 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Institutional Branding, Presentation & Image */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-50 dark:bg-emerald-950 rounded-2xl border border-emerald-200 dark:border-emerald-800 shadow-xs">
                  <SenaLogo className="w-10 h-10" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#39A900] uppercase tracking-wider block">
                    Servicio Nacional de Aprendizaje
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                    Bienvenido al Portal de Inducción para Aprendices
                  </h1>
                </div>
              </div>

              {/* Institutional Hero Photo */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 group">
                <img 
                  src={heroImage} 
                  alt="Instructor y Aprendiz en Centro de Tecnología SENA" 
                  className="w-full h-64 sm:h-72 lg:h-80 object-cover object-center group-hover:scale-102 transition-transform duration-500"
                />
                
                {/* Gradient overlay with institutional badges & Video Tutorial trigger */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#39A900] text-white flex items-center gap-1 shadow-xs">
                      <GraduationCap className="w-3.5 h-3.5" />
                      Rol: Instructor
                    </span>
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-white text-emerald-900 flex items-center gap-1 shadow-xs">
                      <UserCheck className="w-3.5 h-3.5 text-[#39A900]" />
                      Rol: Aprendiz
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsVideoTutorialOpen(true)}
                      className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1 shadow-md transition cursor-pointer"
                    >
                      <PlayCircle className="w-3.5 h-3.5" />
                      <span>Video Tutorial</span>
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-emerald-100">
                    Ambientes de Formación Profesional Integral con Colores y Distintivos Oficiales SENA.
                  </p>
                </div>
              </div>

              {/* Roles summary bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-1">
                    <div className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-[#39A900] flex items-center justify-center font-bold">
                      👨‍🏫
                    </div>
                    <span>Rol Instructor</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                    Supervisión de fichas, alertas de inasistencias (3 días), evaluación de competencias y comités reglamentarios.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-1">
                    <div className="w-6 h-6 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-600 flex items-center justify-center font-bold">
                      👨‍🎓
                    </div>
                    <span>Rol Aprendiz</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                    Consulta del Acuerdo 2026 (Reglamento Vigente), trámites, simulación de dilemas, evaluación y certificación oficial con código QR.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column: Interactive Login Box with Remember Credentials Feature */}
            <div className="lg:col-span-6">
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-emerald-100 dark:border-emerald-950 relative">
                
                {/* Header of Form */}
                <div className="mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                        Ingreso al Sistema SENA
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Selecciona tu rol e introduce tus datos de acceso institucional.
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsVideoTutorialOpen(true)}
                        className="px-3 py-1.5 text-[11px] font-bold rounded-full bg-[#39A900] text-white hover:bg-emerald-700 transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                        title="Abrir reproductor de Video Tutorial"
                      >
                        <PlayCircle className="w-4 h-4" />
                        <span>Video Tutorial</span>
                      </button>
                      <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300">
                        Acceso Seguro
                      </span>
                    </div>
                  </div>
                </div>

                {/* Role Switcher Button Group */}
                <div className="mb-5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Selecciona tu Rol de Ingreso:
                  </label>
                  <div className="grid grid-cols-2 gap-3 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl">
                    <button
                      type="button"
                      onClick={() => setLoginRole('instructor')}
                      className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        loginRole === 'instructor' 
                          ? 'bg-[#39A900] text-white shadow-md' 
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      <GraduationCap className="w-4 h-4" />
                      <span>Soy Instructor</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setLoginRole('aprendiz')}
                      className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        loginRole === 'aprendiz' 
                          ? 'bg-[#39A900] text-white shadow-md' 
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>Soy Aprendiz</span>
                    </button>
                  </div>
                </div>

                {/* Notice if credentials were saved previously */}
                {savedCredentialsInfo && (
                  <div className="mb-5 p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-xs flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Save className="w-4 h-4 text-[#39A900] shrink-0" />
                      <div>
                        <span className="font-bold text-emerald-900 dark:text-emerald-200 block">
                          Datos guardados para futuros ingresos:
                        </span>
                        <span className="text-slate-600 dark:text-slate-300 text-[11px]">
                          {savedCredentialsInfo.role === 'instructor' ? 'Instructor' : 'Aprendiz'} · Doc: {savedCredentialsInfo.identifier}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleQuickLoginFromSaved}
                        className="px-2.5 py-1 bg-[#39A900] text-white text-[11px] font-bold rounded-lg hover:bg-emerald-700 transition cursor-pointer"
                        title="Ingresar directamente con los datos recordados"
                      >
                        Entrar ya
                      </button>
                      <button
                        type="button"
                        onClick={handleClearSavedCredentials}
                        className="p-1 text-slate-400 hover:text-rose-600 transition cursor-pointer"
                        title="Eliminar datos guardados"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Error Banner */}
                {errorMessage && (
                  <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2 animate-shake">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Main Form */}
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  
                  {/* Tipo de Documento y Número de Documento */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <div className="sm:col-span-4">
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Tipo Doc.
                      </label>
                      <select
                        value={documentType}
                        onChange={(e) => setDocumentType(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-[#39A900] focus:outline-none"
                      >
                        <option value="CC">C.C. Cédula</option>
                        <option value="TI">T.I. Tarjeta</option>
                        <option value="CE">C.E. Extranjería</option>
                        <option value="PEP">PEP / PPT</option>
                        <option value="USER">Usuario Institucional</option>
                      </select>
                    </div>

                    <div className="sm:col-span-8">
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Número de Documento o Usuario
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={identifier}
                          onChange={(e) => setIdentifier(e.target.value)}
                          placeholder={loginRole === 'instructor' ? 'Ej. 52891044 o correo' : 'Ej. 1020491823 o correo'}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-[#39A900] focus:outline-none"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contraseña */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Contraseña de Acceso
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setIsRecoveryModalOpen(true);
                          setRecoveryInput(identifier);
                        }}
                        className="text-[11px] font-semibold text-[#39A900] hover:underline cursor-pointer"
                      >
                        ¿Olvidaste tu contraseña?
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Ingresa tu contraseña (demo: 123)"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-[#39A900] focus:outline-none pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                        title={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Guardar Información de Ingreso para Futuros Ingresos */}
                  <div className="pt-1 pb-1">
                    <label className="flex items-start gap-2.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={rememberCredentials}
                        onChange={(e) => setRememberCredentials(e.target.checked)}
                        className="w-4 h-4 mt-0.5 rounded text-[#39A900] focus:ring-[#39A900] border-slate-300 dark:border-slate-700 cursor-pointer accent-[#39A900]"
                      />
                      <span className="text-xs text-slate-700 dark:text-slate-300 leading-snug">
                        <strong>Guardar información de ingreso</strong> (Usuario y Clave) para acceder automáticamente en futuros ingresos desde este equipo.
                      </span>
                    </label>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 space-y-2.5">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl font-bold text-white bg-[#39A900] hover:bg-emerald-700 active:scale-98 shadow-lg shadow-emerald-700/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <span>Validando credenciales...</span>
                      ) : (
                        <>
                          <KeyRound className="w-4 h-4" />
                          <span>Ingresar como {loginRole === 'instructor' ? 'Instructor' : 'Aprendiz'}</span>
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </>
                      )}
                    </button>

                    {/* Cleared Data Success Banner */}
                    {clearedNotice && (
                      <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs flex items-center justify-between gap-2 animate-fadeIn">
                        <span className="font-bold">{clearedNotice}</span>
                      </div>
                    )}

                    {/* Quick 1-Click Demo Fill & Clear Data */}
                    <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-1 gap-2">
                      <button
                        type="button"
                        onClick={handleClearSavedCredentials}
                        className="text-rose-600 dark:text-rose-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                        title="Borrar usuario y contraseña guardados para dejar el prototipo limpio"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Borrar Datos Guardados</span>
                      </button>

                      <div className="flex gap-2 items-center">
                        <span className="text-[10px] text-slate-400">Prueba:</span>
                        <button
                          type="button"
                          onClick={() => handleFillDemo('instructor')}
                          className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-100 hover:text-[#39A900] font-semibold transition cursor-pointer"
                        >
                          Instructor Demo
                        </button>
                        <button
                          type="button"
                          onClick={() => handleFillDemo('aprendiz')}
                          className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-teal-100 hover:text-teal-700 font-semibold transition cursor-pointer"
                        >
                          Aprendiz Demo
                        </button>
                      </div>
                    </div>
                  </div>

                </form>

              </div>
            </div>

          </div>

        </div>
      </section>


      {/* Footer */}
      {/* Password Recovery Modal */}
      {isRecoveryModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-[#39A900]" />
                Recuperación de Contraseña
              </h3>
              <button
                onClick={() => {
                  setIsRecoveryModalOpen(false);
                  setRecoveryMessage('');
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {recoveryMessage ? (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200 space-y-3">
                <p>{recoveryMessage}</p>
                <button
                  type="button"
                  onClick={() => {
                    setIsRecoveryModalOpen(false);
                    setRecoveryMessage('');
                  }}
                  className="w-full py-2 bg-[#39A900] text-white font-bold rounded-xl text-xs hover:bg-emerald-700 transition cursor-pointer"
                >
                  Entendido, volver al inicio
                </button>
              </div>
            ) : (
              <form onSubmit={handleRecoverySubmit} className="space-y-4 text-xs">
                <p className="text-slate-600 dark:text-slate-300">
                  Ingresa tu número de documento o correo institucional (@sena.edu.co o @soy.sena.edu.co) para recibir el enlace de recuperación.
                </p>

                <div>
                  <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                    Documento o Correo Institucional
                  </label>
                  <input
                    type="text"
                    value={recoveryInput}
                    onChange={(e) => setRecoveryInput(e.target.value)}
                    placeholder="Ej. 1020491823 o usuario@soy.sena.edu.co"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-[#39A900] focus:outline-none"
                    required
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsRecoveryModalOpen(false)}
                    className="w-1/2 py-2.5 rounded-xl font-semibold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-2.5 rounded-xl font-bold bg-[#39A900] text-white hover:bg-emerald-700 transition cursor-pointer shadow-sm"
                  >
                    Enviar Instrucciones
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Floating Video Tutorial Modal */}
      <VideoTutorialModal
        isOpen={isVideoTutorialOpen}
        onClose={() => setIsVideoTutorialOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <SenaLogo className="w-5 h-5" />
                <span>SENA Colombia</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Servicio Nacional de Aprendizaje. Formación profesional integral gratuita y de calidad con enfoque en derechos y deberes.
              </p>
            </div>

            <div>
              <h5 className="font-bold text-white uppercase tracking-wider mb-2 text-[11px]">Roles del Portal</h5>
              <ul className="space-y-1 text-[11px]">
                <li>Panel del Instructor y Coordinación</li>
                <li>Portal del Aprendiz y Certificaciones</li>
                <li>Control de Acceso Seguro</li>
                <li>Almacenamiento Local de Credenciales</li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-white uppercase tracking-wider mb-2 text-[11px]">Normativa Oficial</h5>
              <ul className="space-y-1 text-[11px]">
                <li>Acuerdo 2026 (Reglamento Vigente del Aprendiz)</li>
                <li>Derogatoria expresa del Acuerdo 007 de 2012</li>
                <li>Ley 119 de 1994 (Reestructuración)</li>
                <li>Ley 2365 de 2024 (Prevención de Acoso)</li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 text-center text-[10px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p>© {new Date().getFullYear()} Servicio Nacional de Aprendizaje (SENA). Todos los derechos reservados.</p>
            <p>Plataforma oficial con control de acceso por roles (Instructor / Aprendiz).</p>
          </div>
        </div>
      </footer>

    </div>
  );
};
