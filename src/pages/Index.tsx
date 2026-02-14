import { useEffect, useState, Suspense, lazy } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import FloatingContactButton from "@/components/FloatingContactButton";
import Preloader from "@/components/Preloader";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollReveal from "@/components/ScrollReveal";
import { SectionSkeleton } from "@/components/skeletons";
import useSmoothScroll from "@/hooks/useSmoothScroll";
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
const FAQSection = lazy(() => import("@/components/FAQSection"));
const SmartContactForm = lazy(() => import("@/components/SmartContactForm"));

// Section loading fallback
const SectionLoader = ({
  cards = 3,
  columns = 3,
}: {
  cards?: number;
  columns?: 2 | 3 | 4;
}) => <SectionSkeleton cards={cards} columns={columns} />;

// Homepage JSON-LD structured data
const homePageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://ellowdigital.space/",
  url: "https://ellowdigital.space/",
  name: "EllowDigital - Digital Transformation Services in India",
  description:
    "EllowDigital offers expert digital services including web development, SEO, and digital marketing solutions for businesses in India.",
  isPartOf: {
    "@type": "WebSite",
    url: "https://ellowdigital.space/",
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

  // Enable smooth scroll for all anchor links
  useSmoothScroll();

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

  return (
    <>
      <SEOHead
        title="EllowDigital | Digital Transformation Services in India"
        description="EllowDigital offers web development, SEO, and digital marketing services to accelerate your business growth in the digital landscape across India."
        canonicalUrl="https://ellowdigital.space/"
        structuredData={homePageSchema}
      />

      {/* Enhanced Preloader */}
      {isLoading && <Preloader />}

      <ScrollProgress />

      <div
        className={`min-h-screen flex flex-col bg-background text-foreground transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <Navbar />
        <main className="flex-grow" id="main-content">
          {/* Hero loads immediately */}
          <HeroSection />

          {/* Lazy-loaded sections with scroll reveal animations */}
          <ScrollReveal animation="fadeUp">
            <Suspense fallback={<SectionLoader cards={4} columns={4} />}>
              <AboutSection />
            </Suspense>
          </ScrollReveal>

          <ScrollReveal animation="fadeLeft" delay={0.1}>
            <Suspense fallback={<SectionLoader cards={1} columns={2} />}>
              <FounderSection />
            </Suspense>
          </ScrollReveal>

          <ScrollReveal animation="fadeUp" delay={0.1}>
            <Suspense fallback={<SectionLoader cards={6} columns={3} />}>
              <ServicesSection />
            </Suspense>
          </ScrollReveal>

          <ScrollReveal animation="fadeRight" delay={0.1}>
            <Suspense fallback={<SectionLoader cards={4} columns={4} />}>
              <WorkProcess />
            </Suspense>
          </ScrollReveal>

          <ScrollReveal animation="scale" delay={0.1}>
            <Suspense fallback={<SectionLoader cards={3} columns={3} />}>
              <EngagementModel />
            </Suspense>
          </ScrollReveal>

          <ScrollReveal animation="fadeUp" delay={0.1}>
            <Suspense fallback={<SectionLoader cards={5} columns={3} />}>
              <Portfolio />
            </Suspense>
          </ScrollReveal>

          <ScrollReveal animation="blur" delay={0.1}>
            <Suspense fallback={<SectionLoader cards={4} columns={4} />}>
              <ImpactMetrics />
            </Suspense>
          </ScrollReveal>

          <ScrollReveal animation="fadeLeft" delay={0.1}>
            <Suspense fallback={<SectionLoader cards={3} columns={3} />}>
              <Testimonials />
            </Suspense>
          </ScrollReveal>

          <ScrollReveal animation="fadeUp" delay={0.1}>
            <Suspense fallback={<SectionLoader cards={9} columns={3} />}>
              <TechStack />
            </Suspense>
          </ScrollReveal>

          <ScrollReveal animation="fadeRight" delay={0.1}>
            <Suspense fallback={<SectionLoader cards={6} columns={3} />}>
              <WhyChooseUs />
            </Suspense>
          </ScrollReveal>

          <ScrollReveal animation="scale" delay={0.1}>
            <Suspense fallback={<SectionLoader cards={2} columns={2} />}>
              <FeaturedOffers />
            </Suspense>
          </ScrollReveal>

          <ScrollReveal animation="fadeUp" delay={0.1}>
            <Suspense fallback={<SectionLoader cards={8} columns={1} />}>
              <FAQSection />
            </Suspense>
          </ScrollReveal>

          <ScrollReveal animation="fadeUp" delay={0.1}>
            <Suspense fallback={<SectionLoader cards={2} columns={2} />}>
              <SmartContactForm />
            </Suspense>
          </ScrollReveal>
        </main>
        <Footer />
        <FloatingContactButton />
      </div>
    </>
  );
};

export default Index;
