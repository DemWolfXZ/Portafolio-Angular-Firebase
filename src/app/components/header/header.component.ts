/**
 * ARCHIVO: src/app/components/header/header.component.ts - NAVEGACIÓN ROUTER
 * 
 * DESCRIPCIÓN:
 * Header horizontal fijo con navegación por router de Angular.
 * Detecta ruta activa automáticamente y maneja navegación entre páginas.
 * Diseño similar al proyecto anterior pero con routing real.
 */

import { Component, OnInit, OnDestroy, HostListener, Renderer2, Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { ThemeService } from '@services/theme.service';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  // Subject para cleanup de suscripciones
  private destroy$ = new Subject<void>();

  // Estado del menú móvil
  public mobileMenuOpen: boolean = false;
  
  // Estado del scroll para efectos visuales
  public isScrolled: boolean = false;
  
  // Ruta activa actual
  public activeRoute: string = '/home';

  // Lista de elementos de navegación - RUTAS REALES DEL ROUTER
  public navItems = [
    { id: 'home', label: 'Inicio', icon: 'home', route: '/home' },
    { id: 'about', label: 'Sobre Mí', icon: 'person', route: '/about' },
    { id: 'experience', label: 'Experiencia', icon: 'briefcase', route: '/experience' },
    { id: 'projects', label: 'Proyectos', icon: 'folder', route: '/projects' },
    { id: 'skills', label: 'Skills', icon: 'code-slash', route: '/skills' },
    { id: 'contact', label: 'Contacto', icon: 'mail', route: '/contact' }
  ];

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private themeService: ThemeService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    // Detectar ruta activa al cargar
    this.detectActiveRoute();
    
    // Suscribirse a cambios de ruta
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event) => {
        const navigationEvent = event as NavigationEnd;
        this.activeRoute = navigationEvent.url;
        this.closeMobileMenu(); // Cerrar menú móvil al navegar
        console.log('🔄 [ROUTER] Nueva ruta activa:', this.activeRoute);
      });
    
    // Listener para cerrar menú con tecla Escape
    this.renderer.listen('document', 'keydown.escape', () => {
      if (this.mobileMenuOpen) {
        this.closeMobileMenu();
      }
    });
  }

  /**
   * Listener para detectar el scroll y aplicar efectos visuales al header
   */
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    this.isScrolled = scrollTop > 50;
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
   * Listener para cerrar menú móvil al hacer clic fuera
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    const header = target.closest('.header');
    
    // Si el clic no fue dentro del header y el menú está abierto, cerrarlo
    if (!header && this.mobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  /**
   * Navegación por router - NUEVA IMPLEMENTACIÓN
   * @param route - Ruta de destino
   */
  navigateToRoute(route: string): void {
    console.log('🚀 [NAVEGACIÓN] Navegando a ruta:', route);

    // Cerrar menú móvil inmediatamente
    this.closeMobileMenu();

    // Navegar usando el router de Angular
    this.router.navigate([route]).then(success => {
      if (success) {
        this.activeRoute = route;
        console.log('✅ [NAVEGACIÓN] Navegación exitosa a:', route);
        
        // Scroll to top al cambiar de ruta
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        console.error('❌ [NAVEGACIÓN] Error navegando a:', route);
      }
    }).catch(error => {
      console.error('❌ [NAVEGACIÓN] Error en navegación:', error);
    });
  }

  /**
   * Toggle del tema claro/oscuro
   */
  toggleTheme(): void {
    this.themeService.toggleTheme();
    console.log('🎨 [TEMA] Tema cambiado a:', this.themeService.getCurrentTheme());
  }

  /**
   * Obtiene el estado actual del tema
   * @returns true si está en modo oscuro
   */
  isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }

  /**
   * Toggle del menú móvil
   */
  toggleMobileMenu(): void {
    if (this.mobileMenuOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  /**
   * Abre el menú móvil
   */
  openMobileMenu(): void {
    this.mobileMenuOpen = true;
    console.log('📱 [MENÚ] Menú móvil abierto');
    
    // Prevenir scroll del body cuando el menú está abierto
    this.renderer.addClass(this.document.body, 'menu-open');
  }

  /**
   * Cierra el menú móvil
   */
  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
    console.log('📱 [MENÚ] Menú móvil cerrado');
    
    // Restaurar scroll del body
    this.renderer.removeClass(this.document.body, 'menu-open');
  }

  /**
   * Detecta la ruta activa actual
   */
  private detectActiveRoute(): void {
    this.activeRoute = this.router.url;
    console.log('🎯 [ROUTER] Ruta inicial detectada:', this.activeRoute);
  }

  /**
   * Verifica si una ruta está activa
   * @param route - Ruta a verificar
   * @returns true si la ruta está activa
   */
  isActiveRoute(route: string): boolean {
    // Comparación exacta de rutas
    const isActive = this.activeRoute === route;
    
    // Para rutas que redirectan a /home
    if (!isActive && route === '/home') {
      return this.activeRoute === '/' || this.activeRoute === '/home';
    }
    
    return isActive;
  }

  /**
   * Obtiene el label del item de navegación para el estado activo
   * @param route - Ruta del item
   * @returns Label del item o cadena vacía
   */
  getNavItemLabel(route: string): string {
    const item = this.navItems.find(nav => nav.route === route);
    return item ? item.label : '';
  }

  /**
   * Obtiene el ícono del item de navegación
   * @param route - Ruta del item
   * @returns Ícono del item o ícono por defecto
   */
  getNavItemIcon(route: string): string {
    const item = this.navItems.find(nav => nav.route === route);
    return item ? item.icon : 'help-circle';
  }

  /**
   * Maneja errores de navegación
   * @param route - Ruta que falló
   */
  private handleNavigationError(route: string): void {
    console.error(`❌ [NAVEGACIÓN] No se pudo navegar a: ${route}`);
    
    // Intentar navegar a home como fallback
    if (route !== '/home') {
      console.log('🔄 [NAVEGACIÓN] Intentando fallback a /home');
      this.router.navigate(['/home']).catch(error => {
        console.error('❌ [NAVEGACIÓN] Error en fallback:', error);
      });
    }
  }

  /**
   * Verifica si el router está configurado correctamente
   * @returns true si hay rutas configuradas
   */
  private isRouterConfigured(): boolean {
    return this.navItems.length > 0;
  }

  /**
   * Inicializa la detección de rutas activas
   */
  private initRouteDetection(): void {
    // Verificar configuración del router
    if (!this.isRouterConfigured()) {
      console.warn('⚠️ [ROUTER] No hay items de navegación configurados');
      return;
    }

    // Log de rutas disponibles
    console.log('📋 [ROUTER] Rutas disponibles:', this.navItems.map(item => item.route));
  }

  /**
   * Cleanup al destruir el componente
   */
  ngOnDestroy(): void {
    // Completar subject para cleanup de suscripciones
    this.destroy$.next();
    this.destroy$.complete();
    
    // Asegurar que el menú móvil se cierre
    this.closeMobileMenu();
  }
}