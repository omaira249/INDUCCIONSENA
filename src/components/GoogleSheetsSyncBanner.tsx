import React, { useState, useEffect } from 'react';
import { googleSignIn, initAuth, logout } from '../services/googleAuthService';
import { 
  getSyncState, 
  flushPendingQueue, 
  createOrGetSpreadsheet, 
  SheetsSyncState 
} from '../services/sheetsService';
import { 
  ExternalLink, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  FileSpreadsheet, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { User } from 'firebase/auth';

export const GoogleSheetsSyncBanner: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const [user, setUser] = useState<User | null>(null);
  const [syncState, setSyncState] = useState<SheetsSyncState>(getSyncState());
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const refreshState = () => {
    setSyncState(getSyncState());
  };

  useEffect(() => {
    // Listen for auth state
    const unsubscribe = initAuth(
      (currentUser) => {
        setUser(currentUser);
        refreshState();
      },
      () => {
        setUser(null);
        refreshState();
      }
    );

    // Listen for custom sync events
    const handleSyncUpdate = () => {
      refreshState();
    };

    window.addEventListener('sena-sheets-sync-updated', handleSyncUpdate);

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
      window.removeEventListener('sena-sheets-sync-updated', handleSyncUpdate);
    };
  }, []);

  const handleConnectGoogle = async () => {
    setIsConnecting(true);
    setFeedbackMsg(null);
    try {
      const res = await googleSignIn();
      if (res?.user) {
        setUser(res.user);
        setFeedbackMsg('¡Conectado exitosamente con Google Drive!');
        // Automatically create or link sheet and flush pending queue
        try {
          await createOrGetSpreadsheet();
          await flushPendingQueue();
        } catch (e) {
          console.error(e);
        }
        refreshState();
      }
    } catch (err: any) {
      console.error('Error connecting Google:', err);
      setFeedbackMsg('No se completó la conexión con Google. Inténtalo de nuevo.');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleManualSync = async () => {
    setIsSyncing(true);
    setFeedbackMsg(null);
    try {
      if (!user) {
        await handleConnectGoogle();
      } else {
        const { syncedCount } = await flushPendingQueue();
        setFeedbackMsg(`Sincronización completada: ${syncedCount} registros actualizados en Google Drive.`);
      }
      refreshState();
    } catch (err: any) {
      setFeedbackMsg(err.message || 'Error durante la sincronización.');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleDisconnect = async () => {
    await logout();
    setUser(null);
    setFeedbackMsg('Desconectado de Google Drive.');
    refreshState();
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800/80 rounded-2xl p-4 sm:p-5 shadow-xs transition-all">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Left Info: Google Drive branding and status */}
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center shrink-0">
            <FileSpreadsheet className="w-6 h-6 text-[#39A900]" />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                Google Sheets & Drive · Sincronización en Tiempo Real
              </span>

              {user ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-[#39A900] animate-pulse"></span>
                  Conectado ({user.email})
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                  <Clock className="w-3 h-3 text-amber-600" />
                  Almacenamiento Local Activo (Pendiente enlace Google)
                </span>
              )}
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Cada respuesta, evaluación y novedad se registra en tiempo real en la hoja oficial del Acuerdo 2026.
              {syncState.totalSynced > 0 && (
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 ml-1">
                  ({syncState.totalSynced} registros en la hoja de cálculo)
                </span>
              )}
              {syncState.pendingCount > 0 && (
                <span className="font-semibold text-amber-600 dark:text-amber-400 ml-1">
                  · {syncState.pendingCount} pendientes por subir
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Right Actions: Connect or Open Sheet in Google Drive */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {syncState.spreadsheetUrl ? (
            <a
              href={syncState.spreadsheetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#39A900] text-white hover:bg-[#329600] transition flex items-center gap-1.5 shadow-xs"
              title="Abrir la hoja de cálculo generada en Google Drive"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Abrir Hoja en Google Drive</span>
            </a>
          ) : null}

          {!user ? (
            <button
              onClick={handleConnectGoogle}
              disabled={isConnecting}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-200 transition flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-60"
            >
              {/* Official Google SVG icon */}
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
              </svg>
              <span>{isConnecting ? 'Conectando...' : 'Conectar con Google Drive'}</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleManualSync}
                disabled={isSyncing}
                className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition flex items-center gap-1.5 cursor-pointer"
                title="Sincronizar datos pendientes con Google Drive"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Sincronizando...' : 'Sincronizar'}</span>
              </button>

              <button
                onClick={handleDisconnect}
                className="px-2.5 py-2 text-[11px] text-slate-400 hover:text-rose-600 transition cursor-pointer"
                title="Desconectar cuenta Google"
              >
                Desconectar
              </button>
            </div>
          )}

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            title={isExpanded ? 'Ocultar historial' : 'Ver historial de sincronización'}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Feedback Message Banner */}
      {feedbackMsg && (
        <div className="mt-3 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#39A900] shrink-0" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Expandable Real-Time Event Log */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold uppercase tracking-wider text-slate-500">
              Historial de Sincronización en Vivo (Últimos Eventos)
            </span>
            <span className="text-[11px] text-slate-400">
              {syncState.history.length} eventos registrados
            </span>
          </div>

          {syncState.history.length === 0 ? (
            <p className="text-xs text-slate-400 italic py-2">
              Aún no hay respuestas registradas. Al responder en la evaluación o radicar novedades, los registros aparecerán aquí automáticamente.
            </p>
          ) : (
            <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
              {syncState.history.map((record) => (
                <div
                  key={record.id}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        record.synced ? 'bg-[#39A900]' : 'bg-amber-500 animate-pulse'
                      }`}
                      title={record.synced ? 'Sincronizado en Google Sheets' : 'Pendiente en cola local'}
                    />
                    <div className="min-w-0">
                      <div className="font-semibold text-slate-900 dark:text-white truncate">
                        {record.resumen}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-2">
                        <span>{record.aprendizNombre} ({record.aprendizDoc})</span>
                        <span>•</span>
                        <span>Pestaña: {record.sheetName}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        record.synced
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                          : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                      }`}
                    >
                      {record.synced ? '✓ En Drive' : 'En cola'}
                    </span>
                    <span className="block text-[9px] text-slate-400 mt-0.5">
                      {record.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
