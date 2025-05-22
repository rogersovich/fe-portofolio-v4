<template>
  <ClientOnly>
    <div class="grid grid-cols-3 gap-6">
      <template
        v-for="(movie, index) in props.listFavoriteMovies"
        :key="movie.title"
      >
        <div class="col-span-1" v-if="!isMobile && !isTablet">
          <div
            @mouseenter="onMouseEnter(index)"
            @mouseleave="onMouseLeave(index)"
          >
            <template v-if="!moviesOnHover[index]">
              <NuxtImg
                :src="movie.image"
                class="rounded-lg w-full h-[150px] md:h-[300px] border border-solid border-zinc-50/[.05] hover:border-zinc-50/[.15]"
              />
            </template>
            <template v-else>
              <div
                class="border border-solid border-zinc-50/[.15] w-full h-[300px] rounded-lg p-4 relative overflow-hidden"
              >
                <div class="">
                  <div class="font-rethink font-bold text-2xl mb-3">
                    {{ movie.title }}
                  </div>
                  <div class="flex flex-col gap-[5px]">
                    <div class="text-muted-foreground text-[14px] font-light">
                      Year:
                      <span class="text-foreground">{{ movie.year }}</span>
                    </div>
                    <div class="text-muted-foreground text-[14px] font-light">
                      Running time:
                      <span class="text-foreground">{{ movie.runtime }}</span>
                    </div>
                    <div class="text-muted-foreground text-[14px] font-light">
                      Directed by:
                      <span class="text-foreground">{{
                        movie.directedBy
                      }}</span>
                    </div>
                    <div class="text-muted-foreground text-[14px] font-light">
                      Genre:
                      <span class="text-foreground">{{ movie.genre }}</span>
                    </div>
                    <div class="text-muted-foreground text-[14px] font-light">
                      Rating:
                      <span class="text-foreground">{{ movie.rating }}</span>
                    </div>
                  </div>
                  <div class="absolute bottom-[4px] left-[10px] text-left">
                    <div
                      class="text-4xl font-rethink font-bold uppercase text-zinc-50/[.05]"
                    >
                      {{ movie.title }}
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
        <div class="col-span-3" v-if="isMobile">
          <div class="w-full flex items-start space-x-3">
            <NuxtImg
              :src="movie.image"
              class="rounded-lg h-[175px] w-[125px] border border-solid border-zinc-50/[.05]"
            />
            <div class="flex flex-col items-start gap-[5px] py-2">
              <div class="text-muted-foreground text-[13px] font-light">
                Title:
                <span class="text-foreground">{{ movie.title }}</span>
              </div>
              <div class="text-muted-foreground text-[13px] font-light">
                Year:
                <span class="text-foreground">{{ movie.year }}</span>
              </div>
              <div class="text-muted-foreground text-[13px] font-light">
                Running time:
                <span class="text-foreground">{{ movie.runtime }}</span>
              </div>
              <div class="text-muted-foreground text-[13px] font-light">
                Directed by:
                <span class="text-foreground">{{ movie.directedBy }}</span>
              </div>
              <div class="text-muted-foreground text-[13px] font-light">
                Genre:
                <span class="text-foreground">{{ movie.genre }}</span>
              </div>
              <div class="text-muted-foreground text-[13px] font-light">
                Rating:
                <span class="text-foreground">{{ movie.rating }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </ClientOnly>
</template>
<script setup lang="ts">
import { isMobile, isTablet } from "~/composables/useBreakpoint";
const props = defineProps<{
  listFavoriteMovies: any;
}>();

const moviesOnHover = ref<any>([]);

const onMouseEnter = (index: number) => {
  setTimeout(() => {
    moviesOnHover.value[index] = true;
  }, 100);
};
const onMouseLeave = (index: number) => {
  setTimeout(() => {
    moviesOnHover.value[index] = false;
  }, 100);
};
</script>
<style lang=""></style>
