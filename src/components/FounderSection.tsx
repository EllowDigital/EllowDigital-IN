import { useRef } from "react";
import {
  User,
  Mail,
  Briefcase,
  Award,
  MapPin,
  ExternalLink,
  Quote,
  ArrowRight,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import {
  headerVariants,
  badgeVariants,
  fadeUpItem,
  smoothEase,
} from "@/utils/scrollAnimations";

const FounderSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="founder"
      ref={sectionRef}
      className="py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="relative section-container max-w-6xl">
        {/* Header */}
        <motion.div
          className="text-center mb-12 lg:mb-14"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            variants={badgeVariants}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-5 py-2 mb-6"
          >
            <User className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary tracking-wide">
              Leadership
            </span>
          </motion.div>

          <motion.h2
            variants={headerVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold"
          >
            Meet Our{" "}
            <span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
              Founder
            </span>
          </motion.h2>
        </motion.div>

        {/* Founder Card */}
        <motion.div
          className="relative"
          variants={fadeUpItem}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Glow effect */}
          <div className="absolute -inset-2 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 rounded-3xl blur-2xl opacity-50" />

          <div className="relative bg-card/70 backdrop-blur-sm border border-border/50 rounded-3xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
              {/* Image Section */}
              <motion.div
                className="lg:col-span-2 relative"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2, ease: smoothEase }}
              >
                <div className="relative h-64 sm:h-80 lg:h-full min-h-[400px]">
                  <img
                    src="/images/founder.jpg"
                    alt="Sarwan Yadav - Founder & CEO"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent lg:bg-gradient-to-r" />

                  {/* Location badge */}
                  <motion.div
                    className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-background/80 backdrop-blur-sm border border-border/50 rounded-full"
                    initial={{ opacity: 0, y: -10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 }}
                  >
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs font-medium">
                      Uttar Pradesh, India
                    </span>
                  </motion.div>

                  {/* Social links */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <motion.a
                      href="mailto:sarwanyadav6174@gmail.com"
                      className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                      aria-label="Email Sarwan Yadav"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Mail className="w-4 h-4" />
                    </motion.a>
                    <motion.a
                      href="https://sarwan.netlify.app/"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                      aria-label="View Portfolio"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>

              {/* Content Section */}
              <motion.div
                className="lg:col-span-3 p-6 sm:p-8 lg:p-10 flex flex-col justify-center"
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3, ease: smoothEase }}
              >
                {/* Name & Title */}
                <div className="mb-6">
                  <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                    Sarwan Yadav
                  </h3>
                  <p className="text-primary font-medium">Founder & CEO</p>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-medium text-primary">
                    <Briefcase className="w-3.5 h-3.5" />
                    Tech Innovator
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-medium text-primary">
                    <Award className="w-3.5 h-3.5" />
                    Digital Excellence
                  </span>
                </div>

                {/* Bio */}
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                  With a passion for innovation and deep understanding of the
                  tech landscape, I founded EllowDigitals to help businesses
                  establish a powerful digital presence. Our solutions are
                  tailored to the unique needs of the market.
                </p>

                {/* Vision Quote */}
                <div className="relative p-5 bg-primary/5 border border-primary/20 rounded-2xl mb-6">
                  <Quote className="absolute top-3 left-3 w-6 h-6 text-primary/30" />
                  <div className="pl-6">
                    <p className="text-sm font-semibold text-foreground mb-2">
                      Our Vision
                    </p>
                    <p className="text-sm text-muted-foreground italic leading-relaxed">
                      "To empower businesses through innovative digital
                      solutions that fuel growth and success. We believe in
                      digital transformation and are committed to making
                      technology accessible and effective for businesses of all
                      sizes."
                    </p>
                  </div>
                </div>

                {/* CTA Button */}
                <motion.a
                  href="#contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full shadow-lg shadow-primary/20 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Connect With Me
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderSection;
