import {
  CheckCircle,
  Users,
  Award,
  Briefcase,
  LightbulbIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const AboutSection = () => {
  const highlights = [
    { text: "Solo-powered micro-agency", icon: Users },
    { text: "Creative UI/UX design", icon: LightbulbIcon },
    { text: "Clean, efficient code", icon: CheckCircle },
    { text: "Personalized strategies", icon: Briefcase },
    { text: "Future-proof solutions", icon: Award },
  ];

  // Animation variants for improved performance and mobile responsiveness
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      id="about"
      className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background to-muted/20"></div>
      <div className="absolute top-1/4 right-0 h-64 w-64 bg-brand-gold/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 h-64 w-64 bg-brand-gold/10 rounded-full filter blur-3xl"></div>

      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Column: About Information - Order adjusted for mobile */}
          <div className="space-y-6 order-2 lg:order-1">
            <div className="inline-block">
              <h2 className="text-3xl md:text-4xl font-bold mb-2 flex flex-col sm:flex-row sm:items-center gap-2">
                About <span className="gradient-text">EllowDigital</span>
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-brand-gold to-brand-yellow rounded-full mt-2"></div>
            </div>

            <p className="text-muted-foreground text-lg max-w-prose">
              At EllowDigital, we are a solo-powered micro-agency dedicated to
              delivering high-performance websites, mobile apps, and software
              solutions that are tailored to your unique business needs.
            </p>

            <p className="text-muted-foreground text-lg max-w-prose">
              We believe that every project is an opportunity to make a lasting
              impact. That's why we focus on quality, efficiency, and
              user-centric design to ensure that our solutions not only meet
              your needs but exceed expectations.
            </p>

            {/* Highlights with improved responsive layout */}
            <motion.div
              className="mt-8 grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              {highlights.map((item, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="bg-card/50 border-border/50 hover:border-brand-gold/50 transition-colors overflow-hidden group h-full">
                    <CardContent className="p-3 sm:p-4 flex items-center gap-3">
                      <div className="rounded-full bg-brand-gold/10 p-2 group-hover:bg-brand-gold/20 transition-colors flex-shrink-0">
                        <item.icon className="h-4 w-4 sm:h-5 sm:w-5 text-brand-gold" />
                      </div>
                      <span className="font-medium text-sm sm:text-base">
                        {item.text}
                      </span>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Mission and Philosophy - Improved mobile responsiveness with motion */}
          <motion.div
            className="relative order-1 lg:order-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-brand-purple/10 to-brand-cyan/10 rounded-2xl blur-xl"></div>
            <Card className="relative bg-card border-border/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 neo-effect">
              <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                <div className="w-20 h-1 bg-gradient-to-r from-brand-gold to-brand-yellow rounded-full"></div>

                {/* Mission Section */}
                <div className="space-y-2 sm:space-y-3">
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
                    <Award className="h-5 w-5 text-brand-gold flex-shrink-0" />
                    Our Mission
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Our mission is to empower businesses with meaningful digital
                    experiences. By blending innovative technology, agile
                    development, and human-centered design, we create results
                    that not only meet your goals but resonate with your
                    audience.
                  </p>
                </div>

                {/* Philosophy Section */}
                <div className="space-y-2 sm:space-y-3">
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
                    <LightbulbIcon className="h-5 w-5 text-brand-gold flex-shrink-0" />
                    Our Philosophy
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Our philosophy is simple: technology should empower people.
                    With a passion for creating impactful digital experiences,
                    we blend innovative technology with human-centered design to
                    bring your boldest ideas to life. Every solution is crafted
                    to be scalable, intuitive, and future-proof.
                  </p>
                </div>

                {/* Quote - Improved for mobile */}
                <div className="relative bg-muted/30 p-3 sm:p-5 rounded-lg mt-4 sm:mt-6 border-l-4 border-brand-gold">
                  <div className="absolute top-0 right-0 text-4xl sm:text-5xl text-brand-gold/10 font-serif">
                    "
                  </div>
                  <p className="text-xs sm:text-sm italic relative z-10">
                    Every line of code and every pixel should serve a purpose —
                    to create beautiful experiences that solve real problems.
                  </p>
                  <div className="absolute bottom-0 right-4 text-4xl sm:text-5xl text-brand-gold/10 font-serif">
                    "
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
