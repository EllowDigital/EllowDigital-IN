import { FC, memo } from "react";

// Define the type for technology items
interface TechItemProps {
  name: string;
  category: string;
}

const TechItem: FC<TechItemProps> = memo(({ name, category }) => {
  const initial = name.substring(0, 2).toUpperCase();

  return (
    <div className="flex flex-col items-center space-y-2 transition-all duration-300 hover:text-brand-purple">
      <div className="relative group">
        <div className="absolute -inset-2 bg-gradient-to-r from-brand-purple/20 to-brand-cyan/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
        <div className="relative h-16 w-16 flex items-center justify-center text-lg font-bold border-2 border-border bg-card rounded-full shadow-sm transition-all duration-300 group-hover:border-brand-purple">
          {initial}
        </div>
      </div>
      <span className="text-sm font-medium">{name}</span>
      <span className="text-xs text-muted-foreground capitalize">
        {category}
      </span>
    </div>
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
    <section id="techstack" className="py-24 bg-muted/30">
      <div className="section-container">
        <h2 className="section-title">Our Tech Stack</h2>
        <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto mb-12">
          We leverage the latest technologies to create fast, secure, and
          scalable digital solutions.
        </p>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-6 text-sm text-muted-foreground">
              Technologies we work with
            </span>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-x-12 gap-y-8">
          {technologies.map((tech, index) => (
            <TechItem key={index} name={tech.name} category={tech.category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
