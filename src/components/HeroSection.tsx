import { useEffect, useState, useRef, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowRight, Play, Star, Users, Zap, Globe } from "lucide-react";
import { TypewriterText, FloatingShapes } from "./storytelling";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCountUp } from "@/hooks/useCountUp";

// Animated counter stat component
const CountUpStat = ({ stat, index, isLoaded }: { stat: { icon: React.ElementType; value: number; suffix: string; label: string }; index: number; isLoaded: boolean }) => {
  const { count, ref } = useCountUp({ end: stat.value, duration: 2000 });
  
  return (
    <motion.div
      ref={ref as React.Ref<HTMLDivElement>}
      className="flex items-center gap-4 cursor-default"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
      whileHover={{ scale: 1.05, rotateY: 5 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="w-14 h-14 rounded-2xl bg-secondary/60 border border-border/40 flex items-center justify-center">
        <stat.icon className="w-6 h-6 text-brand-yellow" />
      </div>
      <div className="text-left">
        <div className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
          {count}{stat.suffix}
        </div>
        <div className="text-sm text-muted-foreground font-medium">
          {stat.label}
        </div>
      </div>
    </motion.div>
  );
};

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isMobile) return;
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      const centerX = (e.clientX - rect.left) / rect.width - 0.5;
      const centerY = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(centerX * 40);
      mouseY.set(centerY * 30);
    },
    [isMobile, mouseX, mouseY]
  );

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  // Derived mouse transforms for counter-parallax
  const negMouseX = useTransform(smoothMouseX, (v) => -v * 0.6);
  const negMouseY = useTransform(smoothMouseY, (v) => -v * 0.6);
  const gridMouseX = useTransform(smoothMouseX, (v) => v * 0.3);
  const gridMouseY = useTransform(smoothMouseY, (v) => v * 0.3);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const stats = [
    { icon: Users, value: 50, suffix: "+", label: "Happy Clients" },
    { icon: Zap, value: 100, suffix: "+", label: "Projects Delivered" },
    { icon: Globe, value: 15, suffix: "+", label: "Countries Served" },
  ];

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 px-4 sm:px-6"
      onMouseMove={handleMouseMove}
    >
      {/* 3D Floating shapes */}
      <FloatingShapes variant="hero" />

      {/* Parallax gradient background - responds to mouse on desktop */}
      <motion.div className="absolute inset-0 -z-10" style={{ y: bgY }}>
        <div className="absolute inset-0 bg-background" />
        <motion.div
          className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-brand-yellow/8 rounded-full blur-[150px] -translate-y-1/2"
          style={{ y: orb1Y, x: smoothMouseX, translateY: smoothMouseY }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-brand-gold/6 rounded-full blur-[120px] translate-y-1/2"
          style={{ y: orb2Y, x: negMouseX, translateY: negMouseY }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-brand-yellow/3 to-transparent rounded-full" />

        {/* Grid pattern - subtle mouse shift */}
        <motion.div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--brand-yellow)) 1px, transparent 1px), 
                            linear-gradient(90deg, hsl(var(--brand-yellow)) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
            x: gridMouseX,
            y: gridMouseY,
          }}
        />
      </motion.div>

      {/* Main content with parallax */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto text-center"
        style={{ y: contentY, opacity, scale }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 px-4 py-2.5 mb-8 bg-secondary/40 backdrop-blur-sm border border-border/40 rounded-full"
        >
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-sm font-medium text-foreground/80">
            Available for new projects
          </span>
          <div className="h-4 w-px bg-border/50" />
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-3.5 h-3.5 text-brand-yellow fill-brand-yellow"
              />
            ))}
          </div>
        </motion.div>

        {/* Headline with Typewriter */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.05] mb-6 tracking-tight"
        >
          We Build{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-brand-yellow via-brand-gold to-brand-yellow bg-clip-text text-transparent">
              {isLoaded ? (
                <TypewriterText
                  texts={[
                    "Digital Products",
                    "Modern Websites",
                    "Mobile Apps",
                    "Brand Experiences",
                    "Growth Engines",
                  ]}
                  speed={100}
                  deleteSpeed={50}
                  pauseDuration={2500}
                  cursor={true}
                  cursorChar="▎"
                />
              ) : (
                "Digital Products"
              )}
            </span>
            <motion.svg
              className="absolute -bottom-1 left-0 w-full"
              viewBox="0 0 300 12"
              initial={{ pathLength: 0 }}
              animate={isLoaded ? { pathLength: 1 } : {}}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <motion.path
                d="M2 8 Q75 2 150 8 T298 6"
                stroke="url(#underline-gradient)"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
              <defs>
                <linearGradient
                  id="underline-gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="hsl(48 100% 50%)" />
                  <stop offset="100%" stopColor="hsl(38 95% 50%)" />
                </linearGradient>
              </defs>
            </motion.svg>
          </span>
          <br />
          <span className="text-muted-foreground font-medium">
            That People Love
          </span>
        </motion.h1>

        {/* Scroll-driven narrative subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Transform your ideas into exceptional digital experiences. We craft
          modern websites, web apps, and digital solutions that drive growth and
          inspire users.
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
            className="group relative inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-brand-yellow to-brand-gold text-primary-foreground font-semibold rounded-full shadow-xl shadow-brand-yellow/20 overflow-hidden"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 20px 40px -12px hsl(48 100% 50% / 0.35)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Start Your Project</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-gold to-brand-yellow opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.a>

          <motion.a
            href="#portfolio"
            className="group inline-flex items-center gap-2.5 px-8 py-4 bg-secondary/60 hover:bg-secondary text-foreground font-semibold rounded-full border border-border/40 hover:border-border transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-8 h-8 rounded-full bg-brand-yellow/10 flex items-center justify-center">
              <Play className="w-4 h-4 text-brand-yellow ml-0.5" />
            </div>
            <span>View Our Work</span>
          </motion.a>
        </motion.div>

        {/* Stats with 3D tilt */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-14"
        >
          {stats.map((stat, index) => (
            <CountUpStat key={stat.label} stat={stat} index={index} isLoaded={isLoaded} />
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        className="absolute bottom-8 left-0 right-0 flex flex-col items-center justify-center cursor-pointer group"
        initial={{ opacity: 0, y: 20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1, duration: 0.6 }}
        onClick={(e) => {
          e.preventDefault();
          document
            .getElementById("about")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="text-xs font-medium text-muted-foreground mb-2 group-hover:text-foreground transition-colors">
          Scroll to explore
        </span>
        <motion.div className="w-7 h-11 rounded-full border-2 border-border/40 group-hover:border-brand-yellow/40 flex items-start justify-center p-1.5 transition-colors">
          <motion.div
            className="w-1.5 h-2.5 bg-brand-yellow rounded-full"
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.a>
    </section>
  );
};

export default HeroSection;
