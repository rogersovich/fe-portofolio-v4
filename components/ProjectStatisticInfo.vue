<template>
  <div
    class="flex justify-between md:px-4 py-4 border border-solid border-zinc-50/[.05] border-x-0"
  >
    <div class="flex items-center gap-5" v-if="project">
      <div class="flex items-center gap-2 group">
        <IconUser class="size-4 text-zinc-500 group-hover:text-orange-400" />
        <span class="text-[12px] text-zinc-300"> Personal Project </span>
      </div>
      <div class="flex items-center gap-2 group">
        <IconEye class="size-4 text-zinc-500 group-hover:text-orange-400" />
        <span class="text-[12px] text-zinc-300"
          >{{ project.statistic ? project.statistic.views : 0 }}
          views
        </span>
      </div>
      <div class="flex items-center gap-2 group">
        <IconHeart class="size-4 text-zinc-500 group-hover:text-orange-400" />
        <span class="text-[12px] text-zinc-300">
          {{ project.statistic ? project.statistic.likes : 0 }}
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
          class="size-4 text-zinc-500 group-hover:text-orange-400"
        />
        <span
          class="text-[12px] text-zinc-300 group-hover:underline group-hover:text-white"
        >
          Repository
        </span>
      </a>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { TPublicProjectDetail } from "~/types/project.type";
import { IconUser, IconEye, IconHeart, IconBrandGithub } from "@tabler/icons-vue";

const { project } = defineProps<{
  project: TPublicProjectDetail;
}>();
</script>
<style lang=""></style>
