import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", // Projenizin URL'sini burada ayarlayın
    setupNodeEvents(on, config) {
      // Node event listeners buraya eklenebilir
    },
  },
});
