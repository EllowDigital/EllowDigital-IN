import { User, Mail, Briefcase, Award, MapPin, Linkedin, ExternalLink, Quote } from "lucide-react";
import { motion } from "framer-motion";

const FounderSection = () => {
  return (
    <section
      id="founder"
      className="py-16 sm:py-20 lg:py-28 relative overflow-hidden"
    >
      {/* Modern gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-brand-yellow/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-secondary/50 border border-border/50 rounded-full text-sm text-muted-foreground">
            <User className="w-4 h-4 text-brand-yellow" />
            Leadership
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Meet Our <span className="bg-gradient-to-r from-brand-yellow to-brand-gold bg-clip-text text-transparent">Founder</span>
          </h2>
        </motion.div>

        {/* Founder Card */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Glow effect */}
          <div className="absolute -inset-2 bg-gradient-to-r from-brand-yellow/10 via-transparent to-brand-gold/10 rounded-3xl blur-2xl opacity-50" />
          
          <div className="relative bg-secondary/20 backdrop-blur-sm border border-border/30 rounded-3xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
              {/* Image Section */}
              <div className="lg:col-span-2 relative">
                <div className="relative h-64 sm:h-80 lg:h-full min-h-[400px]">
                  <img
                    src="/images/founder.jpg"
                    alt="Sarwan Yadav - Founder & CEO"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent lg:bg-gradient-to-r" />
                  
                  {/* Location badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-background/80 backdrop-blur-sm border border-border/50 rounded-full">
                    <MapPin className="w-3.5 h-3.5 text-brand-yellow" />
                    <span className="text-xs font-medium">Uttar Pradesh, India</span>
                  </div>

                  {/* Social links */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <motion.a
                      href="mailto:sarwanyadav6174@gmail.com"
                      className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center text-foreground hover:bg-brand-yellow hover:text-primary-foreground hover:border-brand-yellow transition-all duration-300"
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
                      className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center text-foreground hover:bg-brand-yellow hover:text-primary-foreground hover:border-brand-yellow transition-all duration-300"
                      aria-label="View Portfolio"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="lg:col-span-3 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                {/* Name & Title */}
                <div className="mb-6">
                  <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">Sarwan Yadav</h3>
                  <p className="text-brand-yellow font-medium">Founder & CEO</p>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-yellow/10 border border-brand-yellow/20 rounded-full text-xs font-medium text-brand-yellow">
                    <Briefcase className="w-3.5 h-3.5" />
                    Tech Innovator
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-gold/10 border border-brand-gold/20 rounded-full text-xs font-medium text-brand-gold">
                    <Award className="w-3.5 h-3.5" />
                    Digital Excellence
                  </span>
                </div>

                {/* Bio */}
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                  With a passion for innovation and deep understanding of the tech landscape, I founded EllowDigitals to help businesses establish a powerful digital presence. Our solutions are tailored to the unique needs of the market.
                </p>

                {/* Vision Quote */}
                <div className="relative p-5 bg-gradient-to-br from-brand-yellow/5 to-brand-gold/5 border border-brand-yellow/20 rounded-2xl mb-6">
                  <Quote className="absolute top-3 left-3 w-6 h-6 text-brand-yellow/30" />
                  <div className="pl-6">
                    <p className="text-sm font-semibold text-foreground mb-2">Our Vision</p>
                    <p className="text-sm text-muted-foreground italic leading-relaxed">
                      "To empower businesses through innovative digital solutions that fuel growth and success. We believe in digital transformation and are committed to making technology accessible and effective for businesses of all sizes."
                    </p>
                  </div>
                </div>

                {/* CTA Button */}
                <motion.button
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-brand-yellow to-brand-gold text-primary-foreground font-semibold rounded-full shadow-lg shadow-brand-yellow/20 hover:shadow-xl hover:shadow-brand-yellow/30 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Connect With Me
                  <Mail className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderSection;
