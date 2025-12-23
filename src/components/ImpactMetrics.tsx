import { Award, Clock, ThumbsUp, Users, Sparkles, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  staggerContainer,
  fadeUpItem,
  headerVariants,
  badgeVariants,
  underlineVariants,
  smoothEase,
} from "@/utils/scrollAnimations";

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
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      animateCounters();
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

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
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="relative section-container">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-14 lg:mb-16"
        >
          <motion.div
            variants={badgeVariants}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-5 py-2 mb-6"
          >
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary tracking-wide">
              Our Achievements
            </span>
          </motion.div>

          <motion.h2
            variants={headerVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Our Impact{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
                By the Numbers
              </span>
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full origin-left"
                variants={underlineVariants}
              />
            </span>
          </motion.h2>
          <motion.p
            variants={headerVariants}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            We're proud of the results we've achieved for our clients. These
            metrics showcase our commitment to excellence.
          </motion.p>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
          variants={staggerContainer(0.1, 0.2)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {metrics.map((metric, index) => (
            <motion.div key={index} variants={fadeUpItem} className="group">
              <div className="relative h-full p-7 lg:p-8 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/50 overflow-hidden transition-all duration-500 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Glow effect */}
                <div className="absolute top-4 right-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-500" />

                {/* Icon */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 mx-auto rounded-xl flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 group-hover:scale-110 group-hover:border-primary/40 transition-all duration-300">
                    <metric.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>

                {/* Counter */}
                <div className="relative text-center">
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                      {counts[index]}
                    </span>
                    <span className="text-2xl font-bold text-primary ml-1">
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

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Badge */}
        <motion.div
          className="mt-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: smoothEase }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-card/60 backdrop-blur-sm border border-border/50">
            <Sparkles className="w-5 h-5 text-primary" />
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
