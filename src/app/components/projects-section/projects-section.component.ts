// src/app/components/projects-section/projects-section.component.ts
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AnimationService } from '@services/animation.service';
import { DownloadService } from '@services/download.service';
import { Project, ALEJANDRO_PROJECTS, CREATIVE_PROJECTS, ProjectCategory } from '@models/project.model';

/**
 * Componente para la sección de proyectos del portafolio.
 * Muestra grid de proyectos profesionales, académicos y creativos (WADs).
 * Incluye filtros por categoría, enlaces a proyectos reales funcionando
 * y sección especial para WADs de Doom demostrando creatividad técnica.
 */
@Component({
  selector: 'app-projects-section',
  templateUrl: './projects-section.component.html',
  styleUrls: ['./projects-section.component.scss'],
})
export class ProjectsSectionComponent implements OnInit {

  // Datos de proyectos importados desde el modelo
  public professionalProjects = ALEJANDRO_PROJECTS;
  public creativeProjects = CREATIVE_PROJECTS;
  
  // Estado del componente
  public activeFilter: ProjectCategory | 'all' = 'all';
  public animationsLoaded = false;
  public selectedProject: Project | null = null;

  // Configuración de filtros
  public filters = [
    {
      id: 'all' as const,
      label: 'Todos los Proyectos',
      description: 'Vista completa del portafolio',
      icon: 'apps',
      count: this.getAllProjects().length
    },
    {
      id: 'professional' as ProjectCategory,
      label: 'Proyectos Profesionales',
      description: 'Sistemas en producción',
      icon: 'briefcase',
      count: this.professionalProjects.length
    },
    {
      id: 'academic' as ProjectCategory,
      label: 'Proyectos Académicos',
      description: 'Desarrollos universitarios',
      icon: 'school',
      count: this.professionalProjects.filter(p => p.category === 'academic').length
    },
    {
      id: 'creative' as ProjectCategory,
      label: 'Proyectos Creativos',
      description: 'WADs y modificaciones',
      icon: 'game-controller',
      count: this.creativeProjects.length
    }
  ];

  constructor(
    private animationService: AnimationService,
    private downloadService: DownloadService
  ) { }

  ngOnInit(): void {
    // Activar animaciones después de un delay
    setTimeout(() => {
      this.animationsLoaded = true;
      this.initAnimations();
    }, 300);
  }

  /**
   * Obtiene todos los proyectos combinados
   * @returns Array con todos los proyectos
   */
  getAllProjects(): Project[] {
    return [...this.professionalProjects, ...this.creativeProjects]
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }

  /**
   * Obtiene proyectos filtrados según la categoría activa
   * @returns Array de proyectos filtrados
   */
  getFilteredProjects(): Project[] {
    const allProjects = this.getAllProjects();
    
    if (this.activeFilter === 'all') {
      return allProjects;
    }
    
    return allProjects.filter(project => project.category === this.activeFilter);
  }

  /**
   * Obtiene solo proyectos destacados
   * @returns Array de proyectos featured
   */
  getFeaturedProjects(): Project[] {
    return this.getFilteredProjects().filter(project => project.featured);
  }

  /**
   * Cambia el filtro activo y re-anima la grilla
   * @param filter - Nuevo filtro a aplicar
   */
  setActiveFilter(filter: ProjectCategory | 'all'): void {
    this.activeFilter = filter;
    
    // Re-animar elementos cuando cambia el filtro
    setTimeout(() => {
      this.animateProjectCards();
    }, 100);
  }

