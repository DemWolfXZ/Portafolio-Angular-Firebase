/**
 * ARCHIVO: src/app/components/projects-section/projects-section.module.ts
 * 
 * DESCRIPCIÓN:
 * Módulo para la sección Projects con lazy loading.
 * Configuración de rutas y dependencias del componente.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

import { ProjectsSectionComponent } from './projects-section.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectsSectionComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProjectsSectionComponent]
})
export class ProjectsSectionModule { }