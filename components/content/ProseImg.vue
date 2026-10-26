<template>
  <img :src="cloudinaryUrl(src, 1200)" :alt="alt" :width="width" :height="height" loading="lazy" />
</template>
<script setup lang="ts">
defineProps<{
  src: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
}>();
</script>
