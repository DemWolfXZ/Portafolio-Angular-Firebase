/**
 * ARCHIVO: src/app/services/seo.service.ts
 * 
 * DESCRIPCIÓN:
 * Servicio para optimización SEO del portafolio de Alejandro Villa.
 * Maneja meta tags, títulos, descripciones y structured data para
 * mejorar la visibilidad en motores de búsqueda y redes sociales.
 * Optimizado para búsquedas relacionadas con "Technical Business Analyst Chile".
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
    siteName: 'Alejandro Villa - Technical Business Analyst',
    baseUrl: 'https://portafolio-alejandro-villa.web.app',
    defaultImage: 'assets/images/alejandro-villa-og.jpg',
    author: 'Alejandro Villa Villavicencio',
    locale: 'es_CL'
  };

  // Keywords principales para SEO
  private readonly PRIMARY_KEYWORDS = [
    'Technical Business Analyst',
    'Coordinador Técnico',
    'Analista de Sistemas',
    'Ingeniero Informática Chile',
    'Angular Developer',
    'Firebase Specialist',
    'Ionic Developer',
    'Alejandro Villa',
    'Santiago Chile',
    'Soporte Técnico Especializado'
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

    // Meta tags adicionales para profesionales
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
      title: 'Alejandro Villa - Technical Business Analyst & IT Specialist | 20+ años experiencia',
      description: 'Ingeniero Informático especializado en coordinación técnica y análisis de sistemas. 20+ años resolviendo problemas técnicos complejos. Angular, Ionic, Firebase. Santiago, Chile.',
      keywords: this.getDefaultKeywords(),
      type: 'profile'
    });
  }

  /**
   * Configura SEO para la sección Sobre Mí
   */
  setAboutMeta(): void {
    this.setMetaTags({
      title: 'Sobre Mí - Alejandro Villa | Ingeniero Informático DuocUC 2025',
      description: 'Conoce la historia de Alejandro Villa: desde los 15 años reparando computadores hasta Ingeniero Informático. 20+ años de experiencia práctica + formación académica.',
      keywords: 'Historia profesional, Experiencia técnica, Ingeniero Informática DuocUC, Carrera tecnológica'
    });
  }

  /**
   * Configura SEO para la sección de Experiencia
   */
  setExperienceMeta(): void {
    this.setMetaTags({
      title: 'Experiencia Laboral - Alejandro Villa | Coordinador Técnico & Analista Sistemas',
      description: 'Experiencia profesional: Fundación Superación Pobreza, ViasChile, VTR. Coordinación técnica, análisis de sistemas, modernización legacy. 20+ años experiencia.',
      keywords: 'Experiencia laboral, Coordinador técnico, Analista sistemas, Modernización sistemas, Soporte técnico'
    });
  }

  /**
   * Configura SEO para la sección de Proyectos
   */
  setProjectsMeta(): void {
    this.setMetaTags({
      title: 'Proyectos - Alejandro Villa | Angular, Ionic, Firebase | Sistemas en Producción',
      description: 'Proyectos destacados: Sistema SRM Portal Superación Pobreza, Sistema Unidad Territorial, AST Digital. Angular 18, Ionic 8, Firebase 11. Sistemas funcionando en producción.',
      keywords: 'Proyectos Angular, Ionic Firebase, Sistemas producción, Portfolio desarrollador, Modernización sistemas'
    });
  }

  /**
   * Configura SEO para la sección de Skills
   */
  setSkillsMeta(): void {
    this.setMetaTags({
      title: 'Competencias Técnicas - Alejandro Villa | Angular, Firebase, Análisis Sistemas',
      description: 'Competencias: 20+ años infraestructura/soporte, Angular/Ionic/Firebase, análisis sistemas, coordinación técnica. Experto en resolución problemas complejos.',
      keywords: 'Competencias técnicas, Skills Angular, Firebase developer, Análisis sistemas, Soporte técnico experto'
    });
  }

  /**
   * Configura SEO para la sección de Contacto
   */
  setContactMeta(): void {
    this.setMetaTags({
      title: 'Contacto - Alejandro Villa | Technical Business Analyst Santiago Chile',
      description: 'Contacta con Alejandro Villa para oportunidades laborales, proyectos y consultorías técnicas. Technical Business Analyst en Santiago, Chile. alejandro.villa91@gmail.com',
      keywords: 'Contacto Alejandro Villa, Technical Business Analyst Santiago, Consultoría técnica, Coordinador técnico disponible'
    });
  }

  /**
   * Añade structured data para mejorar SEO
   */
  addStructuredData(): void {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Alejandro Villa Villavicencio",
      "jobTitle": "Technical Business Analyst & IT Specialist",
      "description": "Ingeniero Informático con 20+ años de experiencia en coordinación técnica y análisis de sistemas",
      "url": this.SITE_CONFIG.baseUrl,
      "image": this.SITE_CONFIG.defaultImage,
      "email": "alejandro.villa91@gmail.com",
      "telephone": "+56920913551",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "San Bernardo",
        "addressRegion": "Región Metropolitana",
        "addressCountry": "Chile"
      },
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "DuocUC",
        "url": "https://www.duoc.cl"
      },
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Technical Business Analyst",
        "occupationLocation": {
          "@type": "City",
          "name": "Santiago, Chile"
        }
      },
      "knowsAbout": [
        "Angular",
        "Ionic",
        "Firebase",
        "Technical Analysis",
        "System Coordination",
        "Infrastructure Support",
        "Business Process Analysis"
      ],
      "sameAs": [
        "https://www.linkedin.com/in/alejandro-villa-villavicencio/"
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
    this.meta.addTag({ name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' });
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