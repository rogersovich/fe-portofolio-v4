<template>
  <div
    class="container-card-statistic"
  >
    <div class="flex items-center gap-3 md:gap-5">
      <div class="flex items-center gap-2 group">
        <IconEye
          class="icon-statistic group-hover:text-orange-400"
        />
        <span class="text-statistic">
          <template v-if="viewNew == statistic.views">
            {{ statistic ? statistic.views : 0 }}
          </template>
          <template v-else>
            {{ viewNew }}
          </template>
          views
        </span>
      </div>
      <div class="flex items-center gap-2 group">
        <IconHeart
          class="icon-statistic group-hover:text-orange-400"
        />
        <span class="text-statistic">
          <template v-if="!isLike">
            {{ statistic ? statistic.likes : 0 }}
          </template>
          <template v-else>
            {{ newLike }}
          </template>
          likes
        </span>
      </div>
    </div>
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
import { IconBook, IconEye, IconHeart } from "@tabler/icons-vue";
import type { TBlogReadingTime, TBlogStatistic } from "~/types/blog.type";

const { statistic } = defineProps<{
  statistic: TBlogStatistic;
  reading_time: TBlogReadingTime;
  isLike: boolean;
  newLike: number | null;
  viewNew: number;
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
