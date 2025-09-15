import { Component } from '@angular/core';
import { NgFor, AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { Skill } from '../../core/models/skill.model';

@Component({
  selector: 'app-skills-simple',
  standalone: true,
  imports: [NgFor, AsyncPipe],
  template: `
    <section class="skills-grid">
      <div class="skill" *ngFor="let s of skills$ | async">
        <img [src]="s.svg.url" [alt]="s.name" height="32" loading="lazy" />
        <div class="meta">
          <strong>{{ s.name }}</strong>
          <small>• {{ s.type }} • {{ s.level }}</small>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .skills-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 12px;
      }
    `,
    `
      .skill {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px;
        border: 1px solid #eee;
        border-radius: 10px;
        background: #fff;
      }
    `,
    `
      .meta small {
        color: #555;
        font-size: 0.7rem;
      }
    `,
  ],
})
export class SkillsSimpleComponent {
  skills$!: Observable<Skill[]>;
  constructor(private data: PortfolioDataService) {
    this.skills$ = this.data.getSkills();
  }
}
