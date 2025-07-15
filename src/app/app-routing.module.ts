/**
 * ARCHIVO: src/app/app-routing.module.ts - ACTUALIZADO CON 404
 * 
 * DESCRIPCIÓN:
 * Configuración de rutas con lazy loading para cada sección.
 * Cada componente tiene su propio módulo que se carga bajo demanda.
 * Rutas limpias y navegación directa por URL.
 * ACTUALIZADO: Agregado manejo profesional de página 404.
 */

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./components/hero-section/hero-section.module').then(m => m.HeroSectionModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./components/about-section/about-section.module').then(m => m.AboutSectionModule)
  },
  {
    path: 'experience',
    loadChildren: () => import('./components/experience-section/experience-section.module').then(m => m.ExperienceSectionModule)
  },
  {
    path: 'projects',
    loadChildren: () => import('./components/projects-section/projects-section.module').then(m => m.ProjectsSectionModule)
  },
  {
    path: 'skills',
    loadChildren: () => import('./components/skills-section/skills-section.module').then(m => m.SkillsSectionModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./components/contact-section/contact-section.module').then(m => m.ContactSectionModule)
  },
  
  // NUEVA RUTA: Página 404 - Page Not Found profesional
  {
    path: '404',
    loadChildren: () => import('./components/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule),
    data: { 
      title: 'Página No Encontrada - Alejandro Villa',
      description: 'La página solicitada no existe. Navega a las secciones disponibles del portafolio.'
    }
  },
  
  // RUTA WILDCARD: Cualquier ruta no encontrada redirige a 404
  // IMPORTANTE: Esta debe ser la ÚLTIMA ruta en el array
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { 
      preloadingStrategy: PreloadAllModules,
      // Opciones para mejor SEO y navegación
      enableTracing: false, // Solo para debug en desarrollo
      scrollPositionRestoration: 'top', // Scroll al top en navegación
      anchorScrolling: 'enabled', // Soporte para anchors
      // Configuración adicional para manejo de errores
      errorHandler: (error: any) => {
        console.error('Error de navegación:', error);
      }
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }