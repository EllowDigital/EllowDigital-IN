import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote, ArrowLeft, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Nitish Yadav",
    company: "Ghatak Sports Academy India™",
    position: "Founder & CEO",
    rating: 5,
    image: "images/nitesh.png",
    projectType: "Website Development",
    text: "EllowDigital truly elevated our digital presence. Their team captured the essence of our brand and delivered a sleek, functional website that has received fantastic feedback from our users.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    name: "Sarwan Yadav",
    company: "EllowDigital",
    position: "Founder & CEO",
    rating: 5,
    image: "images/projects_img/project1_typeblitz.webp",
    projectType: "TypeBlitz - Boost Your Typing Skills",
    text: "The EllowDigital team was instrumental in shaping TypeBlitz into a user-centric platform. Their creative approach to design and deep understanding of user behavior made the final product both engaging and effective.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    name: "Anish Yadav",
    company: "EllowDigital",
    position: "CTO",
    rating: 5,
    image: "images/projects_img/project1_typeblitz.webp",
    projectType: "TypeBlitz - Boost Your Typing Skills",
    text: "From a technical standpoint, working with EllowDigital was seamless. Their attention to detail and commitment to performance optimization helped us build a fast, scalable learning tool that users appreciate.",
    gradient: "from-orange-500 to-red-500",
  },
];

const Testimonials = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "text-brand-yellow fill-brand-yellow" : "text-muted"
        }`}
      />
    ));
  };

  return (
    <section
      id="testimonials"
      className="py-24 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-brand-yellow/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl" />

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
            <span className="text-sm font-medium text-primary">Testimonials</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What Our{" "}
            <span className="bg-gradient-to-r from-primary via-brand-purple to-brand-cyan bg-clip-text text-transparent">
              Clients Say
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what our clients have to say
            about working with EllowDigitals.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="mx-auto max-w-6xl"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/3 pl-4"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="h-full"
                  >
                    <div className="group relative h-full bg-card/50 backdrop-blur-sm border border-border/40 rounded-2xl p-6 hover:border-primary/30 transition-all duration-500 overflow-hidden">
                      {/* Gradient overlay on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                      {/* Quote icon */}
                      <div className="absolute top-4 right-4">
                        <Quote className="w-10 h-10 text-primary/10 group-hover:text-primary/20 transition-colors duration-300" />
                      </div>

                      {/* Project Type Badge */}
                      <div className="mb-4">
                        <span className={`inline-block text-xs font-medium py-1.5 px-3 rounded-full bg-gradient-to-r ${testimonial.gradient} text-white`}>
                          {testimonial.projectType}
                        </span>
                      </div>

                      {/* Stars */}
                      <div className="flex gap-1 mb-4">
                        {renderStars(testimonial.rating)}
                      </div>

                      {/* Testimonial Text */}
                      <p className="text-foreground mb-6 leading-relaxed line-clamp-4">
                        "{testimonial.text}"
                      </p>

                      {/* Author */}
                      <div className="flex items-center mt-auto pt-4 border-t border-border/30">
                        <div className={`w-12 h-12 rounded-xl overflow-hidden mr-4 ring-2 ring-offset-2 ring-offset-card ring-primary/20 group-hover:ring-primary/40 transition-all duration-300`}>
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                            {testimonial.name}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {testimonial.position}, {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Buttons */}
            <div className="flex justify-center mt-10 gap-4">
              <CarouselPrevious className="static transform-none w-12 h-12 rounded-xl bg-card/50 backdrop-blur-sm border border-border/40 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300">
                <ArrowLeft className="w-5 h-5" />
              </CarouselPrevious>
              <CarouselNext className="static transform-none w-12 h-12 rounded-xl bg-card/50 backdrop-blur-sm border border-border/40 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300">
                <ArrowRight className="w-5 h-5" />
              </CarouselNext>
            </div>
          </Carousel>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">
            Ready to become our next success story?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-300"
          >
            Start Your Project
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
