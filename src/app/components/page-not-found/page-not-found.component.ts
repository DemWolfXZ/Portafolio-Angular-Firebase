/**
 * ARCHIVO: src/app/components/page-not-found/page-not-found.component.ts
 * 
 * DESCRIPCIÓN:
 * Componente para la página 404 - Página No Encontrada del portafolio.
 * Maneja la navegación desde rutas inexistentes, proporciona opciones
 * de navegación y incluye funcionalidad de auto-redirección opcional.
 * Integrado con el sistema de rutas y servicios del portafolio.
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit, OnDestroy {

  // Estado de animaciones
  public animationsLoaded = false;

  // Countdown para auto-redirección
  public countdown = 10;
  private countdownSubscription?: Subscription;

  // URL que causó el error 404
  private attemptedUrl = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    console.log('Página 404 cargada');
    
    // Capturar la URL que causó el error
    this.attemptedUrl = this.router.url;
    
    // Activar animaciones después de un delay
    setTimeout(() => {
      this.animationsLoaded = true;
    }, 300);

    // Iniciar countdown de redirección automática
    this.startCountdown();

    // Log del error para analytics (opcional)
    this.logPageNotFoundError();
  }

  ngOnDestroy(): void {
    // Limpiar suscripciones para evitar memory leaks
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
  }

  /**
   * Obtiene la URL actual que causó el error 404
   * @returns URL completa del error
   */
  getCurrentUrl(): string {
    return window.location.href;
  }

  /**
   * Obtiene la hora actual formateada
   * @returns Fecha y hora actual en formato legible
   */
  getCurrentTime(): string {
    return new Date().toLocaleString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  /**
   * Navega a la página de inicio
   */
  navigateToHome(): void {
    console.log('Navegando al inicio desde 404');
    this.router.navigate(['/home']);
  }

  /**
   * Navega a la sección de proyectos
   */
  navigateToProjects(): void {
    console.log('Navegando a proyectos desde 404');
    this.router.navigate(['/projects']);
  }

  /**
   * Navega a la sección de contacto
   */
  navigateToContact(): void {
    console.log('Navegando a contacto desde 404');
    this.router.navigate(['/contact']);
  }

  /**
   * Navega a la sección de experiencia
   */
  navigateToExperience(): void {
    console.log('Navegando a experiencia desde 404');
    this.router.navigate(['/experience']);
  }

  /**
   * Navega a la página anterior usando el historial del navegador
   */
  goBack(): void {
    // Verificar si hay historial disponible
    if (window.history.length > 1) {
      this.location.back();
    } else {
      // Si no hay historial, ir al inicio
      this.navigateToHome();
    }
  }

  /**
   * Abre modal o navega para reportar el error
   */
  reportError(): void {
    // Crear mensaje de error con información técnica
    const errorDetails = {
      url: this.attemptedUrl,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer || 'Directo'
    };

    // Construir mensaje para email
    const subject = 'Error 404 Reportado - Portafolio Alejandro Villa';
    const body = `
Hola Alejandro,

Se ha encontrado un error 404 en tu portafolio:

URL que falló: ${errorDetails.url}
Fecha/Hora: ${this.getCurrentTime()}
Navegador: ${errorDetails.userAgent}
Página anterior: ${errorDetails.referrer}

Por favor revisa esta URL o actualiza la navegación.

Saludos.
    `.trim();

    // Abrir cliente de email con el reporte
    const mailtoUrl = `mailto:alejandro.villa91@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl, '_self');
  }

  /**
   * Inicia el countdown para redirección automática
   */
  private startCountdown(): void {
    this.countdownSubscription = interval(1000)
      .pipe(take(this.countdown))
      .subscribe({
        next: (value) => {
          this.countdown = this.countdown - 1;
        },
        complete: () => {
          // Cuando termina el countdown, redirigir al inicio
          console.log('Countdown terminado, redirigiendo al inicio');
          this.navigateToHome();
        }
      });
  }

  /**
   * Cancela la redirección automática
   */
  cancelAutoRedirect(): void {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
      this.countdown = -1; // Indicar que se canceló
      console.log('Redirección automática cancelada');
    }
  }

  /**
   * Intenta adivinar la ruta correcta basada en la URL incorrecta
   * @returns Sugerencia de ruta o null si no hay coincidencia
   */
  private suggestCorrectRoute(): string | null {
    const url = this.attemptedUrl.toLowerCase();
    
    // Mapeo de posibles errores comunes a rutas correctas
    const routeMapping: { [key: string]: string } = {
      'inicio': '/home',
      'principal': '/home',
      'index': '/home',
      'sobre': '/about',
      'acerca': '/about',
      'bio': '/about',
      'biografia': '/about',
      'exp': '/experience',
      'experiencia': '/experience',
      'trabajo': '/experience',
      'proyecto': '/projects',
      'proyectos': '/projects',
      'portfolio': '/projects',
      'portafolio': '/projects',
      'habilidades': '/skills',
      'competencias': '/skills',
      'tecnologias': '/skills',
      'skills': '/skills',
      'contacto': '/contact',
      'contactar': '/contact',
      'email': '/contact'
    };

    // Buscar coincidencias en la URL
    for (const [keyword, route] of Object.entries(routeMapping)) {
      if (url.includes(keyword)) {
        return route;
      }
    }

    return null;
  }

  /**
   * Registra el error 404 para analytics (opcional)
   * Útil para identificar problemas de navegación recurrentes
   */
  private logPageNotFoundError(): void {
    try {
      // Solo en producción para evitar logs de desarrollo
      if (window.location.hostname === 'localhost') {
        return;
      }

      // Log básico en consola
      console.warn('404 Error:', {
        url: this.attemptedUrl,
        timestamp: new Date().toISOString(),
        referrer: document.referrer,
        userAgent: navigator.userAgent
      });

      // Aquí podrías enviar a Google Analytics, Firebase Analytics, etc.
      // Ejemplo de estructura para futuro tracking:
      /*
      if (typeof gtag !== 'undefined') {
        gtag('event', 'page_not_found', {
          'page_location': this.attemptedUrl,
          'page_referrer': document.referrer
        });
      }
      */

    } catch (error) {
      console.warn('Error al registrar 404:', error);
    }
  }

  /**
   * Verifica si la URL parece ser un intento de acceso a archivo
   * @returns true si parece ser un archivo (pdf, jpg, etc.)
   */
  private isFileAccess(): boolean {
    const fileExtensions = ['.pdf', '.jpg', '.jpeg', '.png', '.gif', '.doc', '.docx', '.zip', '.wad'];
    const url = this.attemptedUrl.toLowerCase();
    
    return fileExtensions.some(ext => url.includes(ext));
  }

  /**
   * Obtiene una sugerencia personalizada basada en el tipo de error
   * @returns Mensaje de sugerencia personalizado
   */
  getSuggestionMessage(): string {
    if (this.isFileAccess()) {
      return 'Parece que estás buscando un archivo. Revisa la sección de proyectos o contacta para obtener recursos específicos.';
    }

    const suggestedRoute = this.suggestCorrectRoute();
    if (suggestedRoute) {
      return `¿Quizás estabas buscando la sección ${this.getRouteName(suggestedRoute)}?`;
    }

    return 'Explora las secciones disponibles para encontrar lo que buscas.';
  }

  /**
   * Obtiene el nombre amigable de una ruta
   * @param route - Ruta del sistema
   * @returns Nombre amigable
   */
  private getRouteName(route: string): string {
    const routeNames: { [key: string]: string } = {
      '/home': 'Inicio',
      '/about': 'Sobre Mí',
      '/experience': 'Experiencia',
      '/projects': 'Proyectos',
      '/skills': 'Skills',
      '/contact': 'Contacto'
    };

    return routeNames[route] || route;
  }

  /**
   * Maneja clics en sugerencias con tracking
   * @param suggestion - Tipo de sugerencia clicada
   */
  onSuggestionClick(suggestion: string): void {
    console.log(`Sugerencia clicada desde 404: ${suggestion}`);
    
    // Aquí podrías agregar tracking de interacciones
    // para entender qué opciones son más útiles para los usuarios
  }

  /**
   * Detecta si el usuario llegó desde un buscador
   * @returns true si vino de un motor de búsqueda
   */
  private isFromSearchEngine(): boolean {
    const referrer = document.referrer.toLowerCase();
    const searchEngines = ['google', 'bing', 'yahoo', 'duckduckgo', 'baidu'];
    
    return searchEngines.some(engine => referrer.includes(engine));
  }

  /**
   * Proporciona información de ayuda contextual
   * @returns Mensaje de ayuda apropiado
   */
  getContextualHelp(): string {
    if (this.isFromSearchEngine()) {
      return 'Llegaste desde un buscador. Es posible que el enlace esté desactualizado.';
    }

    if (document.referrer && !document.referrer.includes(window.location.hostname)) {
      return 'Llegaste desde un sitio externo. Verifica que el enlace sea correcto.';
    }

    return 'Navega usando el menú principal para encontrar lo que buscas.';
  }
}