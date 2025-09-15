import { Component, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { map } from 'rxjs/operators';
import {
  PortfolioDataService,
  DATA_SERVICE,
} from '../../../core/services/data.token';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [NgIf, AsyncPipe, TranslateModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  private data = inject<PortfolioDataService>(DATA_SERVICE);
  vm$ = this.data.getData$().pipe(map((d) => d.hero));
}
