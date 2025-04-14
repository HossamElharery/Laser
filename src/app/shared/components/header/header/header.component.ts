import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../../core/services/language.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private languageService = inject(LanguageService);
  currentLanguage = this.languageService.currentLanguage;

  constructor() {
    this.languageService.language$.subscribe(lang => {
      this.currentLanguage = lang;
    });
  }
}
