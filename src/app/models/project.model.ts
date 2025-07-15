/**
 * ARCHIVO: src/app/models/project.model.ts
 * 
 * DESCRIPCIÓN:
 * Modelo de datos para los proyectos del portafolio de Alejandro Villa.
 * Define la estructura de proyectos profesionales, académicos y creativos
 * incluyendo información técnica, enlaces, capturas y descripciones detalladas.
 * ACTUALIZADO: Soporte completo para WADs de DOOM con videos y modales personalizados.
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
  
  /** URL de video de YouTube (para WADs) */
  videoUrl?: string;
  
  /** Indica si el WAD está disponible para descarga */
  wadAvailable?: boolean;
  
  /** Imagen de fondo para modal personalizado */
  modalBackgroundImage?: string;
  
  /** Motor de juego requerido (ej: Zandronum) */
  engineRequired?: string;
  
  /** Juego base requerido (ej: DOOM II) */
  requiredGame?: string;
  
  /** Características especiales del proyecto */
  features?: string[];
  
  /** Instrucciones de instalación */
  installInstructions?: string[];
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
 * ACTUALIZADO: Incluye WAD de 11 niveles y proyecto experimental DOOM 3
 */
export const CREATIVE_PROJECTS: Project[] = [
  {
    id: 'waterdoom-11-levels',
    title: 'DOOM - WAD de 11 Niveles Completos',
    shortDescription: 'WAD completo para DOOM II con 11 niveles originales demostrando creatividad técnica',
    fullDescription: 'Desarrollo de modificación completa para DOOM II con 11 niveles únicos. Demuestra capacidad de pensamiento espacial, diseño de experiencias y resolución de problemas creativos bajo limitaciones técnicas.',
    category: 'creative',
    type: 'game-mod',
    technologies: [
      { name: 'Doom Builder', category: 'tools', color: '#8b0000' },
      { name: 'SLADE', category: 'tools', color: '#4169e1' },
      { name: 'Level Design', category: 'game-engine', color: '#ff6347' }
    ],
    links: {
      download: 'assets/wads/Wad_para_DOOMII.wad',
      video: 'https://youtu.be/VzD9NT5F_Z0'
    },
    images: {
      thumbnail: 'assets/wads/wad_11niveles.png',
      screenshots: [
        'assets/projects/waterdoom-level-1.jpg',
        'assets/projects/waterdoom-level-2.jpg',
        'assets/projects/waterdoom-level-3.jpg'
      ]
    },
    dates: {
      startDate: new Date('2010-01-01'),
      endDate: new Date('2015-01-01')
    },
    role: 'Level Designer & Modder',
    status: 'completed',
    achievements: [
      '11 niveles completamente funcionales',
      'Diseño innovador de espacios y mecánicas',
      'Demostración de pensamiento sistemático aplicado',
      'Optimización para múltiples dificultades'
    ],
    challenges: [
      'Limitaciones técnicas del engine original de DOOM',
      'Optimización de performance en niveles complejos',
      'Balance entre dificultad y diversión',
      'Coherencia narrativa entre los 11 niveles'
    ],
    featured: true,
    displayOrder: 4,
    videoUrl: 'https://youtu.be/VzD9NT5F_Z0',
    wadAvailable: true,
    modalBackgroundImage: 'assets/wads/wad_11niveles.png',
    engineRequired: 'Zandronum',
    requiredGame: 'DOOM II',
    features: [
      '11 niveles completos y únicos',
      'Diseño original de espacios',
      'Optimizado para multijugador',
      'Compatible con diferentes dificultades'
    ],
    installInstructions: [
      'Descargar e instalar Zandronum desde zandronum.com',
      'Tener una copia legal de DOOM II',
      'Descargar el archivo Wad_para_DOOMII.wad',
      'Ejecutar Zandronum y cargar el WAD desde el menú'
    ]
  },
  {
    id: 'doom3-experimental-wad',
    title: 'Proyecto Experimental DOOM 3 - Luces y Sombras',
    shortDescription: 'Nivel experimental explorando técnicas avanzadas de iluminación inspiradas en DOOM 3',
    fullDescription: 'Proyecto experimental que explora las posibilidades de luces y sombras en el engine clásico de DOOM. Inspirado en las técnicas de iluminación de DOOM 3, demuestra capacidad de innovación dentro de limitaciones técnicas.',
    category: 'creative',
    type: 'game-mod',
    technologies: [
      { name: 'Doom Builder', category: 'tools', color: '#8b0000' },
      { name: 'SLADE', category: 'tools', color: '#4169e1' },
      { name: 'Advanced Lighting', category: 'game-engine', color: '#ff6347' }
    ],
    links: {
      video: 'https://youtu.be/5-E392uGTj8'
    },
    images: {
      thumbnail: 'assets/wads/wad_video.png',
      screenshots: [
        'assets/projects/doom3-experimental-1.jpg',
        'assets/projects/doom3-experimental-2.jpg'
      ]
    },
    dates: {
      startDate: new Date('2012-01-01'),
      endDate: new Date('2013-01-01')
    },
    role: 'Level Designer & Lighting Specialist',
    status: 'archived',
    achievements: [
      'Técnicas innovadoras de iluminación',
      'Simulación de efectos DOOM 3 en engine clásico',
      'Experimentación con nuevas mecánicas',
      'Documentación visual completa'
    ],
    challenges: [
      'Limitaciones del engine clásico para efectos modernos',
      'Simulación de luces dinámicas',
      'Optimización de efectos visuales',
      'Mantener jugabilidad fluida'
    ],
    featured: true,
    displayOrder: 5,
    videoUrl: 'https://youtu.be/5-E392uGTj8',
    wadAvailable: false,
    modalBackgroundImage: 'assets/wads/wad_video.png',
    engineRequired: 'GZDoom',
    requiredGame: 'DOOM II',
    features: [
      'Efectos avanzados de iluminación',
      'Técnicas experimentales de sombras',
      'Atmósfera inspirada en DOOM 3',
      'Innovación en engine clásico'
    ]
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
 * Helper function para obtener proyectos creativos (WADs)
 */
export function getCreativeProjects(): Project[] {
  return CREATIVE_PROJECTS.sort((a, b) => a.displayOrder - b.displayOrder);
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