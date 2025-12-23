import { useEffect, useState, Suspense, lazy } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import FloatingContactButton from "@/components/FloatingContactButton";
import { PageSkeleton, SectionSkeleton } from "@/components/skeletons";
import {
  initScrollRevealAnimations,
  init3DTiltEffect,
} from "@/utils/animationUtils";

// Lazy load below-the-fold sections for better performance
const AboutSection = lazy(() => import("@/components/AboutSection"));
const FounderSection = lazy(() => import("@/components/FounderSection"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const WorkProcess = lazy(() => import("@/components/WorkProcess"));
const EngagementModel = lazy(() => import("@/components/EngagementModel"));
const Portfolio = lazy(() => import("@/components/Portfolio"));
const ImpactMetrics = lazy(() => import("@/components/ImpactMetrics"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const TechStack = lazy(() => import("@/components/TechStack"));
const WhyChooseUs = lazy(() => import("@/components/WhyChooseUs"));
const FeaturedOffers = lazy(() => import("@/components/FeaturedOffers"));
const SmartContactForm = lazy(() => import("@/components/SmartContactForm"));

// Section loading fallback
const SectionLoader = ({ cards = 3, columns = 3 }: { cards?: number; columns?: 2 | 3 | 4 }) => (
  <SectionSkeleton cards={cards} columns={columns} />
);

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
    let fallbackTimer: number | undefined;

    const markReady = () => {
      setIsLoading(false);
    };

    if (document.readyState === "complete") {
      markReady();
    } else {
      window.addEventListener("load", markReady, { once: true });
      fallbackTimer = window.setTimeout(markReady, 2000) as unknown as number;
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

    return () => {
      if (fallbackTimer) {
        clearTimeout(fallbackTimer);
      }
      window.removeEventListener("load", markReady);
      scheduledCancels.forEach((cancel) => cancel());
      cleanupFns.forEach((cleanup) => cleanup());
    };
  }, []);

  // Show page skeleton during initial load
  if (isLoading) {
    return (
      <>
        <SEOHead
          title="EllowDigital | Digital Transformation Services in India"
          description="EllowDigital offers web development, SEO, and digital marketing services to accelerate your business growth in the digital landscape across India."
          canonicalUrl="https://ellowdigitals.me/"
          structuredData={homePageSchema}
        />
        <PageSkeleton />
      </>
    );
  }

  return (
    <>
      <SEOHead
        title="EllowDigital | Digital Transformation Services in India"
        description="EllowDigital offers web development, SEO, and digital marketing services to accelerate your business growth in the digital landscape across India."
        canonicalUrl="https://ellowdigitals.me/"
        structuredData={homePageSchema}
      />

      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-grow overflow-x-hidden" id="main-content">
          {/* Hero loads immediately */}
          <HeroSection />

          {/* Lazy-loaded sections with skeleton fallbacks */}
          <Suspense fallback={<SectionLoader cards={4} columns={4} />}>
            <AboutSection />
          </Suspense>

          <Suspense fallback={<SectionLoader cards={1} columns={2} />}>
            <FounderSection />
          </Suspense>

          <Suspense fallback={<SectionLoader cards={6} columns={3} />}>
            <ServicesSection />
          </Suspense>

          <Suspense fallback={<SectionLoader cards={4} columns={4} />}>
            <WorkProcess />
          </Suspense>

          <Suspense fallback={<SectionLoader cards={3} columns={3} />}>
            <EngagementModel />
          </Suspense>

          <Suspense fallback={<SectionLoader cards={5} columns={3} />}>
            <Portfolio />
          </Suspense>

          <Suspense fallback={<SectionLoader cards={4} columns={4} />}>
            <ImpactMetrics />
          </Suspense>

          <Suspense fallback={<SectionLoader cards={3} columns={3} />}>
            <Testimonials />
          </Suspense>

          <Suspense fallback={<SectionLoader cards={9} columns={3} />}>
            <TechStack />
          </Suspense>

          <Suspense fallback={<SectionLoader cards={6} columns={3} />}>
            <WhyChooseUs />
          </Suspense>

          <Suspense fallback={<SectionLoader cards={2} columns={2} />}>
            <FeaturedOffers />
          </Suspense>

          <Suspense fallback={<SectionLoader cards={2} columns={2} />}>
            <SmartContactForm />
          </Suspense>
        </main>
        <Footer />
        <FloatingContactButton />
      </div>
    </>
  );
};

export default Index;
