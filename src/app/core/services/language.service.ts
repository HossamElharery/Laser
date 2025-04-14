import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

export type Language = 'en' | 'ar';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private document = inject(DOCUMENT);
  private translate = inject(TranslateService);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  private readonly LANGUAGE_KEY = 'SELECTED_LANGUAGE';
  private readonly availableLanguages: Language[] = ['en', 'ar'];
  private languageSubject = new BehaviorSubject<Language>(this.getInitialLanguage());

  readonly language$ = this.languageSubject.asObservable();

  constructor() {
    // Initialize translations
    this.translate.addLangs(this.availableLanguages);
    this.translate.setDefaultLang('en');

    // Apply initial language
    const currentLang = this.languageSubject.value;
    this.applyLanguage(currentLang);
  }

  get currentLanguage(): Language {
    return this.languageSubject.value;
  }

  get isRtl(): boolean {
    return this.currentLanguage === 'ar';
  }

  getAvailableLanguages(): Language[] {
    return [...this.availableLanguages];
  }

  switchLanguage(language: Language): void {
    if (this.availableLanguages.includes(language) && language !== this.currentLanguage) {
      this.applyLanguage(language);

      // Update URL to reflect language change
      if (isPlatformBrowser(this.platformId)) {
        const url = this.router.url;
        const urlParts = url.split('/');
        if (this.availableLanguages.includes(urlParts[1] as Language)) {
          urlParts[1] = language;
        } else {
          urlParts.splice(1, 0, language);
        }
        const newUrl = urlParts.join('/');
        this.router.navigateByUrl(newUrl);
      }
    }
  }

  private getInitialLanguage(): Language {
    // Check if running in the browser
    if (isPlatformBrowser(this.platformId)) {
      try {
        // First check localStorage
        const savedLanguage = localStorage.getItem(this.LANGUAGE_KEY) as Language;
        if (savedLanguage && this.availableLanguages.includes(savedLanguage)) {
          return savedLanguage;
        }

        // Then check browser language
        const browserLang = navigator.language.split('-')[0] as Language;
        if (this.availableLanguages.includes(browserLang)) {
          return browserLang;
        }
      } catch (error) {
        // Silent fail and return default
      }
    }

    // Default to English for SSR or fallback
    return 'en';
  }

  private applyLanguage(language: Language): void {
    // Update state
    this.languageSubject.next(language);

    // Update translate service (safe for both server and browser)
    this.translate.use(language);

    // Browser-only operations
    if (isPlatformBrowser(this.platformId)) {
      try {
        // Save to localStorage
        localStorage.setItem(this.LANGUAGE_KEY, language);

        // Update document properties
        this.document.documentElement.lang = language;
        this.document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';

        // Load language-specific CSS
        this.loadLanguageStyle(language);
      } catch (error) {
        // Silent fail
      }
    }
  }

  private loadLanguageStyle(language: Language): void {
    if (!isPlatformBrowser(this.platformId)) return;

    try {
      // Remove any existing language-specific stylesheet
      const existingStylesheet = this.document.getElementById('language-style');
      if (existingStylesheet) {
        existingStylesheet.remove();
      }

      // Create and add the new language-specific stylesheet
      const stylesheet = this.document.createElement('link');
      stylesheet.id = 'language-style';
      stylesheet.rel = 'stylesheet';
      stylesheet.href = `assets/styles/${language}.css`;
      this.document.head.appendChild(stylesheet);
    } catch (error) {
      // Silent fail - non-critical UI enhancement
    }
  }
}
