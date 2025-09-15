import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import { AssetsDataService } from '../../../core/services/data.assets.service';

interface SkillItem {
  name: string;
  icon: string;
  color: string;
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
    '.NET': '🔷',
    'ASP.NET Core': '🌐',
    'Entity Framework Core (EF Core)': '🗄️',
    'RESTful APIs': '🔗',
    'APIs RESTful': '🔗',
    'Clean Architecture': '🏗️',
    'JWT / Identity': '🔐',
    'Swagger / OpenAPI': '📋',

    // Databases
    'SQL Server': '🗄️',
    PostgreSQL: '🐘',
    'Redis (distributed cache)': '⚡',
    'Redis (cache distribuído)': '⚡',
    'Data migration': '🔄',
    'Migração de dados': '🔄',

    // Messaging
    'Kafka (asynchronous messaging)': '📡',
    'Kafka (mensageria assíncrona)': '📡',

    // DevOps
    'Docker / Docker Compose': '�',
    'Kubernetes (Lens)': '⚙️',
    'CI/CD pipelines': '�',
    'Git Flow': '📝',

    // Observability
    'Serilog (structured logging)': '�',
    'Serilog (logs estruturados)': '📊',
    Dynatrace: '🎯',
    Grafana: '�',

    // Testing
    xUnit: '🧪',
    'Automated testing (mocks/stubs)': '🤖',
    'Testes automatizados (mocks/stubs)': '🤖',

    // Frontend
    Angular: '🅰️',
    'Frontend-backend integration': '🔗',
    'Integração frontend-backend': '�',

    // Tools
    'Agile methodologies (Scrum/Kanban)': '🏃',
    'Metodologias Ágeis (Scrum/Kanban)': '�',
    'API Security': '🔒',
    'Segurança em APIs': '�',
    'Banking Integrations (Bradesco, Itaú, co-branded cards)': '🏦',
    'Integrações Bancárias (Bradesco, Itaú, cartões co-branded)': '🏦',
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
    'Data migration': '#1E40AF',
    'Migração de dados': '#1E40AF',

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
    'Frontend-backend integration': '#DC2626',
    'Integração frontend-backend': '#DC2626',

    // Tools - Gray/Mixed tones
    'Agile methodologies (Scrum/Kanban)': '#6B7280',
    'Metodologias Ágeis (Scrum/Kanban)': '#6B7280',
    'API Security': '#EF4444',
    'Segurança em APIs': '#EF4444',
    'Banking Integrations (Bradesco, Itaú, co-branded cards)': '#059669',
    'Integrações Bancárias (Bradesco, Itaú, cartões co-branded)': '#059669',
  };

  vm$!: Observable<SkillsViewModel>;

  constructor(private assetsDataService: AssetsDataService) {}

  ngOnInit(): void {
    this.vm$ = this.assetsDataService.getData$().pipe(
      map((data: any) => {
        const categories: SkillCategory[] = [];
        const skillsData = data.skills.categories;

        // Mapear cada categoria do novo formato
        Object.keys(skillsData).forEach((categoryKey) => {
          const skills = skillsData[categoryKey];
          if (Array.isArray(skills) && skills.length > 0) {
            categories.push({
              title: this.getCategoryTitle(categoryKey),
              skills: skills.map((skillName: string) => ({
                name: skillName,
                icon: this.iconMap[skillName] || this.getDefaultIcon(),
                color:
                  this.colorMap[skillName] || this.getDefaultColor(categoryKey),
              })),
            });
          }
        });

        return {
          title: data.skills.title,
          categories: categories,
        };
      })
    );
  }

  private getDefaultIcon(): string {
    return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
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
    };

    return (
      categoryMap[categoryKey] ||
      categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1)
    );
  }

  private getDefaultColor(categoryKey: string): string {
    const defaultColors: Record<string, string> = {
      backend: '#7C3AED',
      databases: '#3B82F6',
      messaging: '#F97316',
      devops: '#06B6D4',
      observability: '#10B981',
      testing: '#FBBF24',
      frontend: '#EF4444',
      tools: '#6B7280',
    };

    return defaultColors[categoryKey] || '#64748B';
  }
}
