/**
 * ARCHIVO: src/app/components/skills-section/skills-section.module.ts
 * 
 * DESCRIPCIÓN:
 * Módulo para la sección Skills con lazy loading.
 * Configuración de rutas y dependencias del componente.
 */

import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

import { SkillsSectionComponent } from './skills-section.component';
// import { SkillsTestComponent } from './skills-test.component';
// import { SkillsSimpleComponent } from './skills-simple.component';
import { FooterModule } from '../footer/footer.module';

const routes: Routes = [
  {
    path: '',
    component: SkillsSectionComponent  // Volver al componente original con estilos
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    FooterModule
  ],
  declarations: [SkillsSectionComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SkillsSectionModule { }