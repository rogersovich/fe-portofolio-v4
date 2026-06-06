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
      <div class="flex items-center gap-2 group">
        <IconEye
          class="icon-statistic group-hover:text-orange-400"
        />
        <span class="text-statistic">
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
          class="icon-statistic group-hover:text-orange-400"
        />
        <span class="text-statistic">
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
import type { TPublicProjectDetail } from "~/types/project.type";
import {
  IconUser,
  IconEye,
  IconHeart,
  IconBrandGithub,
  IconWorld,
} from "@tabler/icons-vue";

const { project } = defineProps<{
  project: TPublicProjectDetail;
  isLike: boolean;
  newLike: number | null;
  viewNew: number;
}>();
</script>
<style lang=""></style>
