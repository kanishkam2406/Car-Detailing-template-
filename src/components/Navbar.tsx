import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Gallery", href: "#gallery" },
  { label: "Location", href: "#location" },
  { label: "Contact", href: "#cta" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const ticking = useRef(false);

  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        ticking.current = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu when user taps outside the navbar
  useEffect(() => {
    if (!open) return;
    const handleOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    // Slight delay so the open-toggle click doesn't immediately close
    const id = setTimeout(() => document.addEventListener("click", handleOutside), 50);
    return () => {
      clearTimeout(id);
      document.removeEventListener("click", handleOutside);
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed z-50 transition-all duration-500 ease-out-expo",
        scrolled
          ? "inset-x-3 top-3 rounded-xl bg-black/75 backdrop-blur-2xl border border-white/8 shadow-[0_4px_24px_rgba(0,0,0,0.5)] py-2"
          : "inset-x-0 top-0 bg-transparent py-4"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Logo — centered on mobile, left-aligned on desktop */}
        <Link to="/" className="group flex items-center shrink-0 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
          <span className="text-lg md:text-xl font-bold tracking-widest text-white uppercase transition-opacity duration-300 group-hover:opacity-75">
            Brand
          </span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="group relative text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
              >
                {item.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary transition-all duration-400 ease-out-expo group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="#cta"
          className="hidden items-center gap-2 rounded-full border border-primary/35 bg-primary/6 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary transition-all duration-400 hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-gold md:inline-flex cursor-pointer"
        >
          Book Now
          <span className="h-1 w-1 rounded-full bg-current" />
        </a>

        {/* Hamburger */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-foreground p-1 rounded-md transition-colors hover:bg-white/5 cursor-pointer"
          aria-label="Toggle Menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-400 ease-out-expo",
          open ? "max-h-80" : "max-h-0"
        )}
      >
        <div
          className={cn(
            "mx-3 mb-3 rounded-b-xl border-t border-white/8",
            !scrolled && "bg-black/80 backdrop-blur-2xl rounded-xl mt-1 border border-white/8"
          )}
        >
          <ul className="flex flex-col px-4 py-5 gap-0.5">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-2.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="px-4 pb-4">
            <a
              href="#cta"
              onClick={() => setOpen(false)}
              className="block text-center rounded-full border border-primary/35 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer"
            >
              Book Now
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
