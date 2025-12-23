import { useRef, useCallback, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote, ArrowLeft, ArrowRight, MessageSquare, Pause, Play } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const testimonials = [
  {
    name: "Nitish Yadav",
    company: "Ghatak Sports Academy India™",
    position: "Founder & CEO",
    rating: 5,
    image: "images/nitesh.png",
    projectType: "Website Development",
    text: "EllowDigital truly elevated our digital presence. Their team captured the essence of our brand and delivered a sleek, functional website that has received fantastic feedback from our users.",
  },
  {
    name: "Sarwan Yadav",
    company: "EllowDigital",
    position: "Founder & CEO",
    rating: 5,
    image: "images/projects_img/project1_typeblitz.webp",
    projectType: "TypeBlitz - Boost Your Typing Skills",
    text: "The EllowDigital team was instrumental in shaping TypeBlitz into a user-centric platform. Their creative approach to design and deep understanding of user behavior made the final product both engaging and effective.",
  },
  {
    name: "Anish Yadav",
    company: "EllowDigital",
    position: "CTO",
    rating: 5,
    image: "images/projects_img/project1_typeblitz.webp",
    projectType: "TypeBlitz - Boost Your Typing Skills",
    text: "From a technical standpoint, working with EllowDigital was seamless. Their attention to detail and commitment to performance optimization helped us build a fast, scalable learning tool that users appreciate.",
  },
];

const Testimonials = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Autoplay plugin with configuration
  const autoplayPlugin = useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  const toggleAutoplay = useCallback(() => {
    const autoplay = autoplayPlugin.current;
    if (!autoplay) return;
    
    if (isPlaying) {
      autoplay.stop();
    } else {
      autoplay.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "text-primary fill-primary" : "text-muted/30"
        }`}
      />
    ));
  };

  return (
    <section
      id="testimonials"
      className="py-24 lg:py-32 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      <div className="absolute top-0 left-1/3 w-[700px] h-[700px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 lg:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-5 py-2 mb-6"
          >
            <MessageSquare className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary tracking-wide">
              Testimonials
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            What Our{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
                Clients Say
              </span>
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say
            about working with EllowDigital.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <Carousel
            setApi={setApi}
            opts={{
              align: "center",
              loop: true,
              dragFree: true,
            }}
            plugins={[autoplayPlugin.current]}
            className="mx-auto max-w-5xl"
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/2"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="h-full"
                  >
                    <div
                      className={`group relative h-full rounded-2xl p-6 lg:p-8 transition-all duration-500 overflow-hidden ${
                        current === index
                          ? "bg-card border-2 border-primary/30 shadow-2xl shadow-primary/10 scale-100"
                          : "bg-card/50 border border-border/40 scale-[0.97] opacity-70"
                      }`}
                    >
                      {/* Gradient background */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 transition-opacity duration-500 ${
                          current === index ? "opacity-100" : "opacity-0"
                        }`}
                      />

                      {/* Large quote icon */}
                      <div className="absolute -top-4 -right-4 opacity-[0.03]">
                        <Quote className="w-40 h-40 text-foreground" />
                      </div>

                      {/* Content */}
                      <div className="relative z-10">
                        {/* Project badge & stars */}
                        <div className="flex items-center justify-between mb-5">
                          <span className="inline-flex items-center text-xs font-semibold py-1.5 px-3 rounded-full bg-primary/10 text-primary border border-primary/20">
                            {testimonial.projectType.length > 20
                              ? testimonial.projectType.substring(0, 20) + "..."
                              : testimonial.projectType}
                          </span>
                          <div className="flex gap-0.5">
                            {renderStars(testimonial.rating)}
                          </div>
                        </div>

                        {/* Quote icon */}
                        <div className="mb-4">
                          <Quote className="w-8 h-8 text-primary/40" />
                        </div>

                        {/* Testimonial text */}
                        <p className="text-foreground text-base lg:text-lg leading-relaxed mb-8 min-h-[120px]">
                          {testimonial.text}
                        </p>

                        {/* Author */}
                        <div className="flex items-center pt-6 border-t border-border/30">
                          <div className="relative mr-4">
                            <div
                              className={`w-14 h-14 rounded-xl overflow-hidden ring-2 ring-offset-2 ring-offset-card transition-all duration-300 ${
                                current === index
                                  ? "ring-primary/50"
                                  : "ring-border/30"
                              }`}
                            >
                              <img
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            </div>
                            {/* Online indicator */}
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-card" />
                          </div>
                          <div>
                            <h3
                              className={`font-bold text-lg transition-colors duration-300 ${
                                current === index
                                  ? "text-primary"
                                  : "text-foreground"
                              }`}
                            >
                              {testimonial.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {testimonial.position}
                            </p>
                            <p className="text-xs text-muted-foreground/70">
                              {testimonial.company}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-10">
            {/* Prev button */}
            <motion.button
              onClick={scrollPrev}
              className="w-12 h-12 rounded-xl bg-card/70 backdrop-blur-sm border border-border/50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`transition-all duration-300 rounded-full ${
                    current === index
                      ? "w-8 h-2 bg-primary"
                      : "w-2 h-2 bg-border hover:bg-primary/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Play/Pause button */}
            <motion.button
              onClick={toggleAutoplay}
              className="w-10 h-10 rounded-full bg-card/70 backdrop-blur-sm border border-border/50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isPlaying ? "Pause autoplay" : "Resume autoplay"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </motion.button>

            {/* Next button */}
            <motion.button
              onClick={scrollNext}
              className="w-12 h-12 rounded-xl bg-card/70 backdrop-blur-sm border border-border/50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next testimonial"
            >
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-14 lg:mt-16"
        >
          <motion.div
            className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/50"
            whileHover={{ scale: 1.01 }}
          >
            <p className="text-muted-foreground">
              Ready to become our next success story?
            </p>
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 rounded-full shadow-lg shadow-primary/20 transition-all duration-300"
              whileHover={{ scale: 1.02, gap: "0.75rem" }}
              whileTap={{ scale: 0.98 }}
            >
              Start Your Project
              <ArrowRight className="h-4 w-4" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
