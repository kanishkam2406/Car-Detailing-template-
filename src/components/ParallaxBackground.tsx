import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bgWaves from "@/assets/bg-waves.webp";

gsap.registerPlugin(ScrollTrigger);

/**
 * Fixed cinematic background with multi-layer 3D parallax.
 * The base image stays static (background-attachment: fixed feel),
 * while overlay layers drift on scroll for depth.
 */
export const ParallaxBackground = () => {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Mid-depth layer drifts slowly
      gsap.to(".pbg-mid", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 1.2 },
      });
      // Foreground glow drifts more
      gsap.to(".pbg-fore", {
        yPercent: 25,
        xPercent: -8,
        ease: "none",
        scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.8 },
      });
      // Subtle scale breathing
      gsap.to(".pbg-base", {
        scale: 1.08,
        ease: "none",
        scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 2 },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={root}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      {/* Static base image */}
      <div
        className="pbg-base absolute inset-0 will-change-transform"
        style={{
          backgroundImage: `url(${bgWaves})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Mid parallax tint */}
      <div className="pbg-mid absolute inset-[-10%] bg-gradient-radial-gold opacity-60 will-change-transform" />
      {/* Foreground depth glow */}
      <div className="pbg-fore absolute -inset-[20%] opacity-40 will-change-transform"
        style={{
          background:
            "radial-gradient(ellipse at 30% 40%, hsl(var(--primary) / 0.10), transparent 55%)",
        }}
      />
      {/* Vignette + readability */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,hsl(var(--background)/0.85)_100%)]" />
      <div className="absolute inset-0 bg-background/40" />
    </div>
  );
};
