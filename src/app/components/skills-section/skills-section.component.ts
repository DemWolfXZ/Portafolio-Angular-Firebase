// src/app/components/skills-section/skills-section.component.ts
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AnimationService } from '@services/animation.service';
import { 
  ALEJANDRO_SKILLS, 
  SKILL_CATEGORIES, 
  Skill, 
  SkillCategory,
  SkillLevel,
  getSkillsByCategory,
  getFeaturedSkills,
  getTotalYearsInCategory,
  getSkillsByLevel
} from '@models/skill.model';

/**
 * Componente para la sección de competencias técnicas del portafolio.
 * Organiza habilidades por categorías con visualización de años de experiencia.
 * Enfoca en destacar 20+ años de experiencia práctica vs conocimiento teórico,
 * mostrando la progresión desde técnico independiente hasta analista formal.
 */
@Component({
  selector: 'app-skills-section',
  templateUrl: './skills-section.component.html',
  styleUrls: ['./skills-section.component.scss'],
})
export class SkillsSectionComponent implements OnInit {

  // Datos de skills importados desde el modelo
  public allSkills = ALEJANDRO_SKILLS;
  public skillCategories = SKILL_CATEGORIES;
  
  // Estado del componente
  public activeCategory: SkillCategory | 'all' = 'all';
  public animationsLoaded = false;
  public selectedSkill: Skill | null = null;

  // Vista de skills
  public viewMode: 'category' | 'level' | 'featured' = 'category';

  // Configuración de filtros por categoría
  public categoryFilters = [
    {
      id: 'all' as const,
      label: 'Todas las Competencias',
      description: 'Vista completa de habilidades',
      icon: 'apps',
      count: this.allSkills.length
    },
    ...this.skillCategories.map(cat => ({
      id: cat.id,
      label: cat.name,
      description: cat.description,
      icon: cat.icon,
      count: getSkillsByCategory(cat.id).length
    }))
  ];

  constructor(private animationService: AnimationService) { }

  ngOnInit(): void {
    // Activar animaciones después de un delay
    setTimeout(() => {
      this.animationsLoaded = true;
      this.initAnimations();
    }, 300);
  }

  /**
   * Obtiene skills filtradas según la categoría activa
   * @returns Array de skills filtradas
   */
  getDisplayedSkills(): Skill[] {
    if (this.activeCategory === 'all') {
      return this.allSkills.sort((a, b) => b.yearsOfExperience - a.yearsOfExperience);
    }
    
    return getSkillsByCategory(this.activeCategory);
  }

  /**
   * Obtiene skills organizadas por categoría para vista de categorías
   * @returns Objeto con skills agrupadas por categoría
   */
  getSkillsByCategories() {
    const result: { [key: string]: any } = {};
    
    this.skillCategories.forEach(category => {
      if (category.featured) {
        result[category.id] = {
          ...category,
          skills: getSkillsByCategory(category.id),
          totalYears: getTotalYearsInCategory(category.id)
        };
      }
    });
    
    return result;
  }

  /**
   * Obtiene skills destacadas
   * @returns Array de skills featured
   */
  getFeaturedSkills(): Skill[] {
    return getFeaturedSkills();
  }

  /**
   * Obtiene skills por nivel específico
   * @param level - Nivel de skill a filtrar
   * @returns Array de skills del nivel especificado
   */
  getSkillsByLevel(level: string): Skill[] {
    return getSkillsByLevel(level as SkillLevel);
  }

  /**
   * Cambia el filtro de categoría activo
   * @param category - Nueva categoría a mostrar
   */
  setActiveCategory(category: SkillCategory | 'all'): void {
    this.activeCategory = category;
    this.animateSkillBars();
  }

  /**
   * Cambia el modo de vista de skills
   * @param mode - Nuevo modo de vista
   */
  setViewMode(mode: 'category' | 'level' | 'featured'): void {
    this.viewMode = mode;
    
    // Re-animar cuando cambia la vista
    setTimeout(() => {
      this.animateSkillBars();
    }, 100);
  }

  /**
   * Abre modal con detalles de una skill específica
   * @param skill - Skill a mostrar en detalle
   */
  openSkillDetail(skill: Skill): void {
    this.selectedSkill = skill;
  }

