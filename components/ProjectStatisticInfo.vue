<template>
  <div
    class="container-card-statistic"
  >
    <div class="flex items-center gap-3 md:gap-5" v-if="project">
      <div class="flex items-center gap-2 group">
        <IconUser
          class="icon-statistic group-hover:text-orange-400"
        />
        <span class="text-statistic">
          Personal
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
          class="icon-statistic group-hover:text-orange-400"
        />
        <span
          class="text-statistic group-hover:underline"
        >
          Repository
        </span>
      </a>
      <a
        v-if="project.website_url"
        :href="project.website_url"
        target="_blank"
        class="flex items-center gap-2 group cursor-pointer no-underline"
      >
        <IconWorld
          class="icon-statistic group-hover:text-orange-400"
        />
        <span
          class="text-statistic group-hover:underline"
        >
          Website
        </span>
      </a>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { TPublicProject } from "~/types/project.type";
import {
  IconUser,
  IconBrandGithub,
  IconWorld,
} from "@tabler/icons-vue";

defineProps<{
  project: TPublicProject;
}>();
</script>
<style lang=""></style>
