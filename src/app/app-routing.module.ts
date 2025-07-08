/**
 * ARCHIVO: src/app/app-routing.module.ts
 * 
 * DESCRIPCIÓN:
 * Configuración de rutas con lazy loading para cada sección.
 * Cada componente tiene su propio módulo que se carga bajo demanda.
 * Rutas limpias y navegación directa por URL.
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
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { 
      preloadingStrategy: PreloadAllModules,
      // Opciones para mejor SEO y navegación
      enableTracing: false, // Solo para debug
      scrollPositionRestoration: 'top', // Scroll al top en navegación
      anchorScrolling: 'enabled' // Soporte para anchors
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }