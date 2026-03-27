export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    mongoUri: process.env.MONGO_URI,
    mongoDbName: process.env.MONGO_DB_NAME,
    public: {
      apiBase: process.env.API_BASE_URL || 'http://localhost:8000/api',
    },
  },
})