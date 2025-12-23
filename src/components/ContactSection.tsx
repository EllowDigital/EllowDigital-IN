import { useState } from "react";
import { Mail, Phone, Github, Send, MapPin, Clock, MessageSquare, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { motion } from "framer-motion";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      value: "ellowdigitalindia@gmail.com",
      href: "mailto:ellowdigitalindia@gmail.com",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Phone",
      value: "+91 89604 46756",
      href: "tel:+918960446756",
    },
    {
      icon: <Github className="h-5 w-5" />,
      label: "GitHub",
      value: "github.com/ellowdigitals",
      href: "https://github.com/ellowdigitals",
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Location",
      value: "India",
    },
  ];

  const features = [
    "Free consultation",
    "Quick response time",
    "Custom solutions",
    "Ongoing support",
  ];

  return (
    <section id="contact" className="py-20 sm:py-28 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-brand-yellow/3 to-background" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-yellow/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px]" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 text-sm font-medium text-brand-yellow mb-6"
          >
            <MessageSquare className="w-4 h-4" />
            Get In Touch
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-5 tracking-tight">
            Let's <span className="bg-gradient-to-r from-brand-yellow to-brand-gold bg-clip-text text-transparent">Connect</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Have a project in mind? Get in touch and let's create something amazing together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">
                Start a conversation
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Fill out the form and I'll get back to you within 24 hours. Looking forward to hearing about your project!
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4 text-brand-yellow flex-shrink-0" />
                  <span className="text-sm text-foreground/80">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Contact Cards */}
            <div className="grid gap-3">
              {contactInfo.map((contact, index) => {
                const isExternal = contact.href?.startsWith("http");
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="group"
                  >
                    {contact.href ? (
                      <a
                        href={contact.href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noreferrer noopener" : undefined}
                        className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border/30 hover:border-brand-yellow/30 hover:bg-card transition-all duration-300"
                      >
                        <div className="w-12 h-12 rounded-xl bg-brand-yellow/10 group-hover:bg-brand-yellow/20 flex items-center justify-center text-brand-yellow transition-colors">
                          {contact.icon}
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider">{contact.label}</p>
                          <p className="font-medium text-foreground">{contact.value}</p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border/30">
                        <div className="w-12 h-12 rounded-xl bg-brand-yellow/10 flex items-center justify-center text-brand-yellow">
                          {contact.icon}
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider">{contact.label}</p>
                          <p className="font-medium text-foreground">{contact.value}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Working Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="p-5 rounded-xl bg-gradient-to-br from-brand-yellow/10 to-brand-gold/5 border border-brand-yellow/15"
            >
              <div className="flex items-center gap-3 mb-2">
                <Clock className="h-5 w-5 text-brand-yellow" />
                <h4 className="font-semibold text-foreground">Working Hours</h4>
              </div>
              <p className="text-muted-foreground text-sm">
                Monday - Saturday: 10:00 AM - 7:00 PM IST
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute -inset-2 bg-gradient-to-br from-brand-yellow/15 to-brand-gold/10 rounded-3xl blur-2xl" />
            <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl border border-border/50 p-8 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-background/50 border-border/50 focus:border-brand-yellow focus:ring-brand-yellow/20 transition-colors h-12"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-background/50 border-border/50 focus:border-brand-yellow focus:ring-brand-yellow/20 transition-colors h-12"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    className="bg-background/50 border-border/50 focus:border-brand-yellow focus:ring-brand-yellow/20 transition-colors resize-none"
                  />
                </div>

                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-brand-yellow to-brand-gold hover:from-brand-gold hover:to-brand-yellow text-primary-foreground font-semibold shadow-xl shadow-brand-yellow/20 hover:shadow-brand-yellow/30 transition-all duration-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                        />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
