// auth-nav-bar.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../../core/services/language.service';

@Component({
  selector: 'app-auth-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './auth-nav-bar.component.html',
  styleUrls: ['./auth-nav-bar.component.scss']
})
export class AuthNavBarComponent implements OnInit {
  private languageService = inject(LanguageService);
  private router = inject(Router);

  currentLanguage = this.languageService.currentLanguage;
  isRtl = this.languageService.isRtl;

  ngOnInit(): void {
    this.languageService.language$.subscribe(lang => {
      this.currentLanguage = lang;
      this.isRtl = this.languageService.isRtl;
    });
  }

  toggleMenu(): void {
    // This would be implemented to open a side menu
    console.log('Menu toggle clicked');
  }
}
