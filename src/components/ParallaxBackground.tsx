import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: "up" | "down";
}

const ParallaxBackground = ({
  children,
  className = "",
  speed = 0.3,
  direction = "up",
}: ParallaxBackgroundProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const multiplier = direction === "up" ? -1 : 1;
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 200 * speed * multiplier]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.3, 1, 1, 0.3]
  );

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div className="absolute inset-0 -z-10" style={{ y, opacity }}>
        {/* Gradient orbs with parallax */}
        <motion.div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100 * speed]) }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[80px]"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -80 * speed]) }}
        />
      </motion.div>
      {children}
    </div>
  );
};

export default ParallaxBackground;
