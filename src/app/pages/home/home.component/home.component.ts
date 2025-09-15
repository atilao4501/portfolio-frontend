import { Component } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AssetsDataService } from '../../../core/services/data.assets.service';

interface HomeViewModel {
  name: string;
  title: string;
  summary: string;
  links: any;
  githubUsername: string;
}

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [NgIf, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  vm$: Observable<HomeViewModel>;

  constructor(private assetsDataService: AssetsDataService) {
    this.vm$ = this.assetsDataService.getData$().pipe(
      map((data: any) => ({
        name: data.hero.name,
        title: data.hero.title,
        summary: data.hero.summary,
        links: data.hero.links,
        githubUsername: data.shared?.personal?.githubUsername || 'atilao4501',
      }))
    );
  }
}
