<template>
  <div
    class="border border-solid border-zinc-950/[.1] dark:border-zinc-50/[.1] rounded-xl px-4 md:px-6 py-6 md:py-8 relative min-h-[180px]"
  >
    <a
      :href="url"
      target="_blank"
      class="font-rethink text-foreground font-semibold text-2xl hover:underline flex items-center gap-2 cursor-pointer z-10 relative"
    >
      <span> {{ title }} </span>
      <IconExternalLink class="size-4" />
    </a>
    <div class="mt-1 text-muted-foreground font-light leading-6 line-clamp-3 z-10 relative">
      {{ description }}
    </div>
    <ClientOnly>
      <div
        class="absolute top-3 right-5 z-1"
      >
        <span class="text-[6rem] opacity-[.3]">
          {{ getRandomEmoji() }}
        </span>
      </div>
    </ClientOnly>
  </div>
</template>
<script setup lang="ts">
import { IconExternalLink } from "@tabler/icons-vue";
const { getRandomEmoji } = useRandomEmoji();

const props = defineProps<{
  title?: string;
  description?: string;
  url?: string;
}>();
</script>
<style></style>
