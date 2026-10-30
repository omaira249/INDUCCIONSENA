export type InductionModuleId = 
  | 'identidad'
  | 'derechos_deberes'
  | 'casos_practicos'
  | 'evaluacion'
  | 'gestion';

export type UserRole = 'aprendiz' | 'coordinador';

export interface Aprendiz {
  id: string;
  nombre: string;
  documento: string;
  tipoDocumento: 'CC' | 'TI' | 'CE' | 'PEP';
  correo: string;
  telefono: string;
  fichaId: string;
  fichaNumero: string;
  programaFormacion: string;
  regional: string;
  centroFormacion: string;
  jornada: 'Diurna' | 'Nocturna' | 'Mixta' | 'Virtual';
  progresoInduccion: number; // 0 - 100
  modulosCompletados: string[];
  estadoEvaluacion: 'No iniciada' | 'En proceso' | 'Aprobado' | 'No aprobado';
  calificacionEvaluacion?: number; // 0 - 100
  fechaCompletado?: string;
  codigoCertificado?: string;
}

export interface FichaCaract {
  id: string;
  numero: string;
  programa: string;
  nivel: 'Tecnólogo' | 'Técnico' | 'Operario' | 'Especialización Tecnológica';
  centro: string;
  regional: string;
  instructorLider: string;
  totalAprendices: number;
}

export interface SimboloSena {
  id: string;
  nombre: string;
  subtitulo: string;
  descripcion: string;
  significadoDetallado: string[];
  detalles: {
    icono: string;
    titulo: string;
    texto: string;
  }[];
}

export interface ValorInstitucional {
  id: string;
  nombre: string;
  lema: string;
  descripcion: string;
  aplicacionCotidiana: string;
}

export interface NormaReglamento {
  id: string;
  tipo: 'derecho' | 'deber' | 'prohibicion';
  capitulo: string;
  articulo: string;
  titulo: string;
  descripcion: string;
  ejemploContexto: string;
  categoria: 'Academico' | 'Disciplinario' | 'Bienestar' | 'Uso de Instalaciones';
}

export interface TramiteNovedad {
  id: string;
  nombre: string;
  definicion: string;
  requisitos: string[];
  plazoYCondiciones: string;
  impactoAcademico: string;
}

export interface TipoEvidencia {
  id: string;
  tipo: 'Conocimiento' | 'Desempeño' | 'Producto';
  definicion: string;
  ejemplosPracticos: string[];
  instrumentoEvaluacion: string;
}

export interface CausalDesercion {
  id: string;
  causal: string;
  condicionNormativa: string;
  procedimientoPrevio: string;
  efectoLegal: string;
}

export interface RepresentatividadInfo {
  rol: 'Vocero de Ficha' | 'Representante de Centro';
  periodo: string;
  requisitosPostulacion: string[];
  responsabilidadesClave: string[];
  causalesRevocatoria: string[];
}

export interface ItemComparativoAcuerdo {
  tema: string;
  acuerdo007_2012: string; // Derogado
  acuerdo2026: string; // Vigente 2026
  mejoraOModificacion: string;
  icono?: string;
}



export interface CasoDilema {
  id: string;
  titulo: string;
  contexto: string;
  situacion: string;
  opciones: {
    id: string;
    texto: string;
    esCorrecta: boolean;
    retroalimentacion: string;
    normaAsociada: string;
  }[];
}

export interface ComponenteFPI {
  id: string;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  principiosClave: string[];
  enfoque: string;
  icono: string;
}

export interface FaseProyectoFormativo {
  fase: 'Análisis' | 'Planeación' | 'Ejecución' | 'Evaluación';
  numero: number;
  objetivo: string;
  actividadesAprendiz: string[];
  entregablesComunes: string[];
  rolInstructor: string;
  color: string;
}

export interface EjeBienestar {
  id: string;
  nombre: string;
  lema: string;
  descripcion: string;
  programasYBeneficios: string[];
  comoAcceder: string;
  icono: string;
  contactoOCentro: string;
}

export interface HerramientaInstitucional {
  id: string;
  nombre: string;
  sigla?: string;
  categoria: 'LMS / Aulas Virtuales' | 'Gestión Académica' | 'Comunicación y Colaboración' | 'Investigación y Recursos' | 'Empleabilidad';
  descripcion: string;
  funcionesPrincipales: string[];
  enlaceOAcceso: string;
  usuarioClave: string;
  soporteTecnico: string;
  icono: string;
}

export interface CanalAtencion {
  id: string;
  nombre: string;
  tipo: 'Telefonico' | 'Digital / Web' | 'Presencial' | 'Redes Sociales';
  datoContacto: string;
  horario: string;
  proposito: string;
  recomendaciones: string[];
}

export interface ConductoRegularNivel {
  paso: number;
  instancia: string;
  rol: string;
  cuandoAcudir: string;
  tiempoRespuestaEstimado: string;
}

export interface PreguntaEvaluacion {
  id: string;
  modulo: 'identidad' | 'derechos' | 'deberes' | 'etapas_formacion' | 'bienestar_y_tramites' | 'novedades_y_desercion' | 'debido_proceso' | 'fpi_y_pedagogia' | 'herramientas_y_canales';
  enunciado: string;
  casoContexto?: string;
  opciones: {
    id: string;
    texto: string;
  }[];
  opcionCorrectaId: string;
  explicacionPedagogica: string;
  articuloReferencia: string;
}

export interface ResultadoEvaluacion {
  aprendizId: string;
  puntaje: number; // 0 - 100
  totalPreguntas: number;
  correctas: number;
  incorrectas: number;
  aprobado: boolean;
  fecha: string;
  desglosePorModulo: Record<string, { correctas: number; total: number }>;
  respuestasUsuario: Record<string, string>;
}

export interface ArticuloReglamento {
  numero: string;
  titulo: string;
  contenido: string;
  implicacionPractica: string;
}

export interface CapituloManual {
  id: string;
  numero: number;
  titulo: string;
  subtitulo: string;
  articulosRango: string;
  descripcion: string;
  icono: string;
  badge: string;
  articulos: ArticuloReglamento[];
  puntosClave: string[];
}

