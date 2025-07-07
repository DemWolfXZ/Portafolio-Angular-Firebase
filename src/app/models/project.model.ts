/**
 * ARCHIVO: src/app/models/project.model.ts
 * 
 * DESCRIPCIÓN:
 * Modelo de datos para los proyectos del portafolio de Alejandro Villa.
 * Define la estructura de proyectos profesionales, académicos y creativos
 * incluyendo información técnica, enlaces, capturas y descripciones detalladas.
 * Alineado con la información del prompt sobre proyectos reales.
 */

/**
 * Interfaz principal para proyectos del portafolio
 * Cubre proyectos profesionales, académicos y creativos (WADs)
 */
export interface Project {
  /** ID único del proyecto */
  id: string;
  
  /** Nombre del proyecto */
  title: string;
  
  /** Descripción corta para cards */
  shortDescription: string;
  
  /** Descripción detallada del proyecto */
  fullDescription: string;
  
  /** Categoría del proyecto */
  category: ProjectCategory;
  
  /** Tipo específico del proyecto */
  type: ProjectType;
  
  /** Stack tecnológico utilizado */
  technologies: Technology[];
  
  /** URLs y enlaces relacionados */
  links: ProjectLinks;
  
  /** Imágenes del proyecto */
  images: ProjectImages;
  
  /** Fechas del proyecto */
  dates: ProjectDates;
  
  /** Rol desempeñado en el proyecto */
  role: string;
  
  /** Cliente o organización */
  client?: string;
  
  /** Estado del proyecto */
  status: ProjectStatus;
  
  /** Logros y resultados específicos */
  achievements: string[];
  
  /** Desafíos técnicos enfrentados */
  challenges: string[];
  
  /** Destacar en portafolio */
  featured: boolean;
  
  /** Orden de visualización */
  displayOrder: number;
}

/**
 * Categorías principales de proyectos
 */
export type ProjectCategory = 'professional' | 'academic' | 'creative' | 'personal';

/**
 * Tipos específicos de proyectos
 */
export type ProjectType = 
  | 'web-application' 
  | 'mobile-app' 
  | 'system-modernization'
  | 'process-analysis'
  | 'academic-project'
  | 'game-mod'
  | 'tool-development';

/**
 * Estado actual del proyecto
 */
export type ProjectStatus = 'completed' | 'in-production' | 'maintenance' | 'archived';

/**
 * Interfaz para tecnologías utilizadas
 */
export interface Technology {
  /** Nombre de la tecnología */
  name: string;
  
  /** Versión específica utilizada */
  version?: string;
  
  /** Categoría de la tecnología */
  category: TechCategory;
  
  /** Icono o imagen representativa */
  icon?: string;
  
  /** Color asociado para UI */
  color?: string;
}

/**
 * Categorías de tecnologías
 */
export type TechCategory = 
  | 'frontend' 
  | 'backend' 
  | 'database' 
  | 'cloud' 
  | 'tools' 
  | 'mobile'
  | 'game-engine';

/**
 * Enlaces relacionados al proyecto
 */
export interface ProjectLinks {
  /** URL del proyecto en vivo */
  live?: string;
  
  /** Repositorio de código (si es público) */
  repository?: string;
  
  /** Enlace a demo o presentación */
  demo?: string;
  
  /** Documentación del proyecto */
  documentation?: string;
  
  /** Archivo descargable (para WADs) */
  download?: string;
  
  /** Video explicativo */
  video?: string;
  
  /** Caso de estudio detallado */
  caseStudy?: string;
}

/**
 * Imágenes del proyecto
 */
export interface ProjectImages {
  /** Imagen principal/thumbnail */
  thumbnail: string;
  
  /** Capturas de pantalla adicionales */
  screenshots: string[];
  
  /** Logo del proyecto */
  logo?: string;
  
  /** Imagen de arquitectura/diagrama */
  architecture?: string;
}

/**
 * Fechas relevantes del proyecto
 */
export interface ProjectDates {
  /** Fecha de inicio */
  startDate: Date;
  
