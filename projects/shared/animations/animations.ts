import { animate, animateChild, AnimationTriggerMetadata, query, stagger, style, transition, trigger } from '@angular/animations';

export function createListAnimation(triggerName: string, queryName: string, staggerAmount?: number): AnimationTriggerMetadata {
  return trigger(triggerName, [
    transition('* => *', [
      query(queryName, [
        stagger(staggerAmount || 30, [
          animateChild()
        ])
      ], { optional: true })
    ])
  ]);
}

export function createSlideFadeUpAnimation(triggerName: string): AnimationTriggerMetadata {
  return trigger(triggerName, [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(100%) rotate(5deg)' }),
      animate('500ms ease-in-out', style({ opacity: 1, transform: 'translateY(0) rotate(0deg)' }))
    ]),

    transition(':leave', [
      style({ opacity: 1, transform: 'translateY(0) rotate(0deg)' }),
      animate('400ms ease-in-out', style({ opacity: 0, transform: 'translateY(100%) rotate(-5deg)' }))
    ])
  ]);
}
