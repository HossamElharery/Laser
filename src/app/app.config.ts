import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { CustomTranslateLoader } from './core/services/translate-loader.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useClass: CustomTranslateLoader
        },
        isolate: false,
        useDefaultLang: true
      })
    )
  ]
};
