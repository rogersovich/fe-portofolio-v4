<template>
  <div class="min-h-screen bg-zinc-950 relative overflow-y-scroll z-10">
    <div class="absolute bottom-0 left-8 z-[-1]">
      <div
        class="uppercase text-[10rem] font-rethink font-bold text-zinc-50/[.05]"
      >
        About Me
      </div>
    </div>
    <div
      class="layout text-center pb-12 pt-12 md:pb-16 md:pt-36 flex flex-col justify-center"
    >
      <div class="flex flex-col gap-2">
        <div class="text-6xl font-rethink font-bold">
          <span> About </span>
          <BaseTextHighlight
            :duration="500"
            class="rounded-lg bg-gradient-to-r from-[#fb923c] to-[#f87171]"
          >
            Me
          </BaseTextHighlight>
        </div>
        <div class="text-muted-foreground mt-3">A story of growth and discovery</div>
      </div>
    </div>
    <section
      class="layout text-center pb-12 pt-12 md:pb-8 md:pt-8 flex flex-col justify-center"
    >
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-6 flex items-center justify-center">
          <template v-if="pending">
            <div>loading profie...</div>
          </template>
          <template v-else>
            <NuxtImg
              :src="profiles?.about.avatar_url"
              height="350px"
              width="350px"
              class="rounded-lg"
              densities="x1 x2"
            />
          </template>
        </div>
        <div class="col-span-6 text-left">
          <template v-if="pending">
            <div>loading profie...</div>
          </template>
          <template v-else>
            <div class="text-4xl font-rethink font-bold pb-2">
              {{ profiles?.about.title }}
            </div>
            <div class="text-muted-foreground">
              Front-end Developer at <a href="https://elabram.com" target="_blank">Elabram</a>
            </div>
            <div
              class="pt-8 text-muted-foreground"
              v-html="profiles?.about.description_html"
            ></div>
          </template>
        </div>
      </div>
    </section>
    <section
      class="layout text-center pb-12 pt-12 md:pb-12 md:pt-12 flex flex-col justify-center"
    >
      <div class="flex flex-col gap-12">
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
            <template
              v-for="skill in profiles?.technologies"
              :key="skill.tech_id"
            >
              <div class="col-span-3">
                <div
                  class="border border-solid border-zinc-50/[.15] rounded-lg p-4 min-h-[200px] flex items-center justify-center flex-col gap-2 group"
                >
                  <div class="text-2xl">
                    <NuxtImg
                      :src="skill.logo_url"
                      height="50"
                      densities="x1 x2"
                      class="grayscale group-hover:grayscale-0 transition-transform duration-300 group-hover:rotate-[360deg] group-hover:scale-150"
                    />
                  </div>
                  <div class="text-lg font-bold tracking-wide">
                    {{ skill.name }}
                  </div>
                </div>
              </div>
            </template>
          </template>
        </div>
      </div>
    </section>
    <section
      class="layout text-center pb-12 pt-12 md:pb-24 md:pt-12 flex flex-col justify-center"
    >
      <div class="flex flex-col gap-12">
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
          <template
            v-for="(experience, index) in profiles?.experiences"
            :key="index"
          >
            <div class="flex flex-col gap-4">
              <div class="grid grid-cols-12 gap-4">
                <div
                  class="col-span-4 text-left uppercase font-normal text-muted-foreground"
                >
                  <div>
                    <span>
                      {{ formatDate(experience.from_date) }}
                    </span>
                    <span class="mx-2">-</span>
                    <span>
                      {{
                        experience.to_date
                          ? formatDate(experience.to_date)
                          : "PRESENT"
                      }}
                    </span>
                  </div>
                </div>
                <div class="col-span-8 text-left">
                  <div class="text-2xl font-rethink font-bold">
                    {{ experience.position }}
                  </div>
                  <div class="flex gap-[5px] pt-2 text-[14px] pb-5 font-light">
                    <div class="flex gap-3">
                      <div>
                        <NuxtImg
                          :src="experience.comp_image_url"
                          height="20"
                          densities="x1 x2"
                        />
                      </div>
                      <nuxt-link
                        :to="experience.comp_website_url"
                        class="font-light underline"
                        target="_blank"
                        >{{ experience.company_name }}</nuxt-link
                      >
                    </div>
                    <div class="text-muted-foreground">-</div>
                    <div class="text-muted-foreground">
                      {{ `${experience.city}, ${experience.country}` }}
                    </div>
                    <div class="text-muted-foreground">-</div>
                    <div class="text-muted-foreground">
                      {{ experience.work_type }}
                    </div>
                    <!-- 
                    <div class="text-muted-foreground">-</div>
                    <div class="text-muted-foreground">Full Time</div> -->
                  </div>
                  <div
                    class="exp-description-content"
                    v-html="experience.summary_html"
                  ></div>
                </div>
              </div>
            </div>
          </template>
        </template>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import "~/assets/css/about.css";
import type { TPublicProfileResponse } from "~/types/about.type";
import dayjs from "dayjs";

useHead({
  title: "About",
  titleTemplate: "%s | Portofolio",
});

const { data: profiles, pending } = await useAsyncData(
  "public-profile",
  async () => {
    try {
      const response = await $fetch<TPublicProfileResponse>(
        `http://localhost:4000/api-public/profile`
      );

      return response.data;
    } catch (err) {
      console.error("Error fetching data:", err);
      return null;
    }
  }
);

const formatDate = (dateString: string, format: string = "YYYY MMM") => {
  return dayjs(dateString).format(format);
};
</script>
<style lang=""></style>
