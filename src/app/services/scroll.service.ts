/**
 * ARCHIVO: src/app/services/scroll.service.ts
 * 
 * DESCRIPCIÓN:
 * Servicio para manejar la navegación suave entre secciones del portafolio.
 * Controla el scroll animado, detección de secciones activas y efectos visuales
 * durante la navegación. Optimizado para performance y experiencia de usuario.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent } from 'rxjs';
import { throttleTime, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  // Observable para la sección activa actual
  private activeSection$ = new BehaviorSubject<string>('home');
  
  // Observable para el estado de scroll (si se ha hecho scroll desde el top)
  private isScrolled$ = new BehaviorSubject<boolean>(false);

  // Configuración del header fijo
  private readonly HEADER_HEIGHT = 80;

  // Lista de secciones disponibles para navegación
  private readonly SECTIONS = [
    'home', 'about', 'experience', 'projects', 'skills', 'contact'
  ];

  constructor() {
    // Inicializar listeners de scroll al crear el servicio
    this.initScrollListeners();
  }

  /**
   * Obtiene la sección activa actual como Observable
   * @returns Observable<string> - ID de la sección activa
   */
  getActiveSection(): Observable<string> {
    return this.activeSection$.asObservable();
  }

  /**
   * Obtiene el estado de scroll como Observable
   * @returns Observable<boolean> - true si se ha hecho scroll desde el top
   */
  getScrollState(): Observable<boolean> {
    return this.isScrolled$.asObservable();
  }

  /**
   * Navega suavemente a una sección específica
   * Calcula la posición considerando el header fijo
   * @param sectionId - ID de la sección destino
   * @param offset - Offset adicional opcional (por defecto usa altura del header)
   */
  scrollToSection(sectionId: string, offset?: number): void {
    const element = document.getElementById(sectionId);
    
    if (!element) {
      console.warn(`Sección '${sectionId}' no encontrada`);
      return;
    }

    // Calcular posición considerando header fijo
    const elementPosition = element.offsetTop;
    const scrollOffset = offset !== undefined ? offset : this.HEADER_HEIGHT;
    const targetPosition = elementPosition - scrollOffset;

    // Ejecutar scroll suave
    window.scrollTo({
      top: Math.max(0, targetPosition), // Evitar scroll negativo
      behavior: 'smooth'
    });

    // Actualizar sección activa inmediatamente para feedback visual
    this.setActiveSection(sectionId);
  }

  /**
   * Scrollea hasta el top de la página
   * Útil para botones "volver arriba"
   */
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  /**
   * Verifica si una sección está actualmente visible en el viewport
   * @param sectionId - ID de la sección a verificar
   * @returns true si la sección está visible
   */
  isSectionVisible(sectionId: string): boolean {
    const element = document.getElementById(sectionId);
    
    if (!element) return false;

    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Considerar visible si al menos 50% está en viewport
    return rect.top < viewportHeight * 0.5 && rect.bottom > viewportHeight * 0.5;
  }

  /**
   * Obtiene la posición actual de scroll
   * @returns Posición Y del scroll actual
   */
  getCurrentScrollPosition(): number {
    return window.pageYOffset || document.documentElement.scrollTop || 0;
  }

  /**
   * Calcula el porcentaje de scroll de la página
   * Útil para barras de progreso de lectura
   * @returns Porcentaje de 0 a 100
   */
  getScrollPercentage(): number {
    const scrollTop = this.getCurrentScrollPosition();
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    if (documentHeight <= 0) return 0;
    
    return Math.min(100, Math.max(0, (scrollTop / documentHeight) * 100));
  }

  /**
   * Establece manualmente la sección activa
   * @param sectionId - ID de la sección a marcar como activa
   */
  private setActiveSection(sectionId: string): void {
    if (this.SECTIONS.includes(sectionId)) {
      this.activeSection$.next(sectionId);
    }
  }

  /**
   * Inicializa los listeners de scroll con throttling para performance
   * Detecta automáticamente cambios en la sección activa y estado de scroll
   */
  private initScrollListeners(): void {
    // Listener para detectar scroll con throttling para performance
    fromEvent(window, 'scroll')
      .pipe(
        throttleTime(16), // ~60fps para suavidad
        map(() => this.getCurrentScrollPosition())
      )
      .subscribe(scrollPosition => {
        // Actualizar estado de scroll
        this.isScrolled$.next(scrollPosition > 50);
        
        // Detectar sección activa basada en posición
        this.detectActiveSection();
      });

    // Listener para resize para recalcular posiciones
    fromEvent(window, 'resize')
      .pipe(throttleTime(250)) // Throttle más largo para resize
      .subscribe(() => {
        this.detectActiveSection();
      });
  }

  /**
   * Detecta automáticamente qué sección está activa basada en el scroll
   * Utiliza intersection logic para determinar la sección más prominente
   */
  private detectActiveSection(): void {
    let activeSection = 'home';
    let maxVisibleArea = 0;

    // Iterar por todas las secciones para encontrar la más visible
    for (const sectionId of this.SECTIONS) {
      const element = document.getElementById(sectionId);
      
      if (!element) continue;

      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calcular área visible de la sección
      const visibleTop = Math.max(0, -rect.top);
      const visibleBottom = Math.min(rect.height, viewportHeight - rect.top);
      const visibleArea = Math.max(0, visibleBottom - visibleTop);

      // Si esta sección tiene más área visible, es la activa
      if (visibleArea > maxVisibleArea) {
        maxVisibleArea = visibleArea;
        activeSection = sectionId;
      }
    }

    // Actualizar si cambió la sección activa
    if (this.activeSection$.value !== activeSection) {
      this.setActiveSection(activeSection);
    }
  }

  /**
   * Destruye el servicio y limpia listeners
   * Importante para evitar memory leaks
   */
  ngOnDestroy(): void {
    this.activeSection$.complete();
    this.isScrolled$.complete();
  }
}