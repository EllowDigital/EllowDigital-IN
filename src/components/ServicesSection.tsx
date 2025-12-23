import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code,
  Smartphone,
  Layout,
  Search,
  Server,
  HeartPulse,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { AnimatedSectionHeader } from "./AnimatedGradient";

const services = [
  {
    title: "Web Development",
    description:
      "Lightning-fast, mobile-first, SEO-optimized websites using modern technologies.",
    icon: Code,
    details: "HTML5, CSS3, React, Node.js",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "Mobile App Development",
    description: "Beautiful and intuitive apps for Android and iOS platforms.",
    icon: Smartphone,
    details: "Flutter, React Native, Native Tools",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "UI/UX Design",
    description:
      "Clean, user-centered, and accessible interfaces that drive engagement.",
    icon: Layout,
    details: "Wireframing, Prototyping, User Testing",
    gradient: "from-orange-500/20 to-amber-500/20",
  },
  {
    title: "SEO & Performance",
    description:
      "Implementing rank-ready strategies and speed optimizations for conversions.",
    icon: Search,
    details: "Technical SEO, Speed Optimization",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    title: "Custom Software",
    description:
      "Tailored tools and automation systems to improve business efficiency.",
    icon: Server,
    details: "Business Solutions, Automation",
    gradient: "from-indigo-500/20 to-violet-500/20",
  },
  {
    title: "Maintenance & Support",
    description:
      "Ongoing updates, bug fixes, and expert consultation for your projects.",
    icon: HeartPulse,
    details: "Updates, Security, Performance",
    gradient: "from-rose-500/20 to-red-500/20",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const ServiceCard = ({
  title,
  description,
  icon: Icon,
  details,
  index,
  gradient,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  details: string;
  index: number;
  gradient: string;
}) => (
  <motion.div variants={itemVariants} className="group">
    <div className="relative h-full rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5">
      {/* Animated gradient background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
      />

      {/* Glow effect on hover */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

      {/* Card content */}
      <div className="relative p-6 lg:p-8 h-full flex flex-col">
        {/* Header with icon and number */}
        <div className="flex items-start justify-between mb-6">
          {/* Icon container with animated ring */}
          <div className="relative">
            <div className="absolute inset-0 rounded-xl bg-primary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
              <Icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
            </div>
          </div>

          {/* Number badge */}
          <div className="w-10 h-10 rounded-xl bg-secondary/80 border border-border/50 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-300">
            <span className="text-sm font-bold text-muted-foreground group-hover:text-primary transition-colors">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
          {description}
        </p>

        {/* Footer with tags and arrow */}
        <div className="flex items-center justify-between pt-4 border-t border-border/30">
          <div className="flex flex-wrap gap-1.5">
            {details.split(", ").slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium bg-secondary/80 py-1 px-2.5 rounded-md text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary/80 transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Arrow button */}
          <motion.div
            className="w-9 h-9 rounded-full bg-secondary/80 border border-border/50 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary-foreground transition-colors duration-300 group-hover:translate-x-0.5" />
          </motion.div>
        </div>
      </div>
    </div>
  </motion.div>
);

const ServicesSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="services"
      className="py-24 lg:py-32 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[100px] pointer-events-none" />

      {/* Decorative grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <AnimatedSectionHeader
          badge="What We Offer"
          badgeIcon={<Sparkles className="w-4 h-4 text-primary" />}
          title="Our Services"
          highlightedWord="Services"
          description="From concept to deployment, we provide comprehensive digital services to help your business thrive in the digital landscape."
          gradient="gold"
        />

        {/* Service Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
        >
          {services.map((service, index) => (
            <ServiceCard key={service.title} {...service} index={index} />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16 lg:mt-20"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/50">
            <p className="text-muted-foreground">
              Need something custom? Let's discuss your project.
            </p>
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 rounded-full shadow-lg shadow-primary/20 transition-all duration-300"
              whileHover={{ scale: 1.02, gap: "0.75rem" }}
              whileTap={{ scale: 0.98 }}
            >
              Get in Touch
              <ArrowRight className="h-4 w-4" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
