import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollNarrativeProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right" | "scale" | "reveal";
  intensity?: number;
}

const ScrollNarrative = ({
  children,
  className = "",
  direction = "up",
  intensity = 50,
}: ScrollNarrativeProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const transforms = {
    up: {
      y: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [intensity, 0, 0, -intensity * 0.5]),
      opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.3]),
    },
    left: {
      x: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [-intensity, 0, 0, intensity * 0.3]),
      opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.3]),
    },
    right: {
      x: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [intensity, 0, 0, -intensity * 0.3]),
      opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.3]),
    },
    scale: {
      scale: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.85, 1, 1, 0.95]),
      opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.3]),
    },
    reveal: {
      clipPath: useTransform(
        scrollYProgress,
        [0, 0.4],
        ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
      ),
      opacity: useTransform(scrollYProgress, [0, 0.2], [0, 1]),
    },
  };

  const style = transforms[direction] as Record<string, unknown>;

  return (
    <motion.div ref={ref} className={className} style={style}>
      {children}
    </motion.div>
  );
};

export default ScrollNarrative;
