import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Activity, Eye, Check, ArrowRight, Sparkles } from "lucide-react";
import {
  staggerContainer,
  fadeUpItem,
  headerVariants,
  badgeVariants,
  underlineVariants,
  smoothEase,
} from "@/utils/scrollAnimations";

const processes = [
  {
    icon: Users,
    title: "Personalized Collaboration",
    description:
      "Direct communication and tailored solutions for your unique needs.",
    step: "01",
  },
  {
    icon: Activity,
    title: "Agile Methodology",
    description: "Iterative development with flexible adaptation to changes.",
    step: "02",
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "Clear communication and regular progress updates.",
    step: "03",
  },
  {
    icon: Check,
    title: "Quality Delivery",
    description: "Rigorous testing and optimization for top performance.",
    step: "04",
  },
];

const WorkProcess = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="how-we-work"
      className="py-24 lg:py-32 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-14 lg:mb-16"
        >
          <motion.div
            variants={badgeVariants}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-5 py-2 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary tracking-wide">
              Our Process
            </span>
          </motion.div>

          <motion.h2
            variants={headerVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            How We{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
                Work
              </span>
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full origin-left"
                variants={underlineVariants}
              />
            </span>
          </motion.h2>
          <motion.p
            variants={headerVariants}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Our streamlined process ensures every project is delivered with
            excellence, from initial concept to final deployment.
          </motion.p>
        </motion.div>

        {/* Process Steps */}
        <motion.div
          variants={staggerContainer(0.12, 0.2)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-4"
        >
          {processes.map((process, index) => (
            <motion.div
              key={process.step}
              variants={fadeUpItem}
              className="relative group"
            >
              {/* Connection line */}
              {index < processes.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5">
                  <motion.div
                    className="w-full h-full bg-gradient-to-r from-border via-primary/30 to-border"
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{
                      duration: 0.8,
                      delay: 0.5 + index * 0.15,
                      ease: smoothEase,
                    }}
                    style={{ originX: 0 }}
                  />
                  <motion.div
                    className="absolute right-0 top-1/2 -translate-y-1/2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.8 + index * 0.15 }}
                  >
                    <ArrowRight className="w-4 h-4 text-primary/50" />
                  </motion.div>
                </div>
              )}

              {/* Card */}
              <div className="relative bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-6 lg:p-7 hover:border-primary/40 transition-all duration-500 h-full group-hover:shadow-2xl group-hover:shadow-primary/10 group-hover:-translate-y-1">
                {/* Gradient overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Step number & icon */}
                <div className="relative flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 group-hover:border-primary/40 transition-all duration-300">
                    <process.icon className="w-7 h-7 text-primary" />
                  </div>
                  <span className="text-4xl font-bold text-muted-foreground/15 group-hover:text-primary/20 transition-colors">
                    {process.step}
                  </span>
                </div>

                {/* Content */}
                <h3 className="relative text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                  {process.title}
                </h3>
                <p className="relative text-muted-foreground text-sm leading-relaxed">
                  {process.description}
                </p>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6, ease: smoothEase }}
          className="text-center mt-14 lg:mt-16"
        >
          <motion.div
            className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/50"
            whileHover={{ scale: 1.01 }}
          >
            <p className="text-muted-foreground">
              Ready to start your project with us?
            </p>
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 rounded-full shadow-lg shadow-primary/20 transition-all duration-300"
              whileHover={{ scale: 1.02, gap: "0.75rem" }}
              whileTap={{ scale: 0.98 }}
            >
              Let's Get Started
              <ArrowRight className="h-4 w-4" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkProcess;
