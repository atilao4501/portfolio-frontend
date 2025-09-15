// app.config.ts
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideHttpClient } from '@angular/common/http';

import { provideTranslateService, TranslateModule } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { environment } from '../environments/environment';
import { DATA_SERVICE } from './core/services/data.token';
import { AssetsDataService } from './core/services/data.assets.service';
import { HttpDataService } from './core/services/data.http.service';

const DATA_PROVIDER = environment.useAssetsData
  ? { provide: DATA_SERVICE, useExisting: AssetsDataService }
  : { provide: DATA_SERVICE, useExisting: HttpDataService };

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
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
