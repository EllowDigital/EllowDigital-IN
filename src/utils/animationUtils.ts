// Utility to handle scroll reveal animations with improved performance
export const initScrollRevealAnimations = () => {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15,
  };

  const handleIntersect = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");

        // Add custom animation class based on data attribute
        const animationType = entry.target.getAttribute("data-animation");
        if (animationType) {
          entry.target.classList.add(animationType);
        }

        observer.unobserve(entry.target); // Stop observing once revealed
      }
    });
  };

  const observer = new IntersectionObserver(handleIntersect, observerOptions);

  // Observe all elements with the 'reveal-animate' class
  const elementsToAnimate = document.querySelectorAll(".reveal-animate");
  elementsToAnimate.forEach((element) => observer.observe(element));

  // Parallax effect for background elements
  const parallaxElements = document.querySelectorAll(".parallax");

  const handleParallax = () => {
    const scrollTop = window.scrollY;
    parallaxElements.forEach((element) => {
      const speed = element.getAttribute("data-speed") || "0.5";
      const yPos = -(scrollTop * parseFloat(speed));
      (element as HTMLElement).style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
  };

  // Optimized scroll handler using requestAnimationFrame
  let ticking = false;
  const optimizedHandleParallax = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleParallax();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener("scroll", optimizedHandleParallax, { passive: true });

  // Return cleanup function to remove listeners
  return () => {
    window.removeEventListener("scroll", optimizedHandleParallax);
    elementsToAnimate.forEach((element) => observer.unobserve(element));
  };
};

// Enhanced 3D tilt effect on elements with better mouse tracking
export const init3DTiltEffect = () => {
  const tiltElements = document.querySelectorAll(".tilt-effect");

  const handleMouseMove = (e: MouseEvent, element: Element) => {
    const { left, top, width, height } = element.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    // Enhanced tilt effect with performance optimizations
    const tiltX = (y - 0.5) * 10; // Reduced to 10 degrees for subtler effect
    const tiltY = (x - 0.5) * -10; // Reduced to 10 degrees for subtler effect
    const glarePosition = `${x * 100}% ${y * 100}%`;

    // Use transform3d for hardware acceleration and add subtle scale
    (
      element as HTMLElement
    ).style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.01, 1.01, 1.01) translateZ(0)`;
    (element as HTMLElement).style.transition =
      "transform 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67)";
    (element as HTMLElement).style.willChange = "transform";

    // Enhanced glare effect
    const glareElement = element.querySelector(".glare");
    if (glareElement) {
      (glareElement as HTMLElement).style.backgroundPosition = glarePosition;
      (glareElement as HTMLElement).style.transform = `rotate(${
        tiltY * 0.5
      }deg)`;
    }
  };

  const handleMouseLeave = (element: Element) => {
    (element as HTMLElement).style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1) translateZ(0)";
    (element as HTMLElement).style.transition =
      "transform 0.5s cubic-bezier(0.17, 0.67, 0.83, 0.67)";

    // Reset glare effect
    const glareElement = element.querySelector(".glare");
    if (glareElement) {
      (glareElement as HTMLElement).style.opacity = "0";
      (glareElement as HTMLElement).style.transition = "opacity 0.5s ease-out";
    }
  };

  // Attach events for each tilt element
  const attachEvents = (element: Element) => {
    if (!element.querySelector(".glare")) {
      const glare = document.createElement("div");
      glare.classList.add("glare");
      glare.style.opacity = "0";
      glare.style.transition = "opacity 0.3s ease-out";
      glare.style.pointerEvents = "none";
      element.appendChild(glare);
    }

    const mouseMoveHandler = (e: MouseEvent) => handleMouseMove(e, element);
    const mouseLeaveHandler = () => handleMouseLeave(element);

    element.addEventListener("mousemove", mouseMoveHandler, { passive: true });
    element.addEventListener("mouseleave", mouseLeaveHandler, {
      passive: true,
    });

    // Return cleanup function
    return () => {
      element.removeEventListener("mousemove", mouseMoveHandler);
      element.removeEventListener("mouseleave", mouseLeaveHandler);
    };
  };

  const cleanupFunctions: Array<() => void> = [];
  tiltElements.forEach((element) =>
    cleanupFunctions.push(attachEvents(element))
  );

  // Return cleanup function to remove all event listeners
  return () => {
    cleanupFunctions.forEach((cleanup) => cleanup());
  };
};

// Enhanced 3D floating code editor animation with more realistic movement
export const init3DCodeAnimation = () => {
  const codeElement = document.querySelector(".floating-code-3d");
  if (!codeElement) return () => {}; // Return empty cleanup if element doesn't exist

  const animate = () => {
    const time = Date.now() * 0.001;
    const translateY = Math.sin(time * 0.5) * 8 + Math.sin(time * 0.32) * 3;
    const rotateY = Math.sin(time * 0.3) * 2;
    const rotateX = Math.cos(time * 0.4) * 1.5;

    (
      codeElement as HTMLElement
    ).style.transform = `translateY(${translateY}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateZ(0)`;
    (codeElement as HTMLElement).style.transition =
      "transform 0.1s cubic-bezier(0.25, 0.1, 0.25, 1)";
    (codeElement as HTMLElement).style.willChange = "transform";

    requestAnimationFrame(animate);
  };

  // Start animation
  const animationFrame = requestAnimationFrame(animate);

  // Return cleanup function to cancel animation
  return () => cancelAnimationFrame(animationFrame);
};

// Enhanced typing animation for code elements with more realistic behavior
export const initTypingAnimation = () => {
  const typingElements = document.querySelectorAll("[data-typing]");

  typingElements.forEach((element) => {
    const text = element.getAttribute("data-typing") || "";
    const delay = parseInt(element.getAttribute("data-typing-delay") || "0");
    const speed = parseInt(element.getAttribute("data-typing-speed") || "100");

    let currentText = "";
    let charIndex = 0;

    element.textContent = "";

    setTimeout(() => {
      const typingInterval = setInterval(() => {
        if (charIndex < text.length) {
          const randomFactor = 0.7 + Math.random() * 0.6;
          currentText += text.charAt(charIndex);
          element.textContent = currentText;
          charIndex++;

          if (charIndex < text.length) {
            clearInterval(typingInterval);

            const nextChar = text.charAt(charIndex);
            const isPunctuation = [".", ",", ";", ":", "!", "?"].includes(
              nextChar
            );
            const nextDelay = isPunctuation
              ? speed * 3 * randomFactor
              : speed * randomFactor;

            setTimeout(() => {
              const newTypingInterval = setInterval(() => {
                if (charIndex < text.length) {
                  currentText += text.charAt(charIndex);
                  element.textContent = currentText;
                  charIndex++;
                } else {
                  clearInterval(newTypingInterval);

                  if (element.hasAttribute("data-typing-cursor")) {
                    const cursor = document.createElement("span");
                    cursor.className = "typing-cursor";
                    cursor.textContent = "|";
                    element.appendChild(cursor);

                    setInterval(() => {
                      cursor.style.opacity =
                        cursor.style.opacity === "0" ? "1" : "0";
                    }, 530);
                  }
                }
              }, speed * randomFactor);
            }, nextDelay);
          }
        } else {
          clearInterval(typingInterval);
          if (element.hasAttribute("data-typing-cursor")) {
            const cursor = document.createElement("span");
            cursor.className = "typing-cursor";
            cursor.textContent = "|";
            element.appendChild(cursor);

            setInterval(() => {
              cursor.style.opacity = cursor.style.opacity === "0" ? "1" : "0";
            }, 530);
          }
        }
      }, speed);
    }, delay);
  });

  // No cleanup needed as typing is a one-time animation
  return () => {};
};

// Scroll progress indicator
export const initScrollProgress = () => {
  const progressBar = document.querySelector(".progress-bar");

  const updateProgressBar = () => {
    const scrollPosition = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (scrollPosition / docHeight) * 100;

    if (progressBar) {
      (progressBar as HTMLElement).style.width = `${scrollPercentage}%`;
    }
  };

  window.addEventListener("scroll", updateProgressBar, { passive: true });

  // Return cleanup function to remove scroll event listener
  return () => {
    window.removeEventListener("scroll", updateProgressBar);
  };
};
