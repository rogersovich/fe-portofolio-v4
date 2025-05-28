<template>
  <div
    class="layout flex flex-col justify-start items-start space-y-12 pb-24 md:pb-32"
  >
    <div
      class="flex flex-col items-center md:items-center justify-center md:justify-center gap-3 md:gap-2 w-full"
    >
      <ClientOnly>
        <div
          v-if="isMobile"
          class="border border-solid border-zinc-950/[.1] dark:border-zinc-50/[.1] rounded-lg p-2 flex items-center justify-center mb-2"
        >
          <IconMessages class="size-6" />
        </div>
      </ClientOnly>
      <div class="text-3xl md:text-5xl font-rethink font-bold">
        <span> What </span>
        <BaseTextHighlight :duration="500" class="text-head-highlight">
          People Says
        </BaseTextHighlight>
      </div>
      <div class="text-muted-foreground text-sm md:text-base md:mt-3">
        Hear directly from those I've collaborated with and helped.
      </div>
    </div>
    <div class="w-full">
      <template v-if="pending"> Loading ... </template>
      <template v-else-if="!pending && testimonials">
        <Carousel
          :value="testimonialsWithImage"
          :num-visible="3"
          :num-scroll="1"
          :show-navigators="false"
          :autoplay-interval="3000"
          circular
          :vertical-view-port-height="'350px'"
          :responsiveOptions="responsiveOptions"
        >
          <template #item="slotProps">
            <div
              class="border border-solid border-zinc-950/[.05] dark:border-zinc-50/[.05] rounded-xl m-2 py-4 px-6"
            >
              <div>
                <div class="flex items-center justify-start space-x-4">
                  <NuxtImg
                      :src="slotProps.data.image"
                      class="w-[50px] h-[50px] rounded-full object-cover bg-zinc-950/[.05] dark:bg-zinc-50/[.05] p-2"
                    />
                  <div
                    class="flex flex-col items-start justify-center space-y-1"
                  >
                    <div class="text-lg font-rethink font-bold">
                      {{ slotProps.data.name }}
                    </div>
                    <div class="text-sm text-muted-foreground font-light">
                      <span>
                        {{ slotProps.data.role }}
                      </span>
                      <template v-if="slotProps.data.working_at">
                        <span> - </span>
                        <a
                          href="https://v3.tailwindcss.com/docs/width#fixed-widths"
                          target="_blank"
                          class="text-orange-500"
                        >
                          {{ slotProps.data.working_at }}
                        </a>
                      </template>
                    </div>
                  </div>
                </div>
                <div class="mt-3">
                  <div
                    class="text-sm text-muted-foreground font-light tracking-wide"
                  >
                    {{ slotProps.data.message }}
                  </div>
                </div>
              </div>
            </div>
          </template>
        </Carousel>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { IconMessages } from "@tabler/icons-vue";
import { isMobile } from "~/composables/useBreakpoint";
import type { TPublicTestimonialResponse } from "~/types/testimonial.type";

const responsiveOptions = ref([
  {
    breakpoint: "1600px",
    numVisible: 4,
    numScroll: 2,
  },
  {
    breakpoint: "1400px",
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: "1199px",
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: "1024px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "767px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "575px",
    numVisible: 1,
    numScroll: 1,
  },
]);

const runtimeConfig = useRuntimeConfig();
const BASE_API = runtimeConfig.public.apiBase;

const { data: testimonials, pending } = await useAsyncData(
  "public-testimonials",
  async () => {
    try {
      const response = await $fetch<TPublicTestimonialResponse>(
        `${BASE_API}/api-public/testimonials`
      );

      return response.data;
    } catch (err) {
      console.error("Error fetching data:", err);
      return null;
    }
  }
);

const LIST_AVATAR = [
  "./images/avatars/alien.png",
  "./images/avatars/groot.png",
  "./images/avatars/hulk.png",
  "./images/avatars/iron-man.png",
  "./images/avatars/money-heist-dali.png",
  "./images/avatars/ninja-turtle.png",
  "./images/avatars/rick-sanchez.png",
  "./images/avatars/squid-game-square-guard.png",
  "./images/avatars/wolverine.png",
  "./images/avatars/smurf.png",
]

const getAvatar = (index: number) => {
  const filterIndex = index > 9 ? index - (LIST_AVATAR.length) : index;
  return LIST_AVATAR[filterIndex];
  
}

const testimonialsWithImage = computed(() => {
  if (!testimonials.value) return [];
  return testimonials.value.map((testimonial, index) => ({
    ...testimonial,
    image: getAvatar(index),
  }));
});

</script>
<style lang=""></style>
