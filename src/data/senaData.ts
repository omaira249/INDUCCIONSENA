import { 
  SimboloSena, 
  ValorInstitucional, 
  NormaReglamento, 
  CasoDilema, 
  PreguntaEvaluacion, 
  Aprendiz, 
  FichaCaract,
  TramiteNovedad,
  TipoEvidencia,
  CausalDesercion,
  RepresentatividadInfo,
  ComponenteFPI,
  FaseProyectoFormativo,
  EjeBienestar,
  HerramientaInstitucional,
  CanalAtencion,
  ConductoRegularNivel,
  ItemComparativoAcuerdo,
  CapituloManual
} from '../types/sena';


export const SIMBOLOS_SENA: SimboloSena[] = [
  {
    id: 'escudo',
    nombre: 'El Escudo del SENA',
    subtitulo: 'Representación de los tres sectores de la economía nacional',
    descripcion: 'El escudo del SENA plasma gráficamente los tres sectores económicos de Colombia en los que la institución imparte formación profesional integral.',
    significadoDetallado: [
      'Sector de la Industria y la Construcción: Representado por la rueda dentada o piñón en la parte inferior, símbolo del trabajo manual, la técnica y la manufactura.',
      'Sector del Comercio y Servicios: Representado por el caduceo con alas en la parte central superior, símbolo del intercambio, la administración y la gestión mercantil.',
      'Sector Agropecuario y Primario: Representado por la espiga de café y trigo, reflejo de la riqueza del campo colombiano, la tierra fértil y el trabajo rural.'
    ],
    detalles: [
      {
        icono: 'Cog',
        titulo: 'Piñón / Rueda Dentada',
        texto: 'Simboliza la fuerza industrial, el sector de manufactura, mecánica y construcción de la nación.'
      },
      {
        icono: 'Briefcase',
        titulo: 'Caduceo Mercantil',
        texto: 'Representa la actividad comercial, contable, turística, logística y de servicios del país.'
      },
      {
        icono: 'Wheat',
        titulo: 'Espiga de Trigo y Café',
        texto: 'Honra al campesinado colombiano, la agroindustria, la seguridad alimentaria y la biotecnología.'
      }
    ]
  },
  {
    id: 'logosimbolo',
    nombre: 'El Logosímbolo',
    subtitulo: 'El aprendiz proyectado hacia el futuro',
    descripcion: 'Diseñado a comienzos de los años 70, representa al ser humano en evolución constante que camina decidido por el sendero del conocimiento y la superación.',
    significadoDetallado: [
      'El círculo superior simboliza la cabeza y el pensamiento creativo del aprendiz.',
      'La línea recta vertical representa el cuerpo firme y decidido, con valores éticos e integridad.',
      'Las dos franjas diagonales ascendentes representan los brazos y piernas en movimiento hacia adelante, abiertos a las oportunidades del mundo productivo.'
    ],
    detalles: [
      {
        icono: 'UserCheck',
        titulo: 'Enfoque en el Aprendiz',
        texto: 'El centro de todo el quehacer formativo es el ser humano integral, autónomo y crítico.'
      },
      {
        icono: 'TrendingUp',
        titulo: 'Caminar hacia el Progreso',
        texto: 'La postura inclinada refleja avance continuo, superación de barreras y proyección laboral.'
      },
      {
        icono: 'Sparkles',
        titulo: 'Color Verde Institucional',
        texto: 'Verde Pantone 361C (#39A900): Simboliza esperanza, dinamismo, juventud y crecimiento sustentable.'
      }
    ]
  },
  {
    id: 'bandera',
    nombre: 'La Bandera Institucional',
    subtitulo: 'Paz, tranquilidad y compromiso con Colombia',
    descripcion: 'La bandera del SENA consta de un paño rectangular blanco que lleva en el centro el escudo oficial en verde institucional.',
    significadoDetallado: [
      'El color blanco simboliza la paz, la transparencia, la tranquilidad y la convivencia pacífica que el SENA promueve en cada territorio de Colombia.',
      'El verde del escudo central representa la esperanza de los jóvenes, el desarrollo socioeconómico y la productividad del país.'
    ],
    detalles: [
      {
        icono: 'Flag',
        titulo: 'Fondo Blanco',
        texto: 'Paz, convivencia pacífica, honestidad y neutralidad social en la formación gratuita.'
      },
      {
        icono: 'Award',
        titulo: 'Presencia Nacional',
        texto: 'Ondea en las 33 Regionales y más de 118 Centros de Formación en todo el territorio colombiano.'
      }
    ]
  },
  {
    id: 'himno',
    nombre: 'El Himno del SENA',
    subtitulo: 'Compuesto por Jesús Briceño Sánchez y Luis Alfredo Sánchez',
    descripcion: 'Canto marcial que llama a los aprendices a forjar el porvenir de la patria mediante el trabajo disciplinado y el estudio técnico.',
    significadoDetallado: [
      'Coro: Estudiantes del SENA adelante! / Por Colombia luchad con amor / Con el ánimo noble y radiante / Transformemos el mundo en mejor.',
      'Enfatiza la dignidad del trabajo técnico y tecnológico como motor de equidad social.'
    ],
    detalles: [
      {
        icono: 'Music',
        titulo: 'Valores del Himno',
        texto: 'Amor a la patria, vocación transformadora, dignidad del trabajo e igualdad de oportunidades.'
      },
      {
        icono: 'BookOpen',
        titulo: 'Mística del Aprendiz',
        texto: 'Cada estrofa invita a superar la apatía y comprometerse con el desarrollo sostenible del país.'
      }
    ]
  }
];

export const VALORES_SENA: ValorInstitucional[] = [
  {
    id: 'honestidad',
    nombre: 'Honestidad',
    lema: 'Actúo siempre con fundamento en la verdad',
    descripcion: 'Cumplir mis deberes con transparencia y rectitud, sin buscar ventajas personales indebidas ni incurrir en plagio o engaño.',
    aplicacionCotidiana: 'Citar fuentes en proyectos formativos, reportar información veraz y cuidar los recursos públicos asignados.'
  },
  {
    id: 'respeto',
    nombre: 'Respeto',
    lema: 'Reconozco, valoro y trato de manera digna a todas las personas',
    descripcion: 'Aceptar la diversidad de pensamiento, género, origen étnico y creencias de todos los miembros de la comunidad educativa.',
    aplicacionCotidiana: 'Escuchar opiniones de compañeros e instructores, cuidar el lenguaje y mantener una convivencia cordial en aulas y talleres.'
  },
  {
    id: 'compromiso',
    nombre: 'Compromiso',
    lema: 'Soy consciente de la importancia de mi rol como aprendiz',
    descripcion: 'Asumir con responsabilidad la formación profesional integral, asistiendo puntualmente y cumpliendo las metas formativas.',
    aplicacionCotidiana: 'Llegar a tiempo a las sesiones, portar el uniforme adecuado y preparar con esmero cada evidencia de aprendizaje.'
  },
  {
    id: 'diligencia',
    nombre: 'Diligencia',
    lema: 'Cumplo con los deberes con celeridad y calidad',
    descripcion: 'Aprovechar al máximo el tiempo de formación, entregando evidencias dentro de los plazos establecidos y con alto estándar.',
    aplicacionCotidiana: 'No postergar tareas ni esperar al último día para pedir asesoría técnica o subir actividades a la plataforma LMS.'
  },
  {
    id: 'justicia',
    nombre: 'Justicia',
    lema: 'Actúo con equidad y garantizo los derechos de todos',
    descripcion: 'Promover un ambiente equitativo donde cada aprendiz tenga las mismas oportunidades y se respeten las normas colectivas.',
    aplicacionCotidiana: 'Distribuir equitativamente el trabajo en equipo y respetar los turnos en el uso de maquinaria y laboratorios.'
  },
  {
    id: 'solidaridad',
    nombre: 'Solidaridad',
    lema: 'Apoyo a quien lo necesita sin esperar nada a cambio',
    descripcion: 'Prestar ayuda fraterna a compañeros con dificultades de aprendizaje o en situaciones de vulnerabilidad.',
    aplicacionCotidiana: 'Compartir conocimientos, colaborar en tutorías entre pares y cuidar el bienestar colectivo en el centro.'
  }
];

