<template>
  <div
    class="min-h-screen bg-zinc-50 dark:bg-zinc-950 relative overflow-y-scroll z-10 overflow-x-hidden"
  >
    <div class="absolute bottom-0 left-0 md:left-8 z-[-1]">
      <div
        class="uppercase text-[8rem] md:text-[10rem] font-rethink font-bold text-zinc-950/[.05] dark:text-zinc-50/[.05]"
      >
        Projects
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
            <IconBriefcase class="size-6" />
          </div>
        </ClientOnly>
        <div class="text-4xl md:text-6xl font-rethink font-bold">
          <span> Featured </span>
          <BaseTextHighlight
            :duration="500"
            class="text-head-highlight"
          >
            Projects
          </BaseTextHighlight>
        </div>
        <div class="text-muted-foreground text-sm md:text-base md:mt-3">
          Showcasing my best work and creative projects
        </div>
      </div>
    </div>
    <div
      class="layout pb-12 pt-12 md:pb-16 md:pt-8 flex flex-col justify-center gap-10"
    >
      <div class="flex flex-col gap-6">
        <div class="text-center">
          <InputText
            size="large"
            v-model="searchQuery"
            @input="debouncedFilterCallback"
            placeholder="Search project"
            class="input-search"
          />
        </div>
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
          <template v-else>
            <BaseEmptyData @clear-search="onClearSearch()" title="Projects" />
          </template>
          <Paginator
            :first="first"
            :rows="rows"
            :totalRecords="dataProjects.pagination.total"
            @page="onPageChange"
          >
          </Paginator>
        </template>
        <template v-else>
          <BaseEmptyData @clear-search="onClearSearch()" title="Projects" />
        </template>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { isMobile } from "~/composables/useBreakpoint";
import { IconBriefcase } from "@tabler/icons-vue";
import type {
  TParamsFilterPublicProject,
  TPublicProjectListResponse,
} from "~/types/project.type";

useHead({
  title: "Project",
  titleTemplate: "%s | Portofolio",
});

const params = reactive<TParamsFilterPublicProject>({
  page: "1",
  limit: "3",
  sort: "DESC",
  order: "updated_at",
  search: "",
});
const rows = ref(3);
const first = ref(1);
const searchQuery = ref("");

const runtimeConfig = useRuntimeConfig();
const BASE_API = runtimeConfig.public.apiBase;

const debouncedFilterCallback = useDebounceFn(async () => {
  params.search = searchQuery.value;
}, 500);

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
  },
  {
    watch: [params],
  }
);

const onClearSearch = () => {
  params.search = "";
  searchQuery.value = "";
};

const onPageChange = (event: any) => {
  params.page = event.page + 1;
  first.value = event.first;
};
</script>
<style lang=""></style>
