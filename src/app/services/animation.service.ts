/**
 * ARCHIVO: src/app/services/animation.service.ts
 * 
 * DESCRIPCIÓN:
 * Servicio para manejar animaciones y efectos visuales del portafolio.
 * Controla animaciones de entrada, efectos de hover, transiciones entre temas
 * y optimización de performance para animaciones. Utiliza Intersection Observer
 * para animaciones activadas por scroll.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// Interfaz para configuración de animaciones
interface AnimationConfig {
  duration: number;
  delay: number;
  easing: string;
  direction: 'left' | 'right' | 'top' | 'bottom' | 'fade' | 'scale';
}

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  // Observable para controlar si las animaciones están habilitadas
  private animationsEnabled$ = new BehaviorSubject<boolean>(true);
  
  // Intersection Observer para detectar elementos visibles
  private intersectionObserver!: IntersectionObserver;
  
  // Mapa de elementos observados y sus configuraciones
  private observedElements = new Map<Element, AnimationConfig>();

  // Configuraciones predefinidas de animaciones
  private readonly ANIMATION_PRESETS: { [key: string]: AnimationConfig } = {
    fadeIn: {
      duration: 600,
      delay: 0,
      easing: 'ease-out',
      direction: 'fade'
    },
    slideInLeft: {
      duration: 800,
      delay: 0,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      direction: 'left'
    },
    slideInRight: {
      duration: 800,
      delay: 0,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      direction: 'right'
    },
    slideInUp: {
      duration: 700,
      delay: 0,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      direction: 'bottom'
    },
    scaleIn: {
      duration: 500,
      delay: 0,
      easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      direction: 'scale'
    }
  };

  constructor() {
    // Inicializar Intersection Observer al crear el servicio
    this.initIntersectionObserver();
    
    // Detectar preferencias de usuario sobre animaciones
    this.detectMotionPreferences();
  }

  /**
   * Obtiene el estado de las animaciones
   * @returns Observable<boolean> - true si las animaciones están habilitadas
   */
  getAnimationState(): Observable<boolean> {
    return this.animationsEnabled$.asObservable();
  }

  /**
   * Habilita o deshabilita las animaciones globalmente
   * Respeta las preferencias de accesibilidad del usuario
   * @param enabled - true para habilitar animaciones
   */
  setAnimationsEnabled(enabled: boolean): void {
    this.animationsEnabled$.next(enabled);
    
    // Aplicar clase CSS global para controlar animaciones
    if (enabled) {
      document.body.classList.remove('reduce-motion');
    } else {
      document.body.classList.add('reduce-motion');
    }
  }

  /**
   * Anima un elemento con una configuración específica
   * @param element - Elemento DOM a animar
   * @param config - Configuración de la animación
   * @returns Promise que se resuelve cuando termina la animación
   */
  animateElement(element: HTMLElement, config: AnimationConfig): Promise<void> {
    return new Promise((resolve) => {
      // Si las animaciones están deshabilitadas, resolver inmediatamente
      if (!this.animationsEnabled$.value) {
        resolve();
        return;
      }

      // Aplicar estilos iniciales basados en la dirección
      this.applyInitialStyles(element, config);

      // Configurar la transición
      element.style.transition = `all ${config.duration}ms ${config.easing}`;

      // Aplicar animación después del delay
      setTimeout(() => {
        this.applyFinalStyles(element, config);
        
        // Resolver promise cuando termine la animación
        setTimeout(() => {
          resolve();
        }, config.duration);
      }, config.delay);
    });
  }

  /**
   * Anima un elemento usando un preset predefinido
   * @param element - Elemento DOM a animar
   * @param preset - Nombre del preset a usar
   * @param customDelay - Delay personalizado opcional
   * @returns Promise que se resuelve cuando termina la animación
   */
  animateWithPreset(element: HTMLElement, preset: string, customDelay?: number): Promise<void> {
    const config = { ...this.ANIMATION_PRESETS[preset] };
    
    if (customDelay !== undefined) {
      config.delay = customDelay;
    }

    return this.animateElement(element, config);
  }

  /**
   * Observa un elemento para animarlo cuando entre en viewport
   * @param element - Elemento a observar
   * @param preset - Preset de animación a aplicar
   * @param threshold - Umbral de visibilidad (0-1)
   */
  observeElement(element: Element, preset: string, threshold: number = 0.2): void {
    const config = { ...this.ANIMATION_PRESETS[preset] };
    
    // Guardar configuración para el elemento
    this.observedElements.set(element, config);
    
    // Aplicar estilos iniciales
    this.applyInitialStyles(element as HTMLElement, config);
    
    // Comenzar a observar el elemento
    this.intersectionObserver.observe(element);
  }

  /**
   * Deja de observar un elemento
   * @param element - Elemento a dejar de observar
   */
  unobserveElement(element: Element): void {
    this.intersectionObserver.unobserve(element);
    this.observedElements.delete(element);
  }

  /**
   * Anima una lista de elementos con delays escalonados
   * @param elements - Array de elementos a animar
   * @param preset - Preset de animación
   * @param staggerDelay - Delay entre cada elemento (ms)
   */
  staggerAnimation(elements: HTMLElement[], preset: string, staggerDelay: number = 100): void {
    elements.forEach((element, index) => {
      const delay = index * staggerDelay;
      this.animateWithPreset(element, preset, delay);
    });
  }

  /**
   * Crea una animación de typing/escritura para texto
   * @param element - Elemento que contiene el texto
   * @param text - Texto a escribir
   * @param speed - Velocidad de escritura (ms por carácter)
   * @returns Promise que se resuelve cuando termina la escritura
   */
  typewriterAnimation(element: HTMLElement, text: string, speed: number = 50): Promise<void> {
    return new Promise((resolve) => {
      if (!this.animationsEnabled$.value) {
        element.textContent = text;
        resolve();
        return;
      }

      let index = 0;
      element.textContent = '';

      const typeInterval = setInterval(() => {
        element.textContent += text[index];
        index++;

        if (index >= text.length) {
          clearInterval(typeInterval);
          resolve();
        }
      }, speed);
    });
  }

  /**
   * Aplica estilos iniciales según la dirección de animación
   * @param element - Elemento a estilizar
   * @param config - Configuración de la animación
   */
  private applyInitialStyles(element: HTMLElement, config: AnimationConfig): void {
    element.style.opacity = config.direction === 'fade' ? '0' : '1';

    switch (config.direction) {
      case 'left':
        element.style.transform = 'translateX(-50px)';
        element.style.opacity = '0';
        break;
      case 'right':
        element.style.transform = 'translateX(50px)';
        element.style.opacity = '0';
        break;
      case 'top':
        element.style.transform = 'translateY(-50px)';
        element.style.opacity = '0';
        break;
      case 'bottom':
        element.style.transform = 'translateY(50px)';
        element.style.opacity = '0';
        break;
      case 'scale':
        element.style.transform = 'scale(0.8)';
        element.style.opacity = '0';
        break;
      case 'fade':
        element.style.transform = 'none';
        break;
    }
  }

  /**
   * Aplica estilos finales de la animación
   * @param element - Elemento a estilizar
   * @param config - Configuración de la animación
   */
  private applyFinalStyles(element: HTMLElement, config: AnimationConfig): void {
    element.style.opacity = '1';
    element.style.transform = 'translateX(0) translateY(0) scale(1)';
  }

  /**
   * Inicializa el Intersection Observer para animaciones por scroll
   */
  private initIntersectionObserver(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: [0.1, 0.2, 0.3] // Múltiples umbrales para mayor precisión
    };

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Solo animar cuando el elemento entra en viewport
        if (entry.isIntersecting) {
          const config = this.observedElements.get(entry.target);
          
          if (config) {
            this.animateElement(entry.target as HTMLElement, config)
              .then(() => {
                // Dejar de observar una vez animado para performance
                this.unobserveElement(entry.target);
              });
          }
        }
      });
    }, options);
  }

  /**
   * Detecta las preferencias del usuario sobre motion/animaciones
   * Respeta la configuración de accesibilidad del sistema
   */
  private detectMotionPreferences(): void {
    // Verificar si el usuario prefiere movimiento reducido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Establecer estado inicial
    this.setAnimationsEnabled(!prefersReducedMotion.matches);
    
    // Escuchar cambios en las preferencias
    prefersReducedMotion.addEventListener('change', (e) => {
      this.setAnimationsEnabled(!e.matches);
    });
  }

  /**
   * Limpia recursos al destruir el servicio
   */
  ngOnDestroy(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
    this.animationsEnabled$.complete();
    this.observedElements.clear();
  }
}