export const NORMAS_REGLAMENTO: NormaReglamento[] = [
  // DERECHOS
  {
    id: 'der_1',
    tipo: 'derecho',
    capitulo: 'Capítulo II - Derechos del Aprendiz',
    articulo: 'Artículo 7, Numeral 1',
    titulo: 'Recibir Formación Profesional Integral',
    descripcion: 'Derecho a recibir formación de calidad acorde con el programa formativo matriculado, contando con instructores competentes, metodologías activas y ambientes adecuados.',
    ejemploContexto: 'Si requieres mayor claridad técnica, el instructor debe brindarte retroalimentación oportuna sobre tus resultados de aprendizaje.',
    categoria: 'Academico'
  },
  {
    id: 'der_2',
    tipo: 'derecho',
    capitulo: 'Capítulo II - Derechos del Aprendiz',
    articulo: 'Artículo 7, Numeral 2',
    titulo: 'Uso de Ambientes, Equipos y Bibliotecas',
    descripcion: 'Hacer uso adecuado de los ambientes de aprendizaje, laboratorios, talleres, biblioteca física y virtual, y herramientas tecnológicas institucionales.',
    ejemploContexto: 'Tienes acceso libre a las bases de datos científicas del Sistema de Bibliotecas SENA (SBS) y software licenciado institucional.',
    categoria: 'Uso de Instalaciones'
  },
  {
    id: 'der_3',
    tipo: 'derecho',
    capitulo: 'Capítulo II - Derechos del Aprendiz',
    articulo: 'Artículo 7, Numeral 4',
    titulo: 'Acceso a los Programas de Bienestar',
    descripcion: 'Beneficiarse de los programas de Bienestar al Aprendiz en las áreas de salud preventiva, arte y cultura, deporte, liderazgo, apoyos de sostenimiento y monitorías.',
    ejemploContexto: 'Puedes participar en torneos intercentros, grupos de música/danza o postularte a apoyos FIC o de alimentación si cumples requisitos.',
    categoria: 'Bienestar'
  },
  {
    id: 'der_4',
    tipo: 'derecho',
    capitulo: 'Capítulo II - Derechos del Aprendiz',
    articulo: 'Artículo 7, Numeral 7',
    titulo: 'Garantía del Debido Proceso y Ser Escuchado',
    descripcion: 'Derecho a ser escuchado, presentar descargos, aportar pruebas y recurrir las decisiones en cualquier procedimiento académico o disciplinario.',
    ejemploContexto: 'Ningún aprendiz puede ser sancionado sin que se haya surtido previamente el debido proceso ante el Comité de Evaluación y Seguimiento con derecho a descargos, pruebas y vocería estudiantil (Acuerdo 2026, Art. 48).',
    categoria: 'Disciplinario'
  },
  {
    id: 'der_5',
    tipo: 'derecho',
    capitulo: 'Capítulo II - Derechos del Aprendiz',
    articulo: 'Artículo 7, Numeral 9',
    titulo: 'Elegir y Ser Elegido Representante',
    descripcion: 'Participar democráticamente en las elecciones de voceros de ficha y representantes de aprendices ante el Comité Directivo del Centro de Formación.',
    ejemploContexto: 'Puedes postularte como vocero de tu grupo para canalizar inquietudes académicas ante la coordinación formativa.',
    categoria: 'Bienestar'
  },
  {
    id: 'der_6',
    tipo: 'derecho',
    capitulo: 'Capítulo II - Derechos del Aprendiz',
    articulo: 'Artículo 7, Numeral 12',
    titulo: 'Revisión y Retroalimentación de Evidencias',
    descripcion: 'Conocer las evaluaciones de las evidencias de aprendizaje en un plazo máximo razonable y solicitar revisión justificada cuando no estés de acuerdo.',
    ejemploContexto: 'El instructor debe registrar oportunamente la concertación y evaluación en la plataforma LMS (Aprobado / No Aprobado) con comentarios.',
    categoria: 'Academico'
  },

  // DEBERES
  {
    id: 'deb_1',
    tipo: 'deber',
    capitulo: 'Capítulo III - Deberes del Aprendiz',
    articulo: 'Artículo 8, Numeral 1',
    titulo: 'Portar el Carné Institucional en Lugar Visible',
    descripcion: 'Portar el carné del SENA en un lugar visible de la parte superior del cuerpo durante la permanencia en las sedes y presentarlo ante el personal de seguridad.',
    ejemploContexto: 'El carné es personal e intransferible. No se permite prestarlo a terceros ni ingresar tapándolo en bolsillos.',
    categoria: 'Disciplinario'
  },
  {
    id: 'deb_2',
    tipo: 'deber',
    capitulo: 'Capítulo III - Deberes del Aprendiz',
    articulo: 'Artículo 8, Numeral 2',
    titulo: 'Uso de la Indumentaria y Elementos de Protección',
    descripcion: 'Vestir el uniforme institucional o la ropa de trabajo reglamentaria para talleres y laboratorios, portando los Elementos de Protección Personal (EPP) obligatorios.',
    ejemploContexto: 'En talleres de mecatrónica o gastronomía es obligatorio calzado de seguridad, cofia y gafas según la matriz de riesgo del ambiente.',
    categoria: 'Uso de Instalaciones'
  },
  {
    id: 'deb_3',
    tipo: 'deber',
    capitulo: 'Capítulo III - Deberes del Aprendiz',
    articulo: 'Artículo 8, Numeral 5',
    titulo: 'Asistencia Puntual y Justificación Oportuna',
    descripcion: 'Asistir con puntualidad a todas las actividades programadas y justificar las inasistencias dentro de los 3 días hábiles siguientes al hecho con soporte válido.',
    ejemploContexto: 'Una incapacidad médica de EPS o calamidad doméstica comprobada debe radicarse ante el instructor y coordinación en máx. 3 días hábiles.',
    categoria: 'Academico'
  },
  {
    id: 'deb_4',
    tipo: 'deber',
    capitulo: 'Capítulo III - Deberes del Aprendiz',
    articulo: 'Artículo 8, Numeral 9',
    titulo: 'Cuidado y Preservación de los Bienes del Centro',
    descripcion: 'Hacer uso responsable de las instalaciones, maquinaria, herramientas, mobiliario y recursos naturales, reportando daños inmediatamente.',
    ejemploContexto: 'Si al iniciar práctica un equipo presenta falla, debes notificar de inmediato al instructor antes de manipularlo.',
    categoria: 'Uso de Instalaciones'
  },
  {
    id: 'deb_5',
    tipo: 'deber',
    capitulo: 'Capítulo III - Deberes del Aprendiz',
    articulo: 'Artículo 8, Numeral 14',
    titulo: 'Respeto a los Derechos de Autor y No Plagio',
    descripcion: 'Presentar siempre trabajos originales, citar correctamente las fuentes consultadas y respetar la propiedad intelectual de terceros.',
    ejemploContexto: 'Copiar proyectos de aprendices de fichas anteriores o usar inteligencia artificial sin declarar la fuente constituye falta grave.',
    categoria: 'Academico'
  },

  // PROHIBICIONES
  {
    id: 'pro_1',
    tipo: 'prohibicion',
    capitulo: 'Capítulo IV - Prohibiciones',
    articulo: 'Artículo 9, Numeral 1',
    titulo: 'Ingreso o Consumo de Sustancias Prohibidas',
    descripcion: 'Se prohíbe ingresar, comercializar, portar o consumir bebidas embriagantes o sustancias psicoactivas dentro de los centros o en actividades institucionales.',
    ejemploContexto: 'Esta infracción se cataloga como falta gravísima y da lugar a proceso disciplinario inmediato.',
    categoria: 'Disciplinario'
  },
  {
    id: 'pro_2',
    tipo: 'prohibicion',
    capitulo: 'Capítulo IV - Prohibiciones',
    articulo: 'Artículo 9, Numeral 4',
    titulo: 'Porte de Armas u Objetos Contundentes',
    descripcion: 'Prohibido ingresar cualquier tipo de arma de fuego, cortopunzante o artefacto explosivo a las sedes institucionales.',
    ejemploContexto: 'Las herramientas de corte solo pueden utilizarse bajo supervisión directa dentro del ambiente de aprendizaje autorizado.',
    categoria: 'Disciplinario'
  },
  {
    id: 'pro_3',
    tipo: 'prohibicion',
    capitulo: 'Capítulo IV - Prohibiciones',
    articulo: 'Artículo 9, Numeral 11',
    titulo: 'Uplantación de Identidad o Fraude en Evaluaciones',
    descripcion: 'Suplantar a otro aprendiz o permitir ser suplantado en evaluaciones presenciales o mediante el acceso indebido a la plataforma LMS.',
    ejemploContexto: 'Prestar credenciales de Sofia Plus/Zajuna para que otro presente una evaluación virtual es causal de cancelación de matrícula.',
    categoria: 'Academico'
  }
];

export const TRAMITES_NOVEDADES: TramiteNovedad[] = [
  {
    id: 'tram_traslado',
    nombre: 'Traslado de Centro o Programa',
    definicion: 'Solicitud formal que realiza el aprendiz para continuar su proceso formativo en otra ficha, centro de formación o jornada afín a su programa.',
    requisitos: [
      'Haber cursado y aprobado al menos el primer trimestre del programa de formación.',
      'Estar a paz y salvo académico y disciplinario en el centro de origen.',
      'Disponibilidad efectiva de cupo en el centro o ficha de destino solicitada.',
      'Coincidencia curricular o análisis de equivalencias aprobado por la coordinación académica.'
    ],
    plazoYCondiciones: 'Se debe radicar al finalizar el periodo académico o trimestre a través del sistema institucional (Sofia Plus / Zajuna). Solo se autoriza un traslado durante el programa.',
    impactoAcademico: 'Permite homologar los resultados de aprendizaje ya aprobados, reanudando la formación sin pérdida de historial ni afectación de beneficios de permanencia.'
  },
  {
    id: 'tram_aplazamiento',
    nombre: 'Aplazamiento de la Formación',
    definicion: 'Suspensión temporal del proceso formativo solicitada por el aprendiz por motivos de fuerza mayor, caso fortuito, incapacidad médica prolongada o servicio militar.',
    requisitos: [
      'Solicitud motivada por escrito o vía sistema oficial con soportes idóneos.',
      'Estar en estado "En Formación" al momento de radicar la solicitud.',
      'Soportes oficiales: certificado médico de EPS, orden de incorporación a servicio militar o documento que demuestre calamidad familiar grave.'
    ],
    plazoYCondiciones: 'Se otorga hasta por seis (6) meses calendarios continuos o discontinuos. Prorrogable por una sola vez hasta por seis (6) meses más por justa causa comprobada. En caso de servicio militar o incapacidad médica, el aplazamiento se extenderá por el término que dure la novedad.',
    impactoAcademico: 'El aprendiz no acumula inasistencias ni incurre en deserción mientras esté vigente el aplazamiento. La reactivación dependerá de la oferta del programa en el trimestre respectivo.'
  },
  {
    id: 'tram_reingreso',
    nombre: 'Reingreso al Programa',
    definicion: 'Trámite mediante el cual el aprendiz solicita reanudar su proceso formativo tras el vencimiento de un aplazamiento autorizado o tras superar una sanción disciplinaria temporal.',
    requisitos: [
      'Radicar la solicitud formal al menos quince (15) días hábiles antes de iniciar el periodo académico en el que desea reingresar.',
      'Disponibilidad de cupo y de la oferta del programa en el centro de formación.',
      'Sujeción al diseño curricular vigente: si el programa sufrió actualización, deberá someterse a plan de transición o nivelación.'
    ],
    plazoYCondiciones: 'Debe radicarse dentro del plazo máximo del aplazamiento concedido. Si no se solicita el reingreso a tiempo, se configura causal de deserción.',
    impactoAcademico: 'Reintegra al aprendiz en la fase lectiva o productiva correspondiente con pleno goce de sus derechos y reactivación de beneficios institucionales.'
  },
  {
    id: 'tram_retiro_voluntario',
    nombre: 'Retiro Voluntario',
    definicion: 'Manifestación expresa, libre e informada del aprendiz de desvincularse de manera definitiva del programa de formación en el que se encuentra matriculado.',
    requisitos: [
      'Comunicación escrita y firmada radicada ante la Subdirección del Centro de Formación indicando los motivos del retiro.',
      'Estar a paz y salvo con la biblioteca, laboratorios, almacén y Bienestar al Aprendiz.',
      'Entrevista o asesoría previa de orientación vocacional con el equipo psicosocial de Bienestar para explorar alternativas de permanencia.'
    ],
    plazoYCondiciones: 'Puede presentarse en cualquier momento de la etapa lectiva o productiva.',
    impactoAcademico: 'Genera sanción administrativa de seis (6) meses que impide la inscripción en programas de formación titulada del mismo nivel, a menos que medie justa causa comprobada.'
  },
  {
    id: 'tram_cambio_jornada',
    nombre: 'Cambio de Jornada',
    definicion: 'Modificación del horario en el que el aprendiz asiste a la formación (diurna, nocturna, mixta o fines de semana) motivada por causas laborales o personales sobrevinientes.',
    requisitos: [
      'Contrato laboral vigente o constancia que demuestre incompatibilidad horaria sobreviniente.',
      'Existencia de cupo disponible en una ficha del mismo programa y mismo trimestre en la jornada solicitada.',
      'Concepto favorable de la Coordinación Académica.'
    ],
    plazoYCondiciones: 'Se solicita al cierre del trimestre para no alterar el seguimiento ni la concertación de evaluaciones en curso.',
    impactoAcademico: 'Facilita la retención y permanencia del aprendiz en el sistema sin interrumpir la adquisición continua de competencias.'
  }
];

export const TIPOS_EVIDENCIAS: TipoEvidencia[] = [
  {
    id: 'ev_conocimiento',
    tipo: 'Conocimiento',
    definicion: 'Manifestación del saber teórico, conceptual, factual y procedimental que fundamenta el desempeño competente del aprendiz en su ocupación o disciplina.',
    ejemplosPracticos: [
      'Cuestionarios interactivos de saberes y pruebas escritas u orales.',
      'Mapas conceptuales, diagramas de flujo y cuadros comparativos.',
      'Estudios de caso teórico-analíticos y sustentaciones técnicas de conceptos.',
      'Pruebas diagnósticas en la plataforma LMS Zajuna / Sofia Plus.'
    ],
    instrumentoEvaluacion: 'Cuestionarios con clave de respuesta, listas de verificación conceptual y rúbricas de saber.'
  },
  {
    id: 'ev_desempeno',
    tipo: 'Desempeño',
    definicion: 'Demostración práctica en tiempo real del aprendiz ejecutando un procedimiento, interactuando en equipo o manipulando equipos y software bajo normas de seguridad y calidad.',
    ejemplosPracticos: [
      'Observación directa en talleres de manufactura, laboratorios o ambientes simulados.',
      'Simulaciones clínicas, mecánicas, gastronómicas o de atención al cliente.',
      'Jornadas de sustentación y pitch de proyectos formativos ante el panel de instructores.',
      'Prácticas de laboratorio con protocolos de bioseguridad y control de riesgos.'
    ],
    instrumentoEvaluacion: 'Listas de chequeo de desempeño con indicadores observables y escalas de verificación.'
  },
  {
    id: 'ev_producto',
    tipo: 'Producto',
    definicion: 'Resultado tangible, digital o documental terminado y entregable que evidencia la aplicación integral de los saberes y destrezas exigidas por el resultado de aprendizaje.',
    ejemplosPracticos: [
      'Prototipos de software, aplicaciones web o bases de datos funcionales.',
      'Manuales técnicos de operación, planos arquitectónicos o mecánicos.',
      'Balances financieros, informes contables auditados o planes de negocio.',
      'Piezas mecanizadas, platos gastronómicos o montajes de circuitos terminados.'
    ],
    instrumentoEvaluacion: 'Rúbricas analíticas o sintéticas de valoración del producto terminado con criterios de calidad y entrega.'
  }
];

