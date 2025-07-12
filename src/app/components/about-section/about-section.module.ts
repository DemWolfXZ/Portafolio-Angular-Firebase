/**
 * ARCHIVO: src/app/components/about-section/about-section.module.ts
 * 
 * DESCRIPCIÓN:
 * Módulo para la sección About con lazy loading.
 * Configuración de rutas y dependencias del componente.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

import { AboutSectionComponent } from './about-section.component';
import { FooterModule } from '../footer/footer.module';

const routes: Routes = [
  {
    path: '',
    component: AboutSectionComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    FooterModule
  ],
  declarations: [AboutSectionComponent]
})
export class AboutSectionModule { }