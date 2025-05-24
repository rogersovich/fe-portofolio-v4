<template>
  <div
    class="flex justify-between px-4 md:px-4 py-4 bg-zinc-950/[.1] dark:transparant border border-solid border-zinc-950/[.1] dark:border-zinc-50/[.05] border-x-0"
  >
    <div class="flex items-center gap-5" v-if="project">
      <div class="flex items-center gap-2 group">
        <IconUser
          class="size-4 text-zinc-800 dark:text-zinc-500 group-hover:text-orange-400"
        />
        <span class="text-[12px] text-zinc-700 dark:text-zinc-300">
          Personal Project
        </span>
      </div>
      <div class="flex items-center gap-2 group">
        <IconEye
          class="size-4 text-zinc-800 dark:text-zinc-500 group-hover:text-orange-400"
        />
        <span class="text-[12px] text-zinc-700 dark:text-zinc-300">
          <template v-if="viewNew == project.statistic.views">
            {{ project.statistic ? project.statistic.views : 0 }}
          </template>
          <template v-else>
            {{ viewNew }}
          </template>
          views
        </span>
      </div>
      <div class="flex items-center gap-2 group">
        <IconHeart
          class="size-4 text-zinc-800 dark:text-zinc-500 group-hover:text-orange-400"
        />
        <span class="text-[12px] text-zinc-700 dark:text-zinc-300">
          <template v-if="!isLike">
            {{ project.statistic ? project.statistic.likes : 0 }}
          </template>
          <template v-else>
            {{ newLike }}
          </template>
          likes
        </span>
      </div>
    </div>
    <div class="flex items-center gap-5" v-if="project">
      <a
        v-if="project.repository_url"
        :href="project.repository_url"
        target="_blank"
        class="flex items-center gap-2 group cursor-pointer no-underline"
      >
        <IconBrandGithub
          class="size-4 text-zinc-800 dark:text-zinc-500 group-hover:text-orange-400"
        />
        <span
          class="text-[12px] text-zinc-700 dark:text-zinc-300 group-hover:underline group-hover:text-white"
        >
          Repository
        </span>
      </a>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { TPublicProjectDetail } from "~/types/project.type";
import {
  IconUser,
  IconEye,
  IconHeart,
  IconBrandGithub,
} from "@tabler/icons-vue";

const { project } = defineProps<{
  project: TPublicProjectDetail;
  isLike: boolean;
  newLike: number | null;
  viewNew: number;
}>();
</script>
<style lang=""></style>
