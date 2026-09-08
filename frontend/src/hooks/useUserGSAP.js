import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom GSAP hook for smooth animations, scroll reveal triggers, and transparent UI transitions on User pages
 */
export function useUserGSAP(containerRef, dependencyKey = null) {
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Fade up stagger reveal for user cards, sections, and items
      const elementsToAnimate = containerRef.current.querySelectorAll(
        "[data-gsap='fade-up'], .gsap-animate-user, .user-card"
      );

      if (elementsToAnimate.length > 0) {
        gsap.fromTo(
          elementsToAnimate,
          {
            opacity: 0,
            y: 28,
            scale: 0.97,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.07,
            ease: "power3.out",
            clearProps: "transform,opacity",
          }
        );
      }

      // 2. Animate Hero and Header titles if present
      const heroTitles = containerRef.current.querySelectorAll(".gsap-hero-title");
      if (heroTitles.length > 0) {
        gsap.fromTo(
          heroTitles,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
        );
      }

      // 3. Progress bars animation
      const progressBars = containerRef.current.querySelectorAll(".gsap-progress-bar");
      if (progressBars.length > 0) {
        gsap.fromTo(
          progressBars,
          { width: "0%" },
          { duration: 1, ease: "power2.out", stagger: 0.1 }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef, dependencyKey]);
}

/**
 * Smooth scroll utility using GSAP
 */
export function scrollToUserContainerTop(targetContainer) {
  if (!targetContainer) return;

  gsap.to(targetContainer, {
    scrollTop: 0,
    duration: 0.7,
    ease: "power3.inOut",
  });
}
