import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import FloatingContactButton from "@/components/FloatingContactButton";
import Preloader from "@/components/Preloader";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollReveal from "@/components/ScrollReveal";
import useSmoothScroll from "@/hooks/useSmoothScroll";
import {
  initScrollRevealAnimations,
  init3DTiltEffect,
} from "@/utils/animationUtils";
import { generateFAQSchema } from "@/utils/faqSchema";

// Import all sections directly - no lazy loading to eliminate scroll delay
import AboutSection from "@/components/AboutSection";
import FounderSection from "@/components/FounderSection";
import ServicesSection from "@/components/ServicesSection";
import WorkProcess from "@/components/WorkProcess";
import EngagementModel from "@/components/EngagementModel";
import Portfolio from "@/components/Portfolio";
import ImpactMetrics from "@/components/ImpactMetrics";
import Testimonials from "@/components/Testimonials";
import TechStack from "@/components/TechStack";
import WhyChooseUs from "@/components/WhyChooseUs";
import FeaturedOffers from "@/components/FeaturedOffers";
import FAQSection from "@/components/FAQSection";
import SmartContactForm from "@/components/SmartContactForm";

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

// Homepage JSON-LD structured data
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
      provider: { "@id": "https://ellowdigital.space/#organization" },
      areaServed: { "@type": "Country", name: "India" },
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
      provider: { "@id": "https://ellowdigital.space/#organization" },
      areaServed: { "@type": "Country", name: "India" },
      description:
        "Comprehensive SEO services to improve search rankings and organic traffic.",
    },
    {
      "@type": "Service",
      "@id": "https://ellowdigital.space/#digitalmarketing",
      serviceType: "Digital Marketing",
      provider: { "@id": "https://ellowdigital.space/#organization" },
      areaServed: { "@type": "Country", name: "India" },
      description:
        "Complete digital marketing solutions including social media, content marketing, and PPC campaigns.",
    },
    generateFAQSchema(homepageFAQs),
  ],
};

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useSmoothScroll();

  useEffect(() => {
    let fallbackTimer: number | undefined;

    const markReady = () => setIsLoading(false);

    if (document.readyState === "complete") {
      markReady();
    } else {
      window.addEventListener("load", markReady, { once: true });
      fallbackTimer = window.setTimeout(markReady, 2000) as unknown as number;
    }

    const cleanupFns: Array<() => void> = [];
    const scheduledCancels: Array<() => void> = [];
    const scheduleInit = (initializer: () => () => void, delay = 0) => {
      const timeout = window.setTimeout(() => {
        const frame = window.requestAnimationFrame(() => {
          cleanupFns.push(initializer());
        });
        scheduledCancels.push(() => window.cancelAnimationFrame(frame));
      }, delay);
      scheduledCancels.push(() => window.clearTimeout(timeout));
    };

    scheduleInit(initScrollRevealAnimations, 500);
    scheduleInit(init3DTiltEffect, 800);

    return () => {
      if (fallbackTimer) clearTimeout(fallbackTimer);
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

      {isLoading && <Preloader />}
      <ScrollProgress />

      <div
        className={`min-h-screen flex flex-col bg-background text-foreground transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <Navbar />
        <main className="flex-grow" id="main-content">
          <HeroSection />

          <ScrollReveal animation="fadeUp">
            <AboutSection />
          </ScrollReveal>

          <ScrollReveal animation="fadeLeft" delay={0.1}>
            <FounderSection />
          </ScrollReveal>

          <ScrollReveal animation="fadeUp" delay={0.1}>
            <ServicesSection />
          </ScrollReveal>

          <ScrollReveal animation="fadeRight" delay={0.1}>
            <WorkProcess />
          </ScrollReveal>

          <ScrollReveal animation="scale" delay={0.1}>
            <EngagementModel />
          </ScrollReveal>

          <ScrollReveal animation="fadeUp" delay={0.1}>
            <Portfolio />
          </ScrollReveal>

          <ScrollReveal animation="blur" delay={0.1}>
            <ImpactMetrics />
          </ScrollReveal>

          <ScrollReveal animation="fadeLeft" delay={0.1}>
            <Testimonials />
          </ScrollReveal>

          <ScrollReveal animation="fadeUp" delay={0.1}>
            <TechStack />
          </ScrollReveal>

          <ScrollReveal animation="fadeRight" delay={0.1}>
            <WhyChooseUs />
          </ScrollReveal>

          <ScrollReveal animation="scale" delay={0.1}>
            <FeaturedOffers />
          </ScrollReveal>

          <ScrollReveal animation="fadeUp" delay={0.1}>
            <FAQSection />
          </ScrollReveal>

          <ScrollReveal animation="fadeUp" delay={0.1}>
            <SmartContactForm />
          </ScrollReveal>
        </main>
        <Footer />
        <FloatingContactButton />
      </div>
    </>
  );
};

export default Index;
