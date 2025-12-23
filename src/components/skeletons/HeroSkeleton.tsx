import { motion } from "framer-motion";

const HeroSkeleton = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <div className="section-container text-center">
        {/* Badge skeleton */}
        <motion.div
          className="inline-flex h-10 w-48 rounded-full bg-secondary/50 mb-8"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />

        {/* Title skeleton */}
        <div className="space-y-4 mb-8">
          <motion.div
            className="h-14 md:h-20 w-3/4 mx-auto rounded-lg bg-secondary/50"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
          />
          <motion.div
            className="h-14 md:h-20 w-1/2 mx-auto rounded-lg bg-secondary/50"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          />
        </div>

        {/* Description skeleton */}
        <motion.div
          className="h-6 w-2/3 mx-auto rounded-lg bg-secondary/50 mb-4"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
        />
        <motion.div
          className="h-6 w-1/2 mx-auto rounded-lg bg-secondary/50 mb-10"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
        />

        {/* Buttons skeleton */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <motion.div
            className="h-14 w-40 rounded-full bg-primary/20"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          />
          <motion.div
            className="h-14 w-36 rounded-full bg-secondary/50"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
          />
        </div>

        {/* Stats skeleton */}
        <div className="flex items-center justify-center gap-8">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <motion.div
                className="w-12 h-12 rounded-xl bg-secondary/50"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.7 + i * 0.1 }}
              />
              <div className="space-y-2">
                <motion.div
                  className="h-6 w-16 rounded bg-secondary/50"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.8 + i * 0.1 }}
                />
                <motion.div
                  className="h-4 w-20 rounded bg-secondary/30"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.9 + i * 0.1 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSkeleton;
