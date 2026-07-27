import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    n: "01",
    title: "Inspection",
    desc: "Paint thickness mapped, defects catalogued under spectrum lighting.",
  },
  {
    n: "02",
    title: "Decontamination",
    desc: "Iron, tar, organic fallout chemically and mechanically lifted.",
  },
  {
    n: "03",
    title: "Correction",
    desc: "Multi-stage cut and polish. Up to 95% defect removal.",
  },
  {
    n: "04",
    title: "Coating",
    desc: "Bonded ceramic layered, IR-cured, hand-leveled.",
  },
  {
    n: "05",
    title: "Delivery",
    desc: "Climate-stable cure, photographed, returned to you.",
  },
];

export const Process = () => {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Draw the vertical line
      gsap.fromTo(
        ".process-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".process-list",
            start: "top 70%",
            end: "bottom 70%",
            scrub: 1,
          },
        }
      );

      // Each step slides in
      gsap.utils.toArray<HTMLElement>(".process-step").forEach((el) => {
        // Step card
        gsap.fromTo(
          el,
          { opacity: 0, x: -32 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 82%" },
          }
        );
        // Dot pops in
        gsap.fromTo(
          el.querySelector(".process-dot"),
          { scale: 0 },
          {
            scale: 1,
            duration: 0.7,
            ease: "back.out(2.5)",
            scrollTrigger: { trigger: el, start: "top 82%" },
          }
        );
        // Big bg number fades
        gsap.fromTo(
          el.querySelector(".process-bg-num"),
          { opacity: 0, x: 20 },
          {
            opacity: 1,
            x: 0,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 82%" },
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={root}
      className="relative overflow-hidden bg-surface py-16 md:py-28 lg:py-40"
      style={{ scrollMarginTop: "80px" }}
    >
      <div className="container mx-auto px-5 md:px-6">
        <div className="mb-10 md:mb-16 text-center">
          <span className="eyebrow">— The Method</span>
          <h2 className="mt-3 font-black uppercase tracking-tight text-foreground leading-[0.95]"
            style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}>
            Five stages.
            <br />
            <span className="text-muted-foreground">Zero compromise.</span>
          </h2>
        </div>

        <div className="process-list relative mx-auto max-w-3xl pl-12 md:pl-20">
          {/* Vertical gradient line */}
          <span className="process-line absolute left-4 top-2 h-[calc(100%-1rem)] w-px origin-top bg-gradient-to-b from-primary via-primary/40 to-transparent md:left-8" />

          {STEPS.map((s) => (
            <div key={s.n} className="process-step relative pb-14 last:pb-0">
              {/* Glowing dot */}
              <span className="process-dot absolute -left-[calc(2rem+1px)] top-1.5 h-3 w-3 rounded-full bg-primary shadow-gold md:-left-[calc(2.5rem+1px)]" />

              {/* Content row: text + big background number */}
              <div className="relative">
                {/* Decorative background number — clipped within step */}
                <span className="process-bg-num pointer-events-none absolute right-0 -top-2 select-none font-black leading-none text-foreground/[0.035] overflow-hidden"
                  style={{ fontSize: "clamp(4rem, 12vw, 8rem)" }}>
                  {s.n}
                </span>

                <div className="relative z-10">
                  <div className="flex items-baseline gap-4">
                    <span className="text-[9px] font-semibold tracking-[0.3em] text-primary">
                      {s.n}
                    </span>
                    <h3 className="display-lg text-2xl text-foreground md:text-3xl">
                      {s.title}
                    </h3>
                  </div>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground md:text-base">
                    {s.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
