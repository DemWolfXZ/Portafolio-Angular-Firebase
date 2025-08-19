/**
 * ARCHIVO: src/app/models/skill.model.ts
 * 
 * DESCRIPCIÓN:
 * Modelo de datos para las competencias técnicas de Alejandro Villa.
 * ACTUALIZADO: Niveles ajustados para reflejar búsqueda de roles junior/intermedio
 * en desarrollo y análisis, con máximo "advanced" (no "expert").
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
 * Niveles de competencia ACTUALIZADOS - Sin "expert" para alinear con búsqueda de roles junior/intermedio
 */
export type SkillLevel = 'advanced' | 'intermediate' | 'learning';

/**
 * Competencias de Alejandro Villa ACTUALIZADAS
 * Niveles ajustados para posicionamiento como candidato con experiencia sólida
 * buscando crecimiento en desarrollo y análisis
 */
export const ALEJANDRO_SKILLS: Skill[] = [
  // ========================================
  // INFRAESTRUCTURA Y SOPORTE (ADVANCED - Experiencia sólida, no "expert")
  // ========================================
  {
    id: 'hardware-repair',
    name: 'Reparación Hardware Avanzada',
    category: 'infrastructure',
    level: 'advanced', // Cambiado de "expert" a "advanced"
    yearsOfExperience: 20,
    description: 'Sólida experiencia en diagnóstico y reparación de componentes PC desde nivel básico hasta sistemas complejos',
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
    level: 'advanced', // Cambiado de "expert" a "advanced"
    yearsOfExperience: 5,
    description: 'Experiencia práctica en configuración de redes empresariales y domiciliarias, TCP/IP, routers',
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
    level: 'advanced', // Cambiado de "expert" a "advanced"
    yearsOfExperience: 10,
    description: 'Conocimiento avanzado en Windows (XP-11), Ubuntu, formateo, clonación, migración de sistemas',
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
    level: 'advanced', // Cambiado de "expert" a "advanced"
    yearsOfExperience: 3,
    description: 'Competencia avanzada en gestión de tickets, SLA, diagnóstico remoto, resolución nivel 1-2',
    projectsUsed: ['VTR', 'ViasChile'],
    icon: 'help-circle',
    color: '#96CEB4',
    featured: true,
    displayOrder: 4
  },

  // ========================================
  // ANÁLISIS DE SISTEMAS Y PROCESOS (INTERMEDIATE - Buscando crecimiento)
  // ========================================
  {
    id: 'business-analysis',
    name: 'Análisis de Negocio',
    category: 'analysis',
    level: 'intermediate', // NUEVO: Agregado según el prompt
    yearsOfExperience: 2,
    description: 'Traducción de requerimientos de negocio a soluciones técnicas, coordinación con stakeholders',
    projectsUsed: ['Fundación Superación de la Pobreza'],
    icon: 'business',
    color: '#6C5CE7',
    featured: true,
    displayOrder: 1
  },
  {
    id: 'requirements-gathering',
    name: 'Levantamiento de Requerimientos',
    category: 'analysis',
    level: 'intermediate', // Cambiado de "advanced" a "intermediate"
    yearsOfExperience: 2,
    description: 'Coordinación con stakeholders, traducción de necesidades de negocio con enfoque de aprendizaje continuo',
    projectsUsed: ['Fundación Superación de la Pobreza'],
    icon: 'document-text',
    color: '#FFEAA7',
    featured: true,
    displayOrder: 2
  },
  {
    id: 'process-mapping',
    name: 'Mapeo de Procesos Empresariales',
    category: 'analysis',
    level: 'intermediate', // Cambiado de "advanced" a "intermediate"
    yearsOfExperience: 2,
    description: 'Análisis de flujos de trabajo, identificación de mejoras, aplicando metodologías aprendidas académicamente',
    projectsUsed: ['Fundación Superación de la Pobreza'],
    icon: 'git-network',
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
    description: 'Experiencia en procesamiento de datos operacionales, buscando especializarme en análisis avanzado',
    projectsUsed: ['ViasChile'],
    icon: 'analytics',
    color: '#74B9FF',
    featured: true,
    displayOrder: 4
  },

  // ========================================
  // DESARROLLO (INTERMEDIATE - Enfoque en crecimiento)
  // ========================================
  {
    id: 'angular',
    name: 'Angular',
    category: 'development',
    level: 'intermediate',
    yearsOfExperience: 2,
    description: 'Desarrollo con Angular 18, aplicando buenas prácticas aprendidas y buscando profundizar conocimientos',
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
    description: 'Desarrollo móvil híbrido con Ionic 8, aplicando experiencia práctica en proyectos académicos',
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
    description: 'Implementación de backend con Firebase 11, Firestore, Authentication, buscando especializarme',
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
    description: 'TypeScript 5.4 con tipado estricto, aplicando conocimientos para desarrollo profesional',
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
    description: 'En desarrollo continuo, Django básico, scripts de automatización - buscando oportunidades para aplicar',
    projectsUsed: ['Proyectos de Aprendizaje'],
    icon: 'logo-python',
    color: '#3776AB',
    featured: false,
    displayOrder: 5
  },

  // ========================================
  // GESTIÓN DE PROYECTOS (INTERMEDIATE - Con experiencia sólida)
  // ========================================
  {
    id: 'technical-coordination',
    name: 'Coordinación Técnica',
    category: 'management',
    level: 'intermediate', // Cambiado de "advanced" a "intermediate"
    yearsOfExperience: 3,
    description: 'Coordinación entre equipos técnicos y de negocio, buscando roles donde pueda desarrollar esta competencia',
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
    level: 'intermediate', // Cambiado de "advanced" a "intermediate"
    yearsOfExperience: 5,
    description: 'Experiencia práctica en entrenamiento de personal técnico, aplicable en contextos de desarrollo de equipos',
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
    level: 'learning', // Mantenido como "learning"
    yearsOfExperience: 2,
    description: 'Scrum básico, seguimiento de KPIs aplicados académicamente, buscando profundizar en contexto empresarial',
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
    description: 'Control de versiones con GitHub, GitLab, aplicando buenas prácticas en proyectos de desarrollo',
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
    level: 'intermediate', // Cambiado de "advanced" a "intermediate"
    yearsOfExperience: 2,
    description: 'Uso eficiente de Claude, ChatGPT, Copilot para acelerar desarrollo manteniendo calidad',
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
 * Configuración de categorías para UI - ACTUALIZADA
 */
export const SKILL_CATEGORIES = [
  {
    id: 'infrastructure' as SkillCategory,
    name: 'Infraestructura y Soporte',
    description: 'AVANZADO - 20+ años de experiencia práctica', // Cambiado de "EXPERTO"
    icon: 'hardware-chip',
    color: '#FF6B35',
    featured: true
  },
  {
    id: 'analysis' as SkillCategory,
    name: 'Análisis de Sistemas',
    description: 'INTERMEDIO - Buscando crecimiento profesional', // Actualizado para reflejar búsqueda
    icon: 'analytics',
    color: '#74B9FF',
    featured: true
  },
  {
    id: 'development' as SkillCategory,
    name: 'Desarrollo',
    description: 'INTERMEDIO - Aplicando conocimientos académicos', // Actualizado
    icon: 'code',
    color: '#00B894',
    featured: true
  },
  {
    id: 'management' as SkillCategory,
    name: 'Gestión de Proyectos',
    description: 'INTERMEDIO - Coordinación técnica', // Actualizado
    icon: 'people',
    color: '#6C5CE7',
    featured: true
  },
  {
    id: 'tools' as SkillCategory,
    name: 'Herramientas',
    description: 'VARIADO - Adaptabilidad tecnológica', // Ligeramente actualizado
    icon: 'construct',
    color: '#A29BFE',
    featured: false
  }
];