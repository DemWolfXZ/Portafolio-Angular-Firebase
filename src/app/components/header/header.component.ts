/**
 * ARCHIVO: src/app/components/header/header.component.ts - PROFESIONAL
 * 
 * DESCRIPCIÓN:
 * Header horizontal fijo profesional como en las imágenes de referencia.
 * Diseño similar al proyecto anterior con colores azul profesional.
 * Navegación horizontal en desktop, hamburguesa en móvil.
 */

import { Component, OnInit, HostListener, Renderer2, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { ThemeService } from '@services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // Estado del menú móvil
  public mobileMenuOpen: boolean = false;
  
  // Estado del scroll para efectos visuales
  public isScrolled: boolean = false;
  
  // Ruta activa actual
  public activeRoute: string = '/home';

  // Lista de elementos de navegación - RUTAS DEL ROUTER
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
      } else {
        console.error('❌ [NAVEGACIÓN] Error navegando a:', route);
      }
    });
  }

  /**
   * Toggle del tema claro/oscuro
   */
  toggleTheme(): void {
    this.themeService.toggleTheme();
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
  }

  /**
   * Cierra el menú móvil
   */
  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
    console.log('📱 [MENÚ] Menú móvil cerrado');
  }

  /**
   * Detecta la ruta activa actual
   */
  private detectActiveRoute(): void {
    this.activeRoute = this.router.url;
  }

  /**
   * Verifica si una ruta está activa
   * @param route - Ruta a verificar
   * @returns true si la ruta está activa
   */
  isActiveRoute(route: string): boolean {
    return this.activeRoute === route;
  }
}