export const CAUSALES_DESERCION: CausalDesercion[] = [
  {
    id: 'des_1',
    causal: 'Inasistencia Injustificada Consecutiva',
    condicionNormativa: 'Cuando el aprendiz no asiste durante tres (3) días hábiles consecutivos a las actividades formativas programadas sin presentar justificación válida ni comunicarse oportunamente con el instructor.',
    procedimientoPrevio: 'El instructor reporta la novedad al Coordinador Académico. Se remite comunicación oficial al aprendiz al correo institucional otorgándole cinco (5) días hábiles para presentar descargos y soportes.',
    efectoLegal: 'Si no responde en el término o la justificación no es aceptada, el Subdirector de Centro expide resolución de cancelación de matrícula por deserción con inhabilidad de seis (6) meses.'
  },
  {
    id: 'des_2',
    causal: 'Inactividad en Formación Virtual',
    condicionNormativa: 'Cuando el aprendiz en modalidad 100% virtual no ingresa ni registra interacción alguna en la plataforma LMS institucional durante quince (15) días calendario consecutivos sin justificación.',
    procedimientoPrevio: 'Alertas tempranas del tutor virtual y Bienestar al Aprendiz. Notificación electrónica trazable con término de cinco (5) días hábiles para justificar su inactividad.',
    efectoLegal: 'Cancelación de la matrícula y desvinculación formal del programa virtual con reporte en las bases de datos institucionales.'
  },
  {
    id: 'des_3',
    causal: 'Abandono de la Etapa Productiva',
    condicionNormativa: 'Transcurridos treinta (30) días calendario consecutivos sin que el aprendiz inicie formalmente su etapa productiva tras culminar la etapa lectiva, o cuando abandona su puesto de práctica/empresa sin previo aviso ni autorización del SENA.',
    procedimientoPrevio: 'Requerimiento formal del instructor de seguimiento y la coordinación de relaciones corporativas solicitando explicación del abandono en 5 días hábiles.',
    efectoLegal: 'Cancelación de matrícula e inhabilidad para matricularse en el SENA durante un periodo de seis (6) meses a un (1) año.'
  },
  {
    id: 'des_4',
    causal: 'Vencimiento de Aplazamiento sin Reingreso',
    condicionNormativa: 'Cuando al vencerse el término máximo concedido en el acto administrativo de aplazamiento (máximo 6 meses o su prórroga), el aprendiz no radica la solicitud de reingreso formal.',
    procedimientoPrevio: 'Verificación del vencimiento en el sistema de gestión académica por parte de la oficina de administración educativa.',
    efectoLegal: 'Declaratoria automática de deserción y cancelación de matrícula por no reanudación del proceso formativo.'
  },
  {
    id: 'des_5',
    causal: 'Incumplimiento No Justificado Reiterado (>30% de Resultados)',
    condicionNormativa: 'Cuando el aprendiz acumula incumplimientos no justificados en el 30% o más de las horas y resultados de aprendizaje programados en el trimestre, o no suscribe los planes de mejoramiento concertados.',
    procedimientoPrevio: 'Seguimiento por Comité de Evaluación y Seguimiento, citación formal y verificación de llamados de atención previos.',
    efectoLegal: 'Cancelación de matrícula tras agotar el procedimiento disciplinario con garantía del derecho de defensa.'
  }
];

export const REPRESENTATIVIDAD_ROLES: RepresentatividadInfo[] = [
  {
    rol: 'Vocero de Ficha',
    periodo: 'Durante todo el periodo formativo de la ficha (sujeto a ratificación periódica por el grupo).',
    requisitosPostulacion: [
      'Estar matriculado y cursando activamente en la ficha respectiva.',
      'Demostrar buen rendimiento académico (100% de resultados aprobados al momento de postularse).',
      'No haber sido objeto de sanciones disciplinarias en el SENA.',
      'Capacidad de liderazgo, empatía, asertividad y compromiso ético.'
    ],
    responsabilidadesClave: [
      'Canalizar inquietudes, propuestas y necesidades pedagógicas de sus compañeros ante los instructores y coordinadores.',
      'Participar activamente con voz en las sesiones del Comité de Evaluación y Seguimiento (Acuerdo 2026, Art. 48).',
      'Promover la convivencia armónica, el cuidado de los ambientes y el cumplimiento de las normas del reglamento.',
      'Fomentar la participación en los programas de Bienestar al Aprendiz y eventos de ciencia, tecnología e innovación.'
    ],
    causalesRevocatoria: [
      'Incumplimiento reiterado de sus deberes como aprendiz o como vocero.',
      'Solicitud motivada y aprobada por el 50% + 1 de los aprendices que componen la ficha.',
      'Imposición de sanción disciplinaria por el Subdirector de Centro.',
      'Aplazamiento, traslado o retiro del programa de formación.'
    ]
  },
  {
    rol: 'Representante de Centro',
    periodo: 'Un (1) año lectivo institucional contado a partir de su posesión formal.',
    requisitosPostulacion: [
      'Haber cursado y aprobado como mínimo tres (3) meses de la etapa lectiva en el Centro de Formación.',
      'Tener un rendimiento académico sobresaliente sin planes de mejora pendientes.',
      'No haber sido sancionado disciplinariamente durante su trayectoria formativa.',
      'Inscribir y sustentar públicamente una propuesta de plan de trabajo y gestión estudiantil viable y formativa.'
    ],
    responsabilidadesClave: [
      'Representar a la totalidad de aprendices del Centro ante el Comité Directivo del Centro de Formación.',
      'Participar en la formulación y seguimiento del Plan de Acción Institucional y programas de Bienestar.',
      'Organizar asambleas de voceros y foros de deliberación estudiantil para recopilar iniciativas.',
      'Promover la defensa de los derechos de los aprendices y la transparencia en la gestión de recursos del centro.'
    ],
    causalesRevocatoria: [
      'Bajo rendimiento académico que impida el avance normal de su formación.',
      'Faltas disciplinarias debidamente sancionadas mediante resolución en firme.',
      'Incumplimiento injustificado comprobado de más del 50% de su plan de trabajo registrado.',
      'Votación mayoritaria en referendo revocatorio convocado por la comunidad de aprendices del centro.'
    ]
  }
];

export const REQUISITOS_CERTIFICACION = [
  {
    titulo: 'Aprobación del 100% de Competencias',
    descripcion: 'Tener evaluados y aprobados con juicio "A" la totalidad de los resultados de aprendizaje de la Etapa Lectiva y de la Etapa Productiva en el sistema LMS.',
    estadoValidacion: 'Obligatorio e inmodificable'
  },
  {
    titulo: 'Paz y Salvo Administrativo Integral',
    descripcion: 'Estar a paz y salvo con Biblioteca (devolución de libros y llaves), Almacén de Centro (herramientas y materiales), Bienestar (apoyos devueltos) y Carné institucional.',
    estadoValidacion: 'Verificado en línea por coordinación'
  },
  {
    titulo: 'Registro de Pruebas de Estado (Saber TyT / Saber Pro)',
    descripcion: 'Para programas de nivel Tecnólogo, es requisito legal haber presentado la prueba oficial del ICFES y allegar el certificado de asistencia.',
    estadoValidacion: 'Exigible para Tecnólogos'
  },
  {
    titulo: 'Actualización y Validación de Datos Personales',
    descripcion: 'Tener cédula de ciudadanía o documento legal vigente actualizado en Sofia Plus/Zajuna para evitar inconsistencias en el diploma digital nacional.',
    estadoValidacion: 'Revisión por Secretaría Académica'
  },
  {
    titulo: 'Bitácoras y Paz y Salvo de Etapa Productiva',
    descripcion: 'Haber entregado las doce (12) bitácoras quincenales firmadas por el coformador de la empresa y contar con la evaluación final de visita del instructor de seguimiento.',
    estadoValidacion: 'Aval del instructor de seguimiento'
  }
];

export const COMPONENTES_FPI: ComponenteFPI[] = [
  {
    id: 'fpi_concepto',
    titulo: 'Formación Profesional Integral (FPI)',
    subtitulo: 'Proceso teórico-práctico orientado al desarrollo humano integral',
    descripcion: 'Es el proceso educativo teórico-práctico de carácter integral, mediante el cual las personas adquieren y desarrollan conocimientos, destrezas, habilidades y actitudes para su desempeño productivo y su convivencia ciudadana armónica.',
    principiosClave: [
      'El trabajo como factor dignificante y de realización humana integral.',
      'La integralidad: articular el saber técnico con los valores humanos, éticos y sociales.',
      'La equidad social e inclusión: formación 100% gratuita y accesible en todo el territorio nacional.',
      'La formación permanente: capacidad de aprender a lo largo de toda la vida.'
    ],
    enfoque: 'Enfoque Basado en Competencias Laborales (Saber, Saber Hacer, Saber Ser y Saber Convivir).',
    icono: 'GraduationCap'
  },
  {
    id: 'fpi_competencias',
    titulo: 'Estructura de las Competencias en el SENA',
    subtitulo: 'Saber, Hacer y Ser en sinergia permanente',
    descripcion: 'El SENA concibe la competencia como la capacidad demostrada de movilizar conocimientos, habilidades motrices, cognitivas y actitudes éticas para resolver problemas reales en el sector productivo.',
    principiosClave: [
      'Saber (Cognitivo): Fundamentación científica, técnica, conceptual y metodológica.',
      'Saber Hacer (Procedimental): Habilidades prácticas, técnicas, operación de equipos, diseño de soluciones y destrezas en taller/laboratorio.',
      'Saber Ser y Convivir (Actitudinal): Valores del Código de Integridad, trabajo en equipo, comunicación asertiva, resiliencia y liderazgo comunitario.',
      'Aprender a Aprender: Capacidad de autogestionar el conocimiento frente a las cambiantes demandas tecnológicas y del mercado global.'
    ],
    enfoque: 'Evaluación cualitativa del desempeño en contextos simulados y reales de producción.',
    icono: 'Layers'
  },
  {
    id: 'fpi_metodologia',
    titulo: 'Metodología de Aprendizaje Activo',
    subtitulo: 'Formación por proyectos y aprendizaje colaborativo',
    descripcion: 'En el SENA el aprendiz es el protagonista de su aprendizaje. No es un receptor pasivo, sino un gestor de soluciones a problemas del sector productivo a través de proyectos reales formativos.',
    principiosClave: [
      'Aprendizaje Basado en Proyectos (ABP): Cada programa gira en torno a un proyecto formativo macro.',
      'Guías de Aprendizaje: Instrumento didáctico estructurado que orienta las actividades y evidencias.',
      'Portafolio de Evidencias: Bitácora digital donde el aprendiz compila sus productos y reflexiones.',
      'Rol del Instructor: Orientador, facilitador pedagógico, mediador cognitivo y evaluador formativo.'
    ],
    enfoque: 'Constructivismo pedagógico aplicado a entornos productivos reales.',
    icono: 'Workflow'
  }
];

