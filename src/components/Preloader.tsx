import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  minDuration?: number;
}

const Preloader = ({ minDuration = 1200 }: PreloaderProps) => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = performance.now();

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Ease out the progress
        const increment = Math.max(1, (100 - prev) * 0.1);
        return Math.min(100, prev + increment);
      });
    }, 50);

    const handleReady = () => {
      const elapsedTime = performance.now() - startTime;
      const remainingTime = Math.max(0, minDuration - elapsedTime);

      // Complete progress quickly
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

    if ("performance" in window) {
      performance.mark("app-preloader-start");
    }

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
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Floating orbs */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-[80px]"
              animate={{
                x: [0, 50, 0],
                y: [0, -30, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-primary/5 blur-[100px]"
              animate={{
                x: [0, -40, 0],
                y: [0, 40, 0],
                scale: [1.2, 1, 1.2],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/8 blur-[120px]"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.05)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo with pulse animation */}
            <motion.div
              className="relative mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Glow ring */}
              <motion.div
                className="absolute inset-0 -m-4 rounded-full bg-gradient-to-r from-primary/30 to-primary/10 blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Logo container */}
              <motion.div
                className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-2xl shadow-primary/30"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-3xl font-bold text-primary-foreground">E</span>
              </motion.div>
            </motion.div>

            {/* Brand name with staggered animation */}
            <motion.div
              className="flex items-center gap-1 mb-8"
              initial="hidden"
              animate="visible"
            >
              {"EllowDigital".split("").map((char, index) => (
                <motion.span
                  key={index}
                  className={`text-2xl font-bold ${
                    index < 5 ? "text-primary" : "text-foreground"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
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

            {/* Animated spinner */}
            <motion.div
              className="relative w-16 h-16 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {/* Outer ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Spinning arc */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Inner pulsing dot */}
              <motion.div
                className="absolute inset-0 m-auto w-3 h-3 rounded-full bg-primary"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Progress bar */}
            <motion.div
              className="w-48 h-1 rounded-full bg-secondary/50 overflow-hidden"
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

            {/* Loading text */}
            <motion.p
              className="text-sm text-muted-foreground mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Loading amazing things...
            </motion.p>
          </div>

          {/* Decorative floating particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-primary/30"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 3) * 20}%`,
                }}
                animate={{
                  y: [-20, 20, -20],
                  x: [-10, 10, -10],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
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
