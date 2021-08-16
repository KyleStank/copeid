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

export function createSlideFadeUpAnimation(triggerName: string, options?: { enter?: boolean; leave?: boolean }): AnimationTriggerMetadata {
  options = {
    enter: options?.enter ?? true,
    leave: options?.leave ?? true
  };

  const animation = trigger(triggerName, []);
  if (options.enter) {
    animation.definitions.push(
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(100%) rotate(5deg)' }),
        animate('500ms ease-in-out', style({ opacity: 1, transform: 'translateY(0) rotate(0deg)' }))
      ])
    );
  }

  if (options.leave) {
    animation.definitions.push(
      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(0) rotate(0deg)' }),
        animate('400ms ease-in-out', style({ opacity: 0, transform: 'translateY(100%) rotate(-5deg)' }))
      ])
    );
  }

  return animation;
}

export function createFade(triggerName: string): AnimationTriggerMetadata {
  return trigger(triggerName, [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('300ms ease-in-out', style({ opacity: 1 }))
    ]),

    transition(':leave', [
      style({ opacity: 1 }),
      animate('300ms ease-in-out', style({ opacity: 0 }))
    ])
  ]);
}

export function createSlideFadeLeft(triggerName: string): AnimationTriggerMetadata {
  return trigger(triggerName, [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateX(-100%)' }),
      animate('250ms ease-in-out', style({ opacity: 1, transform: 'translateX(0)' }))
    ]),

    transition(':leave', [
      style({ opacity: 1, transform: 'translateX(0)' }),
      animate('250ms ease-in-out', style({ opacity: 0, transform: 'translateX(-100%)' }))
    ])
  ]);
}
