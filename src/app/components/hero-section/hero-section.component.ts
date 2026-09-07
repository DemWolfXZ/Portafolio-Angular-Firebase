// src/app/components/hero-section/hero-section.component.ts

import { Component, OnInit } from '@angular/core';
import { DownloadService } from '../../services/download.service';
import { getHomeDisplaySkills, Skill } from '../../models/skill.model';

/**
 * Componente Hero Section - Sección de presentación principal
 * Muestra la información principal de Alejandro: rol, resumen y skills destacadas.
 */
@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss'],
})
export class HeroSectionComponent implements OnInit {

  /**
   * Información personal mostrada en el hero.
   * IMPORTANTE: Aquí debe alinearse el mensaje con el CV y el resto del portafolio.
   */
  public personalInfo = {
    // Nombre completo
    name: 'Alejandro Villa Villavicencio',

    // Título principal que verá el reclutador
    // Alineado con el perfil: QA + Soporte TI + Frontend Jr
    title: 'QA Técnico & Soporte TI N2 · Desarrollo Frontend Jr',

    // Frase corta que resume tu propuesta de valor
    tagline: 'Calidad de software, soporte TI y desarrollo frontend para soluciones estables y usables.',

    // Descripción un poco más larga (2–3 líneas)
    description:
      'Profesional de TI con 3+ años de experiencia en soporte técnico N2 y QA funcional, ' +
      'complementado con desarrollo frontend en Angular/Ionic. Busco aportar en equipos donde ' +
      'pueda asegurar calidad, estabilidad y buena experiencia de usuario.',

    // Datos de contacto
    location: 'Macul, Santiago, Chile',
    email: 'alejandro.villa91@gmail.com',
    phone: '+56 920913551',

    // Perfil de LinkedIn
    linkedin: 'https://www.linkedin.com/in/alejandro-villa-villavicencio/'
  };

  /** Controla si las animaciones iniciales se consideran cargadas */
  public animationsLoaded: boolean = false;

  /** Control de visibilidad del modal de CV (si lo usas con ion-modal) */
  public showCVModal: boolean = false;

  constructor(private downloadService: DownloadService) {}

  ngOnInit(): void {
    // Dejamos las animaciones como cargadas cuando el componente se inicializa
    this.animationsLoaded = true;
  }

  /**
   * Obtiene las skills destacadas para mostrar en el home (hero).
   * Se alimenta desde el modelo centralizado de skills (skill.model.ts).
   */
  getHomeDisplaySkills(): Skill[] {
    return getHomeDisplaySkills();
  }

  /**
   * Descargar CV en formato PDF.
   * Utiliza el servicio de descarga centralizado para mantener la lógica en un solo lugar.
   */
  async downloadCV(): Promise<void> {
    try {
      await this.downloadService.downloadCV();
    } catch (error) {
      console.error('Error al descargar CV:', error);
    }
  }

  /**
   * Mostrar CV en una vista previa (modal / nueva pestaña).
   * Primero intenta usar el servicio centralizado; si falla, abre el PDF directamente.
   */
  async viewCV(): Promise<void> {
    try {
      await this.downloadService.viewFile('cv-alejandro-villa');
    } catch (error) {
      console.error('Error al visualizar CV:', error);
      // Fallback: abrir en nueva pestaña manualmente
      window.open('assets/cv/CV Alejandro Villa Villavicencio.pdf', '_blank');
    }
  }

  /**
   * Cerrar modal de CV (si estás usando ion-modal con showCVModal).
   */
  closeCVModal(): void {
    this.showCVModal = false;
  }

  /**
   * Abrir perfil de LinkedIn en una nueva pestaña.
   */
  openLinkedIn(): void {
    window.open(this.personalInfo.linkedin, '_blank', 'noopener,noreferrer');
  }

  /**
   * Iniciar llamada telefónica.
   * Útil en dispositivos móviles: abre la app de teléfono.
   */
  callPhone(): void {
    window.open(`tel:${this.personalInfo.phone}`, '_self');
  }

  /**
   * Abrir el cliente de correo con el mail prellenado.
   */
  sendEmail(): void {
    const subject = 'Contacto desde Portafolio - Alejandro Villa';
    const mailtoUrl = `mailto:${this.personalInfo.email}?subject=${encodeURIComponent(subject)}`;
    window.open(mailtoUrl, '_self');
  }

  /**
   * Navegación suave hacia la sección de contacto.
   * Úsalo si tienes una sección con id="contact" en la página.
   */
  scrollToContact(): void {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const headerHeight = 80; // Altura aproximada del header fijo
      const elementPosition = contactSection.offsetTop - headerHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }

  /**
   * Navegación suave hacia la sección "Sobre mí".
   * Útil si quieres reutilizar este componente en otras vistas.
   */
  scrollToAbout(): void {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      const headerHeight = 80;
      const elementPosition = aboutSection.offsetTop - headerHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }
}
