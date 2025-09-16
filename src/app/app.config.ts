// app.config.ts
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withPreloading } from '@angular/router';
import { PreloadingStrategy, Route } from '@angular/router';
import { inject } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { routes } from './app.routes';

import { provideHttpClient, withFetch } from '@angular/common/http';

import { provideTranslateService, TranslateModule } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { environment } from '../environments/environment';
import { DATA_SERVICE } from './core/services/data.token';
import { AssetsDataService } from './core/services/data.assets.service';
import { HttpDataService } from './core/services/data.http.service';

const DATA_PROVIDER = environment.useAssetsData
  ? { provide: DATA_SERVICE, useExisting: AssetsDataService }
  : { provide: DATA_SERVICE, useExisting: HttpDataService };

class PriorityPreloadStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    const priority = (route.data as any)?.preloadPriority ?? 0;
    if (!priority) return of(null);
    // Espaça o preload conforme prioridade (menor número carrega antes)
    const delayMs = priority * 150; // 0,150,300...
    return timer(delayMs).pipe(mergeMap(() => load()));
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withPreloading(PriorityPreloadStrategy)),
    provideHttpClient(withFetch()),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: 'assets/i18n/',
        suffix: '.json',
      }),
      lang: 'en',
      fallbackLang: 'en',
    }),

    DATA_PROVIDER,
  ],
};
