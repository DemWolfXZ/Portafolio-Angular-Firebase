/**
 * ARCHIVO: src/app/services/seo.service.ts
 *
 * DESCRIPCIÓN:
 * Servicio para optimización SEO del portafolio de Alejandro Villa.
 * Maneja meta tags, títulos, descripciones y structured data para
 * mejorar la visibilidad en motores de búsqueda y redes sociales.
 * Optimizado para búsquedas relacionadas con "QA Técnico Chile" y "Soporte TI N2".
 */

import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

/**
 * Interfaz para configuración de meta tags
 */
interface MetaConfig {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  // Configuración base del sitio
  private readonly SITE_CONFIG = {
    siteName: 'Alejandro Villa - QA Técnico & Soporte TI N2',
    baseUrl: 'https://portafolio-alejandro-villa.web.app',
    defaultImage: 'assets/images/placeholder.svg',
    author: 'Alejandro Villa Villavicencio',
    locale: 'es_CL'
  };

  // Keywords principales para SEO (orientado a QA + Soporte + Dev Jr)
  private readonly PRIMARY_KEYWORDS = [
    'QA Técnico',
    'QA Manual',
    'Quality Assurance',
    'Soporte TI N2',
    'Ingeniero Informático Chile',
    'Soporte técnico e infraestructura',
    'Testing funcional',
    'Pruebas de software',
    'Postman básico',
    'Jira básico',
    'Angular Junior',
    'Firebase',
    'Alejandro Villa',
    'Santiago Chile',
    'Trabajo remoto TI'
  ];

  constructor(
    private meta: Meta,
    private title: Title
  ) {
    // Configurar meta tags base al inicializar
    this.setBaseMeta();
  }

