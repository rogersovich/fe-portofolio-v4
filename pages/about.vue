<template>
  <div
    class="min-h-screen bg-zinc-950 relative overflow-y-scroll z-10 overflow-x-hidden"
  >
    <div class="absolute bottom-0 left-8 z-[-1]">
      <div
        class="uppercase text-[5rem] md:text-[10rem] font-rethink font-bold text-zinc-50/[.05]"
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
            class="border border-solid border-zinc-50/[.1] rounded-lg p-2 flex items-center justify-center mb-2"
          >
            <IconUserSquare class="size-6" />
          </div>
        </ClientOnly>
        <div class="text-4xl md:text-6xl font-rethink font-bold">
          <span> About </span>
          <BaseTextHighlight
            :duration="500"
            class="rounded-lg bg-gradient-to-r from-[#fb923c] to-[#f87171]"
          >
            Me
          </BaseTextHighlight>
        </div>
        <div class="text-muted-foreground text-sm md:text-base md:mt-3">
          A story of growth and experiences
        </div>
      </div>
    </div>
    <section
      class="layout text-center pb-6 pt-6 md:pb-8 md:pt-8 flex flex-col justify-center"
    >
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 md:col-span-6 flex items-center justify-center">
          <template v-if="pending">
            <div>loading profie...</div>
          </template>
          <template v-else>
            <NuxtImg
              :src="MINIO_BASE_URL + profiles?.about.avatar_file_name"
              class="rounded-lg w-full"
              densities="x1 x2"
            />
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
            class="border border-solid border-zinc-50/10 px-2 bg-zinc-800/[.35] py-1 text-xl rounded-full"
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
              <BaseListSkill :technologies="profiles.technologies" />
            </template>
          </template>
        </div>
      </div>
    </section>
    <section
      class="layout text-center pb-6 pt-6 md:pb-24 md:pt-12 flex flex-col justify-center"
    >
      <div class="flex flex-col gap-6 md:gap-12">
        <div class="flex flex-row gap-4 items-center">
          <div
            class="border border-solid border-zinc-50/10 px-2 bg-zinc-800/[.35] py-1 text-xl rounded-full"
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
            <BaseListExperience :experiences="profiles.experiences" />
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

const MINIO_BASE_URL = useMinioUrl();
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
</script>
<style lang=""></style>
