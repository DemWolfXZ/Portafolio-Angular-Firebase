// src/main.ts
// Archivo principal de arranque de la aplicación
// Configura el bootstrap con NgModules (NO standalone)

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// Bootstrap de la aplicación usando NgModules
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.log(err));