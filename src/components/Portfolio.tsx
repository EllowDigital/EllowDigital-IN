import { useState, useRef, useCallback, useEffect } from "react";
import { ExternalLink, Sparkles, ArrowRight, Eye, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, useInView } from "framer-motion";

const categories = [
  "All",
  "UI/UX",
  "Website",
  "Web App",
  "Mobile App",
  "Desktop App",
];

const allProjects = [
  {
    title: "Ghatak Sports Academy India™",
    category: "Web App",
    image: "/images/projects_img/project2_gsai.webp",
    description:
      "Responsive web app for GSAI featuring programs, schedules, events, updates, and streamlined admissions info.",
    tech: ["React", "TypeScript", "Vite", "Netlify"],
    link: "https://ghatakgsai.netlify.app/",
    featured: true,
  },
  {
    title: "TypeBlitz",
    category: "Desktop App",
    image: "/images/projects_img/project1_typeblitz.webp",
    description:
      "Desktop app to boost typing speed and accuracy with drills, progress tracking, and detailed live stats.",
    tech: ["Python", "SQLite3"],
    link: "https://typeblitz.netlify.app/",
    featured: false,
  },
  {
    title: "DhanDiary",
    category: "Mobile App",
    image: "/images/projects_img/project6_dhandiary.webp",
    description:
      "Personal finance mobile app for tracking expenses, budgeting, and financial goals with intuitive charts.",
    tech: ["React Native", "Expo", "NeonDB"],
    link: "https://expo.dev/artifacts/eas/8oTjej2xLnBzFQZUwvuCjv.apk",
    featured: true,
  },
  {
    title: "Tent Decor Expo UP 2025",
    category: "Web App",
    image: "/images/projects_img/project4_tdexpoup25.webp",
    description:
      "End-to-end event system with online registration, secure e-passes, and real-time validation.",
    tech: ["Node.js", "PostgreSQL", "Cloudinary"],
    link: "https://td-expoup25.netlify.app/",
    featured: false,
  },
  {
    title: "RGSK Technologies Pvt. Ltd.",
    category: "Website",
    image: "/images/projects_img/project5_rgsktech.webp",
    description:
      "Business website with a modern, responsive UI focused on clarity, trust, and performance.",
    tech: ["React", "TypeScript", "Vite"],
    link: "https://rgsktechnologies.netlify.app/",
    featured: false,
  },
  // Additional projects for infinite scroll demo
  {
    title: "Portfolio Showcase",
    category: "Website",
    image: "/images/projects_img/project2_gsai.webp",
    description:
      "Modern portfolio website with smooth animations and responsive design for creative professionals.",
    tech: ["React", "Framer Motion", "Tailwind"],
    link: "#",
    featured: false,
  },
  {
    title: "E-Commerce Dashboard",
    category: "Web App",
    image: "/images/projects_img/project4_tdexpoup25.webp",
    description:
      "Comprehensive admin dashboard for managing products, orders, and customer analytics.",
    tech: ["Next.js", "Prisma", "PostgreSQL"],
    link: "#",
    featured: false,
  },
  {
    title: "Fitness Tracker",
    category: "Mobile App",
    image: "/images/projects_img/project6_dhandiary.webp",
    description:
      "Health and fitness mobile app with workout plans, calorie tracking, and progress visualization.",
    tech: ["React Native", "Firebase", "Charts"],
    link: "#",
    featured: false,
  },
];

const ITEMS_PER_PAGE = 5;

// Skeleton component for loading state
const ProjectSkeleton = ({ featured = false }: { featured?: boolean }) => (
  <motion.div
    className={`rounded-2xl border border-border/30 bg-card/50 overflow-hidden ${
      featured ? "md:col-span-2" : ""
    }`}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <motion.div
      className={`w-full bg-secondary/40 ${
        featured ? "aspect-[2.5/1]" : "aspect-[4/3]"
      }`}
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
    <div className="p-5">
      <motion.div
        className="h-6 w-3/4 rounded bg-secondary/50 mb-2"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
      />
      <motion.div
        className="h-4 w-full rounded bg-secondary/30 mb-4"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
      />
      <div className="flex gap-2">
        {Array.from({ length: 3 }).map((_, j) => (
          <motion.div
            key={j}
            className="h-6 w-16 rounded-md bg-secondary/40"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: 0.3 + j * 0.05,
            }}
          />
        ))}
      </div>
    </div>
  </motion.div>
);

