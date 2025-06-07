import customTheme from "./themes/customTheme";
const config = useRuntimeConfig()

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
      minio_endpoint: process.env.NUXT_PUBLIC_MINIO_ENDPOINT,
      minio_bucket: process.env.NUXT_PUBLIC_MINIO_BUCKET,
      umamiId: process.env.NUXT_PUBLIC_UMAMI_ID || '',
      umamiHost: process.env.NUXT_PUBLIC_UMAMI_HOST || '',
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
      },
      ripple: true,
      inputVariant: "outlined",
    },
    autoImport: true,
  },
  umami: {
    autoTrack: true,
    enabled: true,
    ignoreLocalhost: true,
    logErrors: true,
  }
});
