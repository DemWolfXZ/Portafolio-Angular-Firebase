/**
 * ARCHIVO: src/app/models/skill.model.ts
 * 
 * DESCRIPCIÓN:
 * Modelo de datos para las competencias técnicas de Alejandro Villa.
 * ACTUALIZADO FINAL: Removido "APRENDIENDO", ajustes en años y experiencia
 */

/**
 * Interfaz principal para competencias técnicas
 */
export interface Skill {
  /** ID único de la competencia */
  id: string;
  
  /** Nombre de la tecnología/habilidad */
  name: string;
  
  /** Categoría de la competencia */
  category: SkillCategory;
  
  /** Nivel basado en años de experiencia */
  level: SkillLevel;
  
  /** Años de experiencia práctica */
  yearsOfExperience: number;
  
  /** Descripción de la experiencia */
  description: string;
  
  /** Proyectos donde se aplicó */
  projectsUsed: string[];
  
  /** Icono para la UI */
  icon?: string;
  
  /** Color para visualización */
  color?: string;
  
  /** Si es una competencia destacada */
  featured: boolean;
  
  /** Orden de visualización en su categoría */
  displayOrder: number;
}

/**
 * Categorías de competencias técnicas
 */
export type SkillCategory = 
  | 'infrastructure' 
  | 'analysis' 
  | 'development' 
  | 'management' 
  | 'tools';

/**
 * Niveles de competencia - ACTUALIZADOS sin "learning"
 */
export type SkillLevel = 'advanced' | 'intermediate';

/**
 * Competencias de Alejandro Villa ACTUALIZADAS FINALES
 */
