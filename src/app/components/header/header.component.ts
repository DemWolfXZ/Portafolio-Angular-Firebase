/**
 * ARCHIVO: src/app/components/header/header.component.ts - COMPLETO Y FUNCIONANDO
 * 
 * DESCRIPCIÓN:
 * Componente Header corregido para funcionar perfectamente en móvil y PC.
 * Maneja la navegación entre secciones, toggle de tema y menú responsivo.
 * Se mantiene fijo en la parte superior durante el scroll.
 * FUNCIONALIDAD COMPLETA: navegación, menú móvil, scroll detection
 */

import { Component, OnInit, HostListener, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  // Estado del menú móvil
  public mobileMenuOpen: boolean = false;
  
  // Estado del scroll para efectos visuales
  public isScrolled: boolean = false;
  
  // Sección activa en la navegación
  public activeSection: string = 'home';

  // Lista de elementos de navegación
  public navItems = [
    { id: 'home', label: 'Inicio', icon: 'home' },
    { id: 'about', label: 'Sobre Mí', icon: 'person' },
    { id: 'experience', label: 'Experiencia', icon: 'briefcase' },
    { id: 'projects', label: 'Proyectos', icon: 'folder' },
    { id: 'skills', label: 'Skills', icon: 'code-slash' },
    { id: 'contact', label: 'Contacto', icon: 'mail' }
  ];

  // Estado del tema
  private currentTheme: 'light' | 'dark' = 'light';

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    // Detectar sección activa al cargar
    this.detectActiveSection();
    
    // Cargar tema guardado
    this.loadTheme();
    
    // Listener para cerrar menú con tecla Escape
    this.renderer.listen('document', 'keydown.escape', () => {
      if (this.mobileMenuOpen) {
        this.closeMobileMenu();
      }
    });

    // Detectar cambios en el tema del sistema
    this.watchSystemTheme();
  }

  /**
   * Listener para detectar el scroll y aplicar efectos visuales al header
   * Cambia el estilo del header cuando el usuario hace scroll
   */
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    this.isScrolled = scrollTop > 50;
    
    // Detectar sección activa basada en el scroll
    this.detectActiveSection();
  }

  /**
   * Listener para cerrar menú móvil en resize de pantalla
   */
  @HostListener('window:resize', ['$event'])
  onWindowResize(): void {
    // Cerrar menú móvil si la pantalla se agranda
    if (window.innerWidth > 768 && this.mobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  /**
   * Navegación suave entre secciones
   * Utiliza scroll behavior smooth para una transición fluida
   * @param sectionId - ID de la sección destino
   */
  navigateToSection(sectionId: string): void {
    console.log('Navegando a sección:', sectionId); // Debug

    const element = document.getElementById(sectionId);
    if (element) {
      // Calcular offset para el header fijo
      let headerHeight = 80;
      
      // Ajustar altura del header según el dispositivo
      if (window.innerWidth <= 768) {
        headerHeight = 70;
      }
      if (window.innerWidth <= 480) {
        headerHeight = 60;
      }
      if (window.innerWidth <= 320) {
        headerHeight = 56;
      }
      
      let elementPosition = element.offsetTop - headerHeight;
      
      // Para el home, ir al top absoluto
      if (sectionId === 'home') {
        elementPosition = 0;
      }
      
      console.log('Scrolling to position:', elementPosition); // Debug
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      
      // Cerrar menú móvil después de navegar
      this.closeMobileMenu();
      this.activeSection = sectionId;
    } else {
      console.error('Elemento no encontrado:', sectionId); // Debug
    }
  }

  /**
   * Toggle del tema claro/oscuro
   * Utiliza manejo directo para evitar dependencias
   */
  toggleTheme(): void {
    console.log('Toggle theme clicked'); // Debug
    
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(this.currentTheme);
    this.saveTheme(this.currentTheme);
  }

  /**
   * Obtiene el estado actual del tema
   * @returns true si está en modo oscuro
   */
  isDarkMode(): boolean {
    return this.currentTheme === 'dark';
  }

  /**
   * Toggle del menú móvil
   * Controla la visibilidad del menú en dispositivos móviles
   */
  toggleMobileMenu(): void {
    console.log('Toggle mobile menu clicked, current state:', this.mobileMenuOpen); // Debug
    
    if (this.mobileMenuOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  /**
   * Abre el menú móvil
   * Previene el scroll del body cuando está abierto
   */
  openMobileMenu(): void {
    console.log('Opening mobile menu'); // Debug
    
    this.mobileMenuOpen = true;
    
    // Prevenir scroll del body
    this.renderer.addClass(this.document.body, 'mobile-menu-open');
    
    // Focus management para accesibilidad
    setTimeout(() => {
      const firstMenuItem = this.document.querySelector('.mobile-nav-link') as HTMLElement;
      if (firstMenuItem) {
        firstMenuItem.focus();
      }
    }, 100);
  }

  /**
   * Cierra el menú móvil
   * Restaura el scroll del body
   */
  closeMobileMenu(): void {
    console.log('Closing mobile menu'); // Debug
    
    this.mobileMenuOpen = false;
    
    // Restaurar scroll del body
    this.renderer.removeClass(this.document.body, 'mobile-menu-open');
  }

  /**
   * Detecta qué sección está actualmente visible en el viewport
   * Actualiza la navegación para mostrar la sección activa
   */
  private detectActiveSection(): void {
    const sections = this.navItems.map(item => item.id);
    let currentSection = 'home';
    
    // Calcular altura del header según el dispositivo
    let headerHeight = 80;
    if (window.innerWidth <= 768) {
      headerHeight = 70;
    }
    if (window.innerWidth <= 480) {
      headerHeight = 60;
    }
    if (window.innerWidth <= 320) {
      headerHeight = 56;
    }
    
    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element) {
        const rect = element.getBoundingClientRect();
        
        // Si la sección está visible en el viewport
        if (rect.top <= headerHeight + 100 && rect.bottom >= headerHeight) {
          currentSection = sectionId;
          break;
        }
      }
    }
    
    this.activeSection = currentSection;
  }

  /**
   * Verifica si un elemento de navegación está activo
   * @param sectionId - ID de la sección a verificar
   * @returns true si la sección está activa
   */
  isActiveSection(sectionId: string): boolean {
    return this.activeSection === sectionId;
  }

  /**
   * Carga el tema guardado del usuario al iniciar la aplicación
   */
  private loadTheme(): void {
    try {
      // Obtener tema guardado del localStorage
      const savedTheme = localStorage.getItem('portfolio-theme') as 'light' | 'dark';
      
      if (savedTheme) {
        this.currentTheme = savedTheme;
      } else {
        // Si no hay tema guardado, usar preferencia del sistema
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.currentTheme = prefersDark ? 'dark' : 'light';
      }
      
      this.applyTheme(this.currentTheme);
    } catch (error) {
      console.warn('Error al cargar tema:', error);
      // Fallback a tema claro
      this.applyTheme('light');
    }
  }

  /**
   * Aplica el tema al document.body
   * @param theme - Tema a aplicar
   */
  private applyTheme(theme: 'light' | 'dark'): void {
    try {
      // Remover clases de tema existentes
      this.renderer.removeClass(this.document.body, 'light-theme');
      this.renderer.removeClass(this.document.body, 'dark-theme');
      
      // Aplicar nueva clase de tema
      this.renderer.addClass(this.document.body, `${theme}-theme`);
      
      // También aplicar al elemento html para mayor compatibilidad
      this.renderer.removeClass(this.document.documentElement, 'light-theme');
      this.renderer.removeClass(this.document.documentElement, 'dark-theme');
      this.renderer.addClass(this.document.documentElement, `${theme}-theme`);
      
      // Actualizar meta theme-color para móviles
      this.updateMetaThemeColor(theme);
      
    } catch (error) {
      console.error('Error al aplicar tema:', error);
    }
  }

  /**
   * Guarda el tema en localStorage
   * @param theme - Tema a guardar
   */
  private saveTheme(theme: 'light' | 'dark'): void {
    try {
      localStorage.setItem('portfolio-theme', theme);
    } catch (error) {
      console.warn('Error al guardar tema en localStorage:', error);
    }
  }

  /**
   * Actualiza el meta theme-color para la barra de estado en móviles
   * @param theme - Tema actual
   */
  private updateMetaThemeColor(theme: 'light' | 'dark'): void {
    try {
      let themeColorMeta = this.document.querySelector('meta[name="theme-color"]') as HTMLMetaElement;
      
      if (!themeColorMeta) {
        themeColorMeta = this.renderer.createElement('meta');
        this.renderer.setAttribute(themeColorMeta, 'name', 'theme-color');
        this.renderer.appendChild(this.document.head, themeColorMeta);
      }
      
      // Colores para la barra de estado
      const themeColors = {
        light: '#f8f9fa',
        dark: '#0f1419'
      };
      
      this.renderer.setAttribute(themeColorMeta, 'content', themeColors[theme]);
    } catch (error) {
      console.warn('Error al actualizar meta theme-color:', error);
    }
  }

  /**
   * Escucha cambios en la preferencia del sistema
   */
  private watchSystemTheme(): void {
    try {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      mediaQuery.addEventListener('change', (e) => {
        // Solo cambiar si no hay preferencia guardada del usuario
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (!savedTheme) {
          const systemTheme = e.matches ? 'dark' : 'light';
          this.currentTheme = systemTheme;
          this.applyTheme(systemTheme);
        }
      });
    } catch (error) {
      console.warn('Error al configurar listener del sistema:', error);
    }
  }
}