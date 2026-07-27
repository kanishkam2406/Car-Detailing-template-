import { Navbar } from "@/components/Navbar";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ParallaxBackground } from "@/components/ParallaxBackground";
import { PageLoader } from "@/components/PageLoader";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Services } from "@/components/sections/Services";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Process } from "@/components/sections/Process";
import { Stats } from "@/components/sections/Stats";
import { Gallery } from "@/components/sections/Gallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";
import { MapSection } from "@/components/sections/MapSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <>
      <PageLoader />
      <SmoothScroll />
      <ParallaxBackground />
      <Navbar />
      <main className="relative">
        <Hero />
        <TrustBar />
        <Services />
        <BeforeAfter />
        <Process />
        <Stats />
        <Gallery />
        <Testimonials />
        <CTA />
        <MapSection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
