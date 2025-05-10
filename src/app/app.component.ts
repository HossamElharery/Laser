import { Component, inject, OnInit, OnDestroy, Renderer2, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LanguageService } from './core/services/language.service';
import { BootstrapService } from './core/services/bootstrap.service';
import { AnimationInitializerService } from './shared/services/animation-initializer.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  private languageService = inject(LanguageService);
  private bootstrapService = inject(BootstrapService);
  private animationInitializer = inject(AnimationInitializerService);
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

  ngAfterViewInit() {
    // Initialize animations once the view is ready
    if (isPlatformBrowser(this.platformId)) {
      // Short timeout to make sure all components are fully rendered
      setTimeout(() => {
        this.animationInitializer.initializeAnimations();
      }, 0);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
