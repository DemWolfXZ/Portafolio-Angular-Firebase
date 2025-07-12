// Componente skills simplificado para debug
import { Component, OnInit } from '@angular/core';

interface SimpleSkill {
  name: string;
  level: string;
  years: number;
}

@Component({
  selector: 'app-skills-simple',
  template: `
    <ion-content>
      <div class="skills-container" style="padding: 20px;">
        <h2>Competencias Técnicas</h2>
        
        <!-- Filtros -->
        <div style="margin: 20px 0;">
          <button (click)="setViewMode('category')" 
                  [class.active]="viewMode === 'category'"
                  class="filter-btn">
            Por Categoría
          </button>
          <button (click)="setViewMode('featured')" 
                  [class.active]="viewMode === 'featured'"
                  class="filter-btn">
            Destacadas
          </button>
          <button (click)="setViewMode('level')" 
                  [class.active]="viewMode === 'level'"
                  class="filter-btn">
            Por Nivel
          </button>
        </div>

        <!-- Contenido según filtro -->
        <div *ngIf="viewMode === 'category'">
          <h3>Vista por Categorías</h3>
          <div *ngFor="let skill of testSkills" class="skill-item">
            <strong>{{ skill.name }}</strong> - {{ skill.level }} ({{ skill.years }} años)
          </div>
        </div>

        <div *ngIf="viewMode === 'featured'">
          <h3>Skills Destacadas</h3>
          <div *ngFor="let skill of testSkills.slice(0,3)" class="skill-item">
            <strong>{{ skill.name }}</strong> - {{ skill.level }} ({{ skill.years }} años)
          </div>
        </div>

        <div *ngIf="viewMode === 'level'">
          <h3>Vista por Nivel</h3>
          <div *ngFor="let skill of testSkills" class="skill-item">
            <strong>{{ skill.name }}</strong> - {{ skill.level }} ({{ skill.years }} años)
          </div>
        </div>
      </div>
    </ion-content>
  `,
  styles: [`
    .filter-btn {
      margin: 5px;
      padding: 10px 15px;
      border: 1px solid #ddd;
      background: white;
      cursor: pointer;
    }
    .filter-btn.active {
      background: #007bff;
      color: white;
    }
    .skill-item {
      padding: 10px;
      border-bottom: 1px solid #eee;
    }
    .skills-container {
      max-width: 800px;
      margin: 0 auto;
    }
  `]
})
export class SkillsSimpleComponent implements OnInit {
  viewMode: 'category' | 'featured' | 'level' = 'category';
  
  testSkills: SimpleSkill[] = [
    { name: 'JavaScript', level: 'Experto', years: 15 },
    { name: 'Angular', level: 'Avanzado', years: 8 },
    { name: 'Node.js', level: 'Avanzado', years: 10 },
    { name: 'SQL Server', level: 'Experto', years: 18 },
    { name: 'Python', level: 'Intermedio', years: 5 }
  ];

  ngOnInit() {
    console.log('SkillsSimpleComponent initialized');
    console.log('View mode:', this.viewMode);
    console.log('Test skills:', this.testSkills);
  }

  setViewMode(mode: 'category' | 'featured' | 'level') {
    console.log('Changing view mode from', this.viewMode, 'to', mode);
    this.viewMode = mode;
    console.log('New view mode:', this.viewMode);
  }
}
