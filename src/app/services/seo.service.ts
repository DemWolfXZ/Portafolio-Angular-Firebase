/**
 * ARCHIVO: src/app/services/seo.service.ts
 *
 * DESCRIPCIÓN:
 * Servicio para optimización SEO del portafolio de Alejandro Villa.
 * Maneja meta tags, títulos, descripciones y structured data para
 * mejorar la visibilidad en motores de búsqueda y redes sociales.
 * Optimizado para búsquedas relacionadas con "Analista TI", "Soporte N1/N2" e ITSM.
 * NOTA: sin geo.region/geo.placename ni dirección en structured data a propósito
 * (búsqueda de trabajo 100% remoto, sin ubicación/país indexado).
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
    siteName: 'Alejandro Villa - Analista TI & Soporte N1/N2',
    baseUrl: 'https://portafolio-alejandro-villa.web.app',
    defaultImage: 'assets/images/placeholder.svg',
    author: 'Alejandro Villa Villavicencio',
    locale: 'es'
  };

  // Keywords principales para SEO (orientado a Soporte TI/ITSM + Desarrollo Frontend Jr)
  private readonly PRIMARY_KEYWORDS = [
    'Analista TI',
    'Soporte TI N1/N2',
    'ITSM',
    'GLPI',
    'ServiceNow',
    'Active Directory',
    'Ingeniero Informático',
    'Soporte técnico e infraestructura',
    'Angular Junior',
    'Ionic',
    'Firebase',
    'Python Django',
    'Alejandro Villa',
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
  }

  /**
   * Configura SEO para la página de inicio
   */
  setHomeMeta(): void {
    this.setMetaTags({
      title: 'Alejandro Villa - Analista TI & Soporte N1/N2 | Ingeniero Informático',
      description:
        'Analista TI & Soporte N1/N2 con experiencia en ITSM (GLPI/ServiceNow), Active Directory e infraestructura, más desarrollo frontend con Angular, Ionic y bases de Python/Django. Disponible 100% remoto.',
      keywords: this.getDefaultKeywords(),
      type: 'profile'
    });
  }

  /**
   * Configura SEO para la sección Sobre Mí
   */
  setAboutMeta(): void {
    this.setMetaTags({
      title: 'Sobre Mí - Alejandro Villa | Analista TI & Soporte N1/N2',
      description:
        'Ingeniero Informático que comenzó en soporte técnico y hoy combina soporte TI N1/N2 con desarrollo frontend. Experiencia real con usuarios, documentación, análisis de incidencias y formación constante.',
      keywords:
        'Sobre mí Analista TI, Perfil soporte técnico, Ingeniero Informático soporte TI, trabajo remoto'
    });
  }

  /**
   * Configura SEO para la sección de Experiencia
   */
  setExperienceMeta(): void {
    this.setMetaTags({
      title: 'Experiencia Laboral - Alejandro Villa | Analista TI & Soporte N1/N2',
      description:
        'Experiencia en mesa de ayuda N1/N2, soporte técnico, gestión de tickets en GLPI y ServiceNow, administración de Active Directory y desarrollo frontend con Angular/Ionic en proyectos reales.',
      keywords:
        'Experiencia Soporte TI N1/N2, GLPI, ServiceNow, Active Directory, documentación técnica'
    });
  }

  /**
   * Configura SEO para la sección de Proyectos
   */
  setProjectsMeta(): void {
    this.setMetaTags({
      title: 'Proyectos - Alejandro Villa | Portafolio TI & Desarrollo Junior',
      description:
        'Proyectos profesionales, académicos y personales con Angular, Ionic y Firebase, incluyendo una app Android de gestión de compras y un sitio web propio desplegado en GitHub Pages.',
      keywords:
        'Proyectos Angular junior, Ionic, Firebase, aplicaciones web y móviles'
    });
  }

  /**
   * Configura SEO para la sección de Skills
   */
  setSkillsMeta(): void {
    this.setMetaTags({
      title: 'Competencias Técnicas - Alejandro Villa | Soporte TI, ITSM y Dev Junior',
      description:
        'Competencias en soporte TI N1/N2, ITSM (GLPI/ServiceNow), Active Directory e infraestructura, además de desarrollo web junior con Angular, Ionic, Firebase, Python/Django y bases de datos SQL.',
      keywords:
        'Skills Soporte TI N1/N2, GLPI, ServiceNow, Active Directory, Angular junior, Firebase, SQL'
    });
  }

  /**
   * Configura SEO para la sección de Contacto
   */
  setContactMeta(): void {
    this.setMetaTags({
      title: 'Contacto - Alejandro Villa | Analista TI & Soporte N1/N2 (100% Remoto)',
      description:
        'Contacta a Alejandro Villa para oportunidades 100% remotas en Soporte TI N1/N2, ITSM o Desarrollo Frontend Junior.',
      keywords:
        'Contacto Analista TI, Soporte TI remoto, Desarrollo frontend junior, Alejandro Villa contacto'
    });
  }

  /**
   * Añade structured data para mejorar SEO
   */
  addStructuredData(): void {
    // NOTA: sin "address"/"occupationLocation" a propósito (búsqueda de trabajo 100% remoto,
    // sin ubicación/país indexado en el sitio público).
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Alejandro Villa Villavicencio',
      jobTitle: 'Analista TI & Soporte N1/N2',
      description:
        'Ingeniero Informático con experiencia en soporte TI N1/N2, ITSM (GLPI/ServiceNow) y Active Directory, además de desarrollo web frontend con Angular e Ionic.',
      url: this.SITE_CONFIG.baseUrl,
      image: this.SITE_CONFIG.defaultImage,
      email: 'alejandro.villa91@gmail.com',
      telephone: '+524925599064',
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'DuocUC',
        url: 'https://www.duoc.cl'
      },
      hasOccupation: {
        '@type': 'Occupation',
        name: 'Analista TI & Soporte N1/N2'
      },
      knowsAbout: [
        'Soporte TI N1/N2',
        'ITSM',
        'GLPI',
        'ServiceNow',
        'Active Directory',
        'Mesa de ayuda',
        'Angular',
        'Ionic',
        'Firebase',
        'Python',
        'Django',
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
