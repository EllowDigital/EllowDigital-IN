import { useState } from "react";
import { Mail, Phone, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

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

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <section id="contact" className="py-24">
      <div className="section-container">
        <h2 className="section-title">Let's Connect</h2>
        <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto mb-16">
          Have a project in mind? Get in touch and let's create something
          amazing together.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info Section */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold">Get in Touch</h3>
            <p className="text-muted-foreground">
              Fill out the form and I'll get back to you as soon as possible.
              Looking forward to hearing about your project!
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: <Mail className="h-5 w-5 text-brand-purple" />,
                  label: "Email",
                  value: "contact@ellowdigitals.com",
                },
                {
                  icon: <Phone className="h-5 w-5 text-brand-purple" />,
                  label: "Phone",
                  value: "+91 98765 43210",
                },
                {
                  icon: <Github className="h-5 w-5 text-brand-purple" />,
                  label: "GitHub",
                  value: "github.com/ellowdigitals",
                  href: "https://github.com/ellowdigitals",
                },
              ].map((contact, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-purple/10 flex items-center justify-center">
                    {contact.icon}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {contact.label}
                    </p>
                    {contact.href ? (
                      <a
                        href={contact.href}
                        className="font-medium hover:text-brand-purple"
                      >
                        {contact.value}
                      </a>
                    ) : (
                      <p className="font-medium">{contact.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="bg-card rounded-xl border border-border/60 p-6 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
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
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-brand-purple hover:bg-brand-darkPurple"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
