import { useState, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Calendar,
  Clock,
  Tag,
  BookOpen,
  Search,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

// --- Blog Post Type ---
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown content
  coverImage: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
  };
  featured?: boolean;
}

// --- Blog Data ---
export const blogPosts: BlogPost[] = [
  {
    slug: "why-your-business-needs-a-website-in-2025",
    title: "Why Your Business Needs a Website in 2025",
    excerpt:
      "In the digital-first era, not having a website is like not having a business card. Discover why a professional website is essential for growth.",
    content: `# Why Your Business Needs a Website in 2025

In today's digital landscape, your website is often the **first impression** potential customers have of your business. Here's why investing in a professional web presence is no longer optional — it's essential.

## 1. Credibility & Trust

Over **75% of consumers** judge a company's credibility based on their website design. A well-designed, modern website immediately establishes trust and positions your brand as professional and reliable.

## 2. 24/7 Availability

Unlike a physical store, your website works around the clock. Customers can learn about your services, browse products, and even make purchases at any time — maximizing your revenue potential.

## 3. Cost-Effective Marketing

Compared to traditional advertising, a website combined with SEO delivers **higher ROI** at a fraction of the cost. Organic search traffic brings qualified leads directly to your business.

## 4. Competitive Advantage

If your competitors have a website and you don't, you're losing customers. A strong online presence levels the playing field and can even give smaller businesses an edge over larger competitors.

## 5. Data-Driven Decisions

With analytics tools, your website provides invaluable insights into customer behavior, preferences, and demographics — enabling smarter business decisions.

---

**Ready to build your online presence?** [Contact EllowDigital](/contact) to get started with a website that drives real results.`,
    coverImage: "/images/projects_img/project2_gsai.webp",
    date: "2025-03-01",
    readTime: "5 min read",
    category: "Business",
    tags: ["Web Development", "Business Growth", "Digital Marketing"],
    author: { name: "Sarwan Yadav", avatar: "/images/founder.webp" },
    featured: true,
  },
  {
    slug: "top-seo-strategies-for-small-businesses",
    title: "Top SEO Strategies for Small Businesses in India",
    excerpt:
      "Learn practical, budget-friendly SEO techniques that can help your small business rank higher on Google and attract more local customers.",
    content: `# Top SEO Strategies for Small Businesses in India

Search Engine Optimization doesn't have to be expensive or complicated. Here are proven strategies that small businesses can implement today.

## Local SEO is Your Best Friend

For small businesses, **local SEO** is the most impactful strategy. This means:

- Claiming and optimizing your **Google Business Profile**
- Getting listed in local directories
- Encouraging customer reviews
- Using location-specific keywords

## On-Page SEO Essentials

Every page on your website should have:

1. **Unique title tags** (under 60 characters)
2. **Meta descriptions** that compel clicks
3. **Header tags** (H1, H2, H3) with relevant keywords
4. **Alt text** on all images
5. **Internal links** connecting related content

## Content is Still King

Publishing regular, high-quality blog content establishes your expertise and gives Google more pages to index. Aim for:

- **One blog post per week** minimum
- Content that answers real customer questions
- A mix of educational and promotional content

## Technical SEO Basics

Don't forget the technical foundations:

- **Mobile-friendly** responsive design
- **Fast loading speeds** (under 3 seconds)
- **HTTPS** security certificate
- Clean **URL structure**

---

Need help with SEO? EllowDigital offers affordable SEO packages starting at ₹4,999/month.`,
    coverImage: "/images/projects_img/project5_rgsktech.webp",
    date: "2025-02-15",
    readTime: "7 min read",
    category: "SEO",
    tags: ["SEO", "Small Business", "Local SEO", "Google Rankings"],
    author: { name: "Sarwan Yadav", avatar: "/images/founder.jpg" },
    featured: true,
  },
  {
    slug: "react-vs-nextjs-which-to-choose",
    title: "React vs Next.js: Which Should You Choose for Your Project?",
    excerpt:
      "A practical comparison of React and Next.js to help you make the right technology choice for your web development project.",
    content: `# React vs Next.js: Which Should You Choose?

Both React and Next.js are powerful tools for building modern web applications, but they serve different purposes. Let's break down when to use each.

## React (Vite)

Best for:
- **Single Page Applications** (SPAs)
- **Dashboards** and admin panels
- Projects where SEO isn't critical
- **Fast development** with minimal setup

## Next.js

Best for:
- **SEO-critical websites** (blogs, e-commerce)
- **Server-side rendered** applications
- Projects needing **API routes**
- **Static site generation** for maximum speed

## Performance Comparison

| Feature | React (Vite) | Next.js |
|---------|-------------|---------|
| Initial Load | Fast | Very Fast (SSR/SSG) |
| SEO | Needs extra setup | Built-in |
| Hosting | Any static host | Vercel recommended |
| Learning Curve | Lower | Moderate |

## Our Recommendation

At EllowDigital, we typically recommend:

- **React + Vite** for web apps, dashboards, and internal tools
- **Next.js** for marketing sites, blogs, and e-commerce

The best choice depends on your specific requirements, budget, and timeline.

---

Not sure which to choose? [Reach out to our team](#contact) for a free consultation.`,
    coverImage: "/images/projects_img/project1_typeblitz.webp",
    date: "2025-01-28",
    readTime: "6 min read",
    category: "Technology",
    tags: ["React", "Next.js", "Web Development", "JavaScript"],
    author: { name: "Sarwan Yadav", avatar: "/images/founder.jpg" },
  },
  {
    slug: "ui-ux-design-principles-that-convert",
    title: "7 UI/UX Design Principles That Actually Convert Visitors",
    excerpt:
      "Design isn't just about looking good — it's about driving action. Learn the key UI/UX principles that turn visitors into customers.",
    content: `# 7 UI/UX Design Principles That Convert

Great design drives business results. Here are seven principles we follow at EllowDigital to create websites that convert.

## 1. Visual Hierarchy

Guide the user's eye to what matters most. Use size, color, and spacing to create a clear path from headline to CTA.

## 2. Consistent Design Language

Every element should feel like it belongs. Consistent colors, typography, and spacing build trust and reduce cognitive load.

## 3. Mobile-First Approach

With **70% of web traffic** coming from mobile in India, designing for mobile first isn't optional — it's essential.

## 4. Speed = Conversions

Every additional second of load time reduces conversions by **7%**. Optimize images, minimize code, and use CDNs.

## 5. Clear Call-to-Actions

Your CTAs should be:
- **Visible** without scrolling
- **Action-oriented** ("Start Your Project" not "Submit")
- **Contrasting** in color from the background

## 6. Social Proof

Testimonials, client logos, and case studies reduce hesitation and build confidence in your services.

## 7. Whitespace is Your Friend

Don't cram everything together. Generous spacing makes content more readable and the design more premium.

---

Want a website that converts? [Let's talk about your project](#contact).`,
    coverImage: "/images/projects_img/project3_sarwan.webp",
    date: "2025-01-10",
    readTime: "4 min read",
    category: "Design",
    tags: ["UI/UX", "Design", "Conversion", "Web Design"],
    author: { name: "Sarwan Yadav", avatar: "/images/founder.jpg" },
  },
];

