/**
 * ARCHIVO: src/app/components/skills-section/skills-section.module.ts
 * 
 * DESCRIPCIÓN:
 * Módulo para la sección Skills con lazy loading.
 * Configuración de rutas y dependencias del componente.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

import { SkillsSectionComponent } from './skills-section.component';

const routes: Routes = [
  {
    path: '',
    component: SkillsSectionComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SkillsSectionComponent]
})
export class SkillsSectionModule { }