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
    // Get language from URL
    const urlLang = route.paramMap.get('lang') as Language;
    const availableLanguages = this.languageService.getAvailableLanguages();

    // If URL has valid language prefix, use it
    if (urlLang && availableLanguages.includes(urlLang)) {
      // Update language if different from current (without triggering navigation)
      if (urlLang !== this.languageService.currentLanguage) {
        this.languageService.setLanguageWithoutNavigation(urlLang);
      }
      return true;
    }

    // Otherwise, redirect to the same URL with current language prefix
    // Take care not to include the language if it's already in segments
    const currentLang = this.languageService.currentLanguage;

    // Extract path segments, removing any empty strings
    const segments = state.url.split('/').filter(Boolean);

    // If segments already contains a language code, don't add it again
    const firstSegment = segments.length > 0 ? segments[0] : '';
    if (availableLanguages.includes(firstSegment as Language)) {
      segments.shift(); // Remove the language segment
    }

    const newUrl = `/${currentLang}${segments.length ? '/' + segments.join('/') : ''}`;
    return this.router.parseUrl(newUrl);
  }
}
