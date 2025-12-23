import { motion } from "framer-motion";

interface SectionSkeletonProps {
  cards?: number;
  columns?: 2 | 3 | 4;
}

const SectionSkeleton = ({ cards = 3, columns = 3 }: SectionSkeletonProps) => {
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <section className="py-24 relative">
      <div className="section-container">
        {/* Header skeleton */}
        <div className="text-center mb-14">
          <motion.div
            className="inline-flex h-10 w-32 rounded-full bg-secondary/50 mb-6"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div
            className="h-12 w-64 mx-auto rounded-lg bg-secondary/50 mb-4"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
          />
          <motion.div
            className="h-6 w-96 max-w-full mx-auto rounded-lg bg-secondary/30"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          />
        </div>

        {/* Cards grid skeleton */}
        <div className={`grid grid-cols-1 ${gridCols[columns]} gap-6`}>
          {Array.from({ length: cards }).map((_, i) => (
            <motion.div
              key={i}
              className="rounded-2xl border border-border/30 bg-card/50 p-6"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
            >
              {/* Icon skeleton */}
              <motion.div
                className="w-14 h-14 rounded-xl bg-secondary/50 mb-6"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 + i * 0.1 }}
              />
              
              {/* Title skeleton */}
              <motion.div
                className="h-6 w-3/4 rounded bg-secondary/50 mb-3"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 + i * 0.1 }}
              />
              
              {/* Description skeleton */}
              <div className="space-y-2">
                <motion.div
                  className="h-4 w-full rounded bg-secondary/30"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 + i * 0.1 }}
                />
                <motion.div
                  className="h-4 w-5/6 rounded bg-secondary/30"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 + i * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionSkeleton;
