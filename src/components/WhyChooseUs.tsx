import {
  UserCheck,
  Zap,
  Clock,
  RefreshCw,
  MessageSquare,
  ArrowRight,
  Shield,
  CheckCircle,
  TrendingUp,
  Award,
  Sparkles,
} from "lucide-react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AnimatedSectionHeader } from "./AnimatedGradient";

const reasons = [
  {
    title: "Personalized Collaboration",
    description:
      "Direct 1-on-1 communication throughout the project lifecycle for a truly personalized experience.",
    icon: UserCheck,
  },
  {
    title: "Fast & Responsive Architecture",
    description:
      "Optimized performance for lightning-fast load times and seamless user experiences across all devices.",
    icon: Zap,
  },
  {
    title: "On-time, Within Budget",
    description:
      "Strict adherence to project timelines and budget constraints without compromising on quality.",
    icon: Clock,
  },
  {
    title: "Post-launch Support",
    description:
      "Comprehensive support and real-time updates even after your project goes live.",
    icon: RefreshCw,
  },
  {
    title: "Transparent Communication",
    description:
      "Clear, jargon-free communication with regular updates on project milestones and progress.",
    icon: MessageSquare,
  },
  {
    title: "Enhanced Security",
    description:
      "Implementation of industry-standard security practices to protect your digital assets and user data.",
    icon: Shield,
  },
];

const clientLogos = [
  { name: "Indian Corp", logo: <TrendingUp className="w-6 h-6" /> },
  { name: "Tech Solutions", logo: <Zap className="w-6 h-6" /> },
  { name: "Security First", logo: <Shield className="w-6 h-6" /> },
  { name: "Premium Services", logo: <Award className="w-6 h-6" /> },
  { name: "Quality Assured", logo: <CheckCircle className="w-6 h-6" /> },
];

const WhyChooseUs = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
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
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="why-us"
      className="relative py-20 sm:py-28 overflow-hidden deferred-section"
    >
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-brand-gold/5 to-background" />
      
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-brand-gold/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-yellow/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-radial from-brand-gold/5 to-transparent rounded-full blur-2xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <AnimatedSectionHeader
          badge="Industry-Recognized Excellence"
          badgeIcon={<Award className="w-4 h-4 text-primary" />}
          title="Why Choose EllowDigital?"
          highlightedWord="EllowDigital"
          description="We pride ourselves on delivering exceptional value and building lasting relationships with our clients."
          gradient="gold"
        />

        {/* Client Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 mb-16"
        >
          {clientLogos.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              className="group flex flex-col items-center gap-3"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-b from-card/80 to-card border border-border/50 flex items-center justify-center transition-all duration-300 group-hover:border-brand-gold/30 group-hover:shadow-lg group-hover:shadow-brand-gold/10 group-hover:-translate-y-1">
                <div className="text-brand-gold/70 group-hover:text-brand-gold transition-colors duration-300">{client.logo}</div>
              </div>
              <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-300">{client.name}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Reasons Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group"
            >
              <div className="relative h-full p-8 rounded-2xl bg-gradient-to-b from-card/80 to-card border border-border/50 overflow-hidden transition-all duration-500 hover:border-brand-gold/30 hover:shadow-2xl hover:shadow-brand-gold/10 hover:-translate-y-2">
                {/* Background glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/10 via-transparent to-brand-yellow/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Floating particle */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-brand-gold/5 rounded-full blur-2xl group-hover:bg-brand-gold/10 transition-all duration-500" />

                {/* Icon */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-brand-gold/20 to-brand-yellow/10 border border-brand-gold/20 group-hover:border-brand-gold/40 group-hover:scale-110 transition-all duration-500">
                    <reason.icon className="w-8 h-8 text-brand-gold" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="relative text-xl font-bold mb-3 text-foreground group-hover:text-brand-gold transition-colors duration-300">
                  {reason.title}
                </h3>
                <p className="relative text-muted-foreground text-sm leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                  {reason.description}
                </p>

                {/* Bottom gradient line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-gold via-brand-yellow to-brand-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20"
        >
          <div className="relative rounded-3xl overflow-hidden">
            {/* CTA Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-gold to-brand-yellow" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,0,0,0.1),transparent_70%)]" />
            
            {/* Pattern overlay */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "radial-gradient(circle at 25px 25px, black 2%, transparent 0%)",
                backgroundSize: "50px 50px",
              }}
            />

            <div className="relative p-8 sm:p-12 flex flex-col lg:flex-row justify-between items-center gap-8">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/10 mb-4">
                  <Sparkles className="w-4 h-4 text-black/70" />
                  <span className="text-sm font-medium text-black/70">Start Your Project</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold mb-3 text-black">
                  Ready to elevate your digital presence?
                </h3>
                <p className="text-black/80 text-lg max-w-xl">
                  Let's collaborate to create something exceptional that elevates your brand and engages your audience.
                </p>
              </div>
              
              <motion.a
                href="#contact"
                className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-black text-brand-yellow font-semibold text-lg shadow-xl shadow-black/20 hover:shadow-black/30 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Let's Talk
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
