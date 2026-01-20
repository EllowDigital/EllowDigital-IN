import { useState, useEffect, useMemo } from "react";
import {
  ExternalLink,
  ArrowLeft,
  Sparkles,
  Layers,
  Github,
  Globe,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

// --- Types ---
interface Project {
  title: string;
  category: string;
  image: string;
  description: string;
  tech: string[];
  link: string;
  featured: boolean;
  github?: string; // Optional: Add if you have repo links
}

// --- Data ---
const categories = [
  "All",
  "UI/UX",
  "Website",
  "Web App",
  "Mobile App",
  "Desktop App",
];

const projects: Project[] = [
  {
    title: "Ghatak Sports Academy India™",
    category: "Web App",
    image: "/images/projects_img/project2_gsai.webp",
    description:
      "Responsive web app for GSAI featuring programs, schedules, events, updates, and streamlined admissions info, with an integrated gallery, coach bios, and a mobile-first, performance-optimized UI.",
    tech: ["HTML", "CSS", "JavaScript", "React (Vite)", "TypeScript"],
    link: "https://ghatakgsai.netlify.app/",
    featured: true,
  },
  {
    title: "TypeBlitz",
    category: "Desktop App",
    image: "/images/projects_img/project1_typeblitz.webp",
    description:
      "Desktop app to boost typing speed and accuracy with drills, progress tracking, and detailed live stats, plus customizable practice modes, streaks, and daily goals for steady improvement.",
    tech: ["Python", "SQLite3"],
    link: "https://typeblitz.netlify.app/",
    featured: true,
  },
  {
    title: "DhanDiary",
    category: "Mobile App",
    image: "/images/projects_img/project6_dhandiary.webp",
    description:
      "Personal finance mobile app for tracking expenses, budgeting, and financial goals with intuitive charts, reminders, and secure data storage.",
    tech: ["React Native", "TypeScript", "Expo", "NeonDB"],
    link: "https://dhandiary.netlify.app",
    featured: true,
  },
  {
    title: "Tent Decor Expo UP 2025",
    category: "Web App",
    image: "/images/projects_img/project4_tdexpoup25.webp",
    description:
      "End-to-end event system with online registration, secure e-passes, real-time validation, and check-in, including QR-based verification, admin dashboards, and automated email/SMS notifications.",
    tech: ["Node.js", "HTML", "CSS", "JavaScript", "PostgreSQL", "Cloudinary"],
    link: "https://td-expoup25.netlify.app/",
    featured: true,
  },
  {
    title: "UpdateAlchemist",
    category: "Web App",
    image: "/images/projects_img/project3_updatealchemist.webp",
    description:
      "Modern changelog and product update management platform with real-time notifications, user feedback collection, and analytics dashboard for tracking feature adoption and user engagement.",
    tech: ["React", "TypeScript", "Node.js", "MongoDB", "Express"],
    link: "#",
    featured: false,
  },
  {
    title: "Sarwan Portfolio",
    category: "Website",
    image: "/images/projects_img/project3_sarwan.webp",
    description:
      "Modern personal portfolio highlighting work, achievements, projects, and an easy, streamlined contact flow, enhanced with smooth animations, responsive layouts, and SEO-friendly metadata.",
    tech: ["HTML", "CSS", "JavaScript", "JQuery"],
    link: "https://sarwan.netlify.app/",
    featured: false,
  },
  {
    title: "RGSK Technologies Pvt. Ltd.",
    category: "Website",
    image: "/images/projects_img/project5_rgsktech.webp",
    description:
      "Business website for RGSK Technologies with a modern, responsive UI focused on clarity, trust, and performance.",
    tech: ["React (Vite)", "TypeScript", "Tailwind CSS"],
    link: "https://rgsktechnologies.netlify.app/",
    featured: false,
  },
  {
    title: "Certificate Generator Pro",
    category: "Web App",
    image: "/images/projects_img/project42_certificate.webp",
    description:
      "Automated certificate generation system with customizable templates, bulk processing, digital signatures, and secure verification system for educational institutions and training programs.",
    tech: ["React", "Python", "Flask", "PostgreSQL", "Canvas API"],
    link: "#",
    featured: false,
  },
];

// --- Schema Data ---
const portfolioPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://ellowdigitals.me/portfolio",
  url: "https://ellowdigitals.me/portfolio",
  name: "Portfolio - EllowDigital Projects",
  description:
    "Explore our complete portfolio of web development, mobile apps, and digital transformation projects.",
  isPartOf: {
    "@type": "WebSite",
    url: "https://ellowdigitals.me/",
    name: "EllowDigital",
  },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      "@type": "CreativeWork",
      position: index + 1,
      name: project.title,
      description: project.description,
      url: project.link,
      category: project.category,
    })),
  },
};

// --- Animations ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 50, damping: 15 },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.2 },
  },
};

