import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import {
  ExternalLink,
  Sparkles,
  ArrowRight,
  Eye,
  Loader2,
  Code2,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { TiltCard, FloatingShapes, ScrollNarrative } from "./storytelling";

// --- Types ---
interface Project {
  title: string;
  category: string;
  image: string;
  description: string;
  tech: string[];
  link: string;
  featured: boolean;
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

const allProjects: Project[] = [
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
    featured: true,
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
    featured: true,
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
];

const ITEMS_PER_PAGE = 6;

const Portfolio = () => {
  const [filter, setFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);

  const sectionRef = useRef(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const filteredProjects = useMemo(() => {
    return filter === "All"
      ? allProjects
      : allProjects.filter((project) => project.category === filter);
  }, [filter]);

  const visibleProjects = useMemo(() => {
    return filteredProjects.slice(0, visibleCount);
  }, [filteredProjects, visibleCount]);

  const hasMore = visibleCount < filteredProjects.length;

  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [filter]);

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
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
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95, filter: "blur(4px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        delay: i * 0.08,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    }),
    exit: { opacity: 0, scale: 0.9, filter: "blur(4px)", transition: { duration: 0.2 } },
  };

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden bg-background"
    >
      {/* Background with 3D shapes */}
      <FloatingShapes variant="section" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-72 h-72 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] right-[5%] w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative section-container max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <ScrollNarrative direction="up" intensity={30}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-secondary mb-6 backdrop-blur-sm">
              <Layers className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground/80">
                Our Masterpieces
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Selected <span className="text-primary">Works</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              A curated selection of projects demonstrating our expertise in
              digital transformation, web engineering, and mobile solutions.
            </p>
          </motion.div>
        </ScrollNarrative>

        {/* Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                filter === category
                  ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                  : "bg-card/50 text-muted-foreground border-border hover:border-primary/50 hover:bg-card hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Grid with TiltCards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            exit="exit"
          >
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.title}
                variants={itemVariants}
                custom={index}
                className={`group relative flex flex-col ${
                  filter === "All" && index === 0 ? "md:col-span-2" : ""
                }`}
              >
                <TiltCard className="h-full" tiltAmount={6} glareEnabled={true}>
                  <div className="relative h-full flex flex-col rounded-2xl bg-card border border-border/50 overflow-hidden hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
                    {/* Image */}
                    <div
                      className={`relative overflow-hidden w-full ${
                        filter === "All" && index === 0
                          ? "aspect-video"
                          : "aspect-[4/3]"
                      }`}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

                      <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-background/90 text-foreground backdrop-blur-md shadow-sm border border-border/20">
                          {project.category}
                        </span>
                        {project.featured && (
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground flex items-center gap-1 shadow-lg shadow-primary/20">
                            <Sparkles className="w-3 h-3" /> Featured
                          </span>
                        )}
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                        <Button
                          asChild
                          className="rounded-full bg-white text-black hover:bg-white/90 font-semibold shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                        >
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Project{" "}
                            <ExternalLink className="ml-2 w-4 h-4" />
                          </a>
                        </Button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6 flex flex-col flex-grow">
                      <div className="mb-3">
                        <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-primary transition-colors leading-tight">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 sm:line-clamp-3">
                          {project.description}
                        </p>
                      </div>

                      <div className="mt-auto flex flex-wrap gap-1.5 sm:gap-2 pt-3 sm:pt-4 border-t border-border/40">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-2 sm:px-2.5 py-1 rounded-md bg-secondary/50 text-secondary-foreground font-medium flex items-center gap-1"
                          >
                            <Code2 className="w-3 h-3 opacity-50 hidden sm:inline" />
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 flex flex-col items-center justify-center"
          >
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Layers className="w-8 h-8 text-muted-foreground/50" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No projects found</h3>
            <p className="text-muted-foreground mb-6">
              We haven't uploaded any projects in the "{filter}" category yet.
            </p>
            <Button variant="outline" onClick={() => setFilter("All")}>
              Clear Filters
            </Button>
          </motion.div>
        )}

        {hasMore && (
          <div className="flex flex-col items-center mt-12">
            <div ref={loadMoreRef} className="h-4 w-full" />
            {isLoading ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
                <span>Loading more works...</span>
              </div>
            ) : (
              <Button variant="outline" onClick={loadMore} className="group">
                Load More{" "}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            )}
          </div>
        )}

        {/* Bottom CTA - Fixed mobile layout */}
        <motion.div
          className="text-center mt-16 sm:mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="inline-flex flex-col items-center gap-4 p-6 sm:p-4 sm:pl-6 sm:pr-1 sm:flex-row rounded-2xl sm:rounded-full bg-card border border-border/50 shadow-xl shadow-black/5">
            <span className="text-sm font-medium text-muted-foreground">
              Interested in seeing our complete timeline?
            </span>
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 shadow-lg w-full sm:w-auto"
            >
              <a href="/portfolio">
                View Full Portfolio <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
