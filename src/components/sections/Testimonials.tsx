import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const QUOTES = [
  {
    q: "They returned my Carrera GT looking better than the day it left Stuttgart. Obsessive is an understatement.",
    a: "M. Reinhardt",
    role: "Collector · CA",
    rating: 5,
  },
  {
    q: "The only studio I trust with the F40. Their light tunnel inspection process is genuinely concours-grade.",
    a: "J. Tanaka",
    role: "Concours Judge",
    rating: 5,
  },
  {
    q: "Eight months in. Still beading like the day it cured. Worth every hour and every dollar.",
    a: "S. Albright",
    role: "Owner · Aston Martin DBX",
    rating: 5,
  },
];

const Stars = ({ count }: { count: number }) => (
  <div className="flex items-center gap-0.5 justify-center">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`h-3.5 w-3.5 ${i < count ? "text-primary" : "text-border"}`}
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

export const Testimonials = () => {
  const root = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % QUOTES.length), 5500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".test-block > *",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  // Crossfade on index change
  const quoteRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!quoteRef.current) return;
    gsap.fromTo(
      quoteRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "expo.out" }
    );
  }, [i]);

  return (
    <section ref={root} className="relative bg-background py-16 md:py-28">
      <div className="container mx-auto max-w-4xl px-5 md:px-6 text-center">
        <div className="test-block">
          <span className="eyebrow">— Owners</span>

          <div ref={quoteRef} className="mt-10">
            {/* Stars */}
            <Stars count={QUOTES[i].rating} />

            {/* Quote */}
            <p className="font-display mt-6 text-xl font-medium leading-snug text-foreground md:text-3xl max-w-2xl mx-auto">
              <span className="text-primary mr-1 opacity-60 font-serif text-2xl">"</span>
              {QUOTES[i].q}
              <span className="text-primary ml-1 opacity-60 font-serif text-2xl">"</span>
            </p>

            {/* Attribution */}
            <div className="mt-8 space-y-1">
              <div className="label-mono text-foreground/80 tracking-[0.25em]">
                {QUOTES[i].a}
              </div>
              <div className="label-mono text-muted-foreground">
                {QUOTES[i].role}
              </div>
            </div>
          </div>
        </div>

        {/* Progress indicators */}
        <div className="mt-10 flex justify-center gap-2 items-center">
          {QUOTES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Quote ${idx + 1}`}
              className={`h-0.5 rounded-full transition-all duration-500 cursor-pointer ${
                idx === i ? "w-10 bg-primary" : "w-5 bg-border hover:bg-border/80"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
