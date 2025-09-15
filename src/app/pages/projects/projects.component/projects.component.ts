import { Component } from '@angular/core';
import { AsyncPipe, NgIf, NgFor, NgClass } from '@angular/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AssetsDataService } from '../../../core/services/data.assets.service';

interface Project {
  id: string;
  title: string;
  shortDescription: string;
  features: string[];
  skills?: string[];
  links?: {
    github?: string;
    site?: string;
    swagger?: string;
  };
}

interface ProjectsViewModel {
  title: string;
  subtitle: string;
  featuresTitle: string;
  projects: Project[];
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
      map((data: any) => {
        // Combina dados dos dois JSONs
        const projects = data.projects || [];
        const sharedProjects = data.shared?.projects || [];

        // Combina informações de ambas as fontes
        const combinedProjects = projects.map((project: any) => {
          const sharedProject = sharedProjects.find(
            (sp: any) => sp.id === project.id
          );
          return {
            ...project,
            skills: sharedProject?.skills || [],
            links: sharedProject?.links || {},
          };
        });

        return {
          title: data.projectsPage?.title || 'Meus Projetos',
          subtitle:
            data.projectsPage?.subtitle ||
            'Uma seleção dos projetos que desenvolvi ao longo da minha carreira',
          featuresTitle:
            data.projectsPage?.featuresTitle || 'Principais Características',
          projects: combinedProjects,
        };
      })
    );
  }

  openLink(url: string): void {
    if (url) {
      window.open(url, '_blank', 'noopener noreferrer');
    }
  }

  getTechnologyColor(skill: string): string {
    const colors: { [key: string]: string } = {
      dotnet: 'bg-purple-100 text-purple-800',
      efcore: 'bg-blue-100 text-blue-800',
      sqlserver: 'bg-orange-100 text-orange-800',
      postgresql: 'bg-blue-100 text-blue-800',
      redis: 'bg-red-100 text-red-800',
      docker: 'bg-blue-100 text-blue-800',
      angular: 'bg-red-100 text-red-800',
      apachekafka: 'bg-gray-100 text-gray-800',
      kubernetes: 'bg-blue-100 text-blue-800',
      aspnetcore: 'bg-purple-100 text-purple-800',
      wordpress: 'bg-blue-100 text-blue-800',
      woocommerce: 'bg-purple-100 text-purple-800',
      grafana: 'bg-orange-100 text-orange-800',
    };
    return colors[skill] || 'bg-gray-100 text-gray-800';
  }
}
