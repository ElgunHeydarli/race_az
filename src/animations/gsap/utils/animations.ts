import { gsap } from 'gsap';

export const fadeInUp = (element: HTMLElement, delay = 0, duration = 0.5) => {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: 'power2.out',
    }
  );
};

export const scaleIn = (element: HTMLElement, delay = 0, duration = 0.5) => {
  return gsap.fromTo(
    element,
    { opacity: 0, scale: 0.9 },
    {
      opacity: 1,
      scale: 1,
      duration,
      delay,
      ease: 'back.out(1.7)',
    }
  );
};

export const staggerElements = (
  elements: HTMLElement[],
  staggerTime = 0.1,
  duration = 0.5
) => {
  return gsap.fromTo(
    elements,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger: staggerTime,
      ease: 'power2.out',
    }
  );
};

export const addToCartAnimation = (element: HTMLElement) => {
  return gsap
    .timeline({ defaults: { overwrite: true } })
    .to(element, { scale: 1.1, duration: 0.15 })
    .to(element, { scale: 1, duration: 0.15 });
};
