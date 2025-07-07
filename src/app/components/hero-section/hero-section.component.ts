// src/app/components/hero-section/hero-section.component.ts
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

/**
 * Componente Hero Section - Sección de presentación principal
 * Muestra la información básica de Alejandro Villa con llamadas a la acción
 * Incluye descarga de CV, enlaces a LinkedIn y información de contacto
 */
@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss'],
})
export class HeroSectionComponent implements OnInit {

  // Información personal principal
  public personalInfo = {
    name: 'Alejandro Villa Villavicencio',
    title: 'Technical Business Analyst & IT Specialist',
    tagline: '20+ años resolviendo problemas técnicos complejos',
    description: 'Ingeniero Informático especializado en coordinación técnica y análisis de sistemas. Mi valor está en entender tanto la tecnología como el negocio.',
    location: 'San Bernardo, Santiago, Chile',
    email: 'alejandro.villa91@gmail.com',
    phone: '+56 920913551',
    linkedin: 'https://www.linkedin.com/in/alejandro-villa-villavicencio/'
  };

  // Estado para animaciones
  public animationsLoaded: boolean = false;

  // Modal de CV
  public showCVModal: boolean = false;

  constructor() { }

  ngOnInit(): void {
    // Activar animaciones después de que se carga el componente
    setTimeout(() => {
      this.animationsLoaded = true;
    }, 500);
  }

  /**
   * Descargar CV en formato PDF
   * Trigger para descargar el archivo CV almacenado
   */
  downloadCV(): void {
    // URL del CV en Firebase Storage o assets
    const cvUrl = 'assets/cv/CV_Alejandro_Villa_2025.pdf';
    
    // Crear enlace temporal para descarga
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'CV_Alejandro_Villa_2025.pdf';
    link.target = '_blank';
    
    // Trigger de descarga
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * Mostrar CV en modal/lightbox
   * Abre una vista previa del CV antes de descargar
   */
  viewCV(): void {
    this.showCVModal = true;
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