<template>
  <ClientOnly>
    <div
      class="grid grid-cols-12 gap-6 transition-transform duration-300 md:hover:translate-x-3 min-h-[250px]"
    >
      <div class="col-span-12 md:col-span-9">
        <div
          class="border border-solid border-zinc-950/[.05] dark:border-zinc-50/[.05] rounded-xl p-4 group w-full"
        >
          <NuxtImg
            v-if="isMobile"
            :src="MINIO_BASE_URL + project.image_file_name"
            class="rounded-lg w-full max-h-[200px] object-cover"
          />
          <div
            class="mt-0 font-rethink text-2xl font-bold mb-2"
          >
            {{ project.title }}
          </div>
          <div
            class="text-muted-foreground font-light text-sm md:text-base"
            v-html="project.summary"
          ></div>
          <div class="flex items-center gap-3 mt-5">
            <div class="text-muted-foreground text-sm">Stack:</div>
            <div class="flex items-center gap-2">
              <template
                v-for="tech in project.technologies"
                :key="tech.tech_id"
              >
                <div
                  class="bg-zinc-950/[.075] dark:bg-zinc-50/[.075] p-1 flex items-center rounded-full"
                >
                  <NuxtImg
                    :src="MINIO_BASE_URL + tech.tech_logo_file_name"
                    height="20px"
                    width="20px"
                    densities="x1 x2"
                  />
                </div>
              </template>
            </div>
          </div>
          <div class="flex items-center justify-between mt-8">
            <RouterLink :to="`/project/${project.slug}`">
              <Button
                variant="outlined"
                size="large"
                class="!text-[12px] md:!text-sm !text-foreground group !border-orange-500/[.2]"
              >
                <span> View Project </span>
                <IconChevronRight
                  class="size-[18px] md:text-muted-foreground text-orange-500 md:group-hover:text-orange-400"
                />
              </Button>
            </RouterLink>
            <template v-if="project.repository_url">
              <a
                :href="project.repository_url"
                target="_blank"
                class="flex items-center gap-2 group cursor-pointer"
              >
                <IconLink
                  class="size-[20px] text-zinc-500 group-hover:text-orange-400"
                />
                <span
                  class="text-[14px] font-light text-foreground group-hover:underline"
                  >Open Repository</span
                >
              </a>
            </template>
          </div>
        </div>
      </div>
      <div v-if="!isMobile && !isTablet" class="block col-span-3">
        <div
          class="p-4 border border-solid border-zinc-950/[.05] dark:border-zinc-50/[.05] rounded-xl h-full flex items-center justify-center"
        >
          <NuxtImg
            :src="MINIO_BASE_URL + project.image_file_name"
            class="rounded-lg w-full max-h-[200px] object-cover"
          />
        </div>
      </div>
    </div>
  </ClientOnly>
</template>
<script setup lang="ts">
import { isMobile, isTablet } from "~/composables/useBreakpoint";
import { IconLink, IconChevronRight} from "@tabler/icons-vue";
import type { TPublicProject } from "~/types/project.type";

const { project } = defineProps<{
  project: TPublicProject;
}>();

const MINIO_BASE_URL = useMinioUrl();
</script>
<style lang=""></style>
