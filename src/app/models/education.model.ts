/**
 * ARCHIVO: src/app/models/education.model.ts
 *
 * DESCRIPCIÓN:
 * Modelo de datos para la formación académica de Alejandro Villa.
 * Incluye educación formal, cursos reales y formación continua.
 * Enfatiza el título de Ingeniero Informático (2025) que formaliza
 * años de experiencia práctica previa, sin inflar cifras.
 */

/**
 * Interfaz principal para formación educativa
 */
export interface Education {
  /** ID único de la formación */
  id: string;

  /** Tipo de formación (universitaria, curso, certificación, etc.) */
  type: EducationType;

  /** Título o certificación obtenida */
  title: string;

  /** Institución educativa */
  institution: string;

  /** Fechas de la formación (inicio, fin, duración) */
  dates: EducationDates;

  /** Estado de la formación (completado, en progreso, planificado) */
  status: EducationStatus;

  /** Descripción breve de la formación */
  description: string;

  /** Competencias o habilidades desarrolladas en esta formación */
  skills: string[];

  /** Proyectos destacados durante la formación (opcional) */
  projects?: string[];

  /** Calificación o distinción obtenida (opcional) */
  grade?: string;

  /** Si esta formación debe destacarse en la UI */
  featured: boolean;

  /** Orden de visualización en la interfaz */
  displayOrder: number;

  /** Ruta del logo de la institución (opcional) */
  logo?: string;

  /** URL de credencial o certificado (opcional) */
  credentialUrl?: string;
}

/**
 * Tipos de formación educativa posibles
 */
export type EducationType =
  | 'university'
  | 'technical'
  | 'certification'
  | 'course'
  | 'self-learning';

/**
 * Estados de la formación
 */
export type EducationStatus = 'completed' | 'in-progress' | 'planned';

/**
 * Fechas de la formación
 */
export interface EducationDates {
  /** Fecha de inicio de la formación */
  startDate: Date;

  /** Fecha de finalización de la formación (si aplica) */
  endDate?: Date;

  /** Duración en formato texto (ej: "5 años", "En progreso") */
  duration?: string;
}

/**
 * Formación académica principal de Alejandro Villa
 * Basada en información real (título y cursos en curso).
 */
export const ALEJANDRO_EDUCATION: Education[] = [
  {
    id: 'ingenieria-informatica-duoc',
    type: 'university',
    title: 'Ingeniero en Informática',
    institution: 'DuocUC',
    dates: {
      startDate: new Date('2020-01-01'),
      endDate: new Date('2025-01-01'),
      duration: '5 años'
    },
    status: 'completed',
    description: 'Título universitario que formaliza años de experiencia práctica previa en soporte TI, hardware y desarrollo. Más que aprender a usar computadores, consolidó herramientas de análisis de negocio, gestión de proyectos y metodologías estructuradas.',
    skills: [
      'Análisis de Sistemas',
      'Gestión de Proyectos',
      'Metodologías de Desarrollo',
      'Business Process Management',
      'Arquitectura de Software',
      'Base de Datos',
      'Ingeniería de Requerimientos',
      'Calidad de Software'
    ],
    projects: [
      'Sistema Unidad Territorial (Proyecto de Título)',
      'Proyectos académicos de análisis, diseño y desarrollo de sistemas'
    ],
    featured: true,
    displayOrder: 1,
    logo: 'assets/education/duoc-logo.png'
  },
  {
    id: 'python-fullstack-ecas',
    type: 'course',
    title: 'Python Full Stack Trainee',
    institution: 'ECAS OTEC – SENCE',
    dates: {
      startDate: new Date('2024-01-01'),
      duration: 'En progreso'
    },
    status: 'in-progress',
    description: 'Programa de formación en Python orientado a desarrollo full stack, con foco en fundamentos de programación, lógica, manejo de datos y construcción de aplicaciones web básicas.',
    skills: [
      'Fundamentos de Python',
      'Lógica de Programación',
      'Manejo de Datos',
      'Desarrollo Web Básico',
      'Buenas Prácticas de Código'
    ],
    featured: false,
    displayOrder: 2
  },
  {
    id: '.net-softserve',
    type: 'course',
    title: 'Formación en .NET',
    institution: 'Softserve (Programa de Capacitación)',
    dates: {
      startDate: new Date('2024-01-01'),
      duration: 'En progreso'
    },
    status: 'in-progress',
    description: 'Formación enfocada en fundamentos de .NET y desarrollo de aplicaciones, reforzando la base en programación orientada a objetos y ecosistema Microsoft.',
    skills: [
      'Fundamentos de .NET',
      'Programación Orientada a Objetos',
      'Ecosistema Microsoft',
      'Buenas Prácticas en Desarrollo'
    ],
    featured: false,
    displayOrder: 3
  },
  {
    id: 'autoformacion-continua',
    type: 'self-learning',
    title: 'Autoformación Continua en TI',
    institution: 'Investigación Autodidacta',
    dates: {
      startDate: new Date('2007-01-01'),
      duration: 'Más de 10 años'
    },
    status: 'in-progress',
    description: 'Formación autodidacta constante desde la adolescencia. Investigación técnica, experimentación con hardware, redes, sistemas operativos y herramientas de desarrollo, manteniéndose actualizado con tendencias tecnológicas.',
    skills: [
      'Investigación Técnica',
      'Resolución Autodidacta de Problemas',
      'Adaptabilidad Tecnológica',
      'Experimentación Práctica',
      'Análisis de Sistemas',
      'Troubleshooting Avanzado'
    ],
    featured: true,
    displayOrder: 4
  }
];

