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
            :src="project.image_url"
            :quality="40"
            class="rounded-lg w-full max-h-[200px] object-cover"
            placeholder="/images/empty-data.png"
          />
          <div class="mt-0 font-rethink text-2xl font-bold mb-2">
            {{ project.title }}
          </div>
          <div
            class="text-muted-foreground font-light text-sm md:text-base"
            v-html="truncatedText"
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
                    :src="useTechIcon(tech.tech_slug)"
                    :quality="40"
                    height="20px"
                    width="20px"
                    class="object-contain"
                    v-tooltip.top="tech.tech_name"
                  />
                </div>
              </template>
            </div>
          </div>
          <div class="flex items-center justify-between mt-8">
            <RouterLink :to="`/project/${project.slug}`" class="w-full md:w-fit">
              <Button
                variant="outlined"
                size="large"
                class="!text-[12px] md:!text-sm !text-foreground group !border-orange-500/[.2] w-full md:w-fit"
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
                class="flex items-center gap-2 group cursor-pointer no-underline"
              >
                <IconLink
                  class="size-[14px] md:size-[20px] text-zinc-500 group-hover:text-orange-400"
                />
                <span
                  class="text-[12px] md:text-[14px] font-light text-foreground group-hover:underline"
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
            :quality="40"
            :src="project.image_url"
            class="rounded-lg w-full max-h-[200px] object-cover"
            placeholder="/images/empty-data.png"
          />
        </div>
      </div>
    </div>
  </ClientOnly>
</template>
<script setup lang="ts">
import { isMobile, isTablet } from "~/composables/useBreakpoint";
import { IconLink, IconChevronRight } from "@tabler/icons-vue";
import type { TPublicProject } from "~/types/project.type";

const { project } = defineProps<{
  project: TPublicProject;
}>();


const truncatedText = computed(() => {
  // 1) strip all tags
  const plain = project.summary.replace(/<[^>]+>/g, "");

  // 2) if under limit, return as-is
  if (plain.length <= 250) return plain;

  // 3) otherwise cut and add ellipsis
  return plain.slice(0, 250) + "…";
});
</script>
<style lang=""></style>
