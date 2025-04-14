import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../core/services/language.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  imports: [CommonModule, RouterOutlet, RouterLink, TranslateModule],
  standalone: true
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  private languageService = inject(LanguageService);
  private destroy$ = new Subject<void>();

  currentLanguage = this.languageService.currentLanguage;

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
}
