import { useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Share2,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { blogPosts } from "@/pages/BlogPage";

// Simple markdown to HTML renderer
const renderMarkdown = (md: string): string => {
  let html = md
    // Headers
    .replace(
      /^### (.*$)/gm,
      '<h3 class="text-xl font-bold mt-8 mb-3 text-foreground">$1</h3>'
    )
    .replace(
      /^## (.*$)/gm,
      '<h2 class="text-2xl sm:text-3xl font-bold mt-12 mb-4 text-foreground">$1</h2>'
    )
    .replace(
      /^# (.*$)/gm,
      '<h1 class="text-3xl sm:text-4xl font-bold mt-8 mb-6 text-foreground">$1</h1>'
    )
    // Bold & italic
    .replace(
      /\*\*(.*?)\*\*/g,
      '<strong class="font-semibold text-foreground">$1</strong>'
    )
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    // Links
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-primary hover:underline underline-offset-4">$1</a>'
    )
    // Horizontal rules
    .replace(/^---$/gm, '<hr class="my-8 border-border/50" />')
    // Unordered lists
    .replace(
      /^- (.*$)/gm,
      '<li class="flex items-start gap-2 mb-2"><span class="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span><span>$1</span></li>'
    )
    // Ordered lists
    .replace(
      /^(\d+)\. (.*$)/gm,
      '<li class="flex items-start gap-2 mb-2"><span class="text-primary font-bold">$1.</span><span>$2</span></li>'
    )
    // Tables (basic)
    .replace(/\|(.+)\|/g, (match) => {
      const cells = match
        .split("|")
        .filter(Boolean)
        .map((c) => c.trim());
      if (cells.every((c) => /^-+$/.test(c))) return "";
      const tag = cells.length > 0 ? "td" : "td";
      return `<tr>${cells
        .map(
          (c) =>
            `<${tag} class="px-4 py-2 border border-border/30">${c}</${tag}>`
        )
        .join("")}</tr>`;
    })
    // Paragraphs
    .replace(/^(?!<[hlutrd]|<li|<hr|<tr)(.*$)/gm, (_, content) =>
      content.trim()
        ? `<p class="text-muted-foreground leading-relaxed mb-4">${content}</p>`
        : ""
    );

  // Wrap lists
  html = html.replace(
    /(<li.*?<\/li>\n?)+/g,
    (match) => `<ul class="my-4 space-y-1">${match}</ul>`
  );

  // Wrap tables
  html = html.replace(
    /(<tr.*?<\/tr>\n?)+/g,
    (match) =>
      `<div class="overflow-x-auto my-6"><table class="w-full border-collapse">${match}</table></div>`
  );

  return html;
};

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const renderedContent = useMemo(
    () => (post ? renderMarkdown(post.content) : ""),
    [post]
  );

  const nextPost = useMemo(() => {
    if (!post) return null;
    const idx = blogPosts.indexOf(post);
    return blogPosts[(idx + 1) % blogPosts.length];
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The article you're looking for doesn't exist.
            </p>
            <Link
              to="/blog"
              className="text-primary hover:underline inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const postSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    publisher: {
      "@id": "https://ellowdigital.space/#organization",
    },
    image: `https://ellowdigital.space${post.coverImage}`,
    url: `https://ellowdigital.space/blog/${post.slug}`,
    mainEntityOfPage: `https://ellowdigital.space/blog/${post.slug}`,
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <>
      <SEOHead
        title={`${post.title} | EllowDigital Blog`}
        description={post.excerpt}
        canonicalUrl={`https://ellowdigital.space/blog/${post.slug}`}
        structuredData={postSchema}
        ogType="article"
        publishedTime={post.date}
        keywords={post.tags.join(", ")}
      />

      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Navbar />

        <main className="flex-grow" id="main-content">
          {/* Hero cover */}
          <section className="relative pt-20 sm:pt-24">
            <div className="relative h-[40vh] sm:h-[50vh] overflow-hidden">
              <motion.img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            </div>
          </section>

          {/* Article */}
          <article className="relative max-w-3xl mx-auto px-4 sm:px-6 -mt-20 sm:-mt-32 z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Back link */}
              <Link
                to="/blog"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6 group"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Blog
              </Link>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
                  {post.category}
                </span>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(post.date)}
                </span>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tight">
                {post.title}
              </h1>

              {/* Author + Share */}
              <div className="flex items-center justify-between pb-8 mb-8 border-b border-border/40">
                <div className="flex items-center gap-3">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20"
                    width={40}
                    height={40}
                  />
                  <div>
                    <p className="font-medium text-foreground">
                      {post.author.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      EllowDigital
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Share article"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div
                className="prose-custom"
                dangerouslySetInnerHTML={{ __html: renderedContent }}
              />

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border/40">
                <Tag className="w-4 h-4 text-muted-foreground" />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-secondary/50 text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Next post */}
              {nextPost && (
                <motion.div
                  className="mt-16 p-6 rounded-2xl bg-card/50 border border-border/40"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <p className="text-sm text-muted-foreground mb-2">
                    Next Article
                  </p>
                  <Link
                    to={`/blog/${nextPost.slug}`}
                    className="group flex items-center justify-between"
                  >
                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                      {nextPost.title}
                    </h3>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </article>

          <div className="h-24" />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BlogPostPage;
