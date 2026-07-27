import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 1240, suffix: "+", label: "Vehicles Detailed" },
  { value: 9, suffix: " yr", label: "Coating Warranty" },
  { value: 98, suffix: "%", label: "Client Retention" },
  { value: 14, suffix: "", label: "Years In Atelier" },
];

export const Stats = () => {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".stat").forEach((el, i) => {
        const target = Number(el.dataset.value);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 2.4,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 80%" },
          onUpdate: () => {
            const num = el.querySelector(".stat-num");
            if (num) num.textContent = Math.round(obj.v).toLocaleString();
          },
        });
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: i * 0.08,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative bg-background py-14 md:py-24">
      <div className="container mx-auto px-5 md:px-6">
        <div className="grid grid-cols-2 gap-y-10 border-y border-border py-12 md:py-16 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="stat text-center" data-value={s.value}>
              <div className="display-lg flex items-baseline justify-center text-5xl text-gradient-gold md:text-7xl">
                <span className="stat-num">0</span>
                <span>{s.suffix}</span>
              </div>
              <div className="label-mono mt-3 text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
