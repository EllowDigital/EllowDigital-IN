import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import viteCompression from "vite-plugin-compression";
import { VitePWA } from "vite-plugin-pwa";

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
    plugins: [
      react(),
      isDevelopment && componentTagger(),
      // Compression for production builds
      isProduction &&
        viteCompression({
          algorithm: "gzip",
          ext: ".gz",
        }),
      isProduction &&
        viteCompression({
          algorithm: "brotliCompress",
          ext: ".br",
        }),
      // PWA support for offline capabilities and better mobile experience
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: [
          "favicon.ico",
          "apple-touch-icon.png",
          "masked-icon.svg",
        ],
        manifest: {
          name: "EllowDigital",
          short_name: "EllowDigital",
          description: "Digital transformation services for businesses",
          theme_color: "#ffd700",
          icons: [
            {
              src: "/favicon/android-chrome-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "/favicon/android-chrome-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
            {
              src: "/favicon/android-chrome-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any maskable",
            },
          ],
        },
      }),
    ].filter(Boolean),
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
