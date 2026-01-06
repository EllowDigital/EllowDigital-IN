import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Clock,
  DollarSign,
  Users,
  Briefcase,
  Check,
  Sparkles,
} from "lucide-react";

const models = [
  {
    icon: Briefcase,
    title: "Fixed Price",
    description: "Perfect for projects with clear scope and requirements",
    features: [
      "Defined deliverables",
      "Predictable cost",
      "Milestone-based payments",
    ],
  },
  {
    icon: Clock,
    title: "Hourly Rate",
    description: "Ideal for ongoing development and flexible projects",
    features: [
      "Maximum flexibility",
      "Transparent billing",
      "Scale up or down as needed",
    ],
  },
  {
    icon: Users,
    title: "Dedicated Team",
    description: "For long-term partnerships and complex projects",
    features: [
      "Consistent team allocation",
      "Deep product knowledge",
      "Enhanced productivity",
    ],
  },
  {
    icon: DollarSign,
    title: "Student-Friendly",
    description: "Affordable options for educational and startup projects",
    features: ["Reduced rates", "Mentorship included", "Future growth options"],
  },
];

const steps = [
  {
    title: "Consultation",
    description: "In-depth discussion of your project requirements and goals",
  },
  {
    title: "Custom Proposal",
    description: "Detailed project scope, timeline, and cost estimation",
  },
  {
    title: "Design & Development",
    description: "Iterative development with regular updates and feedback",
  },
  {
    title: "Delivery & Support",
    description: "Project deployment and continued maintenance support",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

const EngagementModel = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="engagement"
      className="py-24 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

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
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Flexible Options
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our Engagement{" "}
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Models
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Choose the collaboration model that best fits your project needs and
            budget.
          </p>
        </motion.div>

        {/* Process Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <h3 className="text-2xl font-bold mb-10 text-center">
            How We{" "}
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Collaborate
            </span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Timeline connector */}
            <div className="hidden md:block absolute top-10 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20 z-0" />

            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="relative z-10 group"
              >
                {/* Timeline node */}
                <div className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/20 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-primary-foreground">
                    0{index + 1}
                  </span>
                </div>

                <div className="text-center bg-card/50 backdrop-blur-sm border border-border/40 rounded-xl p-4 hover:border-primary/30 transition-all duration-300">
                  <h4 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Engagement Models */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-10"
        >
          <h3 className="text-2xl font-bold">
            Flexible{" "}
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Engagement Options
            </span>
          </h3>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {models.map((model) => (
            <motion.div
              key={model.title}
              variants={itemVariants}
              className="group"
            >
              <div className="relative h-full bg-card/50 backdrop-blur-sm border border-border/40 rounded-2xl p-6 hover:border-primary/30 transition-all duration-500 overflow-hidden">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon */}
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                    <model.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <h4 className="text-xl font-bold mb-2 text-center group-hover:text-primary transition-colors">
                  {model.title}
                </h4>
                <p className="text-sm text-muted-foreground text-center mb-6 leading-relaxed">
                  {model.description}
                </p>

                {/* Features */}
                <ul className="space-y-3">
                  {model.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-primary" />
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
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
            Not sure which model suits you best?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-300"
          >
            Let's Discuss Your Project
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default EngagementModel;
