/**
 * ARCHIVO: src/app/components/skills-section/skills-section.component.ts
 * 
 * DESCRIPCIÓN:
 * Componente para la sección de competencias técnicas del portafolio.
 * ACTUALIZADO: Ajustes en estadísticas y mensajes para reflejar posicionamiento
 * como candidato con experiencia sólida buscando crecimiento profesional.
 */

import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AnimationService } from '../../services/animation.service';

// Importación corregida de datos reales desde el modelo
import { 
  ALEJANDRO_SKILLS, 
  SKILL_CATEGORIES, 
  Skill, 
  SkillCategory,
  SkillLevel,
  getSkillsByCategory,
  getFeaturedSkills,
  getTotalYearsInCategory
} from '../../models/skill.model';

@Component({
  selector: 'app-skills-section',
  templateUrl: './skills-section.component.html',
  styleUrls: ['./skills-section.component.scss']
})
export class SkillsSectionComponent implements OnInit, OnDestroy {

  // Estado del componente - VALIDACIÓN: Siempre inicializar con valores seguros
  public animationsLoaded = false;
  public selectedSkill: Skill | null = null;
  public viewMode: 'all' | 'category' | 'level' | 'featured' = 'category';

  // Datos reales importados desde el modelo - CORRECCIÓN: Usar datos completos, no mock
  public allSkills: Skill[] = [];
  public skillCategories: any[] = [];

  // CORRECCIÓN: Arrays de niveles tipados para el template - ACTUALIZADO sin "expert"
  public skillLevels: SkillLevel[] = ['advanced', 'intermediate'];

  // Helper functions disponibles en el template
  public getSkillsByCategory = getSkillsByCategory;
  public getFeaturedSkills = getFeaturedSkills;
  public getTotalYearsInCategory = getTotalYearsInCategory;

  constructor(
    private animationService: AnimationService,
    private cdr: ChangeDetectorRef
  ) {
    // CORRECCIÓN: Inicializar datos en el constructor para garantizar disponibilidad
    this.initializeData();
  }

  ngOnInit(): void {
    console.log('Skills Section - ngOnInit iniciado');
    
    // CORRECCIÓN: Verificar que los datos estén cargados antes de continuar
    if (this.allSkills.length === 0) {
      this.initializeData();
    }

    // Inicializar animaciones con delay mínimo
    setTimeout(() => {
      this.animationsLoaded = true;
      this.initAnimations();
      this.cdr.detectChanges(); // CORRECCIÓN: Forzar detección de cambios
    }, 100);

    // Debug logs para verificar datos
    console.log('Total skills cargadas:', this.allSkills.length);
    console.log('Categorías disponibles:', this.skillCategories.length);
    console.log('View mode actual:', this.viewMode);
  }

  ngOnDestroy(): void {
    // CORRECCIÓN: Limpiar recursos para evitar memory leaks
    this.selectedSkill = null;
  }

  /**
   * CORRECCIÓN: Inicializar datos de forma segura
   */
  private initializeData(): void {
    try {
      this.allSkills = [...ALEJANDRO_SKILLS];
      this.skillCategories = [...SKILL_CATEGORIES];
      console.log('Datos inicializados correctamente');
    } catch (error) {
      console.error('Error al inicializar datos:', error);
      // Fallback con datos mínimos para evitar crashes
      this.allSkills = [];
      this.skillCategories = [];
    }
  }

  /**
   * CORRECCIÓN: Método funcionando para obtener skills por categorías
   */
  getSkillsByCategories(): { [key: string]: any } {
    const result: { [key: string]: any } = {};
    
    // VALIDACIÓN: Verificar que existen categorías antes de procesar
    if (!this.skillCategories || this.skillCategories.length === 0) {
      return result;
    }
    
    this.skillCategories.forEach(category => {
      if (category.featured) {
        const categorySkills = getSkillsByCategory(category.id);
        result[category.id] = {
          ...category,
          skills: categorySkills,
          totalYears: getTotalYearsInCategory(category.id)
        };
      }
    });
    
    return result;
  }

