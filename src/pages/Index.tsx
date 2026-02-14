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
import { generateFAQSchema } from "@/components/FAQSection";

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

// Homepage FAQ Data
const homepageFAQs = [
  {
    question: "What services does EllowDigital offer?",
    answer:
      "EllowDigital offers comprehensive digital services including web development, mobile app development, SEO optimization, digital marketing, UI/UX design, and e-commerce solutions. We specialize in creating custom digital solutions tailored to your business needs.",
  },
  {
    question: "How long does it take to build a website?",
    answer:
      "Typical website projects take 2-6 weeks depending on complexity. Simple business websites can be completed in 2-3 weeks, while complex e-commerce or custom web applications may take 4-6 weeks or more. We provide a detailed timeline after understanding your requirements.",
  },
  {
    question: "Do you provide SEO services for existing websites?",
    answer:
      "Yes, we offer comprehensive SEO services for existing websites including technical SEO audits, on-page optimization, content strategy, link building, and ongoing SEO maintenance. We use enterprise-grade SEO tools and strategies to improve your search rankings.",
  },
  {
    question: "What is your pricing structure?",
    answer:
      "Our pricing varies based on project scope and requirements. We offer flexible packages starting from ₹4,999 for student projects to ₹15,999+ for business websites. Enterprise solutions are custom-quoted. Contact us for a detailed quote tailored to your needs.",
  },
  {
    question: "Do you offer website maintenance and support?",
    answer:
      "Yes, we provide ongoing website maintenance, updates, security monitoring, and technical support. We offer monthly maintenance packages that include regular backups, security updates, content updates, and performance optimization to keep your website running smoothly.",
  },
  {
    question: "Which technologies do you use for web development?",
    answer:
      "We use modern, industry-standard technologies including React, Next.js, TypeScript, Node.js, and various CMS platforms. Our tech stack is chosen based on your project requirements to ensure optimal performance, scalability, and maintainability.",
  },
  {
    question: "Can you help with digital marketing and branding?",
    answer:
      "Absolutely! We provide end-to-end digital marketing services including social media marketing, content marketing, email campaigns, PPC advertising, and brand identity development. Our strategies are data-driven and focused on delivering measurable ROI.",
  },
  {
    question: "Do you work with clients outside India?",
    answer:
      "While we're based in India and primarily serve Indian businesses, we're equipped to work with international clients. We have experience collaborating remotely and can accommodate different time zones to ensure smooth project execution.",
  },
];

// Homepage JSON-LD structured data (Enhanced with Service Schema)
const homePageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://ellowdigital.space/",
      url: "https://ellowdigital.space/",
      name: "EllowDigital - Digital Transformation Services in India",
      description:
        "EllowDigital offers expert digital services including web development, SEO, and digital marketing solutions for businesses in India.",
      isPartOf: {
        "@type": "WebSite",
        "@id": "https://ellowdigital.space/#website",
        url: "https://ellowdigital.space/",
        name: "EllowDigital",
        description: "Professional digital services for businesses in India",
      },
    },
    {
      "@type": "Service",
      "@id": "https://ellowdigital.space/#webdevelopment",
      serviceType: "Web Development",
      provider: {
        "@id": "https://ellowdigital.space/#organization",
      },
      areaServed: {
        "@type": "Country",
        name: "India",
      },
      offers: {
        "@type": "Offer",
        price: "15999",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
      },
      description:
        "Professional web development services including custom websites, e-commerce solutions, and web applications.",
    },
    {
      "@type": "Service",
      "@id": "https://ellowdigital.space/#seo",
      serviceType: "SEO Services",
      provider: {
        "@id": "https://ellowdigital.space/#organization",
      },
      areaServed: {
        "@type": "Country",
        name: "India",
      },
      description:
        "Comprehensive SEO services to improve search rankings and organic traffic.",
    },
    {
      "@type": "Service",
      "@id": "https://ellowdigital.space/#digitalmarketing",
      serviceType: "Digital Marketing",
      provider: {
        "@id": "https://ellowdigital.space/#organization",
      },
      areaServed: {
        "@type": "Country",
        name: "India",
      },
      description:
        "Complete digital marketing solutions including social media, content marketing, and PPC campaigns.",
    },
    generateFAQSchema(homepageFAQs),
  ],
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
        title="EllowDigital | Top Web Development & SEO Services in India 🚀"
        description="Transform your business with EllowDigital's expert web development, SEO, and digital marketing services. ⭐ 100+ Successful Projects ⭐ Affordable Pricing ⭐ Fast Delivery. Get a FREE Quote Today!"
        keywords="web development India, digital marketing agency, SEO services India, UI/UX design, business website development, e-commerce solutions, mobile app development, digital transformation, affordable web design, EllowDigital"
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
            <Suspense fallback={<SectionLoader cards={8} columns={2} />}>
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
