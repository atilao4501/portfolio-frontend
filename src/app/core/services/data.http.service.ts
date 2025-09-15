import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, shareReplay } from 'rxjs';
import { PortfolioDataService } from './data.token';
import { I18nService } from './i18n.service';
import { environment } from '../../../environments/environment';
import { PortfolioData } from '../models/portfolio.model';

@Injectable({ providedIn: 'root' })
export class HttpDataService implements PortfolioDataService {
  private cache$?: Observable<PortfolioData>;
  constructor(private http: HttpClient, private i18n: I18nService) {}
  getData$(): Observable<PortfolioData> {
    return (this.cache$ ??= this.i18n.lang$.pipe(
      switchMap((lang) =>
        this.http.get<PortfolioData>(
          `${environment.apiBaseUrl}/portfolio?lang=${encodeURIComponent(lang)}`
        )
      ),
      shareReplay(1)
    ));
  }
}
