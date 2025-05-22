<template>
  <template v-for="skill in technologies" :key="skill.tech_id">
    <div class="col-span-6 md:col-span-3">
      <div
        class="border border-solid border-zinc-50/[.15] rounded-lg p-4 min-h-[200px] flex items-center justify-center flex-col gap-2 group"
      >
        <div class="text-2xl">
          <NuxtImg
            :src="MINIO_BASE_URL + skill.logo_file_name"
            height="50"
            densities="x1 x2"
            class="grayscale group-hover:grayscale-0 transition-transform duration-300 group-hover:rotate-[360deg] group-hover:scale-150"
          />
        </div>
        <div class="text-lg font-bold tracking-wide">
          {{ skill.name }}
        </div>
      </div>
    </div>
  </template>
</template>
<script setup lang="ts">
import type { TPublicTechnology } from "~/types/about.type";

defineProps<{
  technologies: TPublicTechnology[];
}>();

const MINIO_BASE_URL = useMinioUrl();
</script>
<style lang=""></style>
