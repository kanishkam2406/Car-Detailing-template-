import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TRUST_ITEMS = [
  { value: "500+", label: "Cars Detailed" },
  { value: "4.9★", label: "Rating" },
  { value: "9 yr", label: "Warranty" },
  { value: "Certified", label: "Ceramic Pro" },
  { value: "#1 Studio", label: "City" },
];

export const TrustBar = () => {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".trust-item",
        { opacity: 0, y: 12 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.07, ease: "expo.out",
          scrollTrigger: { trigger: root.current, start: "top 94%" },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="relative border-y border-border/40 bg-surface/50 backdrop-blur-sm overflow-hidden">
      {/* Top gold accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent" />

      {/* Mobile: horizontal scroll strip */}
      <div className="md:hidden overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-0 min-w-max px-5 py-4">
          {TRUST_ITEMS.map((item, i) => (
            <div key={i} className="trust-item flex items-center flex-shrink-0">
              {i > 0 && <span className="mx-4 h-3 w-px bg-border/50" />}
              <div className="flex items-baseline gap-1.5">
                <span className="text-sm font-black uppercase tracking-tight text-foreground">
                  {item.value}
                </span>
                <span className="label-mono text-muted-foreground/70">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: full spread */}
      <div className="hidden md:block container mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          {TRUST_ITEMS.map((item, i) => (
            <div key={i} className="trust-item flex items-center gap-3">
              {i > 0 && <span className="h-0.5 w-0.5 rounded-full bg-primary/30" />}
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-black uppercase tracking-tight text-foreground">
                  {item.value}
                </span>
                <span className="label-mono text-muted-foreground">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent" />
    </div>
  );
};
