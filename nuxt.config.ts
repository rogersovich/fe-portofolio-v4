import customTheme from "./themes/customTheme";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: [
    "@/assets/css/fonts.css",
  ],
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@vueuse/motion/nuxt",
    "@nuxt/image",
    "@vueuse/nuxt",
    "@primevue/nuxt-module",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
  ],
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE,
      minio_endpoint: process.env.MINIO_ENDPOINT,
      minio_bucket: process.env.MINIO_BUCKET,
    },
  },
  plugins: [],
  routeRules: {
    "/adminz/**": { ssr: false },
    "/authz/**": { ssr: false },
  },
  colorMode: {
    classSuffix: "",
  },
  tailwindcss: {
    cssPath: ["~/assets/css/tailwind.css", { injectPosition: "first" }],
    configPath: "tailwind.config",
    exposeConfig: false,
    config: {
      prefix: "",
      darkMode: "class",
    },
    viewer: true,
  },
  primevue: {
    usePrimeVue: true,
    options: {
      theme: {
        preset: customTheme,
      },
      ripple: true,
      inputVariant: "outlined",
    },
    autoImport: true,
  },
});
