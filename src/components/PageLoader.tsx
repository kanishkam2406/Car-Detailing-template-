import { useEffect, useState } from "react";
import { gsap } from "gsap";

export const PageLoader = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        // Signal Hero (and anything else) that loader is gone
        window.dispatchEvent(new CustomEvent("template:loaderDone"));
        document.body.style.overflow = "";
        setVisible(false);
      },
    });

    // Fade out after logo + bar have had time to read
    tl.to(".loader-wrap", {
      opacity: 0,
      duration: 0.55,
      ease: "power2.inOut",
      delay: 2.0,
    });

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="loader-wrap fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8 bg-background"
      aria-hidden="true"
    >
      {/* Logo */}
      <div className="text-2xl font-bold tracking-[0.2em] text-white opacity-90 select-none uppercase">
        Premium Brand
      </div>

      {/* iPhone-style pill progress bar */}
      <div
        className="relative h-1 w-32 overflow-hidden rounded-full"
        style={{ background: "hsl(0 0% 100% / 0.1)" }}
      >
        <div
          className="loader-bar absolute inset-y-0 left-0 rounded-full"
          style={{ background: "hsl(0 0% 100% / 0.75)" }}
        />
      </div>

      <style>{`
        .loader-bar {
          animation: iosBar 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        @keyframes iosBar {
          0%   { width: 0%; }
          30%  { width: 45%; }
          70%  { width: 78%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};
