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
      icon: <Mail className="w-5 h-5" />,
    },
    {
      href: "tel:+918960446756",
      label: "Phone",
      icon: <Phone className="w-5 h-5" />,
    },
    {
      href: "https://instagram.com/ellowdigital",
      label: "Instagram",
      icon: <Instagram className="w-5 h-5" />,
    },
    {
      href: "https://github.com/ellowdigital",
      label: "Github",
      icon: <Github className="w-5 h-5" />,
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
    { to: "/team", icon: Users, label: "Our Team" },
    { to: "/privacy-policy", icon: Shield, label: "Privacy Policy" },
    { to: "/terms-of-service", icon: FileText, label: "Terms of Service" },
    { to: "/refund-policy", icon: FileX, label: "Refund Policy" },
    { to: "/cookies-policy", icon: Cookie, label: "Cookies Policy" },
  ];

  return (
    <footer className="w-full bg-gradient-to-b from-background to-black/95 text-foreground border-t border-border/40 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-purple/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-pink/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="section-container max-w-7xl mx-auto px-4 sm:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            {/* Branding & Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="flex items-center gap-3 mb-4">
                <Logo />
                <span className="text-2xl font-extrabold tracking-tight">
                  Ellow<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-pink">Digital</span>
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Crafting innovative digital experiences that empower your brand online.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-3">
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
                      className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-brand-purple/20 to-brand-pink/20 border border-border/40 hover:border-brand-purple/50 text-muted-foreground hover:text-brand-purple transition-all duration-300"
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
              >
                <h4 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-pink mb-4 tracking-wide">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      {link.href.startsWith("/") ? (
                        <Link
                          to={link.href}
                          className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200 flex items-center gap-2 group"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-purple/50 group-hover:bg-brand-purple transition-colors" />
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200 flex items-center gap-2 group"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-purple/50 group-hover:bg-brand-purple transition-colors" />
                          {link.label}
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
            >
              <h4 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-pink mb-4 tracking-wide">
                Contact
              </h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="mailto:ellowdigitalindia@gmail.com"
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200 flex items-start gap-3"
                  >
                    <Mail className="w-4 h-4 mt-0.5 text-brand-purple" />
                    <span>ellowdigitalindia@gmail.com</span>
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+918960446756"
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200 flex items-start gap-3"
                  >
                    <Phone className="w-4 h-4 mt-0.5 text-brand-purple" />
                    <span>+91 89604 46756</span>
                  </a>
                </li>
                <li className="flex items-start gap-3 text-muted-foreground text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 text-brand-purple" />
                  <span>India</span>
                </li>
                <li className="flex items-start gap-3 text-muted-foreground text-sm">
                  <Clock className="w-4 h-4 mt-0.5 text-brand-purple" />
                  <span>Mon - Sat: 10AM - 7PM IST</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="border-t border-border/40 bg-black/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              {/* Copyright */}
              <div className="text-muted-foreground text-sm text-center lg:text-left">
                &copy; {currentYear}{" "}
                <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-pink">
                  EllowDigital
                </span>
                . All Rights Reserved.
              </div>

              {/* Tagline */}
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-pink font-semibold text-sm">
                Making Digital Simple.
              </div>

              {/* Legal Links */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-end">
                {legalLinks.map(({ to, icon: Icon, label }) => (
                  <Link
                    key={to}
                    to={to}
                    className="text-muted-foreground hover:text-foreground text-xs flex items-center gap-1.5 transition-colors duration-200"
                  >
                    <Icon className="w-3 h-3" />
                    <span>{label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
