import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FloatingShapes } from "./storytelling";

interface PreloaderProps {
  minDuration?: number;
}

const typewriterTexts = [
  "Crafting digital experiences...",
  "Loading amazing things...",
  "Building something special...",
];

const Preloader = ({ minDuration = 1200 }: PreloaderProps) => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");

  // Typewriter effect
  useEffect(() => {
    if (!visible) return;
    const currentText = typewriterTexts[textIndex];
    let charIndex = 0;
    const interval = setInterval(() => {
      if (charIndex <= currentText.length) {
        setDisplayText(currentText.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setTextIndex((prev) => (prev + 1) % typewriterTexts.length);
        }, 800);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [textIndex, visible]);

  useEffect(() => {
    const startTime = performance.now();

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const increment = Math.max(1, (100 - prev) * 0.1);
        return Math.min(100, prev + increment);
      });
    }, 50);

    const handleReady = () => {
      const elapsedTime = performance.now() - startTime;
      const remainingTime = Math.max(0, minDuration - elapsedTime);
      setProgress(100);

      setTimeout(() => {
        setVisible(false);
        if ("performance" in window) {
          performance.mark("app-preloader-end");
          try {
            performance.measure(
              "app-preloader-duration",
              "app-preloader-start",
              "app-preloader-end"
            );
          } catch (e) {
            console.error("Performance measurement error:", e);
          }
        }
      }, remainingTime);
    };

    if ("performance" in window) performance.mark("app-preloader-start");

    if (document.readyState === "complete") {
      handleReady();
    } else {
      window.addEventListener("load", handleReady);
    }

    return () => {
      window.removeEventListener("load", handleReady);
      clearInterval(progressInterval);
    };
  }, [minDuration]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="preloader"
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
          }}
          aria-label="Loading"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          {/* 3D Floating shapes background */}
          <FloatingShapes variant="hero" />

          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.05)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* 3D Rotating Logo */}
            <motion.div
              className="relative mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ perspective: "600px" }}
            >
              {/* Glow ring */}
              <motion.div
                className="absolute inset-0 -m-6 rounded-full bg-gradient-to-r from-primary/30 to-primary/10 blur-xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* 3D Logo container */}
              <motion.div
                className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-2xl shadow-primary/30"
                animate={{
                  rotateY: [0, 360],
                  rotateX: [0, 15, 0, -15, 0],
                }}
                transition={{
                  rotateY: { duration: 3, repeat: Infinity, ease: "linear" },
                  rotateX: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <span className="text-4xl font-bold text-primary-foreground">
                  E
                </span>
              </motion.div>

              {/* Orbiting ring */}
              <motion.div
                className="absolute inset-0 -m-3 rounded-full border-2 border-dashed border-primary/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>

            {/* Brand name with staggered animation */}
            <motion.div
              className="flex items-center gap-0.5 mb-6"
              initial="hidden"
              animate="visible"
            >
              {"EllowDigital".split("").map((char, index) => (
                <motion.span
                  key={index}
                  className={`text-2xl sm:text-3xl font-bold ${
                    index < 5 ? "text-primary" : "text-foreground"
                  }`}
                  initial={{ opacity: 0, y: 20, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.3 + index * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>

            {/* Typewriter loading text */}
            <motion.div
              className="h-6 mb-6 flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <p className="text-sm text-muted-foreground">
                {displayText}
                <motion.span
                  className="inline-block text-primary ml-0.5"
                  animate={{ opacity: [1, 0] }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  |
                </motion.span>
              </p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              className="w-48 h-1.5 rounded-full bg-secondary/50 overflow-hidden"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 192 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>

            {/* Progress percentage */}
            <motion.p
              className="text-xs text-muted-foreground/60 mt-2 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {Math.round(progress)}%
            </motion.p>
          </div>

          {/* Decorative floating particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-primary/20"
                style={{
                  left: `${15 + i * 10}%`,
                  top: `${25 + (i % 4) * 15}%`,
                }}
                animate={{
                  y: [-20, 20, -20],
                  x: [-10, 10, -10],
                  opacity: [0.2, 0.5, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 3 + i * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
