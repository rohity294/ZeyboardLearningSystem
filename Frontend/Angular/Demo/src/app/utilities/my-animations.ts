import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';

export const fadeInAnimation = trigger('fadeInAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('5s', style({ opacity: 1 })),
  ]),
]);

export const slideInOutAnimation =
    trigger('slideInOutAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('2s ease-out', style({ transform: 'translateX(0)' })),
      ]),
      transition(":leave", [
        animate('1s ease-out', style({ transform: 'translateX(-100%)' })),
      ])
    ])