// --- Helpers ---
const categories = ["All", ...new Set(blogPosts.map((p) => p.category))];

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// --- Schema ---
const blogPageSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": "https://ellowdigital.space/blog",
  url: "https://ellowdigital.space/blog",
  name: "EllowDigital Blog - Web Development & SEO Insights",
  description:
    "Expert articles on web development, SEO, digital marketing, and UI/UX design from the EllowDigital team.",
  publisher: {
    "@id": "https://ellowdigital.space/#organization",
  },
  blogPost: blogPosts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    image: `https://ellowdigital.space${post.coverImage}`,
    url: `https://ellowdigital.space/blog/${post.slug}`,
  })),
};

// --- Components ---
const BlogCard = ({
  post,
  index,
  featured = false,
}: {
  post: BlogPost;
  index: number;
  featured?: boolean;
}) => (
  <motion.article
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{
      duration: 0.7,
      delay: index * 0.1,
      ease: [0.22, 1, 0.36, 1],
    }}
    className={`group ${featured ? "md:col-span-2" : ""}`}
  >
    <Link to={`/blog/${post.slug}`} className="block h-full">
      <div
        className={`relative h-full rounded-2xl overflow-hidden bg-card border border-border/40 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 ${
          featured ? "md:grid md:grid-cols-2" : "flex flex-col"
        }`}
      >
        {/* Image */}
        <div
          className={`relative overflow-hidden ${
            featured ? "aspect-[16/10] md:aspect-auto" : "aspect-[16/10]"
          }`}
        >
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
            width={640}
            height={400}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
              {post.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 flex flex-col justify-center">
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
          </div>

          <h3
            className={`font-bold mb-3 group-hover:text-primary transition-colors leading-tight ${
              featured ? "text-2xl sm:text-3xl" : "text-xl"
            }`}
          >
            {post.title}
          </h3>

          <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2 py-0.5 rounded-md bg-secondary/50 text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/30">
            <div className="flex items-center gap-2">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-8 h-8 rounded-full object-cover"
                loading="lazy"
                width={32}
                height={32}
              />
              <span className="text-sm font-medium text-foreground">
                {post.author.name}
              </span>
            </div>
            <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
              Read More <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  </motion.article>
);

