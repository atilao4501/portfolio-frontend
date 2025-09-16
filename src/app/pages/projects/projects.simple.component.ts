import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgFor, NgIf, AsyncPipe, NgOptimizedImage } from '@angular/common';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { Project } from '../../core/models/project.model';
import { I18nService } from '../../core/services/i18n.service';

@Component({
  selector: 'app-projects-simple',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, NgOptimizedImage],
  template: `
    <section
      *ngFor="let p of projects$ | async; trackBy: trackProject"
      class="project-item"
    >
      <h3>{{ p.title }}</h3>
      <p>{{ p.shortDescription }}</p>
      <ul *ngIf="p.features?.length">
        <li *ngFor="let f of p.features; trackBy: trackFeature">{{ f }}</li>
      </ul>
      <div class="skills" *ngIf="p.skills?.length">
        <img
          *ngFor="let s of p.skills; trackBy: trackSkill"
          ngSrc="{{ s.svg.url }}"
          width="24"
          height="24"
          [alt]="s.name"
        />
      </div>
      <p class="links">
        <a *ngIf="p.links?.github as gh" [href]="gh" target="_blank">GitHub</a>
        <a *ngIf="p.links?.site as st" [href]="st" target="_blank">Site</a>
        <a *ngIf="p.links?.swagger as sw" [href]="sw" target="_blank"
          >Swagger</a
        >
      </p>
      <hr />
    </section>
  `,
  styles: [
    `
      .project-item {
        padding: 1rem 0;
      }
    `,
    `
      .skills {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        margin: 0.5rem 0;
      }
    `,
    `
      .links a {
        margin-right: 0.75rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsSimpleComponent {
  projects$!: Observable<Project[]>;
  constructor(private data: PortfolioDataService, private i18n: I18nService) {
    this.projects$ = this.i18n.lang$.pipe(
      // cada vez que muda o idioma refaz a query
      switchMap((lang: string) => this.data.getProjects(lang as any))
    );
  }

  trackProject = (_: number, p: Project) => p.id;
  trackFeature = (_: number, f: string) => f;
  trackSkill = (_: number, s: any) => s.id || s.name;
}
