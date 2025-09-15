import { Component } from '@angular/core';
import { AsyncPipe, NgIf, NgFor, NgClass } from '@angular/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AssetsDataService } from '../../../core/services/data.assets.service';

interface Project {
  id: string;
  title: string;
  period?: string;
  company?: string;
  description: string;
  highlights?: string[];
  technologies: string[];
  type?: string;
  link?: string;
  github?: string;
  demo?: string;
  api?: string;
  featured?: boolean;
}

interface ProjectsViewModel {
  title: string;
  subtitle: string;
  categories: {
    professional: string;
    personal: string;
    freelance: string;
  };
  highlightsTitles: {
    professional: string;
    personal: string;
    freelance: string;
  };
  professional: Project[];
  personal: Project[];
  freelance: Project[];
}

@Component({
  standalone: true,
  selector: 'app-projects',
  imports: [NgIf, NgFor, NgClass, AsyncPipe],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent {
  vm$: Observable<ProjectsViewModel>;

  constructor(private assetsDataService: AssetsDataService) {
    this.vm$ = this.assetsDataService.getData$().pipe(
      map((data: any) => ({
        title: data.projects.title,
        subtitle: data.projects.subtitle,
        categories: data.projects.categories,
        highlightsTitles: data.projects.highlightsTitles,
        professional: data.projects.professional || [],
        personal: data.projects.personal || [],
        freelance: data.projects.freelance || [],
      }))
    );
  }

  openLink(url: string): void {
    if (url) {
      window.open(url, '_blank', 'noopener noreferrer');
    }
  }

  getTechnologyColor(tech: string): string {
    const colors: { [key: string]: string } = {
      '.NET': 'bg-purple-100 text-purple-800',
      'ASP.NET Core': 'bg-purple-100 text-purple-800',
      'Entity Framework Core': 'bg-blue-100 text-blue-800',
      'SQL Server': 'bg-orange-100 text-orange-800',
      PostgreSQL: 'bg-blue-100 text-blue-800',
      Redis: 'bg-red-100 text-red-800',
      Docker: 'bg-blue-100 text-blue-800',
      Angular: 'bg-red-100 text-red-800',
      Kafka: 'bg-gray-100 text-gray-800',
      Kubernetes: 'bg-blue-100 text-blue-800',
      JWT: 'bg-green-100 text-green-800',
      xUnit: 'bg-green-100 text-green-800',
      'Clean Architecture': 'bg-indigo-100 text-indigo-800',
      Microservices: 'bg-yellow-100 text-yellow-800',
      WooCommerce: 'bg-purple-100 text-purple-800',
      WordPress: 'bg-gray-100 text-gray-800',
    };
    return colors[tech] || 'bg-gray-100 text-gray-800';
  }
}
