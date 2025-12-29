import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Fade in animation from different directions
 */
export const fadeIn = (element, direction = 'up', delay = 0) => {
  // For navbar/home, use opacity only to avoid breaking layout
  const useTransform = !element.closest('.navbar') && !element.closest('.home-section');
  
  if (!useTransform) {
    return gsap.fromTo(
      element,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, delay, ease: 'power2.out' }
    );
  }

  const directions = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { x: 50, y: 0 },
    right: { x: -50, y: 0 }
  };

  const { x, y } = directions[direction] || directions.up;

  return gsap.fromTo(
    element,
    {
      opacity: 0,
      x,
      y
    },
    {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 1,
      delay,
      ease: 'power3.out',
      clearProps: 'transform' // Clear transforms after animation
    }
  );
};

/**
 * Stagger animation for multiple elements
 */
export const staggerFadeIn = (elements, direction = 'up', delay = 0, stagger = 0.2) => {
  const directions = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { x: 50, y: 0 },
    right: { x: -50, y: 0 }
  };

  const { x, y } = directions[direction] || directions.up;

  return gsap.fromTo(
    elements,
    {
      opacity: 0,
      x,
      y
    },
    {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 0.8,
      delay,
      stagger,
      ease: 'power3.out'
    }
  );
};

/**
 * Scale in animation
 */
export const scaleIn = (element, delay = 0) => {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      scale: 0.8
    },
    {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      delay,
      ease: 'back.out(1.7)'
    }
  );
};

/**
 * Slide in from side
 */
export const slideIn = (element, from = 'left', delay = 0) => {
  const positions = {
    left: { x: '-100%', y: 0 },
    right: { x: '100%', y: 0 },
    top: { x: 0, y: '-100%' },
    bottom: { x: 0, y: '100%' }
  };

  const { x, y } = positions[from] || positions.left;

  return gsap.fromTo(
    element,
    {
      x,
      y
    },
    {
      x: 0,
      y: 0,
      duration: 1,
      delay,
      ease: 'power3.out'
    }
  );
};

/**
 * Text reveal animation
 */
export const textReveal = (element, delay = 0) => {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 30,
      clipPath: 'inset(0 0 100% 0)'
    },
    {
      opacity: 1,
      y: 0,
      clipPath: 'inset(0 0 0% 0)',
      duration: 1.2,
      delay,
      ease: 'power3.out'
    }
  );
};

/**
 * Hover scale animation
 */
export const hoverScale = (element) => {
  const handleMouseEnter = () => {
    gsap.to(element, {
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  element.addEventListener('mouseenter', handleMouseEnter);
  element.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    element.removeEventListener('mouseenter', handleMouseEnter);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
};

/**
 * Scroll-triggered animation
 */
export const scrollAnimation = (element, animation = 'fadeIn', options = {}) => {
  const defaultOptions = {
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse',
    ...options
  };

  const animations = {
    fadeIn: () => fadeIn(element, 'up', 0),
    scaleIn: () => scaleIn(element, 0),
    slideIn: () => slideIn(element, 'left', 0)
  };

  const anim = animations[animation] || animations.fadeIn;

  return ScrollTrigger.create({
    trigger: element,
    animation: anim(),
    ...defaultOptions
  });
};

/**
 * Parallax effect
 */
export const parallax = (element, speed = 0.5) => {
  return gsap.to(element, {
    y: speed * 100,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });
};

/**
 * Button click animation
 */
export const buttonClick = (element) => {
  return gsap.to(element, {
    scale: 0.95,
    duration: 0.1,
    yoyo: true,
    repeat: 1,
    ease: 'power2.inOut'
  });
};

/**
 * Loading animation
 */
export const loadingAnimation = (element) => {
  return gsap.to(element, {
    rotation: 360,
    duration: 1,
    repeat: -1,
    ease: 'none'
  });
};

/**
 * Page transition fade
 */
export const pageTransition = {
  fadeOut: (element, callback) => {
    gsap.to(element, {
      opacity: 0,
      duration: 0.3,
      onComplete: callback
    });
  },
  fadeIn: (element) => {
    gsap.fromTo(
      element,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out'
      }
    );
  }
};

export default {
  fadeIn,
  staggerFadeIn,
  scaleIn,
  slideIn,
  textReveal,
  hoverScale,
  scrollAnimation,
  parallax,
  buttonClick,
  loadingAnimation,
  pageTransition
};

