<template>
   <ClientOnly fallback-tag="span" fallback="Loading dashboard...">
     <div>
       <div class="text-3xl font-rethink font-bold">Dashboard</div>
     </div>
   </ClientOnly>
</template>
<script setup>
useHead({
  title: "Admin - Dashboard",
  titleTemplate: "%s | Portofolio",
});

definePageMeta({
  layout: "admin",
  middleware: "auth",
});
</script>
<style lang=""></style>
