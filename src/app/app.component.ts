import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from './core/services/language.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule, CommonModule],
  template: `
    <div [dir]="isRtl ? 'rtl' : 'ltr'">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
    }
  `]
})
export class AppComponent implements OnInit, OnDestroy {
  private languageService = inject(LanguageService);
  private destroy$ = new Subject<void>();

  isRtl = false;

  ngOnInit(): void {
    // Use takeUntil to automatically unsubscribe when component is destroyed
    this.languageService.language$
      .pipe(takeUntil(this.destroy$))
      .subscribe(lang => {
        this.isRtl = lang === 'ar';
      });
  }

  ngOnDestroy(): void {
    // Clean up subscriptions to prevent memory leaks
    this.destroy$.next();
    this.destroy$.complete();
  }
}
