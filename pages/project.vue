<template>
  <div>
    <div
      class="layout text-center pb-12 pt-12 md:pb-16 md:pt-36 flex flex-col justify-center"
    >
      <div class="flex flex-col gap-2">
        <div class="text-6xl font-rethink font-bold mb-3">
          <span> Featured </span>
          <BaseTextHighlight
            :duration="500"
            class="rounded-lg bg-gradient-to-r from-[#9E7AFF] to-[#FE8BBB]"
          >
            Projects
          </BaseTextHighlight>
        </div>
        <div class="text-muted-foreground">A story of growth and discovery</div>
      </div>
    </div>
    <div
      class="layout pb-12 pt-12 md:pb-16 md:pt-8 flex flex-col justify-center gap-10"
    >
      <div class="flex flex-col gap-6">
        <template v-for="i in 3" :key="i">
          <div class="grid grid-cols-12 gap-6 transition-transform duration-300 hover:translate-x-3">
            <div class="col-span-10">
              <div
                class="border border-solid border-zinc-50/[.05] rounded-xl px-6 py-6 group"
              >
                <h1 class="mt-0 group-hover:text-orange-500">Pesantren SPP</h1>
                <div class="text-muted-foreground">
                  A game that combines iOS and physical puzzle game, using 3D, 360
                  world view, and AR
                </div>
                <div class="flex gap-3 mt-5">
                  <div class="text-muted-foreground">Stack:</div>
                  <div class="flex gap-3">
                    <span> 🎬 </span>
                    <span> 💼 </span>
                  </div>
                </div>
                <div class="flex items-center justify-between mt-8">
                  <Button
                    variant="outlined"
                    size="large"
                    class="text-sm text-white group"
                  >
                    <span> View Project </span>
                    <IconChevronRight class="size-[18px] text-muted-foreground group-hover:text-orange-500" />
                  </Button>
                  <div class="flex items-center gap-2 group cursor-pointer">
                    <IconEyeSpark
                      class="size-[20px] text-zinc-500 group-hover:text-orange-500"
                    />
                    <span
                      class="text-[14px] font-light text-white group-hover:underline"
                      >Open Repository</span
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="col-span-2">
              <div
                class="p-4 border border-solid border-zinc-50/[.05] rounded-xl shrink-0 relative aspect-video lg:aspect-square lg:h-full"
              >
                <NuxtImg src="/images/kucing-hijab.jpg" class="rounded-lg w-full grayscale hover:grayscale-0" />
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { IconEyeSpark, IconChevronRight } from "@tabler/icons-vue";
useHead({
  title: "Project",
  titleTemplate: "%s | Portofolio",
});
</script>
<style lang=""></style>
