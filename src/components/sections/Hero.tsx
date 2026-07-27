import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Instagram } from "lucide-react";
import heroCar from "@/assets/hero-camry-new.png";
import bgWaves from "@/assets/bg-waves.webp";

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      // Pre-hide all animated elements immediately so nothing shows during loader
      if (!prefersReduced) {
        gsap.set(
          [".hero-eyebrow", ".hero-title-line", ".hero-sub", ".hero-cta", ".hero-car-img", ".hero-meta", ".hero-glow"],
          { opacity: 0 }
        );
      }

      const runEntrance = () => {
        if (prefersReduced) {
          gsap.set(
            [".hero-eyebrow", ".hero-title-line", ".hero-sub", ".hero-cta", ".hero-car-img", ".hero-meta"],
            { opacity: 1, y: 0, filter: "blur(0px)" }
          );
          return;
        }

        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

        // Eyebrow
        tl.fromTo(
          ".hero-eyebrow",
          { opacity: 0, y: 14, filter: "blur(6px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9 },
          0
        );

        // Title lines — letter-tracking collapse
        tl.fromTo(
          ".hero-title-line",
          { opacity: 0, y: 50, letterSpacing: "0.25em" },
          { opacity: 1, y: 0, letterSpacing: "-0.03em", duration: 1.5, stagger: 0.1 },
          0.2
        );

        // Subtitle
        tl.fromTo(
          ".hero-sub",
          { opacity: 0, y: 18, filter: "blur(4px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.0 },
          0.5
        );

        // CTA
        tl.fromTo(
          ".hero-cta",
          { opacity: 0, y: 16, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.9 },
          0.7
        );

        // Car — opacity + blur only (NO y transform = no bleed, no jump)
        tl.fromTo(
          ".hero-car-img",
          { opacity: 0, filter: "blur(10px)" },
          { opacity: 1, filter: "blur(0px)", duration: 2.0, ease: "power3.out" },
          0.5
        );

        // Bottom meta
        tl.fromTo(
          ".hero-meta",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.07 },
          1.0
        );

        // Glow
        tl.fromTo(
          ".hero-glow",
          { opacity: 0 },
          { opacity: 1, duration: 2.0, ease: "power2.out" },
          0.6
        );
      };

      // Listen for loader to finish before playing entrance
      window.addEventListener("template:loaderDone", runEntrance, { once: true });

      // ── Scroll: text fades out, car stays visible and scrolls off naturally ──
      gsap.to(".hero-content", {
        y: -60,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "35% top",
          scrub: 1,
        },
      });

      // ── Car parallax ──
      gsap.fromTo(".hero-car-img",
        { y: 0 },
        {
          y: -55,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: 2.5,
          },
        }
      );
    }, root);

    return () => {
      window.removeEventListener("template:loaderDone", () => {});
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={root}
      className="relative isolate h-[100svh] w-full overflow-hidden bg-background"
    >
      {/* ── Background texture — fills the whole hero ── */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgWaves}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-65"
        />
        {/* Light vignette only at edges, not a solid overlay */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 120% 100% at 50% 50%, transparent 40%, hsl(0 0% 3% / 0.6) 100%)" }} />
      </div>

      {/* ── Atmosphere ── */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 80%, hsl(0 0% 20% / 0.4), transparent)" }} />
      <div className="absolute inset-0 bg-gradient-fade-bottom pointer-events-none" />

      {/* Subtle neutral glow behind car */}
      <div
        className="hero-glow pointer-events-none absolute left-1/2 bottom-[8%] -translate-x-1/2 w-[70vw] h-[30vh] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, hsl(0 0% 18% / 0.25), transparent 65%)",
        }}
      />

      {/* Cinematic streaks */}
      <div className="pointer-events-none absolute left-0 top-[38%] h-px w-[45%] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-[60%] h-px w-[30%] bg-gradient-to-l from-transparent via-primary/12 to-transparent" />

      {/* ════ Layout: single column, text top — car bottom ════ */}
      <div className="relative z-10 h-full w-full">

        {/* ── Text zone: z-10 so text renders above car overlap area ── */}
        <div
          className="hero-content absolute inset-x-0 top-0 z-10 flex flex-col items-center justify-center text-center px-5 pt-[100px] md:pt-[15vh] h-[50svh] md:h-[55svh]"
        >
          <span className="hero-eyebrow eyebrow mb-4 opacity-50 text-[10px] md:text-xs">
            Premium Auto Detailing &middot; City, Country
          </span>

          <h1
            className="hero-title font-black uppercase text-foreground leading-[0.93]"
            style={{
              fontSize: "clamp(1.2rem, 6vw, 5.5rem)",
              letterSpacing: "-0.03em",
            }}
          >
            <span className="hero-title-line block">Where Every Detail</span>
            <span className="hero-title-line block text-gradient-gold">
              Truly Matters
            </span>
          </h1>

          <p
            className="hero-sub mt-4 max-w-[30ch] md:max-w-md text-xs md:text-sm leading-relaxed"
            style={{ color: "hsl(0 0% 88% / 0.75)" }}
          >
            Precision detailing and ceramic protection &mdash;&nbsp;restoring
            showroom perfection.
          </p>

          <div className="hero-cta mt-5 flex flex-col sm:flex-row items-center gap-3">
            <a
              href="#cta"
              className="group inline-flex items-center gap-3 rounded-full border border-primary/40 bg-primary/6 px-7 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary transition-all duration-400 hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-gold cursor-pointer min-h-[44px]"
            >
              <span>Make Appointment</span>
              <span className="transition-transform duration-400 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#services"
              className="text-[9px] uppercase tracking-[0.28em] transition-colors cursor-pointer min-h-[44px] flex items-center"
              style={{ color: "hsl(0 0% 75% / 0.65)" }}
            >
              View Services
            </a>
          </div>
        </div>

        {/* Car zone — bottom: adjust for mobile vs desktop */}
        <div
          className="absolute inset-x-0 pointer-events-none -bottom-[2svh] md:-bottom-[8svh] h-[45svh] md:h-[56svh] max-w-screen-2xl mx-auto"
        >
          <div className="relative h-full w-full overflow-hidden">
            <img
              src={heroCar}
              alt="Premium Auto Detailing"
              className="hero-car-img absolute inset-0 h-full w-full will-change-transform"
              style={{
                objectFit: "contain",
                objectPosition: "center bottom",
              }}
              fetchPriority="high"
            />

            {/* TOP: very soft fade so car doesn't have a hard ceiling */}
            <div
              className="absolute inset-x-0 top-0 pointer-events-none"
              style={{
                height: "30%",
                background:
                  "linear-gradient(to bottom, hsl(0 0% 4% / 0.6) 0%, transparent 100%)",
              }}
            />

            {/* LEFT: soft edge blend, texture shows through */}
            <div
              className="absolute inset-y-0 left-0 pointer-events-none"
              style={{
                width: "18%",
                background:
                  "linear-gradient(to right, hsl(0 0% 4% / 0.5) 0%, transparent 100%)",
              }}
            />

            {/* RIGHT: soft edge blend, texture shows through */}
            <div
              className="absolute inset-y-0 right-0 pointer-events-none"
              style={{
                width: "14%",
                background:
                  "linear-gradient(to left, hsl(0 0% 4% / 0.4) 0%, transparent 100%)",
              }}
            />

            {/* BOTTOM: ground fade */}
            <div
              className="absolute inset-x-0 bottom-0 pointer-events-none"
              style={{
                height: "18%",
                background: "linear-gradient(to top, hsl(0 0% 3% / 0.9), transparent)",
              }}
            />
          </div>
        </div>

      </div>

      {/* ── Bottom meta ── */}
      <div className="absolute inset-x-0 bottom-5 z-20 flex items-end justify-between px-5 md:px-10">
        <div className="hero-meta label-mono text-left">
          <div className="text-foreground/40">Scroll</div>
          <div className="mt-1 text-primary animate-bounce text-xs">↓</div>
        </div>
        <div className="hero-meta label-mono hidden text-right md:block">
          <div className="text-foreground/40">N°001 / Atelier</div>
          <div className="mt-1 text-primary">City, Country</div>
        </div>
      </div>

      {/* ── Fixed Instagram Widget ── */}
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 text-white hover:scale-110 hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300 shadow-lg backdrop-blur-sm group"
        aria-label="Follow us on Instagram"
      >
        <Instagram className="w-6 h-6" />
        <span className="absolute right-full mr-4 px-3 py-1.5 rounded-md bg-black/80 border border-white/10 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Follow on Instagram
        </span>
      </a>
    </section>
  );
};
