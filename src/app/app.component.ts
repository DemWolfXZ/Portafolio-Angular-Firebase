/**
 * ARCHIVO: src/app/app.component.ts
 * 
 * DESCRIPCIÓN:
 * Componente principal con sidemenu nativo de Ionic.
 * Controla la navegación, tema y estructura del layout principal.
 * Incluye gestión de rutas activas y toggle de tema.
 */

import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { filter } from 'rxjs/operators';
import { ThemeService } from '@services/theme.service';

// Interfaz para elementos del menú
interface MenuPage {
  title: string;
  url: string;
  icon: string;
  description?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  // Información personal para el menú
  public personalInfo = {
    name: 'Alejandro Villa',
    title: 'Technical Business Analyst',
    subtitle: '20+ años de experiencia',
    email: 'alejandro.villa91@gmail.com',
    phone: '+56 920913551',
    location: 'Santiago, Chile'
  };

  // Elementos del menú principal
  public appPages: MenuPage[] = [
    {
      title: 'Inicio',
      url: '/home',
      icon: 'home',
      description: 'Presentación principal'
    },
    {
      title: 'Sobre Mí',
      url: '/about',
      icon: 'person',
      description: 'Mi historia y experiencia'
    },
    {
      title: 'Experiencia',
      url: '/experience',
      icon: 'briefcase',
      description: 'Trayectoria profesional'
    },
    {
      title: 'Proyectos',
      url: '/projects',
      icon: 'folder',
      description: 'Trabajos realizados'
    },
    {
      title: 'Competencias',
      url: '/skills',
      icon: 'code-slash',
      description: 'Habilidades técnicas'
    },
    {
      title: 'Contacto',
      url: '/contact',
      icon: 'mail',
      description: 'Información de contacto'
    }
  ];

  // Enlaces adicionales del menú
  public actionPages: MenuPage[] = [
    {
      title: 'Descargar CV',
      url: '/cv-download',
      icon: 'download'
    },
    {
      title: 'LinkedIn',
      url: '/linkedin',
      icon: 'logo-linkedin'
    }
  ];

  // Página activa actual
  public selectedPath = '';

  constructor(
    private router: Router,
    private menuController: MenuController,
    private themeService: ThemeService
  ) {
    this.initializeApp();
  }

  ngOnInit(): void {
    // Cargar tema al iniciar
    this.themeService.loadTheme();
    
    // Detectar cambios de ruta para actualizar menú activo
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.selectedPath = event.urlAfterRedirects;
        }
      });
  }

  /**
   * Inicialización de la aplicación
   */
  private initializeApp(): void {
    // Configuraciones iniciales si son necesarias
    console.log('Portafolio Alejandro Villa - Inicializado');
  }

  /**
   * Navega a una página específica y cierra el menú
   * @param url - URL de destino
   */
  navigateToPage(url: string): void {
    // Manejar URLs especiales
    if (url === '/cv-download') {
      this.downloadCV();
      return;
    }
    
    if (url === '/linkedin') {
      this.openLinkedIn();
      return;
    }

    // Navegación normal
    this.router.navigate([url]);
    this.menuController.close('main-menu');
  }

  /**
   * Verifica si una página está activa
   * @param url - URL a verificar
   * @returns true si está activa
   */
  isPageActive(url: string): boolean {
    return this.selectedPath === url;
  }

  /**
   * Toggle del tema claro/oscuro
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
   * Descarga el CV
   */
  private downloadCV(): void {
    const cvUrl = 'assets/cv/CV_Alejandro_Villa_2025.pdf';
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'CV_Alejandro_Villa_2025.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.menuController.close('main-menu');
  }

  /**
   * Abre LinkedIn en nueva pestaña
   */
  private openLinkedIn(): void {
    window.open('https://www.linkedin.com/in/alejandro-villa-villavicencio/', '_blank', 'noopener,noreferrer');
    this.menuController.close('main-menu');
  }

  /**
   * Inicia llamada telefónica
   */
  callPhone(): void {
    window.open(`tel:${this.personalInfo.phone}`, '_self');
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
   * Cierra el menú programáticamente
   */
  closeMenu(): void {
    this.menuController.close('main-menu');
  }
}