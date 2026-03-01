import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

interface TypewriterTextProps {
  texts: string[];
  className?: string;
  speed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  cursor?: boolean;
  cursorChar?: string;
  loop?: boolean;
  onComplete?: () => void;
}

const TypewriterText = ({
  texts,
  className = "",
  speed = 80,
  deleteSpeed = 40,
  pauseDuration = 2000,
  cursor = true,
  cursorChar = "|",
  loop = true,
  onComplete,
}: TypewriterTextProps) => {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const animate = useCallback(() => {
    const currentText = texts[textIndex];

    if (isPaused) return;

    if (!isDeleting) {
      if (displayText.length < currentText.length) {
        setDisplayText(currentText.slice(0, displayText.length + 1));
      } else {
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          if (loop || textIndex < texts.length - 1) {
            setIsDeleting(true);
          } else {
            onComplete?.();
          }
        }, pauseDuration);
      }
    } else {
      if (displayText.length > 0) {
        setDisplayText(displayText.slice(0, -1));
      } else {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }
    }
  }, [
    displayText,
    isDeleting,
    isPaused,
    textIndex,
    texts,
    speed,
    deleteSpeed,
    pauseDuration,
    loop,
    onComplete,
  ]);

  useEffect(() => {
    const timeout = setTimeout(animate, isDeleting ? deleteSpeed : speed);
    return () => clearTimeout(timeout);
  }, [animate, isDeleting, deleteSpeed, speed]);

  return (
    <span className={className}>
      {displayText}
      {cursor && (
        <motion.span
          className="inline-block text-primary ml-0.5"
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          {cursorChar}
        </motion.span>
      )}
    </span>
  );
};

export default TypewriterText;
