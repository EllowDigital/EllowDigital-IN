import { useEffect, useCallback } from "react";

const NAVBAR_HEIGHT = 80; // Offset for fixed navbar

export const smoothScrollTo = (targetId: string, offset = NAVBAR_HEIGHT) => {
  const element = document.getElementById(targetId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

export const useSmoothScroll = () => {
  const handleAnchorClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
    
    if (anchor) {
      const href = anchor.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        e.preventDefault();
        const targetId = href.slice(1);
        smoothScrollTo(targetId);
        
        // Update URL without jumping
        window.history.pushState(null, "", href);
      }
    }
  }, []);

  useEffect(() => {
    // Add global click listener for anchor links
    document.addEventListener("click", handleAnchorClick);

    // Handle initial hash on page load
    const hash = window.location.hash;
    if (hash && hash.length > 1) {
      setTimeout(() => {
        smoothScrollTo(hash.slice(1));
      }, 100);
    }

    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, [handleAnchorClick]);

  return { smoothScrollTo };
};

export default useSmoothScroll;
