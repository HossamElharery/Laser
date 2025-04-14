import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

// This class helps handle translations in both browser and server environments
@Injectable()
export class CustomTranslateLoader implements TranslateLoader {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  // Hardcoded fallback translations to use during SSR or if loading fails
  private fallbackTranslations: Record<string, any> = {
    'en': {
      'common': {
        'menu': 'Menu',
        'login': 'Login',
        'signup': 'Sign up',
        'home': 'Home',
        'about': 'About us',
        'clinics': 'Clinics',
        'blog': 'Blog',
        'contact': 'Contact us'
      }
    },
    'ar': {
      'common': {
        'menu': 'القائمة',
        'login': 'تسجيل الدخول',
        'signup': 'إنشاء حساب',
        'home': 'الرئيسية',
        'about': 'من نحن',
        'clinics': 'العيادات',
        'blog': 'المدونة',
        'contact': 'اتصل بنا'
      }
    }
  };

  getTranslation(lang: string): Observable<any> {
    // For server-side rendering, use fallback translations to avoid HTTP requests
    if (isPlatformServer(this.platformId)) {
      return of(this.fallbackTranslations[lang] || this.fallbackTranslations['en']);
    }

    // In browser, attempt to load from assets, with fallback if it fails
    return this.http.get(`./assets/i18n/${lang}.json`).pipe(
      catchError(() => {
        console.warn(`Translation file for ${lang} not found, using fallback.`);
        return of(this.fallbackTranslations[lang] || this.fallbackTranslations['en']);
      })
    );
  }
}
