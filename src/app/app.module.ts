/**
 * ARCHIVO: src/app/app.module.ts
 * 
 * DESCRIPCIÓN:
 * Módulo principal con sidemenu nativo y componentes modulares.
 * Cada sección es un componente independiente con su propio módulo.
 * Configurado para Firebase v9 y componentes no-standalone.
 */

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { RouteReuseStrategy } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

// Componente principal
import { AppComponent } from './app.component';

// Componentes del layout principal
import { FooterComponent } from './components/footer/footer.component';

// Firebase v9 modular imports
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

// Formularios
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent  // Footer se queda en el layout principal
  ],
  
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      mode: 'md' // Material Design para consistencia
    }),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // Firebase providers v9 modular
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  bootstrap: [AppComponent]
})
export class AppModule { }