export const FASES_PROYECTO: FaseProyectoFormativo[] = [
  {
    fase: 'Análisis',
    numero: 1,
    objetivo: 'Identificar y caracterizar las necesidades, problemas y oportunidades del sector productivo y social en el entorno real.',
    actividadesAprendiz: [
      'Diagnóstico del problema técnico o necesidad del cliente/empresa.',
      'Recolección de información mediante entrevistas, encuestas y observación en campo.',
      'Definición de requerimientos funcionales, técnicos y normativos del proyecto.',
      'Estudio de viabilidad técnica, social, económica y ambiental.'
    ],
    entregablesComunes: [
      'Documento de especificación de requisitos y alcance.',
      'Informe de diagnóstico del entorno productivo.',
      'Mapa de actores y matriz de necesidades identificadas.'
    ],
    rolInstructor: 'Acompaña en la delimitación del problema, valida fuentes de información y contextualiza normas técnicas vigentes.',
    color: '#0284c7'
  },
  {
    fase: 'Planeación',
    numero: 2,
    objetivo: 'Diseñar la solución integral, estructurar el cronograma de trabajo y seleccionar tecnologías, herramientas y recursos.',
    actividadesAprendiz: [
      'Modelado de la solución (diagramas técnicos, planos, esquemas de bases de datos, flujogramas).',
      'Elaboración del cronograma de actividades (Gantt) y asignación de roles colaborativos.',
      'Cálculo de costos preliminares, presupuestos de materiales y cronograma de hitos.',
      'Diseño de prototipos de baja fidelidad o maquetas de validación temprana.'
    ],
    entregablesComunes: [
      'Plan de trabajo y cronograma detallado de la ficha.',
      'Diseños conceptuales, planos de ingeniería o arquitecturas de software.',
      'Fichas técnicas de materiales, componentes o insumos a utilizar.'
    ],
    rolInstructor: 'Supervisa la coherencia metodológica, verifica el cumplimiento de estándares y valida el cronograma propuesto.',
    color: '#eab308'
  },
  {
    fase: 'Ejecución',
    numero: 3,
    objetivo: 'Construir, codificar, ensamblar, transformar o implementar la solución tangible en los talleres o ambientes de aprendizaje.',
    actividadesAprendiz: [
      'Desarrollo técnico del producto, servicio o sistema conforme a la planeación aprobada.',
      'Aplicación estricta de protocolos de Seguridad y Salud en el Trabajo (SST).',
      'Realización de pruebas unitarias, ensayos de laboratorio y calibración de prototipos.',
      'Registro continuo de bitácoras de avance y retroalimentación con el cliente simulado.'
    ],
    entregablesComunes: [
      'Prototipo funcional, software operativo, mecanismo ensamblado o servicio implementado.',
      'Manuales de usuario, guías de operación técnica o bitácoras de mantenimiento.',
      'Reporte de pruebas y registro de control de calidad.'
    ],
    rolInstructor: 'Guía técnica especializada en taller, modela buenas prácticas operativas y evalúa el desempeño en tiempo real.',
    color: '#39A900'
  },
  {
    fase: 'Evaluación',
    numero: 4,
    objetivo: 'Verificar la efectividad de la solución implementada, medir su impacto técnico-social y socializar los resultados ante la comunidad.',
    actividadesAprendiz: [
      'Pruebas de aceptación con usuarios finales o empresas del sector.',
      'Sustentación pública del proyecto formativo ante jurados y comités técnicos.',
      'Consolidación del portafolio final de evidencias de aprendizaje en el LMS Zajuna.',
      'Formulación de oportunidades de mejora y prospectiva para patentes o emprendimiento en Fondo Emprender.'
    ],
    entregablesComunes: [
      'Informe final de cierre y lecciones aprendidas.',
      'Sustentación y presentación multimedia del proyecto.',
      'Paz y salvo pedagógico de resultados de aprendizaje alcanzados.'
    ],
    rolInstructor: 'Emisión concertada del juicio evaluativo (Aprobado / No Aprobado) y orientación hacia la etapa productiva.',
    color: '#8b5cf6'
  }
];

export const EJES_BIENESTAR: EjeBienestar[] = [
  {
    id: 'eje_salud',
    nombre: 'Salud Integral y Autocuidado',
    lema: 'Mente y cuerpo sano para un desempeño de excelencia',
    descripcion: 'Promueve el bienestar físico y mental de los aprendices mediante jornadas de prevención, brigadas de salud oral, vacunación, tamizajes visuales y apoyo en primeros auxilios en cada Centro de Formación.',
    programasYBeneficios: [
      'Jornadas de salud preventiva y estilos de vida saludables.',
      'Primeros auxilios inmediatos ante eventualidades en talleres y aulas.',
      'Talleres de salud sexual y reproductiva responsable.',
      'Campañas de prevención de adicciones y pausas activas durante la formación.'
    ],
    comoAcceder: 'Acercándote a la enfermería o punto de atención en salud de tu Centro de Formación con tu carné institucional.',
    icono: 'HeartPulse',
    contactoOCentro: 'Enfermería y brigada de salud de tu Centro'
  },
  {
    id: 'eje_cultura',
    nombre: 'Arte y Cultura',
    lema: 'Expresión, sensibilidad y patrimonio cultural',
    descripcion: 'Fomenta el desarrollo de talentos artísticos, la identidad colombiana y el disfrute cultural a través de talleres extracurriculares y festivales regionales y nacionales.',
    programasYBeneficios: [
      'Grupos de danza folclórica, moderna y ritmos urbanos.',
      'Ensambles musicales, coro y técnica vocal institucional.',
      'Talleres de artes plásticas, fotografía y teatro.',
      'Participación en el Encuentro Nacional Cultural del Aprendiz SENA.'
    ],
    comoAcceder: 'Inscripciones al inicio de cada trimestre a través de las convocatorias de Bienestar publicadas en cartelera y Zajuna.',
    icono: 'Palette',
    contactoOCentro: 'Oficina de Bienestar al Aprendiz'
  },
  {
    id: 'eje_deporte',
    nombre: 'Deporte y Recreación',
    lema: 'Disciplina, juego limpio y trabajo en equipo',
    descripcion: 'Promueve la actividad física regular, torneos internos inter-fichas y la representación del Centro en los Juegos Deportivos Nacionales del SENA.',
    programasYBeneficios: [
      'Torneos de fútbol, microfútbol, baloncesto, voleibol y tenis de mesa.',
      'Gimnasio institucional y salas de acondicionamiento físico con instructores deportivos.',
      'Caminatas ecológicas, ciclopaseos y festivales recreativos.',
      'Selecciones deportivas del Centro para competir en fases zonales y nacionales.'
    ],
    comoAcceder: 'Inscripción directa con los gestores deportivos de Bienestar al Aprendiz en las canchas o polideportivos del centro.',
    icono: 'Trophy',
    contactoOCentro: 'Coordinación de Deportes del Centro'
  },
  {
    id: 'eje_liderazgo',
    nombre: 'Liderazgo y Habilidades para la Vida',
    lema: 'Formando ciudadanos globales y constructores de paz',
    descripcion: 'Fortalece la inteligencia emocional, la oratoria, la resolución no violenta de conflictos y el ejercicio de la democracia y representatividad estudiantil.',
    programasYBeneficios: [
      'Escuela Nacional de Liderazgo del Aprendiz SENA.',
      'Elección democrática y acompañamiento a Voceros de Ficha y Representantes de Centro.',
      'Talleres de oratoria, comunicación asertiva, negociación y etiqueta laboral.',
      'Encuentros de líderes transformadores y voluntariado ambiental y social.'
    ],
    comoAcceder: 'Postulándote como vocero de tu ficha en inducción o participando en las convocatorias semestrales de liderazgo.',
    icono: 'Users2',
    contactoOCentro: 'Líder de Bienestar y Escuela de Liderazgo'
  },
  {
    id: 'eje_psicosocial',
    nombre: 'Acompañamiento Psicosocial',
    lema: 'Escucha activa, orientación y permanencia formativa',
    descripcion: 'Brinda apoyo psicológico y pedagógico confidencial para superar dificultades emocionales, académicas, familiares o de convivencia que puedan poner en riesgo la continuidad de tus estudios.',
    programasYBeneficios: [
      'Consultoría individual psicológica y de orientación vocacional.',
      'Estrategias de intervención temprana para prevenir la deserción escolar.',
      'Atención y protocolos específicos para equidad de género y prevención del acoso.',
      'Acompañamiento a aprendices con discapacidad y diversidad funcional.'
    ],
    comoAcceder: 'Solicitando cita en la oficina de Bienestar o mediante remisión voluntaria o de tu instructor líder de ficha.',
    icono: 'BrainHand',
    contactoOCentro: 'Psicólogos y trabajadores sociales de Bienestar'
  },
  {
    id: 'eje_socioeconomico',
    nombre: 'Apoyos Socioeconómicos y Monitorías',
    lema: 'Oportunidades de permanencia para quienes más lo necesitan',
    descripcion: 'Gestiona subsidios económicos regulados por la ley para mitigar barreras económicas durante la etapa lectiva y productiva, beneficiando a estratos 1 y 2.',
    programasYBeneficios: [
      'Apoyo de Sostenimiento Regular: Asignación económica mensual para gastos de transporte y alimentación.',
      'Apoyo de Sostenimiento FIC (Fondo de la Industria de la Construcción): Específico para aprendices de áreas de obras civiles y afines.',
      'Monitorías Académicas: Estipendio para aprendices destacados que apoyan ambientes de aprendizaje o bibliotecas.',
      'Auxilio de alimentación y bonos de transporte (según disponibilidad presupuestal de cada centro).'
    ],
    comoAcceder: 'Cumplir estrato 1 o 2, SISBEN categorizado, excelente rendimiento académico, no tener contratos laborales ni sanciones y postularse en las convocatorias oficiales en Sofia Plus/Zajuna.',
    icono: 'Coins',
    contactoOCentro: 'Convocatorias públicas institucionales de Centro'
  }
];

