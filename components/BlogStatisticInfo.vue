<template>
  <div
    class="flex justify-between px-4 md:px-4 py-4 bg-zinc-950/[.1] dark:transparant border border-solid border-zinc-950/[.1] dark:border-zinc-50/[.05] border-x-0"
  >
    <div class="flex items-center gap-5">
      <div class="flex items-center gap-2 group">
        <IconEye class="size-4 text-zinc-800 dark:text-zinc-500 group-hover:text-orange-400" />
        <span class="text-[12px] text-zinc-700 dark:text-zinc-300"
          >{{ statistic ? statistic.views : 0 }}
          views
        </span>
      </div>
      <div class="flex items-center gap-2 group">
        <IconHeart class="size-4 text-zinc-800 dark:text-zinc-500 group-hover:text-orange-400" />
        <span class="text-[12px] text-zinc-700 dark:text-zinc-300">
          {{ statistic ? statistic.likes : 0 }}
          likes
        </span>
      </div>
    </div>
    <div class="flex items-center gap-5">
      <div class="flex items-center gap-2 group">
        <IconBook class="size-4 text-zinc-800 dark:text-zinc-500 group-hover:text-orange-400" />
        <span class="text-[12px] text-zinc-700 dark:text-zinc-300"
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
import { IconBook, IconEye, IconHeart } from "@tabler/icons-vue";
import type { TBlogReadingTime, TBlogStatistic } from "~/types/blog.type";

const { statistic } = defineProps<{
  statistic: TBlogStatistic;
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
