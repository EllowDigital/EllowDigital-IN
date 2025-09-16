import { useCallback } from "react";
import { CheckCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Offer = {
  title: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  priceUnit?: string; // e.g. "/website"
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
      className="py-16 md:py-24 bg-gradient-to-b from-background to-background/95"
    >
      <div className="section-container px-4 sm:px-6">
        <h2 id="offers-heading" className="section-title">
          Featured Offers
        </h2>
        <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto mb-12 md:mb-16">
          Special packages designed to meet specific needs with exceptional
          value.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {offers.map((offer) => (
            <Card
              key={offer.title}
              className={`relative overflow-hidden border ${
                offer.isPopular ? "border-brand-yellow" : "border-border/60"
              } hover:shadow-xl transition-all duration-500`}
              aria-label={offer.title}
            >
              {offer.isPopular && (
                <div
                  className="absolute -right-12 top-6 rotate-45 bg-brand-yellow text-black text-xs font-medium py-1 px-10 shadow-md"
                  aria-hidden="true"
                >
                  Popular
                </div>
              )}

              <div
                className="absolute inset-x-0 h-1 bg-brand-yellow"
                aria-hidden="true"
              />

              <CardHeader>
                <CardTitle className="flex items-center flex-wrap gap-2">
                  {offer.title}
                  {offer.isPopular && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-brand-yellow text-black">
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
                        className="h-5 w-5 text-brand-yellow shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  onClick={scrollToContact}
                  className="w-full bg-brand-yellow hover:bg-brand-gold text-black font-semibold py-2 px-4 rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-yellow"
                  aria-label={`Get started with ${offer.title}`}
                >
                  {offer.ctaLabel ?? "Get Started"}
                </Button>
              </CardFooter>
            </Card>
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
