import React, { useState } from 'react';
import { Aprendiz, FichaCaract } from '../types/sena';
import { GoogleSheetsSyncBanner } from './GoogleSheetsSyncBanner';
import { 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Download, 
  UserPlus, 
  Search, 
  Filter, 
  Award, 
  Eye, 
  GraduationCap, 
  FileSpreadsheet, 
  BarChart3, 
  FileText, 
  Check, 
  Sparkles, 
  Info, 
  HelpCircle, 
  ExternalLink, 
  Table,
  Layers,
  Building2,
  FileCheck
} from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface CoordinatorDashboardProps {
  aprendices: Aprendiz[];
  fichas: FichaCaract[];
  onSelectAprendiz: (aprendiz: Aprendiz) => void;
  onOpenNewAprendizModal: () => void;
  onViewCertificateForAprendiz: (aprendiz: Aprendiz) => void;
}

export const CoordinatorDashboard: React.FC<CoordinatorDashboardProps> = ({
  aprendices,
  fichas,
  onSelectAprendiz,
  onOpenNewAprendizModal,
  onViewCertificateForAprendiz
}) => {
  const [selectedFichaId, setSelectedFichaId] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'exportar' | 'tabla'>('exportar');
  const [previewMode, setPreviewMode] = useState<'reporte_lleno' | 'plantilla_vacia'>('reporte_lleno');
  const [exportedNotice, setExportedNotice] = useState<string | null>(null);

  // Filtering
  const filteredAprendices = aprendices.filter((a) => {
    const matchesFicha = selectedFichaId === 'all' || a.fichaId === selectedFichaId;
    const matchesStatus = selectedStatus === 'all' || a.estadoEvaluacion === selectedStatus;
    const matchesSearch = 
      a.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.documento.includes(searchQuery) ||
      a.fichaNumero.includes(searchQuery);

    return matchesFicha && matchesStatus && matchesSearch;
  });

  // Analytics Metrics
  const total = aprendices.length;
  const aprobados = aprendices.filter(a => a.estadoEvaluacion === 'Aprobado').length;
  const reprobados = aprendices.filter(a => a.estadoEvaluacion === 'No aprobado').length;
  const noIniciados = aprendices.filter(a => a.estadoEvaluacion === 'No iniciada').length;
  const completadosInduccion = aprendices.filter(a => a.progresoInduccion === 100).length;

  const tasaAprobacion = total > 0 ? Math.round((aprobados / total) * 100) : 0;
  
  const evaluadosConNota = aprendices.filter(a => a.calificacionEvaluacion !== undefined);
  const promedioGeneral = evaluadosConNota.length > 0
    ? Math.round(evaluadosConNota.reduce((acc, curr) => acc + (curr.calificacionEvaluacion || 0), 0) / evaluadosConNota.length)
    : 0;

  // Defined Columns for Export
  const EXCEL_COLUMNS = [
    { letter: 'A', title: 'ID_APRENDIZ' },
    { letter: 'B', title: 'TIPO_DOCUMENTO' },
    { letter: 'C', title: 'NUMERO_DOCUMENTO' },
    { letter: 'D', title: 'NOMBRES_Y_APELLIDOS' },
    { letter: 'E', title: 'CORREO_INSTITUCIONAL' },
    { letter: 'F', title: 'TELEFONO_CONTACTO' },
    { letter: 'G', title: 'NUMERO_FICHA' },
    { letter: 'H', title: 'PROGRAMA_FORMACION' },
    { letter: 'I', title: 'REGIONAL_SENA' },
    { letter: 'J', title: 'CENTRO_FORMACION' },
    { letter: 'K', title: 'JORNADA' },
    { letter: 'L', title: 'PROGRESO_INDUCCION' },
    { letter: 'M', title: 'MODULOS_COMPLETADOS' },
    { letter: 'N', title: 'ESTADO_EVALUACION' },
    { letter: 'O', title: 'CALIFICACION' },
    { letter: 'P', title: 'FECHA_COMPLETADO' },
    { letter: 'Q', title: 'CODIGO_CERTIFICADO' },
    { letter: 'R', title: 'FECHA_REPORTE' }
  ];

  // Sample row for Plantilla Vacía
  const SAMPLE_TEMPLATE_ROWS = [
    {
      id: 'APR_EJEMPLO_01',
      tipoDocumento: 'CC',
      documento: '1020491823',
      nombre: 'Perez Gomez Juan Carlos (EJEMPLO)',
      correo: 'jc.perez@soy.sena.edu.co',
      telefono: '3101234567',
      fichaNumero: '2824901',
      programaFormacion: 'Análisis y Desarrollo de Software (ADSO)',
      regional: 'Regional Distrito Capital',
      centroFormacion: 'Centro de Electricidad, Electrónica y Telecomunicaciones',
      jornada: 'Diurna',
      progresoInduccion: 100,
      modulosCompletados: ['identidad', 'derechos_deberes', 'evaluacion'],
      estadoEvaluacion: 'Aprobado',
      calificacionEvaluacion: 100,
      fechaCompletado: new Date().toLocaleDateString('es-CO'),
      codigoCertificado: 'SENA-REG-2026-91823A'
    },
    {
      id: 'APR_VACIO_02',
      tipoDocumento: 'TI',
      documento: '1033910283',
      nombre: '[INGRESE NOMBRE COMPLETO APRENDIZ]',
      correo: '[CORREO@SOY.SENA.EDU.CO]',
      telefono: '[TELEFONO]',
      fichaNumero: '2824901',
      programaFormacion: '[NOMBRE DEL PROGRAMA]',
      regional: 'Regional Distrito Capital',
      centroFormacion: 'Centro de Formación SENA',
      jornada: 'Diurna',
      progresoInduccion: 0,
      modulosCompletados: [],
      estadoEvaluacion: 'No iniciada',
      calificacionEvaluacion: undefined,
      fechaCompletado: 'Pendiente',
      codigoCertificado: 'Pendiente'
    }
  ];

  // Trigger download helper for blob files
  const downloadBlob = (filename: string, content: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  /**
   * Generates a FULLY STYLED Excel File (.xls / .xlsx format)
   * Microsoft Excel opens this natively with exact SENA Banner, Verde SENA Table Header (#39A900),
   * zebra row striping, borders, status color badges, and column formatting!
   */
  const handleExportStyledExcel = (isTemplateOnly = false) => {
    const nowStr = new Date().toLocaleDateString('es-CO');
    const recordsToExport = isTemplateOnly ? SAMPLE_TEMPLATE_ROWS : filteredAprendices;

    // Excel HTML XML Markup
    const excelHtml = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="utf-8" />
        <!--[if gte mso 9]>
        <xml>
          <x:ExcelWorkbook>
            <x:ExcelWorksheets>
              <x:ExcelWorksheet>
                <x:Name>${isTemplateOnly ? 'Plantilla_Vacia_SENA' : 'Induccion_SENA_Acuerdo_2026'}</x:Name>
                <x:WorksheetOptions>
                  <x:DisplayGridlines/>
                </x:WorksheetOptions>
              </x:ExcelWorksheet>
            </x:ExcelWorksheets>
          </x:ExcelWorkbook>
        </xml>
        <![endif]-->
        <style>
          table { border-collapse: collapse; font-family: Calibri, Arial, sans-serif; font-size: 10pt; }
          .banner-title { background-color: #00324D; color: #FFFFFF; font-size: 14pt; font-weight: bold; text-align: left; padding: 12px; }
          .banner-sub { background-color: #00476E; color: #E2E8F0; font-size: 10pt; font-weight: font-medium; padding: 6px; }
          .header-green { background-color: #39A900; color: #FFFFFF; font-size: 11pt; font-weight: bold; text-align: center; border: 1px solid #2e8800; padding: 8px; }
          .cell { border: 1px solid #CCCCCC; padding: 6px; vertical-align: middle; }
          .cell-center { border: 1px solid #CCCCCC; padding: 6px; text-align: center; vertical-align: middle; }
          .cell-bold { border: 1px solid #CCCCCC; padding: 6px; font-weight: bold; vertical-align: middle; }
          .row-even { background-color: #FFFFFF; }
          .row-odd { background-color: #F0FDF4; }
          .badge-aprobado { background-color: #39A900; color: #FFFFFF; font-weight: bold; text-align: center; padding: 4px 8px; border-radius: 4px; }
          .badge-refuerzo { background-color: #E11D48; color: #FFFFFF; font-weight: bold; text-align: center; padding: 4px 8px; border-radius: 4px; }
          .badge-pendiente { background-color: #64748B; color: #FFFFFF; font-weight: bold; text-align: center; padding: 4px 8px; border-radius: 4px; }
        </style>
      </head>
      <body>
        <table>
          <!-- Row 1: SENA Banner Title -->
          <tr>
            <th colspan="18" class="banner-title">
              SERVICIO NACIONAL DE APRENDIZAJE - SENA | ${isTemplateOnly ? 'PLANTILLA VACÍA DE CARGA DE APRENDICES' : 'REPORTE OFICIAL DE INDUCCIÓN DE APRENDICES (ACUERDO 2026)'}
            </th>
          </tr>
          <!-- Row 2: SENA Banner Subtitle -->
          <tr>
            <td colspan="18" class="banner-sub">
              FECHA DE EMISIÓN: ${nowStr} | TOTAL REGISTROS: ${recordsToExport.length} | NORMATIVA: REGLAMENTO DEL APRENDIZ ACUERDO 2026
            </td>
          </tr>
          <!-- Row 3: Blank Separator -->
          <tr><td colspan="18"></td></tr>

          <!-- Row 4: UNIFIED GREEN TABLE HEADER ROW (#39A900) -->
          <tr>
            ${EXCEL_COLUMNS.map(c => `<th class="header-green">${c.title}</th>`).join('')}
          </tr>

          <!-- Data Rows with Zebra Striping and Cell Formatting -->
          ${recordsToExport.map((a, idx) => {
            const rowClass = idx % 2 === 0 ? 'row-even' : 'row-odd';
            const isPassed = a.estadoEvaluacion === 'Aprobado';
            const isFailed = a.estadoEvaluacion === 'No aprobado';
            
            return `
              <tr class="${rowClass}">
                <td class="cell-bold" style="color: #39A900;">${a.id}</td>
                <td class="cell-center">${a.tipoDocumento}</td>
                <td class="cell-bold">${a.documento}</td>
                <td class="cell-bold">${a.nombre}</td>
                <td class="cell" style="color: #475569;">${a.correo}</td>
                <td class="cell">${a.telefono}</td>
                <td class="cell-bold" style="color: #00324D;">${a.fichaNumero}</td>
                <td class="cell">${a.programaFormacion}</td>
                <td class="cell">${a.regional}</td>
                <td class="cell">${a.centroFormacion}</td>
                <td class="cell">${a.jornada}</td>
                <td class="cell-center" style="font-weight: bold; color: #39A900;">${a.progresoInduccion}%</td>
                <td class="cell" style="color: #64748B;">${Array.isArray(a.modulosCompletados) ? a.modulosCompletados.join('; ') : 'Ninguno'}</td>
                <td class="cell-center">
                  <span class="${isPassed ? 'badge-aprobado' : isFailed ? 'badge-refuerzo' : 'badge-pendiente'}">
                    ${a.estadoEvaluacion}
                  </span>
                </td>
                <td class="cell-center" style="font-weight: bold;">${a.calificacionEvaluacion !== undefined ? `${a.calificacionEvaluacion}%` : 'N/A'}</td>
                <td class="cell-center">${a.fechaCompletado || 'Pendiente'}</td>
                <td class="cell-bold" style="color: #059669; font-family: monospace;">${a.codigoCertificado || 'N/A'}</td>
                <td class="cell-center" style="color: #94A3B8;">${nowStr}</td>
              </tr>
            `;
          }).join('')}
        </table>
      </body>
      </html>
    `;

    const fileName = isTemplateOnly 
      ? `Plantilla_Excel_Vacia_SENA_${nowStr.replace(/\//g, '-')}.xls`
      : `Reporte_Induccion_SENA_Acuerdo_2026_${nowStr.replace(/\//g, '-')}.xls`;

    downloadBlob(fileName, '\uFEFF' + excelHtml, 'application/vnd.ms-excel;charset=utf-8');

    setExportedNotice(`¡Se ha descargado el archivo Excel estilizaciones (.xls) con la cabecera verde #39A900 y logo exactamente como se ve en la pantalla!`);
    setTimeout(() => setExportedNotice(null), 6000);
  };

  // Export Plain CSV for Legacy Data Import
  const handleExportCSVPlain = () => {
    const nowStr = new Date().toLocaleDateString('es-CO');
    const rows = filteredAprendices.map(a => [
      a.id,
      a.tipoDocumento,
      a.documento,
      `"${a.nombre.replace(/"/g, '""')}"`,
      `"${a.correo}"`,
      a.telefono,
      a.fichaNumero,
      `"${a.programaFormacion.replace(/"/g, '""')}"`,
      `"${a.regional.replace(/"/g, '""')}"`,
      `"${a.centroFormacion.replace(/"/g, '""')}"`,
      a.jornada,
      `${a.progresoInduccion}%`,
      `"${a.modulosCompletados.join('; ')}"`,
      a.estadoEvaluacion,
      a.calificacionEvaluacion !== undefined ? `${a.calificacionEvaluacion}%` : 'N/A',
      a.fechaCompletado || 'Pendiente',
      a.codigoCertificado || 'N/A',
      nowStr
    ]);

    const csvContent = [
      `"SERVICIO NACIONAL DE APRENDIZAJE - SENA"`,
      `"REPORTE DE INDUCCIÓN DE APRENDICES - ACUERDO 2026"`,
      `""`,
      EXCEL_COLUMNS.map(c => c.title).join(';'), 
      ...rows.map(r => r.join(';'))
    ].join('\n');

    downloadBlob(`Reporte_Induccion_SENA_${new Date().toISOString().slice(0, 10)}.csv`, '\uFEFF' + csvContent, 'text/csv;charset=utf-8;');
    setExportedNotice('¡Reporte CSV estandarizado descargado!');
    setTimeout(() => setExportedNotice(null), 4000);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Coordinator Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4 max-w-3xl">
            <div className="w-12 h-12 p-1.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center shrink-0 mt-1">
              <SenaLogo className="w-9 h-9" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#39A900] mb-1">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Portal de Coordinación Académica e Instructores</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Gestión del Proceso de Inducción de Aprendices
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Supervisa el avance por ficha, visualiza y descarga el archivo Excel estilizado exactamente como se muestra en pantalla (encabezado verde #39A900, logo y colores).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleExportStyledExcel(false)}
              className="px-4 py-2 bg-[#39A900] text-white hover:bg-[#329600] rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Descargar Excel Estilizado</span>
            </button>
          </div>
        </div>

        {/* Aggregate KPI Strip */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-100 dark:border-slate-800 pt-6">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-1">
              <span>Total Matriculados</span>
              <Users className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">
              {total} <span className="text-xs font-normal text-slate-500">aprendices</span>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-1">
              <span>Inducción Completada</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400 tabular-nums">
              {completadosInduccion} <span className="text-xs font-normal text-slate-500">({total > 0 ? Math.round((completadosInduccion/total)*100) : 0}%)</span>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-1">
              <span>Tasa de Aprobación</span>
              <BarChart3 className="w-4 h-4 text-[#39A900]" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">
              {tasaAprobacion}% <span className="text-xs font-normal text-slate-500">({aprobados} aptos)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Google Drive & Sheets Sync Component */}
      <GoogleSheetsSyncBanner />

      {/* Section Navigation Tabs */}
      <div className="bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-2">
        <button
          onClick={() => setActiveTab('exportar')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'exportar'
              ? 'bg-[#39A900] text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Vista Previa y Descarga de Excel</span>
        </button>

        <button
          onClick={() => setActiveTab('tabla')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'tabla'
              ? 'bg-[#39A900] text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Listado de Aprendices ({filteredAprendices.length})</span>
        </button>
      </div>

      {/* Tab: Interactive Excel Spreadsheet Preview with Green Header */}
      {activeTab === 'exportar' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6 animate-fadeIn">

          {exportedNotice && (
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 flex items-center gap-2 animate-fadeIn">
              <Check className="w-5 h-5 text-[#39A900] shrink-0" />
              <span className="font-bold">{exportedNotice}</span>
            </div>
          )}



          {/* REAL EXCEL SPREADSHEET GRID PREVIEW WITH SENA INSTITUTIONAL GREEN HEADER */}
          <div className="border-2 border-[#39A900] rounded-2xl overflow-hidden shadow-lg bg-slate-100 dark:bg-slate-950">
            
            {/* OFFICIAL INSTITUTIONAL LOGO HEADER INSIDE SPREADSHEET */}
            <div className="bg-gradient-to-r from-[#00324D] via-[#00476e] to-[#39A900] text-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-4 border-[#39A900]">
              <div className="flex items-center gap-3.5">
                <div className="p-2 bg-white rounded-2xl shadow-md shrink-0">
                  <SenaLogo className="w-10 h-10" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest block">
                    Servicio Nacional de Aprendizaje · SENA Colombia
                  </span>
                  <h3 className="text-base sm:text-lg font-black tracking-tight text-white">
                    {previewMode === 'plantilla_vacia' 
                      ? 'PLANTILLA VACÍA DE CARGA DE APRENDICES (FORMATO VERDE #39A900)' 
                      : 'REPORTE OFICIAL DE INDUCCIÓN DE APRENDICES (ACUERDO 2026)'}
                  </h3>
                  <p className="text-[11px] text-emerald-100 font-medium">
                    Sistema de Gestión de la Formación Profesional Integral · Control e Historial de Competencias
                  </p>
                </div>
              </div>

              <div className="text-left sm:text-right text-[11px] space-y-0.5 bg-black/20 p-2.5 rounded-xl border border-white/10 shrink-0 font-mono">
                <div><span className="text-emerald-300 font-bold">FECHA EMISIÓN:</span> {new Date().toLocaleDateString('es-CO')}</div>
                <div><span className="text-emerald-300 font-bold">MODO:</span> {previewMode === 'plantilla_vacia' ? 'PLANTILLA ESTRUCTURADA' : 'REPORTE COMPLETO'}</div>
                <div><span className="text-emerald-300 font-bold">ENCABEZADO:</span> Verde SENA #39A900</div>
              </div>
            </div>

            {/* Excel Title Bar */}
            <div className="bg-[#107C41] text-white p-2 px-4 flex items-center justify-between text-xs font-bold border-t border-emerald-500">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4" />
                <span>Microsoft Excel / Google Sheets · {previewMode === 'plantilla_vacia' ? 'Plantilla_Excel_Vacia_SENA.xls' : 'Reporte_Induccion_SENA_Acuerdo_2026.xls'}</span>
              </div>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-mono">
                {previewMode === 'plantilla_vacia' ? '2 filas' : `${filteredAprendices.length + 1} filas`} × 18 columnas
              </span>
            </div>

            {/* Excel Formula / Range Bar */}
            <div className="bg-slate-200 dark:bg-slate-800 border-b border-slate-300 dark:border-slate-700 px-3 py-1.5 flex items-center gap-3 text-xs font-mono text-slate-600 dark:text-slate-300">
              <span className="bg-white dark:bg-slate-900 border px-2 py-0.5 rounded font-bold text-[#107C41]">A1:R{previewMode === 'plantilla_vacia' ? 3 : filteredAprendices.length + 1}</span>
              <span className="text-slate-400">ƒx</span>
              <span className="text-slate-800 dark:text-slate-200 truncate font-bold text-[#39A900]">
                =FORMATO_OFICIAL_SENA(ACUERDO_2026; ENCABEZADO_COLOR_VERDE_39A900; DESCARGA_ESTILIZADA)
              </span>
            </div>

            {/* Excel Grid Table with Row Numbers, Column Letters, and UNIFIED GREEN SENA TABLE HEADER (#39A900) */}
            <div className="overflow-x-auto max-h-[550px] overflow-y-auto">
              <table className="w-full text-left text-xs font-mono border-collapse min-w-[1450px]">
                <thead>
                  {/* Column Letter Header Row (A, B, C...) */}
                  <tr className="bg-slate-200 dark:bg-slate-800 text-slate-500 font-bold border-b border-slate-300 dark:border-slate-700 text-center text-[10px]">
                    <th className="w-10 p-1 border-r border-slate-300 dark:border-slate-700 bg-slate-300 dark:bg-slate-900">#</th>
                    {EXCEL_COLUMNS.map((col) => (
                      <th key={col.letter} className="p-1 border-r border-slate-300 dark:border-slate-700 font-bold">
                        {col.letter}
                      </th>
                    ))}
                  </tr>

                  {/* UNIFIED INSTITUTIONAL GREEN TABLE HEADER ROW (#39A900) */}
                  <tr className="bg-[#39A900] text-white font-extrabold border-b-2 border-emerald-800 text-xs shadow-xs">
                    <td className="p-2.5 text-center bg-[#2e8800] font-mono border-r border-white/30 text-white">1</td>
                    {EXCEL_COLUMNS.map((col) => (
                      <td key={col.title} className="p-2.5 border-r border-white/30 whitespace-nowrap bg-[#39A900] text-white font-extrabold uppercase tracking-wide">
                        {col.title}
                      </td>
                    ))}
                  </tr>
                </thead>

                <tbody className="text-slate-800 dark:text-slate-200 divide-y divide-slate-200 dark:divide-slate-800">
                  {previewMode === 'plantilla_vacia' ? (
                    /* PLANTILLA VACÍA PREVIEW ROWS */
                    SAMPLE_TEMPLATE_ROWS.map((a, idx) => (
                      <tr key={a.id} className={idx === 0 ? 'bg-emerald-50/70 dark:bg-slate-800/80 font-semibold' : 'bg-white dark:bg-slate-900'}>
                        <td className="p-2 text-center font-bold bg-slate-100 dark:bg-slate-800 border-r border-slate-300 dark:border-slate-700 text-slate-500 text-[11px]">{idx + 2}</td>
                        <td className="p-2 border-r border-slate-200 dark:border-slate-800 whitespace-nowrap text-emerald-800 font-bold">{a.id}</td>
                        <td className="p-2 border-r border-slate-200 dark:border-slate-800 whitespace-nowrap text-center">{a.tipoDocumento}</td>
                        <td className="p-2 border-r border-slate-200 dark:border-slate-800 whitespace-nowrap font-bold">{a.documento}</td>
                        <td className="p-2 border-r border-slate-200 dark:border-slate-800 whitespace-nowrap font-sans font-bold text-slate-900 dark:text-white">{a.nombre}</td>
                        <td className="p-2 border-r border-slate-200 dark:border-slate-800 whitespace-nowrap text-slate-500">{a.correo}</td>
                        <td className="p-2 border-r border-slate-200 dark:border-slate-800 whitespace-nowrap">{a.telefono}</td>
                        <td className="p-2 border-r border-slate-200 dark:border-slate-800 whitespace-nowrap font-bold text-[#39A900]">Ficha {a.fichaNumero}</td>
                        <td className="p-2 border-r border-slate-200 dark:border-slate-800 whitespace-nowrap font-sans">{a.programaFormacion}</td>
                        <td className="p-2 border-r border-slate-200 dark:border-slate-800 whitespace-nowrap font-sans text-slate-500">{a.regional}</td>
                        <td className="p-2 border-r border-slate-200 dark:border-slate-800 whitespace-nowrap font-sans text-slate-500">{a.centroFormacion}</td>
                        <td className="p-2 border-r border-slate-200 dark:border-slate-800 whitespace-nowrap">{a.jornada}</td>
                        <td className="p-2 border-r border-slate-200 dark:border-slate-800 whitespace-nowrap font-bold text-[#39A900]">{a.progresoInduccion}%</td>
                        <td className="p-2 border-r border-slate-200 dark:border-slate-800 whitespace-nowrap text-slate-400">{a.modulosCompletados.join('; ') || 'Ninguno'}</td>
                        <td className="p-2 border-r border-slate-200 dark:border-slate-800 whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${a.estadoEvaluacion === 'Aprobado' ? 'bg-[#39A900] text-white' : 'bg-slate-200 text-slate-600'}`}>
                            {a.estadoEvaluacion}
                          </span>
                        </td>
                        <td className="p-2 border-r border-slate-200 dark:border-slate-800 whitespace-nowrap font-bold">{a.calificacionEvaluacion !== undefined ? `${a.calificacionEvaluacion}%` : 'N/A'}</td>
                        <td className="p-2 border-r border-slate-200 dark:border-slate-800 whitespace-nowrap text-slate-500">{a.fechaCompletado}</td>
                        <td className="p-2 border-r border-slate-200 dark:border-slate-800 whitespace-nowrap font-mono text-emerald-700 font-bold">{a.codigoCertificado}</td>
                        <td className="p-2 border-r border-slate-200 dark:border-slate-800 whitespace-nowrap text-slate-400">{new Date().toLocaleDateString('es-CO')}</td>
                      </tr>
                    ))
                  ) : (
                    /* REPORTE CON DATOS FILTRADOS PREVIEW ROWS */
                    filteredAprendices.map((a, idx) => {
                      const isEvenRow = idx % 2 === 0;
                      const rowBgClass = isEvenRow 
                        ? 'bg-white dark:bg-slate-900' 
                        : 'bg-emerald-50/40 dark:bg-slate-800/60';

                      return (
                        <tr key={a.id} className={`${rowBgClass} hover:bg-emerald-100/60 dark:hover:bg-slate-700/80 transition-colors`}>
                          <td className="p-2 text-center font-bold bg-slate-100 dark:bg-slate-800 border-r border-slate-300 dark:border-slate-700 text-slate-500 text-[11px]">{idx + 2}</td>
                          <td className="p-2 border-r border-slate-200 dark:border-slate-800 whitespace-nowrap text-emerald-800 dark:text-emerald-300 font-bold">{a.id}</td>
                          <td className="p-2 border-r border-slate-200 dark:border-slate-800 whitespace-nowrap text-center font-bold">{a.tipoDocumento}</td>
                          <td className="p-2 border-r border-slate-200 dark:border-slate-800 whitespace-nowrap font-bold text-slate-900 dark:text-white">{a.documento}</td>
                          <td className="p-2 border-r border-slate-200 dark:border-slate-800 whitespace-nowrap font-sans font-extrabold text-slate-900 dark:text-white">{a.nombre}</td>
                          <td className="p-2 border-r border-slate-200 dark:border-slate-800 whitespace-nowrap text-slate-500">{a.correo}</td>
                          <td className="p-2 border-r border-slate-200 dark:border-slate-800 whitespace-nowrap">{a.telefono}</td>
                          <td className="p-2 border-r border-slate-200 dark:border-slate-800 whitespace-nowrap font-bold text-[#00324D] dark:text-emerald-400 bg-emerald-50/30">Ficha {a.fichaNumero}</td>
                          <td className="p-2 border-r border-slate-200 dark:border-slate-800 whitespace-nowrap font-sans truncate max-w-xs">{a.programaFormacion}</td>
                          <td className="p-2 border-r border-slate-200 dark:border-slate-800 whitespace-nowrap font-sans text-slate-600 dark:text-slate-400">{a.regional}</td>
                          <td className="p-2 border-r border-slate-200 dark:border-slate-800 whitespace-nowrap font-sans truncate max-w-xs text-slate-600 dark:text-slate-400">{a.centroFormacion}</td>
                          <td className="p-2 border-r border-slate-200 dark:border-slate-800 whitespace-nowrap font-semibold">{a.jornada}</td>
                          <td className="p-2 border-r border-slate-200 dark:border-slate-800 whitespace-nowrap">
                            <div className="flex items-center gap-1.5">
                              <div className="w-12 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden shrink-0">
                                <div className="h-full bg-[#39A900]" style={{ width: `${a.progresoInduccion}%` }} />
                              </div>
                              <span className="font-bold text-[#39A900] text-[11px]">{a.progresoInduccion}%</span>
                            </div>
                          </td>
                          <td className="p-2 border-r border-slate-200 dark:border-slate-800 whitespace-nowrap text-[10px] text-slate-500 truncate max-w-xs">{a.modulosCompletados.join('; ')}</td>
                          <td className="p-2 border-r border-slate-200 dark:border-slate-800 whitespace-nowrap text-center">
                            <span className={`px-2.5 py-1 rounded-md font-extrabold text-[10px] inline-flex items-center gap-1 ${
                              a.estadoEvaluacion === 'Aprobado' 
                                ? 'bg-[#39A900] text-white shadow-xs' 
                                : a.estadoEvaluacion === 'No aprobado' 
                                ? 'bg-rose-600 text-white shadow-xs' 
                                : 'bg-slate-200 text-slate-700'
                            }`}>
                              {a.estadoEvaluacion === 'Aprobado' ? '✓ APROBADO' : a.estadoEvaluacion === 'No aprobado' ? '✕ REFUERZO' : '⏱ PENDIENTE'}
                            </span>
                          </td>
                          <td className="p-2 border-r border-slate-200 dark:border-slate-800 whitespace-nowrap font-bold text-center">
                            {a.calificacionEvaluacion !== undefined ? `${a.calificacionEvaluacion}%` : 'N/A'}
                          </td>
                          <td className="p-2 border-r border-slate-200 dark:border-slate-800 whitespace-nowrap text-slate-600">{a.fechaCompletado || 'Pendiente'}</td>
                          <td className="p-2 border-r border-slate-200 dark:border-slate-800 whitespace-nowrap font-mono text-[11px] font-bold text-emerald-700 dark:text-emerald-400">{a.codigoCertificado || 'N/A'}</td>
                          <td className="p-2 border-r border-slate-200 dark:border-slate-800 whitespace-nowrap text-slate-400 text-[10px]">{new Date().toLocaleDateString('es-CO')}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Excel Sheet Tabs Status Footer */}
            <div className="bg-slate-200 dark:bg-slate-800 p-2 px-3 border-t border-slate-300 dark:border-slate-700 flex items-center justify-between text-[11px] font-sans">
              <div className="flex items-center gap-1">
                <span className="px-3 py-1 bg-white dark:bg-slate-900 border-t-2 border-[#39A900] font-bold text-[#39A900] dark:text-emerald-400 rounded-t shadow-xs">
                  📋 Hoja1_Plantilla_Verde_SENA (#39A900)
                </span>
                <span className="px-3 py-1 text-slate-500 hover:bg-slate-300/50 rounded-t">
                  📊 Hoja2_Formatos
                </span>
              </div>
              <div className="text-slate-600 dark:text-slate-300 font-mono font-bold">
                {previewMode === 'plantilla_vacia' ? 'Plantilla Vacía Estructurada' : `${filteredAprendices.length} aprendices en reporte`}
              </div>
            </div>
          </div>

          {/* Download Buttons Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-[#39A900]" />
                Descargas Oficiales Estilizadas para Microsoft Excel
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                El archivo descargado se abrirá en Excel exactamente como se visualiza arriba: con encabezado institucional, cabeceras verdes (#39A900) y celdas de colores.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={() => handleExportStyledExcel(true)}
                className="px-4 py-2.5 rounded-xl border-2 border-[#39A900] bg-white dark:bg-slate-800 text-[#39A900] dark:text-emerald-300 text-xs font-bold hover:bg-emerald-100 transition flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Download className="w-4 h-4 text-[#39A900]" />
                <span>Descargar Plantilla Vacía (.xls)</span>
              </button>

              <button
                onClick={() => handleExportStyledExcel(false)}
                className="px-5 py-2.5 rounded-xl bg-[#39A900] text-white hover:bg-[#329600] text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-md"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Descargar Excel Estilizado (.xls)</span>
              </button>

              <button
                onClick={handleExportCSVPlain}
                className="px-3 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 text-xs font-semibold transition cursor-pointer"
                title="Descargar también en formato CSV plano"
              >
                <span>Descargar CSV</span>
              </button>
            </div>
          </div>

        </div>
      )}

      {/* Tab 2: Filter and Table Section */}
      {activeTab === 'tabla' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs animate-fadeIn">
          
          {/* Table Controls */}
          <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                placeholder="Buscar por nombre, documento o ficha..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900] bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Filter className="w-3.5 h-3.5" />
                <span>Ficha:</span>
              </div>
              <select
                value={selectedFichaId}
                onChange={(e) => setSelectedFichaId(e.target.value)}
                className="text-xs font-semibold px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
              >
                <option value="all">Todas las fichas</option>
                {fichas.map(f => (
                  <option key={f.id} value={f.id}>
                    Ficha {f.numero} - {f.programa.slice(0, 22)}...
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-1.5 text-xs text-slate-500 ml-2">
                <span>Estado:</span>
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="text-xs font-semibold px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
              >
                <option value="all">Todos los estados</option>
                <option value="Aprobado">Aprobado</option>
                <option value="No aprobado">No aprobado (Refuerzo)</option>
                <option value="No iniciada">No iniciada</option>
              </select>

              <button
                onClick={() => handleExportStyledExcel(false)}
                className="px-3.5 py-1.5 rounded-xl bg-[#39A900] text-white hover:bg-[#329600] text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ml-auto shadow-xs"
                title="Exportar aprendices filtrados en Excel Estilizado"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Excel</span>
              </button>
            </div>
          </div>

          {/* Table of apprentices */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#39A900] text-white font-bold border-b border-emerald-800">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Aprendiz</th>
                  <th className="py-3.5 px-4">Documento</th>
                  <th className="py-3.5 px-4">Ficha / Programa</th>
                  <th className="py-3.5 px-4">Progreso Inducción</th>
                  <th className="py-3.5 px-4">Evaluación</th>
                  <th className="py-3.5 px-4 text-right">Acciones</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredAprendices.map((a) => {
                  const isPassed = a.estadoEvaluacion === 'Aprobado';
                  const isFailed = a.estadoEvaluacion === 'No aprobado';

                  return (
                    <tr key={a.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors">
                      {/* Name */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="font-bold text-slate-900 dark:text-white">{a.nombre}</div>
                        <div className="text-xs text-slate-400">{a.correo}</div>
                      </td>

                      {/* Document */}
                      <td className="py-4 px-4 font-mono text-xs text-slate-700 dark:text-slate-300">
                        {a.tipoDocumento} {a.documento}
                      </td>

                      {/* Ficha & Program */}
                      <td className="py-4 px-4">
                        <span className="font-semibold text-slate-900 dark:text-white">Ficha {a.fichaNumero}</span>
                        <span className="block text-xs text-slate-500 dark:text-slate-400 truncate max-w-xs">{a.programaFormacion}</span>
                      </td>

                      {/* Progress */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[#39A900] transition-all"
                              style={{ width: `${a.progresoInduccion}%` }}
                            />
                          </div>
                          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 tabular-nums">
                            {a.progresoInduccion}%
                          </span>
                        </div>
                      </td>

                      {/* Evaluation status */}
                      <td className="py-4 px-4">
                        {isPassed ? (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-white bg-[#39A900] px-2.5 py-1 rounded-lg shadow-xs">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Aprobado ({a.calificacionEvaluacion}%)</span>
                          </span>
                        ) : isFailed ? (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-800 dark:text-rose-300 bg-rose-50 dark:bg-rose-950 px-2 py-0.5 rounded-lg border border-rose-200 dark:border-rose-900">
                            <AlertCircle className="w-3 h-3 text-rose-600" />
                            <span>Refuerzo ({a.calificacionEvaluacion}%)</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-lg">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>Pendiente</span>
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right">
                        <div className="inline-flex items-center gap-2 justify-end">
                          <button
                            onClick={() => onSelectAprendiz(a)}
                            className="px-2.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                            title="Simular vista como este aprendiz"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Ver</span>
                          </button>

                          {isPassed && (
                            <button
                              onClick={() => onViewCertificateForAprendiz(a)}
                              className="px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 hover:bg-emerald-100 dark:hover:bg-emerald-900 border border-emerald-200 dark:border-emerald-800 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                              title="Ver constancia oficial de inducción"
                            >
                              <Award className="w-3.5 h-3.5 text-[#39A900]" />
                              <span>Constancia</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredAprendices.length === 0 && (
            <div className="text-center py-12 p-6 text-slate-500">
              No se encontraron aprendices con los filtros seleccionados.
            </div>
          )}

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Mostrando {filteredAprendices.length} de {aprendices.length} aprendices registrados</span>
            <span>SENA · Reglamento del Aprendiz Vigente (Acuerdo 2026)</span>
          </div>
        </div>
      )}

    </div>
  );
};
