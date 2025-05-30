import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  server:
    command === "serve"
      ? {
          proxy: {
            "/api": {
              target: "http://localhost:5005",
              changeOrigin: true,
              secure: false,
            },
            "/uploads": {
              target: "http://localhost:5005",
              changeOrigin: true,
              secure: false,
            },
          },
        }
      : undefined,
}));
