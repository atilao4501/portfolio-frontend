import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AsyncPipe, NgIf, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AssetsDataService } from '../../../core/services/data.assets.service';

interface AboutViewModel {
  title: string;
  description: string;
  longDescription: string;
  highlights: string[];
  technologies: string[];
  experience: string[];
  subtitles: {
    backendDeveloper: string;
    dotnetDeveloper: string;
  };
  sectionTitles: {
    professionalJourney: string;
    highlights: string;
    mainTechnologies: string;
    experienceAreas: string;
  };
  cta: {
    title: string;
    description: string;
    contactButton: string;
    projectsButton: string;
  };
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgIf, AsyncPipe, CommonModule, RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  vm$: Observable<AboutViewModel>;

  constructor(private assetsDataService: AssetsDataService) {
    this.vm$ = this.assetsDataService.getData$().pipe(
      map((data: any) => ({
        title: data.about.title,
        description: data.about.description,
        longDescription: data.about.longDescription,
        highlights: data.about.highlights || [],
        technologies: data.about.technologies || [],
        experience: data.about.experience || [],
        subtitles: {
          backendDeveloper:
            data.about.subtitles?.backendDeveloper || 'Backend Developer',
          dotnetDeveloper:
            data.about.subtitles?.dotnetDeveloper || '.NET Developer',
        },
        sectionTitles: {
          professionalJourney:
            data.about.sectionTitles?.professionalJourney ||
            'Trajetória Profissional',
          highlights: data.about.sectionTitles?.highlights || 'Destaques',
          mainTechnologies:
            data.about.sectionTitles?.mainTechnologies ||
            'Tecnologias Principais',
          experienceAreas:
            data.about.sectionTitles?.experienceAreas || 'Áreas de Experiência',
        },
        cta: {
          title: data.about.cta?.title || 'Vamos trabalhar juntos?',
          description:
            data.about.cta?.description ||
            'Estou sempre aberto a novos desafios e oportunidades de colaboração.',
          contactButton: data.about.cta?.contactButton || 'Entrar em Contato',
          projectsButton: data.about.cta?.projectsButton || 'Ver Projetos',
        },
      }))
    );
  }
}
