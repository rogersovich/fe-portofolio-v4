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
    "nuxt-umami",
  ],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    },
  },
  plugins: [],
  routeRules: {
    "/adminz/**": { ssr: false },
    "/authz/**": { ssr: false },
  },
  colorMode: {
    classSuffix: "",
    preference: 'system',
    fallback: "dark"
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
        options: {
          darkModeSelector: ".dark",
        },
      },
      ripple: true,
      inputVariant: "outlined",
    },
    autoImport: true,
  },
  umami: {
    id: "2a7a7a81-2052-4135-a5ed-5874fc2acf64",
    host: "https://cloud.umami.is",
    autoTrack: true,
    enabled: true,
    ignoreLocalhost: true,
    logErrors: false,
  }
});