export const HERRAMIENTAS_INSTITUCIONALES: HerramientaInstitucional[] = [
  {
    id: 'zajuna',
    nombre: 'Zajuna LMS',
    sigla: 'Zajuna',
    categoria: 'LMS / Aulas Virtuales',
    descripcion: 'Plataforma oficial de aprendizaje virtual del SENA (desarrollada con tecnología propia y Moodle). Es el aula virtual donde accedes al material didáctico, interactúas en foros, presentas evaluaciones y subes tus evidencias.',
    funcionesPrincipales: [
      'Consulta de guías de aprendizaje, material interactivo y videos de apoyo.',
      'Entrega y carga formal de evidencias de aprendizaje (archivos, enlaces, videos).',
      'Foros de dudas e inquietudes técnicas y foros temáticos calificables.',
      'Calificaciones, retroalimentación detallada y juicios evaluativos de instructores.'
    ],
    enlaceOAcceso: 'https://zajuna.sena.edu.co',
    usuarioClave: 'Tipo y número de documento registrado en Sofia Plus + Contraseña única de usuario.',
    soporteTecnico: 'Mesa de ayuda Zajuna en el portal o con el dinamizador virtual de tu centro.',
    icono: 'Laptop'
  },
  {
    id: 'sofiaplus',
    nombre: 'SENA Sofia Plus',
    sigla: 'SOFIA Plus',
    categoria: 'Gestión Académica',
    descripcion: 'Sistema Optimizado para la Formación Integral y el Aprendizaje Activo. Es la plataforma administrativa del SENA que gestiona todo el ciclo de vida del aprendiz, desde la inscripción hasta la certificación.',
    funcionesPrincipales: [
      'Consulta del estado de matrícula y ficha de caracterización.',
      'Registro y solicitud de trámites y novedades (traslados, aplazamientos, reingresos).',
      'Consulta del reporte de notas y juicios evaluativos aprobados / no aprobados.',
      'Descarga de certificados de estudio, constancias de matrícula y diplomas oficiales con código QR de verificación.'
    ],
    enlaceOAcceso: 'https://oferta.senasofiaplus.edu.co',
    usuarioClave: 'Tipo de documento + Contraseña personal de Sofia Plus.',
    soporteTecnico: 'Centro de atención telefónica SENA y oficina de Administración Educativa de tu centro.',
    icono: 'Database'
  },
  {
    id: 'misena',
    nombre: 'Correo Institucional MiSENA',
    sigla: '@misena.edu.co / @soy.sena.edu.co',
    categoria: 'Comunicación y Colaboración',
    descripcion: 'Cuenta oficial de correo electrónico institucional provista a todo aprendiz activo. Otorga identidad digital y acceso a suites de productividad en la nube para trabajo colaborativo.',
    funcionesPrincipales: [
      'Recepción de citaciones a comités, circulares institucionales y comunicados oficiales.',
      'Almacenamiento en la nube (Drive/OneDrive) para respaldar proyectos y portafolio.',
      'Acceso a herramientas de videoconferencia (Teams/Meet) para clases sincrónicas.',
      'Beneficios y descuentos de estudiante en licencias de software técnico internacional.'
    ],
    enlaceOAcceso: 'https://correo.misena.edu.co o acceso web institucional',
    usuarioClave: 'Usuario asignado en inducción (ej: nombre.apellido@soy.sena.edu.co) + contraseña temporal inicial.',
    soporteTecnico: 'Mesa de servicio TI del SENA y administradores de red del centro.',
    icono: 'Mail'
  },
  {
    id: 'biblioteca_sbs',
    nombre: 'Sistema Nacional de Bibliotecas (SBS)',
    sigla: 'SBS SENA',
    categoria: 'Investigación y Recursos',
    descripcion: 'Red de más de 130 bibliotecas físicas y un potente portal digital con acceso a miles de libros electrónicos, revistas científicas internacionales y normas técnicas ICONTEC.',
    funcionesPrincipales: [
      'Bases de datos suscritas de alto nivel (ScienceDirect, Scopus, ProQuest, IEEE, Taylor & Francis).',
      'Consulta y descarga del compendio completo de normas técnicas colombianas (ICONTEC).',
      'Préstamo interbibliotecario de libros físicos, manuales de taller y computadores en sede.',
      'Repositorio institucional con monografías, tesis y proyectos SENA desde 1957.'
    ],
    enlaceOAcceso: 'https://biblioteca.sena.edu.co',
    usuarioClave: 'Número de documento de identidad del aprendiz SENA.',
    soporteTecnico: 'Personal de biblioteca física de tu centro y chat en línea SBS.',
    icono: 'BookMarked'
  },
  {
    id: 'sennova',
    nombre: 'Ecosistema SENNOVA y Tecnoparques',
    sigla: 'SENNOVA',
    categoria: 'Investigación y Recursos',
    descripcion: 'Sistema de Investigación, Desarrollo Tecnológico e Innovación del SENA. Permite a los aprendices participar en semilleros de investigación aplicada, patentes y laboratorios de vanguardia.',
    funcionesPrincipales: [
      'Semilleros de Investigación aplicada liderados por instructores investigadores.',
      'Tecnoparques y TecnoAcademias: aceleración de prototipos en biotecnología, robótica, IA y diseño.',
      'Fondo Emprender: capital semilla no reembolsable para ideas de negocio de aprendices y egresados.',
      'Participación en eventos nacionales de investigación como RedCOLSI y WorldSkills.'
    ],
    enlaceOAcceso: 'https://sennova.sena.edu.co',
    usuarioClave: 'Postulación a través de los líderes SENNOVA de tu centro de formación.',
    soporteTecnico: 'Líder SENNOVA y coordinadores de semilleros de investigación.',
    icono: 'Microscope'
  },
  {
    id: 'ape',
    nombre: 'Agencia Pública de Empleo (APE)',
    sigla: 'APE SENA',
    categoria: 'Empleabilidad',
    descripcion: 'El primer servicio público de empleo autorizado en Colombia, 100% público, gratuito e indiscriminado. Conecta el talento SENA con miles de vacantes laborales empresariales.',
    funcionesPrincipales: [
      'Intermediación laboral gratuita y postulación directa a vacantes formales en el país.',
      'Gestión de vacantes de Contrato de Aprendizaje para tu etapa productiva.',
      'Talleres de orientación ocupacional (hoja de vida, entrevistas de trabajo, pruebas psicotécnicas).',
      'Convocatorias especiales de trabajo en el exterior (Alemania, Canadá, España).'
    ],
    enlaceOAcceso: 'https://ape.sena.edu.co',
    usuarioClave: 'Registro de hoja de vida con documento de identidad.',
    soporteTecnico: 'Oficinas APE en todos los centros de formación y líneas telefónicas oficiales.',
    icono: 'Briefcase'
  }
];

export const CANALES_ATENCION: CanalAtencion[] = [
  {
    id: 'canal_linea_nacional',
    nombre: 'Línea Telefónica Gratuita Nacional',
    tipo: 'Telefonico',
    datoContacto: '01 8000 910270 (Línea gratuita de atención integral)',
    horario: 'Lunes a viernes de 7:00 a.m. a 7:00 p.m. · Sábados de 8:00 a.m. a 1:00 p.m.',
    proposito: 'Consultas generales sobre inscripciones, certificados, verificación de estado de matrícula y trámites institucionales desde cualquier municipio de Colombia.',
    recomendaciones: [
      'Ten a la mano tu tipo y número de documento de identidad.',
      'Anota el número de radicado o ticket que te proporcione el operador para hacer seguimiento.'
    ]
  },
  {
    id: 'canal_linea_bogota',
    nombre: 'Línea de Atención Bogotá D.C.',
    tipo: 'Telefonico',
    datoContacto: '(601) 343 0111 / (601) 745 8000',
    horario: 'Lunes a viernes de 7:00 a.m. a 7:00 p.m. · Sábados de 8:00 a.m. a 1:00 p.m.',
    proposito: 'Atención especializada para la Regional Distrito Capital y sede de la Dirección General del SENA.',
    recomendaciones: [
      'Comunícate en horarios matutinos (entre 8:00 a.m. y 10:00 a.m.) para una respuesta más rápida.',
      'Indica claramente tu ficha y centro de formación si se trata de un tema académico.'
    ]
  },
  {
    id: 'canal_pqrsd',
    nombre: 'Sistema Oficial de PQRSD en Línea',
    tipo: 'Digital / Web',
    datoContacto: 'Portal PQRSD: https://sciudadanos.sena.edu.co',
    horario: 'Radicación disponible 24 horas al día, 7 días a la semana.',
    proposito: 'Radicación formal de Peticiones, Quejas, Reclamos, Sugerencias, Denuncias y Felicitaciones con validez legal plena ante el Estado colombiano.',
    recomendaciones: [
      'Guarda inmediatamente el Código Único de Radicado que genera el sistema para rastrear el trámite.',
      'Los términos legales de respuesta son: Peticiones de información (10 días hábiles), Peticiones generales (15 días hábiles), Consultas (30 días hábiles).'
    ]
  },
  {
    id: 'canal_presencial',
    nombre: 'Ventanilla Única y Centros de Convivencia',
    tipo: 'Presencial',
    datoContacto: 'Oficinas de Atención al Ciudadano en los 118 Centros de Formación del país.',
    horario: 'Lunes a viernes de 8:00 a.m. a 12:00 m. y de 2:00 p.m. a 5:00 p.m.',
    proposito: 'Radicación física de documentos originales, entrega de soportes médicos, asesoría personalizada de bienestar y trámites de secretaría académica.',
    recomendaciones: [
      'Portar siempre el carné institucional y documento de identidad.',
      'Llevar copias de radicados si requieres sello de recibido en físico.'
    ]
  },
  {
    id: 'canal_redes',
    nombre: 'Canales Digitales y Redes Sociales Verificadas',
    tipo: 'Redes Sociales',
    datoContacto: 'X / Instagram / TikTok: @SENAComunica · Facebook: SENA Colombia Oficial',
    horario: 'Publicación permanente de convocatorias y avisos de interés general.',
    proposito: 'Difusión de convocatorias de formación nacional, becas internacionales, ferias de empleo y noticias institucionales oficiales.',
    recomendaciones: [
      'Verifica siempre que la cuenta posea la insignia de verificación oficial (evita páginas fraudulentas o estafas que cobran por trámites gratuitos del SENA).'
    ]
  }
];

export const CONDUCTO_REGULAR: ConductoRegularNivel[] = [
  {
    paso: 1,
    instancia: 'Instructor de la Competencia / Instructor Líder de Ficha',
    rol: 'Primer canal de diálogo directo para resolver dudas técnicas, concertación de evaluaciones y justificación de inasistencias.',
    cuandoAcudir: 'Inquietudes sobre calificaciones de guías, retroalimentación de evidencias, inasistencias médicas dentro de 3 días o dificultades de aprendizaje.',
    tiempoRespuestaEstimado: 'Inmediato o hasta 3 días hábiles.'
  },
  {
    paso: 2,
    instancia: 'Vocero de la Ficha',
    rol: 'Representante elegido democráticamente por el grupo que actúa como mediador y puente de comunicación.',
    cuandoAcudir: 'Situaciones colectivas del grupo que requieran mediación con los instructores, o cuando se requiera acompañamiento en comités.',
    tiempoRespuestaEstimado: 'Coordinación permanente con la ficha.'
  },
  {
    paso: 3,
    instancia: 'Coordinación Académica del Centro',
    rol: 'Autoridad académica responsable de la asignación de instructores, ambientes, horarios y trámite formal de novedades.',
    cuandoAcudir: 'Cuando la inquietud no fue resuelta en primera instancia, solicitudes de traslados, aplazamientos, reingresos o quejas sobre el desarrollo pedagógico.',
    tiempoRespuestaEstimado: '5 a 10 días hábiles.'
  },
  {
    paso: 4,
    instancia: 'Comité de Evaluación y Seguimiento',
    rol: 'Órgano consultor y asesor colegiado del Subdirector de Centro (Acuerdo 2026, Art. 48).',
    cuandoAcudir: 'Casos remitidos por bajo rendimiento académico reiterado, faltas disciplinarias o análisis de planes de mejoramiento no superados.',
    tiempoRespuestaEstimado: 'Sesión programada con citación previa mínima de 3 días hábiles.'
  },
  {
    paso: 5,
    instancia: 'Subdirección del Centro de Formación',
    rol: 'Máxima autoridad ejecutiva y administrativa del Centro de Formación Profesional.',
    cuandoAcudir: 'Expedición de actos administrativos sancionatorios definitivos, recursos de reposición de sanciones o situaciones extraordinarias no resueltas.',
    tiempoRespuestaEstimado: 'Términos de ley (5 días hábiles para resolver recurso de reposición).'
  }
];

