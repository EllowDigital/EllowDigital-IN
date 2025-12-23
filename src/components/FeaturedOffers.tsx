import { useCallback } from "react";
import { CheckCircle, Sparkles } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

type Offer = {
  title: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  priceUnit?: string;
  ctaLabel?: string;
};

const offers: Readonly<Offer[]> = [
  {
    title: "Business Website Pro",
    price: "₹14,999",
    description:
      "All-inclusive package to grow your brand and convert visitors to leads.",
    features: [
      "Free .com domain + SSL (1 year)",
      "Managed hosting (1 year)",
      "Up to 10 pages + Blog (CMS)",
      "Custom, mobile‑first design",
      "On‑page SEO (meta, sitemap, schema)",
      "Lead forms with spam protection",
      "WhatsApp chat & CTA integration",
      "Google Analytics/GTM + Search Console",
      "Lighthouse performance 90+ target",
      "Monthly backups & uptime monitoring (1 year)",
      "3 revision rounds",
      "Priority support (Mon–Sat)",
    ],
    priceUnit: "/website",
    isPopular: true,
  },
  {
    title: "Business Website Starter",
    price: "₹7,999",
    description: "Essential website to get your business online fast.",
    features: [
      "Responsive 1–5 page site",
      "Contact form + Google Map",
      "Basic on‑page SEO",
      "Social & WhatsApp links",
      "Optimized images, fast loading",
      "Google Analytics setup",
      "1 revision round",
      "3 months maintenance",
    ],
  },
  {
    title: "School/College CS Projects",
    price: "Starting at ₹1,499",
    description: "Original, ready‑to‑present projects with documentation.",
    features: [
      "Class 11–12 / BCA / B.Tech projects",
      "Plagiarism‑free, well‑commented code",
      "Report + PPT templates",
      "Live demo + viva preparation",
      "Minor customizations included",
      "Delivery in 48–72 hours",
      "Post‑delivery presentation support",
      "GitHub repo + setup guide",
    ],
  },
];

const FeaturedOffers = () => {
  const scrollToContact = useCallback(() => {
    if (typeof document !== "undefined") {
      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <section
      id="offers"
      aria-labelledby="offers-heading"
      className="py-16 md:py-24 relative overflow-hidden deferred-section"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="section-container px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Special Packages</span>
          </motion.div>

          <h2 id="offers-heading" className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Offers</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Special packages designed to meet specific needs with exceptional value.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={`relative overflow-hidden border h-full transition-all duration-500 hover:-translate-y-2 ${
                  offer.isPopular ? "border-primary shadow-xl shadow-primary/10" : "border-border/60 hover:border-primary/30"
                }`}
                aria-label={offer.title}
              >
                {offer.isPopular && (
                  <div
                    className="absolute -right-12 top-6 rotate-45 bg-primary text-primary-foreground text-xs font-medium py-1 px-10 shadow-md"
                    aria-hidden="true"
                  >
                    Popular
                  </div>
                )}

                <div
                  className="absolute inset-x-0 h-1 bg-gradient-to-r from-primary to-primary/80"
                  aria-hidden="true"
                />

                <CardHeader>
                  <CardTitle className="flex items-center flex-wrap gap-2">
                    {offer.title}
                    {offer.isPopular && (
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                        Best Value
                      </span>
                    )}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {offer.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="flex items-baseline">
                    <div className="text-2xl md:text-3xl font-bold">
                      {offer.price}
                    </div>
                    {offer.priceUnit && (
                      <>
                        <div
                          className="ml-2 text-sm text-muted-foreground"
                          aria-hidden="true"
                        >
                          {offer.priceUnit}
                        </div>
                        <span className="sr-only">
                          Price {offer.priceUnit.replace("/", " per ")}
                        </span>
                      </>
                    )}
                  </div>

                  <ul
                    className="space-y-3"
                    aria-label={`Features of ${offer.title}`}
                  >
                    {offer.features.map((feature, idx) => (
                      <li
                        key={`${offer.title}-feature-${idx}`}
                        className="flex items-start gap-2"
                      >
                        <CheckCircle
                          className="h-5 w-5 text-primary shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button
                    onClick={scrollToContact}
                    className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-primary-foreground font-semibold py-2 px-4 rounded-md transition-all duration-300 shadow-lg hover:shadow-xl"
                    aria-label={`Get started with ${offer.title}`}
                  >
                    {offer.ctaLabel ?? "Get Started"}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 md:mt-12 text-center mx-auto max-w-2xl">
          <p className="text-sm text-muted-foreground">
            All prices are in Indian Rupees (₹). GST applicable as per
            government regulations.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Serving clients across Delhi, Mumbai, Bangalore, Chennai, Kolkata
            and more.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturedOffers;
