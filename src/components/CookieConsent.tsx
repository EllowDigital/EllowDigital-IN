import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { Link } from "react-router-dom";

const CookieConsent = () => {
  // Temporarily disabled - set to false to hide banner
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Temporarily disabled cookie banner
    // Uncomment below to re-enable:
    // const consent = localStorage.getItem("cookie-consent");
    // if (!consent) {
    //   const timer = setTimeout(() => setIsVisible(true), 1500);
    //   return () => clearTimeout(timer);
    // }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setIsVisible(false);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-50"
        >
          <div className="relative bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl shadow-black/20 overflow-hidden">
            {/* Gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-yellow via-brand-gold to-brand-yellow" />

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-secondary/80 hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close cookie banner"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-5 pr-12">
              {/* Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-brand-yellow/20 border border-brand-yellow/30 flex items-center justify-center">
                  <Cookie className="w-5 h-5 text-brand-yellow" />
                </div>
                <h3 className="font-bold text-foreground">Cookie Settings</h3>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                We use cookies to enhance your browsing experience and analyze
                site traffic. By clicking "Accept", you consent to our use of
                cookies.{" "}
                <Link
                  to="/cookies-policy"
                  className="text-brand-yellow hover:underline font-medium"
                >
                  Learn more
                </Link>
              </p>

              {/* Buttons */}
              <div className="flex gap-3">
                <motion.button
                  onClick={handleReject}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-secondary/80 hover:bg-secondary border border-border/50 text-foreground text-sm font-medium transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Reject All
                </motion.button>
                <motion.button
                  onClick={handleAccept}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-brand-yellow to-brand-gold text-primary-foreground text-sm font-semibold shadow-lg shadow-brand-yellow/20 hover:shadow-brand-yellow/30 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Accept All
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
