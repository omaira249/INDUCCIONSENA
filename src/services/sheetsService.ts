import { getAccessToken, googleSignIn } from './googleAuthService';

const SPREADSHEET_ID_KEY = 'sena_spreadsheet_id';
const SPREADSHEET_URL_KEY = 'sena_spreadsheet_url';
const SYNC_QUEUE_KEY = 'sena_sheets_sync_queue';
const SYNC_HISTORY_KEY = 'sena_sheets_sync_history';

export interface SyncRecord {
  id: string;
  timestamp: string;
  sheetName: 'Respuestas_En_Vivo' | 'Resultados_Evaluaciones' | 'Novedades_Radicadas';
  rowValues: (string | number)[];
  tipo: 'respuesta_pregunta' | 'evaluacion_final' | 'novedad_radicada' | 'dilema_etico';
  aprendizNombre: string;
  aprendizDoc: string;
  resumen: string;
  synced: boolean;
}

export interface SheetsSyncState {
  spreadsheetId: string | null;
  spreadsheetUrl: string | null;
  totalSynced: number;
  pendingCount: number;
  lastSyncTime: string | null;
  history: SyncRecord[];
  isSyncing: boolean;
  error: string | null;
}

// Helpers for localStorage persistence
const getQueue = (): SyncRecord[] => {
  try {
    const raw = localStorage.getItem(SYNC_QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveQueue = (queue: SyncRecord[]) => {
  try {
    localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(queue));
  } catch (e) {
    console.error('Error saving sync queue', e);
  }
};

const getHistory = (): SyncRecord[] => {
  try {
    const raw = localStorage.getItem(SYNC_HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const addToHistory = (record: SyncRecord) => {
  try {
    const history = getHistory();
    const updated = [record, ...history].slice(0, 100); // keep last 100
    localStorage.setItem(SYNC_HISTORY_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('sena-sheets-sync-updated'));
  } catch (e) {
    console.error('Error adding to history', e);
  }
};

/**
 * Creates or retrieves the official SENA Induction Spreadsheet in Google Drive
 */
export const createOrGetSpreadsheet = async (): Promise<{ id: string; url: string }> => {
  const existingId = localStorage.getItem(SPREADSHEET_ID_KEY);
  const existingUrl = localStorage.getItem(SPREADSHEET_URL_KEY);

  if (existingId && existingUrl) {
    return { id: existingId, url: existingUrl };
  }

  const token = await getAccessToken();
  if (!token) {
    throw new Error('Debes autorizar la conexión con Google Drive / Sheets para crear la hoja.');
  }

  // Create new spreadsheet with 3 dedicated tabs
  const nowStr = new Date().toLocaleDateString('es-CO');
  const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title: `Inducción Aprendices SENA - Acuerdo 2026 (${nowStr})`,
      },
      sheets: [
        {
          properties: {
            title: 'Respuestas_En_Vivo',
            gridProperties: { rowCount: 1000, columnCount: 10 },
          },
        },
        {
          properties: {
            title: 'Resultados_Evaluaciones',
            gridProperties: { rowCount: 500, columnCount: 10 },
          },
        },
        {
          properties: {
            title: 'Novedades_Radicadas',
            gridProperties: { rowCount: 500, columnCount: 9 },
          },
        },
      ],
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error('Error creating spreadsheet:', errText);
    throw new Error('No se pudo crear la hoja en Google Drive. Verifica permisos.');
  }

  const data = await response.json();
  const spreadsheetId = data.spreadsheetId;
  const spreadsheetUrl = data.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;

  localStorage.setItem(SPREADSHEET_ID_KEY, spreadsheetId);
  localStorage.setItem(SPREADSHEET_URL_KEY, spreadsheetUrl);

  // Set standard headers for the 3 sheets
  await appendRowRaw(spreadsheetId, 'Respuestas_En_Vivo', [
    'Marca Temporal',
    'Documento Aprendiz',
    'Nombre Completo',
    'Programa de Formación',
    'Número de Ficha',
    'Módulo / Actividad',
    'Pregunta o Caso',
    'Respuesta Seleccionada',
    'Calificación / Juicio',
    'Sustento Reglamentario (Acuerdo 2026)',
  ]);

  await appendRowRaw(spreadsheetId, 'Resultados_Evaluaciones', [
    'Fecha Finalización',
    'Documento Aprendiz',
    'Nombre Completo',
    'Programa de Formación',
    'Ficha',
    'Puntaje Obtenido (%)',
    'Aciertos',
    'Incorrectas',
    'Estado Final',
    'Código Constancia Oficial',
  ]);

  await appendRowRaw(spreadsheetId, 'Novedades_Radicadas', [
    'Fecha Radicación',
    'Número Radicado',
    'Documento',
    'Nombre Aprendiz',
    'Programa',
    'Ficha',
    'Tipo de Novedad',
    'Exposición de Motivos',
    'Estado Trámite',
  ]);

  window.dispatchEvent(new CustomEvent('sena-sheets-sync-updated'));
  return { id: spreadsheetId, url: spreadsheetUrl };
};

/**
 * Raw append helper to a specific sheet in the spreadsheet
 */
const appendRowRaw = async (spreadsheetId: string, sheetName: string, rowData: (string | number)[]) => {
  const token = await getAccessToken();
  if (!token) throw new Error('No hay token de acceso disponible.');

  const encodedRange = encodeURIComponent(`${sheetName}!A1`);
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodedRange}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [rowData],
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Error appending to ${sheetName}:`, errorText);
    throw new Error(`Error al sincronizar fila con Google Sheets (${sheetName})`);
  }
};

/**
 * Core processor: tries to sync with Google Sheets immediately.
 * If offline or not authenticated, enqueues the record so it is synced later.
 */
export const dispatchSyncRecord = async (
  sheetName: 'Respuestas_En_Vivo' | 'Resultados_Evaluaciones' | 'Novedades_Radicadas',
  rowValues: (string | number)[],
  meta: {
    tipo: 'respuesta_pregunta' | 'evaluacion_final' | 'novedad_radicada' | 'dilema_etico';
    aprendizNombre: string;
    aprendizDoc: string;
    resumen: string;
  }
): Promise<boolean> => {
  const record: SyncRecord = {
    id: `sync_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toLocaleString('es-CO'),
    sheetName,
    rowValues,
    tipo: meta.tipo,
    aprendizNombre: meta.aprendizNombre,
    aprendizDoc: meta.aprendizDoc,
    resumen: meta.resumen,
    synced: false,
  };

  const token = await getAccessToken();

  if (!token) {
    // Queue locally for later sync
    const queue = getQueue();
    queue.push(record);
    saveQueue(queue);
    addToHistory(record);
    return false;
  }

  try {
    const { id: spreadsheetId } = await createOrGetSpreadsheet();
    await appendRowRaw(spreadsheetId, sheetName, rowValues);
    record.synced = true;
    addToHistory(record);
    return true;
  } catch (error) {
    console.warn('Failed direct sync, saving to offline queue:', error);
    const queue = getQueue();
    queue.push(record);
    saveQueue(queue);
    addToHistory(record);
    return false;
  }
};

/**
 * Synchronize apprentice single answer in real time as they respond
 */
export const syncAnswerInRealTime = async (data: {
  documento: string;
  nombre: string;
  programa: string;
  ficha: string;
  modulo: string;
  pregunta: string;
  respuestaSeleccionada: string;
  esCorrecta: boolean;
  fundamento: string;
}) => {
  const row = [
    new Date().toLocaleString('es-CO'),
    data.documento,
    data.nombre,
    data.programa,
    data.ficha,
    data.modulo,
    data.pregunta,
    data.respuestaSeleccionada,
    data.esCorrecta ? 'CORRECTO (Acierto)' : 'INCORRECTO (Para Refuerzo)',
    data.fundamento,
  ];

  return dispatchSyncRecord('Respuestas_En_Vivo', row, {
    tipo: 'respuesta_pregunta',
    aprendizNombre: data.nombre,
    aprendizDoc: data.documento,
    resumen: `Respuesta a: "${data.pregunta.slice(0, 40)}..." [${data.esCorrecta ? 'Correcta' : 'Incorrecta'}]`,
  });
};

/**
 * Synchronize final evaluation result when completed
 */
export const syncEvaluationFinalResult = async (data: {
  documento: string;
  nombre: string;
  programa: string;
  ficha: string;
  puntaje: number;
  correctas: number;
  incorrectas: number;
  aprobado: boolean;
  codigoCertificado?: string;
}) => {
  const row = [
    new Date().toLocaleString('es-CO'),
    data.documento,
    data.nombre,
    data.programa,
    data.ficha,
    `${data.puntaje}%`,
    data.correctas,
    data.incorrectas,
    data.aprobado ? 'APROBADO (Competente)' : 'NO APROBADO (En Refuerzo)',
    data.codigoCertificado || 'Pendiente de aprobación',
  ];

  return dispatchSyncRecord('Resultados_Evaluaciones', row, {
    tipo: 'evaluacion_final',
    aprendizNombre: data.nombre,
    aprendizDoc: data.documento,
    resumen: `Evaluación Final: ${data.puntaje}% (${data.aprobado ? 'Aprobado' : 'No aprobado'})`,
  });
};

/**
 * Synchronize novelty form submission
 */
export const syncNovedadInRealTime = async (data: {
  radicado: string;
  documento: string;
  nombre: string;
  programa: string;
  ficha: string;
  tipoNovedad: string;
  motivo: string;
}) => {
  const row = [
    new Date().toLocaleString('es-CO'),
    data.radicado,
    data.documento,
    data.nombre,
    data.programa,
    data.ficha,
    data.tipoNovedad,
    data.motivo,
    'Radicado formalmente',
  ];

  return dispatchSyncRecord('Novedades_Radicadas', row, {
    tipo: 'novedad_radicada',
    aprendizNombre: data.nombre,
    aprendizDoc: data.documento,
    resumen: `Novedad Radicada: ${data.tipoNovedad} (Rad. ${data.radicado})`,
  });
};

/**
 * Synchronize dilemma resolution in real time
 */
export const syncDilemaInRealTime = async (data: {
  documento: string;
  nombre: string;
  programa: string;
  ficha: string;
  casoTitulo: string;
  decisionElegida: string;
  esEtica: boolean;
  justificacion: string;
}) => {
  const row = [
    new Date().toLocaleString('es-CO'),
    data.documento,
    data.nombre,
    data.programa,
    data.ficha,
    'Dilemas Éticos y Reglamentarios',
    data.casoTitulo,
    data.decisionElegida,
    data.esEtica ? 'COMPORTAMIENTO ÉTICO' : 'RIESGO REGLAMENTARIO',
    data.justificacion,
  ];

  return dispatchSyncRecord('Respuestas_En_Vivo', row, {
    tipo: 'dilema_etico',
    aprendizNombre: data.nombre,
    aprendizDoc: data.documento,
    resumen: `Dilema Ético: ${data.casoTitulo} [${data.esEtica ? 'Ético' : 'Riesgo'}]`,
  });
};

/**
 * Flushes all pending records in the offline queue once Google authentication is ready
 */
export const flushPendingQueue = async (): Promise<{ syncedCount: number; errors: number }> => {
  const queue = getQueue();
  if (queue.length === 0) return { syncedCount: 0, errors: 0 };

  const token = await getAccessToken();
  if (!token) {
    throw new Error('Inicia sesión con Google para sincronizar los datos pendientes.');
  }

  const { id: spreadsheetId } = await createOrGetSpreadsheet();

  const remaining: SyncRecord[] = [];
  let syncedCount = 0;
  let errors = 0;

  for (const item of queue) {
    try {
      await appendRowRaw(spreadsheetId, item.sheetName, item.rowValues);
      item.synced = true;
      syncedCount++;
      addToHistory(item);
    } catch (e) {
      console.error('Error syncing queued item:', e);
      errors++;
      remaining.push(item);
    }
  }

  saveQueue(remaining);
  window.dispatchEvent(new CustomEvent('sena-sheets-sync-updated'));
  return { syncedCount, errors };
};

/**
 * Get current sync state for UI components
 */
export const getSyncState = (): SheetsSyncState => {
  const history = getHistory();
  const queue = getQueue();
  const spreadsheetId = localStorage.getItem(SPREADSHEET_ID_KEY);
  const spreadsheetUrl = localStorage.getItem(SPREADSHEET_URL_KEY);

  const syncedHistory = history.filter((h) => h.synced);
  const lastSync = syncedHistory[0]?.timestamp || null;

  return {
    spreadsheetId,
    spreadsheetUrl,
    totalSynced: syncedHistory.length,
    pendingCount: queue.length,
    lastSyncTime: lastSync,
    history,
    isSyncing: false,
    error: null,
  };
};

/**
 * Helper compatibility export for previous code
 */
export const syncLearnerData = async (data: any[]) => {
  const row = data;
  return dispatchSyncRecord('Resultados_Evaluaciones', row, {
    tipo: 'evaluacion_final',
    aprendizNombre: (row[2] as string) || 'Aprendiz',
    aprendizDoc: (row[1] as string) || 'Sin documento',
    resumen: `Sincronización evaluación aprendiz ${row[2]}`,
  });
};
