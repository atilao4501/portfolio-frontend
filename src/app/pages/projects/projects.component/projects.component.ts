import { Component } from '@angular/core';
import { AsyncPipe, NgIf, NgFor, NgClass } from '@angular/common';
import { Observable, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { PortfolioDataService } from '../../../core/services/portfolio-data.service';
import { I18nService } from '../../../core/services/i18n.service';
import { Project } from '../../../core/models/project.model';
import { AssetsDataService } from '../../../core/services/data.assets.service';
import { SkillColorPipe } from '../../../shared/skill-color.pipe';

interface ProjectsViewModel {
  title: string;
  subtitle: string;
  featuresTitle: string;
  projects: Project[];
}

@Component({
  standalone: true,
  selector: 'app-projects',
  imports: [NgIf, NgFor, NgClass, AsyncPipe, SkillColorPipe],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent {
  vm$: Observable<ProjectsViewModel>;

  constructor(
    private portfolio: PortfolioDataService,
    private i18n: I18nService,
    private assetsData: AssetsDataService
  ) {
    // Pegamos projects diretamente do shared + lang atual
    const projects$ = this.i18n.lang$.pipe(
      switchMap((lang) => this.portfolio.getProjects(lang as any))
    );

    // Para textos (title/subtitle/featuresTitle) ainda dependemos do arquivo de idioma
    const uiTexts$ = this.assetsData
      .getData$()
      .pipe(map((d: any) => d.projectsPage || {}));

    this.vm$ = combineLatest([projects$, uiTexts$]).pipe(
      map(([projects, ui]) => {
        return {
          title: ui?.title || 'Meus Projetos',
          subtitle:
            ui?.subtitle ||
            'Uma seleção dos projetos que desenvolvi ao longo da minha carreira',
          featuresTitle: ui?.featuresTitle || 'Principais Características',
          projects,
        };
      })
    );
  }

  openLink(url: string): void {
    if (url) {
      window.open(url, '_blank', 'noopener noreferrer');
    }
  }
}