  /** Fecha de finalización */
  endDate?: Date;
  
  /** Fecha de lanzamiento/producción */
  launchDate?: Date;
  
  /** Última actualización */
  lastUpdate?: Date;
}

/**
 * Datos específicos de proyectos profesionales reales de Alejandro
 * Basado en la información del prompt
 */
export const ALEJANDRO_PROJECTS: Project[] = [
  {
    id: 'srm-portal-superacion',
    title: 'Sistema SRM - Portal Superación de la Pobreza',
    shortDescription: 'Modernización completa de sistema legacy crítico con Angular, Ionic y Firebase',
    fullDescription: 'Coordinación técnica y análisis de procesos para reemplazo de sistema on-premise con fallas constantes. Implementación de arquitectura moderna en la nube con eliminación total de caídas del sistema.',
    category: 'professional',
    type: 'system-modernization',
    technologies: [
      { name: 'Angular', version: '18', category: 'frontend', color: '#dd0031' },
      { name: 'Ionic', version: '8', category: 'mobile', color: '#3880ff' },
      { name: 'Firebase', version: '11', category: 'cloud', color: '#ffca28' },
      { name: 'TypeScript', version: '5.4', category: 'frontend', color: '#3178c6' }
    ],
    links: {
      live: 'https://portal-superacionpobreza.web.app/tesis-pais'
    },
    images: {
      thumbnail: 'assets/projects/srm-portal-thumb.jpg',
      screenshots: [
        'assets/projects/srm-portal-1.jpg',
        'assets/projects/srm-portal-2.jpg'
      ]
    },
    dates: {
      startDate: new Date('2024-01-01'),
      endDate: new Date('2025-01-01'),
      launchDate: new Date('2024-12-01')
    },
    role: 'Coordinador Técnico y Analista de Sistemas',
    client: 'Fundación Superación de la Pobreza',
    status: 'in-production',
    achievements: [
      'Sistema funcionando en producción sin caídas',
      'Eliminación completa de fallas del sistema legacy',
      'Modernización exitosa de infraestructura crítica',
      'Coordinación efectiva entre múltiples stakeholders'
    ],
    challenges: [
      'Migración de datos críticos sin downtime',
      'Coordinación con diferentes áreas organizacionales',
      'Análisis de procesos complejos existentes'
    ],
    featured: true,
    displayOrder: 1
  },
  {
    id: 'sistema-unidad-territorial',
    title: 'Sistema Unidad Territorial - Proyecto de Título',
    shortDescription: 'Proyecto académico de alta complejidad técnica con gestión integral de datos',
    fullDescription: 'Desarrollo completo de sistema para gestión territorial como proyecto de título de Ingeniería Informática. Implementación de arquitectura robusta con manejo avanzado de datos geoespaciales.',
    category: 'academic',
    type: 'web-application',
    technologies: [
      { name: 'Angular', category: 'frontend', color: '#dd0031' },
      { name: 'Ionic', category: 'mobile', color: '#3880ff' },
      { name: 'Firebase', category: 'cloud', color: '#ffca28' }
    ],
    links: {
      live: 'https://sistema-unidad-terrritorial.web.app/#/login'
    },
    images: {
      thumbnail: 'assets/projects/unidad-territorial-thumb.jpg',
      screenshots: [
        'assets/projects/unidad-territorial-1.jpg',
        'assets/projects/unidad-territorial-2.jpg'
      ]
    },
    dates: {
      startDate: new Date('2024-03-01'),
      endDate: new Date('2024-12-01')
    },
    role: 'Desarrollador y Analista Principal',
    client: 'DuocUC - Proyecto de Título',
    status: 'completed',
    achievements: [
      'Proyecto académico de máxima complejidad técnica',
      'Implementación exitosa de arquitectura escalable',
      'Integración de múltiples servicios de Firebase'
    ],
    challenges: [
      'Manejo de datos geoespaciales complejos',
      'Optimización de performance para grandes datasets',
      'Implementación de autenticación y autorización robusta'
    ],
    featured: true,
    displayOrder: 2
  },
  {
    id: 'ast-digital-formulario',
    title: 'AST Digital - Formulario Profesional',
    shortDescription: 'Interface profesional y funcional para gestión de formularios empresariales',
    fullDescription: 'Desarrollo de formulario profesional con validaciones avanzadas y diseño centrado en la experiencia de usuario. Implementación de patrones de diseño modernos.',
    category: 'professional',
    type: 'web-application',
    technologies: [
      { name: 'Angular', category: 'frontend', color: '#dd0031' },
      { name: 'Ionic', category: 'mobile', color: '#3880ff' }
    ],
    links: {
      live: 'https://ast-digital.web.app/'
    },
    images: {
      thumbnail: 'assets/projects/ast-digital-thumb.jpg',
      screenshots: [
        'assets/projects/ast-digital-1.jpg'
      ]
    },
    dates: {
      startDate: new Date('2024-06-01'),
      endDate: new Date('2024-08-01')
    },
    role: 'Frontend Developer',
    status: 'completed',
    achievements: [
      'Interface limpia y profesional',
      'Validaciones robustas en tiempo real',
      'Experiencia de usuario optimizada'
    ],
    challenges: [
      'Optimización de formularios complejos',
      'Implementación de validaciones cross-field'
    ],
    featured: false,
    displayOrder: 3
  }
];

