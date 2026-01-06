import { motion } from "framer-motion";
import { HeroSkeleton, SectionSkeleton, PortfolioSkeleton } from "./index";

const PageSkeleton = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar skeleton */}
      <div className="fixed top-2 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
        <motion.div
          className="h-16 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/30 flex items-center justify-between px-6"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {/* Logo skeleton */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary/20" />
            <div className="h-5 w-24 rounded bg-secondary/50 hidden sm:block" />
          </div>

          {/* Nav links skeleton */}
          <div className="hidden lg:flex items-center gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-8 w-16 rounded-full bg-secondary/40" />
            ))}
          </div>

          {/* Right actions skeleton */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-secondary/50" />
            <div className="w-9 h-9 rounded-full bg-secondary/50" />
            <div className="hidden sm:block h-10 w-28 rounded-full bg-primary/20" />
          </div>
        </motion.div>
      </div>

      {/* Page content skeletons */}
      <HeroSkeleton />
      <SectionSkeleton cards={4} columns={4} />
      <SectionSkeleton cards={6} columns={3} />
      <PortfolioSkeleton />
      <SectionSkeleton cards={4} columns={4} />

      {/* Footer skeleton */}
      <div className="border-t border-border/30 py-16">
        <div className="section-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {Array.from({ length: 4 }).map((_, i) => (
              <motion.div
                key={i}
                className="space-y-4"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
              >
                <div className="h-6 w-24 rounded bg-secondary/50" />
                <div className="space-y-2">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <div
                      key={j}
                      className="h-4 w-full rounded bg-secondary/30"
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageSkeleton;
