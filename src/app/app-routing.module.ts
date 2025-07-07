// src/app/app-routing.module.ts
// Módulo de rutas simplificado para SPA
// Redirige todo a la página principal sin lazy loading

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// Rutas simplificadas para SPA - todo se maneja en app.component
const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
  // Sin lazy loading - todo se carga en app.component como SPA
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }