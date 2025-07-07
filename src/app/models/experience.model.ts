/**
 * ARCHIVO: src/app/models/experience.model.ts
 * 
 * DESCRIPCIÓN:
 * Modelo de datos para la experiencia laboral de Alejandro Villa.
 * Define la estructura tanto para experiencia formal como independiente,
 * enfocado en destacar 20+ años de experiencia práctica combinada con
 * roles formales de coordinación técnica y análisis de sistemas.
 */

/**
 * Interfaz principal para experiencia laboral
 * Cubre tanto experiencia formal como independiente
 */
export interface WorkExperience {
  /** ID único de la experiencia */
  id: string;
  
  /** Nombre del puesto/rol */
  position: string;
  
  /** Empresa u organización */
  company: string;
  
  /** Tipo de experiencia */
  type: ExperienceType;
  
  /** Ubicación del trabajo */
  location: string;
  
  /** Fechas de la experiencia */
  dates: ExperienceDates;
  
  /** Descripción principal del rol */
  description: string;
  
  /** Responsabilidades específicas */
  responsibilities: string[];
  
  /** Logros y resultados medibles */
  achievements: string[];
  
  /** Tecnologías y herramientas utilizadas */
  technologies: string[];
  
  /** Habilidades desarrolladas/aplicadas */
  skills: string[];
  
  /** Si sigue vigente */
  current: boolean;
  
  /** Orden en el timeline */
  displayOrder: number;
  
  /** Destacar en portafolio */
  featured: boolean;
}

/**
 * Tipos de experiencia laboral
 */
export type ExperienceType = 'formal' | 'independent' | 'freelance' | 'volunteer';

/**
 * Fechas de la experiencia
 */
export interface ExperienceDates {
  /** Fecha de inicio */
  startDate: Date;
  
  /** Fecha de fin (si aplica) */
  endDate?: Date;
  
  /** Duración calculada en texto */
  duration?: string;
}

/**
 * Experiencia formal de Alejandro Villa
 * Basada en la información detallada del prompt
 */
export const FORMAL_EXPERIENCE: WorkExperience[] = [
  {
    id: 'fundacion-superacion-pobreza',
    position: 'Coordinador Técnico y Analista de Sistemas',
    company: 'Fundación Superación de la Pobreza',
    type: 'formal',
    location: 'Santiago, Chile',
    dates: {
      startDate: new Date('2024-01-01'),
      endDate: new Date('2025-01-01'),
      duration: '1 año'
    },
    description: 'Liderazgo en modernización de sistema crítico legacy, coordinación de stakeholders y análisis de procesos empresariales para implementación de solución cloud moderna.',
    responsibilities: [
      'Análisis completo de sistema legacy on-premise con fallas constantes',
      'Coordinación semanal con diferentes áreas organizacionales',
      'Levantamiento de requerimientos y traducción de necesidades de negocio',
      'Mapeo de flujos de trabajo existentes e identificación de mejoras',
      'Coordinación técnica con desarrolladores para implementación Angular/Ionic/Firebase'
    ],
    achievements: [
      'Sistema funcionando en producción sin caídas',
      'Eliminación completa de fallas del sistema legacy',
      'Modernización exitosa de infraestructura crítica',
      'Coordinación efectiva entre múltiples stakeholders'
    ],
    technologies: [
      'Angular 18', 'Ionic 8', 'Firebase 11', 'TypeScript 5.4'
    ],
    skills: [
      'Coordinación Técnica', 'Análisis de Sistemas', 'Gestión de Proyectos',
      'Levantamiento de Requerimientos', 'Modernización de Sistemas Legacy'
    ],
    current: false,
    displayOrder: 1,
    featured: true
  },
  {
    id: 'viaschile',
    position: 'Especialista en Soporte Técnico',
    company: 'ViasChile',
    type: 'formal',
    location: 'Santiago, Chile',
    dates: {
      startDate: new Date('2023-01-01'),
      endDate: new Date('2024-01-01'),
      duration: '1 año'
    },
    description: 'Soporte técnico especializado con enfoque en análisis de datos operacionales y gestión de infraestructura tecnológica a nivel nacional.',
    responsibilities: [
      'Gestión de tickets de soporte bajo SLA estrictos',
      'Resolución de incidencias nivel 1 y 2',
      'Procesamiento y análisis de datos operacionales de usuarios',
      'Configuración de redes corporativas y dispositivos móviles',
      'Gestión de inventarios tecnológicos'
    ],
    achievements: [
      'Cumplimiento consistente de métricas SLA',
      'Optimización de procesos de análisis de datos',
      'Mejora en la gestión de inventarios tecnológicos'
    ],
    technologies: [
      'Sistemas de Ticketing', 'Análisis de Datos', 'Configuración de Redes'
    ],
    skills: [
      'Análisis de Datos Operacionales', 'Soporte Técnico Avanzado',
      'Gestión de SLA', 'Infraestructura Empresarial'
    ],
    current: false,
    displayOrder: 2,
    featured: true
  },
  {
    id: 'vtr-iline',
    position: 'Soporte Técnico Telefónico + Capacitador',
    company: 'VTR (I-Line Contact Center)',
    type: 'formal',
    location: 'Santiago, Chile',
    dates: {
      startDate: new Date('2018-01-01'),
      endDate: new Date('2020-01-01'),
      duration: '2 años'
    },
    description: 'Doble rol de soporte técnico nacional y capacitador de nuevos trabajadores, demostrando habilidades técnicas y de desarrollo de personas.',
    responsibilities: [
      'Atención técnica telefónica a clientes de internet, telefonía y TV cable',
      'Diagnóstico remoto de problemas de conectividad',
      'Configuración de routers y optimización de servicios',
      'Capacitación de nuevos trabajadores en procedimientos técnicos',
      'Desarrollo de material de entrenamiento'
    ],
    achievements: [
      'Reconocimiento como capacitador especializado',
      'Alto índice de satisfacción en atención al cliente',
      'Desarrollo exitoso de múltiples generaciones de técnicos'
    ],
    technologies: [
      'Sistemas VTR', 'Configuración de Routers', 'Plataformas de Capacitación'
    ],
    skills: [
      'Capacitación y Desarrollo de Personal', 'Diagnóstico Técnico Remoto',
      'Configuración de Redes', 'Atención al Cliente'
    ],
    current: false,
    displayOrder: 3,
    featured: true
  }
];