export const CASOS_DILEMAS: CasoDilema[] = [
  {
    id: 'caso_1',
    titulo: 'Inasistencia por Emergencia Médica',
    contexto: 'Taller de Programación de Software - Ficha 2824901',
    situacion: 'Mateo sufrió un quebranto de salud que requirió atención de urgencias y reposo médico de dos días. Al regresar al Centro de Formación, ¿cuál es el procedimiento correcto que debe seguir según el Reglamento del Aprendiz?',
    opciones: [
      {
        id: 'c1_a',
        texto: 'Esperar a final de mes para entregar la incapacidad médica cuando el instructor pase las notas definitivas.',
        esCorrecta: false,
        retroalimentacion: 'Incorrecto. El reglamento fija un término estricto de máximo 3 días hábiles tras ocurrir la inasistencia. Pasado ese tiempo, la falta queda sin justificar.',
        normaAsociada: 'Artículo 8, Numeral 5: Justificación de inasistencias dentro de 3 días hábiles.'
      },
      {
        id: 'c1_b',
        texto: 'Radicar la incapacidad médica formalmente ante el instructor y coordinación académica dentro de los 3 días hábiles siguientes.',
        esCorrecta: true,
        retroalimentacion: '¡Excelente! Este es el procedimiento exacto estipulado en el reglamento. Así se reprograman las entregas y no se computa como deserción.',
        normaAsociada: 'Artículo 8, Numeral 5 y Artículo 22: Procedimiento de justificación con soporte válido.'
      },
      {
        id: 'c1_c',
        texto: 'Pedirle a un compañero que firme la planilla de asistencia en su nombre para que no se note la falta.',
        esCorrecta: false,
        retroalimentacion: 'Incorrecto. Suplantar firmas o falsear planillas constituye una falta disciplinaria y académica grave.',
        normaAsociada: 'Artículo 9: Prohibición de fraude y suplantación.'
      }
    ]
  },
  {
    id: 'caso_2',
    titulo: 'Daño Accidental de un Equipo en Taller',
    contexto: 'Ambiente de Mantenimiento Electrónico',
    situacion: 'Durante una práctica de laboratorio, Daniela conecta accidentalmente una fuente de voltaje invertida y el osciloscopio emite un zumbido y se apaga. ¿Cómo debe actuar Daniela?',
    opciones: [
      {
        id: 'c2_a',
        texto: 'Desconectar el equipo silenciosamente, dejarlo en su lugar y cambiarse a otra mesa para no asumir culpas.',
        esCorrecta: false,
        retroalimentacion: 'Incorrecto. Ocultar el incidente atenta contra el valor de la honestidad y puede poner en peligro a otro compañero que use el equipo averiado.',
        normaAsociada: 'Valores institucionales de Honestidad y Diligencia.'
      },
      {
        id: 'c2_b',
        texto: 'Avisar de inmediato al instructor técnico, explicar con total honestidad lo ocurrido para activar el protocolo de mantenimiento.',
        esCorrecta: true,
        retroalimentacion: '¡Correcto! Informar con sinceridad permite revisar el fusible o circuito con seguridad. Los accidentes en ambientes de aprendizaje se manejan pedagógicamente.',
        normaAsociada: 'Artículo 8, Numeral 9: Cuidado y reporte inmediato de novedades en bienes institucionales.'
      },
      {
        id: 'c2_c',
        texto: 'Intentar desarmar el osciloscopio por su cuenta con un destornillador para ver si lo repara antes de que el instructor lo note.',
        esCorrecta: false,
        retroalimentacion: 'Incorrecto. La manipulación no autorizada de equipos técnicos sin supervisión viola las normas de seguridad del ambiente.',
        normaAsociada: 'Normas de Seguridad y Salud en el Trabajo (SST).'
      }
    ]
  },
  {
    id: 'caso_3',
    titulo: 'Oferta de Empleo antes de Culminar Etapa Lectiva',
    contexto: 'Ficha de Gestión Empresarial - Mes 5 de Lectiva',
    situacion: 'Carlos recibe una oferta para trabajar tiempo completo en una empresa. Él desea saber si puede abandonar las clases de la etapa lectiva e iniciar de inmediato su etapa productiva.',
    opciones: [
      {
        id: 'c3_a',
        texto: 'Sí, siempre que le pague un arancel al Centro de Formación para convalidar las clases restantes.',
        esCorrecta: false,
        retroalimentacion: 'Incorrecto. Todos los servicios del SENA son 100% gratuitos y la formación requiere cumplir el 100% de los resultados de aprendizaje lectivos.',
        normaAsociada: 'Principios de gratuidad y requisitos de transición de etapa.'
      },
      {
        id: 'c3_b',
        texto: 'No. Para iniciar la Etapa Productiva formalmente es requisito indispensable haber aprobado el 100% de los resultados de aprendizaje de la Etapa Lectiva.',
        esCorrecta: true,
        retroalimentacion: '¡Muy bien! La etapa lectiva brinda las competencias teóricas y procedimentales obligatorias antes de ingresar al mundo productivo real.',
        normaAsociada: 'Acuerdo 2026 (Reglamento del Aprendiz SENA vigente): Requisitos para el desarrollo de la Etapa Productiva.'
      },
      {
        id: 'c3_c',
        texto: 'Puede simplemente dejar de ir a clases y pedirle a la empresa que le envíe el certificado al finalizar el año.',
        esCorrecta: false,
        retroalimentacion: 'Incorrecto. Si deja de asistir sin justificación por más de 3 días continuos, se inicia el proceso de deserción de la matrícula.',
        normaAsociada: 'Artículo 22: Declaratoria de deserción del proceso formativo.'
      }
    ]
  }
];

