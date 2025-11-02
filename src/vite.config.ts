import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDevelopment = mode === "development";
  const isProduction = mode === "production";

  return {
    server: {
      host: "::",
      port: 8080,
      strictPort: true,
      allowedHosts: ["da7405f0-30e5-42c0-84c0-542948da552d.lovableproject.com"],
    },
    plugins: [react(), isDevelopment && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      // Explicitly tell Vite how to handle directories
      mainFields: ["module", "jsnext:main", "jsnext"],
    },
    build: {
      // Generate sourcemaps for production builds
      sourcemap: false,
      // Minify output
      minify: "terser",
      // Fix for Node.js module externalization in browser
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react", "react-dom", "react-router-dom"],
            ui: ["@/components/ui/index"],
            vendor: ["@tanstack/react-query", "lucide-react", "framer-motion"],
          },
        },
        // Explicitly mark problematic Node.js modules as external to avoid warnings
        external: [
          "http",
          "https",
          "url",
          "path",
          "stream",
          "util",
          "crypto",
          "os",
          "zlib",
          "events",
          "assert",
          "tty",
          "fs",
        ],
      },
      // Chunk size warnings
      chunkSizeWarningLimit: 1000,
    },
    preview: {
      port: 8080,
      strictPort: true,
    },
    // Fix for Node.js module externalization warnings
    optimizeDeps: {
      esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
          global: "globalThis",
        },
      },
    },
  };
});
