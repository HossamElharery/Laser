import { Component, inject, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LanguageService } from '../../../core/services/language.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule, RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit, AfterViewInit {
  private languageService = inject(LanguageService);
  private renderer = inject(Renderer2);
  private el = inject(ElementRef);

  currentLanguage = this.languageService.currentLanguage;
  isMenuOpen = false;
  private navbarCollapseEl: HTMLElement | null = null;

  ngOnInit(): void {
    // Any initialization code
  }

  ngAfterViewInit(): void {
    this.navbarCollapseEl = this.el.nativeElement.querySelector('.navbar-collapse');

    // Set initial height to 0 for mobile
    if (window.innerWidth < 992) {
      this.updateNavbarHeight();
    }

    // Listen for window resize events to handle transition between mobile and desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 992) {
        // Reset styles for desktop
        if (this.navbarCollapseEl) {
          this.renderer.removeStyle(this.navbarCollapseEl, 'height');
        }
      } else {
        // Apply proper height for mobile
        this.updateNavbarHeight();
      }
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.updateNavbarHeight();
  }

  closeMenuOnMobile(): void {
    if (window.innerWidth < 992 && this.isMenuOpen) {
      this.isMenuOpen = false;
      this.updateNavbarHeight();
    }
  }

  private updateNavbarHeight(): void {
    if (!this.navbarCollapseEl) return;

    if (this.isMenuOpen) {
      // First set height to 0 without transition to reset
      this.renderer.setStyle(this.navbarCollapseEl, 'transition', 'none');
      this.renderer.setStyle(this.navbarCollapseEl, 'height', '0');

      // Force reflow to make sure the 0 height is applied
      this.navbarCollapseEl.offsetHeight;

      // Get the content height
      const scrollHeight = this.navbarCollapseEl.scrollHeight;

      // Re-enable transition and set the final height
      this.renderer.setStyle(this.navbarCollapseEl, 'transition', 'height 0.3s ease');
      this.renderer.setStyle(this.navbarCollapseEl, 'height', `${scrollHeight}px`);
    } else {
      // Ensure transition is enabled for collapsing
      this.renderer.setStyle(this.navbarCollapseEl, 'transition', 'height 0.3s ease');
      this.renderer.setStyle(this.navbarCollapseEl, 'height', '0');
    }
  }
}
