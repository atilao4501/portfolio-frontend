import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, shareReplay, combineLatest, map } from 'rxjs';
import { PortfolioDataService } from './data.token';
import { I18nService } from './i18n.service';
import { PortfolioData, SharedData } from '../models/portfolio.model';

@Injectable({ providedIn: 'root' })
export class AssetsDataService implements PortfolioDataService {
  private cache$?: Observable<PortfolioData>;
  private sharedData$?: Observable<SharedData>;

  constructor(private http: HttpClient, private i18n: I18nService) {}

  private getSharedData$(): Observable<SharedData> {
    return (this.sharedData$ ??= this.http
      .get<SharedData>('/assets/data/shared.json')
      .pipe(shareReplay(1)));
  }

  getData$(): Observable<PortfolioData> {
    return (this.cache$ ??= this.i18n.lang$.pipe(
      switchMap((lang) =>
        combineLatest([
          this.http.get<PortfolioData>(`/assets/data/data.${lang}.json`),
          this.getSharedData$(),
        ]).pipe(
          map(
            ([langData, sharedData]) =>
              ({
                ...langData,
                // Adiciona os dados pessoais e links compartilhados à navbar
                navbar: {
                  ...langData.navbar,
                  brand: sharedData.personal.brand,
                  socialLinks: {
                    linkedin: sharedData.links.linkedin!,
                    github: sharedData.links.github!,
                  },
                },
                // Adiciona o nome e links compartilhados ao hero
                hero: {
                  ...langData.hero,
                  name: sharedData.personal.name,
                  links: sharedData.links,
                },
                // Adiciona dados compartilhados diretamente
                shared: sharedData,
              } as PortfolioData & { shared: SharedData })
          )
        )
      ),
      shareReplay(1)
    ));
  }
}
