<template>
  <div
    class="border border-solid border-zinc-950/[.1] dark:border-zinc-50/[.1] rounded-xl px-4 md:px-6 py-6 md:py-8 relative"
  >
    <a
      :href="url"
      target="_blank"
      class="font-rethink text-foreground font-semibold text-2xl hover:underline flex items-center gap-2 cursor-pointer"
    >
      <span> {{ title }} </span>
      <IconExternalLink class="size-4" />
    </a>
    <div class="mt-1 text-muted-foreground font-light leading-6 line-clamp-3">
     {{ description }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { IconExternalLink } from "@tabler/icons-vue";

const props = defineProps<{
  title?: string;
  description?: string;
  url?: string;
}>();

</script>
<style></style>
