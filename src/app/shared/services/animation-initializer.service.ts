import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AnimationInitializerService {
  private isBrowser: boolean;
  private initialized = false;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  /**
   * Initialize animations for the entire page.
   * Call this once from the main app component.
   */
  initializeAnimations(): void {
    if (!this.isBrowser || this.initialized) {
      return;
    }

    // Initialize animation handlers
    this.setupInitialAnimations();
    this.setupMutationObserver();

    this.initialized = true;
  }

  /**
   * Handle animations for elements that are present on initial page load
   */
  private setupInitialAnimations(): void {
    // Get all elements with the animate-init class
    const animElements = document.querySelectorAll('.animate-init');

    animElements.forEach((el, index) => {
      // Get element position relative to viewport
      const rect = el.getBoundingClientRect();
      const isInViewport = rect.top <= window.innerHeight && rect.bottom >= 0;

      // Delay based on position in DOM to create stagger effect
      const delay = 100 + (index * 100);

      // Only animate elements visible in the viewport
      if (isInViewport) {
        setTimeout(() => {
          el.classList.add('animate-visible');
        }, delay);
      } else {
        // Setup intersection observer for elements not in viewport
        this.observeElement(el);
      }
    });
  }

  /**
   * Use intersection observer to track when elements enter the viewport
   */
  private observeElement(element: Element): void {
    if (!('IntersectionObserver' in window)) {
      // Fallback for browsers without IntersectionObserver
      element.classList.add('animate-visible');
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add a small delay to make the animation smoother
          setTimeout(() => {
            entry.target.classList.add('animate-visible');
          }, 50);

          // Stop observing once animation is triggered
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1, // Trigger when 10% of the element is visible
      rootMargin: '0px'
    });

    observer.observe(element);
  }

  /**
   * Set up a mutation observer to watch for new elements added to the DOM
   * This helps with animations for content loaded dynamically
   */
  private setupMutationObserver(): void {
    if (!('MutationObserver' in window)) {
      return;
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach(node => {
            // If it's an element node
            if (node.nodeType === 1) {
              const element = node as Element;

              // Check if it's an animation element
              if (element.classList && element.classList.contains('animate-init')) {
                this.observeElement(element);
              }

              // Check for child animation elements
              const childAnimElements = element.querySelectorAll('.animate-init');
              childAnimElements.forEach(el => {
                this.observeElement(el);
              });
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
}