  /**
   * CORRECCIÓN: Método funcionando para skills por nivel - TIPADO FLEXIBLE
   */
  getSkillsByLevel(level: SkillLevel | string): Skill[] {
    // VALIDACIÓN: Verificar que existen skills antes de filtrar
    if (!this.allSkills || this.allSkills.length === 0) {
      return [];
    }
    
    return this.allSkills.filter(skill => skill.level === level);
  }

  /**
   * CORRECCIÓN: Cambio de vista con validaciones y re-renderizado forzado
   */
  setViewMode(mode: 'all' | 'category' | 'level' | 'featured'): void {
    // Si ya está en ese filtro (ej. doble clic sobre el mismo botón), no hacer nada.
    // Volver a disparar todo el ciclo de animación sin necesidad era la causa de que,
    // con doble clic, las tarjetas quedaran invisibles (ver animateSkillBars()).
    if (this.viewMode === mode) {
      return;
    }

    console.log('Cambiando view mode de', this.viewMode, 'a', mode);
    this.viewMode = mode;

    // CORRECCIÓN: Forzar detección de cambios inmediatamente
    this.cdr.detectChanges();

    // CORRECCIÓN: Re-animar después de un delay mínimo
    setTimeout(() => {
      this.animateSkillBars();
      this.cdr.detectChanges();
    }, 100);

    // CORRECCIÓN: Debug para verificar cambio
    console.log('View mode actualizado a:', this.viewMode);
  }

  /**
   * Abre modal con detalles de una skill específica
   */
  openSkillDetail(skill: Skill): void {
    this.selectedSkill = skill;
    console.log('Abriendo detalle de skill:', skill.name);
  }

  /**
   * Cierra el modal de detalles
   */
  closeSkillDetail(): void {
    this.selectedSkill = null;
  }

  /**
   * CORRECCIÓN: Cálculo de porcentaje validado
   */
  getSkillPercentage(skill: Skill): number {
    if (!skill || !skill.yearsOfExperience) {
      return 0;
    }
    
    const maxYears = 20;
    return Math.min((skill.yearsOfExperience / maxYears) * 100, 100);
  }

  /**
   * CORRECCIÓN: Obtener color de categoría con fallback
   */
  getCategoryColor(category: SkillCategory | string): string {
    if (!category) {
      return '#007bff'; // Color por defecto
    }
    
    const categoryData = this.skillCategories.find(cat => cat.id === category);
    return categoryData?.color || '#007bff';
  }

  /**
   * Obtiene el label del nivel de competencia - ACTUALIZADO sin "expert"
   */
  getLevelLabel(level: string): string {
    const labels = {
      'advanced': 'AVANZADO',  // Cambiado de "EXPERTO" a "AVANZADO"
      'intermediate': 'INTERMEDIO',
      'learning': 'APRENDIENDO'
    };
    return labels[level as keyof typeof labels] || level.toUpperCase();
  }

  /**
   * Obtiene el color del nivel de competencia - ACTUALIZADO sin "expert"
   */
  getLevelColor(level: string): string {
    const colors = {
      'advanced': '#007bff',    // Cambiado de color "expert" a "advanced"
      'intermediate': '#FDCB6E',
      'learning': '#FD79A8'
    };
    return colors[level as keyof typeof colors] || '#6c757d';
  }

  /**
   * CORRECCIÓN: Formateo de años con validación
   */
  formatYearsOfExperience(years: number): string {
    if (!years || years <= 0) {
      return '< 1 año';
    }
    
    if (years >= 20) return '10+ años';
    if (years >= 10) return `${years}+ años`;
    if (years === 1) return '1 año';
    return `${years} años`;
  }

