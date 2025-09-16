import { useEffect, useState } from "react";

interface PreloaderProps {
  minDuration?: number;
}

const Preloader = ({ minDuration = 800 }: PreloaderProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Track when the page loaded
    const startTime = performance.now();

    const handleReady = () => {
      // Ensure minimum duration for preloader to avoid flashing
      const elapsedTime = performance.now() - startTime;
      const remainingTime = Math.max(0, minDuration - elapsedTime);

      // Schedule hiding the preloader
      setTimeout(() => {
        setVisible(false);

        // Mark the First Contentful Paint for metrics
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

    // Mark the start of preloader for performance measurement
    if ("performance" in window) {
      performance.mark("app-preloader-start");
    }

    if (document.readyState === "complete") {
      handleReady();
    } else {
      window.addEventListener("load", handleReady);
    }

    return () => window.removeEventListener("load", handleReady);
  }, [minDuration]);

  if (!visible) return null;

  return (
    <div
      id="preloader"
      className="desktop-preloader fixed inset-0 z-50 bg-background flex items-center justify-center"
      aria-label="Loading"
      role="progressbar"
    >
      {/* Spinner */}
      <div className="spinner">
        <div className="circle" aria-hidden="true"></div>
      </div>

      {/* Preloader Text with improved accessibility */}
      <div className="preloader-text sr-only">Loading the application</div>
      <div className="preloader-text" aria-hidden="true">
        <span>L</span>
        <span>o</span>
        <span>a</span>
        <span>d</span>
        <span>i</span>
        <span>n</span>
        <span>g</span>
      </div>
    </div>
  );
};

export default Preloader;