export const ALEJANDRO_SKILLS: Skill[] = [
  // ========================================
  // INFRAESTRUCTURA Y SOPORTE (ADVANCED)
  // ========================================
  {
    id: 'hardware-repair',
    name: 'Reparación Hardware Avanzada',
    category: 'infrastructure',
    level: 'advanced',
    yearsOfExperience: 20,
    description: 'Sólida experiencia en diagnóstico y reparación de componentes PC desde nivel básico hasta sistemas complejos',
    projectsUsed: [],
    icon: 'hardware-chip',
    color: '#FF6B35',
    featured: true,
    displayOrder: 1
  },
  {
    id: 'network-config',
    name: 'Configuración de Redes',
    category: 'infrastructure',
    level: 'advanced',
    yearsOfExperience: 5,
    description: 'Experiencia práctica en configuración de redes empresariales y domiciliarias, TCP/IP, routers',
    projectsUsed: [],
    icon: 'wifi',
    color: '#4ECDC4',
    featured: true,
    displayOrder: 2
  },
  {
    id: 'system-administration',
    name: 'Administración de Sistemas',
    category: 'infrastructure',
    level: 'advanced',
    yearsOfExperience: 10,
    description: 'Conocimiento avanzado en Windows (XP-11), Ubuntu, formateo, clonación, migración de sistemas',
    projectsUsed: [],
    icon: 'desktop-outline',
    color: '#45B7D1',
    featured: true,
    displayOrder: 3
  },
  {
    id: 'technical-support',
    name: 'Soporte Técnico',
    category: 'infrastructure',
    level: 'advanced',
    yearsOfExperience: 3,
    description: 'Competencia avanzada en gestión de tickets, SLA, diagnóstico remoto, resolución nivel 1-2',
    projectsUsed: [],
    icon: 'help-circle-outline',
    color: '#96CEB4',
    featured: true,
    displayOrder: 4
  },

  // ========================================
  // ANÁLISIS DE SISTEMAS Y PROCESOS (INTERMEDIATE)
  // ========================================
  {
    id: 'business-analysis',
    name: 'Análisis de Negocio',
    category: 'analysis',
    level: 'intermediate',
    yearsOfExperience: 2,
    description: 'Traducción de requerimientos de negocio a soluciones técnicas, coordinación con stakeholders',
    projectsUsed: [],
    icon: 'business-outline',
    color: '#6C5CE7',
    featured: true,
    displayOrder: 1
  },
  {
    id: 'requirements-gathering',
    name: 'Levantamiento de Requerimientos',
    category: 'analysis',
    level: 'intermediate',
    yearsOfExperience: 2,
    description: 'Coordinación con stakeholders, traducción de necesidades de negocio',
    projectsUsed: [],
    icon: 'document-text-outline',
    color: '#FFEAA7',
    featured: true,
    displayOrder: 2
  },
  {
    id: 'process-mapping',
    name: 'Mapeo de Procesos Empresariales',
    category: 'analysis',
    level: 'intermediate',
    yearsOfExperience: 2,
    description: 'Análisis de flujos de trabajo, identificación de mejoras',
    projectsUsed: [],
    icon: 'git-network-outline',
    color: '#DDA0DD',
    featured: true,
    displayOrder: 3
  },
  {
    id: 'data-analysis',
    name: 'Análisis de Datos',
    category: 'analysis',
    level: 'intermediate',
    yearsOfExperience: 2,
    description: 'Experiencia en procesamiento de datos operacionales',
    projectsUsed: [],
    icon: 'analytics-outline',
    color: '#74B9FF',
    featured: true,
    displayOrder: 4
  },

  // ========================================
  // DESARROLLO (INTERMEDIATE)
  // ========================================
  {
    id: 'angular',
    name: 'Angular',
    category: 'development',
    level: 'intermediate',
    yearsOfExperience: 2,
    description: 'Desarrollo con Angular 18, aplicando buenas prácticas aprendidas',
    projectsUsed: [],
    icon: 'logo-angular',
    color: '#DD0031',
    featured: true,
    displayOrder: 1
  },
  {
    id: 'ionic',
    name: 'Ionic',
    category: 'development',
    level: 'intermediate',
    yearsOfExperience: 2,
    description: 'Desarrollo móvil híbrido con Ionic 8, aplicando experiencia práctica en proyectos académicos',
    projectsUsed: [],
    icon: 'phone-portrait-outline',
    color: '#3880FF',
    featured: true,
    displayOrder: 2
  },
  {
    id: 'firebase',
    name: 'Firebase',
    category: 'development',
    level: 'intermediate',
    yearsOfExperience: 2,
    description: 'Implementación de backend con Firebase 11, Firestore, Authentication',
    projectsUsed: [],
    icon: 'flame-outline',
    color: '#FFCA28',
    featured: true,
    displayOrder: 3
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'development',
    level: 'intermediate',
    yearsOfExperience: 2,
    description: 'TypeScript 5.4 con tipado estricto, aplicando conocimientos para desarrollo profesional',
    projectsUsed: [],
    icon: 'code-slash-outline',
    color: '#3178C6',
    featured: true,
    displayOrder: 4
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'development',
    level: 'intermediate',
    yearsOfExperience: 2,
    description: 'Backend con Node.js para proyectos Angular/Ionic, integración con Firebase',
    projectsUsed: [],
    icon: 'logo-nodejs',
    color: '#68A063',
    featured: true,
    displayOrder: 5
  },
  {
    id: 'python',
    name: 'Python',
    category: 'development',
    level: 'intermediate',
    yearsOfExperience: 2,
    description: 'Machine Learning universitario, Django básico, scripts de automatización. Realizando certificación para complementar conocimientos',
    projectsUsed: [],
    icon: 'logo-python',
    color: '#3776AB',
    featured: true,
    displayOrder: 6
  },
  {
    id: 'php',
    name: 'PHP',
    category: 'development',
    level: 'intermediate',
    yearsOfExperience: 1,
    description: 'Desarrollo web universitario con PHP, creación de aplicaciones web básicas y conexión a bases de datos',
    projectsUsed: [],
    icon: 'logo-php',
    color: '#777BB4',
    featured: false,
    displayOrder: 7
  },
  {
    id: 'html-css',
    name: 'HTML5 & CSS3',
    category: 'development',
    level: 'intermediate',
    yearsOfExperience: 2,
    description: 'Maquetación moderna con HTML5 semántico y CSS3 avanzado, Flexbox, Grid, animaciones',
    projectsUsed: [],
    icon: 'logo-html5',
    color: '#E34F26',
    featured: false,
    displayOrder: 8
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'development',
    level: 'intermediate',
    yearsOfExperience: 1,
    description: 'JavaScript moderno ES6+, DOM manipulation, async/await',
    projectsUsed: [],
    icon: 'logo-javascript',
    color: '#F7DF1E',
    featured: false,
    displayOrder: 9
  },

  // ========================================
  // BASES DE DATOS
  // ========================================
  {
    id: 'sql',
    name: 'SQL',
    category: 'development',
    level: 'intermediate',
    yearsOfExperience: 2,
    description: 'Modelamiento de bases de datos hasta 3era forma normal, consultas complejas',
    projectsUsed: [],
    icon: 'server-outline',
    color: '#336791',
    featured: true,
    displayOrder: 10
  },
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'development',
    level: 'intermediate',
    yearsOfExperience: 2,
    description: 'Administración de MySQL, creación de esquemas, triggers, procedimientos almacenados básicos',
    projectsUsed: [],
    icon: 'logo-mysql',
    color: '#4479A1',
    featured: false,
    displayOrder: 11
  },

  // ========================================
  // GESTIÓN DE PROYECTOS (INTERMEDIATE)
  // ========================================
  {
    id: 'technical-coordination',
    name: 'Coordinación Técnica',
    category: 'management',
    level: 'intermediate',
    yearsOfExperience: 3,
    description: 'Coordinación entre equipos técnicos y de negocio',
    projectsUsed: [],
    icon: 'people-outline',
    color: '#6C5CE7',
    featured: true,
    displayOrder: 1
  },
  {
    id: 'training',
    name: 'Capacitación y Desarrollo',
    category: 'management',
    level: 'intermediate',
    yearsOfExperience: 5,
    description: 'Experiencia práctica en entrenamiento de personal técnico',
    projectsUsed: [],
    icon: 'school-outline',
    color: '#00CEC9',
    featured: true,
    displayOrder: 2
  },
  {
    id: 'agile-methodologies',
    name: 'Metodologías Ágiles',
    category: 'management',
    level: 'intermediate',
    yearsOfExperience: 2,
    description: 'Scrum básico, seguimiento de KPIs aplicados académicamente',
    projectsUsed: [],
    icon: 'refresh-outline',
    color: '#FD79A8',
    featured: false,
    displayOrder: 3
  },

  // ========================================
  // HERRAMIENTAS (VARIADO)
  // ========================================
  {
    id: 'git',
    name: 'Git',
    category: 'tools',
    level: 'intermediate',
    yearsOfExperience: 2,
    description: 'Control de versiones con GitHub, GitLab, aplicando buenas prácticas',
    projectsUsed: [],
    icon: 'git-branch-outline',
    color: '#F1502F',
    featured: false,
    displayOrder: 1
  },
  {
    id: 'ai-tools',
    name: 'Herramientas IA',
    category: 'tools',
    level: 'intermediate',
    yearsOfExperience: 2,
    description: 'Uso eficiente de Claude, ChatGPT, Copilot para acelerar desarrollo manteniendo calidad',
    projectsUsed: [],
    icon: 'bulb-outline',
    color: '#A29BFE',
    featured: true,
    displayOrder: 2
  },
  {
    id: 'office-365',
    name: 'Office 365',
    category: 'tools',
    level: 'advanced',
    yearsOfExperience: 10,
    description: 'Dominio avanzado de Excel, Word, PowerPoint, Teams para documentación profesional',
    projectsUsed: [],
    icon: 'document-outline',
    color: '#D83B01',
    featured: false,
    displayOrder: 3
  },
  {
    id: 'photoshop',
    name: 'Adobe Photoshop',
    category: 'tools',
    level: 'intermediate',
    yearsOfExperience: 5,
    description: 'Edición de imágenes, diseño básico de interfaces, optimización de assets para web',
    projectsUsed: [],
    icon: 'image-outline',
    color: '#31A8FF',
    featured: false,
    displayOrder: 4
  }
];

