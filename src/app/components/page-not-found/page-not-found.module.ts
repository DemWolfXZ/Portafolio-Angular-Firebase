/**
 * ARCHIVO: src/app/components/page-not-found/page-not-found.module.ts
 * 
 * DESCRIPCIÓN:
 * Módulo para la página 404 - Page Not Found.
 * Configuración independiente para manejo de rutas no encontradas.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found.component';
import { FooterModule } from '../footer/footer.module';

const routes: Routes = [
  {
    path: '',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    FooterModule
  ],
  declarations: [PageNotFoundComponent]
})
export class PageNotFoundModule { }