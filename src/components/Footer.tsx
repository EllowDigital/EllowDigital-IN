import {
  Mail,
  Phone,
  Instagram,
  Github,
  Shield,
  FileText,
  Users,
  Cookie,
  FileX,
  MapPin,
  Clock,
  ArrowUp,
} from "lucide-react";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      href: "mailto:ellowdigitalindia@gmail.com",
      label: "Mail",
      icon: <Mail className="w-4 h-4" />,
    },
    {
      href: "tel:+918960446756",
      label: "Phone",
      icon: <Phone className="w-4 h-4" />,
    },
    {
      href: "https://instagram.com/ellowdigital",
      label: "Instagram",
      icon: <Instagram className="w-4 h-4" />,
    },
    {
      href: "https://github.com/ellowdigital",
      label: "Github",
      icon: <Github className="w-4 h-4" />,
    },
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
    { to: "/team", icon: Users, label: "Team" },
    { to: "/privacy-policy", icon: Shield, label: "Privacy" },
    { to: "/terms-of-service", icon: FileText, label: "Terms" },
    { to: "/refund-policy", icon: FileX, label: "Refund" },
    { to: "/cookies-policy", icon: Cookie, label: "Cookies" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-gradient-to-b from-background to-card text-foreground border-t border-border/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-brand-yellow/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-brand-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="sm:col-span-2 lg:col-span-1"
            >
              {/* Logo */}
              <div className="flex items-center gap-2 mb-4">
                <Logo />
                <span className="text-xl font-extrabold tracking-tight">
                  <span className="text-brand-yellow">Ellow</span>
                  <span className="text-foreground">Digital</span>
                </span>
              </div>
              
              {/* Tagline */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Crafting innovative digital experiences that empower your brand online.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-2">
                {socialLinks.map(({ href, label, icon }) => {
                  const isExternal = href.startsWith("http");
                  return (
                    <motion.a
                      key={label}
                      href={href}
                      aria-label={label}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer noopener" : undefined}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 rounded-lg flex items-center justify-center bg-secondary/80 border border-border/50 hover:border-brand-yellow/50 hover:bg-brand-yellow/10 text-muted-foreground hover:text-brand-yellow transition-all duration-300"
                    >
                      {icon}
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="font-bold text-brand-yellow mb-5 text-sm uppercase tracking-wider">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("/") ? (
                      <Link
                        to={link.href}
                        className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200 flex items-center gap-2 group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow/60 group-hover:bg-brand-yellow transition-colors" />
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200 flex items-center gap-2 group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow/60 group-hover:bg-brand-yellow transition-colors" />
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="font-bold text-brand-yellow mb-5 text-sm uppercase tracking-wider">
                Services
              </h4>
              <ul className="space-y-3">
                {serviceLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow/60 group-hover:bg-brand-yellow transition-colors" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="font-bold text-brand-yellow mb-5 text-sm uppercase tracking-wider">
                Contact
              </h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="mailto:ellowdigitalindia@gmail.com"
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200 flex items-start gap-3 group"
                  >
                    <Mail className="w-4 h-4 mt-0.5 text-brand-yellow flex-shrink-0" />
                    <span className="break-all">ellowdigitalindia@gmail.com</span>
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+918960446756"
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200 flex items-center gap-3"
                  >
                    <Phone className="w-4 h-4 text-brand-yellow flex-shrink-0" />
                    <span>+91 89604 46756</span>
                  </a>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground text-sm">
                  <MapPin className="w-4 h-4 text-brand-yellow flex-shrink-0" />
                  <span>India</span>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground text-sm">
                  <Clock className="w-4 h-4 text-brand-yellow flex-shrink-0" />
                  <span>Mon - Sat: 10AM - 7PM</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Back to Top Button */}
        <div className="flex justify-end px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-4 mb-4">
          <motion.button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-lg bg-secondary/80 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-brand-yellow hover:border-brand-yellow/50 transition-all duration-300"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Footer Bottom Bar */}
        <div className="border-t border-border/30 bg-secondary/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex flex-col gap-4">
              {/* Legal Links */}
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
                {legalLinks.map(({ to, icon: Icon, label }) => (
                  <Link
                    key={to}
                    to={to}
                    className="text-muted-foreground hover:text-foreground text-xs flex items-center gap-1.5 transition-colors duration-200"
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{label}</span>
                  </Link>
                ))}
              </div>

              {/* Copyright & Tagline */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-muted-foreground text-xs text-center sm:text-left">
                  &copy; {currentYear}{" "}
                  <span className="font-semibold text-brand-yellow">EllowDigital</span>. All Rights Reserved.
                </p>
                <p className="text-brand-yellow font-semibold text-xs">
                  Making Digital Simple.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
