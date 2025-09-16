import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import { PortfolioDataService } from '../../../core/services/portfolio-data.service';
import { Skill } from '../../../core/models/skill.model';
import {
  DATA_SERVICE,
  PortfolioDataService as DataServiceInterface,
} from '../../../core/services/data.token';

interface SkillItem {
  name: string;
  svg: string;
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
  vm$!: Observable<SkillsViewModel>;

  constructor(
    @Inject(DATA_SERVICE) private dataService: DataServiceInterface
  ) {}

  ngOnInit(): void {
    this.vm$ = this.dataService.getData$().pipe(
      map((data) => {
        const shared = (data as any).shared;

        if (!shared || !shared.skills) {
          return { title: 'Skills', categories: [] };
        }

        const categories: SkillCategory[] = Object.entries(shared.skills).map(
          ([key, arr]) => ({
            title: this.getCategoryTitle(key),
            skills: (arr as Skill[]).map((s: Skill) => ({
              name: s.name,
              svg: s.svg.url,
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
      database: 'Database',
      messaging: 'Messaging',
      devops: 'DevOps',
      observability: 'Observability',
      frontend: 'Frontend',
      tools: 'Tools',
    };

    return (
      categoryMap[categoryKey] ||
      categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1)
    );
  }
}
