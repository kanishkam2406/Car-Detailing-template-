import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ceramicImg from "@/assets/ceramic-detail.webp";
import gallery2 from "@/assets/gallery-2.webp";
import gallery1 from "@/assets/gallery-1.webp";
import gallery5 from "@/assets/gallery-5.webp";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    n: "01",
    title: "Ceramic Coating",
    desc: "Nine-year hydrophobic shield. Liquid glass over corrected paint.",
    image: ceramicImg,
    tag: "Protection",
  },
  {
    n: "02",
    title: "Paint Correction",
    desc: "Multi-stage cut & polish. Swirls erased, depth restored.",
    image: gallery5,
    tag: "Restoration",
  },
  {
    n: "03",
    title: "Interior Atelier",
    desc: "Hand-cleaned leather, wool, alcantara. Olfactory neutral.",
    image: gallery1,
    tag: "Detailing",
  },
  {
    n: "04",
    title: "Wheels & Calipers",
    desc: "Faces, barrels, calipers — coated for permanent gloss.",
    image: gallery2,
    tag: "Finishing",
  },
];

export const Services = () => {
  const root = useRef<HTMLElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const imgRef = useRef<HTMLDivElement>(null);

  // Crossfade the image when active item changes
  useEffect(() => {
    if (!imgRef.current) return;
    gsap.fromTo(
      imgRef.current,
      { opacity: 0, scale: 1.03 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }
    );
  }, [activeIdx]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".services-eyebrow",
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: root.current, start: "top 82%" },
        }
      );

      gsap.utils.toArray<HTMLElement>(".service-row").forEach((row) => {
        gsap.fromTo(row,
          { opacity: 0, y: 28 },
          {
            opacity: 1, y: 0, duration: 0.85, ease: "expo.out",
            scrollTrigger: { trigger: row, start: "top 90%" },
          }
        );
        gsap.fromTo(
          row.querySelector(".service-line"),
          { scaleX: 0 },
          {
            scaleX: 1, duration: 1.1, ease: "expo.out",
            scrollTrigger: { trigger: row, start: "top 90%" },
          }
        );
      });

      gsap.fromTo(
        ".services-img-panel",
        { opacity: 0, x: 32 },
        {
          opacity: 1, x: 0, duration: 1.2, ease: "expo.out",
          scrollTrigger: { trigger: root.current, start: "top 72%" },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={root}
      className="relative overflow-hidden bg-background py-20 md:py-32 lg:py-40"
      style={{ scrollMarginTop: "80px" }}
    >
      <div className="container mx-auto px-5 md:px-6">

        {/* ── Section Header ── */}
        <div className="services-eyebrow mb-10 md:mb-16 flex items-end justify-between">
          <div>
            <span className="eyebrow">— Disciplines</span>
            <h2 className="mt-3 font-black uppercase tracking-tight text-foreground leading-[0.95]"
              style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}>
              Four crafts.
              <br />
              <span className="text-muted-foreground">One obsession.</span>
            </h2>
          </div>
          <span className="label-mono hidden md:block">04 / Services</span>
        </div>

        {/* ── Layout: list left + sticky image right ── */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px] lg:gap-16 xl:grid-cols-[1fr_440px]">

          {/* ── LEFT: Service list ── */}
          <div>
            {SERVICES.map((s, idx) => (
              <article
                key={s.n}
                className={`service-row group relative cursor-pointer transition-all duration-300 ease-out
                  ${activeIdx === idx ? "pl-3 md:pl-5" : "pl-0"}
                `}
                onMouseEnter={() => setActiveIdx(idx)}
                onClick={() => setActiveIdx(idx)}
              >
                {/* Top divider */}
                <span className="service-line absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-primary/50 via-primary/15 to-transparent" />

                {/* Left active bar */}
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 w-0.5 rounded-full bg-primary transition-all duration-500 ease-out ${
                    activeIdx === idx ? "h-9 opacity-100" : "h-0 opacity-0"
                  }`}
                />

                {/* ── Desktop row layout ── */}
                <div className="hidden md:grid grid-cols-12 items-start gap-4 py-8 lg:py-10">
                  {/* Number */}
                  <div className="col-span-1">
                    <span className={`block text-[10px] font-bold tracking-[0.25em] transition-colors duration-300 ${
                      activeIdx === idx ? "text-primary" : "text-primary/35"
                    }`}>
                      {s.n}
                    </span>
                  </div>

                  {/* Title + desc */}
                  <div className="col-span-7">
                    <h3 className={`font-black uppercase tracking-tight text-3xl lg:text-4xl transition-colors duration-300 leading-none ${
                      activeIdx === idx ? "text-foreground" : "text-foreground/45 group-hover:text-foreground/75"
                    }`}>
                      {s.title}
                    </h3>
                    {/* description reveal: grid-rows trick for smooth animation */}
                    <div className={`grid transition-all duration-500 ease-out ${
                      activeIdx === idx ? "grid-rows-[1fr] mt-3 opacity-100" : "grid-rows-[0fr] mt-0 opacity-0"
                    }`}>
                      <div className="overflow-hidden">
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {s.desc}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tag */}
                  <div className="col-span-2">
                    <span className={`inline-block rounded-full border px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                      activeIdx === idx
                        ? "border-primary/40 text-primary bg-primary/5"
                        : "border-border/50 text-muted-foreground/40"
                    }`}>
                      {s.tag}
                    </span>
                  </div>

                  {/* Inquire */}
                  <div className="col-span-2 text-right">
                    <a href="#cta" className={`inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.22em] transition-all duration-300 cursor-pointer ${
                      activeIdx === idx ? "text-primary opacity-100" : "opacity-0 pointer-events-none"
                    }`}>
                      Inquire <span aria-hidden>→</span>
                    </a>
                  </div>
                </div>

                {/* ── Mobile layout ── */}
                <div className="md:hidden py-5 min-h-[56px]">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span className={`text-[10px] font-bold tracking-[0.2em] flex-shrink-0 transition-colors ${
                        activeIdx === idx ? "text-primary" : "text-primary/35"
                      }`}>
                        {s.n}
                      </span>
                      <h3 className={`font-black uppercase tracking-tight text-xl leading-none transition-colors duration-300 ${
                        activeIdx === idx ? "text-foreground" : "text-foreground/45"
                      }`}>
                        {s.title}
                      </h3>
                    </div>
                    {/* Chevron */}
                    <span className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full border transition-all duration-300 ${
                      activeIdx === idx
                        ? "border-primary text-primary rotate-180"
                        : "border-border/40 text-muted-foreground/50"
                    }`}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 4L5 7L8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>

                  {/* Mobile accordion body: desc + inline image */}
                  <div className={`grid transition-all duration-500 ease-out ${
                    activeIdx === idx ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 mt-0"
                  }`}>
                    <div className="overflow-hidden">
                      <p className="text-sm leading-relaxed text-muted-foreground mb-4">
                        {s.desc}
                      </p>

                      {/* Mobile inline image */}
                      <div className="relative h-48 rounded-lg overflow-hidden border border-white/8">
                        <img
                          src={s.image}
                          alt={s.title}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                        {/* Blending gradients */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />
                        <div className="absolute bottom-3 left-4 flex items-center gap-2">
                          <span className="label-mono text-primary/80">{s.n}</span>
                          <span className="text-xs font-bold uppercase tracking-tight text-foreground">{s.title}</span>
                        </div>
                        <a
                          href="#cta"
                          className="absolute bottom-3 right-4 rounded-full border border-primary/40 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-primary bg-black/40 backdrop-blur-sm cursor-pointer min-h-[36px] flex items-center"
                        >
                          Inquire →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

              </article>
            ))}
            <span className="block h-px w-full bg-border/50" />
          </div>

          {/* ── RIGHT: sticky image panel (desktop only) ── */}
          <div className="services-img-panel hidden lg:flex items-start">
            {/*
              sticky top positioned to vertically center the image in the viewport.
              Using 50vh - half image height ≈ 50vh - 210px
            */}
            <div className="sticky w-full" style={{ top: "calc(50vh - 230px)" }}>

              {/* Image container with edge-blending gradients */}
              <div
                ref={imgRef}
                className="relative overflow-hidden rounded-xl"
                style={{ height: "460px" }}
              >
                <img
                  src={SERVICES[activeIdx].image}
                  alt={SERVICES[activeIdx].title}
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                />

                {/* Edge gradients — blend into dark background on all sides */}
                {/* Left blend — strongest, merges into section bg */}
                <div className="absolute inset-y-0 left-0 w-20 pointer-events-none"
                  style={{ background: "linear-gradient(to right, hsl(0 0% 4%), transparent)" }} />
                {/* Top blend */}
                <div className="absolute inset-x-0 top-0 h-16 pointer-events-none"
                  style={{ background: "linear-gradient(to bottom, hsl(0 0% 4% / 0.6), transparent)" }} />
                {/* Right subtle blend */}
                <div className="absolute inset-y-0 right-0 w-8 pointer-events-none"
                  style={{ background: "linear-gradient(to left, hsl(0 0% 4% / 0.4), transparent)" }} />
                {/* Bottom overlay with label */}
                <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
                  style={{ background: "linear-gradient(to top, hsl(0 0% 4%), hsl(0 0% 4% / 0.8) 40%, transparent)" }} />

                {/* Label over bottom gradient */}
                <div className="absolute bottom-0 inset-x-0 p-5 z-10">
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="label-mono text-primary/60 block mb-1">
                        {SERVICES[activeIdx].n} — {SERVICES[activeIdx].tag}
                      </span>
                      <h4 className="text-lg font-black uppercase tracking-tight text-foreground leading-none">
                        {SERVICES[activeIdx].title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1.5 max-w-[22ch]">
                        {SERVICES[activeIdx].desc}
                      </p>
                    </div>
                    <a href="#cta"
                      className="rounded-full border border-primary/35 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-primary bg-black/50 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer flex-shrink-0 ml-4"
                    >
                      Book
                    </a>
                  </div>
                </div>
              </div>

              {/* Pagination dots */}
              <div className="mt-4 flex gap-1.5 justify-center">
                {SERVICES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIdx(idx)}
                    className={`h-0.5 rounded-full transition-all duration-500 cursor-pointer ${
                      idx === activeIdx ? "w-8 bg-primary" : "w-4 bg-border hover:bg-border/70"
                    }`}
                    aria-label={`View ${SERVICES[idx].title}`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
