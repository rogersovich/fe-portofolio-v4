<template>
  <div class="layout flex flex-col justify-start items-start space-y-12 pb-24 md:pb-32">
    <div class="flex flex-col items-center md:items-start justify-center md:justify-start gap-3 md:gap-2 w-full">
      <ClientOnly>
        <div
          v-if="isMobile"
          class="border border-solid border-zinc-950/[.1] dark:border-zinc-50/[.1] rounded-lg p-2 flex items-center justify-center mb-2"
        >
          <IconBriefcase class="size-6" />
        </div>
      </ClientOnly>
      <div class="text-3xl md:text-5xl font-rethink font-bold">
        <span> Featured </span>
        <BaseTextHighlight :duration="500" class="text-head-highlight">
          Projects
        </BaseTextHighlight>
      </div>
      <div class="text-muted-foreground text-sm md:text-base md:mt-3">
        Showcasing my best work and creative projects
      </div>
    </div>

    <div class="flex flex-col gap-6">
      <div v-if="pending">
        <template v-for="i in 3" :key="i">
          <Skeleton width="100%" height="8rem" class="mb-2"></Skeleton>
        </template>
      </div>
      <template v-else-if="dataProjects">
        <template v-if="dataProjects.items.length > 0">
          <template v-for="project in dataProjects.items" :key="project.id">
            <ProjectCard :project="project" />
          </template>
        </template>
      </template>

      <div class="w-full text-center">
        <Button
          type="button"
          severity="secondary"
          rounded
          class="!text-sm md:!text-base md:!px-6 md:!py-3 !py-3.5 shadow w-full md:w-auto"
          @click="routeToPath('/project')"
        >
          <span> View All Projects </span>
          <IconChevronRight class="size-5" />
        </Button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { IconBriefcase, IconChevronRight } from "@tabler/icons-vue";
import { isMobile } from "~/composables/useBreakpoint";
import type {
  TParamsFilterPublicProject,
  TPublicProjectListResponse,
} from "~/types/project.type";

const runtimeConfig = useRuntimeConfig();
const BASE_API = runtimeConfig.public.apiBase;
const menuStore = useMenuStore();

const params = reactive<TParamsFilterPublicProject>({
  page: "1",
  limit: "2",
  sort: "DESC",
  order: "updated_at",
  search: "",
});

const { data: dataProjects, pending } = await useAsyncData(
  "publicProjects",
  async () => {
    try {
      const response = await $fetch<TPublicProjectListResponse>(
        `${BASE_API}/api-public/projects`,
        {
          params: {
            ...params,
          },
        }
      );

      return response.data;
    } catch (err) {
      console.error("Error fetching data:", err);
      return null;
    }
  }
);

const routeToPath = (path: string) => {
  menuStore.setActivePath(path);
  navigateTo(path);
}
</script>
<style lang=""></style>
