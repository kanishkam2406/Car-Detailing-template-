import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Mounts Lenis smooth scroll once and ties it into GSAP's ticker so
 * ScrollTrigger animations stay perfectly in sync.
 * Also intercepts all in-page anchor clicks so they smooth-scroll
 * through Lenis instead of jumping natively.
 */
export const SmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const tickerCb = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    // ── Intercept anchor clicks so they go through Lenis ──
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest("a[href^='#']");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -72, duration: 1.4 });
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
    };
  }, []);

  return null;
};
