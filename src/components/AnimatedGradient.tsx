import { ReactNode } from "react";
import { motion } from "framer-motion";

interface AnimatedGradientTextProps {
  children: ReactNode;
  className?: string;
  gradient?: "primary" | "gold" | "rainbow" | "sunset";
  animate?: boolean;
}

const gradients = {
  primary: "from-primary via-primary/80 to-primary",
  gold: "from-brand-yellow via-brand-gold to-brand-yellow",
  rainbow: "from-violet-500 via-primary to-rose-500",
  sunset: "from-orange-500 via-primary to-yellow-500",
};

export const AnimatedGradientText = ({
  children,
  className = "",
  gradient = "gold",
  animate = true,
}: AnimatedGradientTextProps) => {
  return (
    <span
      className={`relative inline-block bg-gradient-to-r ${
        gradients[gradient]
      } bg-clip-text text-transparent ${
        animate ? "animate-gradient-x bg-[length:200%_auto]" : ""
      } ${className}`}
    >
      {children}
    </span>
  );
};

interface SectionHeaderProps {
  badge?: string;
  badgeIcon?: ReactNode;
  title: string;
  highlightedWord?: string;
  description?: string;
  className?: string;
  gradient?: "primary" | "gold" | "rainbow" | "sunset";
  centered?: boolean;
}

export const AnimatedSectionHeader = ({
  badge,
  badgeIcon,
  title,
  highlightedWord,
  description,
  className = "",
  gradient = "gold",
  centered = true,
}: SectionHeaderProps) => {
  // Split title to insert highlighted word
  const titleParts = highlightedWord ? title.split(highlightedWord) : [title];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`${centered ? "text-center" : ""} mb-12 lg:mb-16 ${className}`}
    >
      {/* Badge */}
      {badge && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-5 py-2 mb-6"
        >
          {badgeIcon}
          <span className="text-sm font-semibold text-primary tracking-wide">
            {badge}
          </span>
        </motion.div>
      )}

      {/* Title with animated gradient */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
        {highlightedWord ? (
          <>
            {titleParts[0]}
            <span className="relative inline-block">
              <AnimatedGradientText gradient={gradient}>
                {highlightedWord}
              </AnimatedGradientText>
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </span>
            {titleParts[1] || ""}
          </>
        ) : (
          <AnimatedGradientText gradient={gradient}>
            {title}
          </AnimatedGradientText>
        )}
      </h2>

      {/* Description */}
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
};

// Animated gradient background for sections
interface GradientBackgroundProps {
  children: ReactNode;
  className?: string;
  variant?: "subtle" | "vibrant" | "dark";
}

export const AnimatedGradientBackground = ({
  children,
  className = "",
  variant = "subtle",
}: GradientBackgroundProps) => {
  const variants = {
    subtle: "from-background via-primary/5 to-background",
    vibrant: "from-primary/10 via-background to-primary/5",
    dark: "from-background via-secondary/20 to-background",
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Animated gradient background */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${variants[variant]}`}
      />

      {/* Animated orbs */}
      <motion.div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[80px] pointer-events-none"
        animate={{
          x: [0, -30, 0],
          y: [0, -20, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default AnimatedGradientText;
