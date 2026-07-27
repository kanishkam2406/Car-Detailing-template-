import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PHONE = "+1 234 567 8900";
const PHONE_HREF = "tel:+12345678900";
const ADDRESS = "123 Main Street, City Name, State, Country 000000";
const MAPS_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3443.8!2d78.0322!3d30.3165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390929c356c67a57%3A0x7c3b18b1e34e8f2!2sPremium%20Detailing!5e0!3m2!1sen!2sin!4v1713512000000&style=element:geometry%7Ccolor:0x0a0a0a&style=element:labels.icon%7Cvisibility:off&style=element:labels.text.fill%7Ccolor:0x757575&style=element:labels.text.stroke%7Ccolor:0x212121&style=feature:administrative%7Celement:geometry%7Ccolor:0x757575&style=feature:poi%7Celement:geometry%7Ccolor:0x181818&style=feature:road%7Celement:geometry%7Ccolor:0x2c2c2c&style=feature:water%7Celement:geometry%7Ccolor:0x000000";
const MAPS_LINK = "https://maps.google.com/?q=Premium+Detailing";

export const MapSection = () => {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".map-content > *",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "expo.out",
          stagger: 0.12,
          scrollTrigger: { trigger: root.current, start: "top 80%" },
        }
      );
      gsap.fromTo(
        ".map-frame",
        { opacity: 0, scale: 0.97 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="location"
      ref={root}
      className="relative bg-background py-24 md:py-36"
      style={{ scrollMarginTop: "80px" }}
    >
      {/* Section header */}
      <div className="map-content container mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow text-primary">— Find Us</span>
            <h2 className="display-lg mt-3 text-foreground">
              Visit the <span className="text-gradient-gold">Atelier</span>
            </h2>
          </div>
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-primary/35 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground self-start md:self-auto"
          >
            Open in Maps ↗
          </a>
        </div>

        {/* Map + details grid */}
        <div className="grid grid-cols-1 gap-0 overflow-hidden rounded-2xl border border-white/8 lg:grid-cols-3">

          {/* Sidebar */}
          <div className="map-content flex flex-col justify-between gap-8 bg-white/[0.03] p-8 lg:p-10">
            <div className="space-y-8">
              <div>
                <p className="label-mono mb-2 text-primary">Atelier</p>
                <p className="text-sm leading-relaxed text-foreground/75">{ADDRESS}</p>
              </div>

              <div>
                <p className="label-mono mb-2 text-primary">Phone</p>
                <a
                  href={PHONE_HREF}
                  className="text-sm font-medium text-foreground transition-colors hover:text-primary"
                >
                  {PHONE}
                </a>
              </div>

              <div>
                <p className="label-mono mb-2 text-primary">Hours</p>
                <div className="space-y-1 text-sm text-foreground/75">
                  <div className="flex justify-between gap-8">
                    <span>Mon — Sat</span>
                    <span className="text-foreground/90">10:00 AM – 8:00 PM</span>
                  </div>
                  <div className="flex justify-between gap-8">
                    <span>Sunday</span>
                    <span className="text-primary">Closed</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="label-mono mb-2 text-primary">Email</p>
                <a
                  href="mailto:hello@yourbrand.com"
                  className="text-sm text-foreground/75 transition-colors hover:text-primary"
                >
                  hello@yourbrand.com
                </a>
              </div>
            </div>

            {/* Direction CTA */}
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-xs font-medium uppercase tracking-[0.2em] text-foreground/80 transition-all hover:border-primary/40 hover:text-primary"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 shrink-0" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              Get Directions
            </a>
          </div>

          {/* Map iframe */}
          <div className="map-frame relative h-72 lg:col-span-2 lg:h-auto lg:min-h-[420px]">
            <iframe
              src={MAPS_EMBED}
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.85) contrast(1.1)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Premium Auto Detailing Location"
              className="absolute inset-0 h-full w-full"
            />
            {/* Edge blends to match dark theme */}
            <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.6)]" />
          </div>
        </div>
      </div>
    </section>
  );
};
