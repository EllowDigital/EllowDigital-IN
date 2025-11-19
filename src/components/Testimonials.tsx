import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef } from "react";
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
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Copy ref values to variables for cleanup
    const titleElement = titleRef.current;
    const dividerElement = dividerRef.current;
    const carouselElement = carouselRef.current;

    if (titleElement) observer.observe(titleElement);
    if (dividerElement) observer.observe(dividerElement);
    if (carouselElement) observer.observe(carouselElement);

    return () => {
      if (titleElement) observer.unobserve(titleElement);
      if (dividerElement) observer.unobserve(dividerElement);
      if (carouselElement) observer.unobserve(carouselElement);
    };
  }, []);

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
      className="py-24 relative overflow-hidden snap-start bg-card/30 dark:bg-black/20 deferred-section"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-brand-yellow/5 rounded-full blur-3xl morph-shape"></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-brand-gold/5 rounded-full blur-3xl morph-shape"
          style={{ animationDelay: "5s" }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <h2 ref={titleRef} className="section-title reveal-animate">
          Client Testimonials
        </h2>
        <div
          ref={dividerRef}
          className="animated-divider reveal-animate mb-8"
        ></div>

        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12 reveal-animate">
          Don't just take our word for it. Here's what our clients have to say
          about working with EllowDigitals.
        </p>

        <div ref={carouselRef} className="reveal-animate">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="mx-auto max-w-5xl"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/3 pl-4"
                >
                  <Card className="h-full neo-effect card-3d transition-all duration-300 hover:shadow-lg dark:bg-black/40 border border-brand-yellow/10 group">
                    <CardContent className="p-6">
                      {/* Project Type Badge */}
                      <div className="mb-4 -mt-1">
                        <span className="inline-block text-xs font-medium py-1 px-3 rounded-full bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/20">
                          {testimonial.projectType}
                        </span>
                      </div>

                      <div className="flex justify-between items-start mb-4">
                        <div className="flex">
                          {renderStars(testimonial.rating)}
                        </div>
                        <Quote className="w-10 h-10 text-brand-yellow/20 group-hover:text-brand-yellow/30 transition-colors duration-300" />
                      </div>

                      <p className="text-foreground mb-6 line-clamp-4">
                        {testimonial.text}
                      </p>

                      <div className="flex items-center mt-auto pt-4 border-t border-border/30">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border border-brand-gold/20 bg-brand-yellow/5">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground text-base">
                            {testimonial.name}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {testimonial.position}, {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8 gap-4">
              <CarouselPrevious className="static transform-none mx-2 bg-card hover:bg-brand-yellow/10 hover:text-brand-gold border-brand-gold/20 dark:bg-black/50 text-foreground" />
              <CarouselNext className="static transform-none mx-2 bg-card hover:bg-brand-yellow/10 hover:text-brand-gold border-brand-gold/20 dark:bg-black/50 text-foreground" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
