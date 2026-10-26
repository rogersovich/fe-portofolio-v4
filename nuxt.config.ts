import { readdirSync } from "node:fs";
import customTheme from "./themes/customTheme";

// Every blog/project detail page must be prerendered, even ones not linked
// from the first infinite-scroll batch.
const contentRoutes = (dir: string) =>
  readdirSync(`./content/${dir}`)
    .filter((f) => f.endsWith(".md"))
    .map((f) => `/${dir}/${f.replace(/\.md$/, "")}`);

// Same rule as the old Go backend: 225 words per minute.
const WORDS_PER_MINUTE = 225;
const readingSeconds = (markdown: string) => {
  const text = markdown
    .replace(/^---[\s\S]*?---/, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_`~|-]/g, " ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.round((words / WORDS_PER_MINUTE) * 60);
};

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
    "nuxt-umami",
    "@nuxt/content",
  ],
  plugins: [],
  image: {
    // Static hosting has no IPX server; serve images as-is
    // (Cloudinary URLs get their own f_auto/q_auto transform via cloudinaryUrl)
    provider: "none",
  },
  content: {
    build: {
      // Code blocks are highlighted client-side with highlight.js (same look as before)
      markdown: { highlight: false },
    },
    renderer: { anchorLinks: false },
    experimental: { sqliteConnector: "native" },
  },
  hooks: {
    "content:file:afterParse"(ctx) {
      if (ctx.collection.name === "blog") {
        ctx.content.readingSeconds = readingSeconds(ctx.file.body);
      }
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/", ...contentRoutes("blog"), ...contentRoutes("project")],
    },
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
    // Forms package was only used by the removed admin CMS
    components: { exclude: ["Form", "FormField", "Editor", "Chart"] },
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
