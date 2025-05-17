<template>
  <div class="min-h-screen bg-zinc-950 relative overflow-y-scroll z-10">
    <div class="absolute bottom-0 left-8 z-[-1]">
      <div
        class="uppercase text-[10rem] font-rethink font-bold text-zinc-50/[.05]"
      >
        Projects
      </div>
    </div>
    <div
      class="layout text-center pb-12 pt-12 md:pb-16 md:pt-36 flex flex-col justify-center"
    >
      <div class="flex flex-col gap-2">
        <div class="text-6xl font-rethink font-bold mb-3">
          <span> Featured </span>
          <BaseTextHighlight
            :duration="500"
            class="rounded-lg bg-gradient-to-r from-[#fb923c] to-[#f87171]"
          >
            Projects
          </BaseTextHighlight>
        </div>
        <div class="text-muted-foreground">A story of growth and discovery</div>
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
            class="w-[32rem] text-base border-zinc-50/[.05] focus:!border-zinc-50/[.15] hover:!border-zinc-50/[.15]"
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
              <div
                class="grid grid-cols-12 gap-6 transition-transform duration-300 hover:translate-x-3 min-h-[250px]"
              >
                <div class="col-span-9 xl:col-span-9">
                  <div
                    class="border border-solid border-zinc-50/[.05] rounded-xl p-4 group w-full"
                  >
                    <h1 class="mt-0 group-hover:text-orange-400 font-rethink">
                      {{ project.title }}
                    </h1>
                    <div
                      class="text-muted-foreground font-light"
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
                            class="bg-zinc-50/[.075] p-1 flex items-center rounded-full"
                          >
                            <NuxtImg
                              :src="tech.tech_logo_url"
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
                          class="text-sm text-white group hover:!border-orange-500/[.2]"
                        >
                          <span> View Project </span>
                          <IconChevronRight
                            class="size-[18px] text-muted-foreground group-hover:text-orange-400"
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
                            class="text-[14px] font-light text-white group-hover:underline"
                            >Open Repository</span
                          >
                        </a>
                      </template>
                    </div>
                  </div>
                </div>
                <div class="col-span-3 xl:col-span-3">
                  <div
                    class="p-4 border border-solid border-zinc-50/[.05] rounded-xl h-full flex items-center justify-center"
                  >
                    <NuxtImg
                      :src="project.image_url"
                      class="rounded-lg w-full max-h-[200px] object-cover grayscale hover:grayscale-0"
                    />
                  </div>
                </div>
              </div>
            </template>
          </template>
          <template v-else>
            <BaseEmptyData @clear-search="onClearSearch()" />
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
          <BaseEmptyData @clear-search="onClearSearch()" />
        </template>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  IconLink,
  IconChevronRight,
  IconMoodSad,
  IconRefresh,
} from "@tabler/icons-vue";
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

const debouncedFilterCallback = useDebounceFn(async () => {
  params.search = searchQuery.value;
}, 500);

const { data: dataProjects, pending } = await useAsyncData(
  "publicProjects",
  async () => {
    try {
      const response = await $fetch<TPublicProjectListResponse>(
        `http://localhost:4000/api-public/projects`,
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
