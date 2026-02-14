import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs?: FAQItem[];
}

const defaultFAQs: FAQItem[] = [
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

// Generate FAQPage Schema for SEO
export const generateFAQSchema = (faqs: FAQItem[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

const FAQSection: React.FC<FAQSectionProps> = ({ faqs = defaultFAQs }) => {
  return (
    <section
      id="faq"
      className="py-16 lg:py-24 bg-gradient-to-b from-background to-muted/20"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 mb-6">
            <HelpCircle className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find answers to common questions about our services, pricing, and
            process
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border/50 rounded-xl px-6 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-colors"
              >
                <AccordionTrigger className="text-left text-base md:text-lg font-semibold hover:text-primary py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground">
            Still have questions?{" "}
            <a
              href="#contact"
              className="text-primary hover:underline font-semibold"
            >
              Contact us
            </a>{" "}
            and we'll be happy to help!
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
