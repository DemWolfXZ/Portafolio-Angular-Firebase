// src/app/components/about-section/about-section.component.ts
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AnimationService } from '@services/animation.service';

/**
 * Componente para la sección "Sobre Mí" del portafolio.
 * Muestra la biografía detallada de Alejandro Villa desde los 15 años,
 * su filosofía profesional, intereses personales y diferenciadores únicos.
 * Enfoca en los 20+ años de experiencia práctica + formación académica formal.
 */
@Component({
  selector: 'app-about-section',
  templateUrl: './about-section.component.html',
  styleUrls: ['./about-section.component.scss'],
})
export class AboutSectionComponent implements OnInit {

  // Información personal detallada de Alejandro Villa
  public personalInfo = {
    name: 'Alejandro Villa Villavicencio',
    age: 32,
    birthYear: 1992,
    title: 'Ingeniero en Informática',
    university: 'DuocUC',
    graduationYear: 2025,
    location: 'San Bernardo, Santiago, Chile',
    email: 'alejandro.villa91@gmail.com',
    phone: '+56 920913551',
    linkedin: 'https://www.linkedin.com/in/alejandro-villa-villavicencio/'
  };

  // Biografía completa según el prompt
  public biography = {
    earlyStart: {
      title: 'Los Inicios (2007-2008)',
      description: 'Mi historia comenzó a los 15-16 años cuando me convertí en "el que arregla computadores" en mi círculo. Desde Windows XP, siempre fui la persona a la que llegaban cuando los equipos fallaban. No solo reparaba - investigaba, experimentaba y modificaba.',
      highlights: [
        'Editaba el registro de Windows',
        'Desarmaba todo lo que podía',
        'Necesidad de entender el funcionamiento interno'
      ]
    },
    practicalExperience: {
      title: 'Experiencia Práctica Profunda (20+ años)',
      description: 'Esta curiosidad natural me llevó a desarrollar una experiencia práctica profunda: formateos, cambios de hardware, clonación de discos, configuración de redes, reparación de componentes. Durante más de 20 años, he sido el solucionador técnico de confianza.',
      highlights: [
        'Formateos y migración de sistemas',
        'Reparación de hardware avanzada',
        'Configuración de redes empresariales',
        'Resolución de problemas complejos'
      ]
    },
    formalExperience: {
      title: 'Experiencia Formal',
      description: 'Mi experiencia formal incluye VTR (donde además capacitaba a nuevos trabajadores), ViasChile (análisis de datos y soporte especializado), y la Fundación Superación de la Pobreza (coordinación de modernización de sistemas críticos).',
      highlights: [
        'VTR: Soporte técnico + Capacitador',
        'ViasChile: Análisis de datos operacionales',
        'Fundación: Coordinación técnica y modernización'
      ]
    },
    academicFormation: {
      title: 'Formación Académica Formal',
      description: 'Recientemente me titulé como Ingeniero en Informática, no para aprender a usar computadores (eso ya lo sabía), sino para formalizar mi expertise y agregar herramientas de análisis de negocio, gestión de proyectos y metodologías estructuradas a mi experiencia práctica.',
      highlights: [
        'Título de Ingeniero en Informática',
        'Análisis de negocio estructurado',
        'Metodologías de gestión de proyectos',
        'Formalización de expertise práctica'
      ]
    }
  };

  // Diferencial único según el prompt
  public uniqueValue = {
    title: 'Mi Diferencial',
    description: 'Entiendo la tecnología desde las entrañas y puedo analizar procesos empresariales desde una perspectiva técnica real. Sé qué funciona, qué no, y por qué.',
    points: [
      '20+ años de experiencia práctica combinada con formación académica formal',
      'Coordinador técnico-negocio que entiende limitaciones técnicas reales',
      'Solucionador de problemas complejos desde hardware hasta procesos organizacionales',
      'Capacitador natural con experiencia desarrollando personas',
      'Analista práctico que entiende qué funciona en la realidad empresarial'
    ]
  };

  // Filosofía profesional
  public philosophy = {
    quote: 'No basta con saber usar la tecnología - hay que entender por qué funciona, cómo falla, y cómo puede servir realmente al negocio.',
    context: 'Esta filosofía guía mi trabajo diario como Technical Business Analyst'
  };

  // Intereses personales
  public interests = [
    {
      name: 'Gaming',
      description: 'Años diseñando WADs para Doom',
      relevance: 'Demuestra creatividad técnica y pensamiento espacial',
      icon: 'game-controller'
    },
    {
      name: 'Música',
      description: 'Rock, Metal, Jazz, Blues',
      relevance: 'Diversidad de gustos y apreciación por la complejidad',
      icon: 'musical-notes'
    },
    {
      name: 'Tecnología',
      description: 'Investigación constante de nuevas herramientas',
      relevance: 'Mantenimiento actualizado con tendencias',
      icon: 'hardware-chip'
    },
    {
      name: 'Experimentación',
      description: 'Modificar, desarmar y entender funcionamiento',
      relevance: 'Curiosidad técnica que impulsa el aprendizaje',
      icon: 'construct'
    }
  ];

  // Cronología simplificada para visualización
  public timeline = [
    { year: '2007', event: 'Inicio como "el que arregla computadores"', type: 'personal' },
    { year: '2018', event: 'VTR - Soporte técnico + Capacitador', type: 'professional' },
    { year: '2020', event: 'Inicio Ingeniería Informática DuocUC', type: 'education' },
    { year: '2023', event: 'ViasChile - Especialista soporte técnico', type: 'professional' },
    { year: '2024', event: 'Fundación - Coordinador técnico', type: 'professional' },
    { year: '2025', event: 'Titulación Ingeniero Informática', type: 'education' }
  ];

  // Estado de animaciones
  public animationsLoaded = false;

  constructor(private animationService: AnimationService) { }

  ngOnInit(): void {
    // Activar animaciones después de un breve delay
    setTimeout(() => {
      this.animationsLoaded = true;
      this.initAnimations();
    }, 300);
  }

  /**
   * Inicializa animaciones de entrada para elementos de la sección
   */
  private initAnimations(): void {
    // Animar elementos principales con delay escalonado
    const animatedElements = document.querySelectorAll('.about-animate');
    
    animatedElements.forEach((element, index) => {
      this.animationService.observeElement(
        element,
        'slideInUp',
        0.1 // threshold de visibilidad
      );
    });

    // Animar tarjetas de intereses con delay
    const interestCards = document.querySelectorAll('.interest-card');
    interestCards.forEach((card, index) => {
      setTimeout(() => {
        this.animationService.observeElement(card, 'scaleIn', 0.2);
      }, index * 100);
    });
  }

  /**
   * Navega a la sección de experiencia
   */
  scrollToExperience(): void {
    const experienceSection = document.getElementById('experience');
    if (experienceSection) {
      const headerHeight = 80;
      const elementPosition = experienceSection.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }

  /**
   * Navega a la sección de contacto
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
   * Abre LinkedIn en nueva pestaña
   */
  openLinkedIn(): void {
    window.open(this.personalInfo.linkedin, '_blank', 'noopener,noreferrer');
  }

  /**
   * Calcula años de experiencia práctica
   */
  getYearsOfExperience(): number {
    const startYear = 2007;
    const currentYear = new Date().getFullYear();
    return currentYear - startYear;
  }

  /**
   * Calcula edad actual
   */
  getCurrentAge(): number {
    const currentYear = new Date().getFullYear();
    return currentYear - this.personalInfo.birthYear;
  }
}