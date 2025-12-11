import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Star, Users, Zap, Globe } from "lucide-react";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const stats = [
    { icon: Users, value: "50+", label: "Happy Clients" },
    { icon: Zap, value: "100+", label: "Projects Delivered" },
    { icon: Globe, value: "15+", label: "Countries Served" },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 px-4 sm:px-6"
    >
      {/* Modern gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-yellow/10 rounded-full blur-[120px] -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-gold/8 rounded-full blur-[100px] translate-y-1/2" />
        
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `linear-gradient(rgba(255,215,0,0.03) 1px, transparent 1px), 
                            linear-gradient(90deg, rgba(255,215,0,0.03) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating elements */}
      <motion.div
        className="absolute top-32 left-[10%] w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-yellow/20 to-brand-gold/10 border border-brand-yellow/20 backdrop-blur-sm hidden lg:flex items-center justify-center"
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-3xl">⚡</span>
      </motion.div>

      <motion.div
        className="absolute top-48 right-[12%] w-16 h-16 rounded-xl bg-gradient-to-br from-secondary to-secondary/50 border border-border/50 backdrop-blur-sm hidden lg:flex items-center justify-center"
        animate={{ y: [0, 12, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <span className="text-2xl">🚀</span>
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-[15%] w-14 h-14 rounded-full bg-gradient-to-br from-brand-gold/20 to-transparent border border-brand-gold/20 backdrop-blur-sm hidden lg:flex items-center justify-center"
        animate={{ y: [0, 10, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <span className="text-xl">💡</span>
      </motion.div>

      <motion.div
        className="absolute bottom-40 right-[10%] w-24 h-24 rounded-2xl bg-gradient-to-br from-secondary/80 to-secondary/40 border border-border/30 backdrop-blur-sm hidden lg:flex items-center justify-center"
        animate={{ y: [0, -10, 0], rotate: [0, -3, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <span className="text-4xl">🎯</span>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-secondary/50 backdrop-blur-sm border border-border/50 rounded-full"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-sm text-muted-foreground">Available for new projects</span>
          <div className="flex items-center gap-0.5 ml-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 text-brand-yellow fill-brand-yellow" />
            ))}
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] mb-6"
        >
          We Build{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-brand-yellow via-brand-gold to-brand-yellow bg-clip-text text-transparent">
              Digital Products
            </span>
            <motion.svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 300 12"
              initial={{ pathLength: 0 }}
              animate={isLoaded ? { pathLength: 1 } : {}}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <motion.path
                d="M2 8 Q75 2 150 8 T298 6"
                stroke="url(#underline-gradient)"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              <defs>
                <linearGradient id="underline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFD700" />
                  <stop offset="100%" stopColor="#FFA500" />
                </linearGradient>
              </defs>
            </motion.svg>
          </span>
          <br />
          <span className="text-muted-foreground">That People Love</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          Transform your ideas into exceptional digital experiences. We craft modern websites, 
          web apps, and digital solutions that drive growth and inspire users.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <motion.a
            href="#contact"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-yellow to-brand-gold text-primary-foreground font-semibold rounded-full shadow-lg shadow-brand-yellow/25 overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Start Your Project</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-gold to-brand-yellow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.a>

          <motion.a
            href="#portfolio"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-secondary/50 hover:bg-secondary text-foreground font-semibold rounded-full border border-border/50 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Play className="w-5 h-5 text-brand-yellow" />
            <span>View Our Work</span>
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="flex items-center gap-3"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
            >
              <div className="w-12 h-12 rounded-xl bg-secondary/50 border border-border/50 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-brand-yellow" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trusted by section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 pt-12 border-t border-border/30"
        >
          <p className="text-sm text-muted-foreground mb-6">Trusted by innovative companies</p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-50">
            {["TechCorp", "StartupX", "InnovateCo", "DigitalFirst", "NextGen"].map((company) => (
              <div
                key={company}
                className="text-lg font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-default"
              >
                {company}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ delay: 1 }}
      >
        <span className="text-xs text-muted-foreground mb-2">Scroll to explore</span>
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-border/50 flex items-start justify-center p-1"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-3 bg-brand-yellow rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
