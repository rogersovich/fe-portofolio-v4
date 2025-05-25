<template>
  <div
    class="flex flex-col items-center justify-center gap-4 border border-solid border-zinc-50/[.05] rounded-xl p-4 min-h-[16rem]"
  >
    <IconMoodSad class="size-10 text-muted-foreground" />
    <div class="flex flex-col gap-2 items-center">
      <div class="text-2xl font-rethink font-bold">{{ title }} not found</div>
      <div class="text-muted-foreground text-sm">
        Im sorry the {{ title }} you are looking for is not found
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconMoodSad } from "@tabler/icons-vue";

const { title } = defineProps<{
  title: string;
}>();
</script>
