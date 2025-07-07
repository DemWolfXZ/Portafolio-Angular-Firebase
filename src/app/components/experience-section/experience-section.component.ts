// src/app/components/experience-section/experience-section.component.ts
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AnimationService } from '@services/animation.service';
import { FORMAL_EXPERIENCE, INDEPENDENT_EXPERIENCE, WorkExperience } from '@models/experience.model';

/**
 * Componente para la sección de experiencia laboral del portafolio.
 * Muestra timeline separado entre experiencia formal e independiente,
 * destacando los 20+ años de experiencia práctica de Alejandro Villa
 * y sus roles de coordinación técnica y análisis de sistemas.
 */
@Component({
  selector: 'app-experience-section',
  templateUrl: './experience-section.component.html',
  styleUrls: ['./experience-section.component.scss'],
})
export class ExperienceSectionComponent implements OnInit {

  // Datos de experiencia importados desde el modelo
  public formalExperience = FORMAL_EXPERIENCE;
  public independentExperience = INDEPENDENT_EXPERIENCE;

  // Estado de la vista
  public activeTab: 'formal' | 'independent' | 'all' = 'all';
  public animationsLoaded = false;
  public selectedExperience: WorkExperience | null = null;

  // Configuración de tabs
  public tabs = [
    {
      id: 'all' as const,
      label: 'Vista Completa',
      description: 'Experiencia formal + independiente',
      icon: 'layers'
    },
    {
      id: 'formal' as const,
      label: 'Experiencia Formal',
      description: 'Roles en empresas y organizaciones',
      icon: 'briefcase'
    },
    {
      id: 'independent' as const,
      label: 'Experiencia Independiente',
      description: '20+ años como técnico independiente',
      icon: 'construct'
    }
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
   * Cambia entre diferentes vistas de experiencia
   * @param tabId - ID del tab a activar
   */
  setActiveTab(tabId: 'formal' | 'independent' | 'all'): void {
    this.activeTab = tabId;
    
    // Re-animar elementos cuando cambia el tab
    setTimeout(() => {
      this.initAnimations();
    }, 100);
  }

  /**
   * Obtiene la experiencia a mostrar según el tab activo
   * @returns Array de experiencia filtrada
   */
  getDisplayedExperience(): WorkExperience[] {
    switch (this.activeTab) {
      case 'formal':
        return this.formalExperience;
      case 'independent':
        return this.independentExperience;
      case 'all':
      default:
        return [...this.formalExperience, ...this.independentExperience]
          .sort((a, b) => a.displayOrder - b.displayOrder);
    }
  }

  /**
   * Abre modal con detalles de una experiencia específica
   * @param experience - Experiencia a mostrar en detalle
   */
  openExperienceDetail(experience: WorkExperience): void {
    this.selectedExperience = experience;
  }

  /**
   * Cierra el modal de detalles
   */
  closeExperienceDetail(): void {
    this.selectedExperience = null;
  }

  /**
   * Calcula la duración de una experiencia en texto legible
   * @param experience - Experiencia para calcular duración
   * @returns String con duración formateada
   */
  calculateDuration(experience: WorkExperience): string {
    if (experience.dates.duration) {
      return experience.dates.duration;
    }

    const startDate = experience.dates.startDate;
    const endDate = experience.dates.endDate || new Date();
    
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffMonths / 12);

    if (diffYears > 0) {
      const remainingMonths = diffMonths % 12;
      if (remainingMonths > 0) {
        return `${diffYears} año${diffYears > 1 ? 's' : ''} ${remainingMonths} mes${remainingMonths > 1 ? 'es' : ''}`;
      }
      return `${diffYears} año${diffYears > 1 ? 's' : ''}`;
    } else if (diffMonths > 0) {
      return `${diffMonths} mes${diffMonths > 1 ? 'es' : ''}`;
    } else {
      return 'Menos de 1 mes';
    }
  }

  /**
   * Formatea fechas para mostrar en el timeline
   * @param date - Fecha a formatear
   * @returns String con fecha formateada
   */
  formatDate(date: Date): string {
    const months = [
      'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
      'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
    ];
    
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  }

  /**
   * Verifica si una experiencia está actualmente activa
   * @param experience - Experiencia a verificar
   * @returns true si la experiencia está activa
   */
  isCurrentExperience(experience: WorkExperience): boolean {
    return experience.current || !experience.dates.endDate;
  }

  /**
   * Obtiene el color del tipo de experiencia para UI
   * @param type - Tipo de experiencia
   * @returns String con el color CSS
   */
  getExperienceTypeColor(type: string): string {
    const colors = {
      'formal': 'var(--ion-color-primary)',
      'independent': 'var(--ion-color-accent)',
      'freelance': '#6C5CE7',
      'volunteer': '#00CEC9'
    };
    return colors[type as keyof typeof colors] || 'var(--ion-color-primary)';
  }

  /**
   * Calcula años totales de experiencia
   * @returns Número de años desde 2007
   */
  getTotalYearsOfExperience(): number {
    const startYear = 2007;
    const currentYear = new Date().getFullYear();
    return currentYear - startYear;
  }

  /**
   * Obtiene estadísticas de experiencia para mostrar
   * @returns Objeto con estadísticas calculadas
   */
  getExperienceStats() {
    const allExperience = this.getDisplayedExperience();
    
    return {
      totalYears: this.getTotalYearsOfExperience(),
      formalRoles: this.formalExperience.length,
      companiesWorked: new Set(this.formalExperience.map(exp => exp.company)).size,
      currentlyActive: allExperience.filter(exp => this.isCurrentExperience(exp)).length
    };
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
   * Inicializa animaciones para elementos de la sección
   */
  private initAnimations(): void {
    // Animar elementos principales
    const animatedElements = document.querySelectorAll('.experience-animate');
    
    animatedElements.forEach((element, index) => {
      this.animationService.observeElement(
        element,
        'slideInUp',
        0.1
      );
    });

    // Animar items del timeline con delay escalonado
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
      setTimeout(() => {
        this.animationService.observeElement(item, 'slideInLeft', 0.2);
      }, index * 100);
    });
  }
}