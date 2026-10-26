import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/product/",
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "../public/product",
    emptyOutDir: true,
  },
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: true,
    // The Next dev server proxies /product here. Allow that host header.
    allowedHosts: true,
    hmr: { clientPort: 5173 },
  },
});
