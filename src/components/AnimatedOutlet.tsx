import { useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import PageTransition from "./PageTransition";

const AnimatedOutlet = () => {
  const location = useLocation();
  const outlet = useOutlet();
  const [isFirstMount, setIsFirstMount] = useState(true);

  // Scroll to top on route change with smooth behavior after first load
  useEffect(() => {
    if (isFirstMount) {
      window.scrollTo({ top: 0, behavior: "instant" });
      setIsFirstMount(false);
    } else {
      // Small delay to let exit animation start
      const timer = setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, isFirstMount]);

  return (
    <AnimatePresence mode="wait" initial={true}>
      <PageTransition key={location.pathname}>{outlet}</PageTransition>
    </AnimatePresence>
  );
};

export default AnimatedOutlet;