export const PREGUNTAS_EVALUACION: PreguntaEvaluacion[] = [
  {
    id: 'p_1',
    modulo: 'identidad',
    enunciado: '¿Cuáles son los tres sectores económicos de Colombia representados en el escudo oficial del SENA?',
    opciones: [
      { id: 'p1_a', texto: 'Industria/Construcción, Comercio/Servicios y Sector Primario/Agropecuario.' },
      { id: 'p1_b', texto: 'Minería, Banca financiera y Transporte aéreo.' },
      { id: 'p1_c', texto: 'Educación superior, Diplomacia y Salud pública.' },
      { id: 'p1_d', texto: 'Tecnología digital, Telecomunicaciones y Turismo únicamente.' }
    ],
    opcionCorrectaId: 'p1_a',
    explicacionPedagogica: 'El escudo del SENA integra el piñón (Industria y Construcción), el caduceo (Comercio y Servicios) y la espiga de trigo/café (Agropecuario y Primario).',
    articuloReferencia: 'Identidad Institucional SENA - Símbolos Oficiales'
  },
  {
    id: 'p_2',
    modulo: 'identidad',
    enunciado: '¿Qué representa la figura humana estilizada en el logosímbolo institucional del SENA?',
    opciones: [
      { id: 'p2_a', texto: 'Un atleta olímpico cruzando la meta nacional.' },
      { id: 'p2_b', texto: 'El aprendiz caminando hacia adelante por el sendero del conocimiento y la superación.' },
      { id: 'p2_c', texto: 'Una señal de tránsito que indica zonas de talleres industriales.' },
      { id: 'p2_d', texto: 'La unión de las regiones geográficas de Colombia en un compás.' }
    ],
    opcionCorrectaId: 'p2_b',
    explicacionPedagogica: 'El logosímbolo muestra al ser humano en avance constante hacia el futuro, proyectándose mediante la formación profesional integral.',
    articuloReferencia: 'Manual de Imagen Corporativa SENA'
  },
  {
    id: 'p_3',
    modulo: 'identidad',
    enunciado: '¿Cuál es el valor institucional que nos invita a actuar siempre con fundamento en la verdad y sin buscar ventajas indebidas?',
    opciones: [
      { id: 'p3_a', texto: 'Honestidad' },
      { id: 'p3_b', texto: 'Velocidad' },
      { id: 'p3_c', texto: 'Ambición' },
      { id: 'p3_d', texto: 'Competitividad' }
    ],
    opcionCorrectaId: 'p3_a',
    explicacionPedagogica: 'La honestidad es uno de los valores fundamentales del Código de Integridad SENA: obrar con rectitud, transparencia y veracidad.',
    articuloReferencia: 'Código de Integridad del SENA'
  },
  {
    id: 'p_4',
    modulo: 'derechos',
    enunciado: 'Ante una presunta falta disciplinaria, ¿qué derecho fundamental protege al aprendiz antes de cualquier sanción?',
    opciones: [
      { id: 'p4_a', texto: 'El derecho al olvido sin investigación.' },
      { id: 'p4_b', texto: 'El derecho al debido proceso, a ser escuchado en descargos y a presentar pruebas.' },
      { id: 'p4_c', texto: 'El derecho a elegir qué sanción prefiere cumplir.' },
      { id: 'p4_d', texto: 'El derecho a vetar a los instructores del comité.' }
    ],
    opcionCorrectaId: 'p4_b',
    explicacionPedagogica: 'El debido proceso garantiza que todo aprendiz sea citado a Comité de Evaluación y Seguimiento, exponga sus razones y allegue evidencias antes de determinarse una medida.',
    articuloReferencia: 'Reglamento del Aprendiz - Artículo 7, Numeral 4'
  },
  {
    id: 'p_5',
    modulo: 'derechos',
    enunciado: '¿Cuál de los siguientes es un beneficio que ofrece el programa de Bienestar al Aprendiz en el SENA?',
    opciones: [
      { id: 'p5_a', texto: 'Prestamos bancarios comerciales sin intereses.' },
      { id: 'p5_b', texto: 'Actividades de salud, cultura, deporte, liderazgo y convocatorias de apoyos de sostenimiento.' },
      { id: 'p5_c', texto: 'Aprobación automática de resultados sin entregar evidencias.' },
      { id: 'p5_d', texto: 'Exención de cumplir con el horario de formación en temporada festiva.' }
    ],
    opcionCorrectaId: 'p5_b',
    explicacionPedagogica: 'Bienestar al Aprendiz acompaña el desarrollo biopsicosocial con talleres de salud, recreación, torneos deportivos, arte y convocatorias de apoyo socioeconómico.',
    articuloReferencia: 'Reglamento del Aprendiz - Artículo 7, Numeral 3'
  },
  {
    id: 'p_6',
    modulo: 'deberes',
    enunciado: '¿Dónde y cómo debe portarse el carné institucional dentro de las sedes del SENA?',
    opciones: [
      { id: 'p6_a', texto: 'En un lugar visible de la parte superior del cuerpo en todo momento.' },
      { id: 'p6_b', texto: 'Guardado en la billetera o maletín hasta el día de la graduación.' },
      { id: 'p6_c', texto: 'Solo es obligatorio mostrarlo el primer día de inducción.' },
      { id: 'p6_d', texto: 'Pegado en el cuaderno de apuntes del aprendiz.' }
    ],
    opcionCorrectaId: 'p6_a',
    explicacionPedagogica: 'El porte visible del carné es un deber de seguridad institucional para salvaguardar la integridad de toda la comunidad del Centro.',
    articuloReferencia: 'Reglamento del Aprendiz - Artículo 8, Numeral 1'
  },
  {
    id: 'p_7',
    modulo: 'deberes',
    enunciado: 'Si un aprendiz presenta una inasistencia imprevista, ¿cuál es el plazo reglamentario máximo para presentar su justificación formal?',
    opciones: [
      { id: 'p7_a', texto: 'Dentro de los 3 días hábiles siguientes al hecho.' },
      { id: 'p7_b', texto: 'Al finalizar el trimestre lectivo.' },
      { id: 'p7_c', texto: 'En un plazo máximo de 30 días calendario.' },
      { id: 'p7_d', texto: 'No es necesario justificar si el aprendiz avisa por mensaje de texto a un amigo.' }
    ],
    opcionCorrectaId: 'p7_a',
    explicacionPedagogica: 'El Artículo 8 numeral 5 establece que las justificaciones deben radicarse por escrito con su respectivo soporte dentro de los tres (3) días hábiles siguientes.',
    articuloReferencia: 'Reglamento del Aprendiz - Artículo 8, Numeral 5'
  },
  {
    id: 'p_8',
    modulo: 'deberes',
    enunciado: '¿Qué consecuencia inmediata acarrea el plagio de una evidencia de aprendizaje en el SENA?',
    opciones: [
      { id: 'p8_a', texto: 'Ninguna, porque en internet la información es de uso público.' },
      { id: 'p8_b', texto: 'Se califica con felicitación por habilidad de búsqueda.' },
      { id: 'p8_c', texto: 'Se considera falta académica y disciplinaria, con remisión a Comité de Evaluación y aplicación de medidas formativas o sancionatorias.' },
      { id: 'p8_d', texto: 'Solo se le pide al aprendiz que cambie el título de la portada.' }
    ],
    opcionCorrectaId: 'p8_c',
    explicacionPedagogica: 'El plagio vulnera la propiedad intelectual, distorsiona la evaluación del resultado y es considerado falta con mérito disciplinario.',
    articuloReferencia: 'Reglamento del Aprendiz - Prohibiciones y Faltas'
  },
  {
    id: 'p_9',
    modulo: 'etapas_formacion',
    enunciado: '¿Cuáles son las dos grandes etapas secuenciales de los programas de formación titulada en el SENA?',
    opciones: [
      { id: 'p9_a', texto: 'Etapa Lectiva y Etapa Productiva.' },
      { id: 'p9_b', texto: 'Etapa Primaria y Etapa Secundaria.' },
      { id: 'p9_c', texto: 'Etapa Teórica y Etapa de Vacaciones.' },
      { id: 'p9_d', texto: 'Etapa Escolar y Etapa Universitaria.' }
    ],
    opcionCorrectaId: 'p9_a',
    explicacionPedagogica: 'La estructura de formación SENA contempla la Etapa Lectiva (apropiación de competencias) y la Etapa Productiva (aplicación en el entorno laboral real).',
    articuloReferencia: 'Modelo Pedagógico de la Formación Profesional Integral'
  },
  {
    id: 'p_10',
    modulo: 'etapas_formacion',
    enunciado: '¿Cuál de las siguientes es una alternativa válida y reconocida para desarrollar la Etapa Productiva?',
    opciones: [
      { id: 'p10_a', texto: 'Contrato de Aprendizaje, Vínculo Laboral o Proyecto Productivo SENA.' },
      { id: 'p10_b', texto: 'Ver videos en redes sociales desde la casa durante seis meses.' },
      { id: 'p10_c', texto: 'Comprar un certificado laboral en una empresa ficticia.' },
      { id: 'p10_d', texto: 'Asistir únicamente a los eventos recreativos del centro.' }
    ],
    opcionCorrectaId: 'p10_a',
    explicacionPedagogica: 'Las alternativas oficiales incluyen: Contrato de Aprendizaje, Convenio de Pasantía, Vínculo Laboral relacionado, Proyecto Productivo SENA y Monitorías.',
    articuloReferencia: 'Reglamento del Aprendiz - Alternativas de Etapa Productiva'
  },
  {
    id: 'p_11',
    modulo: 'bienestar_y_tramites',
    enunciado: '¿Cuál es la escala de calificación oficial utilizada por el SENA para evaluar los resultados de aprendizaje?',
    opciones: [
      { id: 'p11_a', texto: 'Numérica de 1.0 a 5.0 como en colegios tradicionales.' },
      { id: 'p11_b', texto: 'Aprobado (A) o No Aprobado (D).' },
      { id: 'p11_c', texto: 'Letras de la A a la F como en el sistema anglosajón.' },
      { id: 'p11_d', texto: 'Porcentaje en estrellas de 1 a 5.' }
    ],
    opcionCorrectaId: 'p11_b',
    explicacionPedagogica: 'La formación por competencias en el SENA evalúa si el aprendiz alcanzó o no el resultado esperado: A (Aprobado) o D (Deficiente / No Aprobado con plan de mejoramiento).',
    articuloReferencia: 'Reglamento del Aprendiz - Evaluación de los Aprendizajes'
  },
  {
    id: 'p_12',
    modulo: 'bienestar_y_tramites',
    enunciado: '¿Qué es un Plan de Mejoramiento en el contexto formativo del SENA?',
    opciones: [
      { id: 'p12_a', texto: 'Una sanción económica con multa que debe pagarse al banco.' },
      { id: 'p12_b', texto: 'Una medida pedagógica formativa concertada para superar resultados de aprendizaje no alcanzados o corregir conductas.' },
      { id: 'p12_c', texto: 'Una expulsión definitiva sin derecho a reingreso.' },
      { id: 'p12_d', texto: 'Un cambio forzoso de Centro de Formación a otra ciudad.' }
    ],
    opcionCorrectaId: 'p12_b',
    explicacionPedagogica: 'El Plan de Mejoramiento es una oportunidad pedagógica concertada con el instructor para que el aprendiz alcance la competencia antes de emitir un juicio definitivo.',
    articuloReferencia: 'Reglamento del Aprendiz - Medidas Formativas'
  },
  {
    id: 'p_13',
    modulo: 'novedades_y_desercion',
    enunciado: '¿Cuántos días hábiles consecutivos de inasistencia injustificada dan inicio al procedimiento de declaratoria de deserción?',
    opciones: [
      { id: 'p13_a', texto: 'Tres (3) días hábiles consecutivos.' },
      { id: 'p13_b', texto: 'Quince (15) días hábiles consecutivos.' },
      { id: 'p13_c', texto: 'Un (1) mes calendario completo.' },
      { id: 'p13_d', texto: 'No existe causal de deserción por inasistencia.' }
    ],
    opcionCorrectaId: 'p13_a',
    explicacionPedagogica: 'El reglamento estipula que tres (3) días hábiles continuos de inasistencia sin justificación válida activan el requerimiento de deserción, otorgando cinco (5) días hábiles al aprendiz para presentar descargos.',
    articuloReferencia: 'Reglamento del Aprendiz (Acuerdo 2026) - Causales de Deserción'
  },
  {
    id: 'p_14',
    modulo: 'novedades_y_desercion',
    enunciado: '¿Cuál es el tiempo máximo reglamentario por el cual un aprendiz puede solicitar el aplazamiento de su formación?',
    opciones: [
      { id: 'p14_a', texto: 'Hasta por seis (6) meses calendarios, prorrogables por una sola vez hasta por seis (6) meses más por justa causa.' },
      { id: 'p14_b', texto: 'Máximo quince (15) días hábiles no renovables.' },
      { id: 'p14_c', texto: 'De manera indefinida hasta que el aprendiz desee regresar.' },
      { id: 'p14_d', texto: 'Tres (3) años continuos.' }
    ],
    opcionCorrectaId: 'p14_a',
    explicacionPedagogica: 'El aplazamiento se concede por un periodo máximo de seis (6) meses continuos o discontinuos, prorrogables por una sola vez hasta por 6 meses adicionales; salvo situaciones de servicio militar o incapacidad médica prolongada.',
    articuloReferencia: 'Reglamento del Aprendiz - Trámites y Novedades del Aprendiz'
  },
  {
    id: 'p_15',
    modulo: 'debido_proceso',
    enunciado: 'De acuerdo con el Reglamento del Aprendiz vigente (Acuerdo 2026, Art. 48), ¿cuál es el rol fundamental del Vocero de Ficha en las sesiones del Comité de Evaluación y Seguimiento?',
    opciones: [
      { id: 'p15_a', texto: 'Participar activamente con voz en las deliberaciones para garantizar la representación estudiantil, objetividad y el debido proceso.' },
      { id: 'p15_b', texto: 'Actuar como juez único y dictar la sanción económica aplicable.' },
      { id: 'p15_c', texto: 'Reemplazar al Subdirector de Centro en la firma de resoluciones.' },
      { id: 'p15_d', texto: 'Asistir solo como observador silencioso sin derecho a intervenir.' }
    ],
    opcionCorrectaId: 'p15_a',
    explicacionPedagogica: 'El Acuerdo 2026 (que sustituye y deroga el anterior Acuerdo 007 de 2012) consagra la participación del vocero de ficha con voz en el comité colegiado, garantizando enfoque pedagógico restaurativo, transparencia y defensa de la comunidad de aprendices.',
    articuloReferencia: 'Acuerdo 2026 (Artículo 48: Debido Proceso, Garantías y Comité de Evaluación)'
  },
  {
    id: 'p_16',
    modulo: 'etapas_formacion',
    enunciado: '¿Cuáles son los tres tipos de evidencias que el aprendiz debe recopilar y demostrar para la evaluación integral de sus competencias?',
    opciones: [
      { id: 'p16_a', texto: 'Evidencias de Conocimiento (saber), de Desempeño (hacer/ser) y de Producto (resultado tangible/entregable).' },
      { id: 'p16_b', texto: 'Evidencias de Asistencia, de Uniforme y de Carné.' },
      { id: 'p16_c', texto: 'Evidencias de Pago bancario, de Matrícula y de Seguro escolar.' },
      { id: 'p16_d', texto: 'Evidencias Fotográficas, de Redes Sociales y de Correos electrónicos.' }
    ],
    opcionCorrectaId: 'p16_a',
    explicacionPedagogica: 'El modelo pedagógico del SENA evalúa integralmente el saber (conocimiento), el saber hacer (desempeño en tiempo real) y el resultado aplicativo materializado (producto entregado).',
    articuloReferencia: 'Reglamento del Aprendiz - Evaluación de los Aprendizajes y Evidencias'
  },
  {
    id: 'p_17',
    modulo: 'fpi_y_pedagogia',
    enunciado: 'En el marco de la Formación Profesional Integral (FPI), ¿qué significa el principio de integralidad pedagógica?',
    opciones: [
      { id: 'p17_a', texto: 'Articular armónicamente el conocimiento técnico (saber), las destrezas operativas (hacer) y la dimensión ética-humana (ser y convivir).' },
      { id: 'p17_b', texto: 'Aprender únicamente teorías matemáticas sin realizar prácticas en taller.' },
      { id: 'p17_c', texto: 'Aprobar todas las materias sin asistir a los ambientes de aprendizaje.' },
      { id: 'p17_d', texto: 'Memorizar los manuales de los fabricantes al pie de la letra.' }
    ],
    opcionCorrectaId: 'p17_a',
    explicacionPedagogica: 'La FPI concibe al aprendiz no solo como una fuerza laboral técnica, sino como un ciudadano integral con pensamiento crítico, valores éticos y compromiso social con su país.',
    articuloReferencia: 'Estatuto de la Formación Profesional Integral del SENA'
  },
  {
    id: 'p_18',
    modulo: 'fpi_y_pedagogia',
    enunciado: '¿Cuál es el orden secuencial de las cuatro fases pedagógicas que componen un Proyecto Formativo en el SENA?',
    opciones: [
      { id: 'p18_a', texto: '1. Análisis · 2. Planeación · 3. Ejecución · 4. Evaluación.' },
      { id: 'p18_b', texto: '1. Ejecución · 2. Cobro · 3. Descanso · 4. Evaluación.' },
      { id: 'p18_c', texto: '1. Matrícula · 2. Carnetización · 3. Grado · 4. Trabajo.' },
      { id: 'p18_d', texto: '1. Examen · 2. Taller · 3. Falla · 4. Reposición.' }
    ],
    opcionCorrectaId: 'p18_a',
    explicacionPedagogica: 'Todo proyecto formativo SENA sigue la secuencia metodológica: Análisis (diagnóstico del problema), Planeación (diseño de la solución), Ejecución (desarrollo técnico en taller) y Evaluación (validación y sustentación).',
    articuloReferencia: 'Guía de Desarrollo Curricular del SENA'
  },
  {
    id: 'p_19',
    modulo: 'bienestar_y_tramites',
    enunciado: '¿Cuál es el objetivo principal del Apoyo de Sostenimiento (Regular y FIC) gestionado por Bienestar al Aprendiz?',
    opciones: [
      { id: 'p19_a', texto: 'Contribuir al sostenimiento económico básico (transporte y manutención) para mitigar factores de deserción en aprendices de estratos 1 y 2.' },
      { id: 'p19_b', texto: 'Pagar las vacaciones turísticas del aprendiz al final del año.' },
      { id: 'p19_c', texto: 'Comprar vestuario de fiesta para eventos sociales.' },
      { id: 'p19_d', texto: 'Reemplazar el salario mínimo legal vigente de una empresa.' }
    ],
    opcionCorrectaId: 'p19_a',
    explicacionPedagogica: 'Los apoyos de sostenimiento son auxilios económicos estatales no constitutivos de salario orientados a garantizar la permanencia y culminación exitosa de aprendices en situación de vulnerabilidad.',
    articuloReferencia: 'Plan Nacional Integral de Bienestar al Aprendiz'
  },
  {
    id: 'p_20',
    modulo: 'herramientas_y_canales',
    enunciado: '¿Cuál es la función principal de la plataforma Zajuna LMS frente al sistema Sofia Plus en tu proceso diario de aprendizaje?',
    opciones: [
      { id: 'p20_a', texto: 'Zajuna es el aula virtual para descargar guías, participar en foros y subir evidencias; mientras Sofia Plus administra la matrícula, notas y certificaciones.' },
      { id: 'p20_b', texto: 'Zajuna es una red social de entretenimiento y Sofia Plus es un videojuego.' },
      { id: 'p20_c', texto: 'Ambas plataformas son idénticas y solo se debe usar una de ellas.' },
      { id: 'p20_d', texto: 'Zajuna solo se usa una vez al graduarse y Sofia Plus es para pedir almuerzo.' }
    ],
    opcionCorrectaId: 'p20_a',
    explicacionPedagogica: 'Zajuna es el ambiente virtual de aprendizaje interactivo (LMS) donde transcurre la formación pedagógica diaria, mientras que Sofia Plus es el sistema administrativo de registro y control académico.',
    articuloReferencia: 'Ecosistema Tecnológico del SENA'
  },
  {
    id: 'p_21',
    modulo: 'herramientas_y_canales',
    enunciado: 'Si tienes una inquietud o dificultad con la calificación de una evidencia de aprendizaje, ¿cuál es el primer paso según el conducto regular institucional?',
    opciones: [
      { id: 'p21_a', texto: 'Dialogar concertadamente con el Instructor técnico responsable de la competencia o el Instructor Líder de Ficha.' },
      { id: 'p21_b', texto: 'Enviar directamente una tutela al Presidente de la República.' },
      { id: 'p21_c', texto: 'Publicar quejas en grupos informales de redes sociales sin hablar con el docente.' },
      { id: 'p21_d', texto: 'Dejar de asistir al Centro de Formación sin avisar a nadie.' }
    ],
    opcionCorrectaId: 'p21_a',
    explicacionPedagogica: 'El conducto regular exige agotar en primer término el diálogo constructivo y formativo directo con el instructor de la competencia antes de escalar a coordinación académica o comités.',
    articuloReferencia: 'Conducto Regular Institucional y Reglamento del Aprendiz'
  }
];


