/**
 * ARCHIVO: src/app/components/footer/footer.component.ts - NAVEGACIÓN ROUTER
 * 
 * DESCRIPCIÓN:
 * Componente Footer con navegación por router de Angular.
 * Versión compacta con acordeón para información de desarrollo.
 * Navegación entre rutas en lugar de scroll a secciones.
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  // Enlaces de navegación - AHORA USAN ROUTER
  public navigationLinks = [
    { id: 'home', label: 'Inicio', icon: 'home', route: '/home' },
    { id: 'about', label: 'Sobre Mí', icon: 'person', route: '/about' },
    { id: 'experience', label: 'Experiencia', icon: 'briefcase', route: '/experience' },
    { id: 'projects', label: 'Proyectos', icon: 'folder', route: '/projects' },
    { id: 'skills', label: 'Skills', icon: 'code-slash', route: '/skills' },
    { id: 'contact', label: 'Contacto', icon: 'mail', route: '/contact' }
  ];

  // Enlaces rápidos
  public quickLinks = [
    {
      label: 'Descargar CV',
      action: () => this.downloadCV(),
      icon: 'download'
    },
    {
      label: 'WAD Doom',
      action: () => this.downloadWAD(),
      icon: 'game-controller'
    },
    {
      label: 'LinkedIn',
      action: () => this.openLinkedIn(),
      icon: 'logo-linkedin'
    },
    {
      label: 'Email',
      action: () => this.sendEmail(),
      icon: 'mail'
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

  // Estado del acordeón - SOLO PARA LA SECCIÓN DE DESARROLLO
  public accordionStates = {
    development: false
  };

  constructor(
    private router: Router,
    private downloadService: DownloadService,
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    // El footer se carga al final, no necesita animaciones especiales
    console.log('👣 [FOOTER] Footer inicializado con navegación por router');
  }

  /**
   * Navega a una ruta específica del portafolio - NUEVA IMPLEMENTACIÓN
   * @param route - Ruta destino
   */
  navigateToRoute(route: string): void {
    console.log('🚀 [FOOTER-NAV] Navegando a ruta:', route);
    
    this.router.navigate([route]).then(success => {
      if (success) {
        console.log('✅ [FOOTER-NAV] Navegación exitosa a:', route);
        // Scroll to top al navegar
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        console.error('❌ [FOOTER-NAV] Error navegando a:', route);
      }
    }).catch(error => {
      console.error('❌ [FOOTER-NAV] Error en navegación:', error);
    });
  }

  /**
   * Navega a una sección específica del portafolio - MÉTODO LEGACY
   * Mantenido para compatibilidad, ahora usa router
   * @param sectionId - ID de la sección (convertido a ruta)
   */
  navigateToSection(sectionId: string): void {
    // Convertir sectionId a ruta
    const route = sectionId === 'home' ? '/home' : `/${sectionId}`;
    this.navigateToRoute(route);
  }

  /**
   * Navega al inicio del portafolio
   */
  scrollToTop(): void {
    // Si ya estamos en home, hacer scroll to top
    if (this.router.url === '/home' || this.router.url === '/') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      // Si no, navegar a home
      this.navigateToRoute('/home');
    }
  }

  /**
   * Descarga el CV de Alejandro
   */
  async downloadCV(): Promise<void> {
    try {
      await this.downloadService.downloadCV();
      console.log('📄 [FOOTER] CV descargado desde footer');
    } catch (error) {
      console.error('❌ [FOOTER] Error al descargar CV:', error);
    }
  }

  /**
   * Descarga WAD de ejemplo de Doom
   */
  async downloadWAD(): Promise<void> {
    try {
      await this.downloadService.downloadDoomWAD();
      console.log('🎮 [FOOTER] WAD descargado desde footer');
    } catch (error) {
      console.error('❌ [FOOTER] Error al descargar WAD:', error);
    }
  }

  /**
   * Abre LinkedIn en nueva pestaña
   */
  openLinkedIn(): void {
    window.open(this.personalInfo.linkedin, '_blank', 'noopener,noreferrer');
    console.log('🔗 [FOOTER] LinkedIn abierto desde footer');
  }

  /**
   * Abre cliente de email
   */
  sendEmail(): void {
    const subject = 'Contacto desde Portafolio - Alejandro Villa';
    const mailtoUrl = `mailto:${this.personalInfo.email}?subject=${encodeURIComponent(subject)}`;
    window.open(mailtoUrl, '_self');
    console.log('📧 [FOOTER] Email iniciado desde footer');
  }

  /**
   * Inicia llamada telefónica
   */
  callPhone(): void {
    window.open(`tel:${this.personalInfo.phone}`, '_self');
    console.log('📞 [FOOTER] Llamada iniciada desde footer');
  }

  /**
   * Abre WhatsApp con mensaje predefinido
   */
  openWhatsApp(): void {
    const message = 'Hola Alejandro, te contacto desde tu portafolio web para...';
    const phoneNumber = this.personalInfo.phone.replace(/[^\d]/g, '');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    console.log('💬 [FOOTER] WhatsApp abierto desde footer');
  }

  /**
   * Toggle del tema desde el footer
   */
  toggleTheme(): void {
    this.themeService.toggleTheme();
    console.log('🎨 [FOOTER] Tema cambiado desde footer a:', this.themeService.getCurrentTheme());
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
      console.log('📋 [FOOTER] Email copiado al portapapeles desde footer');
      // Aquí podrías mostrar un toast de confirmación
    } catch (error) {
      console.warn('⚠️ [FOOTER] No se pudo copiar al portapapeles:', error);
    }
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
   * Toggle del estado de acordeón SOLO para desarrollo
   * @param section - Sección del acordeón a toggle
   */
  toggleAccordion(section: keyof typeof this.accordionStates): void {
    this.accordionStates[section] = !this.accordionStates[section];
    console.log(`📂 [FOOTER] Acordeón '${section}' ${this.accordionStates[section] ? 'abierto' : 'cerrado'}`);
  }

  /**
   * Verifica si un acordeón está expandido
   * @param section - Sección del acordeón
   * @returns true si está expandido
   */
  isAccordionExpanded(section: keyof typeof this.accordionStates): boolean {
    return this.accordionStates[section];
  }

  /**
   * Verifica si una ruta está activa (para highlighting de navegación)
   * @param route - Ruta a verificar
   * @returns true si la ruta está activa
   */
  isActiveRoute(route: string): boolean {
    const currentRoute = this.router.url;
    
    // Comparación exacta
    if (currentRoute === route) {
      return true;
    }
    
    // Para home, también considerar la ruta raíz
    if (route === '/home' && (currentRoute === '/' || currentRoute === '/home')) {
      return true;
    }
    
    return false;
  }

  /**
   * Obtiene el estado actual de la ruta para debugging
   * @returns Información sobre la ruta actual
   */
  getCurrentRouteInfo(): { url: string; active: string[] } {
    const currentUrl = this.router.url;
    const activeRoutes = this.navigationLinks
      .filter(link => this.isActiveRoute(link.route))
      .map(link => link.label);
    
    return {
      url: currentUrl,
      active: activeRoutes
    };
  }
}