/**
 * Helper functions para organizar y filtrar skills
 */

export function getSkillsByCategory(category: SkillCategory): Skill[] {
  return ALEJANDRO_SKILLS
    .filter(skill => skill.category === category)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getFeaturedSkills(): Skill[] {
  return ALEJANDRO_SKILLS
    .filter(skill => skill.featured)
    .sort((a, b) => b.yearsOfExperience - a.yearsOfExperience);
}

export function getSkillsByLevel(level: SkillLevel): Skill[] {
  return ALEJANDRO_SKILLS.filter(skill => skill.level === level);
}

export function getTotalYearsInCategory(category: SkillCategory): number {
  const categorySkills = getSkillsByCategory(category);
  return Math.max(...categorySkills.map(skill => skill.yearsOfExperience));
}

/**
 * Helper para obtener skills más destacadas para el HOME
 */
export function getHomeDisplaySkills(): Skill[] {
  // Retorna las skills más importantes para mostrar en home
  return ALEJANDRO_SKILLS
    .filter(skill => skill.featured && ['angular', 'firebase', 'python', 'sql', 'nodejs', 'hardware-repair', 'network-config', 'business-analysis'].includes(skill.id))
    .sort((a, b) => b.yearsOfExperience - a.yearsOfExperience)
    .slice(0, 8); // Máximo 8 para home
}

/**
 * Configuración de categorías para UI - ACTUALIZADA
 */
export const SKILL_CATEGORIES = [
  {
    id: 'infrastructure' as SkillCategory,
    name: 'Infraestructura y Soporte',
    description: 'AVANZADO - 20+ años de experiencia práctica',
    icon: 'hardware-chip',
    color: '#FF6B35',
    featured: true
  },
  {
    id: 'analysis' as SkillCategory,
    name: 'Análisis de Sistemas',
    description: 'INTERMEDIO - Buscando crecimiento profesional',
    icon: 'analytics-outline',
    color: '#74B9FF',
    featured: true
  },
  {
    id: 'development' as SkillCategory,
    name: 'Desarrollo',
    description: 'INTERMEDIO - Aplicando conocimientos académicos',
    icon: 'code-slash-outline',
    color: '#00B894',
    featured: true
  },
  {
    id: 'management' as SkillCategory,
    name: 'Gestión de Proyectos',
    description: 'INTERMEDIO - Coordinación técnica',
    icon: 'people-outline',
    color: '#6C5CE7',
    featured: true
  },
  {
    id: 'tools' as SkillCategory,
    name: 'Herramientas',
    description: 'VARIADO - Adaptabilidad tecnológica',
    icon: 'construct-outline',
    color: '#A29BFE',
    featured: false
  }
];