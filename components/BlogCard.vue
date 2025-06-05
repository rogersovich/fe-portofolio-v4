<template>
  <ClientOnly>
    <div
      class="w-full mb-6"
      :class="{
        'mb-0': index === blog_length,
      }"
    >
      <div
        class="border border-solid border-zinc-950/[.05] dark:border-zinc-50/[.05] rounded-xl p-3 md:p-6 w-full grid grid-cols-12 gap-x-6 items-center"
      >
        <div class="col-span-12" v-if="isMobile">
          <ClientOnly>
            <RouterLink :to="`/blog/${blog.slug}`">
              <div class="mb-4">
                <NuxtImg
                  :src="MINIO_BASE_URL + blog.banner_file_name"
                  class="w-full max-h-[200px] rounded-lg object-cover"
                  :quality="40"
                />
              </div>
            </RouterLink>
          </ClientOnly>
        </div>
        <div class="col-span-12 md:col-span-9">
          <div class="flex items-center gap-2">
            <IconCalendar class="h-[18px] w-[18px] text-muted-foreground" />
            <span class="text-[12px] md:text-[13px]">
              {{ formatDate(blog.published_at) }}
            </span>
          </div>

          <div class="mt-4 font-rethink mb-1 text-xl md:text-2xl font-bold">
            {{ blog.title }}
          </div>
          <div
            class="text-muted-foreground font-light text-sm md:text-base"
            v-html="truncatedText"
          ></div>
          <div
            class="flex flex-col md:flex-row gap-4 md:gap-0 justify-between pb-5 mt-2"
          >
            <div class="flex items-center gap-5">
              <div class="flex items-center gap-2">
                <IconEye class="size-4 text-orange-500 dark:text-orange-400" />
                <span
                  class="text-[11px] md:text-[12px]text-[12px] text-zinc-600 dark:text-zinc-300"
                  >{{ blog.statistic.views }}
                  views
                </span>
              </div>
              <div class="flex items-center gap-2">
                <IconBook class="size-4 text-orange-500 dark:text-orange-400" />
                <span
                  class="text-[11px] md:text-[12px] text-zinc-600 dark:text-zinc-300"
                  >{{
                    blog.reading_time
                      ? formatReadingTime(blog.reading_time.estimated_seconds)
                      : formatReadingTime(0)
                  }}
                </span>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <template v-for="topic in blog.topics" :key="topic.id">
                <Chip
                  :label="topic.name"
                  class="text-[11px] md:text-[12px] text-muted-foreground px-2.5 py-1.5"
                  :class="{
                  'text-zinc-950 bg-orange-400/[.4]': filterTopics.includes(
                    topic.id as never
                  ),
                }"
                />
              </template>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <RouterLink :to="`/blog/${blog.slug}`">
              <Button
                variant="outlined"
                size="large"
                class="!text-[12px] md:!text-sm text-foreground group !border-orange-500/[.2]"
              >
                <span> View blog </span>
                <IconChevronRight
                  class="size-[18px] md:text-muted-foreground text-orange-500 md:group-hover:text-orange-400"
                />
              </Button>
            </RouterLink>
          </div>
        </div>
        <div class="col-span-3" v-if="!isMobile">
          <ClientOnly>
            <RouterLink :to="`/blog/${blog.slug}`">
              <NuxtImg
                :src="MINIO_BASE_URL + blog.banner_file_name"
                class="w-full rounded-lg object-cover"
                :quality="40"
              />
            </RouterLink>
          </ClientOnly>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>
<script setup lang="ts">
import dayjs from "dayjs";
import type { TPublicBlog } from "~/types/blog.type";
import { isMobile } from "~/composables/useBreakpoint";
import {
  IconCalendar,
  IconChevronRight,
  IconEye,
  IconBook,
} from "@tabler/icons-vue";

const { blog } = defineProps<{
  blog: TPublicBlog;
  blog_length: number;
  index: number;
  filterTopics: any[];
}>();

const MINIO_BASE_URL = useMinioUrl();

const formatDate = (dateString: string, format: string = "MMM DD, YYYY") => {
  return dayjs(dateString).format(format);
};

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

const truncatedText = computed(() => {
  // 1) strip all tags
  const plain = blog.summary.replace(/<[^>]+>/g, "");

  // 2) if under limit, return as-is
  if (plain.length <= 150) return plain;

  // 3) otherwise cut and add ellipsis
  return plain.slice(0, 150) + "…";
});
</script>
<style lang=""></style>
