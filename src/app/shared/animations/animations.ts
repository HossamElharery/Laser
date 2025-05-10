import { animate, style, transition, trigger, state, query, stagger, AnimationTriggerMetadata } from '@angular/animations';

// Fade in animations that work with SSR
export const fadeInAnimation = trigger('fadeInAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('600ms ease-in', style({ opacity: 1 })),
  ]),
]);

// Slide in from left animation
export const slideInLeftAnimation = trigger('slideInLeftAnimation', [
  transition(':enter', [
    style({ transform: 'translateX(-100%)', opacity: 0 }),
    animate('800ms ease-out', style({ transform: 'translateX(0)', opacity: 1 })),
  ]),
]);

// Slide in from right animation
export const slideInRightAnimation = trigger('slideInRightAnimation', [
  transition(':enter', [
    style({ transform: 'translateX(100%)', opacity: 0 }),
    animate('800ms ease-out', style({ transform: 'translateX(0)', opacity: 1 })),
  ]),
]);

// Slide in from bottom animation
export const slideInBottomAnimation = trigger('slideInBottomAnimation', [
  transition(':enter', [
    style({ transform: 'translateY(50px)', opacity: 0 }),
    animate('800ms ease-out', style({ transform: 'translateY(0)', opacity: 1 })),
  ]),
]);

// Animation that uses the explicit animationState property
export const animateOnLoad = trigger('animateOnLoad', [
  state('hidden', style({
    opacity: 0,
    transform: '{{transform}}'
  }), { params: { transform: 'translateY(20px)' } }),

  state('visible', style({
    opacity: 1,
    transform: 'none'
  })),

  transition('hidden => visible', [
    animate('{{duration}} {{easing}}')
  ], { params: { duration: '500ms', easing: 'ease-out' } })
]);

// Animation for multiple children with staggered effect
export const staggerAnimation = trigger('staggerAnimation', [
  transition('* => *', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(50px)' }),
      stagger('100ms', [
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ], { optional: true })
  ])
]);
