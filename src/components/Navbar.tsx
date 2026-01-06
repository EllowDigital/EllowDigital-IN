import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Logo from "./Logo";
import SearchModal from "./SearchModal";
import ThemeToggle from "./ThemeToggle";
import { Menu, X, Search, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { name: "Home", href: "#home", key: "1" },
  { name: "About", href: "#about", key: "2" },
  { name: "Services", href: "#services", key: "3" },
  { name: "Portfolio", href: "#portfolio", key: "4" },
  { name: "Why Us", href: "#why-us", key: "5" },
  { name: "Team", href: "/team", key: "6" },
  { name: "Contact", href: "#contact", key: "7" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const navRef = useRef<HTMLElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  const handleNavClick = useCallback(
    (href: string) => {
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
    },
    [isHomePage, navigate]
  );

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Search shortcut
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
        return;
      }

      // Number keys for quick navigation
      if (e.key >= "1" && e.key <= "7" && (e.altKey || e.ctrlKey)) {
        e.preventDefault();
        const link = NAV_LINKS.find((l) => l.key === e.key);
        if (link) {
          handleNavClick(link.href);
        }
        return;
      }

      // Escape to close mobile menu
      if (e.key === "Escape") {
        if (isMobileOpen) {
          setIsMobileOpen(false);
        }
        return;
      }

      // Arrow key navigation in navbar
      if (!navLinksRef.current) return;
      const navButtons = navLinksRef.current.querySelectorAll("button");

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        const nextIndex =
          focusedIndex < NAV_LINKS.length - 1 ? focusedIndex + 1 : 0;
        setFocusedIndex(nextIndex);
        (navButtons[nextIndex] as HTMLButtonElement)?.focus();
      }

      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        const prevIndex =
          focusedIndex > 0 ? focusedIndex - 1 : NAV_LINKS.length - 1;
        setFocusedIndex(prevIndex);
        (navButtons[prevIndex] as HTMLButtonElement)?.focus();
      }

      // Home key goes to first item
      if (e.key === "Home") {
        e.preventDefault();
        setFocusedIndex(0);
        (navButtons[0] as HTMLButtonElement)?.focus();
      }

      // End key goes to last item
      if (e.key === "End") {
        e.preventDefault();
        setFocusedIndex(NAV_LINKS.length - 1);
        (navButtons[NAV_LINKS.length - 1] as HTMLButtonElement)?.focus();
      }
    },
    [focusedIndex, handleNavClick, isMobileOpen]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

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
      // Prevent body scroll when mobile menu is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const toggleMobileMenu = () => setIsMobileOpen((prev) => !prev);

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 h-0.5 bg-gradient-to-r from-primary via-primary/80 to-primary z-[60]"
        style={{ width: `${scrollProgress}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{ ease: "linear" }}
        aria-hidden="true"
      />

      <nav
        ref={navRef}
        className="fixed top-2 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[95%] max-w-6xl"
        role="navigation"
        aria-label="Main navigation"
      >
        <div
          className={`relative rounded-2xl transition-all duration-500 ${
            isScrolled
              ? "bg-background/95 backdrop-blur-xl shadow-2xl shadow-black/20 border border-border/50"
              : "bg-background/80 backdrop-blur-lg border border-border/30"
          }`}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />

          <div className="relative px-4 sm:px-6 h-16 flex items-center justify-between">
            {/* Logo - Left */}
            <Link
              to="/"
              className="flex items-center gap-2 z-10 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg"
              aria-label="EllowDigital - Go to homepage"
            >
              <Logo />
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-lg font-bold bg-gradient-to-r from-primary to-primary/80 text-transparent bg-clip-text">
                  Ellow<span className="text-foreground">Digital</span>
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Center */}
            <div
              ref={navLinksRef}
              className="hidden lg:flex items-center justify-center absolute left-1/2 -translate-x-1/2"
              role="menubar"
              aria-label="Main menu"
            >
              <div className="flex items-center gap-1 bg-secondary/50 rounded-full px-2 py-1.5 border border-border/30">
                {NAV_LINKS.map((link, index) => {
                  const isActive =
                    (isHomePage && activeSection === link.href.substring(1)) ||
                    (!isHomePage && location.pathname === link.href);

                  return (
                    <button
                      key={link.href}
                      onClick={() => handleNavClick(link.href)}
                      onFocus={() => setFocusedIndex(index)}
                      className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 ${
                        isActive
                          ? "text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      role="menuitem"
                      aria-current={isActive ? "page" : undefined}
                      tabIndex={
                        focusedIndex === index ||
                        (focusedIndex === -1 && index === 0)
                          ? 0
                          : -1
                      }
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute inset-0 bg-primary rounded-full"
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                      )}
                      <span className="relative z-10">{link.name}</span>
                      <span className="sr-only">
                        {" "}
                        (Press Alt+{link.key} for quick access)
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3 z-10">
              {/* Search Button */}
              <button
                className="p-2.5 rounded-full bg-secondary/50 hover:bg-secondary border border-border/30 transition-all duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Search (Ctrl+K)"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </button>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* CTA Button - Desktop */}
              <motion.button
                onClick={() => handleNavClick("#contact")}
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Sparkles className="w-4 h-4" />
                <span>Get Started</span>
              </motion.button>

              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden p-2.5 rounded-full bg-secondary/50 hover:bg-secondary border border-border/30 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                onClick={toggleMobileMenu}
                aria-label={isMobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileOpen}
                aria-controls="mobile-menu"
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
                id="mobile-menu"
                className="lg:hidden border-t border-border/30 overflow-hidden"
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.2 }}
                role="menu"
                aria-label="Mobile navigation"
              >
                <div className="p-4 space-y-2">
                  {NAV_LINKS.map((link, index) => {
                    const isActive =
                      (isHomePage &&
                        activeSection === link.href.substring(1)) ||
                      (!isHomePage && location.pathname === link.href);

                    return (
                      <motion.button
                        key={link.href}
                        onClick={() => handleNavClick(link.href)}
                        className={`block w-full text-left py-3 px-4 rounded-xl text-base font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-foreground hover:bg-secondary"
                        }`}
                        whileTap={{ scale: 0.98 }}
                        role="menuitem"
                        aria-current={isActive ? "page" : undefined}
                        tabIndex={0}
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
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-base font-medium text-muted-foreground hover:bg-secondary transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    whileTap={{ scale: 0.98 }}
                    role="menuitem"
                  >
                    <Search className="w-4 h-4" />
                    <span>Search</span>
                    <span className="text-xs text-muted-foreground/60 ml-auto">
                      ⌘K
                    </span>
                  </motion.button>

                  {/* Mobile CTA */}
                  <motion.button
                    onClick={() => handleNavClick("#contact")}
                    className="w-full flex items-center justify-center gap-2 py-3 mt-2 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    whileTap={{ scale: 0.98 }}
                    role="menuitem"
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

      {/* Keyboard shortcuts help (screen reader only) */}
      <div className="sr-only" aria-live="polite">
        Keyboard shortcuts: Press Ctrl+K to search, Alt+1 through Alt+7 for
        quick navigation, Arrow keys to navigate menu items.
      </div>
    </>
  );
};

export default Navbar;
