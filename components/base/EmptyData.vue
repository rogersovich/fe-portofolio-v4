<template>
  <div
    class="flex flex-col items-center justify-center gap-4 border border-solid border-zinc-50/[.05] rounded-xl p-4 min-h-[16rem]"
  >
    <IconMoodSad class="size-10 text-muted-foreground" />
    <div class="flex flex-col gap-2 items-center">
      <div class="text-2xl font-rethink font-bold">Blogs not found</div>
      <div class="text-muted-foreground text-sm">
        Im sorry the Blogs you are looking for is not found
      </div>
    </div>
    <Button
      type="button"
      variant="outlined"
      class="text-sm justify-start"
      @click="clearSearch"
    >
      <IconRefresh class="size-4" />
      <span> Clear Search </span>
    </Button>
  </div>
</template>

<script setup>
import {
  IconMoodSad,
  IconRefresh,
} from "@tabler/icons-vue";

const emit = defineEmits(['clear-search']);

const clearSearch = () => {
  emit("clear-search")
};
</script>