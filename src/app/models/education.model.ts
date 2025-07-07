/**
 * ARCHIVO: src/app/models/education.model.ts
 * 
 * DESCRIPCIÓN:
 * Modelo de datos para la formación académica de Alejandro Villa.
 * Incluye educación formal, certificaciones y formación continua.
 * Enfatiza el título de Ingeniero Informática (2025) que formaliza
 * 20+ años de experiencia práctica previa.
 */

/**
 * Interfaz principal para formación educativa
 */
export interface Education {
  /** ID único de la formación */
  id: string;
  
  /** Tipo de formación */
  type: EducationType;
  
  /** Título o certificación obtenida */
  title: string;
  
  /** Institución educativa */
  institution: string;
  
  /** Fechas de la formación */
  dates: EducationDates;
  
  /** Estado de la formación */
  status: EducationStatus;
  
  /** Descripción de la formación */
  description: string;
  
  /** Competencias desarrolladas */
  skills: string[];
  
  /** Proyectos destacados durante la formación */
  projects?: string[];
  
  /** Calificación o distinción obtenida */
  grade?: string;
  
  /** Si es formación destacada */
  featured: boolean;
  
  /** Orden de visualización */
  displayOrder: number;
  
  /** Logo de la institución */
  logo?: string;
  
  /** Credencial o certificado URL */
  credentialUrl?: string;
}

/**
 * Tipos de formación educativa
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
  /** Fecha de inicio */
  startDate: Date;
  
  /** Fecha de finalización */
  endDate?: Date;
  
  /** Duración en texto */
  duration?: string;
}

/**
 * Formación académica de Alejandro Villa
 * Basada en la información del prompt
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
    description: 'Título universitario que formaliza más de 20 años de experiencia práctica. No para aprender a usar computadores (eso ya lo sabía), sino para agregar herramientas de análisis de negocio, gestión de proyectos y metodologías estructuradas.',
    skills: [
      'Análisis de Sistemas',
      'Gestión de Proyectos',
      'Metodologías de Desarrollo',
      'Business Process Management',
      'Arquitectura de Software',
      'Base de Datos',
      'Ingeniería de Requerimientos'
    ],
    projects: [
      'Sistema Unidad Territorial (Proyecto de Título)',
      'Múltiples proyectos académicos de alta complejidad'
    ],
    featured: true,
    displayOrder: 1,
    logo: 'assets/education/duoc-logo.png'
  },
  {
    id: 'python-course',
    type: 'course',
    title: 'Curso Python',
    institution: 'Plataforma Online',
    dates: {
      startDate: new Date('2024-01-01'),
      duration: 'En progreso'
    },
    status: 'in-progress',
    description: 'Formación continua en Python para expandir competencias de desarrollo y automatización de procesos.',
    skills: [
      'Python Programming',
      'Django Framework',
      'Automatización de Procesos',
      'Scripts de Administración'
    ],
    featured: false,
    displayOrder: 2
  },
  {
    id: 'autoformacion-continua',
    type: 'self-learning',
    title: 'Autoformación Continua',
    institution: 'Investigación Autodidacta',
    dates: {
      startDate: new Date('2007-01-01'),
      duration: '20+ años'
    },
    status: 'in-progress',
    description: 'Formación autodidacta constante desde los 15-16 años. Investigación técnica continua, experimentación con nuevas tecnologías y mantenimiento actualizado con tendencias tecnológicas.',
    skills: [
      'Investigación Técnica',
      'Resolución Autodidacta de Problemas',
      'Adaptabilidad Tecnológica',
      'Experimentación Práctica',
      'Análisis de Sistemas',
      'Troubleshooting Avanzado'
    ],
    featured: true,
    displayOrder: 3
  }
];

/**
 * Certificaciones y formación complementaria
 */
export const CERTIFICATIONS: Education[] = [
  {
    id: 'firebase-fundamentals',
    type: 'certification',
    title: 'Firebase Fundamentals',
    institution: 'Google',
    dates: {
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-02-01'),
      duration: '1 mes'
    },
    status: 'completed',
    description: 'Certificación en fundamentos de Firebase para desarrollo de aplicaciones web y móviles.',
    skills: [
      'Firebase Authentication',
      'Firestore Database',
      'Firebase Storage',
      'Firebase Hosting'
    ],
    featured: false,
    displayOrder: 1
  },
  {
    id: 'angular-fundamentals',
    type: 'certification',
    title: 'Angular Fundamentals',
    institution: 'Plataforma Online',
    dates: {
      startDate: new Date('2023-06-01'),
      endDate: new Date('2023-08-01'),
      duration: '2 meses'
    },
    status: 'completed',
    description: 'Formación estructurada en Angular para desarrollo de aplicaciones empresariales.',
    skills: [
      'Angular Framework',
      'TypeScript',
      'RxJS',
      'Angular CLI',
      'Component Architecture'
    ],
    featured: false,
    displayOrder: 2
  }
];

/**
 * Formación planificada futura
 */
export const PLANNED_EDUCATION: Education[] = [
  {
    id: 'cloud-architecture',
    type: 'certification',
    title: 'Cloud Architecture Certification',
    institution: 'Por definir',
    dates: {
      startDate: new Date('2025-06-01'),
      duration: 'Planificado 2025'
    },
    status: 'planned',
    description: 'Certificación en arquitectura de nube para ampliar competencias en infraestructura moderna.',
    skills: [
      'Cloud Architecture',
      'Microservices',
      'Container Technologies',
      'Cloud Security'
    ],
    featured: false,
    displayOrder: 1
  }
];

/**
 * Helper functions para gestión de educación
 */

export function getAllEducation(): Education[] {
  return [...ALEJANDRO_EDUCATION, ...CERTIFICATIONS, ...PLANNED_EDUCATION]
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getEducationByType(type: EducationType): Education[] {
  const allEducation = getAllEducation();
  return allEducation.filter(edu => edu.type === type);
}

export function getFeaturedEducation(): Education[] {
  return getAllEducation().filter(edu => edu.featured);
}

export function getCompletedEducation(): Education[] {
  return getAllEducation().filter(edu => edu.status === 'completed');
}

export function getCurrentEducation(): Education[] {
  return getAllEducation().filter(edu => edu.status === 'in-progress');
}

/**
 * Configuración de tipos de educación para UI
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
 * Resumen de formación para sección About
 */
export const EDUCATION_SUMMARY = {
  university: 'Ingeniero en Informática (DuocUC, 2025)',
  practicalExperience: '20+ años de experiencia práctica',
  selfLearning: 'Investigación técnica continua desde 2007',
  currentFocus: 'Python y tecnologías cloud modernas'
};