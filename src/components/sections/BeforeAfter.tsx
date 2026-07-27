import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import beforeImg from "@/assets/before.webp";
import afterImg from "@/assets/after.webp";

gsap.registerPlugin(ScrollTrigger);

export const BeforeAfter = () => {
  const root = useRef<HTMLElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  // Scroll-in: blur → clear + fade up
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ba-image",
        { filter: "blur(24px)", opacity: 0.3, scale: 1.06 },
        {
          filter: "blur(0px)",
          opacity: 1,
          scale: 1,
          duration: 1.6,
          ease: "expo.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        }
      );
      gsap.fromTo(
        ".ba-text > *",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  const onMove = useCallback((clientX: number) => {
    if (!wrap.current) return;
    const r = wrap.current.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  useEffect(() => {
    const up = () => (dragging.current = false);
    const move = (e: MouseEvent) => dragging.current && onMove(e.clientX);
    const tmove = (e: TouchEvent) =>
      dragging.current && onMove(e.touches[0].clientX);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchend", up);
    window.addEventListener("mousemove", move);
    window.addEventListener("touchmove", tmove, { passive: true });
    return () => {
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchend", up);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("touchmove", tmove);
    };
  }, [onMove]);

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-background py-14 md:py-28 lg:py-44"
    >
      <div className="container mx-auto grid grid-cols-12 items-center gap-6 md:gap-8 px-5 md:px-6">
        <div className="ba-text col-span-12 md:col-span-4">
          <span className="eyebrow">— The Difference</span>
          <h2 className="mt-3 font-black uppercase tracking-tight text-foreground leading-[0.95]"
            style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}>
            Drag.
            <br />
            <span className="text-gradient-gold">Witness.</span>
          </h2>
          <p className="mt-6 max-w-sm text-base text-muted-foreground">
            Same panel. Same light. Eight hours of correction and a layer of
            ceramic between dull and divine.
          </p>
          <div className="mt-8 flex gap-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            <span className="text-foreground/60">← Before</span>
            <span className="text-primary">After →</span>
          </div>
        </div>

        <div
          ref={wrap}
          className="ba-image relative col-span-12 aspect-[4/3] cursor-ew-resize overflow-hidden rounded-sm shadow-gold-soft md:col-span-8"
          onMouseDown={(e) => {
            dragging.current = true;
            onMove(e.clientX);
          }}
          onTouchStart={(e) => {
            dragging.current = true;
            onMove(e.touches[0].clientX);
          }}
        >
          {/* After (base layer) */}
          <img
            src={afterImg}
            alt="After ceramic coating — mirror gloss"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          {/* Before (clipped) */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          >
            <img
              src={beforeImg}
              alt="Before — oxidized swirled paint"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Slider handle */}
          <div
            className="absolute inset-y-0 z-10 w-px bg-primary"
            style={{ left: `${pos}%` }}
          >
            <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/60 bg-background/80 backdrop-blur-md shadow-gold">
              <span className="text-primary text-lg leading-none">⇆</span>
            </div>
          </div>

          {/* Corner labels */}
          <span className="absolute left-4 top-4 label-mono z-10 bg-background/60 px-2 py-1 backdrop-blur-md">
            Before
          </span>
          <span className="absolute right-4 top-4 label-mono z-10 bg-background/60 px-2 py-1 text-primary backdrop-blur-md">
            After
          </span>
        </div>
      </div>
    </section>
  );
};
