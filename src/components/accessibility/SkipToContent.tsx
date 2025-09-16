import React, { useState } from "react";

export const SkipToContent = () => {
  const [isFocused, setIsFocused] = useState(false);

  const handleSkip = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.setAttribute("tabindex", "-1");
      mainContent.focus();
      setTimeout(() => {
        mainContent.removeAttribute("tabindex");
      }, 1000);
    }
  };

  return (
    <a
      className={`sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground z-50 px-4 py-2 rounded-md focus:outline-none transition-all ${
        isFocused ? "opacity-100" : "opacity-0"
      }`}
      href="#main-content"
      onClick={handleSkip}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      Skip to content
    </a>
  );
};
