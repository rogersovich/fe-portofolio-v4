<template lang="">
  <div class="min-h-screen bg-zinc-950">
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