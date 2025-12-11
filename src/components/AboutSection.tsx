import { CheckCircle, Users, Award, Briefcase, LightbulbIcon, Target, Rocket } from "lucide-react";
import { motion } from "framer-motion";

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
        staggerChildren: 0.1,
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
      className="py-16 sm:py-20 lg:py-28 relative overflow-hidden"
    >
      {/* Modern gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-brand-yellow/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-brand-gold/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-secondary/50 border border-border/50 rounded-full text-sm text-muted-foreground">
            <Target className="w-4 h-4 text-brand-yellow" />
            Who We Are
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            About <span className="bg-gradient-to-r from-brand-yellow to-brand-gold bg-clip-text text-transparent">EllowDigital</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A solo-powered micro-agency delivering high-performance digital solutions tailored to your unique needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left Column: Content */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4">
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                At EllowDigital, we are dedicated to delivering high-performance websites, mobile apps, and software solutions that are tailored to your unique business needs.
              </p>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                We believe that every project is an opportunity to make a lasting impact. That's why we focus on quality, efficiency, and user-centric design to ensure our solutions exceed expectations.
              </p>
            </div>

            {/* Highlights Grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group flex items-center gap-3 p-4 bg-secondary/30 hover:bg-secondary/50 border border-border/30 hover:border-brand-yellow/30 rounded-xl transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-yellow/10 group-hover:bg-brand-yellow/20 flex items-center justify-center transition-colors">
                    <item.icon className="w-5 h-5 text-brand-yellow" />
                  </div>
                  <span className="font-medium text-sm sm:text-base text-foreground">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: Mission & Philosophy Cards */}
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Mission Card */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-yellow/20 to-brand-gold/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-6 bg-secondary/30 border border-border/30 rounded-2xl hover:border-brand-yellow/20 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-yellow/20 to-brand-gold/10 flex items-center justify-center">
                    <Rocket className="w-6 h-6 text-brand-yellow" />
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
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-gold/20 to-brand-yellow/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-6 bg-secondary/30 border border-border/30 rounded-2xl hover:border-brand-yellow/20 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-gold/20 to-brand-yellow/10 flex items-center justify-center">
                    <LightbulbIcon className="w-6 h-6 text-brand-gold" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Our Philosophy</h3>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  Technology should empower people. With passion for creating impactful digital experiences, we blend innovative technology with human-centered design to bring your boldest ideas to life.
                </p>
              </div>
            </div>

            {/* Quote */}
            <div className="relative p-5 bg-gradient-to-br from-brand-yellow/5 to-brand-gold/5 border border-brand-yellow/20 rounded-2xl">
              <div className="absolute -top-3 left-4 text-5xl text-brand-yellow/30 font-serif leading-none">"</div>
              <p className="text-sm sm:text-base italic text-foreground/80 pl-4 pr-2">
                Every line of code and every pixel should serve a purpose — to create beautiful experiences that solve real problems.
              </p>
              <div className="absolute -bottom-3 right-4 text-5xl text-brand-yellow/30 font-serif leading-none rotate-180">"</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
