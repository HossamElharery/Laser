import { Directive, ElementRef, Input, OnInit, OnDestroy, Renderer2, NgZone, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[animateOnScroll]',
  standalone: true
})
export class AnimateOnScrollDirective implements OnInit, OnDestroy {
  @Input() animationName: string = 'fadeIn';
  @Input() delay: number = 0;
  @Input() offset: number = 150; // How far from the bottom of the viewport to trigger

  private observer: any = null;
  private animated = false;
  private isBrowser: boolean;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    // Set initial hidden state
    this.renderer.addClass(this.el.nativeElement, 'invisible');

    // Only run this code in the browser environment
    if (this.isBrowser) {
      // We run outside NgZone to avoid performance issues with scroll events
      this.ngZone.runOutsideAngular(() => {
        this.setupScrollAnimation();
      });
    } else {
      // For server-side rendering, just make the element visible
      // This way the content is visible for SEO, and animations will be applied on client
      this.renderer.removeClass(this.el.nativeElement, 'invisible');
    }
  }

  ngOnDestroy() {
    if (this.isBrowser && this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  private setupScrollAnimation(): void {
    // Safety check for browser environment and IntersectionObserver availability
    if (!this.isBrowser || typeof IntersectionObserver === 'undefined') {
      // Fallback: make element visible without animation
      this.renderer.removeClass(this.el.nativeElement, 'invisible');
      return;
    }

    try {
      // Create intersection observer
      this.observer = new IntersectionObserver(
        ([entry]) => {
          // If the element is visible and hasn't been animated yet
          if (entry.isIntersecting && !this.animated) {
            this.ngZone.run(() => {
              setTimeout(() => {
                // Remove the invisible class
                this.renderer.removeClass(this.el.nativeElement, 'invisible');

                // Add the animation class
                this.renderer.addClass(this.el.nativeElement, this.animationName);

                this.animated = true;

                // Once element is animated, no need to observe it anymore
                if (this.observer) {
                  this.observer.unobserve(this.el.nativeElement);
                }
              }, this.delay);
            });
          }
        },
        {
          root: null, // Use the viewport as the root
          rootMargin: `0px 0px -${this.offset}px 0px`, // Trigger when element is offset pixels from bottom of viewport
          threshold: 0.1 // Trigger when at least 10% of the element is visible
        }
      );

      this.observer.observe(this.el.nativeElement);
    } catch (error) {
      // Fallback if IntersectionObserver fails
      console.error('Error setting up IntersectionObserver:', error);
      this.renderer.removeClass(this.el.nativeElement, 'invisible');
    }
  }
}
