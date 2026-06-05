<template>
  <div
    class="min-h-screen bg-zinc-50 dark:bg-zinc-950 relative overflow-y-scroll z-10 overflow-x-hidden"
  >
    <div class="absolute bottom-0 left-8 z-[-1]">
      <div
        class="uppercase text-[5rem] md:text-[10rem] font-rethink font-bold text-zinc-950/[.05] dark:text-zinc-50/[.05]"
      >
        About Me
      </div>
    </div>
    <div
      class="layout text-center pb-12 pt-12 md:pb-16 md:pt-36 flex flex-col justify-center"
    >
      <div
        class="flex flex-col items-center justify-center md:justify-start gap-3 md:gap-2"
      >
        <ClientOnly>
          <div
            v-if="isMobile"
            class="border border-solid border-zinc-950/[.1] dark:border-zinc-50/[.1] rounded-lg p-2 flex items-center justify-center mb-2"
          >
            <IconUserSquare class="size-6" />
          </div>
        </ClientOnly>
        <div class="text-4xl md:text-6xl font-rethink font-bold">
          <span> About </span>
          <BaseTextHighlight :duration="500" class="text-head-highlight">
            Me
          </BaseTextHighlight>
        </div>
        <div class="text-muted-foreground text-sm md:text-base md:mt-3">
          Delve into my journey, passions, and what drives me.
        </div>
      </div>
    </div>
    <section
      class="layout text-center pb-6 pt-6 md:pb-8 md:pt-8 flex flex-col justify-center"
    >
      <div class="grid grid-cols-12 gap-4">
        <div
          class="col-span-12 md:col-span-6 flex-col items-start justify-center space-y-4 relative overflow-hidden"
        >
          <template v-if="pending">
            <div>loading profie...</div>
          </template>
          <template v-else>
            <div>
              <NuxtImg
                :src="profiles?.about.avatar_url"
                class="rounded-lg max-h-[300px] md:max-h-[400px] aspect-square object-cover"
                :quality="20"
                placeholder="/images/fallback-image.png"
              >
              </NuxtImg>
            </div>
          </template>
          <div class="flex items-center justify-center gap-4">
            <div
              class="btn-soul-transform"
              :class="{
                '!border-orange-500': soul_active === 'Angel',
              }"
              @click="changeSoul('Angel')"
            >
              😇
            </div>
            <div
              class="btn-soul-transform"
              :class="{
                '!border-orange-500': soul_active === 'Devil',
              }"
              @click="changeSoul('Devil')"
            >
              😈
            </div>
            <div
              class="btn-soul-transform"
              :class="{
                '!border-orange-500': soul_active === 'Human',
              }"
              @click="changeSoul('Human')"
            >
              👨‍💻
            </div>
          </div>

          <template v-if="soul_active === 'Angel' && !pending">
            <div
              id="right-wing"
              class="absolute right-[-1rem] md:right-[5.5rem] top-[3.5rem] md:top-[5rem] scale-y-[-1] rotate-[210deg]"
            >
              <NuxtImg
                src="/images/icons/phoenix-wing.png"
                height="130"
                width="130"
                :quality="20"
              />
            </div>
            <div
              id="left-wing"
              class="absolute left-[1.5rem] md:left-[5.5rem] top-[3.5rem] md:top-[5rem] rotate-[-20deg]"
            >
              <NuxtImg
                src="/images/icons/phoenix-wing.png"
                height="130"
                width="130"
                :quality="20"
              />
            </div>
          </template>
          <template v-if="soul_active === 'Devil' && !pending">
            <div
              id="right-wing"
              class="absolute right-[-0.5rem] md:right-[6.5rem] top-[4.5rem] md:top-[5rem] scale-y-[-1] rotate-[190deg]"
            >
              <NuxtImg
                src="/images/icons/old-wing.png"
                height="120"
                width="120"
                :quality="20"
              />
            </div>
            <div
              id="left-wing"
              class="absolute left-[1.5rem] md:left-[6.5rem] top-[4.5rem] md:top-[5rem] rotate-[0deg]"
            >
              <NuxtImg
                src="/images/icons/old-wing.png"
                height="120"
                width="120"
                :quality="20"
              />
            </div>
          </template>
        </div>
        <div class="col-span-12 md:col-span-6 text-left">
          <template v-if="pending">
            <div>loading profie...</div>
          </template>
          <template v-else>
            <div class="text-3xl md:text-4xl font-rethink font-bold pb-2">
              {{ profiles?.about.title }}
            </div>
            <div class="text-muted-foreground text-sm md:text-base">
              Front-end Developer at
              <a href="https://elabram.com" target="_blank">Elabram</a>
            </div>
            <div
              class="pt-6 md:pt-8 text-muted-foreground text-sm md:text-base"
              v-html="profiles?.about.description_html"
            ></div>
          </template>
        </div>
      </div>
    </section>
    <section
      class="layout text-center pb-6 pt-6 md:pb-12 md:pt-12 flex flex-col justify-center"
    >
      <div class="flex flex-col gap-6 md:gap-12">
        <div class="flex flex-row gap-4 items-center">
          <div
            class="border border-solid border-zinc-950/10 dark:border-zinc-50/10 px-2 bg-zinc-400/[.35] dark:bg-zinc-800/[.35] py-1 text-xl rounded-full"
          >
            🏹
          </div>
          <div class="text-2xl font-rethink font-bold">Skills</div>
        </div>
        <div class="grid grid-cols-12 gap-6">
          <template v-if="pending">
            <div>loading skills...</div>
          </template>
          <template v-else>
            <template v-if="profiles?.technologies">
              <ListSkill :technologies="profiles.technologies" />
            </template>
          </template>
        </div>
      </div>
    </section>
    <SectionCertificates />
    <section
      class="layout text-center pb-6 pt-6 md:pb-24 md:pt-12 flex flex-col justify-center"
    >
      <div class="flex flex-col gap-6 md:gap-12">
        <div class="flex flex-row gap-4 items-center">
          <div
            class="border border-solid border-zinc-950/10 dark:border-zinc-50/10 px-2 bg-zinc-400/[.35] dark:bg-zinc-800/[.35] py-1 text-xl rounded-full"
          >
            💼
          </div>
          <div class="text-2xl font-rethink font-bold">Experience</div>
        </div>
        <template v-if="pending">
          <div>loading skills...</div>
        </template>
        <template v-else>
          <template v-if="profiles?.experiences">
            <ListExperience :experiences="profiles.experiences" />
          </template>
        </template>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import "~/assets/css/about.css";
import { IconUserSquare } from "@tabler/icons-vue";
import { isMobile } from "~/composables/useBreakpoint";
import type { TPublicProfileResponse } from "~/types/about.type";

useHead({
  title: "About",
  titleTemplate: "%s | Portofolio",
});

const runtimeConfig = useRuntimeConfig();
const BASE_API = runtimeConfig.public.apiBase;

const { data: profiles, pending } = await useAsyncData(
  "public-profile",
  async () => {
    try {
      const response = await $fetch<TPublicProfileResponse>(
        `${BASE_API}/api-public/profile`
      );

      return response.data;
    } catch (err) {
      console.error("Error fetching data:", err);
      return null;
    }
  }
);

const soul_active = ref("Devil");

const changeSoul = (soul: "Human" | "Devil" | "Angel") => {
  soul_active.value = soul;
};
</script>
<style lang=""></style>
