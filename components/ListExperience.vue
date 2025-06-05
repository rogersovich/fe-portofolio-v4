<template>
  <template v-for="experience in experiences" :key="experience.company_name">
    <div class="flex flex-col gap-4">
      <div class="grid grid-cols-12 gap-4">
        <div
          class="col-span-12 md:col-span-4 text-left uppercase font-normal text-muted-foreground"
        >
          <div class="text-sm md:text-base">
            <span>
              {{ formatDate(experience.from_date) }}
            </span>
            <span class="mx-2">-</span>
            <span>
              {{
                experience.to_date ? formatDate(experience.to_date) : "PRESENT"
              }}
            </span>
          </div>
        </div>
        <div class="col-span-12 md:col-span-8 text-left">
          <div class="text-xl md:text-2xl font-rethink font-bold">
            {{ experience.position }}
          </div>
          <ClientOnly>
            <template v-if="!isMobile && !isTablet">
              <div class="flex gap-[5px] pt-2 text-[14px] pb-5 font-light">
                <div class="flex gap-3">
                  <div>
                    <NuxtImg
                      :src="MINIO_BASE_URL + experience.comp_image_file_name"
                      height="20"
                      densities="x1 x2"
                      :quality="40"
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
              </div>
            </template>
            <template v-if="isMobile">
              <div class="flex flex-col items-start gap-2 mt-2">
                <div class="w-full">
                  <hr class="hr-border-dashed" />
                </div>
                <div class="flex flex-row items-center gap-2">
                  <div class="flex items-center justify-center">
                    <NuxtImg
                      :src="MINIO_BASE_URL + experience.comp_image_file_name"
                      height="20"
                      densities="x1 x2"
                    />
                  </div>
                  <nuxt-link
                    :to="experience.comp_website_url"
                    class="font-light underline text-sm"
                    target="_blank"
                    >{{ experience.company_name }}</nuxt-link
                  >
                </div>
                <div class="flex flex-row items-center gap-2">
                  <div class="text-muted-foreground text-sm">
                    {{ `${experience.city}, ${experience.country}` }}
                  </div>
                  <div class="text-muted-foreground text-sm">-</div>
                  <div class="text-muted-foreground text-sm">
                    {{ experience.work_type }}
                  </div>
                </div>
                <div class="w-full">
                  <hr class="hr-border-dashed" />
                </div>
              </div>
            </template>
          </ClientOnly>
          <div
            class="exp-description-content text-sm md:text-base"
            v-html="experience.summary_html"
          ></div>
        </div>
      </div>
    </div>
  </template>
</template>
<script setup lang="ts">
import dayjs from "dayjs";
import type { TPublicExperience } from "~/types/about.type";
import { isMobile, isTablet } from "~/composables/useBreakpoint";

defineProps<{
  experiences: TPublicExperience[];
}>();

const MINIO_BASE_URL = useMinioUrl();

const formatDate = (dateString: string, format: string = "YYYY MMM") => {
  return dayjs(dateString).format(format);
};
</script>
<style lang=""></style>
