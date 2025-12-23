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
  ExternalLink,
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
      icon: <Mail className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
    {
      href: "tel:+918960446756",
      label: "Phone",
      icon: <Phone className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
    {
      href: "https://instagram.com/ellowdigital",
      label: "Instagram",
      icon: <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
    {
      href: "https://github.com/ellowdigital",
      label: "Github",
      icon: <Github className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
  ];

  const navSections = [
    {
      title: "Quick Links",
      links: [
        { label: "Home", href: "#home" },
        { label: "About Us", href: "#about" },
        { label: "Services", href: "#services" },
        { label: "Team", href: "/team" },
        { label: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Web Development", href: "#services" },
        { label: "Mobile Apps", href: "#services" },
        { label: "UI/UX Design", href: "#services" },
        { label: "SEO & Performance", href: "#services" },
      ],
    },
  ];

  const legalLinks = [
    { to: "/team", icon: Users, label: "Team" },
    { to: "/privacy-policy", icon: Shield, label: "Privacy" },
    { to: "/terms-of-service", icon: FileText, label: "Terms" },
    { to: "/refund-policy", icon: FileX, label: "Refund" },
    { to: "/cookies-policy", icon: Cookie, label: "Cookies" },
  ];

  return (
    <footer className="w-full bg-gradient-to-b from-background to-secondary/50 text-foreground border-t border-border/40 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
            {/* Branding & Social Links - Full width on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="col-span-2 sm:col-span-2 md:col-span-1"
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <Logo />
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight">
                  Ellow<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80">Digital</span>
                </span>
              </div>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 max-w-xs">
                Crafting innovative digital experiences that empower your brand online.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-2 sm:gap-3">
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
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/10 border border-border/40 hover:border-primary/50 text-muted-foreground hover:text-primary transition-all duration-300"
                    >
                      {icon}
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Navigation Links */}
            {navSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="col-span-1"
              >
                <h4 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80 mb-3 sm:mb-4 text-sm sm:text-base tracking-wide">
                  {section.title}
                </h4>
                <ul className="space-y-2 sm:space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      {link.href.startsWith("/") ? (
                        <Link
                          to={link.href}
                          className="text-muted-foreground hover:text-foreground text-xs sm:text-sm transition-colors duration-200 flex items-center gap-1.5 sm:gap-2 group"
                        >
                          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors flex-shrink-0" />
                          <span className="truncate">{link.label}</span>
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          className="text-muted-foreground hover:text-foreground text-xs sm:text-sm transition-colors duration-200 flex items-center gap-1.5 sm:gap-2 group"
                        >
                          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors flex-shrink-0" />
                          <span className="truncate">{link.label}</span>
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="col-span-1"
            >
              <h4 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80 mb-3 sm:mb-4 text-sm sm:text-base tracking-wide">
                Contact
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <a
                    href="mailto:ellowdigitalindia@gmail.com"
                    className="text-muted-foreground hover:text-foreground text-xs sm:text-sm transition-colors duration-200 flex items-start gap-2 sm:gap-3 group"
                  >
                    <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 text-primary flex-shrink-0" />
                    <span className="break-all leading-tight">ellowdigitalindia@gmail.com</span>
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+918960446756"
                    className="text-muted-foreground hover:text-foreground text-xs sm:text-sm transition-colors duration-200 flex items-start gap-2 sm:gap-3"
                  >
                    <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 text-primary flex-shrink-0" />
                    <span>+91 89604 46756</span>
                  </a>
                </li>
                <li className="flex items-start gap-2 sm:gap-3 text-muted-foreground text-xs sm:text-sm">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 text-primary flex-shrink-0" />
                  <span>India</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3 text-muted-foreground text-xs sm:text-sm">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 text-primary flex-shrink-0" />
                  <span className="leading-tight">Mon - Sat: 10AM - 7PM</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="border-t border-border/40 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6">
            {/* Mobile: Stack everything */}
            <div className="flex flex-col gap-4 sm:gap-5">
              {/* Legal Links - Always visible */}
              <div className="flex flex-wrap gap-x-3 gap-y-2 justify-center order-1 sm:order-none">
                {legalLinks.map(({ to, icon: Icon, label }) => (
                  <Link
                    key={to}
                    to={to}
                    className="text-muted-foreground hover:text-foreground text-[10px] sm:text-xs flex items-center gap-1 sm:gap-1.5 transition-colors duration-200 whitespace-nowrap"
                  >
                    <Icon className="w-3 h-3" />
                    <span>{label}</span>
                  </Link>
                ))}
              </div>

              {/* Copyright & Tagline Row */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 order-2 sm:order-none">
                {/* Copyright */}
                <div className="text-muted-foreground text-[10px] sm:text-xs lg:text-sm text-center sm:text-left">
                  &copy; {currentYear}{" "}
                  <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80">
                    EllowDigital
                  </span>
                  . All Rights Reserved.
                </div>

                {/* Tagline */}
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80 font-semibold text-[10px] sm:text-xs lg:text-sm whitespace-nowrap">
                  Making Digital Simple.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
