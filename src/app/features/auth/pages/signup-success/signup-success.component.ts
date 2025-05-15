// signup-success.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { LanguageService } from '../../../../core/services/language.service';
import { AuthNavBarComponent } from '../../shared/auth-nav-bar/auth-nav-bar.component';

@Component({
  selector: 'app-signup-success',
  standalone: true,
  imports: [CommonModule, RouterLink, AuthNavBarComponent],
  templateUrl: './signup-success.component.html',
  styleUrls: ['./signup-success.component.scss']
})
export class SignupSuccessComponent {
  private router = inject(Router);
  private languageService = inject(LanguageService);

  currentLanguage = this.languageService.currentLanguage;
  isRtl = this.languageService.isRtl;

  constructor() {
    this.languageService.language$.subscribe(lang => {
      this.currentLanguage = lang;
      this.isRtl = this.languageService.isRtl;
    });
  }

  navigateToHome(): void {
    // Navigate to home page
    this.router.navigate(['/', this.currentLanguage]);
  }
}
