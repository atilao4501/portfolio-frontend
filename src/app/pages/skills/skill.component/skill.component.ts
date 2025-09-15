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
    // Placeholders simples para cada skill
    '.NET': '🔷',
    'C#': '🔷',
    'EF Core': '🔷',
    PostgreSQL: '🐘',
    MongoDB: '🍃',
    Angular: '🅰️',
    TypeScript: '🔷',
    'HTML/CSS': '🌐',
    Git: '📝',
    Docker: '🐳',
    Azure: '☁️',
  };

  private colorMap: Record<string, string> = {
    // Backend
    '.NET': '#512BD4',
    'C#': '#239120',
    'EF Core': '#512BD4',
    PostgreSQL: '#4169E1',
    MongoDB: '#47A248',

    // Frontend
    Angular: '#DD0031',
    TypeScript: '#3178C6',
    'HTML/CSS': '#E34C26',

    // Tools
    Git: '#F05032',
    Docker: '#2496ED',
    Azure: '#0078D4',
  };

  vm$!: Observable<SkillsViewModel>;

  constructor(private assetsDataService: AssetsDataService) {}

  ngOnInit(): void {
    this.vm$ = this.assetsDataService.getData$().pipe(
      map((data: any) => ({
        title: data.skills.title,
        categories: [
          {
            title: data.skills.categories.backend,
            skills: data.shared.skills.backend.map((skill: any) => ({
              name: skill.name,
              icon: this.iconMap[skill.name] || this.getDefaultIcon(),
              color: this.colorMap[skill.name] || '#7877c6',
            })),
          },
          {
            title: data.skills.categories.frontend,
            skills: data.shared.skills.frontend.map((skill: any) => ({
              name: skill.name,
              icon: this.iconMap[skill.name] || this.getDefaultIcon(),
              color: this.colorMap[skill.name] || '#36a2eb',
            })),
          },
          {
            title: data.skills.categories.tools,
            skills: data.shared.skills.tools.map((skill: any) => ({
              name: skill.name,
              icon: this.iconMap[skill.name] || this.getDefaultIcon(),
              color: this.colorMap[skill.name] || '#ff6384',
            })),
          },
        ],
      }))
    );
  }

  private getDefaultIcon(): string {
    return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
  }
}
