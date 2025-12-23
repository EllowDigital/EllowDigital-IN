import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

// Smooth easing curve for professional feel
const smoothEase = [0.22, 1, 0.36, 1] as [number, number, number, number];

const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 24,
    scale: 0.98,
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: smoothEase,
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -16,
    scale: 0.99,
    transition: {
      duration: 0.35,
      ease: smoothEase,
    },
  },
};

// Overlay animation for smooth transition effect
const overlayVariants: Variants = {
  initial: {
    scaleY: 1,
    originY: 0,
  },
  enter: {
    scaleY: 0,
    transition: {
      duration: 0.6,
      ease: smoothEase,
      delay: 0.1,
    },
  },
  exit: {
    scaleY: 1,
    originY: 1,
    transition: {
      duration: 0.4,
      ease: smoothEase,
    },
  },
};

const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <div className="relative">
      {/* Animated overlay for smooth wipe effect */}
      <motion.div
        className="fixed inset-0 z-50 bg-gradient-to-b from-primary/90 to-primary pointer-events-none"
        variants={overlayVariants}
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
