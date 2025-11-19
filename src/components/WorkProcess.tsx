import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Users, Activity, Eye, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const processes = [
  {
    icon: Users,
    title: "Personalized Collaboration",
    description:
      "Direct communication and tailored solutions for your unique needs.",
  },
  {
    icon: Activity,
    title: "Agile Methodology",
    description: "Iterative development with flexible adaptation to changes.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "Clear communication and regular progress updates.",
  },
  {
    icon: Check,
    title: "Quality Delivery",
    description: "Rigorous testing and optimization for top performance.",
  },
];

const WorkProcess = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(titleRef, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
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
        duration: 0.6,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section
      id="how-we-work"
      className="section-container py-16 sm:py-20 md:py-24 relative overflow-hidden snap-start deferred-section"
    >
      {/* Adaptive blob background */}
      <div className="absolute top-1/3 left-1/3 w-64 sm:w-96 h-64 sm:h-96 bg-brand-yellow/5 rounded-full blur-3xl morph-shape"></div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          <motion.h2
            ref={titleRef}
            className="section-title"
            variants={titleVariants}
          >
            How We Work
          </motion.h2>

          <motion.div
            className="h-1 w-24 mx-auto bg-gradient-to-r from-brand-gold to-brand-yellow rounded-full mb-12 sm:mb-16"
            variants={titleVariants}
          ></motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {processes.map((process, index) => (
            <motion.div
              key={index}
              className="relative"
              variants={itemVariants}
            >
              <Card className="h-full neo-effect transition-all duration-300 border border-border hover:border-brand-yellow/30">
                <CardContent className="p-5 sm:p-6 text-center">
                  <div className="mb-5 sm:mb-6 relative">
                    <div className="absolute inset-0 bg-brand-yellow/10 rounded-full blur-xl"></div>
                    <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full flex items-center justify-center bg-gradient-to-br from-brand-gold/20 to-brand-yellow/20 backdrop-blur-sm border border-brand-yellow/30">
                      <process.icon className="w-7 h-7 text-brand-yellow" />
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                    {process.title}
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    {process.description}
                  </p>
                </CardContent>
              </Card>

              {/* Connection dots - responsive hidden on mobile, only between cards */}
              {index < processes.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                  <div className="w-6 h-6 rounded-full bg-brand-yellow/10 backdrop-blur-sm flex items-center justify-center">
                    <div className="w-2 h-2 bg-brand-yellow rounded-full"></div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WorkProcess;
