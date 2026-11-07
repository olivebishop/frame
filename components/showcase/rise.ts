import type { CSSProperties } from 'react';

/**
 * Entrance order, by importance rather than position on the page (after Linear's approach): the headline first, then
 * what it means, then the product itself, then supporting detail. The navbar sits at the top but matters least on
 * arrival, so it comes in late. Each step adds one stagger (80ms) to the 4px-blur / 8px-rise entrance in globals.css.
 */
export const RISE = {
  headline: 0,
  description: 1,
  player: 2,
  details: 3,
  chapters: 4,
  nav: 5,
  films: 6,
} as const;

export const rise = (step: number) => ({ '--i': step }) as CSSProperties;
