import { useState } from "react";
import { ExternalLink, ArrowLeft } from "lucide-react";
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
    title: "TypeBlitz",
    category: "Desktop App",
    image: "/images/projects_img/project1_typeblitz.webp",
    description:
      "Desktop app to boost typing speed and accuracy with drills, progress tracking, and detailed live stats, plus customizable practice modes, streaks, and daily goals for steady improvement.",
    tech: ["Python", "SQLite3"],
    link: "https://typeblitz.netlify.app/",
  },
  {
    title: "Ghatak Sports Academy India™",
    category: "Web App",
    image: "/images/projects_img/project2_gsai.webp",
    description:
      "Responsive web app for GSAI featuring programs, schedules, events, updates, and streamlined admissions info, with an integrated gallery, coach bios, and a mobile-first, performance-optimized UI.",
    tech: ["HTML", "CSS", "JavaScript", "React (Vite)", "TypeScript"],
    link: "https://ghatakgsai.netlify.app/",
  },
  {
    title: "Sarwan Portfolio",
    category: "Website",
    image: "/images/projects_img/project3_sarwan.webp",
    description:
      "Modern personal portfolio highlighting work, achievements, projects, and an easy, streamlined contact flow, enhanced with smooth animations, responsive layouts, and SEO-friendly metadata.",
    tech: ["HTML", "CSS", "JavaScript", "JQuery"],
    link: "https://sarwan.netlify.app/",
  },
  {
    title: "Tent Decor Expo UP 2025",
    category: "Web App",
    image: "/images/projects_img/project4_tdexpoup25.webp",
    description:
      "End-to-end event system with online registration, secure e-passes, real-time validation, and check-in, including QR-based verification, admin dashboards, and automated email/SMS notifications.",
    tech: [
      "Node.js",
      "HTML",
      "CSS", 
      "JavaScript",
      "PostgreSQL",
      "Cloudinary",
      "Netlify",
    ],
    link: "https://td-expoup25.netlify.app/",
  },
  {
    title: "UpdateAlchemist",
    category: "Web App", 
    image: "/images/projects_img/project3_updatealchemist.webp",
    description:
      "Modern changelog and product update management platform with real-time notifications, user feedback collection, and analytics dashboard for tracking feature adoption and user engagement.",
    tech: ["React", "TypeScript", "Node.js", "MongoDB", "Express"],
    link: "#",
  },
  {
    title: "Certificate Generator Pro",
    category: "Web App",
    image: "/images/projects_img/project42_certificate.webp", 
    description:
      "Automated certificate generation system with customizable templates, bulk processing, digital signatures, and secure verification system for educational institutions and training programs.",
    tech: ["React", "Python", "Flask", "PostgreSQL", "Canvas API"],
    link: "#",
  },
];

const portfolioPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://ellowdigitals.me/portfolio",
  url: "https://ellowdigitals.me/portfolio",
  name: "Portfolio - EllowDigital Projects",
  description: "Explore our complete portfolio of web development, mobile apps, and digital transformation projects.",
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

  // Filter projects based on selected category
  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter);

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.3,
      },
    },
  };

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
          <section className="section-container py-16 sm:py-20 md:py-24 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/4 left-1/4 w-60 sm:w-80 h-60 sm:h-80 bg-brand-gold/5 rounded-full blur-3xl morph-shape"></div>
            <div
              className="absolute bottom-1/3 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-brand-yellow/5 rounded-full blur-3xl morph-shape"
              style={{ animationDelay: "7s" }}
            ></div>

            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-8 sm:mb-12"
              >
                <Link
                  to="/#portfolio"
                  className="inline-flex items-center text-brand-gold hover:text-brand-yellow transition-colors mb-6"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                  Our Complete Portfolio
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Explore our diverse range of projects spanning web development, mobile applications, 
                  desktop software, and digital transformation solutions.
                </p>
                <div className="h-1 w-24 mx-auto bg-gradient-to-r from-brand-gold to-brand-yellow rounded-full mt-6"></div>
              </motion.div>

              {/* Category filter */}
              <motion.div
                className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex flex-wrap justify-center gap-2 max-w-full overflow-x-auto pb-2">
                  {categories.map((category, index) => (
                    <motion.button
                      key={index}
                      className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all text-sm whitespace-nowrap ${
                        filter === category
                          ? "bg-brand-yellow text-black font-medium"
                          : "bg-card hover:bg-brand-yellow/20"
                      }`}
                      onClick={() => setFilter(category)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {category}
                    </motion.button>
                  ))}
                </div>
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
                      <Card className="overflow-hidden border border-border hover:border-brand-yellow/30 transition-all duration-300 h-full flex flex-col">
                        <div className="relative aspect-video overflow-hidden">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                            loading="lazy"
                          />

                          {/* Category badge */}
                          <div className="absolute top-3 left-3">
                            <span className="bg-black/50 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full">
                              {project.category}
                            </span>
                          </div>

                          {/* Hover overlay */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex items-end justify-center p-4 sm:p-6 transition-opacity duration-300 ${
                              hoveredIndex === index ? "opacity-100" : "opacity-0"
                            }`}
                          >
                            {project.link !== "#" ? (
                              <Button className="bg-brand-yellow hover:bg-brand-gold text-black">
                                <a
                                  href={project.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center"
                                >
                                  View Project <ExternalLink className="ml-2 w-4 h-4" />
                                </a>
                              </Button>
                            ) : (
                              <Button disabled className="bg-gray-500 text-white cursor-not-allowed">
                                Coming Soon
                              </Button>
                            )}
                          </div>
                        </div>

                        <CardContent className="p-4 sm:p-6 flex-grow flex flex-col">
                          <h3 className="text-lg sm:text-xl font-semibold mb-2">
                            {project.title}
                          </h3>
                          <p className="text-muted-foreground text-sm sm:text-base mb-4 flex-grow">
                            {project.description}
                          </p>

                          {/* Tech stack tags */}
                          <div className="flex flex-wrap gap-1.5 mt-auto">
                            {project.tech.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="text-xs bg-brand-yellow/10 text-brand-gold px-2 py-1 rounded-md"
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

              {filteredProjects.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <p className="text-muted-foreground text-lg">
                    No projects found in this category.
                  </p>
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