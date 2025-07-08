/**
 * ARCHIVO: src/app/components/footer/footer.component.ts
 * 
 * DESCRIPCIÓN:
 * Componente Footer del portafolio de Alejandro Villa.
 * Incluye links de navegación, información de contacto, enlaces sociales,
 * información de copyright y accesos rápidos a descarga de CV y WADs.
 * Diseño responsivo con animaciones sutiles.
 */

import { Component, OnInit } from '@angular/core';
import { DownloadService } from '../../services/download.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  // Información personal básica
  public personalInfo = {
    name: 'Alejandro Villa Villavicencio',
    title: 'Technical Business Analyst & IT Specialist',
    email: 'alejandro.villa91@gmail.com',
    phone: '+56 920913551',
    location: 'San Bernardo, Santiago, Chile',
    linkedin: 'https://www.linkedin.com/in/alejandro-villa-villavicencio/'
  };

  // Enlaces de navegación
  public navigationLinks = [
    { id: 'home', label: 'Inicio', icon: 'home' },
    { id: 'about', label: 'Sobre Mí', icon: 'person' },
    { id: 'experience', label: 'Experiencia', icon: 'briefcase' },
    { id: 'projects', label: 'Proyectos', icon: 'folder' },
    { id: 'skills', label: 'Competencias', icon: 'code-slash' },
    { id: 'contact', label: 'Contacto', icon: 'mail' }
  ];

  // Enlaces rápidos
  public quickLinks = [
    {
      label: 'Descargar CV',
      action: () => this.downloadCV(),
      icon: 'download'
    },
    {
      label: 'WAD Doom Ejemplo',
      action: () => this.downloadWAD(),
      icon: 'game-controller'
    },
    {
      label: 'LinkedIn',
      action: () => this.openLinkedIn(),
      icon: 'logo-linkedin'
    },
    {
      label: 'Email Directo',
      action: () => this.sendEmail(),
      icon: 'mail'
    }
  ];

  // Enlaces de proyectos destacados
  public featuredProjects = [
    {
      name: 'Sistema SRM Portal',
      url: 'https://portal-superacionpobreza.web.app/tesis-pais',
      description: 'Sistema en producción'
    },
    {
      name: 'Sistema Unidad Territorial',
      url: 'https://sistema-unidad-terrritorial.web.app/#/login',
      description: 'Proyecto de título'
    },
    {
      name: 'AST Digital',
      url: 'https://ast-digital.web.app/',
      description: 'Formulario profesional'
    }
  ];

  // Información técnica del sitio
  public siteInfo = {
    builtWith: ['Angular 20', 'Ionic 8', 'Firebase 11', 'TypeScript 5.4'],
    version: '1.0.0',
    lastUpdate: new Date(),
    repository: null // Privado por ahora
  };

  // Año actual para copyright
  public currentYear = new Date().getFullYear();

  // Estados de acordeones colapsables
  public accordionStates = {
    navigation: false,
    quickLinks: false,
    projects: false,
    development: false
  };

  constructor(
    private downloadService: DownloadService,
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    // El footer se carga al final, no necesita animaciones especiales
  }

  /**
   * Navega a una sección específica del portafolio
   * @param sectionId - ID de la sección destino
   */
  navigateToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }

  /**
   * Navega al inicio del portafolio
   */
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  /**
   * Descarga el CV de Alejandro
   */
  async downloadCV(): Promise<void> {
    try {
      await this.downloadService.downloadCV();
    } catch (error) {
      console.error('Error al descargar CV:', error);
    }
  }

  /**
   * Descarga WAD de ejemplo de Doom
   */
  async downloadWAD(): Promise<void> {
    try {
      await this.downloadService.downloadDoomWAD();
    } catch (error) {
      console.error('Error al descargar WAD:', error);
    }
  }

  /**
   * Abre LinkedIn en nueva pestaña
   */
  openLinkedIn(): void {
    window.open(this.personalInfo.linkedin, '_blank', 'noopener,noreferrer');
  }

  /**
   * Abre cliente de email
   */
  sendEmail(): void {
    const subject = 'Contacto desde Portafolio - Alejandro Villa';
    const mailtoUrl = `mailto:${this.personalInfo.email}?subject=${encodeURIComponent(subject)}`;
    window.open(mailtoUrl, '_self');
  }

  /**
   * Inicia llamada telefónica
   */
  callPhone(): void {
    window.open(`tel:${this.personalInfo.phone}`, '_self');
  }

  /**
   * Abre WhatsApp con mensaje predefinido
   */
  openWhatsApp(): void {
    const message = 'Hola Alejandro, te contacto desde tu portafolio web para...';
    const phoneNumber = this.personalInfo.phone.replace(/[^\d]/g, '');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  }

  /**
   * Abre un proyecto destacado en nueva pestaña
   * @param project - Proyecto a abrir
   */
  openProject(project: any): void {
    window.open(project.url, '_blank', 'noopener,noreferrer');
  }

  /**
   * Toggle del tema desde el footer
   */
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  /**
   * Verifica si está en modo oscuro
   * @returns true si está en modo oscuro
   */
  isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }

  /**
   * Copia el email al portapapeles
   */
  async copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.personalInfo.email);
      // Aquí podrías mostrar un toast de confirmación
    } catch (error) {
      console.warn('No se pudo copiar al portapapeles:', error);
    }
  }

  /**
   * Formatea la fecha de última actualización
   * @returns String con fecha formateada
   */
  getFormattedLastUpdate(): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return this.siteInfo.lastUpdate.toLocaleDateString('es-CL', options);
  }

  /**
   * Obtiene el tiempo transcurrido desde la última actualización
   * @returns String con tiempo transcurrido
   */
  getTimeSinceUpdate(): string {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - this.siteInfo.lastUpdate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      return 'hace 1 día';
    } else if (diffDays < 30) {
      return `hace ${diffDays} días`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return months === 1 ? 'hace 1 mes' : `hace ${months} meses`;
    } else {
      const years = Math.floor(diffDays / 365);
      return years === 1 ? 'hace 1 año' : `hace ${years} años`;
    }
  }

  /**
   * Genera un mensaje de estado aleatorio para el footer
   * @returns String con mensaje de estado
   */
  getStatusMessage(): string {
    const messages = [
      '🚀 Disponible para nuevos proyectos',
      '💻 Desarrollando soluciones técnicas',
      '🔧 Coordinando implementaciones',
      '📚 Siempre aprendiendo nuevas tecnologías',
      '⚡ 20+ años resolviendo problemas técnicos'
    ];
    
    // Usar el día del año para obtener siempre el mismo mensaje por día
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    return messages[dayOfYear % messages.length];
  }

  /**
   * Toggle del estado de acordeón
   * @param section - Sección del acordeón a toggle
   */
  toggleAccordion(section: keyof typeof this.accordionStates): void {
    this.accordionStates[section] = !this.accordionStates[section];
  }

  /**
   * Verifica si un acordeón está expandido
   * @param section - Sección del acordeón
   * @returns true si está expandido
   */
  isAccordionExpanded(section: keyof typeof this.accordionStates): boolean {
    return this.accordionStates[section];
  }
}