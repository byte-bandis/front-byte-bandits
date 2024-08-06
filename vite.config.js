import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { join } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.js",
    alias: {
      "@": join(__dirname, "./src"),
    },
    coverage: {
      provider: "c8", // Usa 'c8' como proveedor de cobertura
      reporter: ["text", "json", "html"], // Especifica los formatos de reporte
      reportsDirectory: "coverage", // Directorio para los informes de cobertura
    },
  },
});
