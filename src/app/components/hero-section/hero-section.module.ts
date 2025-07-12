/**
 * ARCHIVO: src/app/components/hero-section/hero-section.module.ts
 * 
 * DESCRIPCIÓN:
 * Módulo para la sección Hero con lazy loading.
 * Configuración de rutas y dependencias del componente.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

import { HeroSectionComponent } from './hero-section.component';
import { FooterModule } from '../footer/footer.module';

const routes: Routes = [
  {
    path: '',
    component: HeroSectionComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    FooterModule
  ],
  declarations: [HeroSectionComponent]
})
export class HeroSectionModule { }