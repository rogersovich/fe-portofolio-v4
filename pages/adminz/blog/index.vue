<template>
  <div>
    ini blog
  </div>
</template>
<script setup lang="ts">
useHead({
  title: "Admin - Blog",
  titleTemplate: "%s | Portofolio",
});

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

</script>
<style lang="">
  
</style>