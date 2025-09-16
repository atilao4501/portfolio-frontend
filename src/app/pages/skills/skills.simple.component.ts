import { Component } from '@angular/core';
import { NgFor, AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { Skill } from '../../core/models/skill.model';

@Component({
  selector: 'app-skills-simple',
  standalone: true,
  imports: [NgFor, AsyncPipe],
  templateUrl: './skills.simple.component.html',
  styleUrls: ['./skills.simple.component.css'],
})
export class SkillsSimpleComponent {
  skills$!: Observable<Skill[]>;
  constructor(private data: PortfolioDataService) {
    this.skills$ = this.data.getSkills();
  }
}
