import { useState } from "react";
import { ExternalLink, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

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
    tech: [
      "HTML",
      "CSS",
      "JavaScript",
      "React (Vite)",
      "TypeScript",
      "Netlify",
    ],
    link: "https://ghatakgsai.netlify.app/",
  },
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
    title: "DhanDiary",
    category: "Mobile App",
    image: "/images/projects_img/project6_dhandiary.webp",
    description:
      "Personal finance mobile app for tracking expenses, budgeting, and financial goals with intuitive charts, reminders, and secure data storage.",
    tech: ["React Native", "TypeScript", "Expo", "NeonDB"],
    link: "https://expo.dev/artifacts/eas/8oTjej2xLnBzFQZUwvuCjv.apk",
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
    title: "RGSK Technologies Pvt. Ltd.",
    category: "Website",
    image: "/images/projects_img/project5_rgsktech.webp",
    description:
      "Business website for RGSK Technologies with a modern, responsive UI focused on clarity, trust, and performance.",
    tech: [
      "Node.js",
      "HTML",
      "CSS",
      "JavaScript",
      "React (Vite)",
      "TypeScript",
      "Netlify",
    ],
    link: "https://rgsktechnologies.netlify.app/",
  },
];

const Portfolio = () => {
  const [filter, setFilter] = useState("All");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter);

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
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      scale: 0.95,
      transition: {
        duration: 0.3,
      },
    },
  } as const;

  return (
    <section
      id="portfolio"
      className="relative py-20 sm:py-28 overflow-hidden deferred-section"
    >
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-brand-gold/5 to-background" />
      
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-brand-gold/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-yellow/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-brand-gold/5 to-transparent rounded-full blur-2xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-brand-gold" />
            <span className="text-sm font-medium text-brand-gold">Featured Work</span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-brand-yellow">Portfolio</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our collection of successful projects that showcase our expertise and commitment to excellence
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="inline-flex flex-wrap justify-center gap-2 p-2 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50">
            {categories.map((category, index) => (
              <motion.button
                key={index}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  filter === category
                    ? "bg-gradient-to-r from-brand-gold to-brand-yellow text-black shadow-lg shadow-brand-gold/25"
                    : "text-muted-foreground hover:text-foreground hover:bg-brand-gold/10"
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

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
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
                className="group"
              >
                <div className="relative h-full rounded-2xl bg-gradient-to-b from-card/80 to-card border border-border/50 overflow-hidden transition-all duration-500 hover:border-brand-gold/30 hover:shadow-2xl hover:shadow-brand-gold/10 hover:-translate-y-2">
                  {/* Image Container */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-brand-gold/90 to-brand-yellow/90 text-black backdrop-blur-sm">
                        {project.category}
                      </span>
                    </div>

                    {/* Hover Overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 flex items-center justify-center"
                    >
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ 
                          scale: hoveredIndex === index ? 1 : 0.8, 
                          opacity: hoveredIndex === index ? 1 : 0 
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-brand-gold to-brand-yellow text-black font-semibold shadow-lg shadow-brand-gold/30 hover:shadow-brand-gold/50 transition-all duration-300"
                        >
                          View Project <ExternalLink className="w-4 h-4" />
                        </a>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-brand-gold transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 4).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="text-xs px-2.5 py-1 rounded-lg bg-brand-gold/10 text-brand-gold border border-brand-gold/20 font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className="text-xs px-2.5 py-1 rounded-lg bg-muted text-muted-foreground font-medium">
                          +{project.tech.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom Gradient Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-gold via-brand-yellow to-brand-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-muted-foreground text-lg">No projects found in this category.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setFilter("All")}
            >
              View All Projects
            </Button>
          </motion.div>
        )}

        {/* View All Button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button 
            asChild
            className="group relative px-8 py-6 text-lg font-semibold bg-gradient-to-r from-brand-gold to-brand-yellow text-black rounded-full shadow-lg shadow-brand-gold/25 hover:shadow-brand-gold/40 hover:scale-105 transition-all duration-300"
          >
            <a href="/portfolio" className="flex items-center gap-2">
              Explore All Projects
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
