import { useState, useEffect } from "react";
import { ExternalLink, ArrowLeft, Sparkles, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const categories = [
  "All",
  "UI/UX",
  "Website",
  "Web App",
  "Mobile App",
  "Desktop App",
];

const projects = [
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
    link: "https://expo.dev/artifacts/eas/8oTjej2xLnBzFQZUwvuCjv.apk",
    featured: true,
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

const PortfolioPage = () => {
  const [filter, setFilter] = useState("All");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter projects based on selected category
  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter);

  const featuredCount = projects.filter((p) => p.featured).length;

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
  } as const;

  return (
    <>
      <SEOHead
        title="Portfolio - Complete Project Gallery | EllowDigital"
        description="Browse our complete portfolio featuring web development, mobile applications, desktop software, and digital transformation projects across various industries."
        canonicalUrl="https://ellowdigitals.me/portfolio"
        structuredData={portfolioPageSchema}
      />

      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Navbar />

        <main className="flex-grow overflow-x-hidden" id="main-content">
          {/* Hero Section */}
          <section className="relative pt-24 sm:pt-28 pb-12 sm:pb-16 overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-background to-background"></div>
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-[100px]"></div>
            <div className="absolute top-20 right-1/4 w-80 h-80 bg-brand-yellow/5 rounded-full blur-[80px]"></div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <Link
                  to="/"
                  className="inline-flex items-center text-brand-gold hover:text-brand-yellow transition-colors mb-6 group"
                >
                  <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Back to Home
                </Link>

                <div className="flex items-center justify-center gap-2 mb-4">
                  <Layers className="w-5 h-5 text-brand-yellow" />
                  <span className="text-sm text-brand-gold font-medium uppercase tracking-wider">
                    Our Work
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-brand-gold to-brand-yellow bg-clip-text text-transparent">
                  Complete Portfolio
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                  Explore our diverse range of {projects.length} projects spanning web
                  development, mobile applications, desktop software, and
                  digital transformation solutions.
                </p>

                {/* Stats */}
                <div className="flex items-center justify-center gap-6 sm:gap-10 mt-8">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-brand-yellow">{projects.length}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Total Projects</div>
                  </div>
                  <div className="w-px h-10 bg-border"></div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-brand-gold">{featuredCount}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Featured</div>
                  </div>
                  <div className="w-px h-10 bg-border"></div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-white">{categories.length - 1}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Categories</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Projects Grid Section */}
          <section className="section-container py-12 sm:py-16 relative overflow-hidden">
            <div className="absolute bottom-1/3 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-brand-yellow/5 rounded-full blur-3xl"></div>

            <div className="max-w-6xl mx-auto">
              {/* Category filter */}
              <motion.div
                className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-14"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {categories.map((category, index) => (
                  <motion.button
                    key={index}
                    className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all text-sm font-medium whitespace-nowrap ${
                      filter === category
                        ? "bg-gradient-to-r from-brand-gold to-brand-yellow text-black shadow-lg shadow-brand-yellow/20"
                        : "bg-card/80 border border-border hover:border-brand-yellow/30 hover:bg-brand-yellow/10"
                    }`}
                    onClick={() => setFilter(category)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </motion.div>

              {/* Projects grid */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={filter}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
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
                      className="flex flex-col h-full"
                    >
                      <Card className="overflow-hidden border border-border hover:border-brand-yellow/40 transition-all duration-300 h-full flex flex-col group bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-brand-yellow/5">
                        <div className="relative aspect-video overflow-hidden">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                          />

                          {/* Category badge */}
                          <div className="absolute top-3 left-3 flex items-center gap-2">
                            <span className="bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full border border-white/10">
                              {project.category}
                            </span>
                            {project.featured && (
                              <span className="bg-brand-yellow/90 text-black text-xs px-2 py-1.5 rounded-full flex items-center gap-1">
                                <Sparkles className="w-3 h-3" />
                                Featured
                              </span>
                            )}
                          </div>

                          {/* Hover overlay */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end justify-center p-4 sm:p-6 transition-all duration-300 ${
                              hoveredIndex === index
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          >
                            {project.link !== "#" ? (
                              <Button className="bg-gradient-to-r from-brand-gold to-brand-yellow hover:from-brand-yellow hover:to-brand-gold text-black font-semibold shadow-lg" asChild>
                                <a
                                  href={project.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center"
                                >
                                  View Project{" "}
                                  <ExternalLink className="ml-2 w-4 h-4" />
                                </a>
                              </Button>
                            ) : (
                              <Button
                                disabled
                                className="bg-muted text-muted-foreground cursor-not-allowed"
                              >
                                Coming Soon
                              </Button>
                            )}
                          </div>
                        </div>

                        <CardContent className="p-4 sm:p-6 flex-grow flex flex-col">
                          <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-brand-gold transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-muted-foreground text-sm sm:text-base mb-4 flex-grow line-clamp-3">
                            {project.description}
                          </p>

                          {/* Tech stack tags */}
                          <div className="flex flex-wrap gap-1.5 mt-auto">
                            {project.tech.slice(0, 4).map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="text-xs bg-brand-yellow/10 text-brand-gold px-2.5 py-1 rounded-full border border-brand-yellow/20"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.tech.length > 4 && (
                              <span className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-full">
                                +{project.tech.length - 4}
                              </span>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {filteredProjects.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                    <Layers className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground text-lg">
                    No projects found in this category.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setFilter("All")}
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
