/**
 * ARCHIVO: src/app/components/experience-section/experience-section.module.ts
 * 
 * DESCRIPCIÓN:
 * Módulo para la sección Experience con lazy loading.
 * Configuración de rutas y dependencias del componente.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

import { ExperienceSectionComponent } from './experience-section.component';

const routes: Routes = [
  {
    path: '',
    component: ExperienceSectionComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ExperienceSectionComponent]
})
export class ExperienceSectionModule { }