/**
 * ARCHIVO: src/app/app.component.ts - SIMPLIFICADO
 * 
 * DESCRIPCIÓN:
 * Componente principal simplificado con header horizontal fijo.
 * NO usa sidemenu, usa header tradicional profesional.
 * Layout similar al proyecto anterior pero con router.
 */

import { Component, OnInit } from '@angular/core';
import { ThemeService } from '@services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private themeService: ThemeService) {
    this.initializeApp();
  }

  ngOnInit(): void {
    // Cargar tema al iniciar
    this.themeService.loadTheme();
  }

  /**
   * Inicialización de la aplicación
   */
  private initializeApp(): void {
    console.log('Portafolio Alejandro Villa - Inicializado con header horizontal');
  }
}