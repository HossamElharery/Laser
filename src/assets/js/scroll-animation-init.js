/**
 * SSR-Safe Animation Initializer
 * This script safely initializes scroll animations with fallbacks for server-side rendering
 */
(function() {
  // Only run in browser environment
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  // Add a class to indicate JS is available (for CSS fallbacks)
  document.documentElement.classList.remove('no-js');
  document.documentElement.classList.add('js');

  // Wait for DOM to be ready
  function onReady(callback) {
    if (document.readyState !== 'loading') {
      callback();
    } else {
      document.addEventListener('DOMContentLoaded', callback);
    }
  }

  onReady(function() {
    // Provide fallback for browsers without IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      // Show all invisible elements without animation
      var elements = document.querySelectorAll('.invisible');
      Array.prototype.forEach.call(elements, function(el) {
        el.classList.remove('invisible');
      });
      return;
    }

    // Function to handle scroll-based animation with IntersectionObserver
    function initScrollAnimations() {
      var elements = document.querySelectorAll('.scroll-animate:not(.scroll-animated)');

      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            var el = entry.target;

            // Apply animation with delay
            var delay = parseInt(el.getAttribute('data-delay') || '0');

            setTimeout(function() {
              el.classList.add('scroll-animated');
            }, delay);

            // Stop observing once animation is triggered
            observer.unobserve(el);
          }
        });
      }, {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
      });

      elements.forEach(function(el) {
        observer.observe(el);
      });
    }

    // Initialize animations for elements with Angular directive
    var initDirectiveAnimations = function() {
      // If elements are already visible on page load, trigger their animations
      var animElements = document.querySelectorAll('[animateOnScroll]');
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            var delay = el.getAttribute('ng-reflect-delay') || 0;
            var animation = el.getAttribute('ng-reflect-animation-name') || 'fadeIn';

            // Remove invisible class and add animation class after delay
            setTimeout(function() {
              el.classList.remove('invisible');
              el.classList.add(animation);
            }, parseInt(delay));

            observer.unobserve(el);
          }
        });
      }, {
        root: null,
        threshold: 0.1
      });

      animElements.forEach(function(el) {
        observer.observe(el);
      });
    };

    // Initialize both animation systems
    initScrollAnimations();
    initDirectiveAnimations();

    // Re-initialize on route changes (useful for single-page applications)
    if (typeof window.angular !== 'undefined' || typeof window.ng !== 'undefined') {
      // Monitor DOM for changes that might indicate route navigation
      var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            // Debounce the animation initialization
            if (window.animationInitTimeout) {
              clearTimeout(window.animationInitTimeout);
            }
            window.animationInitTimeout = setTimeout(function() {
              initScrollAnimations();
              initDirectiveAnimations();
            }, 100);
          }
        });
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
  });
})();