/**
 * Certificaciones y formación complementaria
 * En este momento no se declaran certificaciones formales completadas
 * para evitar información no verificable o inflada.
 *
 * Cuando tengas un certificado real (ej: cloud, ISTQB, etc.), se agrega aquí.
 */
export const CERTIFICATIONS: Education[] = [
  // Por ahora vacío, hasta tener certificaciones formales completadas.
];

/**
 * Formación planificada futura
 * Se deja vacío para no inventar formaciones específicas que aún no has definido.
 * Si decides un objetivo concreto (ej: AWS Cloud Practitioner), se puede agregar acá.
 */
export const PLANNED_EDUCATION: Education[] = [
  // Ejemplo a futuro (cuando sea real):
  // {
  //   id: 'cloud-architecture',
  //   type: 'certification',
  //   title: 'Certificación en Arquitectura Cloud',
  //   institution: 'Por definir',
  //   dates: {
  //     startDate: new Date('2025-06-01'),
  //     duration: 'Planificado'
  //   },
  //   status: 'planned',
  //   description: 'Objetivo de especialización en arquitectura de nube para ampliar competencias en infraestructura moderna.',
  //   skills: [
  //     'Cloud Architecture',
  //     'Microservices',
  //     'Container Technologies',
  //     'Cloud Security'
  //   ],
  //   featured: false,
  //   displayOrder: 1
  // }
];

/**
 * Helper functions para gestionar la educación en la aplicación
 */

/**
 * Retorna toda la formación (universitaria, cursos, certificaciones y planificada)
 * ordenada por displayOrder.
 */
export function getAllEducation(): Education[] {
  return [...ALEJANDRO_EDUCATION, ...CERTIFICATIONS, ...PLANNED_EDUCATION]
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

/**
 * Retorna la formación filtrada por tipo (university, course, certification, etc.)
 */
export function getEducationByType(type: EducationType): Education[] {
  const allEducation = getAllEducation();
  return allEducation.filter(edu => edu.type === type);
}

/**
 * Retorna solo la formación marcada como destacada
 */
export function getFeaturedEducation(): Education[] {
  return getAllEducation().filter(edu => edu.featured);
}

/**
 * Retorna la formación completada
 */
export function getCompletedEducation(): Education[] {
  return getAllEducation().filter(edu => edu.status === 'completed');
}

/**
 * Retorna la formación que está actualmente en curso
 */
export function getCurrentEducation(): Education[] {
  return getAllEducation().filter(edu => edu.status === 'in-progress');
}

/**
 * Configuración de tipos de educación para la UI (etiquetas, íconos y colores)
 */
export const EDUCATION_TYPES = [
  {
    id: 'university' as EducationType,
    name: 'Educación Universitaria',
    icon: 'school',
    color: '#6C5CE7'
  },
  {
    id: 'certification' as EducationType,
    name: 'Certificaciones',
    icon: 'ribbon',
    color: '#00CEC9'
  },
  {
    id: 'course' as EducationType,
    name: 'Cursos',
    icon: 'book',
    color: '#74B9FF'
  },
  {
    id: 'self-learning' as EducationType,
    name: 'Autoformación',
    icon: 'bulb',
    color: '#FDCB6E'
  }
];

/**
 * Resumen de formación para mostrar en la sección "About"
 */
export const EDUCATION_SUMMARY = {
  /** Resumen corto de formación universitaria */
  university: 'Ingeniero en Informática (DuocUC, 2025)',
  /** Resumen de experiencia práctica sin inflar cifras */
  practicalExperience: 'Más de 10 años de experiencia práctica en TI',
  /** Resumen de autoformación */
  selfLearning: 'Investigación técnica continua desde 2007',
  /** Foco actual de aprendizaje */
  currentFocus: 'Python y ecosistema .NET como base para proyectos futuros'
};
