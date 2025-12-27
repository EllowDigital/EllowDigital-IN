import { useState } from "react";
import {
  Mail,
  Phone,
  Instagram,
  Github,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Loader2,
} from "lucide-react";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

// Email validation schema
const emailSchema = z.string().trim().email("Please enter a valid email address").max(255);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState("");

  // Smooth scroll to section
  const smoothScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId.replace("#", ""));
    if (element) {
      const offset = 80; // Navbar height offset
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Handle newsletter subscription
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate email
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubscribed(true);
    toast.success("Successfully subscribed to our newsletter!");

    // Reset after animation
    setTimeout(() => {
      setEmail("");
      setIsSubscribed(false);
    }, 3000);
  };

  const socialLinks = [
    { href: "mailto:ellowdigitalindia@gmail.com", label: "Mail", icon: Mail },
    { href: "tel:+918960446756", label: "Phone", icon: Phone },
    { href: "https://instagram.com/ellowdigital", label: "Instagram", icon: Instagram },
    { href: "https://github.com/ellowdigital", label: "Github", icon: Github },
  ];

  const quickLinks = [
    { label: "Home", href: "#home" },
    { label: "About Us", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Team", href: "/team" },
    { label: "Contact", href: "#contact" },
  ];

  const serviceLinks = [
    { label: "Web Development", href: "#services" },
    { label: "Mobile Apps", href: "#services" },
    { label: "UI/UX Design", href: "#services" },
    { label: "SEO & Performance", href: "#services" },
  ];

  const legalLinks = [
    { to: "/team", label: "Team" },
    { to: "/privacy-policy", label: "Privacy" },
    { to: "/terms-of-service", label: "Terms" },
    { to: "/refund-policy", label: "Refund" },
    { to: "/cookies-policy", label: "Cookies" },
  ];

  const contactInfo = [
    { icon: Mail, value: "ellowdigitalindia@gmail.com", href: "mailto:ellowdigitalindia@gmail.com", isLink: true },
    { icon: Phone, value: "+91 89604 46756", href: "tel:+918960446756", isLink: true },
    { icon: MapPin, value: "India", isLink: false },
    { icon: Clock, value: "Mon - Sat: 10AM - 7PM", isLink: false },
  ];

  // Render navigation link with smooth scroll
  const renderNavLink = (link: { label: string; href: string }, className: string) => {
    if (link.href.startsWith("/")) {
      return (
        <Link to={link.href} className={className}>
          <span className="w-1 h-1 rounded-full bg-brand-yellow/50 group-hover:bg-brand-yellow transition-colors hidden sm:block" />
          {link.label}
        </Link>
      );
    }
    return (
      <a
        href={link.href}
        onClick={(e) => smoothScrollTo(e, link.href)}
        className={className}
      >
        <span className="w-1 h-1 rounded-full bg-brand-yellow/50 group-hover:bg-brand-yellow transition-colors hidden sm:block" />
        {link.label}
      </a>
    );
  };

  return (
    <footer className="relative w-full bg-gradient-to-b from-background to-card border-t border-border/30">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 md:w-72 md:h-72 bg-brand-yellow/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 md:w-72 md:h-72 bg-brand-gold/5 rounded-full blur-3xl" />
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          
          {/* Brand Section with Newsletter */}
          <div className="text-center sm:text-left sm:col-span-2 lg:col-span-1">
            {/* Logo */}
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-4">
              <Logo />
              <span className="text-xl font-extrabold tracking-tight">
                <span className="text-brand-yellow">Ellow</span>
                <span className="text-foreground">Digital</span>
              </span>
            </div>
            
            {/* Tagline */}
            <p className="text-muted-foreground text-sm leading-relaxed mb-5 max-w-xs mx-auto sm:mx-0">
              Crafting innovative digital experiences that empower your brand online.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-6">
              {socialLinks.map(({ href, label, icon: Icon }) => {
                const isExternal = href.startsWith("http");
                return (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer noopener" : undefined}
                    className="w-10 h-10 rounded-lg flex items-center justify-center bg-secondary/80 border border-border/50 text-muted-foreground hover:border-brand-yellow/50 hover:bg-brand-yellow/10 hover:text-brand-yellow hover:scale-105 transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>

            {/* Newsletter Form */}
            <div className="max-w-xs mx-auto sm:mx-0">
              <h5 className="font-semibold text-foreground text-sm mb-3">
                Subscribe to Newsletter
              </h5>
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter your email"
                    disabled={isSubmitting || isSubscribed}
                    className={`w-full px-4 py-2.5 pr-12 text-sm rounded-lg bg-secondary/60 border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-yellow/50 ${
                      error
                        ? "border-red-500/50 focus:border-red-500"
                        : isSubscribed
                        ? "border-green-500/50"
                        : "border-border/50 focus:border-brand-yellow/50"
                    }`}
                    maxLength={255}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting || isSubscribed || !email}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-md flex items-center justify-center bg-brand-yellow text-primary-foreground hover:bg-brand-gold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                    aria-label="Subscribe"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : isSubscribed ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Send className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                {error && (
                  <p className="text-xs text-red-500 text-left">{error}</p>
                )}
                {isSubscribed && (
                  <p className="text-xs text-green-500 text-left">
                    Thanks for subscribing!
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="font-bold text-brand-yellow mb-4 text-xs uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label} className="group">
                  {renderNavLink(
                    link,
                    "inline-flex items-center justify-center sm:justify-start gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors duration-200 w-full"
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="text-center sm:text-left">
            <h4 className="font-bold text-brand-yellow mb-4 text-xs uppercase tracking-widest">
              Services
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.label} className="group">
                  {renderNavLink(
                    link,
                    "inline-flex items-center justify-center sm:justify-start gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors duration-200 w-full"
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center sm:text-left">
            <h4 className="font-bold text-brand-yellow mb-4 text-xs uppercase tracking-widest">
              Contact
            </h4>
            <ul className="space-y-3">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                const content = (
                  <span className="inline-flex items-center justify-center sm:justify-start gap-2.5 text-muted-foreground text-sm group-hover:text-foreground transition-colors">
                    <Icon className="w-4 h-4 text-brand-yellow flex-shrink-0" />
                    <span className={item.isLink ? "break-all" : ""}>
                      {item.value}
                    </span>
                  </span>
                );

                return (
                  <li key={index} className="group">
                    {item.isLink ? (
                      <a href={item.href} className="w-full inline-block">
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="relative z-10 border-t border-border/30 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-5">
          <div className="flex flex-col gap-4">
            {/* Legal Links */}
            <nav 
              className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5"
              aria-label="Legal navigation"
            >
              {legalLinks.map(({ to, label }, index) => (
                <span key={to} className="flex items-center gap-3">
                  <Link
                    to={to}
                    className="text-muted-foreground hover:text-foreground text-xs font-medium transition-colors duration-200 hover:underline underline-offset-2"
                  >
                    {label}
                  </Link>
                  {index < legalLinks.length - 1 && (
                    <span className="text-border hidden sm:inline">|</span>
                  )}
                </span>
              ))}
            </nav>

            {/* Copyright & Tagline */}
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 text-center">
              <p className="text-muted-foreground text-xs">
                © {currentYear}{" "}
                <span className="font-semibold text-brand-yellow">EllowDigital</span>. All Rights Reserved.
              </p>
              <p className="text-brand-yellow font-semibold text-xs">
                Making Digital Simple.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Safe area for floating buttons */}
      <div className="h-16 sm:h-0" aria-hidden="true" />
    </footer>
  );
};

export default Footer;
