import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Activity, Eye, Check, ArrowRight } from "lucide-react";

const processes = [
  {
    icon: Users,
    title: "Personalized Collaboration",
    description:
      "Direct communication and tailored solutions for your unique needs.",
    step: "01",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Activity,
    title: "Agile Methodology",
    description: "Iterative development with flexible adaptation to changes.",
    step: "02",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "Clear communication and regular progress updates.",
    step: "03",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: Check,
    title: "Quality Delivery",
    description: "Rigorous testing and optimization for top performance.",
    step: "04",
    gradient: "from-green-500 to-emerald-500",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const WorkProcess = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="how-we-work"
      className="py-24 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-brand-yellow/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl" />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6"
          >
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-medium text-primary">Our Process</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How We{" "}
            <span className="bg-gradient-to-r from-primary via-brand-purple to-brand-cyan bg-clip-text text-transparent">
              Work
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Our streamlined process ensures every project is delivered with excellence,
            from initial concept to final deployment.
          </p>
        </motion.div>

        {/* Process Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4"
        >
          {processes.map((process, index) => (
            <motion.div
              key={process.step}
              variants={itemVariants}
              className="relative group"
            >
              {/* Connection line */}
              {index < processes.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5">
                  <div className="w-full h-full bg-gradient-to-r from-border via-primary/30 to-border" />
                  <motion.div
                    className="absolute right-0 top-1/2 -translate-y-1/2"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.2 }}
                  >
                    <ArrowRight className="w-4 h-4 text-primary/50" />
                  </motion.div>
                </div>
              )}

              {/* Card */}
              <div className="relative bg-card/50 backdrop-blur-sm border border-border/40 rounded-2xl p-6 hover:border-primary/30 transition-all duration-500 h-full group-hover:bg-card/80">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${process.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                {/* Step number */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${process.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <process.icon className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-4xl font-bold text-muted-foreground/20 group-hover:text-primary/20 transition-colors">
                    {process.step}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {process.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {process.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">
            Ready to start your project with us?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-300"
          >
            Let's Get Started
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkProcess;