export const FICHAS_MUESTRA: FichaCaract[] = [
  {
    id: 'f_2824901',
    numero: '2824901',
    programa: 'Análisis y Desarrollo de Software (ADSO)',
    nivel: 'Tecnólogo',
    centro: 'Centro de Electricidad, Electrónica y Telecomunicaciones (CEET)',
    regional: 'Regional Distrito Capital',
    instructorLider: 'Ing. Carlos Alberto Morales',
    totalAprendices: 28
  },
  {
    id: 'f_2831005',
    numero: '2831005',
    programa: 'Gestión Empresarial y Comercial',
    nivel: 'Tecnólogo',
    centro: 'Centro de Gestión de Mercados, Logística y Tecnologías de la Información',
    regional: 'Regional Antioquia',
    instructorLider: 'Dra. Marcela Restrepo Gómez',
    totalAprendices: 32
  },
  {
    id: 'f_2845612',
    numero: '2845612',
    programa: 'Mantenimiento Mecatrónico de Automotores',
    nivel: 'Técnico',
    centro: 'Centro de Tecnologías del Transporte',
    regional: 'Regional Cundinamarca',
    instructorLider: 'Mtro. Hernán Jaramillo',
    totalAprendices: 24
  }
];

export const APRENDICES_INICIALES: Aprendiz[] = [
  {
    id: 'apr_1',
    nombre: 'Valeria Sofía Martínez Rico',
    documento: '1014289341',
    tipoDocumento: 'CC',
    correo: 'vsmartinez41@soy.sena.edu.co',
    telefono: '3158742291',
    fichaId: 'f_2824901',
    fichaNumero: '2824901',
    programaFormacion: 'Análisis y Desarrollo de Software (ADSO)',
    regional: 'Regional Distrito Capital',
    centroFormacion: 'Centro de Electricidad, Electrónica y Telecomunicaciones (CEET)',
    jornada: 'Diurna',
    progresoInduccion: 100,
    modulosCompletados: ['identidad', 'derechos_deberes', 'casos_practicos', 'evaluacion'],
    estadoEvaluacion: 'Aprobado',
    calificacionEvaluacion: 92,
    fechaCompletado: '2024-11-15',
    codigoCertificado: 'SENA-REG-2026-94812B'
  },
  {
    id: 'apr_2',
    nombre: 'Juan David Henao Ospina',
    documento: '1020491823',
    tipoDocumento: 'CC',
    correo: 'jdhenao23@soy.sena.edu.co',
    telefono: '3114920033',
    fichaId: 'f_2824901',
    fichaNumero: '2824901',
    programaFormacion: 'Análisis y Desarrollo de Software (ADSO)',
    regional: 'Regional Distrito Capital',
    centroFormacion: 'Centro de Electricidad, Electrónica y Telecomunicaciones (CEET)',
    jornada: 'Diurna',
    progresoInduccion: 65,
    modulosCompletados: ['identidad', 'derechos_deberes'],
    estadoEvaluacion: 'No iniciada',
    calificacionEvaluacion: undefined
  },
  {
    id: 'apr_3',
    nombre: 'Camila Andrea Torres Pardo',
    documento: '1033819445',
    tipoDocumento: 'TI',
    correo: 'catorres45@soy.sena.edu.co',
    telefono: '3203918844',
    fichaId: 'f_2824901',
    fichaNumero: '2824901',
    programaFormacion: 'Análisis y Desarrollo de Software (ADSO)',
    regional: 'Regional Distrito Capital',
    centroFormacion: 'Centro de Electricidad, Electrónica y Telecomunicaciones (CEET)',
    jornada: 'Diurna',
    progresoInduccion: 100,
    modulosCompletados: ['identidad', 'derechos_deberes', 'casos_practicos', 'evaluacion'],
    estadoEvaluacion: 'Aprobado',
    calificacionEvaluacion: 100,
    fechaCompletado: '2024-11-18',
    codigoCertificado: 'SENA-REG-2026-33910A'
  },
  {
    id: 'apr_4',
    nombre: 'Mateo Alejandro Forero Cárdenas',
    documento: '1019284711',
    tipoDocumento: 'CC',
    correo: 'maforero11@soy.sena.edu.co',
    telefono: '3007849122',
    fichaId: 'f_2831005',
    fichaNumero: '2831005',
    programaFormacion: 'Gestión Empresarial y Comercial',
    regional: 'Regional Antioquia',
    centroFormacion: 'Centro de Gestión de Mercados, Logística y Tecnologías de la Información',
    jornada: 'Nocturna',
    progresoInduccion: 80,
    modulosCompletados: ['identidad', 'derechos_deberes', 'casos_practicos', 'evaluacion'],
    estadoEvaluacion: 'No aprobado',
    calificacionEvaluacion: 67,
    fechaCompletado: '2024-11-18'
  },
  {
    id: 'apr_5',
    nombre: 'Laura Daniela Salamanca Cruz',
    documento: '1024883190',
    tipoDocumento: 'CC',
    correo: 'ldsalamanca90@soy.sena.edu.co',
    telefono: '3189920144',
    fichaId: 'f_2831005',
    fichaNumero: '2831005',
    programaFormacion: 'Gestión Empresarial y Comercial',
    regional: 'Regional Antioquia',
    centroFormacion: 'Centro de Gestión de Mercados, Logística y Tecnologías de la Información',
    jornada: 'Nocturna',
    progresoInduccion: 100,
    modulosCompletados: ['identidad', 'derechos_deberes', 'casos_practicos', 'evaluacion'],
    estadoEvaluacion: 'Aprobado',
    calificacionEvaluacion: 85,
    fechaCompletado: '2024-11-16',
    codigoCertificado: 'SENA-REG-2026-11849C'
  },
  {
    id: 'apr_6',
    nombre: 'Santiago David Rodríguez Peña',
    documento: '1017384992',
    tipoDocumento: 'TI',
    correo: 'sdrodriguez92@soy.sena.edu.co',
    telefono: '3128913344',
    fichaId: 'f_2845612',
    fichaNumero: '2845612',
    programaFormacion: 'Mantenimiento Mecatrónico de Automotores',
    regional: 'Regional Cundinamarca',
    centroFormacion: 'Centro de Tecnologías del Transporte',
    jornada: 'Mixta',
    progresoInduccion: 35,
    modulosCompletados: ['identidad'],
    estadoEvaluacion: 'No iniciada',
    calificacionEvaluacion: undefined
  }
];

export const COMPARATIVO_ACUERDOS_SENA: ItemComparativoAcuerdo[] = [
  {
    tema: 'Estatus Jurídico y Vigencia',
    acuerdo007_2012: 'Reglamento anterior expedido en 2012. Tenía múltiples modificaciones dispersas que dificultaban su consulta.',
    acuerdo2026: 'Reglamento del Aprendiz ÚNICO VIGENTE (Acuerdo 2026). Deroga expresamente el Acuerdo 007 de 2012, unificando toda la doctrina institucional a nivel nacional.',
    mejoraOModificacion: 'Derogatoria formal de la norma de 2012 y unificación en el nuevo cuerpo legal reglamentario vigente 2026.',
    icono: 'Scale'
  },
  {
    tema: 'Prevención de Violencias Basadas en Género y Acoso',
    acuerdo007_2012: 'No contenía disposiciones específicas ni protocolos articulados contra el acoso sexual o discriminación de género en ambientes formativos.',
    acuerdo2026: 'El Acuerdo 2026 tipifica como falta gravísima cualquier conducta de acoso sexual o violencia de género, activando ruta de atención prioritaria y no revictimización.',
    mejoraOModificacion: 'Protección integral de los derechos humanos, entornos formativos seguros y perspectiva de género en todos los centros.',
    icono: 'ShieldCheck'
  },
  {
    tema: 'Debido Proceso y Notificaciones Digitales',
    acuerdo007_2012: 'Procedimiento genérico basado principalmente en citaciones físicas sin términos claros para medios electrónicos o LMS.',
    acuerdo2026: 'El Acuerdo 2026 reglamenta el debido proceso con citación formal mínima de tres (3) días hábiles por correo institucional (@soy.sena.edu.co) y plataformas con trazabilidad.',
    mejoraOModificacion: 'Seguridad jurídica total, validez de comunicaciones electrónicas y garantía del derecho a la defensa y contradicción.',
    icono: 'FileText'
  },
  {
    tema: 'Participación del Vocero de Ficha en Comités',
    acuerdo007_2012: 'La intervención del vocero en comités disciplinarios era opcional o limitada a consulta de los instructores.',
    acuerdo2026: 'El Acuerdo 2026 garantiza por mandato expreso que el Vocero de Ficha participe con voz en las deliberaciones del Comité de Evaluación y Seguimiento.',
    mejoraOModificacion: 'Representatividad estudiantil efectiva y democratización de los espacios de evaluación disciplinaria.',
    icono: 'Users'
  },
  {
    tema: 'Enfoque Formativo Restaurativo vs. Punitivo',
    acuerdo007_2012: 'Tendencia sancionatoria directa donde las faltas conducían rápidamente a condicionamiento o cancelación de matrícula.',
    acuerdo2026: 'El Acuerdo 2026 obliga a agotar previamente medidas formativas pedagógicas y planes de mejoramiento concertados antes de aplicar cualquier sanción.',
    mejoraOModificacion: 'Prioridad al aprendizaje y a la corrección pedagógica restaurativa sobre el castigo punitivo.',
    icono: 'Sparkles'
  },
  {
    tema: 'Causales de Deserción y Plazos de Justificación',
    acuerdo007_2012: 'Reglas de inasistencia rígidas que no diferenciaban con claridad entre formación presencial, virtual y a distancia.',
    acuerdo2026: 'El Acuerdo 2026 define: 3 días hábiles consecutivos en presencialidad o 10 días de inactividad en LMS sin causa justificada, con 5 días hábiles para presentar descargos.',
    mejoraOModificacion: 'Criterios objetivos ajustados a las modalidades virtuales (plataforma Zajuna) y respeto a causas justificadas demostradas.',
    icono: 'Clock'
  },
  {
    tema: 'Trámites y Novedades Académicas',
    acuerdo007_2012: 'Plazos y causales de aplazamiento poco flexibles; trámites manuales que podían tardar semanas en resolverse.',
    acuerdo2026: 'El Acuerdo 2026 estandariza las novedades de matrícula: aplazamiento de hasta 6 meses con prórroga de hasta 6 meses más con justa causa, y reingreso 15 días hábiles antes.',
    mejoraOModificacion: 'Agilidad administrativa, preservación del cupo del aprendiz y radicación digital en el sistema de gestión académica.',
    icono: 'Layers'
  },
  {
    tema: 'Segunda Instancia y Recursos Legales',
    acuerdo007_2012: 'Reglas de notificación de resoluciones con términos a veces confusos entre días calendario y días hábiles.',
    acuerdo2026: 'El Acuerdo 2026 fija de manera taxativa que contra el acto administrativo de sanción procede el Recurso de Reposición en cinco (5) días hábiles siguientes a la notificación.',
    mejoraOModificacion: 'Claridad en los términos procesales para interponer recursos y evitar nulidades administrativas.',
    icono: 'CheckCircle2'
  }
];


