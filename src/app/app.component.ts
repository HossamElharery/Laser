import { Component, inject, OnInit, OnDestroy, Renderer2, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LanguageService } from './core/services/language.service';
import { BootstrapService } from './core/services/bootstrap.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private languageService = inject(LanguageService);
  private bootstrapService = inject(BootstrapService);
  private renderer = inject(Renderer2);
  private destroy$ = new Subject<void>();
  private platformId = inject(PLATFORM_ID);

  isRtl = this.languageService.isRtl;

  ngOnInit() {
    // Initialize Bootstrap with proper RTL/LTR support
    this.bootstrapService.initialize();

    // Subscribe to language changes
    this.languageService.language$
      .pipe(takeUntil(this.destroy$))
      .subscribe(lang => {
        this.isRtl = this.languageService.isRtl;

        // Only manipulate document in browser environment
        if (isPlatformBrowser(this.platformId)) {
          // Set direction attribute on html element
          const dir = this.isRtl ? 'rtl' : 'ltr';
          this.renderer.setAttribute(document.documentElement, 'dir', dir);

          // Also update the lang attribute
          this.renderer.setAttribute(document.documentElement, 'lang', lang);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
