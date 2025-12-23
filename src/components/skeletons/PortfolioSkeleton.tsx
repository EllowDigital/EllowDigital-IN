import { motion } from "framer-motion";

const PortfolioSkeleton = () => {
  return (
    <section className="py-24 relative">
      <div className="section-container">
        {/* Header skeleton */}
        <div className="text-center mb-14">
          <motion.div
            className="inline-flex h-10 w-36 rounded-full bg-secondary/50 mb-6"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div
            className="h-12 w-56 mx-auto rounded-lg bg-secondary/50 mb-4"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
          />
          <motion.div
            className="h-6 w-80 max-w-full mx-auto rounded-lg bg-secondary/30"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          />
        </div>

        {/* Filter tabs skeleton */}
        <div className="flex justify-center mb-12">
          <motion.div
            className="inline-flex gap-2 p-1.5 rounded-2xl bg-card/60 border border-border/30"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-10 w-20 rounded-xl bg-secondary/50"
              />
            ))}
          </motion.div>
        </div>

        {/* Projects grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className={`rounded-2xl border border-border/30 bg-card/50 overflow-hidden ${
                i === 0 ? "md:col-span-2" : ""
              }`}
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
            >
              {/* Image skeleton */}
              <motion.div
                className={`w-full bg-secondary/40 ${
                  i === 0 ? "aspect-[2.5/1]" : "aspect-[4/3]"
                }`}
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 + i * 0.1 }}
              />
              
              {/* Content skeleton */}
              <div className="p-5">
                <motion.div
                  className="h-6 w-3/4 rounded bg-secondary/50 mb-2"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 + i * 0.1 }}
                />
                <motion.div
                  className="h-4 w-full rounded bg-secondary/30 mb-4"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 + i * 0.1 }}
                />
                
                {/* Tags skeleton */}
                <div className="flex gap-2">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <motion.div
                      key={j}
                      className="h-6 w-16 rounded-md bg-secondary/40"
                      animate={{ opacity: [0.5, 0.8, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.7 + j * 0.05 }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSkeleton;
