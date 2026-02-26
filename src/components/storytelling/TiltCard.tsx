import { useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltAmount?: number;
  glareEnabled?: boolean;
  scale?: number;
}

const TiltCard = ({
  children,
  className = "",
  tiltAmount = 10,
  glareEnabled = true,
  scale = 1.02,
}: TiltCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rY = (mouseX / (rect.width / 2)) * tiltAmount;
    const rX = -(mouseY / (rect.height / 2)) * tiltAmount;

    setRotateX(rX);
    setRotateY(rY);
    setGlarePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePosition({ x: 50, y: 50 });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      animate={{
        rotateX,
        rotateY,
        scale: rotateX !== 0 || rotateY !== 0 ? scale : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
      {glareEnabled && (
        <div
          className="absolute inset-0 rounded-[inherit] pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, hsl(var(--primary) / 0.12), transparent 60%)`,
          }}
        />
      )}
    </motion.div>
  );
};

export default TiltCard;