  /**
   * Maneja el error de carga de imagen reemplazando con icono
   * @param event - Evento de error de imagen
   */
  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    if (target && target.parentElement) {
      // Crear ion-icon de reemplazo
      const iconElement = document.createElement('ion-icon');
      iconElement.name = 'folder';
      iconElement.className = 'project-icon-fallback';
      iconElement.style.cssText = 'font-size: 60px; color: var(--ion-color-medium); width: 100%; height: 200px; display: flex; align-items: center; justify-content: center;';
      
      // Reemplazar img con ion-icon
      target.parentElement.replaceChild(iconElement, target);
    }
  }

  /**
   * Abre un proyecto en nueva pestaña
   * @param project - Proyecto a abrir
   */
  openProject(project: Project): void {
    if (project.links.live) {
      window.open(project.links.live, '_blank', 'noopener,noreferrer');
    } else if (project.links.demo) {
      window.open(project.links.demo, '_blank', 'noopener,noreferrer');
    }
  }

  /**
   * Abre el repositorio de un proyecto
   * @param project - Proyecto cuyo repo abrir
   */
  openRepository(project: Project): void {
    if (project.links.repository) {
      window.open(project.links.repository, '_blank', 'noopener,noreferrer');
    }
  }

  /**
   * Abre modal con detalles completos del proyecto
   * @param project - Proyecto a mostrar en detalle
   */
  openProjectDetail(project: Project): void {
    this.selectedProject = project;
  }

  /**
   * Cierra el modal de detalles
   */
  closeProjectDetail(): void {
    this.selectedProject = null;
  }

  /**
   * Descarga un WAD de Doom
   * @param project - Proyecto WAD a descargar
   */
  async downloadWAD(project: Project): Promise<void> {
    try {
      if (project.links.download) {
        await this.downloadService.downloadDoomWAD();
      }
    } catch (error) {
      console.error('Error al descargar WAD:', error);
      // Aquí podrías mostrar un toast de error
    }
  }

  /**
   * Obtiene el icono apropiado para cada categoría de proyecto
   * @param category - Categoría del proyecto
   * @returns Nombre del icono
   */
  getCategoryIcon(category: ProjectCategory): string {
    const icons = {
      'professional': 'briefcase',
      'academic': 'school',
      'creative': 'game-controller',
      'personal': 'person'
    };
    return icons[category] || 'folder';
  }

  /**
   * Obtiene el color para cada categoría de proyecto
   * @param category - Categoría del proyecto
   * @returns Color CSS
   */
  getCategoryColor(category: ProjectCategory): string {
    const colors = {
      'professional': 'var(--ion-color-primary)',
      'academic': '#6C5CE7',
      'creative': 'var(--ion-color-accent)',
      'personal': '#00CEC9'
    };
    return colors[category] || 'var(--ion-color-primary)';
  }

  /**
   * Obtiene el label de estado del proyecto
   * @param status - Estado del proyecto
   * @returns String con el label
   */
  getStatusLabel(status: string): string {
    const labels = {
      'completed': 'Completado',
      'in-production': 'En Producción',
      'maintenance': 'Mantenimiento',
      'archived': 'Archivado'
    };
    return labels[status as keyof typeof labels] || status;
  }

  /**
   * Verifica si un proyecto tiene enlaces disponibles
   * @param project - Proyecto a verificar
   * @returns true si tiene enlaces
   */
  hasAvailableLinks(project: Project): boolean {
    return !!(project.links.live || project.links.demo || project.links.repository || project.links.download);
  }

  /**
   * Formatea la fecha de un proyecto
   * @param date - Fecha a formatear
   * @returns String con fecha formateada
   */
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = date.toLocaleString('es', { month: 'short' });
    return `${month} ${year}`;
  }

  /**
   * Navega a la sección de skills
   */
  scrollToSkills(): void {
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      const headerHeight = 80;
      const elementPosition = skillsSection.offsetTop - headerHeight;
      
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
    const animatedElements = document.querySelectorAll('.projects-animate');
    
    animatedElements.forEach((element, index) => {
      this.animationService.observeElement(
        element,
        'slideInUp',
        0.1
      );
    });

    this.animateProjectCards();
  }

  /**
   * Anima las tarjetas de proyectos con delay escalonado
   */
  private animateProjectCards(): void {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
      setTimeout(() => {
        this.animationService.observeElement(card, 'scaleIn', 0.2);
      }, index * 100);
    });
  }
}