import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Logo from "./Logo";
import SearchModal from "./SearchModal";
import ThemeToggle from "./ThemeToggle";
import { Menu, X, Search, Sparkles } from "lucide-react";
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

        if (activeId !== activeSection) {
          setActiveSection(activeId);
        }
      }
    };

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

    if (isMobileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileOpen]);

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);

    if (href.startsWith("/")) {
      navigate(href);
      return;
    }

    if (isHomePage) {
      const element = document.querySelector(href);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    } else {
      navigate("/");
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  };

  const toggleMobileMenu = () => setIsMobileOpen((prev) => !prev);

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <>
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 h-0.5 bg-gradient-to-r from-brand-yellow via-brand-gold to-brand-yellow z-[60]"
        style={{ width: `${scrollProgress}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{ ease: "linear" }}
      />

      <nav
        ref={navRef}
        className={`fixed top-2 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          isScrolled
            ? "w-[95%] max-w-6xl"
            : "w-[98%] max-w-7xl"
        }`}
      >
        <div
          className={`relative rounded-2xl transition-all duration-500 ${
            isScrolled
              ? "bg-background/80 backdrop-blur-xl shadow-2xl shadow-black/20 border border-border/50"
              : "bg-background/60 backdrop-blur-lg border border-border/30"
          }`}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-yellow/5 via-transparent to-brand-yellow/5 pointer-events-none" />
          
          <div className="relative px-4 sm:px-6 h-16 flex items-center justify-between">
            {/* Logo - Left */}
            <Link to="/" className="flex items-center gap-2 z-10 shrink-0">
              <Logo />
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-lg font-bold bg-gradient-to-r from-brand-yellow to-brand-gold text-transparent bg-clip-text">
                  Ellow<span className="text-foreground">Digital</span>
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Center */}
            <div className="hidden lg:flex items-center justify-center absolute left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-1 bg-secondary/50 rounded-full px-2 py-1.5 border border-border/30">
                {NAV_LINKS.map((link) => {
                  const isActive =
                    (isHomePage && activeSection === link.href.substring(1)) ||
                    (!isHomePage && location.pathname === link.href);
                  
                  return (
                    <button
                      key={link.href}
                      onClick={() => handleNavClick(link.href)}
                      className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                        isActive
                          ? "text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute inset-0 bg-brand-yellow rounded-full"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <span className="relative z-10">{link.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3 z-10">
              {/* Search Button */}
              <button
                className="p-2.5 rounded-full bg-secondary/50 hover:bg-secondary border border-border/30 transition-all duration-300 group"
                aria-label="Search"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </button>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* CTA Button - Desktop */}
              <motion.button
                onClick={() => handleNavClick("#contact")}
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-brand-yellow to-brand-gold text-primary-foreground font-semibold rounded-full shadow-lg shadow-brand-yellow/20 hover:shadow-xl hover:shadow-brand-yellow/30 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Sparkles className="w-4 h-4" />
                <span>Get Started</span>
              </motion.button>

              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden p-2.5 rounded-full bg-secondary/50 hover:bg-secondary border border-border/30 transition-all duration-300"
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileOpen}
              >
                {isMobileOpen ? (
                  <X className="h-5 w-5 text-foreground" />
                ) : (
                  <Menu className="h-5 w-5 text-foreground" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileOpen && (
              <motion.div
                className="lg:hidden border-t border-border/30 overflow-hidden"
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.2 }}
              >
                <div className="p-4 space-y-2">
                  {NAV_LINKS.map((link) => {
                    const isActive =
                      (isHomePage && activeSection === link.href.substring(1)) ||
                      (!isHomePage && location.pathname === link.href);
                    
                    return (
                      <motion.button
                        key={link.href}
                        onClick={() => handleNavClick(link.href)}
                        className={`block w-full text-left py-3 px-4 rounded-xl text-base font-medium transition-all duration-300 ${
                          isActive
                            ? "bg-brand-yellow text-primary-foreground"
                            : "text-foreground hover:bg-secondary"
                        }`}
                        whileTap={{ scale: 0.98 }}
                      >
                        {link.name}
                      </motion.button>
                    );
                  })}

                  {/* Mobile Search */}
                  <motion.button
                    onClick={() => {
                      setIsMobileOpen(false);
                      setIsSearchOpen(true);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-base font-medium text-muted-foreground hover:bg-secondary transition-all"
                    whileTap={{ scale: 0.98 }}
                  >
                    <Search className="w-4 h-4" />
                    <span>Search</span>
                    <span className="text-xs text-muted-foreground/60 ml-auto">⌘K</span>
                  </motion.button>

                  {/* Mobile CTA */}
                  <motion.button
                    onClick={() => handleNavClick("#contact")}
                    className="w-full flex items-center justify-center gap-2 py-3 mt-2 bg-gradient-to-r from-brand-yellow to-brand-gold text-primary-foreground font-bold rounded-xl shadow-lg"
                    whileTap={{ scale: 0.98 }}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Get Started</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Search Modal */}
      <SearchModal open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </>
  );
};

export default Navbar;
