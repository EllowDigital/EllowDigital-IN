import {
  Code,
  Smartphone,
  Layout,
  Search,
  Server,
  HeartPulse,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Services Data Array
const services = [
  {
    title: "Web Development",
    description:
      "Lightning-fast, mobile-first, SEO-optimized websites using modern technologies.",
    icon: Code,
    details: "HTML5, CSS3, React, Node.js",
  },
  {
    title: "Mobile App Development",
    description: "Beautiful and intuitive apps for Android and iOS platforms.",
    icon: Smartphone,
    details: "Flutter, React Native, Native Tools",
  },
  {
    title: "UI/UX Design",
    description:
      "Clean, user-centered, and accessible interfaces that drive engagement.",
    icon: Layout,
    details: "Wireframing, Prototyping, User Testing",
  },
  {
    title: "SEO & Performance",
    description:
      "Implementing rank-ready strategies and speed optimizations for conversions.",
    icon: Search,
    details: "Technical SEO, Speed Optimization",
  },
  {
    title: "Custom Software",
    description:
      "Tailored tools and automation systems to improve business efficiency.",
    icon: Server,
    details: "Business Solutions, Automation",
  },
  {
    title: "Maintenance & Support",
    description:
      "Ongoing updates, bug fixes, and expert consultation for your projects.",
    icon: HeartPulse,
    details: "Updates, Security, Performance",
  },
];

// Service Card Component
const ServiceCard = ({ title, description, icon: Icon, details }) => (
  <Card className="relative border border-border/60 overflow-hidden hover:shadow-lg transition-shadow">
    {/* Gradient Bar */}
    <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-brand-purple to-brand-cyan" />
    {/* Card Header */}
    <CardHeader className="pb-2">
      <div className="text-brand-purple mb-3">
        <Icon className="h-10 w-10" />
      </div>
      <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      <CardDescription className="text-base text-muted-foreground">
        {description}
      </CardDescription>
    </CardHeader>
    {/* Card Content */}
    <CardContent>
      <div className="text-xs font-medium bg-secondary py-1 px-2 rounded-full inline-block">
        {details}
      </div>
    </CardContent>
  </Card>
);

// Services Section Component
const ServicesSection = () => (
  <section id="services" className="py-24">
    <div className="section-container">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="section-title text-4xl font-bold mb-4">Our Services</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          From concept to deployment, we provide comprehensive digital services
          to help your business thrive in the digital landscape.
        </p>
      </div>

      {/* Service Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map(({ title, description, icon, details }) => (
          <ServiceCard
            key={title} // Use title as unique key (ensure titles are unique)
            title={title}
            description={description}
            icon={icon}
            details={details}
          />
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
