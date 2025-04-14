import { Injectable, inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { LanguageService, Language } from '../services/language.service';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageGuard implements CanActivate {
  private router = inject(Router);
  private languageService = inject(LanguageService);
  private platformId = inject(PLATFORM_ID);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    // Make sure this works for both SSR and browser
    const urlLang = route.paramMap.get('lang') as Language;
    const availableLanguages = this.languageService.getAvailableLanguages();

    // If URL has valid language prefix, use it
    if (urlLang && availableLanguages.includes(urlLang)) {
      // Update language if different from current
      if (urlLang !== this.languageService.currentLanguage) {
        this.languageService.switchLanguage(urlLang);
      }
      return true;
    }

    // Otherwise, redirect to the same URL with current language prefix
    // Only generate a new URL when in the browser or for the first render in SSR
    const currentLang = this.languageService.currentLanguage;
    const segments = state.url.split('/').filter(Boolean);
    const newUrl = `/${currentLang}${segments.length ? '/' + segments.join('/') : ''}`;
    return this.router.parseUrl(newUrl);
  }
}
