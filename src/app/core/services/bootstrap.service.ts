import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Language, LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class BootstrapService {
  private document = inject(DOCUMENT);
  private languageService = inject(LanguageService);
  private platformId = inject(PLATFORM_ID);

  /**
   * Initialize Bootstrap with the appropriate direction
   */
  initialize(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Subscribe to language changes
    this.languageService.language$.subscribe(lang => {
      this.loadBootstrapForLanguage(lang);
    });

    // Initial load
    this.loadBootstrapForLanguage(this.languageService.currentLanguage);
  }

  /**
   * Load the appropriate Bootstrap CSS file based on language
   */
  private loadBootstrapForLanguage(language: Language): void {
    if (!isPlatformBrowser(this.platformId)) return;

    try {
      // Find existing Bootstrap stylesheet if any
      const existingStylesheet = this.document.getElementById('bootstrap-style');

      // If the stylesheet already matches the current language, no need to replace it
      if (existingStylesheet && existingStylesheet.getAttribute('data-lang') === language) {
        return;
      }

      // Remove any existing Bootstrap stylesheet
      if (existingStylesheet) {
        existingStylesheet.remove();
      }

      // Create new stylesheet link element
      const stylesheet = this.document.createElement('link');
      stylesheet.id = 'bootstrap-style';
      stylesheet.setAttribute('data-lang', language);
      stylesheet.rel = 'stylesheet';

      // We can either use CDN or local paths - using CDN for simplicity
      if (language === 'ar') {
        // Arabic (RTL)
        stylesheet.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css';
      } else {
        // English (LTR)
        stylesheet.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';
      }

      // Add event listeners
      stylesheet.addEventListener('load', () => {
        console.log(`Bootstrap stylesheet for ${language} loaded successfully`);
      });

      stylesheet.addEventListener('error', (event) => {
        console.error(`Failed to load Bootstrap stylesheet for ${language}`, event);
      });

      // Add the stylesheet to the head
      this.document.head.appendChild(stylesheet);

      // Also add Bootstrap icons (optional)
      const iconsStylesheet = this.document.getElementById('bootstrap-icons');
      if (!iconsStylesheet) {
        const icons = this.document.createElement('link');
        icons.id = 'bootstrap-icons';
        icons.rel = 'stylesheet';
        icons.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css';
        this.document.head.appendChild(icons);
      }

      // Add Bootstrap JS (optional)
      if (!this.document.getElementById('bootstrap-js')) {
        const script = this.document.createElement('script');
        script.id = 'bootstrap-js';
        script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js';
        script.defer = true;
        this.document.body.appendChild(script);
      }

      console.log(`Applied Bootstrap styles for ${language}`);
    } catch (error) {
      console.error('Error loading Bootstrap stylesheet', error);
    }
  }
}
