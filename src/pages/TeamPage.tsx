import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

const TeamPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const teamMembers = [
    {
      id: 1,
      name: "Sarwan Yadav",
      role: "Founder & Lead Developer",
      image: "/images/founder.jpg",
      bio: "Sarwan is the founder of EllowDigital with over 2 years of experience in web development and digital marketing. He's passionate about creating innovative digital solutions that help businesses grow.",
      specialties: [
        "Full-stack Development",
        "UI/UX Design",
        "Project Management",
      ],
      social: {
        linkedin: "https://linkedin.com/in/sarwan6174",
        github: "https://github.com/devsarwan",
        twitter: "https://twitter.com/devsarwan",
      },
    },
    // {
    //   id: 2,
    //   name: "Aisha Patel",
    //   role: "Senior UI/UX Designer",
    //   image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=500&q=80",
    //   bio: "Aisha brings 5 years of experience in creating beautiful, intuitive interfaces. Her designs focus on enhancing user experience while maintaining brand consistency.",
    //   specialties: ["User Interface Design", "Prototyping", "User Research"],
    //   social: {
    //     linkedin: "https://linkedin.com/in/example",
    //     dribbble: "https://dribbble.com/example",
    //   },
    // },
    // {
    //   id: 3,
    //   name: "David Chen",
    //   role: "Backend Developer",
    //   image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=500&q=80",
    //   bio: "David specializes in building robust backend systems and APIs. With expertise in Node.js, Express, and database optimization, he ensures our applications perform flawlessly.",
    //   specialties: ["Backend Architecture", "API Development", "Database Design"],
    //   social: {
    //     linkedin: "https://linkedin.com/in/example",
    //     github: "https://github.com/example",
    //   },
    // },
    // {
    //   id: 4,
    //   name: "Sarah Johnson",
    //   role: "Marketing Specialist",
    //   image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=500&q=80",
    //   bio: "Sarah handles our digital marketing strategies. She's an expert in social media marketing, content creation, and SEO optimization to help our clients reach their target audience.",
    //   specialties: ["Digital Marketing", "Social Media", "SEO/SEM"],
    //   social: {
    //     linkedin: "https://linkedin.com/in/example",
    //     twitter: "https://twitter.com/example",
    //   },
    // },
  ];

  return (
    <>
      <Helmet>
        <title>Our Team | EllowDigital</title>
        <meta
          name="description"
          content="Meet the talented team behind EllowDigital - experts in web development, design, and digital marketing."
        />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-background pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="section-container">
            <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 gradient-text">
                Meet Our Team
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                The talented people behind EllowDigital's success
              </p>
              <div className="flex items-center justify-center">
                <Badge
                  variant="outline"
                  className="px-3 py-1 text-brand-yellow border-brand-yellow/50 gap-1"
                >
                  <Users className="w-4 h-4" />
                  <span>Our Experts</span>
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Team Members Grid */}
        <section className="section-container py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card
                key={member.id}
                className="card-hover overflow-hidden bg-card/50 border-border/50"
              >
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="w-16 h-16 border-2 border-brand-yellow">
                      <AvatarImage src={member.image} alt={member.name} />
                      <AvatarFallback className="bg-brand-yellow/20 text-brand-yellow">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold text-xl">{member.name}</h3>
                      <p className="text-brand-yellow text-sm">{member.role}</p>
                    </div>
                  </div>
                  <CardContent className="px-0 pb-0">
                    <p className="text-muted-foreground mb-4">{member.bio}</p>
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Specialties:</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.specialties.map((specialty, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-brand-yellow/10 hover:bg-brand-yellow/20 text-xs"
                          >
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-3 mt-4 border-t border-border/50 pt-4">
                      {Object.entries(member.social).map(([platform, url]) => (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-brand-yellow transition-colors"
                          aria-label={`${member.name}'s ${platform}`}
                        >
                          <span className="capitalize text-xs">{platform}</span>
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Join Our Team Section */}
        <section className="section-container py-12 mt-8">
          <div className="max-w-3xl mx-auto bg-card p-8 rounded-xl border border-border/50 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Want to Join Our Team?
            </h2>
            <p className="text-muted-foreground mb-6">
              We're always looking for talented individuals to join our growing
              team. If you're passionate about creating amazing digital
              experiences, we'd love to hear from you.
            </p>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                // Navigate to home page and scroll to contact section
                window.location.href = "/#contact";
              }}
              className="px-6 py-2.5 bg-gradient-to-r from-brand-gold to-brand-yellow text-black font-bold rounded-full shadow hover:scale-105 transition-transform inline-block"
            >
              Get in Touch
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default TeamPage;
