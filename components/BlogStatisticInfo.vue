<template>
  <div
    class="container-card-statistic"
  >
    <div class="flex items-center gap-5">
      <div class="flex items-center gap-2 group">
        <IconBook
          class="icon-statistic group-hover:text-orange-400"
        />
        <span class="text-statistic"
          >{{
            reading_time
              ? formatReadingTime(reading_time.estimated_seconds)
              : formatReadingTime(0)
          }}
        </span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { IconBook } from "@tabler/icons-vue";
import type { TBlogReadingTime } from "~/types/blog.type";

defineProps<{
  reading_time: TBlogReadingTime;
}>();

const formatReadingTime = (estimated_seconds: number) => {
  const minutes = Math.floor(estimated_seconds / 60);
  const seconds = estimated_seconds % 60;

  if (minutes > 0) {
    return `${minutes} min read`;
  } else if (seconds > 0) {
    return `${seconds} sec read`;
  } else {
    return "0 sec read";
  }
};
</script>
<style lang=""></style>
