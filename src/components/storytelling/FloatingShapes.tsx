import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface FloatingShapesProps {
  variant?: "hero" | "section" | "minimal";
  className?: string;
}

const FloatingShapes = ({
  variant = "hero",
  className = "",
}: FloatingShapesProps) => {
  const isMobile = useIsMobile();

  const shapes = {
    hero: [
      {
        type: "sphere",
        size: 120,
        x: "10%",
        y: "20%",
        delay: 0,
        duration: 18,
        color: "primary",
      },
      {
        type: "torus",
        size: 80,
        x: "85%",
        y: "15%",
        delay: 2,
        duration: 22,
        color: "brand-yellow",
      },
      {
        type: "cube",
        size: 60,
        x: "75%",
        y: "70%",
        delay: 1,
        duration: 15,
        color: "brand-gold",
      },
      {
        type: "sphere",
        size: 40,
        x: "20%",
        y: "75%",
        delay: 3,
        duration: 20,
        color: "primary",
      },
      {
        type: "ring",
        size: 90,
        x: "50%",
        y: "10%",
        delay: 0.5,
        duration: 25,
        color: "brand-yellow",
      },
      {
        type: "diamond",
        size: 50,
        x: "90%",
        y: "50%",
        delay: 1.5,
        duration: 16,
        color: "brand-gold",
      },
    ],
    section: [
      {
        type: "sphere",
        size: 60,
        x: "5%",
        y: "30%",
        delay: 0,
        duration: 20,
        color: "primary",
      },
      {
        type: "cube",
        size: 40,
        x: "90%",
        y: "20%",
        delay: 1,
        duration: 18,
        color: "brand-yellow",
      },
      {
        type: "ring",
        size: 50,
        x: "80%",
        y: "75%",
        delay: 2,
        duration: 22,
        color: "brand-gold",
      },
    ],
    minimal: [
      {
        type: "sphere",
        size: 40,
        x: "8%",
        y: "25%",
        delay: 0,
        duration: 22,
        color: "primary",
      },
      {
        type: "diamond",
        size: 30,
        x: "92%",
        y: "60%",
        delay: 1.5,
        duration: 18,
        color: "brand-yellow",
      },
    ],
  };

  // On mobile: reduce shapes count and sizes for better FPS
  const getShapes = () => {
    const allShapes = shapes[variant];
    if (!isMobile) return allShapes;

    // On mobile: take only first 2 shapes for hero/section, 1 for minimal
    const limit = variant === "minimal" ? 1 : 2;
    return allShapes.slice(0, limit).map((s) => ({
      ...s,
      size: Math.round(s.size * 0.6),
      duration: s.duration * 1.3, // slower = less CPU
    }));
  };

  const activeShapes = getShapes();

  const renderShape = (shape: (typeof shapes.hero)[0], index: number) => {
    const baseClasses = "absolute pointer-events-none will-change-transform";
    const colorMap: Record<string, string> = {
      primary: "hsl(var(--primary) / 0.12)",
      "brand-yellow": "hsl(var(--brand-yellow) / 0.1)",
      "brand-gold": "hsl(var(--brand-gold) / 0.08)",
    };

    const borderColor: Record<string, string> = {
      primary: "hsl(var(--primary) / 0.2)",
      "brand-yellow": "hsl(var(--brand-yellow) / 0.15)",
      "brand-gold": "hsl(var(--brand-gold) / 0.12)",
    };

    const shapeStyles: Record<string, React.CSSProperties> = {
      sphere: {
        width: shape.size,
        height: shape.size,
        borderRadius: "50%",
        background: `radial-gradient(circle at 30% 30%, ${
          colorMap[shape.color]
        }, transparent)`,
        border: `1px solid ${borderColor[shape.color]}`,
      },
      torus: {
        width: shape.size,
        height: shape.size,
        borderRadius: "50%",
        border: `3px solid ${borderColor[shape.color]}`,
        background: "transparent",
        boxShadow: `inset 0 0 ${shape.size / 4}px ${colorMap[shape.color]}`,
      },
      cube: {
        width: shape.size,
        height: shape.size,
        borderRadius: shape.size * 0.15,
        background: colorMap[shape.color],
        border: `1px solid ${borderColor[shape.color]}`,
        transform: "rotate(45deg)",
      },
      ring: {
        width: shape.size,
        height: shape.size,
        borderRadius: "50%",
        border: `2px dashed ${borderColor[shape.color]}`,
        background: "transparent",
      },
      diamond: {
        width: shape.size * 0.7,
        height: shape.size,
        background: colorMap[shape.color],
        border: `1px solid ${borderColor[shape.color]}`,
        clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
      },
    };

    return (
      <motion.div
        key={index}
        className={baseClasses}
        style={{
          left: shape.x,
          top: shape.y,
          ...shapeStyles[shape.type],
          transition:
            "background 0.6s ease, border-color 0.6s ease, box-shadow 0.6s ease",
        }}
        animate={{
          y: [0, -20, 0, 15, 0],
          x: [0, 10, 0, -8, 0],
          rotate:
            shape.type === "ring"
              ? [0, 360]
              : [0, shape.type === "cube" ? 405 : 10, 0, -10, 0],
          scale: [1, 1.05, 1, 0.98, 1],
        }}
        transition={{
          duration: shape.duration,
          repeat: Infinity,
          delay: shape.delay,
          ease: "easeInOut",
        }}
      />
    );
  };

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none -z-10 ${className}`}
    >
      {activeShapes.map((shape, i) => renderShape(shape, i))}
    </div>
  );
};

export default FloatingShapes;
