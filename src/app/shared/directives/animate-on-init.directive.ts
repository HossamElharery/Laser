import { Directive, ElementRef, Input, OnInit, Renderer2, PLATFORM_ID, Inject, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appAnimateOnInit]',
  standalone: true
})
export class AnimateOnInitDirective implements AfterViewInit {
  @Input() animationType: 'fadeIn' | 'slideInLeft' | 'slideInRight' | 'slideInBottom' = 'fadeIn';
  @Input() animationDelay = 0; // Delay in milliseconds
  @Input() animationDuration = 800; // Duration in milliseconds

  private isBrowser: boolean;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) {
      return; // Skip animation in SSR
    }

    // Apply initial styles
    this.applyInitialStyles();

    // Small timeout to ensure styles are applied before animation starts
    setTimeout(() => {
      this.animateElement();
    }, 10);
  }

  private applyInitialStyles(): void {
    // Initial hidden state
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
    this.renderer.setStyle(this.el.nativeElement, 'will-change', 'transform, opacity');

    // Set transform based on animation type
    switch (this.animationType) {
      case 'slideInLeft':
        this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateX(-50px)');
        break;
      case 'slideInRight':
        this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateX(50px)');
        break;
      case 'slideInBottom':
        this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(30px)');
        break;
      case 'fadeIn':
      default:
        // No transform for simple fade in
        break;
    }
  }

  private animateElement(): void {
    // Apply transition properties
    this.renderer.setStyle(
      this.el.nativeElement,
      'transition',
      `opacity ${this.animationDuration}ms ease-out, transform ${this.animationDuration}ms ease-out`
    );

    // Set transition delay if specified
    if (this.animationDelay > 0) {
      this.renderer.setStyle(this.el.nativeElement, 'transition-delay', `${this.animationDelay}ms`);
    }

    // Apply final state (visible)
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'none');
  }
}
