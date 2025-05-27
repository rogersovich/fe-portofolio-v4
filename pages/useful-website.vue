<template>
  <div
    class="min-h-screen bg-zinc-50 dark:bg-zinc-950 relative overflow-y-scroll z-10 overflow-x-hidden"
  >
    <div class="absolute bottom-0 left-8 z-[-1]">
      <div
        class="uppercase text-[5rem] md:text-[10rem] font-rethink font-bold text-zinc-950/[.05] dark:text-zinc-50/[.05]"
      >
        <div>Useful</div>
        <div>Website</div>
      </div>
    </div>
    <div
      class="layout text-center pb-12 pt-12 md:pb-16 md:pt-36 flex flex-col justify-center"
    >
      <div
        class="flex flex-col items-center justify-center md:justify-start gap-3 md:gap-2"
      >
        <ClientOnly>
          <div
            v-if="isMobile"
            class="border border-solid border-zinc-950/[.1] dark:border-zinc-50/[.1] rounded-lg p-2 flex items-center justify-center mb-2"
          >
            <IconUserSquare class="size-6" />
          </div>
        </ClientOnly>
        <div class="text-4xl md:text-6xl font-rethink font-bold">
          <span> Useful </span>
          <BaseTextHighlight :duration="500" class="text-head-highlight">
            Websites
          </BaseTextHighlight>
        </div>
        <div class="text-muted-foreground text-sm md:text-base md:mt-3">
          A story of growth and experiences
        </div>
      </div>
    </div>
    <section
      class="layout pb-6 pt-6 md:pb-8 md:pt-8 flex flex-col justify-center"
    >
      <div class="grid grid-cols-12 gap-y-6 gap-x-6">
        <template v-for="website in LIST_WEBSITE">
          <div class="col-span-12 md:col-span-6">
            <CardUsefulWebsite
              :title="website.title"
              :description="website.description"
              :url="website.url"
            />
          </div>
        </template>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { isMobile } from "~/composables/useBreakpoint";
import { IconUserSquare } from "@tabler/icons-vue";

useHead({
  title: "Useful Website",
  titleTemplate: "%s | Portofolio",
});

const LIST_WEBSITE = [
  {
    title: "Eleven Labs",
    description:
      "ElevenLabs is an AI audio research and deployment company. Our mission is to make content universally accessible in any language and in any voice.",
    url: "https://elevenlabs.io/",
  },
  {
    title: "Inspira UI",
    description:
      "Inspira UI is a collection of elegant, ready-to-use Vue components designed to be flexible and easy to integrate. Rather than being a traditional component library, it allows you to pick, customize, and adapt components as needed, giving you the freedom to shape them to fit your unique project requirements.",
    url: "https://inspira-ui.com/",
  },
  {
    title: "NotebookLM",
    description: "NotebookLM is an AI-powered research assistant that can help you get to critical insights faster and easier, all grounded in the information you provide.",
    url: "https://notebooklm.google/",
  },
  {
    title: "Leonardo AI",
    description: "Leonardo AI is a leading AI-powered platform for generating images from text, offering tools for creating various art styles, training custom AI models, and editing visuals.",
    url: "https://leonardo.ai/",
  },
  {
    title: "Lord Icon",
    description: "Lordicon is a growing library full of carefully crafted, high-quality static and animated icons you won’t find anywhere else.",
    url: "https://lordicon.com/",
  },
  {
    title: "Pinner.io",
    description: "Easily download Pinterest videos, images, GIFs, and more with fast and secure downloads.",
    url: "https://piner.io/",
  },
];
</script>

<style lang=""></style>
