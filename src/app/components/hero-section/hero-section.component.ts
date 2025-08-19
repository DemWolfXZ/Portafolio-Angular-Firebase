// src/app/components/hero-section/hero-section.component.ts
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DownloadService } from '../../services/download.service';

/**
 * Componente Hero Section - Sección de presentación principal
 * ACTUALIZADO: Posicionamiento como ingeniero informático con experiencia sólida
 * buscando crecimiento profesional en desarrollo y análisis de sistemas
 */
@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss'],
})
export class HeroSectionComponent implements OnInit {

  // Información personal actualizada según el prompt
  public personalInfo = {
    name: 'Alejandro Villa Villavicencio',
    title: 'Ingeniero Informático • Desarrollo & Análisis de Sistemas',
    tagline: 'Combinando mis años de experiencia práctica con formación académica para crear soluciones efectivas',
    description: 'Ingeniero Informático con sólida base en soporte técnico, buscando crecimiento en desarrollo, análisis de datos y coordinación de proyectos donde pueda aplicar mi perspectiva en resolución de problemas.',
    location: 'San Bernardo, Santiago, Chile',
    email: 'alejandro.villa91@gmail.com',
    phone: '+56 920913551',
    linkedin: 'https://www.linkedin.com/in/alejandro-villa-villavicencio/'
  };

  // Estado para animaciones
  public animationsLoaded: boolean = false;

  // Modal de CV
  public showCVModal: boolean = false;

  constructor(private downloadService: DownloadService) { }

  ngOnInit(): void {
    // Componente visible desde el inicio - sin dependencias de animaciones
    this.animationsLoaded = true;
  }

  /**
   * Descargar CV en formato PDF
   * Utiliza el servicio de descarga centralizado
   */
  async downloadCV(): Promise<void> {
    try {
      await this.downloadService.downloadCV();
    } catch (error) {
      console.error('Error al descargar CV:', error);
    }
  }

  /**
   * Mostrar CV en modal/lightbox
   * Abre una vista previa del CV antes de descargar
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
   * Cerrar modal de CV
   */
  closeCVModal(): void {
    this.showCVModal = false;
  }

  /**
   * Abrir LinkedIn en nueva pestaña
   * Redirección segura al perfil profesional
   */
  openLinkedIn(): void {
    window.open(this.personalInfo.linkedin, '_blank', 'noopener,noreferrer');
  }

  /**
   * Iniciar llamada telefónica
   * Abre la aplicación de teléfono del dispositivo
   */
  callPhone(): void {
    window.open(`tel:${this.personalInfo.phone}`, '_self');
  }

  /**
   * Abrir cliente de email
   * Abre el cliente de email predeterminado con dirección prellenada
   */
  sendEmail(): void {
    const subject = 'Contacto desde Portafolio - Alejandro Villa';
    const mailtoUrl = `mailto:${this.personalInfo.email}?subject=${encodeURIComponent(subject)}`;
    window.open(mailtoUrl, '_self');
  }

  /**
   * Navegación suave a la sección de contacto
   * Scroll animado hacia el formulario de contacto
   */
  scrollToContact(): void {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const headerHeight = 80;
      const elementPosition = contactSection.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }

  /**
   * Navegación suave a la sección sobre mí
   * Para usuarios que quieren conocer más detalles
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