  /**
   * Cierra el modal de detalles
   */
  closeSkillDetail(): void {
    this.selectedSkill = null;
  }

  /**
   * Calcula el porcentaje de la barra de progreso
   * Basado en años de experiencia (máximo 20 años = 100%)
   * @param skill - Skill para calcular porcentaje
   * @returns Porcentaje entre 0 y 100
   */
  getSkillPercentage(skill: Skill): number {
    const maxYears = 20; // 20+ años = 100%
    return Math.min((skill.yearsOfExperience / maxYears) * 100, 100);
  }

  /**
   * Obtiene el color de la categoría de una skill
   * @param category - Categoría de la skill
   * @returns Color CSS
   */
  getCategoryColor(category: SkillCategory): string {
    const categoryData = this.skillCategories.find(cat => cat.id === category);
    return categoryData?.color || 'var(--ion-color-primary)';
  }

  /**
   * Obtiene el label del nivel de competencia
   * @param level - Nivel de la skill
   * @returns String con el label en español
   */
  getLevelLabel(level: string): string {
    const labels = {
      'expert': 'EXPERTO',
      'advanced': 'AVANZADO', 
      'intermediate': 'INTERMEDIO',
      'learning': 'APRENDIENDO'
    };
    return labels[level as keyof typeof labels] || level.toUpperCase();
  }

  /**
   * Obtiene el color del nivel de competencia
   * @param level - Nivel de la skill
   * @returns Color CSS
   */
  getLevelColor(level: string): string {
    const colors = {
      'expert': '#00CEC9',
      'advanced': 'var(--ion-color-primary)',
      'intermediate': '#FDCB6E',
      'learning': '#74B9FF'
    };
    return colors[level as keyof typeof colors] || 'var(--ion-color-primary)';
  }

  /**
   * Formatea años de experiencia para mostrar
   * @param years - Años de experiencia
   * @returns String formateado
   */
  formatYearsOfExperience(years: number): string {
    if (years >= 20) {
      return '20+ años';
    } else if (years >= 2) {
      return `${years} años`;
    } else if (years >= 1) {
      return '1 año';
    } else {
      return '< 1 año';
    }
  }

  /**
   * Obtiene estadísticas generales de skills
   * @returns Objeto con estadísticas calculadas
   */
  getSkillsStats() {
    const expertSkills = this.allSkills.filter(skill => skill.level === 'expert');
    const featuredSkills = this.getFeaturedSkills();
    const totalYears = Math.max(...this.allSkills.map(skill => skill.yearsOfExperience));
    
    return {
      totalSkills: this.allSkills.length,
      expertSkills: expertSkills.length,
      featuredSkills: featuredSkills.length,
      maxExperience: totalYears,
      categories: this.skillCategories.filter(cat => cat.featured).length
    };
  }

  /**
   * Verifica si una skill es destacada
   * @param skill - Skill a verificar
   * @returns true si la skill es featured
   */
  isSkillFeatured(skill: Skill): boolean {
    return skill.featured;
  }

  /**
   * Navega a la sección de contacto
   */
  scrollToContact(): void {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const headerHeight = 80;
      const elementPosition = contactSection.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }

  /**
   * Navega a la sección de proyectos
   */
  scrollToProjects(): void {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      const headerHeight = 80;
      const elementPosition = projectsSection.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }

  /**
   * Inicializa animaciones para elementos de la sección
   */
  private initAnimations(): void {
    // Animar elementos principales
    const animatedElements = document.querySelectorAll('.skills-animate');
    
    animatedElements.forEach((element, index) => {
      this.animationService.observeElement(
        element,
        'slideInUp',
        0.1
      );
    });

    this.animateSkillBars();
  }

  /**
   * Anima las barras de progreso y tarjetas de skills
   */
  private animateSkillBars(): void {
    // Animar barras de progreso
    setTimeout(() => {
      const skillBars = document.querySelectorAll('.skill-progress-bar');
      skillBars.forEach((bar: any) => {
        const percentage = bar.getAttribute('data-percentage');
        if (percentage) {
          bar.style.width = percentage + '%';
        }
      });
    }, 200);

    // Animar tarjetas de skills
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
      setTimeout(() => {
        this.animationService.observeElement(card, 'scaleIn', 0.2);
      }, index * 50);
    });
  }
}