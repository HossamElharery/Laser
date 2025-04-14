import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser, Location } from '@angular/common';
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
  private location = inject(Location);

  private readonly LANGUAGE_KEY = 'SELECTED_LANGUAGE';
  private readonly availableLanguages: Language[] = ['en', 'ar'];

  // Initialize with language from URL first, then fallback to other methods
  private languageSubject = new BehaviorSubject<Language>(this.getLanguageFromUrl() || this.getInitialLanguage());

  readonly language$ = this.languageSubject.asObservable();

  constructor() {
    // Initialize translations
    this.translate.addLangs(this.availableLanguages);
    this.translate.setDefaultLang('en');

    // Apply initial language - URL takes precedence, don't navigate
    const currentLang = this.languageSubject.value;
    this.applyLanguage(currentLang, false);

    // Force load current language to ensure it's available
    this.translate.use(currentLang).subscribe({
      next: () => console.log(`Language ${currentLang} loaded successfully`),
      error: (err) => console.error(`Error loading language ${currentLang}`, err)
    });
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

  // This method is used by UI components to switch language with navigation
  switchLanguage(language: Language): void {
    if (this.availableLanguages.includes(language) && language !== this.currentLanguage) {
      this.applyLanguage(language, true);
    }
  }

  // This method is used by the guard to set language without triggering navigation
  setLanguageWithoutNavigation(language: Language): void {
    if (this.availableLanguages.includes(language) && language !== this.currentLanguage) {
      this.applyLanguage(language, false);
    }
  }

  private getLanguageFromUrl(): Language | null {
    if (isPlatformBrowser(this.platformId)) {
      // Extract language from URL path
      const path = this.location.path();
      const match = path.match(/^\/(en|ar)(\/|$)/);
      if (match && this.availableLanguages.includes(match[1] as Language)) {
        // Found a valid language in the URL
        return match[1] as Language;
      }
    }
    return null;
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

  private applyLanguage(language: Language, updateUrl: boolean): void {
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

        // Update URL if requested and running in browser
        if (updateUrl) {
          const url = this.router.url;
          const urlParts = url.split('/');

          // Check if first segment is a language code
          if (this.availableLanguages.includes(urlParts[1] as Language)) {
            urlParts[1] = language;
          } else {
            urlParts.splice(1, 0, language);
          }

          const newUrl = urlParts.join('/');
          // Use navigateByUrl with skipLocationChange:false to update URL
          this.router.navigateByUrl(newUrl, { replaceUrl: true });
        }
      } catch (error) {
        // Silent fail
        console.error('Error applying language settings', error);
      }
    }
  }

  private loadLanguageStyle(language: Language): void {
    // Exit early if not in browser environment
    if (!isPlatformBrowser(this.platformId)) return;

    try {
      // Find existing language stylesheet if any
      const existingStylesheet = this.document.getElementById('language-style');

      // If the stylesheet already matches the current language, no need to replace it
      if (existingStylesheet && existingStylesheet.getAttribute('data-lang') === language) {
        return;
      }

      // Remove any existing language-specific stylesheet
      if (existingStylesheet) {
        existingStylesheet.remove();
      }

      // Create new stylesheet link element
      const stylesheet = this.document.createElement('link');
      stylesheet.id = 'language-style';
      stylesheet.setAttribute('data-lang', language);
      stylesheet.rel = 'stylesheet';
      stylesheet.href = `assets/styles/${language}.css`;

      // Add a load event listener to detect if the stylesheet loads successfully
      stylesheet.addEventListener('load', () => {
        console.log(`Language stylesheet for ${language} loaded successfully`);
      });

      // Add an error event listener to handle loading failures
      stylesheet.addEventListener('error', (event) => {
        console.error(`Failed to load language stylesheet for ${language}`, event);
        // Maybe set a default fallback if loading fails
      });

      // Add the stylesheet to the head
      this.document.head.appendChild(stylesheet);

      console.log(`Applied ${language} language styles`);
    } catch (error) {
      console.error('Error loading language stylesheet', error);
    }
  }
}
