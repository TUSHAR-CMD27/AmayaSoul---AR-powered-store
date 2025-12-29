import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook for GSAP animations
 * @param {Function} animationFunction - Function that receives element and returns GSAP animation
 * @param {Object} dependencies - React dependencies array
 */
export const useGSAP = (animationFunction, dependencies = []) => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const ctx = gsap.context(() => {
      if (animationFunction) {
        animationFunction(elementRef.current);
      }
    }, elementRef);

    return () => {
      ctx.revert();
    };
  }, dependencies);

  return elementRef;
};

/**
 * Hook for scroll-triggered animations
 */
export const useScrollAnimation = (animationFunction, dependencies = []) => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const ctx = gsap.context(() => {
      if (animationFunction) {
        const scrollTrigger = animationFunction(elementRef.current);
        return scrollTrigger;
      }
    }, elementRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, dependencies);

  return elementRef;
};

/**
 * Hook for stagger animations on multiple elements
 */
export const useStaggerAnimation = (selector, animationFunction, dependencies = []) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll(selector);
    if (elements.length === 0) return;

    const ctx = gsap.context(() => {
      if (animationFunction) {
        animationFunction(elements);
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, dependencies);

  return containerRef;
};

export default useGSAP;