  /**
   * Configura meta tags para una sección específica
   * @param config - Configuración de meta tags
   */
  setMetaTags(config: MetaConfig): void {
    // Actualizar título de la página
    this.title.setTitle(config.title);

    // Meta tags básicos
    this.meta.updateTag({ name: 'description', content: config.description });
    this.meta.updateTag({ name: 'keywords', content: config.keywords || this.getDefaultKeywords() });
    this.meta.updateTag({ name: 'author', content: this.SITE_CONFIG.author });

    // Open Graph tags para redes sociales
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:type', content: config.type || 'website' });
    this.meta.updateTag({ property: 'og:url', content: config.url || this.SITE_CONFIG.baseUrl });
    this.meta.updateTag({ property: 'og:image', content: config.image || this.SITE_CONFIG.defaultImage });
    this.meta.updateTag({ property: 'og:site_name', content: this.SITE_CONFIG.siteName });
    this.meta.updateTag({ property: 'og:locale', content: this.SITE_CONFIG.locale });

    // Twitter Card tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: config.image || this.SITE_CONFIG.defaultImage });

    // Meta tags adicionales
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'language', content: 'Spanish' });
    this.meta.updateTag({ name: 'geo.region', content: 'CL-RM' });
    this.meta.updateTag({ name: 'geo.placename', content: 'Santiago, Chile' });
  }

  /**
   * Configura SEO para la página de inicio
   */
  setHomeMeta(): void {
    this.setMetaTags({
      title: 'Alejandro Villa - QA Técnico & Soporte TI N2 | Ingeniero Informático',
      description:
        'QA Técnico & Soporte TI N2 con más de 5 años de experiencia en soporte e infraestructura y formación en desarrollo web (Angular, Firebase, Python). Enfocado en testing funcional, documentación clara y mejora continua.',
      keywords: this.getDefaultKeywords(),
      type: 'profile'
    });
  }

  /**
   * Configura SEO para la sección Sobre Mí
   */
  setAboutMeta(): void {
    this.setMetaTags({
      title: 'Sobre Mí - Alejandro Villa | QA Técnico & Soporte TI N2',
      description:
        'Ingeniero Informático que comenzó en soporte técnico y hoy se orienta a QA Manual y soporte TI N2. Experiencia real con usuarios, documentación, análisis de incidencias y formación constante en testing y desarrollo.',
      keywords:
        'Sobre mí QA, Perfil QA técnico, Ingeniero Informático soporte TI, transición a QA manual'
    });
  }

  /**
   * Configura SEO para la sección de Experiencia
   */
  setExperienceMeta(): void {
    this.setMetaTags({
      title: 'Experiencia Laboral - Alejandro Villa | QA Técnico & Soporte TI N2',
      description:
        'Experiencia en mesa de ayuda N1/N2, soporte técnico nacional, capacitación de usuarios, documentación en herramientas como ServiceNow y trabajo con metodologías ágiles. Enfoque actual: roles de QA técnico y soporte TI.',
      keywords:
        'Experiencia QA técnico, Soporte TI N2, ServiceNow, documentación técnica, capacitación usuarios'
    });
  }

  /**
   * Configura SEO para la sección de Proyectos
   */
  setProjectsMeta(): void {
    this.setMetaTags({
      title: 'Proyectos - Alejandro Villa | Portafolio QA & Desarrollo Junior',
      description:
        'Proyectos personales y académicos con Angular, Ionic y Firebase, orientados a aprender buenas prácticas, flujos de autenticación y manejo de datos. Uso del portafolio como apoyo para roles QA y desarrollo junior.',
      keywords:
        'Proyectos Angular junior, Portafolio QA, Firebase, aplicaciones web de práctica'
    });
  }

  /**
   * Configura SEO para la sección de Skills
   */
  setSkillsMeta(): void {
    this.setMetaTags({
      title: 'Competencias Técnicas - Alejandro Villa | QA Manual, Soporte TI y Dev Junior',
      description:
        'Competencias en QA manual básico, pruebas funcionales, documentación de incidencias, soporte TI N1/N2, además de desarrollo web junior con Angular, Ionic, Firebase y bases de datos SQL.',
      keywords:
        'Skills QA manual, testing funcional, Soporte TI N2, Angular junior, Firebase, SQL'
    });
  }

  /**
   * Configura SEO para la sección de Contacto
   */
  setContactMeta(): void {
    this.setMetaTags({
      title: 'Contacto - Alejandro Villa | QA Técnico & Soporte TI N2 (Remoto/Chile)',
      description:
        'Contacta a Alejandro Villa para oportunidades de QA Manual, Soporte TI N1/N2 o Desarrollo Junior. Disponible para trabajo remoto o híbrido desde Santiago, Chile.',
      keywords:
        'Contacto QA técnico, Soporte TI remoto, QA junior Chile, Alejandro Villa contacto'
    });
  }

  /**
   * Añade structured data para mejorar SEO
   */
  addStructuredData(): void {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Alejandro Villa Villavicencio',
      jobTitle: 'QA Técnico & Soporte TI N2',
      description:
        'Ingeniero Informático con experiencia en soporte TI N1/N2 y orientación a QA Manual y desarrollo web junior.',
      url: this.SITE_CONFIG.baseUrl,
      image: this.SITE_CONFIG.defaultImage,
      email: 'alejandro.villa91@gmail.com',
      telephone: '+56920913551',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'San Bernardo',
        addressRegion: 'Región Metropolitana',
        addressCountry: 'Chile'
      },
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'DuocUC',
        url: 'https://www.duoc.cl'
      },
      hasOccupation: {
        '@type': 'Occupation',
        name: 'QA Manual & Soporte TI N2',
        occupationLocation: {
          '@type': 'City',
          name: 'Santiago, Chile'
        }
      },
      knowsAbout: [
        'QA Manual',
        'Testing funcional',
        'Soporte TI N1/N2',
        'Mesa de ayuda',
        'Angular básico',
        'Firebase básico',
        'Postman básico',
        'Jira básico',
        'Documentación técnica'
      ],
      sameAs: [
        'https://www.linkedin.com/in/alejandro-villa-villavicencio/'
      ]
    };

    // Crear o actualizar script de structured data
    this.updateStructuredDataScript(structuredData);
  }

  /**
   * Configura meta tags base del sitio
   */
  private setBaseMeta(): void {
    // Meta tags básicos que siempre deben estar
    this.meta.addTag({ name: 'viewport', content: 'width=device-width, initial-scale=1' });
    this.meta.addTag({ name: 'theme-color', content: '#1a73e8' });
    this.meta.addTag({ name: 'msapplication-TileColor', content: '#1a73e8' });
    this.meta.addTag({ name: 'apple-mobile-web-app-capable', content: 'yes' });
    this.meta.addTag({ name: 'apple-mobile-web-app-status-bar-style', content: 'default' });

    // Meta tags para motores de búsqueda
    this.meta.addTag({
      name: 'robots',
      content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
    });
    this.meta.addTag({ name: 'googlebot', content: 'index, follow' });

    // Meta tags para performance
    this.meta.addTag({ 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' });
  }

  /**
   * Obtiene keywords por defecto
   */
  private getDefaultKeywords(): string {
    return this.PRIMARY_KEYWORDS.join(', ');
  }

  /**
   * Actualiza el script de structured data
   */
  private updateStructuredDataScript(data: any): void {
    // Remover script existente si existe
    const existingScript = document.getElementById('structured-data');
    if (existingScript) {
      existingScript.remove();
    }

    // Crear nuevo script
    const script = document.createElement('script');
    script.id = 'structured-data';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
  }

  /**
   * Configura meta tags dinámicamente según la sección activa
   * @param section - Sección activa del sitio
   */
  updateMetaForSection(section: string): void {
    switch (section) {
      case 'home':
        this.setHomeMeta();
        break;
      case 'about':
        this.setAboutMeta();
        break;
      case 'experience':
        this.setExperienceMeta();
        break;
      case 'projects':
        this.setProjectsMeta();
        break;
      case 'skills':
        this.setSkillsMeta();
        break;
      case 'contact':
        this.setContactMeta();
        break;
      default:
        this.setHomeMeta();
    }
  }
}