/**
 * Experiencia independiente de Alejandro Villa
 * Los famosos 20+ años de experiencia práctica
 */
export const INDEPENDENT_EXPERIENCE: WorkExperience[] = [
  {
    id: 'tecnico-independiente',
    position: 'Técnico Independiente',
    company: 'Freelance / Independiente',
    type: 'independent',
    location: 'Santiago, Chile',
    dates: {
      startDate: new Date('2007-01-01'),
      duration: '20+ años'
    },
    description: 'Más de 20 años siendo "el que arregla computadores" - experiencia práctica profunda desde Windows XP hasta sistemas actuales, desarrollando expertise real en hardware, software y resolución de problemas complejos.',
    responsibilities: [
      'Reparación hardware avanzada desde componentes básicos hasta sistemas complejos',
      'Formateo, clonación y migración de sistemas operativos',
      'Modificación avanzada de sistemas (edición de registro de Windows)',
      'Configuración de redes domiciliarias y empresariales',
      'Diagnóstico y solución de fallas complejas de software y hardware',
      'Investigación técnica constante para entender funcionamiento interno'
    ],
    achievements: [
      'Referente técnico en círculo personal y profesional durante 20+ años',
      'Experiencia práctica desde Windows XP hasta sistemas actuales',
      'Capacidad probada para resolver problemas que otros no pueden',
      'Conocimiento profundo del funcionamiento interno de sistemas',
      'Experiencia única combinando práctica y teoría'
    ],
    technologies: [
      'Windows (XP hasta actual)', 'Ubuntu Linux', 'Hardware PC',
      'Redes TCP/IP', 'Registro de Windows', 'Clonación de Discos',
      'Diagnóstico de Hardware', 'Configuración BIOS/UEFI'
    ],
    skills: [
      'Diagnóstico Avanzado de Hardware', 'Resolución de Problemas Complejos',
      'Modificación de Sistemas', 'Investigación Técnica Autodidacta',
      'Adaptabilidad Tecnológica', 'Pensamiento Sistemático'
    ],
    current: true,
    displayOrder: 4,
    featured: true
  }
];

/**
 * Helper function para obtener toda la experiencia combinada
 */
export function getAllExperience(): WorkExperience[] {
  return [...FORMAL_EXPERIENCE, ...INDEPENDENT_EXPERIENCE]
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

/**
 * Helper function para obtener experiencia por tipo
 */
export function getExperienceByType(type: ExperienceType): WorkExperience[] {
  const allExperience = getAllExperience();
  return allExperience.filter(exp => exp.type === type);
}

/**
 * Helper function para calcular años totales de experiencia
 */
export function getTotalYearsOfExperience(): number {
  const startYear = 2007; // Inicio de experiencia independiente
  const currentYear = new Date().getFullYear();
  return currentYear - startYear;
}

/**
 * Helper function para obtener tecnologías únicas
 */
export function getAllTechnologies(): string[] {
  const allExperience = getAllExperience();
  const techSet = new Set<string>();
  
  allExperience.forEach(exp => {
    exp.technologies.forEach(tech => techSet.add(tech));
  });
  
  return Array.from(techSet);
}

/**
 * Helper function para obtener skills únicos
 */
export function getAllSkills(): string[] {
  const allExperience = getAllExperience();
  const skillSet = new Set<string>();
  
  allExperience.forEach(exp => {
    exp.skills.forEach(skill => skillSet.add(skill));
  });
  
  return Array.from(skillSet);
}