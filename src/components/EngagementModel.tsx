import {
  ArrowRight,
  Clock,
  DollarSign,
  Users,
  Briefcase,
  Check,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef } from "react";

const models = [
  {
    icon: Briefcase,
    title: "Fixed Price",
    description: "Perfect for projects with clear scope and requirements",
    features: [
      "Defined deliverables",
      "Predictable cost",
      "Milestone-based payments",
    ],
  },
  {
    icon: Clock,
    title: "Hourly Rate",
    description: "Ideal for ongoing development and flexible projects",
    features: [
      "Maximum flexibility",
      "Transparent billing",
      "Scale up or down as needed",
    ],
  },
  {
    icon: Users,
    title: "Dedicated Team",
    description: "For long-term partnerships and complex projects",
    features: [
      "Consistent team allocation",
      "Deep product knowledge",
      "Enhanced productivity",
    ],
  },
  {
    icon: DollarSign,
    title: "Student-Friendly",
    description: "Affordable options for educational and startup projects",
    features: ["Reduced rates", "Mentorship included", "Future growth options"],
  },
];

const steps = [
  {
    title: "Consultation",
    description: "In-depth discussion of your project requirements and goals",
  },
  {
    title: "Custom Proposal",
    description: "Detailed project scope, timeline, and cost estimation",
  },
  {
    title: "Design & Development",
    description: "Iterative development with regular updates and feedback",
  },
  {
    title: "Delivery & Support",
    description: "Project deployment and continued maintenance support",
  },
];

const EngagementModel = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const modelsRef = useRef<HTMLDivElement>(null);
  const modelCardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");

            // Staggered animation for model cards
            if (entry.target === modelsRef.current) {
              modelCardsRef.current.forEach((card, index) => {
                if (card) {
                  setTimeout(() => {
                    card.classList.add("revealed");
                  }, index * 200);
                }
              });
            }

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) observer.observe(titleRef.current);
    if (dividerRef.current) observer.observe(dividerRef.current);
    if (timelineRef.current) observer.observe(timelineRef.current);
    if (modelsRef.current) observer.observe(modelsRef.current);

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);
      if (dividerRef.current) observer.unobserve(dividerRef.current);
      if (timelineRef.current) observer.unobserve(timelineRef.current);
      if (modelsRef.current) observer.unobserve(modelsRef.current);
    };
  }, []);

  return (
    <section
      id="engagement"
      className="section-container py-24 relative overflow-hidden snap-start bg-muted/50 dark:bg-transparent"
    >
      {/* Background morphing shapes */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl morph-shape"></div>
      <div
        className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-brand-yellow/10 rounded-full blur-3xl morph-shape"
        style={{ animationDelay: "10s" }}
      ></div>

      <div className="max-w-6xl mx-auto">
        <h2 ref={titleRef} className="section-title reveal-animate">
          Our Engagement Models
        </h2>
        <div
          ref={dividerRef}
          className="animated-divider reveal-animate mb-12"
        ></div>

        {/* Process Timeline */}
        <div ref={timelineRef} className="mb-20 reveal-animate">
          <h3 className="text-2xl font-semibold mb-8 text-center">
            How We Collaborate
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Timeline connector */}
            <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-gold to-brand-yellow z-0"></div>

            {steps.map((step, index) => (
              <div key={index} className="relative z-10">
                {/* Timeline node */}
                <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center bg-card shadow-md border border-brand-gold/30 mb-4">
                  <span className="text-xl font-bold text-brand-gold">
                    {index + 1}
                  </span>
                </div>

                <div className="text-center">
                  <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
                  <p className="text-sm text-foreground/80">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement Models */}
        <h3 className="text-2xl font-semibold mb-8 text-center reveal-animate">
          Flexible Engagement Options
        </h3>

        <div
          ref={modelsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {models.map((model, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) modelCardsRef.current[index] = el;
              }}
              className="reveal-animate opacity-0 transform translate-y-5"
            >
              <Card className="h-full border border-border overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="mb-6 flex justify-center">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-brand-gold/20 to-brand-yellow/20 border border-brand-gold/30">
                      <model.icon className="w-6 h-6 text-brand-gold" />
                    </div>
                  </div>

                  <h4 className="text-xl font-semibold mb-2 text-center">
                    {model.title}
                  </h4>
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    {model.description}
                  </p>

                  <ul className="space-y-2">
                    {model.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <span className="w-5 h-5 rounded-full bg-brand-gold/20 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                          <Check className="w-3 h-3 text-brand-gold" />
                        </span>
                        <span className="text-sm text-foreground/90">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EngagementModel;