const PortfolioPage = () => {
  const [filter, setFilter] = useState("All");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter projects with Memoization for performance
  const filteredProjects = useMemo(() => {
    return filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter);
  }, [filter]);

  const featuredCount = useMemo(
    () => projects.filter((p) => p.featured).length,
    []
  );

  return (
    <>
      <SEOHead
        title="Portfolio - Complete Project Gallery | EllowDigital"
        description="Browse our complete portfolio featuring web development, mobile applications, desktop software, and digital transformation projects."
        canonicalUrl="https://ellowdigitals.me/portfolio"
        structuredData={portfolioPageSchema}
      />

      <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-brand-gold/30">
        <Navbar />

        <main className="flex-grow overflow-x-hidden" id="main-content">
          {/* Hero Section */}
          <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-20 overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-gold/10 via-background to-background"></div>
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-gold/5 rounded-full blur-[100px] animate-pulse-slow"></div>
            <div className="absolute top-20 right-1/4 w-80 h-80 bg-brand-yellow/5 rounded-full blur-[80px]"></div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-center"
              >
                <Link
                  to="/"
                  className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-brand-gold transition-colors mb-6 group"
                >
                  <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Back to Home
                </Link>

                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="p-1.5 rounded-md bg-brand-yellow/10 border border-brand-yellow/20">
                    <Layers className="w-5 h-5 text-brand-yellow" />
                  </div>
                  <span className="text-sm text-brand-gold font-semibold uppercase tracking-wider">
                    Our Work
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
                  <span className="bg-gradient-to-r from-white via-brand-gold to-brand-yellow bg-clip-text text-transparent">
                    Digital Excellence
                  </span>
                  <br className="hidden sm:block" />
                  <span className="text-foreground"> in Every Pixel</span>
                </h1>

                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                  Explore our curated collection of {projects.length} impactful
                  projects spanning enterprise web applications, mobile
                  solutions, and next-gen digital experiences.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto border-t border-border/50 pt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-brand-yellow">
                      {projects.length}
                    </div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
                      Total Projects
                    </div>
                  </div>
                  <div className="text-center border-l border-border/50">
                    <div className="text-3xl font-bold text-brand-gold">
                      {featuredCount}
                    </div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
                      Featured
                    </div>
                  </div>
                  <div className="text-center border-l border-border/50">
                    <div className="text-3xl font-bold text-white">
                      {categories.length - 1}
                    </div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
                      Categories
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Projects Grid Section */}
          <section className="section-container py-12 sm:py-16 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              {/* Category Filters */}
              <motion.div
                className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 sm:mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {categories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => setFilter(category)}
                    className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-brand-gold ${
                      filter === category
                        ? "text-black bg-brand-gold shadow-[0_0_20px_-5px_rgba(234,179,8,0.5)] scale-105"
                        : "bg-card/40 text-muted-foreground border border-border hover:border-brand-yellow/50 hover:text-foreground hover:bg-card/80"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </motion.div>

              {/* Grid */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={filter}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.title}
                      variants={itemVariants}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      layout
                      className="group h-full"
                    >
                      <Card className="h-full flex flex-col overflow-hidden bg-card/40 backdrop-blur-sm border-border hover:border-brand-yellow/30 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-yellow/5 hover:-translate-y-2">
                        {/* Image Container */}
                        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            loading="lazy"
                          />

                          {/* Badges */}
                          <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                            <span className="bg-black/70 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-white/10 shadow-lg">
                              {project.category}
                            </span>
                            {project.featured && (
                              <span className="bg-brand-yellow text-black text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1 shadow-lg shadow-brand-yellow/20">
                                <Sparkles className="w-3 h-3" />
                                Featured
                              </span>
                            )}
                          </div>

                          {/* Overlay Buttons */}
                          <div
                            className={`absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center gap-4 transition-all duration-300 ${
                              hoveredIndex === index
                                ? "opacity-100 visible"
                                : "opacity-0 invisible"
                            }`}
                          >
                            {project.link !== "#" ? (
                              <Button
                                className="bg-brand-gold hover:bg-brand-yellow text-black font-semibold rounded-full px-6 transition-transform hover:scale-105"
                                asChild
                              >
                                <a
                                  href={project.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Visit Site{" "}
                                  <ExternalLink className="ml-2 w-4 h-4" />
                                </a>
                              </Button>
                            ) : (
                              <span className="px-6 py-2 bg-muted/80 backdrop-blur text-muted-foreground rounded-full text-sm font-medium border border-white/10">
                                Coming Soon
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Content */}
                        <CardContent className="p-6 flex-grow flex flex-col relative">
                          {/* Subtle gradient background line at top of content */}
                          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-yellow/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                          <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-brand-gold transition-colors duration-300">
                            {project.title}
                          </h3>

                          <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                            {project.description}
                          </p>

                          {/* Tech Stack */}
                          <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border/40">
                            {project.tech.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="text-[11px] font-medium bg-brand-yellow/5 text-brand-gold/90 px-2.5 py-1 rounded-md border border-brand-yellow/10"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Empty State */}
              {filteredProjects.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-20 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-muted/30 flex items-center justify-center mb-6 ring-1 ring-border">
                    <Layers className="w-10 h-10 text-muted-foreground/50" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    No projects found
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-sm">
                    We couldn't find any projects in the "{filter}" category.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setFilter("All")}
                    className="border-brand-gold/30 hover:border-brand-gold hover:text-brand-gold transition-colors"
                  >
                    View All Projects
                  </Button>
                </motion.div>
              )}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default PortfolioPage;
