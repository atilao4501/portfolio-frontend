import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import { PortfolioDataService } from '../../../core/services/portfolio-data.service';
import { Skill } from '../../../core/models/skill.model';

interface SkillItem {
  name: string;
  svg: string;
  type: string;
  level: string;
}

interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

interface SkillsViewModel {
  title: string;
  categories: SkillCategory[];
}

@Component({
  selector: 'app-skill',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css'],
})
export class SkillComponent implements OnInit {
  private iconMap: Record<string, string> = {
    // Backend
    '.NET': 'devicon-dot-net-plain',
    'ASP.NET Core': 'devicon-dot-net-plain',
    'Entity Framework Core (EF Core)': 'devicon-entityframeworkcore-plain',
    'RESTful APIs': 'devicon-swagger-plain',
    'APIs RESTful': 'devicon-swagger-plain',
    'Clean Architecture': 'devicon-dot-net-plain',
    'JWT / Identity': 'devicon-dot-net-plain',
    'Swagger / OpenAPI': 'devicon-swagger-plain',

    // Databases
    'SQL Server': 'devicon-microsoftsqlserver-plain',
    PostgreSQL: 'devicon-postgresql-plain',
    'Redis (distributed cache)': 'devicon-redis-plain',
    'Redis (cache distribuído)': 'devicon-redis-plain',

    // Messaging
    'Kafka (asynchronous messaging)': 'devicon-apachekafka-plain',
    'Kafka (mensageria assíncrona)': 'devicon-apachekafka-plain',

    // DevOps
    'Docker / Docker Compose': 'devicon-docker-plain',
    'Kubernetes (Lens)': 'devicon-kubernetes-plain',
    'CI/CD pipelines': 'devicon-githubactions-plain',
    'Git Flow': 'devicon-git-plain',

    // Observability
    'Serilog (structured logging)': 'devicon-dot-net-plain',
    'Serilog (logs estruturados)': 'devicon-dot-net-plain',
    Dynatrace: 'devicon-dynatrace-plain',
    Grafana: 'devicon-grafana-plain',

    // Testing
    xUnit: 'devicon-dot-net-plain',
    'Automated testing (mocks/stubs)': 'devicon-jest-plain',
    'Testes automatizados (mocks/stubs)': 'devicon-jest-plain',

    // Frontend
    Angular: 'devicon-angular-plain',

    // Tools
    'Agile methodologies (Scrum/Kanban)': 'devicon-jira-plain',
    'Metodologias Ágeis (Scrum/Kanban)': 'devicon-jira-plain',

    // Operating Systems
    Windows: 'devicon-windows11-original',
    macOS: 'devicon-apple-original',
    Linux: 'devicon-linux-plain',
  };

  private colorMap: Record<string, string> = {
    // Backend - Purple tones
    '.NET': '#512BD4',
    'ASP.NET Core': '#512BD4',
    'Entity Framework Core (EF Core)': '#512BD4',
    'RESTful APIs': '#7C3AED',
    'APIs RESTful': '#7C3AED',
    'Clean Architecture': '#8B5CF6',
    'JWT / Identity': '#9333EA',
    'Swagger / OpenAPI': '#A855F7',

    // Databases - Blue tones
    'SQL Server': '#0078D4',
    PostgreSQL: '#336791',
    'Redis (distributed cache)': '#DC382D',
    'Redis (cache distribuído)': '#DC382D',

    // Messaging - Orange
    'Kafka (asynchronous messaging)': '#F97316',
    'Kafka (mensageria assíncrona)': '#F97316',

    // DevOps - Cyan tones
    'Docker / Docker Compose': '#2496ED',
    'Kubernetes (Lens)': '#326CE5',
    'CI/CD pipelines': '#06B6D4',
    'Git Flow': '#F05032',

    // Observability - Green tones
    'Serilog (structured logging)': '#10B981',
    'Serilog (logs estruturados)': '#10B981',
    Dynatrace: '#1F8A70',
    Grafana: '#F46800',

    // Testing - Yellow tones
    xUnit: '#FCD34D',
    'Automated testing (mocks/stubs)': '#FBBF24',
    'Testes automatizados (mocks/stubs)': '#FBBF24',

    // Frontend - Red tones
    Angular: '#DD0031',

    // Tools - Gray tones
    'Agile methodologies (Scrum/Kanban)': '#6B7280',
    'Metodologias Ágeis (Scrum/Kanban)': '#6B7280',

    // Operating Systems
    Windows: '#0078D4',
    macOS: '#000000',
    Linux: '#FCC624',
  };

  vm$!: Observable<SkillsViewModel>;

  constructor(private data: PortfolioDataService) {}

  ngOnInit(): void {
    this.vm$ = this.data.getSkillsGrouped().pipe(
      map((grouped) => {
        const categories: SkillCategory[] = Object.entries(grouped).map(
          ([key, arr]) => ({
            title: this.getCategoryTitle(key),
            skills: arr.map((s: Skill) => ({
              name: s.name,
              svg: s.svg.url,
              type: s.type,
              level: s.level,
            })),
          })
        );
        return { title: 'Skills', categories };
      })
    );
  }

  private getCategoryTitle(categoryKey: string): string {
    // Capitalizar e formatar o nome da categoria
    const categoryMap: Record<string, string> = {
      backend: 'Backend',
      databases: 'Databases',
      messaging: 'Messaging',
      devops: 'DevOps',
      observability: 'Observability',
      testing: 'Testing',
      frontend: 'Frontend',
      tools: 'Tools',
      os: 'Operating Systems',
    };

    return (
      categoryMap[categoryKey] ||
      categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1)
    );
  }

  private getDefaultColor(categoryKey: string): string {
    return '#64748B';
  }
}
