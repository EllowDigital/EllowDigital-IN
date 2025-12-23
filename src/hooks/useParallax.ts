import { useEffect, useState, useCallback } from "react";
import { useMotionValue, useSpring, useTransform } from "framer-motion";

export const useParallax = (speed: number = 0.5) => {
  const scrollY = useMotionValue(0);
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const smoothScrollY = useSpring(scrollY, springConfig);
  const y = useTransform(smoothScrollY, (value) => value * speed);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.set(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  return { y, scrollY: smoothScrollY };
};

export const useElementParallax = (elementRef: React.RefObject<HTMLElement>, speed: number = 0.3) => {
  const [offset, setOffset] = useState(0);
  const y = useMotionValue(0);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  const handleScroll = useCallback(() => {
    if (!elementRef.current) return;
    
    const rect = elementRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const elementCenter = rect.top + rect.height / 2;
    const viewportCenter = windowHeight / 2;
    const distanceFromCenter = elementCenter - viewportCenter;
    
    y.set(distanceFromCenter * speed);
  }, [elementRef, speed, y]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return { y: springY, offset };
};

export default useParallax;