/**
 * Datos de proyectos creativos (WADs para Doom)
 */
export const CREATIVE_PROJECTS: Project[] = [
  {
    id: 'doom-wads-collection',
    title: 'Colección de WADs para Doom',
    shortDescription: 'Años de experiencia diseñando niveles personalizados que demuestran creatividad técnica',
    fullDescription: 'Desarrollo de modificaciones personalizadas para Doom demostrando capacidad de pensamiento espacial, diseño de experiencias y resolución de problemas creativos. Relevante para demostrar habilidades de análisis sistemático.',
    category: 'creative',
    type: 'game-mod',
    technologies: [
      { name: 'Doom Builder', category: 'tools', color: '#8b0000' },
      { name: 'SLADE', category: 'tools', color: '#4169e1' },
      { name: 'Level Design', category: 'game-engine', color: '#ff6347' }
    ],
    links: {
      download: 'assets/wads/alejandro-villa-doom-example.wad'
    },
    images: {
      thumbnail: 'assets/projects/doom-wads-thumb.jpg',
      screenshots: [
        'assets/projects/doom-level-1.jpg',
        'assets/projects/doom-level-2.jpg'
      ]
    },
    dates: {
      startDate: new Date('2010-01-01'),
      endDate: new Date('2020-01-01')
    },
    role: 'Level Designer & Modder',
    status: 'archived',
    achievements: [
      'Múltiples niveles completados y funcionales',
      'Diseño innovador de espacios y mecánicas',
      'Demostración de pensamiento sistemático aplicado'
    ],
    challenges: [
      'Limitaciones técnicas del engine original',
      'Optimización de performance en niveles complejos',
      'Balance entre dificultad y diversión'
    ],
    featured: true,
    displayOrder: 4
  }
];

/**
 * Helper function para obtener proyectos por categoría
 */
export function getProjectsByCategory(category: ProjectCategory): Project[] {
  const allProjects = [...ALEJANDRO_PROJECTS, ...CREATIVE_PROJECTS];
  return allProjects.filter(project => project.category === category);
}

/**
 * Helper function para obtener proyectos destacados
 */
export function getFeaturedProjects(): Project[] {
  const allProjects = [...ALEJANDRO_PROJECTS, ...CREATIVE_PROJECTS];
  return allProjects
    .filter(project => project.featured)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

/**
 * Helper function para obtener tecnologías únicas de todos los proyectos
 */
export function getAllTechnologies(): Technology[] {
  const allProjects = [...ALEJANDRO_PROJECTS, ...CREATIVE_PROJECTS];
  const techMap = new Map<string, Technology>();
  
  allProjects.forEach(project => {
    project.technologies.forEach(tech => {
      techMap.set(tech.name, tech);
    });
  });
  
  return Array.from(techMap.values());
}