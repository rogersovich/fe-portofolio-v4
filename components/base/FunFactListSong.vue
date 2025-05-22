<template>
  <div class="w-full">
    <div class="text-xl font-rethink font-bold pb-6">List songs</div>

    <ClientOnly>
      <div
        v-if="!isMobile && !isTablet"
        class="flex flex-col justify-center gap-10 border-none border md:border-solid border-zinc-50/[.05] rounded-xl py-0 md:py-6 px-0 md:px-4"
      >
        <template v-for="(song, index) in props.listFavoriteSongs" :key="index">
          <div class="flex gap-6">
            <div class="basis-[5%] flex items-center justify-center">
              <div class="text-base">
                {{ index + 1 }}
              </div>
            </div>
            <div class="basis-[7.5%] flex items-center justify-center">
              <NuxtImg
                :src="song.url_img"
                class="rounded w-[50px] h-[50px] border border-solid border-zinc-50/[.05]"
              />
            </div>
            <div class="basis-[35%] flex-col items-center justify-left gap-2">
              <div class="flex items-center gap-1">
                <NuxtLink
                  class="text-base font-rethink no-underline text-white hover:text-orange-500 hover:underline"
                  :to="song.song_url"
                  target="_blank"
                >
                  {{ song.title }}
                </NuxtLink>

                <div class="text-[13px] text-muted-foreground">.</div>
                <div class="text-[13px] text-muted-foreground">
                  {{ song.year }}
                </div>
              </div>
              <NuxtLink
                class="text-[13px] text-muted-foreground underline"
                :to="song.album_url"
                target="_blank"
              >
                {{ song.album }}
              </NuxtLink>
            </div>
            <div class="basis-[20%] flex items-center justify-left">
              <NuxtLink
                class="text-[14px] text-muted-foreground hover:underline"
                :to="song.artist_url"
                target="_blank"
              >
                {{ song.artist }}
              </NuxtLink>
            </div>
            <div class="basis-[5%] flex items-center justify-left">
              <div class="text-[14px] text-muted-foreground">
                {{ song.duration }}
              </div>
            </div>
            <div class="basis-[5%] flex items-center justify-left">
              <div class="text-[14px] text-muted-foreground">
                {{ song.total_listeners }}
              </div>
            </div>
          </div>
        </template>
      </div>
      <div
        v-else-if="isMobile"
        class="flex flex-col justify-center gap-10 border-none border md:border-solid border-zinc-50/[.05] rounded-xl py-0 md:py-6 px-0 md:px-4"
      >
        <template v-for="(song, index) in props.listFavoriteSongs" :key="index">
          <div class="flex flex-col gap-6">
            <div class="flex flex-row gap-4">
              <div class="basis-[5%] flex items-center justify-center">
                <div class="text-base">
                  {{ index + 1 }}
                </div>
              </div>
              <div class="basis-[7.5%] flex items-center justify-center">
                <NuxtImg
                  :src="song.url_img"
                  class="rounded w-[40px] h-[40px] border border-solid border-zinc-50/[.05]"
                />
              </div>
              <div class="basis-[70%] flex-col items-center justify-left gap-2">
                <div class="flex flex-row items-center gap-1">
                  <NuxtLink
                    class="text-sm font-rethink no-underline text-white hover:text-orange-500 hover:underline"
                    :to="song.song_url"
                    target="_blank"
                  >
                    {{ song.title }}
                  </NuxtLink>

                  <div class="text-[12px] text-muted-foreground">.</div>
                  <div class="text-[12px] text-muted-foreground">
                    {{ song.year }}
                  </div>
                </div>
                <NuxtLink
                  class="text-[12px] text-muted-foreground underline"
                  :to="song.album_url"
                  target="_blank"
                >
                  {{ song.album }}
                </NuxtLink>
              </div>
            </div>
            <div class="flex flex-row gap-4 pl-9">
              <div class="flex items-center justify-left">
                <NuxtLink
                  class="text-[13px] text-muted-foreground hover:underline"
                  :to="song.artist_url"
                  target="_blank"
                >
                  {{ song.artist }}
                </NuxtLink>
              </div>
              <div class="flex items-center justify-left">
                <div class="text-[13px] text-muted-foreground">
                  {{ song.duration }}
                </div>
              </div>
              <div class="flex items-center justify-left">
                <div class="text-[13px] text-muted-foreground">
                  {{ song.total_listeners }}
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </ClientOnly>
  </div>
</template>
<script setup lang="ts">
import { isMobile, isTablet } from "~/composables/useBreakpoint";
const props = defineProps<{
  listFavoriteSongs: any;
}>();
</script>
<style lang=""></style>