// --- Blog Page ---
const BlogPage = () => {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { scrollYProgress } = useScroll();
  const headerY = useTransform(scrollYProgress, [0, 0.1], [0, -30]);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        filter === "All" || post.category === filter;
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [filter, searchQuery]);

  const featuredPost = filteredPosts.find((p) => p.featured);
  const regularPosts = filteredPosts.filter(
    (p) => p !== featuredPost
  );

  return (
    <>
      <SEOHead
        title="Blog - Web Development & SEO Insights | EllowDigital"
        description="Expert articles on web development, SEO, digital marketing, and UI/UX design. Stay updated with the latest trends and strategies."
        canonicalUrl="https://ellowdigital.space/blog"
        structuredData={blogPageSchema}
        keywords="web development blog, SEO tips, digital marketing insights, UI/UX design, technology blog India"
      />

      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Navbar />

        <main className="flex-grow" id="main-content">
          {/* Hero */}
          <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/8 via-background to-background" />
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

            <motion.div
              style={{ y: headerY }}
              className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">
                    Our Blog
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
                  Insights &{" "}
                  <span className="text-primary">Ideas</span>
                </h1>

                <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                  Expert articles on web development, SEO, design, and
                  digital strategy to help your business grow online.
                </p>

                {/* Search */}
                <div className="relative max-w-md mx-auto mb-8">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-full bg-card/60 border border-border/50 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                    aria-label="Search blog articles"
                  />
                </div>
              </motion.div>
            </motion.div>
          </section>

          {/* Filters + Grid */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
            {/* Category filters */}
            <motion.div
              className="flex flex-wrap justify-center gap-2 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                    filter === cat
                      ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                      : "bg-card/50 text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  <Tag className="w-3 h-3 inline mr-1.5" />
                  {cat}
                </button>
              ))}
            </motion.div>

            {/* Featured post */}
            {featuredPost && (
              <div className="mb-12">
                <BlogCard post={featuredPost} index={0} featured />
              </div>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {regularPosts.map((post, i) => (
                <BlogCard key={post.slug} post={post} index={i + 1} />
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <BookOpen className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  No articles found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try a different search or category.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setFilter("All");
                    setSearchQuery("");
                  }}
                >
                  Clear Filters
                </Button>
              </motion.div>
            )}
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BlogPage;
