<template>
  <template v-for="skill in technologies" :key="skill.tech_id">
    <div class="col-span-6 md:col-span-3">
      <div class="card-skill group">
        <div class="text-2xl">
          <NuxtImg
            :src="useTechIcon(skill.slug)"
            height="50"
            :quality="40"
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
</script>
<style lang=""></style>
