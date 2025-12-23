import { Moon, Sun, Stars } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else if (prefersDark) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, []);

  const toggleTheme = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const newValue = !isDark;
    setIsDark(newValue);
    
    if (newValue) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    
    setTimeout(() => setIsAnimating(false), 600);
  };

  if (!mounted) {
    return (
      <div className="p-2.5 rounded-full bg-secondary/50 border border-border/30 w-10 h-10" />
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2.5 rounded-full bg-secondary/50 hover:bg-secondary border border-border/30 transition-all duration-300 group overflow-hidden"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        initial={false}
        animate={{
          background: isDark 
            ? "radial-gradient(circle, hsl(48 100% 50% / 0.2) 0%, transparent 70%)"
            : "radial-gradient(circle, hsl(38 95% 50% / 0.3) 0%, transparent 70%)",
        }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Rotating rays for sun */}
      <AnimatePresence mode="wait">
        {!isDark && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: 360 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 h-2 bg-brand-gold/40 rounded-full"
                style={{
                  transformOrigin: "center 12px",
                  rotate: `${i * 45}deg`,
                }}
                animate={{ 
                  opacity: [0.3, 0.7, 0.3],
                  scaleY: [0.8, 1.2, 0.8],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: i * 0.1,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Stars for dark mode */}
      <AnimatePresence>
        {isDark && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-brand-yellow rounded-full"
                style={{
                  top: `${20 + i * 25}%`,
                  left: `${15 + i * 30}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0.4, 1, 0.4],
                  scale: [0.5, 1, 0.5],
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ 
                  duration: 1.5 + i * 0.5, 
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Main icon */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="sun"
              initial={{ rotate: -90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Sun className="w-4 h-4 text-brand-yellow group-hover:text-brand-gold transition-colors" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: 90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Moon className="w-4 h-4 text-brand-gold group-hover:text-brand-yellow transition-colors" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Ripple effect on click */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            className="absolute inset-0 rounded-full"
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 2.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              background: isDark 
                ? "radial-gradient(circle, hsl(48 100% 50% / 0.4) 0%, transparent 70%)"
                : "radial-gradient(circle, hsl(220 20% 20% / 0.3) 0%, transparent 70%)",
            }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default ThemeToggle;
