import { FC, memo } from "react";
import { motion } from "framer-motion";
import { Code2, Sparkles } from "lucide-react";

interface TechItemProps {
  name: string;
  category: string;
  index: number;
}

const categoryColors: Record<string, string> = {
  frontend: "from-blue-500 to-cyan-400",
  backend: "from-green-500 to-emerald-400",
  mobile: "from-purple-500 to-pink-400",
  database: "from-orange-500 to-amber-400",
};

const categoryBgColors: Record<string, string> = {
  frontend: "bg-blue-500/10 border-blue-500/20 text-blue-400",
  backend: "bg-green-500/10 border-green-500/20 text-green-400",
  mobile: "bg-purple-500/10 border-purple-500/20 text-purple-400",
  database: "bg-orange-500/10 border-orange-500/20 text-orange-400",
};

const TechItem: FC<TechItemProps> = memo(({ name, category, index }) => {
  const initial = name.substring(0, 2).toUpperCase();
  const gradientColor = categoryColors[category] || "from-brand-gold to-brand-yellow";
  const badgeColor = categoryBgColors[category] || "bg-brand-gold/10 border-brand-gold/20 text-brand-gold";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" as const }}
      className="group"
    >
      <div className="relative flex flex-col items-center p-6 rounded-2xl bg-gradient-to-b from-card/80 to-card border border-border/50 transition-all duration-500 hover:border-brand-gold/30 hover:shadow-2xl hover:shadow-brand-gold/10 hover:-translate-y-2">
        {/* Background glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-gold/5 via-transparent to-brand-yellow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Icon Circle */}
        <div className="relative mb-4">
          <div className={`absolute -inset-3 bg-gradient-to-r ${gradientColor} rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`} />
          <div className={`relative w-20 h-20 flex items-center justify-center rounded-2xl bg-gradient-to-br ${gradientColor} shadow-lg group-hover:scale-110 transition-all duration-500`}>
            <span className="text-xl font-bold text-white">{initial}</span>
          </div>
        </div>

        {/* Name */}
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-brand-gold transition-colors duration-300">
          {name}
        </h3>

        {/* Category Badge */}
        <span className={`text-xs font-medium px-3 py-1 rounded-full border capitalize ${badgeColor}`}>
          {category}
        </span>

        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl bg-gradient-to-r from-brand-gold via-brand-yellow to-brand-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
      <div className="absolute inset-0 bg-gradient-to-b from-background via-brand-gold/5 to-background" />
      
      {/* Animated background elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-brand-gold/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-brand-yellow/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
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
            <Code2 className="w-4 h-4 text-brand-gold" />
            <span className="text-sm font-medium text-brand-gold">Technologies</span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-brand-yellow">Tech Stack</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We leverage the latest technologies to create fast, secure, and scalable digital solutions.
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative mb-12"
        >
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-6 py-2 text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-gold" />
              Technologies we work with
              <Sparkles className="w-4 h-4 text-brand-gold" />
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
              <div className="text-3xl font-bold bg-gradient-to-r from-brand-gold to-brand-yellow bg-clip-text text-transparent">
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
