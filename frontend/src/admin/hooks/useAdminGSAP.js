import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom GSAP hook for smooth scrolling & transparent UI animations in the Admin block
 */
export function useAdminGSAP(containerRef, dependencyKey = null) {
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Smooth entrance stagger animation for admin cards and elements
      const elementsToAnimate = containerRef.current.querySelectorAll(
        "[data-gsap='fade-up'], .gsap-animate-card, table tbody tr"
      );

      if (elementsToAnimate.length > 0) {
        gsap.fromTo(
          elementsToAnimate,
          {
            opacity: 0,
            y: 24,
            scale: 0.97,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.06,
            ease: "power3.out",
            clearProps: "transform,opacity",
          }
        );
      }

      // 2. Chart bars animation if present
      const chartBars = containerRef.current.querySelectorAll(".gsap-chart-bar");
      if (chartBars.length > 0) {
        gsap.fromTo(
          chartBars,
          { scaleY: 0, transformOrigin: "bottom center" },
          {
            scaleY: 1,
            duration: 0.8,
            stagger: 0.05,
            ease: "back.out(1.4)",
          }
        );
      }

      // 3. Header title glow animation
      const titleEl = containerRef.current.querySelector(".gsap-title");
      if (titleEl) {
        gsap.fromTo(
          titleEl,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef, dependencyKey]);
}

/**
 * Smooth scrolling utility function powered by GSAP
 */
export function scrollToTopGSAP(targetContainer) {
  if (!targetContainer) return;

  gsap.to(targetContainer, {
    scrollTop: 0,
    duration: 0.7,
    ease: "power3.inOut",
  });
}
