/**
 * ARCHIVO: src/app/models/skill.model.ts
 * 
 * DESCRIPCIÓN:
 * Modelo de datos para las competencias técnicas de Alejandro Villa.
 * Organiza habilidades por categorías con niveles de experiencia basados
 * en años reales de práctica. Enfocado en destacar 20+ años de experiencia
 * práctica vs conocimiento teórico.
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
 * Niveles de competencia basados en experiencia real
 */
export type SkillLevel = 'expert' | 'advanced' | 'intermediate' | 'learning';

/**
 * Competencias de Alejandro Villa organizadas por categorías
 * Basado en los 20+ años de experiencia del prompt
 */
export const ALEJANDRO_SKILLS: Skill[] = [
  // ========================================
  // INFRAESTRUCTURA Y SOPORTE (EXPERTO - 20+ años)
  // ========================================
  {
    id: 'hardware-repair',
    name: 'Reparación Hardware Avanzada',
    category: 'infrastructure',
    level: 'expert',
    yearsOfExperience: 20,
    description: 'Diagnóstico y reparación de componentes PC desde nivel básico hasta sistemas complejos',
    projectsUsed: ['Técnico Independiente', 'ViasChile'],
    icon: 'hardware-chip',
    color: '#FF6B35',
    featured: true,
    displayOrder: 1
  },
  {
    id: 'network-config',
    name: 'Configuración de Redes',
    category: 'infrastructure',
    level: 'expert',
    yearsOfExperience: 18,
    description: 'Configuración de redes empresariales y domiciliarias, TCP/IP, routers',
    projectsUsed: ['VTR', 'ViasChile', 'Proyectos Independientes'],
    icon: 'wifi',
    color: '#4ECDC4',
    featured: true,
    displayOrder: 2
  },
  {
    id: 'system-administration',
    name: 'Administración de Sistemas',
    category: 'infrastructure',
    level: 'expert',
    yearsOfExperience: 20,
    description: 'Windows (XP-11), Ubuntu, formateo, clonación, migración de sistemas',
    projectsUsed: ['Todos los proyectos'],
    icon: 'desktop',
    color: '#45B7D1',
    featured: true,
    displayOrder: 3
  },
  {
    id: 'technical-support',
    name: 'Soporte Técnico Especializado',
    category: 'infrastructure',
    level: 'expert',
    yearsOfExperience: 15,
    description: 'Gestión de tickets, SLA, diagnóstico remoto, resolución nivel 1-2',
    projectsUsed: ['VTR', 'ViasChile'],
    icon: 'help-circle',
    color: '#96CEB4',
    featured: true,
    displayOrder: 4
  },

  // ========================================
  // ANÁLISIS DE SISTEMAS Y PROCESOS (INTERMEDIO-AVANZADO)
  // ========================================
  {
    id: 'requirements-gathering',
    name: 'Levantamiento de Requerimientos',
    category: 'analysis',
    level: 'advanced',
    yearsOfExperience: 3,
    description: 'Coordinación con stakeholders, traducción de necesidades de negocio',
    projectsUsed: ['Fundación Superación de la Pobreza'],
    icon: 'document-text',
    color: '#FFEAA7',
    featured: true,
    displayOrder: 1
  },
  {
    id: 'process-mapping',
    name: 'Mapeo de Procesos Empresariales',
    category: 'analysis',
    level: 'advanced',
    yearsOfExperience: 2,
    description: 'Análisis de flujos de trabajo, identificación de mejoras, BPM',
    projectsUsed: ['Fundación Superación de la Pobreza'],
    icon: 'git-network',
    color: '#DDA0DD',
    featured: true,
    displayOrder: 2
  },
  {
    id: 'data-analysis',
    name: 'Análisis de Datos Operacionales',
    category: 'analysis',
    level: 'intermediate',
    yearsOfExperience: 2,
    description: 'Procesamiento de información, generación de insights para toma de decisiones',
    projectsUsed: ['ViasChile'],
    icon: 'analytics',
    color: '#74B9FF',
    featured: true,
    displayOrder: 3
  },
  {
    id: 'database-modeling',
    name: 'Modelamiento de Base de Datos',
    category: 'analysis',
    level: 'intermediate',
    yearsOfExperience: 2,
    description: 'Diseño de BD, normalización (3era forma normal), Firestore',
    projectsUsed: ['Proyectos Académicos', 'SRM Portal'],
    icon: 'server',
    color: '#00B894',
    featured: false,
    displayOrder: 4
  },

  // ========================================
  // DESARROLLO (INTERMEDIO)
  // ========================================
  {
    id: 'angular',
    name: 'Angular',
    category: 'development',
    level: 'intermediate',
    yearsOfExperience: 2,
    description: 'Angular 18, TypeScript 5.4, desarrollo de aplicaciones web modernas',
    projectsUsed: ['SRM Portal', 'Sistema Unidad Territorial', 'AST Digital'],
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
    description: 'Ionic 8, desarrollo móvil híbrido, PWA capabilities',
    projectsUsed: ['SRM Portal', 'Sistema Unidad Territorial'],
    icon: 'phone-portrait',
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
    description: 'Firebase 11, Firestore, Authentication, Storage, Hosting',
    projectsUsed: ['SRM Portal', 'Sistema Unidad Territorial'],
    icon: 'flame',
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
    description: 'TypeScript 5.4, tipado estricto, desarrollo profesional',
    projectsUsed: ['Todos los proyectos Angular'],
    icon: 'code',
    color: '#3178C6',
    featured: true,
    displayOrder: 4
  },
  {
    id: 'python',
    name: 'Python',
    category: 'development',
    level: 'learning',
    yearsOfExperience: 1,
    description: 'En desarrollo continuo, Django básico, scripts de automatización',
    projectsUsed: ['Proyectos de Aprendizaje'],
    icon: 'logo-python',
    color: '#3776AB',
    featured: false,
    displayOrder: 5
  },

  // ========================================
  // GESTIÓN DE PROYECTOS (INTERMEDIO)
  // ========================================
  {
    id: 'technical-coordination',
    name: 'Coordinación Técnica',
    category: 'management',
    level: 'advanced',
    yearsOfExperience: 3,
    description: 'Coordinación entre equipos técnicos y de negocio, gestión de stakeholders',
    projectsUsed: ['Fundación Superación de la Pobreza'],
    icon: 'people',
    color: '#6C5CE7',
    featured: true,
    displayOrder: 1
  },
  {
    id: 'training',
    name: 'Capacitación y Desarrollo',
    category: 'management',
    level: 'advanced',
    yearsOfExperience: 5,
    description: 'Entrenamiento de personal técnico, desarrollo de material educativo',
    projectsUsed: ['VTR', 'Proyectos Independientes'],
    icon: 'school',
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
    description: 'Scrum básico, seguimiento de KPIs, gestión de proyectos',
    projectsUsed: ['Proyectos Académicos'],
    icon: 'refresh',
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
    description: 'Control de versiones básico, GitHub, GitLab',
    projectsUsed: ['Proyectos de Desarrollo'],
    icon: 'git-branch',
    color: '#F1502F',
    featured: false,
    displayOrder: 1
  },
  {
    id: 'ai-tools',
    name: 'Herramientas IA',
    category: 'tools',
    level: 'advanced',
    yearsOfExperience: 2,
    description: 'Uso eficiente de Claude, ChatGPT, Copilot para desarrollo',
    projectsUsed: ['Todos los proyectos recientes'],
    icon: 'bulb',
    color: '#A29BFE',
    featured: true,
    displayOrder: 2
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
 * Configuración de categorías para UI
 */
export const SKILL_CATEGORIES = [
  {
    id: 'infrastructure' as SkillCategory,
    name: 'Infraestructura y Soporte',
    description: 'EXPERTO - 20+ años de experiencia',
    icon: 'hardware-chip',
    color: '#FF6B35',
    featured: true
  },
  {
    id: 'analysis' as SkillCategory,
    name: 'Análisis de Sistemas',
    description: 'INTERMEDIO-AVANZADO',
    icon: 'analytics',
    color: '#74B9FF',
    featured: true
  },
  {
    id: 'development' as SkillCategory,
    name: 'Desarrollo',
    description: 'INTERMEDIO',
    icon: 'code',
    color: '#00B894',
    featured: true
  },
  {
    id: 'management' as SkillCategory,
    name: 'Gestión de Proyectos',
    description: 'INTERMEDIO',
    icon: 'people',
    color: '#6C5CE7',
    featured: true
  },
  {
    id: 'tools' as SkillCategory,
    name: 'Herramientas',
    description: 'VARIADO',
    icon: 'construct',
    color: '#A29BFE',
    featured: false
  }
];