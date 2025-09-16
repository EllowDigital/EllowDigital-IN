import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Logo from "./Logo";
import SearchModal from "./SearchModal";
import { ChevronDown, Menu, X, Search, Award, Zap, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Why Us", href: "#why-us" },
  { name: "Team", href: "/team" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K to open search
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const updateScroll = () => {
      setIsScrolled(window.scrollY > 10);
      setScrollProgress(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
          100
      );

      if (isHomePage) {
        const sections = document.querySelectorAll("section[id]");
        const offset = window.scrollY + 100;

        // Find active section
        let activeId = "";
        for (const section of sections) {
          const top = (section as HTMLElement).offsetTop;
          const height = (section as HTMLElement).offsetHeight;
          const id = section.getAttribute("id") || "";
          if (offset >= top && offset < top + height) {
            activeId = id;
            break;
          }
        }

        // Only update if different to prevent unnecessary renders
        if (activeId !== activeSection) {
          setActiveSection(activeId);
        }
      }
    };

    // Throttle scroll event for better performance
    let ticking = false;
    const handleScrollThrottled = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScrollThrottled, { passive: true });
    updateScroll();

    return () => window.removeEventListener("scroll", handleScrollThrottled);
  }, [isHomePage, activeSection]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isMobileOpen &&
        navRef.current &&
        !navRef.current.contains(e.target as Node)
      ) {
        setIsMobileOpen(false);
      }
    };

    // Close mobile menu when route changes
    if (isMobileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileOpen]);

  // Handle navigation with smooth scroll
  const handleNavClick = (href: string) => {
    // Always close the mobile menu first
    setIsMobileOpen(false);

    if (href.startsWith("/")) {
      // If it's an internal page link (not a hash)
      navigate(href);
      return;
    }

    if (isHomePage) {
      // If on home page, scroll to the section
      const element = document.querySelector(href);
      if (element) {
        // Add a small delay to ensure mobile menu closing animation completes
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    } else {
      // If on another page, navigate to home and then to section
      navigate("/");
      // Add a small delay to allow the home page to load before scrolling
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => setIsMobileOpen((prev) => !prev);

  // Animation variants
  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
    exit: { opacity: 0, height: 0 },
  };

  // Decorative elements animation variants
  const decorVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 0.7, scale: 1, transition: { duration: 0.5 } },
    hover: { scale: 1.1, opacity: 0.9, transition: { duration: 0.3 } },
  };

  return (
    <>
      {/* Yellow Scroll Indicator */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-brand-yellow z-50"
        style={{ width: `${scrollProgress}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{ ease: "linear" }}
      />

      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          isScrolled
            ? "bg-black/90 shadow-md backdrop-blur-xl border-b border-brand-yellow/10"
            : "bg-black/70 backdrop-blur-md"
        }`}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-10 -right-10 w-20 h-20 bg-brand-yellow/5 rounded-full blur-xl"
            initial="initial"
            animate="animate"
            variants={decorVariants}
          />
          <motion.div
            className="absolute -bottom-12 left-1/4 w-24 h-24 bg-brand-yellow/5 rounded-full blur-xl"
            initial="initial"
            animate="animate"
            variants={decorVariants}
            style={{ animationDelay: "0.2s" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between relative">
          <Link to="/" className="flex items-center gap-2 z-10">
            <Logo />
            <div className="flex flex-col text-left">
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-brand-yellow to-brand-gold text-transparent bg-clip-text">
                Ellow<span className="text-foreground">Digital</span>
              </span>
              <span className="text-xs text-muted-foreground -mt-1">
                Digital Excellence, Indian Brilliance
              </span>
            </div>
          </Link>

          {/* Desktop Menu with enhanced styling */}
          <div className="hidden lg:flex gap-4 xl:gap-5 items-center">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`relative px-3 xl:px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  (isHomePage && activeSection === link.href.substring(1)) ||
                  (!isHomePage && location.pathname === link.href)
                    ? "text-brand-yellow"
                    : "text-white hover:text-brand-yellow"
                } group`}
              >
                {link.name}
                <span
                  className={`absolute left-0 bottom-0 h-0.5 bg-brand-yellow transition-all duration-300 ${
                    (isHomePage && activeSection === link.href.substring(1)) ||
                    (!isHomePage && location.pathname === link.href)
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            ))}

            {/* Enhanced Action Buttons */}
            <div className="flex items-center gap-3 ml-2">
              <button
                className="p-2 rounded-full hover:bg-white/10 transition-all duration-300"
                aria-label="Search"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="w-4 h-4 text-white/80 hover:text-brand-yellow" />
              </button>

              <div className="flex items-center text-xs text-white/70">
                <MapPin className="w-3 h-3 mr-1 text-brand-yellow" />
                <span>India</span>
              </div>
            </div>

            <button
              onClick={() => handleNavClick("#contact")}
              className="group relative px-5 py-2 overflow-hidden bg-brand-yellow text-black font-bold rounded-full shadow hover:shadow-lg transition-all duration-300"
            >
              <span className="relative z-10 flex items-center">
                Get Started
                <ChevronDown className="w-4 h-4 ml-1 group-hover:rotate-180 transition-transform duration-300" />
              </span>
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            </button>
          </div>

          {/* Mobile Toggle Button with enhanced styling */}
          <button
            className="lg:hidden text-brand-yellow p-2 relative"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileOpen}
          >
            <div className="absolute -inset-1 bg-brand-yellow/10 rounded-full blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            {isMobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Enhanced Mobile Menu Panel with AnimatePresence for smoother transitions */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              className="lg:hidden bg-gradient-to-b from-black/95 to-black/90 border-t border-brand-yellow/10 py-2 px-2 space-y-1 overflow-hidden"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2 }}
            >
              {NAV_LINKS.map((link) => (
                <motion.button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`block w-full text-center py-3 px-4 rounded-lg text-base font-medium transition-all duration-300 ${
                    (isHomePage && activeSection === link.href.substring(1)) ||
                    (!isHomePage && location.pathname === link.href)
                      ? "bg-brand-yellow/10 text-brand-yellow"
                      : "text-white hover:bg-brand-yellow/5 hover:text-brand-yellow"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {link.name}
                </motion.button>
              ))}

              {/* Search button for mobile */}
              <motion.button
                onClick={() => {
                  setIsMobileOpen(false);
                  setIsSearchOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-base font-medium text-white hover:bg-white/5"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </motion.button>

              <motion.button
                onClick={() => handleNavClick("#contact")}
                className="block w-full text-center py-3 mt-2 bg-brand-yellow text-black font-bold rounded-lg shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started
              </motion.button>

              {/* Additional elements with yellow theme */}
              <div className="flex justify-center items-center gap-4 mt-4 pt-4 border-t border-white/10">
                <motion.div
                  className="flex items-center gap-2 text-white/70 text-sm"
                  whileHover={{ scale: 1.05 }}
                >
                  <Award className="w-4 h-4 text-brand-yellow" />
                  <span>Indian Excellence</span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-2 text-white/70 text-sm"
                  whileHover={{ scale: 1.05 }}
                >
                  <Zap className="w-4 h-4 text-brand-yellow" />
                  <span>24/7 Support</span>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Search Modal */}
      <SearchModal open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </>
  );
};

export default Navbar;
