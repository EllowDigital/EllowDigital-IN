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
    // Scroll to top on mount
    window.scrollTo(0, 0);

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
        <section className="relative overflow-hidden py-12">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-yellow/5 to-transparent pointer-events-none" />
          <div className="section-container relative">
            <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
              <Badge
                variant="outline"
                className="px-4 py-1.5 text-brand-yellow border-brand-yellow/50 gap-2 mb-6 animate-fade-in"
              >
                <Users className="w-4 h-4" />
                <span>Our Expert Team</span>
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text animate-fade-in">
                Meet the Minds Behind{" "}
                <span className="text-brand-yellow">EllowDigital</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
                A passionate team of developers, designers, and innovators dedicated to bringing your digital vision to life.
              </p>
            </div>
          </div>
        </section>

        {/* Team Members Grid */}
        <section className="section-container py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card
                key={member.id}
                className="card-hover overflow-hidden bg-gradient-to-br from-card to-card/50 border-border/50 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-6 space-y-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-4">
                      <div className="absolute inset-0 bg-gradient-to-r from-brand-gold to-brand-yellow rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
                      <Avatar className="w-24 h-24 border-3 border-brand-yellow relative">
                        <AvatarImage src={member.image} alt={member.name} />
                        <AvatarFallback className="bg-brand-yellow/20 text-brand-yellow text-xl">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <h3 className="font-bold text-2xl mb-1">{member.name}</h3>
                    <p className="text-brand-yellow font-medium">{member.role}</p>
                  </div>
                  
                  <CardContent className="px-0 pb-0 space-y-4">
                    <p className="text-muted-foreground text-center leading-relaxed">{member.bio}</p>
                    
                    <div>
                      <h4 className="text-sm font-semibold mb-3 text-center">Core Expertise</h4>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {member.specialties.map((specialty, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="bg-gradient-to-r from-brand-yellow/10 to-brand-gold/10 hover:from-brand-yellow/20 hover:to-brand-gold/20 border border-brand-yellow/20 text-xs font-medium transition-all"
                          >
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-center gap-4 pt-4 border-t border-border/50">
                      {Object.entries(member.social).map(([platform, url]) => (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-brand-yellow transition-all transform hover:scale-110"
                          aria-label={`${member.name}'s ${platform}`}
                        >
                          <span className="capitalize text-sm font-medium">{platform}</span>
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
          <div className="max-w-4xl mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/10 via-brand-yellow/10 to-brand-gold/10 rounded-2xl blur-xl" />
            <div className="relative bg-gradient-to-br from-card to-card/80 p-8 md:p-12 rounded-2xl border border-brand-yellow/20 text-center">
              <div className="inline-block p-3 bg-gradient-to-r from-brand-gold/20 to-brand-yellow/20 rounded-full mb-4">
                <Users className="w-8 h-8 text-brand-yellow" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
                Join Our Growing Team
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                We're always looking for talented, passionate individuals who want to make an impact. 
                Whether you're a developer, designer, or marketing expert, we'd love to hear from you.
              </p>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "/#contact";
                }}
                className="inline-block px-8 py-3.5 bg-gradient-to-r from-brand-gold to-brand-yellow text-black font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default TeamPage;
