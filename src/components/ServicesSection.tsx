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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const services = [
  {
    title: "Web Development",
    description:
      "Lightning-fast, mobile-first, SEO-optimized websites using modern technologies.",
    icon: Code,
    details: "HTML5, CSS3, React, Node.js",
  },
  {
    title: "Mobile App Development",
    description: "Beautiful and intuitive apps for Android and iOS platforms.",
    icon: Smartphone,
    details: "Flutter, React Native, Native Tools",
  },
  {
    title: "UI/UX Design",
    description:
      "Clean, user-centered, and accessible interfaces that drive engagement.",
    icon: Layout,
    details: "Wireframing, Prototyping, User Testing",
  },
  {
    title: "SEO & Performance",
    description:
      "Implementing rank-ready strategies and speed optimizations for conversions.",
    icon: Search,
    details: "Technical SEO, Speed Optimization",
  },
  {
    title: "Custom Software",
    description:
      "Tailored tools and automation systems to improve business efficiency.",
    icon: Server,
    details: "Business Solutions, Automation",
  },
  {
    title: "Maintenance & Support",
    description:
      "Ongoing updates, bug fixes, and expert consultation for your projects.",
    icon: HeartPulse,
    details: "Updates, Security, Performance",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const ServiceCard = ({ title, description, icon: Icon, details, index }: {
  title: string;
  description: string;
  icon: React.ElementType;
  details: string;
  index: number;
}) => (
  <motion.div variants={itemVariants}>
    <Card className="group relative border border-border/40 overflow-hidden bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-500 h-full">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Number badge */}
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary/80 flex items-center justify-center">
        <span className="text-xs font-bold text-muted-foreground">0{index + 1}</span>
      </div>

      <CardHeader className="pb-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <Icon className="h-7 w-7 text-primary" />
        </div>
        <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
          {title}
        </CardTitle>
        <CardDescription className="text-base text-muted-foreground leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="text-xs font-medium bg-secondary/80 py-1.5 px-3 rounded-full text-muted-foreground">
            {details}
          </div>
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
            <ArrowRight className="h-4 w-4 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const ServicesSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 relative overflow-hidden" ref={sectionRef}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">What We Offer</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our{" "}
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            From concept to deployment, we provide comprehensive digital services
            to help your business thrive in the digital landscape.
          </p>
        </motion.div>

        {/* Service Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              {...service}
              index={index}
            />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">
            Need something custom? Let's discuss your project.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-300"
          >
            Get in Touch
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
