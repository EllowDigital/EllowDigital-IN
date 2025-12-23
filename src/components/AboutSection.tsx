import { CheckCircle, Users, Award, Briefcase, LightbulbIcon, Target, Rocket, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedSectionHeader } from "./AnimatedGradient";

const AboutSection = () => {
  const highlights = [
    { text: "Solo-powered micro-agency", icon: Users },
    { text: "Creative UI/UX design", icon: LightbulbIcon },
    { text: "Clean, efficient code", icon: CheckCircle },
    { text: "Personalized strategies", icon: Briefcase },
    { text: "Future-proof solutions", icon: Award },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      id="about"
      className="py-20 sm:py-28 lg:py-32 relative overflow-hidden"
    >
      {/* Premium gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-brand-yellow/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSectionHeader
          badge="Who We Are"
          badgeIcon={<Target className="w-4 h-4 text-primary" />}
          title="About EllowDigital"
          highlightedWord="EllowDigital"
          description="A solo-powered micro-agency delivering high-performance digital solutions tailored to your unique needs."
          gradient="gold"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column: Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-5">
              <p className="text-foreground/80 text-base sm:text-lg leading-relaxed">
                At EllowDigital, we are dedicated to delivering high-performance websites, mobile apps, and software solutions that are tailored to your unique business needs.
              </p>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                We believe that every project is an opportunity to make a lasting impact. That's why we focus on quality, efficiency, and user-centric design to ensure our solutions exceed expectations.
              </p>
            </div>

            {/* Highlights Grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group flex items-center gap-3 p-4 bg-card/50 hover:bg-card border border-border/30 hover:border-brand-yellow/30 rounded-xl transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-yellow/10 group-hover:bg-brand-yellow/20 flex items-center justify-center transition-colors">
                    <item.icon className="w-5 h-5 text-brand-yellow" />
                  </div>
                  <span className="font-medium text-sm text-foreground">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 text-brand-yellow font-semibold group"
              whileHover={{ x: 5 }}
            >
              Let's work together
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>

          {/* Right Column: Cards */}
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Mission Card */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-yellow/20 to-brand-gold/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-7 bg-card/60 backdrop-blur-sm border border-border/40 rounded-2xl hover:border-brand-yellow/20 transition-all duration-300">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-yellow/20 to-brand-gold/10 border border-brand-yellow/20 flex items-center justify-center">
                    <Rocket className="w-7 h-7 text-brand-yellow" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Our Mission</h3>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  To empower businesses with meaningful digital experiences. By blending innovative technology, agile development, and human-centered design, we create results that resonate with your audience.
                </p>
              </div>
            </div>

            {/* Philosophy Card */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-gold/20 to-brand-yellow/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-7 bg-card/60 backdrop-blur-sm border border-border/40 rounded-2xl hover:border-brand-yellow/20 transition-all duration-300">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-gold/20 to-brand-yellow/10 border border-brand-gold/20 flex items-center justify-center">
                    <LightbulbIcon className="w-7 h-7 text-brand-gold" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Our Philosophy</h3>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  Technology should empower people. With passion for creating impactful digital experiences, we blend innovative technology with human-centered design to bring your boldest ideas to life.
                </p>
              </div>
            </div>

            {/* Quote */}
            <div className="relative p-6 bg-gradient-to-br from-brand-yellow/5 to-brand-gold/5 border border-brand-yellow/15 rounded-2xl overflow-hidden">
              <div className="absolute -top-2 left-4 text-6xl text-brand-yellow/20 font-serif leading-none">"</div>
              <p className="relative text-sm sm:text-base italic text-foreground/80 pl-6 pr-4 leading-relaxed">
                Every line of code and every pixel should serve a purpose — to create beautiful experiences that solve real problems.
              </p>
              <div className="absolute -bottom-4 right-4 text-6xl text-brand-yellow/20 font-serif leading-none rotate-180">"</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
