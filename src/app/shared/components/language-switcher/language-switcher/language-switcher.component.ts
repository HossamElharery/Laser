import { Component, inject } from '@angular/core';
import { Language, LanguageService } from '../../../../core/services/language.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

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
export class LanguageSwitcherComponent {
  private languageService = inject(LanguageService);

  currentLanguage = this.languageService.currentLanguage;
  availableLanguages = this.languageService.getAvailableLanguages();

  constructor() {
    this.languageService.language$.subscribe(lang => {
      this.currentLanguage = lang;
    });
  }

  switchLanguage(lang: Language): void {
    this.languageService.switchLanguage(lang);
  }
}