const Portfolio = () => {
  const [filter, setFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const sectionRef = useRef(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const filteredProjects =
    filter === "All"
      ? allProjects
      : allProjects.filter((project) => project.category === filter);

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  // Reset visible count when filter changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [filter]);

  // Infinite scroll observer
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    // Simulate loading delay for smooth UX
    setTimeout(() => {
      setVisibleCount((prev) =>
        Math.min(prev + ITEMS_PER_PAGE, filteredProjects.length)
      );
      setIsLoading(false);
    }, 800);
  }, [isLoading, hasMore, filteredProjects.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading, loadMore]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.25 },
    },
  };

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/3 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="relative section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 lg:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-5 py-2 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary tracking-wide">
              Featured Work
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Our{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
                Portfolio
              </span>
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our collection of successful projects that showcase our
            expertise and commitment to excellence
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="inline-flex flex-wrap justify-center gap-2 p-1.5 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/50">
            {categories.map((category) => (
              <motion.button
                key={category}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  filter === category
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                }`}
                onClick={() => setFilter(category)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid - Bento Style */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 auto-rows-fr"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.title}
                variants={itemVariants}
                layout
                className={`group ${
                  project.featured && index === 0
                    ? "md:col-span-2 md:row-span-1"
                    : ""
                }`}
              >
                <div className="relative h-full rounded-2xl bg-card/70 backdrop-blur-sm border border-border/50 overflow-hidden transition-all duration-500 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10">
                  {/* Image */}
                  <div
                    className={`relative overflow-hidden ${
                      project.featured && index === 0
                        ? "aspect-[2/1] md:aspect-[2.5/1]"
                        : "aspect-[4/3]"
                    }`}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />

                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-primary/90 text-primary-foreground backdrop-blur-sm shadow-lg">
                        {project.category}
                      </span>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-background/20 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300"
                        initial={{ y: 20, opacity: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Eye className="w-4 h-4" />
                        View Project
                        <ExternalLink className="w-4 h-4" />
                      </motion.a>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 lg:p-6">
                    <h3 className="text-lg lg:text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2.5 py-1 rounded-md bg-secondary/80 text-muted-foreground font-medium border border-border/30 group-hover:border-primary/20 group-hover:bg-primary/5 group-hover:text-primary/80 transition-all duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="text-xs px-2.5 py-1 rounded-md bg-secondary/50 text-muted-foreground/70 font-medium">
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            ))}

            {/* Loading skeletons */}
            {isLoading && (
              <>
                <ProjectSkeleton />
                <ProjectSkeleton />
                <ProjectSkeleton />
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Infinite scroll trigger */}
        <div ref={loadMoreRef} className="h-4" />

        {/* Loading indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-2 mt-8 text-muted-foreground"
          >
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
            <span className="text-sm">Loading more projects...</span>
          </motion.div>
        )}

        {/* Load more button (fallback) */}
        {hasMore && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center mt-8"
          >
            <Button variant="outline" onClick={loadMore} className="gap-2">
              Load More Projects
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-muted-foreground text-lg mb-4">
              No projects found in this category.
            </p>
            <Button variant="outline" onClick={() => setFilter("All")}>
              View All Projects
            </Button>
          </motion.div>
        )}

        {/* View All CTA */}
        <motion.div
          className="text-center mt-14 lg:mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.div
            className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/50"
            whileHover={{ scale: 1.01 }}
          >
            <p className="text-muted-foreground">
              Want to see more of our work?
            </p>
            <Button
              asChild
              className="group bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 rounded-full shadow-lg shadow-primary/20"
            >
              <a href="/portfolio" className="flex items-center gap-2">
                Explore All Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
