<template lang="">
  <div class="h-screen bg-zinc-950">
    <NuxtRouteAnnouncer />
    <BaseHeroComponent />
  </div>
</template>
<script>
export default {
  setup() {
    useHead({
      title: 'Home',
      titleTemplate: '%s | Portofolio'
    })
  }
}
</script>
<style lang="">
  
</style>