import { ReactNode, useEffect, useRef, useState } from "react";

interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  placeholderId?: string;
  minHeight?: number;
  rootMargin?: string;
}

const DEFAULT_MIN_HEIGHT = 360;

const LazySection = ({
  children,
  fallback = null,
  placeholderId,
  minHeight = DEFAULT_MIN_HEIGHT,
  rootMargin = "0px 0px 320px 0px",
}: LazySectionProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || isVisible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            window.dispatchEvent(new Event("lazy-section:visible"));
            observer.disconnect();
          }
        });
      },
      { rootMargin, threshold: 0.15 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [isVisible, rootMargin]);

  return (
    <div
      ref={containerRef}
      id={!isVisible ? placeholderId : undefined}
      aria-busy={!isVisible}
      style={!isVisible ? { minHeight } : undefined}
    >
      {isVisible ? children : fallback}
    </div>
  );
};

export default LazySection;
