import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../../core/services/language.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  standalone: true
})
export class FooterComponent {
  private languageService = inject(LanguageService);
  currentLanguage = this.languageService.currentLanguage;
  isRtl = this.languageService.isRtl;

  constructor() {
    this.languageService.language$.subscribe(lang => {
      this.currentLanguage = lang;
      this.isRtl = this.languageService.isRtl;
    });
  }
}
