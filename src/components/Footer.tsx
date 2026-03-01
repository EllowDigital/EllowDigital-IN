import {
  Mail,
  Phone,
  Instagram,
  Github,
  MapPin,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import Logo from "./Logo";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const smoothScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(targetId.replace("#", ""));
    if (element) {
      const offset = 80;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
    }
  };

  const socialLinks = [
    { href: "mailto:ellowdigitalindia@gmail.com", label: "Mail", icon: Mail },
    { href: "tel:+918960446756", label: "Phone", icon: Phone },
    {
      href: "https://instagram.com/ellowdigital",
      label: "Instagram",
      icon: Instagram,
    },
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
    {
      icon: Mail,
      value: "ellowdigitalindia@gmail.com",
      href: "mailto:ellowdigitalindia@gmail.com",
      isLink: true,
    },
    {
      icon: Phone,
      value: "+91 89604 46756",
      href: "tel:+918960446756",
      isLink: true,
    },
    { icon: MapPin, value: "India", isLink: false },
    { icon: Clock, value: "Mon - Sat: 10AM - 7PM", isLink: false },
  ];

  const renderNavLink = (link: { label: string; href: string }) => {
    const cls =
      "group inline-flex items-center gap-1.5 text-muted-foreground hover:text-brand-yellow text-sm transition-all duration-200";
    if (link.href.startsWith("/")) {
      return (
        <Link to={link.href} className={cls}>
          {link.label}
          <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
        </Link>
      );
    }
    return (
      <a
        href={link.href}
        onClick={(e) => smoothScrollTo(e, link.href)}
        className={cls}
      >
        {link.label}
        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
      </a>
    );
  };

  return (
    <footer className="relative w-full bg-card border-t border-brand-yellow/20">
      {/* Accent line */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-brand-yellow to-transparent" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Brand */}
          <div className="text-center sm:text-left sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
              <Logo />
              <span className="text-lg font-extrabold tracking-tight">
                <span className="text-brand-yellow">Ellow</span>
                <span className="text-foreground">Digital</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-5 max-w-[260px] mx-auto sm:mx-0">
              Crafting innovative digital experiences that empower your brand
              online.
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              {socialLinks.map(({ href, label, icon: Icon }) => {
                const isExternal = href.startsWith("http");
                return (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer noopener" : undefined}
                    className="w-9 h-9 rounded-full flex items-center justify-center border border-border/60 text-muted-foreground hover:border-brand-yellow hover:bg-brand-yellow hover:text-background transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="font-bold text-brand-yellow mb-3 text-[11px] uppercase tracking-[0.2em]">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>{renderNavLink(link)}</li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="text-center sm:text-left">
            <h4 className="font-bold text-brand-yellow mb-3 text-[11px] uppercase tracking-[0.2em]">
              Services
            </h4>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.label}>{renderNavLink(link)}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center sm:text-left">
            <h4 className="font-bold text-brand-yellow mb-3 text-[11px] uppercase tracking-[0.2em]">
              Contact
            </h4>
            <ul className="space-y-2.5">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                const inner = (
                  <span className="inline-flex items-center justify-center sm:justify-start gap-2 text-muted-foreground text-sm hover:text-foreground transition-colors">
                    <Icon className="w-3.5 h-3.5 text-brand-yellow flex-shrink-0" />
                    <span className={item.isLink ? "break-all" : ""}>
                      {item.value}
                    </span>
                  </span>
                );
                return (
                  <li key={index}>
                    {item.isLink ? <a href={item.href}>{inner}</a> : inner}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/30 bg-background/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Copyright */}
            <p className="text-muted-foreground text-xs order-2 sm:order-1">
              © {currentYear}{" "}
              <span className="font-semibold text-brand-yellow">
                EllowDigital
              </span>
              . All Rights Reserved.
            </p>

            {/* Legal Links */}
            <nav
              className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 order-1 sm:order-2"
              aria-label="Legal navigation"
            >
              {legalLinks.map(({ to, label }, index) => (
                <span key={to} className="flex items-center gap-4">
                  <Link
                    to={to}
                    className="text-muted-foreground hover:text-brand-yellow text-xs transition-colors duration-200"
                  >
                    {label}
                  </Link>
                  {index < legalLinks.length - 1 && (
                    <span className="text-border/50 hidden sm:inline text-xs">
                      ·
                    </span>
                  )}
                </span>
              ))}
            </nav>

            {/* Tagline */}
            <p className="text-brand-yellow font-semibold text-xs order-3">
              Making Digital Simple.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
