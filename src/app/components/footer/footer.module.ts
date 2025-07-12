/**
 * ARCHIVO: src/app/components/footer/footer.module.ts
 * 
 * DESCRIPCIÓN:
 * Módulo independiente para el componente Footer.
 * Se importa en cada componente que necesite mostrar el footer.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer.component';

@NgModule({
  declarations: [
    FooterComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [
    FooterComponent
  ]
})
export class FooterModule { }
