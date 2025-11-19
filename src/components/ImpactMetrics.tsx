import { Award, Clock, ThumbsUp, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const metrics = [
  {
    icon: Award,
    value: 5,
    label: "Projects Completed",
    suffix: "+",
    color: "from-brand-gold to-brand-yellow",
  },
  {
    icon: ThumbsUp,
    value: 98,
    label: "Client Satisfaction",
    suffix: "%",
    color: "from-brand-gold to-brand-yellow",
  },
  {
    icon: Clock,
    value: 14,
    label: "Average Delivery Time",
    suffix: " days",
    color: "from-brand-gold to-brand-yellow",
  },
  {
    icon: Users,
    value: 32,
    label: "Technologies Mastered",
    suffix: "+",
    color: "from-brand-gold to-brand-yellow",
  },
];

const ImpactMetrics = () => {
  const [counts, setCounts] = useState<number[]>(metrics.map(() => 0));
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<Array<HTMLDivElement | null>>([]);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            entry.target.classList.add("revealed");
            animateCounters();
            setHasAnimated(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    // Copy ref values to variables for cleanup
    const titleElement = titleRef.current;
    const dividerElement = dividerRef.current;
    const sectionElement = sectionRef.current;
    const metricElements = metricsRef.current;

    if (titleElement) observer.observe(titleElement);
    if (dividerElement) observer.observe(dividerElement);
    if (sectionElement) observer.observe(sectionElement);
    metricElements.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      if (titleElement) observer.unobserve(titleElement);
      if (dividerElement) observer.unobserve(dividerElement);
      if (sectionElement) observer.unobserve(sectionElement);
      metricElements.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [hasAnimated]);

  const animateCounters = () => {
    const duration = 2000;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);

    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      const newCounts = metrics.map((metric) => {
        const progress = Math.min(frame / totalFrames, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        return Math.floor(metric.value * easeOutQuart);
      });

      setCounts(newCounts);

      if (frame === totalFrames) {
        clearInterval(interval);
        setCounts(metrics.map((m) => m.value));
      }
    }, frameDuration);
  };

  return (
    <section
      id="impact"
      ref={sectionRef}
      className="py-16 md:py-24 relative overflow-hidden snap-start bg-gradient-to-b from-background to-card/30 dark:from-background dark:to-black/30 deferred-section"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 right-1/4 w-96 h-96 bg-brand-yellow/5 rounded-full blur-3xl morph-shape" />
        <div
          className="absolute bottom-0 left-1/4 w-72 h-72 bg-brand-gold/5 rounded-full blur-3xl morph-shape"
          style={{ animationDelay: "8s" }}
        />
      </div>

      <div className="section-container max-w-6xl mx-auto px-4 relative z-10">
        <h2
          ref={titleRef}
          className="section-title text-2xl md:text-3xl lg:text-4xl reveal-animate"
        >
          Our Impact By the Numbers
        </h2>
        <div
          ref={dividerRef}
          className="animated-divider reveal-animate mb-8"
        />

        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10 md:mb-16 px-4 reveal-animate text-sm md:text-base">
          We're proud of the results we've achieved for our clients. These
          metrics showcase our commitment to excellence and delivering
          exceptional digital solutions.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {metrics.map((metric, index) => (
            <div
              key={index}
              ref={(el) => (metricsRef.current[index] = el)}
              className="reveal-animate opacity-0 transform translate-y-20 transition-opacity duration-700 ease-in-out"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="p-4 md:p-6 rounded-xl card-3d relative overflow-hidden group hover:shadow-lg hover:shadow-brand-yellow/5 transition-all duration-300 bg-card dark:bg-black/30 border border-border/50 dark:border-brand-gold/10">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/5 via-transparent to-brand-yellow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="mb-4 md:mb-6 relative mx-auto">
                  <div className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full flex items-center justify-center bg-gradient-to-br from-brand-gold/10 to-brand-yellow/10 backdrop-blur-sm border border-brand-yellow/20 group-hover:border-brand-yellow/30 transition-all duration-300">
                    <metric.icon className="w-8 h-8 md:w-10 md:h-10 text-brand-yellow" />
                  </div>
                </div>

                <div className="relative text-center">
                  <h3 className="text-3xl md:text-4xl font-bold mb-1 md:mb-2 flex items-center justify-center">
                    <span className="bg-gradient-to-r bg-clip-text text-transparent from-brand-gold to-brand-yellow">
                      {counts[index]}
                    </span>
                    <span className="text-brand-yellow ml-1">
                      {metric.suffix}
                    </span>
                  </h3>
                  <p className="text-base md:text-lg font-medium text-foreground">
                    {metric.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 md:mt-16 text-center reveal-animate">
          <p className="inline-block py-2 md:py-3 px-4 md:px-6 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 text-xs md:text-sm font-medium text-foreground">
            Delivering exceptional results since 2024
          </p>
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;
