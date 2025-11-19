import { Suspense, lazy, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import Footer from "@/components/Footer";
import Portfolio from "@/components/Portfolio";
import SmartContactForm from "@/components/SmartContactForm";
import SEOHead from "@/components/SEOHead";
import {
  initScrollRevealAnimations,
  init3DTiltEffect,
} from "@/utils/animationUtils";
import Preloader from "@/components/Preloader";
import LazySection from "@/components/LazySection";

const FounderSection = lazy(() => import("@/components/FounderSection"));
const EngagementModel = lazy(() => import("@/components/EngagementModel"));
const WorkProcess = lazy(() => import("@/components/WorkProcess"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const ImpactMetrics = lazy(() => import("@/components/ImpactMetrics"));
const TechStack = lazy(() => import("@/components/TechStack"));
const FeaturedOffers = lazy(() => import("@/components/FeaturedOffers"));

// Homepage JSON-LD structured data
const homePageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://ellowdigitals.me/",
  url: "https://ellowdigitals.me/",
  name: "EllowDigital - Digital Transformation Services in India",
  description:
    "EllowDigital offers expert digital services including web development, SEO, and digital marketing solutions for businesses in India.",
  isPartOf: {
    "@type": "WebSite",
    url: "https://ellowdigitals.me/",
    name: "EllowDigital",
    description: "Professional digital services for businesses in India",
  },
  offers: {
    "@type": "AggregateOffer",
    highPrice: "15999",
    lowPrice: "4999",
    priceCurrency: "INR",
    offerCount: "2",
    offers: [
      {
        "@type": "Offer",
        name: "Business Website",
        price: "15999",
        priceCurrency: "INR",
      },
      {
        "@type": "Offer",
        name: "School CS Projects",
        price: "4999",
        priceCurrency: "INR",
      },
    ],
  },
};

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let fallbackTimer: ReturnType<typeof setTimeout> | undefined;

    const markReady = () => {
      setIsLoading(false);
    };

    if (document.readyState === "complete") {
      markReady();
    } else {
      window.addEventListener("load", markReady, { once: true });
      fallbackTimer = window.setTimeout(markReady, 2000);
    }

    const cleanupFns: Array<() => void> = [];
    const scheduledCancels: Array<() => void> = [];
    const scheduleInit = (initializer: () => () => void) => {
      const frame = window.requestAnimationFrame(() => {
        cleanupFns.push(initializer());
      });
      scheduledCancels.push(() => window.cancelAnimationFrame(frame));
    };

    scheduleInit(initScrollRevealAnimations);
    scheduleInit(init3DTiltEffect);

    // Clean up event listeners on unmount
    return () => {
      if (fallbackTimer) {
        clearTimeout(fallbackTimer);
      }
      window.removeEventListener("load", markReady);
      scheduledCancels.forEach((cancel) => cancel());
      cleanupFns.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <>
      <SEOHead
        title="EllowDigital | Digital Transformation Services in India"
        description="EllowDigital offers web development, SEO, and digital marketing services to accelerate your business growth in the digital landscape across India."
        canonicalUrl="https://ellowdigitals.me/"
        structuredData={homePageSchema}
      />

      {/* Enhanced Preloader with smooth transition */}
      {isLoading && <Preloader />}

      <div
        className={`min-h-screen flex flex-col transition-all duration-500 bg-background text-foreground ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <Navbar />
        <main className="flex-grow overflow-x-hidden" id="main-content">
          <HeroSection />
          <AboutSection />
          <LazySection fallback={<SectionSkeleton />}>
            <Suspense fallback={<SectionSkeleton />}>
              <FounderSection />
            </Suspense>
          </LazySection>
          <ServicesSection />
          <LazySection fallback={<SectionSkeleton minHeight={480} />}>
            <Suspense fallback={<SectionSkeleton minHeight={480} />}>
              <WorkProcess />
            </Suspense>
          </LazySection>
          <LazySection fallback={<SectionSkeleton minHeight={520} />}>
            <Suspense fallback={<SectionSkeleton minHeight={520} />}>
              <EngagementModel />
            </Suspense>
          </LazySection>
          <Portfolio />
          <LazySection fallback={<SectionSkeleton minHeight={420} />}>
            <Suspense fallback={<SectionSkeleton minHeight={420} />}>
              <ImpactMetrics />
            </Suspense>
          </LazySection>
          <LazySection fallback={<SectionSkeleton minHeight={460} />}>
            <Suspense fallback={<SectionSkeleton minHeight={460} />}>
              <Testimonials />
            </Suspense>
          </LazySection>
          <LazySection fallback={<SectionSkeleton />}>
            <Suspense fallback={<SectionSkeleton />}>
              <TechStack />
            </Suspense>
          </LazySection>
          <WhyChooseUs />
          <LazySection fallback={<SectionSkeleton />}>
            <Suspense fallback={<SectionSkeleton />}>
              <FeaturedOffers />
            </Suspense>
          </LazySection>
          <SmartContactForm />
        </main>
        <Footer />
      </div>
    </>
  );
};

const SectionSkeleton = ({ minHeight = 360 }: { minHeight?: number }) => (
  <div className="section-container" aria-hidden="true">
    <div
      className="w-full rounded-3xl bg-muted/30 animate-pulse"
      style={{ minHeight }}
    ></div>
  </div>
);

export default Index;
