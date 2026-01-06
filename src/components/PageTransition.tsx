import { motion, Variants } from "framer-motion";
import { ReactNode, useState, useEffect } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

// Smooth easing curves
const smoothEase = [0.22, 1, 0.36, 1] as [number, number, number, number];
const bounceEase = [0.68, -0.55, 0.265, 1.55] as [
  number,
  number,
  number,
  number
];

const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.98,
    filter: "blur(4px)",
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: smoothEase,
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    filter: "blur(4px)",
    transition: {
      duration: 0.4,
      ease: smoothEase,
    },
  },
};

// Curtain wipe animation
const curtainVariants: Variants = {
  initial: {
    scaleY: 1,
  },
  enter: {
    scaleY: 0,
    transition: {
      duration: 0.7,
      ease: smoothEase,
      delay: 0.1,
    },
  },
  exit: {
    scaleY: 1,
    transition: {
      duration: 0.5,
      ease: smoothEase,
    },
  },
};

// Gradient line animation
const lineVariants: Variants = {
  initial: {
    scaleX: 0,
    opacity: 1,
  },
  enter: {
    scaleX: 1,
    opacity: 0,
    transition: {
      scaleX: { duration: 0.6, ease: smoothEase },
      opacity: { duration: 0.3, delay: 0.5 },
    },
  },
  exit: {
    scaleX: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: smoothEase,
    },
  },
};

// Particles for visual flair
const ParticleEffect = () => {
  const particles = Array.from({ length: 6 });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary"
          initial={{
            x: `${20 + i * 15}%`,
            y: "100%",
            opacity: 0,
            scale: 0,
          }}
          animate={{
            y: "-20%",
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 0.8,
            delay: i * 0.08,
            ease: smoothEase,
          }}
        />
      ))}
    </div>
  );
};

const PageTransition = ({ children }: PageTransitionProps) => {
  const [showParticles, setShowParticles] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowParticles(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      {/* Main curtain overlay */}
      <motion.div
        className="fixed inset-0 z-50 origin-top pointer-events-none"
        variants={curtainVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/95 to-primary/90" />

        {/* Decorative pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary-foreground)) 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        />

        {/* Center logo/icon placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotate: 10 }}
            transition={{ duration: 0.4, ease: smoothEase }}
            className="w-16 h-16 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, ease: "linear" }}
              className="w-8 h-8 rounded-lg bg-primary-foreground/20"
            />
          </motion.div>
        </div>

        {/* Particles */}
        {showParticles && <ParticleEffect />}
      </motion.div>

      {/* Progress line at bottom of curtain */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-brand-gold to-primary z-50 origin-left pointer-events-none"
        variants={lineVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      />

      {/* Page content */}
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default PageTransition;
