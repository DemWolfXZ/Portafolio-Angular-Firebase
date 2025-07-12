// src/app/components/skills-section/skills-section.component.ts
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AnimationService } from '../../services/animation.service';

/**
 * Componente para la sección de competencias técnicas del portafolio.
 * Versión simplificada para debugging y corrección progresiva.
 */
@Component({
  selector: 'app-skills-section',
  templateUrl: './skills-section.component.html',
  styleUrls: ['./skills-section.component.scss'],
})
export class SkillsSectionComponent implements OnInit {
  /**
   * Cambia el modo de vista de skills
   */
  setViewMode(mode: 'category' | 'level' | 'featured'): void {
    this.viewMode = mode;
    setTimeout(() => {
      this.animateSkillBars();
    }, 80);
  }

  // Estado del componente
  public animationsLoaded = false;
  public selectedSkill: any = null;

  // Vista de skills
  public viewMode: 'category' | 'level' | 'featured' = 'category';

  // Datos simplificados para debugging
  public allSkills = [
    { name: 'JavaScript', level: 'expert', yearsOfExperience: 15, featured: true },
    { name: 'Angular', level: 'advanced', yearsOfExperience: 8, featured: true },
    { name: 'SQL Server', level: 'expert', yearsOfExperience: 18, featured: true }
  ];

  public skillCategories = [
    { id: 'frontend', name: 'Frontend', featured: true, icon: 'code', color: '#007bff', description: 'Frontend development skills' },
    { id: 'backend', name: 'Backend', featured: true, icon: 'server', color: '#28a745', description: 'Backend development skills' }
  ];

  constructor(private animationService: AnimationService) { }

  ngOnInit(): void {
    // Cargar las animaciones inmediatamente sin delay
    this.animationsLoaded = true;
    this.initAnimations();
    
    // Debug logs
    console.log('Skills Section - ngOnInit');
    console.log('Total skills:', this.allSkills.length);
    console.log('Categories:', this.skillCategories.length);
    console.log('View mode:', this.viewMode);
  }

  /**
   * Obtiene skills filtradas según la categoría activa
   */
  getDisplayedSkills(): any[] {
    return this.allSkills;
  }

  /**
   * Obtiene skills organizadas por categoría para vista de categorías
   */
  getSkillsByCategories() {
    const result: { [key: string]: any } = {};
    
    this.skillCategories.forEach(category => {
      result[category.id] = {
        ...category,
        skills: this.allSkills.slice(0, 2), // Simplificado
        totalYears: 15
      };
    });
    
    return result;
  }

  /**
   * Obtiene solo skills destacadas
   */
  getFeaturedSkills(): any[] {
    return this.allSkills.filter(skill => skill.featured);
  }

  /**
  // Estado del componente y datos de skills
   */
  getSkillsByLevel(level: string): any[] {
    return this.allSkills.filter(skill => skill.level === level);
  }

  /**
  // Datos de skills importados desde el modelo
  public allSkills = ALEJANDRO_SKILLS;
  public skillCategories = SKILL_CATEGORIES;
    // Debug logs
    console.log('Current view mode:', this.viewMode);
    console.log('Skills by categories:', this.getSkillsByCategories());
    console.log('Featured skills:', this.getFeaturedSkills());
    
    // Re-animar inmediatamente cuando cambia la vista
    this.animateSkillBars();
  }

  /**
   * Abre modal con detalles de una skill específica
   */
  openSkillDetail(skill: any): void {
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
   */
  getSkillPercentage(skill: any): number {
    const maxYears = 20;
    return Math.min((skill.yearsOfExperience / maxYears) * 100, 100);
  }

  /**
   * Obtiene el color de la categoría de una skill
   */
  getCategoryColor(category: string): string {
    return '#007bff'; // Color por defecto
  }

  /**
   * Obtiene el label del nivel de competencia
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
   */
  getLevelColor(level: string): string {
    const colors = {
      'expert': '#00CEC9',
      'advanced': '#007bff',
      'intermediate': '#FDCB6E',
      'learning': '#FD79A8'
    };
    return colors[level as keyof typeof colors] || '#6c757d';
  }

  /**
   * Formatea años de experiencia
   */
  formatYearsOfExperience(years: number): string {
    if (years >= 20) return '20+ años';
    if (years >= 10) return `${years}+ años`;
    if (years === 1) return '1 año';
    return `${years} años`;
  }

  /**
   * Obtiene estadísticas generales
   */
  getSkillsStats() {
    return {
      totalSkills: this.allSkills.length,
      expertSkills: this.allSkills.filter(s => s.level === 'expert').length,
      maxExperience: Math.max(...this.allSkills.map(s => s.yearsOfExperience)),
      categories: this.skillCategories.length
    };
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
    // Animar barras de progreso inmediatamente
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    skillBars.forEach((bar: any) => {
      const percentage = bar.getAttribute('data-percentage');
      if (percentage) {
        bar.style.width = percentage + '%';
      }
    });

    // Animar tarjetas de skills con menos delay
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
      setTimeout(() => {
        this.animationService.observeElement(card, 'scaleIn', 0.1);
      }, index * 20);
    });
  }
}
