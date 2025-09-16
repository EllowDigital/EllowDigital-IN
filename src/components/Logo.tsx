import { useState, useEffect } from "react";

const LOGO_IMG_DARK = "/logo.webp";
const LOGO_ALT = "EllowDigitals Logo";

const Logo = () => {
  const [mounted, setMounted] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const logoSrc = LOGO_IMG_DARK;

  return (
    <div
      aria-label="Company logo"
      className="block outline-none focus:ring-2 focus:ring-brand-yellow rounded transition-shadow"
    >
      <div
        className={`inline-flex items-center select-none overflow-hidden ${
          mounted ? "animate-fade-in" : "opacity-0"
        }`}
        style={{ minHeight: 48 }}
      >
        {!imgError ? (
          <div className="relative">
            <img
              src={logoSrc}
              alt={LOGO_ALT}
              width={160}
              height={48}
              className="h-12 w-auto object-contain transition duration-500"
              style={{
                filter: "drop-shadow(0px 2px 8px rgba(255, 215, 0, 0.3))",
              }}
              loading="eager"
              onError={() => setImgError(true)}
            />
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-yellow/20 to-brand-yellow/10 rounded-full blur-md -z-10"></div>
          </div>
        ) : (
          <span className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-brand-yellow to-brand-gold bg-clip-text text-transparent tracking-wider">
            Ellow<span className="text-foreground">Digital</span>
            <span className="text-xs align-top text-brand-yellow ml-1">
              India
            </span>
          </span>
        )}
      </div>
    </div>
  );
};

export default Logo;
