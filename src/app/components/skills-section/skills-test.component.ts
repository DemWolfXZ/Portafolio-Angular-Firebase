// Simple skills test component
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills-test',
  template: `
    <ion-content>
      <div style="padding: 20px;">
        <h2>Skills Test Component</h2>
        <p>View Mode: {{ viewMode }}</p>
        
        <div style="margin: 20px 0;">
          <button (click)="setViewMode('category')" 
                  [style.background-color]="viewMode === 'category' ? 'blue' : 'gray'"
                  style="margin: 5px; padding: 10px; color: white; border: none;">
            Por Categoría
          </button>
          <button (click)="setViewMode('featured')" 
                  [style.background-color]="viewMode === 'featured' ? 'blue' : 'gray'"
                  style="margin: 5px; padding: 10px; color: white; border: none;">
            Destacadas
          </button>
          <button (click)="setViewMode('level')" 
                  [style.background-color]="viewMode === 'level' ? 'blue' : 'gray'"
                  style="margin: 5px; padding: 10px; color: white; border: none;">
            Por Nivel
          </button>
        </div>

        <div *ngIf="viewMode === 'category'">
          <h3>Vista por Categorías</h3>
          <p>Mostrando skills por categorías...</p>
        </div>

        <div *ngIf="viewMode === 'featured'">
          <h3>Vista Destacadas</h3>
          <p>Mostrando skills destacadas...</p>
        </div>

        <div *ngIf="viewMode === 'level'">
          <h3>Vista por Nivel</h3>
          <p>Mostrando skills por nivel...</p>
        </div>
      </div>
    </ion-content>
  `
})
export class SkillsTestComponent implements OnInit {
  viewMode: 'category' | 'featured' | 'level' = 'category';

  ngOnInit() {
    console.log('SkillsTestComponent initialized');
  }

  setViewMode(mode: 'category' | 'featured' | 'level') {
    console.log('Setting view mode to:', mode);
    this.viewMode = mode;
  }
}
