import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import compression from "vite-plugin-compression";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDevelopment = mode === "development";

  const nodeEnv = isDevelopment ? "development" : "production";

  return {
    define: {
      "process.env.NODE_ENV": JSON.stringify(nodeEnv),
    },
    server: {
      host: "::",
      port: 8080,
      strictPort: true,
    },
    plugins: [
      react(),
      compression({
        algorithm: "brotliCompress",
        ext: ".br",
        threshold: 1024,
      }),
      isDevelopment && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        ...(isDevelopment
          ? {
              "react/jsx-dev-runtime": path.resolve(
                __dirname,
                "node_modules/react/cjs/react-jsx-dev-runtime.development.js"
              ),
            }
          : {}),
      },
    },
    build: {
      target: "es2018",
      cssCodeSplit: true,
      sourcemap: false,
      chunkSizeWarningLimit: 1200,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },
        },
      },
    },
    optimizeDeps: {
      include: ["react", "react-dom"],
      esbuildOptions: {
        define: {
          "process.env.NODE_ENV": JSON.stringify(nodeEnv),
        },
      },
    },
    esbuild: {
      drop: isDevelopment ? [] : ["console", "debugger"],
    },
  };
});