  /**
   * CORRECCIÓN: Estadísticas calculadas con validaciones - ACTUALIZADO
   */
  getSkillsStats() {
    // VALIDACIÓN: Verificar que hay datos antes de calcular
    if (!this.allSkills || this.allSkills.length === 0) {
      return {
        totalSkills: 0,
        expertSkills: 0,  // Mantenido para compatibilidad pero será 0
        maxExperience: 0,
        categories: 0
      };
    }
    
    // ACTUALIZADO: Usar "advanced" en lugar de "expert"
    const advancedSkills = this.allSkills.filter(s => s.level === 'advanced');
    const maxExp = this.allSkills.length > 0 ? Math.max(...this.allSkills.map(s => s.yearsOfExperience)) : 0;
    const featuredCategories = this.skillCategories.filter(cat => cat.featured);
    
    return {
      totalSkills: this.allSkills.length,
      expertSkills: advancedSkills.length, // Ahora cuenta skills "advanced"
      maxExperience: maxExp,
      categories: featuredCategories.length
    };
  }

  /**
   * CORRECCIÓN: Navegación a contacto
   */
  scrollToContact(): void {
    // Para sistema de rutas (no SPA)
    window.location.href = '/contact';
  }

  /**
   * CORRECCIÓN: Navegación a proyectos  
   */
  scrollToProjects(): void {
    // Para sistema de rutas (no SPA)
    window.location.href = '/projects';
  }

  /**
   * CORRECCIÓN: Inicialización de animaciones optimizada
   */
  private initAnimations(): void {
    try {
      // Animar elementos principales con verificación de existencia
      const animatedElements = document.querySelectorAll('.skills-animate');
      
      if (animatedElements.length > 0) {
        animatedElements.forEach((element, index) => {
          this.animationService.observeElement(
            element,
            'slideInUp',
            0.1
          );
        });
      }

      // Inicializar animación de barras
      this.animateSkillBars();
    } catch (error) {
      console.warn('Error al inicializar animaciones:', error);
    }
  }

  /**
   * CORRECCIÓN: Animación de barras mejorada sin delays que oculten contenido
   */
  private animateSkillBars(): void {
    // CORRECCIÓN: Sin delay inicial - mostrar inmediatamente
    try {
      // Animar barras de progreso regulares
      const skillBars = document.querySelectorAll('.skill-progress-bar');
      skillBars.forEach((bar: any) => {
        // CORRECCIÓN: Resetear ancho primero para re-animación
        bar.style.width = '0%';
        const percentage = bar.getAttribute('data-percentage');
        if (percentage && !isNaN(percentage)) {
          // CORRECCIÓN: Aplicar ancho después de un delay mínimo
          setTimeout(() => {
            bar.style.width = percentage + '%';
          }, 50);
        }
      });

      // Animar barras de progreso destacadas
      const featuredBars = document.querySelectorAll('.featured-progress-bar');
      featuredBars.forEach((bar: any) => {
        // CORRECCIÓN: Resetear ancho primero para re-animación
        bar.style.width = '0%';
        const percentage = bar.getAttribute('data-percentage');
        if (percentage && !isNaN(percentage)) {
          // CORRECCIÓN: Aplicar ancho después de un delay mínimo
          setTimeout(() => {
            bar.style.width = percentage + '%';
          }, 50);
        }
      });

      // Asegurar que las tarjetas sean visibles de forma directa e inmediata.
      // NOTA: antes esto además volvía a llamar a `animationService.observeElement()`
      // (pensado para animaciones de scroll con IntersectionObserver) en cada cambio
      // de filtro. Si se hacía doble clic rápido, dos observaciones se pisaban entre
      // sí y una tarjeta podía quedar con opacity:0 para siempre (el observer nunca
      // volvía a disparar el callback final). Se retiró: las tarjetas ahora solo
      // aparecen de forma directa, sin esa animación de reingreso.
      const skillCards = document.querySelectorAll('.skill-card, .featured-skill-card, .level-skill-item');
      skillCards.forEach((card: any) => {
        card.style.opacity = '1';
        card.style.transform = 'none';
      });
    } catch (error) {
      console.warn('Error al animar barras de skill:', error);
    }
  }
}