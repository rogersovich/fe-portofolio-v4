<template>
  <div>
    ini project
  </div>
</template>
<script setup lang="ts">
useHead({
  title: "Admin - Project",
  titleTemplate: "%s | Portofolio",
});

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

</script>
<style lang="">
  
</style>