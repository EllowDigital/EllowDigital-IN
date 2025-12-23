import { FC, memo } from "react";
import { motion } from "framer-motion";
import { Code2, Sparkles } from "lucide-react";
import { AnimatedSectionHeader } from "./AnimatedGradient";

interface TechItemProps {
  name: string;
  category: string;
  index: number;
}

const TechItem: FC<TechItemProps> = memo(({ name, category, index }) => {
  const initial = name.substring(0, 2).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="group"
    >
      <div className="relative flex flex-col items-center p-6 rounded-2xl bg-gradient-to-b from-card/80 to-card border border-border/50 transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2">
        {/* Background glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Icon Circle */}
        <div className="relative mb-4">
          <div className="absolute -inset-3 bg-gradient-to-r from-primary to-primary/80 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500" />
          <div className="relative w-20 h-20 flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 shadow-lg group-hover:scale-110 transition-all duration-500">
            <span className="text-xl font-bold text-primary">{initial}</span>
          </div>
        </div>

        {/* Name */}
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
          {name}
        </h3>

        {/* Category Badge */}
        <span className="text-xs font-medium px-3 py-1 rounded-full border capitalize bg-primary/10 border-primary/20 text-primary">
          {category}
        </span>

        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl bg-gradient-to-r from-primary via-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
});

const technologies = [
  { name: "HTML5", category: "frontend" },
  { name: "CSS3", category: "frontend" },
  { name: "JavaScript", category: "frontend" },
  { name: "React", category: "frontend" },
  { name: "Node.js", category: "backend" },
  { name: "Flutter", category: "mobile" },
  { name: "Firebase", category: "backend" },
  { name: "Python", category: "backend" },
  { name: "MySQL", category: "database" },
];

const TechStack = () => {
  return (
    <section id="techstack" className="relative py-20 sm:py-28 overflow-hidden deferred-section">
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      {/* Animated background elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <AnimatedSectionHeader
          badge="Technologies"
          badgeIcon={<Code2 className="w-4 h-4 text-primary" />}
          title="Our Tech Stack"
          highlightedWord="Tech Stack"
          description="We leverage the latest technologies to create fast, secure, and scalable digital solutions."
          gradient="gold"
        />

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative mb-12"
        >
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-6 py-2 text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Technologies we work with
              <Sparkles className="w-4 h-4 text-primary" />
            </span>
          </div>
        </motion.div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {technologies.map((tech, index) => (
            <TechItem key={index} name={tech.name} category={tech.category} index={index} />
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 flex flex-wrap justify-center gap-8"
        >
          {[
            { value: "32+", label: "Technologies" },
            { value: "4", label: "Categories" },
            { value: "100%", label: "Modern Stack" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
