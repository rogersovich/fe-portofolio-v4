<template lang="">
  <div class="bg-zinc-50 dark:bg-zinc-950">
    <BaseHeroComponent />
    <SectionFeaturedProject />
    <SectionFeaturedBlog />
  </div>
</template>
<script setup lang="ts">
const siteUrl = 'https://dimasroger.com' 
useSeoMeta({
  title: 'Home | Portofolio',
  ogTitle: 'Home | Portofolio',
  description: 'Hello, my name is Dimas Roger Widianto, please enjoy my portofolio',
  ogDescription: 'Hello, my name is Dimas Roger Widianto, please enjoy my portofolio',
  ogImage: `${siteUrl}/images/1-1200x650.jpg`,
  twitterCard: 'summary_large_image',
})
</script>
<style lang=""></style>
