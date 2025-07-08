/**
 * ARCHIVO: src/app/components/contact-section/contact-section.module.ts
 * 
 * DESCRIPCIÓN:
 * Módulo para la sección Contact con lazy loading.
 * Configuración de rutas, formularios reactivos y dependencias del componente.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ContactSectionComponent } from './contact-section.component';

const routes: Routes = [
  {
    path: '',
    component: ContactSectionComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,  // Para el formulario de contacto
    FormsModule          // Para ngModel si es necesario
  ],
  declarations: [ContactSectionComponent]
})
export class ContactSectionModule { }