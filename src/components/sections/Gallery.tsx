import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import g1 from "@/assets/gallery-1.webp";
import g2 from "@/assets/gallery-2.webp";
import g3 from "@/assets/gallery-3.webp";
import g4 from "@/assets/gallery-4.webp";
import g5 from "@/assets/gallery-5.webp";
import ceramic from "@/assets/ceramic-detail.webp";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  { src: g4, label: "Coupe / Studio", n: "01" },
  { src: ceramic, label: "Ceramic Beading", n: "02" },
  { src: g2, label: "Forged Wheel", n: "03" },
  { src: g1, label: "Interior Atelier", n: "04" },
  { src: g3, label: "LED Signature", n: "05" },
  { src: g5, label: "Hand Polish", n: "06" },
];

export const Gallery = () => {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trackEl = track.current!;
      const distance = () => trackEl.scrollWidth - window.innerWidth;

      gsap.to(trackEl, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => "+=" + distance(),
          invalidateOnRefresh: true,
        },
      });

      gsap.fromTo(
        ".gallery-heading > *",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.05,
          scrollTrigger: { trigger: root.current, start: "top 80%" },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="gallery"
      ref={root}
      className="relative overflow-hidden bg-background"
      style={{ scrollMarginTop: "80px" }}
    >
      <div className="absolute inset-x-0 top-0 z-10 px-6 pt-24 pointer-events-none">
        <div className="container mx-auto flex items-end justify-between">
          <div className="gallery-heading">
            <div className="overflow-hidden">
              <span className="block eyebrow">— Atelier · Selected works</span>
            </div>
            <div className="overflow-hidden mt-4">
              <h2 className="display-lg block text-foreground">
                The <span className="text-gradient-gold">Archive</span>
              </h2>
            </div>
          </div>
          <span className="label-mono hidden md:block">Scroll →</span>
        </div>
      </div>

      <div className="h-screen flex items-center">
        <div
          ref={track}
          className="flex gap-8 pl-[10vw] pr-[10vw] will-change-transform"
        >
          {ITEMS.map((it) => (
            <figure
              key={it.n}
              className="group relative h-[70vh] w-[55vw] flex-shrink-0 overflow-hidden rounded-sm md:w-[40vw] lg:w-[34vw]"
            >
              <img
                src={it.src}
                alt={it.label}
                className="h-full w-full object-cover transition-transform duration-[1500ms] ease-out-expo group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-100" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                <div>
                  <div className="label-mono text-primary">{it.n}</div>
                  <div className="display-lg mt-1 text-xl text-foreground md:text-2xl">
                    {it.label}
                  </div>
                </div>
                <span className="label-mono opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  View →
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
