import {
  Component,
  OnInit,
  Inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Observable, map } from 'rxjs';
import { PortfolioDataService } from '../../../core/services/portfolio-data.service';
import { Skill, SkillType } from '../../../core/models/skill.model';
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
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillComponent implements OnInit {
  vm$!: Observable<SkillsViewModel>;

  constructor(
    @Inject(DATA_SERVICE) private dataService: DataServiceInterface
  ) {}

  ngOnInit(): void {
    this.vm$ = this.dataService.getData$().pipe(
      map((data) => {
        const skillsList = (data as any).shared?.skills || [];

        if (!skillsList || skillsList.length === 0) {
          return {
            title: (data as any).skills?.title || 'Skills',
            categories: [],
          };
        }

        // Agrupar skills por tipo
        const skillsByType = skillsList.reduce(
          (acc: Record<string, Skill[]>, skill: Skill) => {
            const type = skill.type;
            if (!acc[type]) {
              acc[type] = [];
            }
            acc[type].push(skill);
            return acc;
          },
          {}
        );

        // Converter para o formato esperado pelo template
        const categories: SkillCategory[] = Object.entries(skillsByType).map(
          ([type, skills]) => ({
            title: this.getCategoryTitle(type as SkillType),
            skills: (skills as Skill[]).map((s: Skill) => ({
              name: s.name,
              svg: s.svg.url,
            })),
          })
        );

        return {
          title: (data as any).skills?.title || 'Skills',
          categories,
        };
      })
    );
  }

  private getCategoryTitle(categoryKey: SkillType): string {
    const categoryMap: Record<SkillType, string> = {
      [SkillType.BACKEND]: 'Backend',
      [SkillType.FRONTEND]: 'Frontend',
      [SkillType.DATABASE]: 'Database',
      [SkillType.DEVOPS]: 'DevOps',
      [SkillType.TOOLS]: 'Tools',
    };

    return categoryMap[categoryKey] || categoryKey;
  }

  trackCategory = (_: number, c: SkillCategory) => c.title;
  trackSkill = (_: number, s: SkillItem) => s.name;
}
