import { Award, Clock, ThumbsUp, Users, Sparkles, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const metrics = [
  {
    icon: Award,
    value: 5,
    label: "Projects Completed",
    suffix: "+",
    description: "Successful deliveries",
  },
  {
    icon: ThumbsUp,
    value: 98,
    label: "Client Satisfaction",
    suffix: "%",
    description: "Happy clients",
  },
  {
    icon: Clock,
    value: 14,
    label: "Average Delivery Time",
    suffix: " days",
    description: "Fast turnaround",
  },
  {
    icon: Users,
    value: 32,
    label: "Technologies Mastered",
    suffix: "+",
    description: "Tools & frameworks",
  },
];

const ImpactMetrics = () => {
  const [counts, setCounts] = useState<number[]>(metrics.map(() => 0));
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            animateCounters();
            setHasAnimated(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    const sectionElement = sectionRef.current;
    if (sectionElement) observer.observe(sectionElement);

    return () => {
      if (sectionElement) observer.unobserve(sectionElement);
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

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section
      id="impact"
      ref={sectionRef}
      className="relative py-20 sm:py-28 overflow-hidden deferred-section"
    >
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-brand-gold/5 to-background" />
      
      {/* Animated background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-brand-yellow/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-radial from-brand-gold/5 to-transparent rounded-full blur-2xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-6"
          >
            <TrendingUp className="w-4 h-4 text-brand-gold" />
            <span className="text-sm font-medium text-brand-gold">Our Achievements</span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Our Impact <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-brand-yellow">By the Numbers</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We're proud of the results we've achieved for our clients. These metrics showcase our commitment to excellence.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group"
            >
              <div className="relative h-full p-8 rounded-2xl bg-gradient-to-b from-card/80 to-card border border-border/50 overflow-hidden transition-all duration-500 hover:border-brand-gold/30 hover:shadow-2xl hover:shadow-brand-gold/10 hover:-translate-y-2">
                {/* Background glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/10 via-transparent to-brand-yellow/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Floating particles effect */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-brand-gold/5 rounded-full blur-2xl group-hover:bg-brand-gold/10 transition-all duration-500" />

                {/* Icon */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center bg-gradient-to-br from-brand-gold/20 to-brand-yellow/10 border border-brand-gold/20 group-hover:border-brand-gold/40 group-hover:scale-110 transition-all duration-500">
                    <metric.icon className="w-10 h-10 text-brand-gold" />
                  </div>
                </div>

                {/* Counter */}
                <div className="relative text-center">
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-5xl font-bold bg-gradient-to-r from-brand-gold to-brand-yellow bg-clip-text text-transparent">
                      {counts[index]}
                    </span>
                    <span className="text-2xl font-bold text-brand-yellow ml-1">
                      {metric.suffix}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {metric.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {metric.description}
                  </p>
                </div>

                {/* Bottom gradient line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-gold via-brand-yellow to-brand-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Badge */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-brand-gold/10 to-brand-yellow/10 border border-brand-gold/20">
            <Sparkles className="w-5 h-5 text-brand-gold" />
            <span className="text-sm font-medium text-foreground">
              Delivering exceptional results since 2024
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactMetrics;
