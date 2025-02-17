import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
      "@components": "/src/components",
      "@pages": "/src/pages",
      "@assets": "/src/assets",
      "@hooks": "/src/hooks",
    },
  },
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
});
