import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Language, LanguageService } from '../../../../core/services/language.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="language-switcher">
      <button
        *ngFor="let lang of availableLanguages"
        [class.active]="lang === currentLanguage"
        (click)="switchLanguage(lang)">
        {{ lang.toUpperCase() }}
      </button>
    </div>
  `,
  styles: [`
    .language-switcher {
      display: flex;
      gap: 8px;
      padding: 10px;
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      z-index: 1000;
    }

    button {
      border: 1px solid #ccc;
      background: transparent;
      padding: 4px 8px;
      border-radius: 4px;
      cursor: pointer;
    }

    button.active {
      background: #007bff;
      color: white;
      border-color: #007bff;
    }
  `]
})
export class LanguageSwitcherComponent implements OnInit, OnDestroy {
  private languageService = inject(LanguageService);
  private destroy$ = new Subject<void>();

  currentLanguage = this.languageService.currentLanguage;
  availableLanguages = this.languageService.getAvailableLanguages();

  ngOnInit() {
    this.languageService.language$
      .pipe(takeUntil(this.destroy$))
      .subscribe(lang => {
        this.currentLanguage = lang;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  switchLanguage(lang: Language): void {
    if (lang !== this.currentLanguage) {
      this.languageService.switchLanguage(lang);
    }
  }
}
