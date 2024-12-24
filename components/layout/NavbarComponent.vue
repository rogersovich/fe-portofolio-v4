<template lang="">
  <div class="pointer-events-none fixed top-0 inset-x-0 z-50 opacity-100 hover:!opacity-100">
    <div class="hidden min-[570px]:flex pointer-events-auto mt-8 px-3 rounded-lg bg-zinc-800/60 w-fit mx-auto text-sm md:text-base">
      <div class="flex items-center gap-4">
        <template v-for="nav in listNavs" :key="nav.title">
          <a class="py-3 px-2 font-rethink transition-colors cursor-pointer hover:text-[#9E7AFF]">
            <NuxtLink :to="nav.link">
              {{ nav.title }}
            </NuxtLink>
          </a>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  setup() {
    const listNavs = [
      {
        title: "Home",
        link: "/"
      },
      {
        title: "Projects",
        link: "/"
      },
      {
        title: "About",
        link: "/about"
      },
    ]

    return {
      listNavs
    }
  }
}
</script>
<style lang="">
  
</style>