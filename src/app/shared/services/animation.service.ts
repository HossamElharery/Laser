import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private observers: Map<Element, IntersectionObserver> = new Map();
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  /**
   * Create an intersection observer for an element
   * @param element The element to observe
   * @param animationFn The function to call when the element is in view
   * @param options IntersectionObserver options
   */
  createObserver(
    element: Element,
    animationFn: (isIntersecting: boolean) => void,
    options: IntersectionObserverInit = {
      threshold: 0.1,  // Trigger when 10% of the element is visible
      rootMargin: '0px' // No margin
    }
  ): void {
    if (!this.isBrowser) {
      return; // Skip in SSR
    }

    // If IntersectionObserver is available (modern browsers)
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          animationFn(entry.isIntersecting);
        });
      }, options);

      observer.observe(element);
      this.observers.set(element, observer);
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      // Just trigger the animation
      animationFn(true);
    }
  }

  /**
   * Disconnect an observer for an element
   * @param element The element to stop observing
   */
  disconnectObserver(element: Element): void {
    if (!this.isBrowser) {
      return;
    }

    const observer = this.observers.get(element);
    if (observer) {
      observer.disconnect();
      this.observers.delete(element);
    }
  }

  /**
   * Apply animation classes to an element when it becomes visible
   * @param element The element to animate
   * @param animationClass The CSS class to add when visible
   * @param options IntersectionObserver options
   */
  animateWhenVisible(
    element: Element,
    animationClass: string,
    options?: IntersectionObserverInit
  ): void {
    this.createObserver(
      element,
      (isIntersecting) => {
        if (isIntersecting) {
          element.classList.add(animationClass);
          this.disconnectObserver(element);
        }
      },
      options
    );
  }
}
