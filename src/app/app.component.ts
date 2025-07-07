// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { ThemeService } from '@services/theme.service';

/**
 * Componente principal de la aplicación
 * Maneja la inicialización del tema y la estructura general de la página única
 */
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private themeService: ThemeService) {}

  /**
   * Inicialización del componente
   * Carga el tema guardado del usuario al arrancar la aplicación
   */
  ngOnInit(): void {
    // Cargar tema desde localStorage al iniciar la aplicación
    this.themeService.loadTheme();
  }
}