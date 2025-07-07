/**
 * ARCHIVO: src/app/app.module.ts
 * 
 * DESCRIPCIÓN:
 * Módulo principal de la aplicación corregido.
 * Configura Ionic, Firebase (v9 modular), componentes y esquemas personalizados.
 * Solucionado para trabajar con componentes tradicionales (no standalone).
 */

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { RouteReuseStrategy } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

// Componente principal
import { AppComponent } from './app.component';

// Componentes personalizados importados correctamente
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { AboutSectionComponent } from './components/about-section/about-section.component';
import { ExperienceSectionComponent } from './components/experience-section/experience-section.component';
import { ProjectsSectionComponent } from './components/projects-section/projects-section.component';
import { SkillsSectionComponent } from './components/skills-section/skills-section.component';
import { ContactSectionComponent } from './components/contact-section/contact-section.component';

// Firebase v9 modular imports (NO compatibilidad)
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

// Formularios
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  // Todos los componentes que pertenecen a este módulo
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HeroSectionComponent,
    AboutSectionComponent,
    ExperienceSectionComponent,
    ProjectsSectionComponent,
    SkillsSectionComponent,
    ContactSectionComponent
  ],
  
  // Módulos importados necesarios para la app
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      mode: 'md' // Material Design para consistencia
    }),
    AppRoutingModule,
    FormsModule,           // Para ngModel
    ReactiveFormsModule    // Para formularios reactivos
  ],
  
  // Proveedores de servicios
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // Firebase providers v9 modular
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],

  // Esquemas personalizados para permitir componentes web de Ionic
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  // Componente raíz de la aplicación
  bootstrap: [AppComponent]
})
export class AppModule { }