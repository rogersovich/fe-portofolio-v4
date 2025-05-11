<template>
  <div>
    <div
      class="layout text-center pb-12 pt-12 md:pb-16 md:pt-36 flex flex-col justify-center"
    >
      <div class="flex flex-col gap-2">
        <div class="text-6xl font-rethink font-bold mb-3">
          <span> Featured </span>
          <BaseTextHighlight
            :duration="500"
            class="rounded-lg bg-gradient-to-r from-[#9E7AFF] to-[#FE8BBB]"
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
        <div v-if="pending">Loading project...</div>
        <template v-else-if="dataProjects">
          <template
            v-for="project in dataProjects.data.items"
            :key="project.id"
          >
            <div
              class="grid grid-cols-12 gap-6 transition-transform duration-300 hover:translate-x-3 h-[250px]"
            >
              <div class="col-span-9 xl:col-span-9">
                <div
                  class="border border-solid border-zinc-50/[.05] rounded-xl px-6 py-6 group h-full w-full"
                >
                  <h1 class="mt-0 group-hover:text-orange-500 font-rethink">
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
                        <div class="bg-zinc-50/[.075] p-1 flex items-center rounded-full">
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
                    <Button
                      variant="outlined"
                      size="large"
                      class="text-sm text-white group"
                    >
                      <span> View Project </span>
                      <IconChevronRight
                        class="size-[18px] text-muted-foreground group-hover:text-orange-500"
                      />
                    </Button>
                    <template v-if="project.repository_url">
                      <a
                        :href="project.repository_url"
                        target="_blank"
                        class="flex items-center gap-2 group cursor-pointer"
                      >
                        <IconLink
                          class="size-[20px] text-zinc-500 group-hover:text-orange-500"
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
                    class="rounded-lg w-full h-[200px] object-cover grayscale hover:grayscale-0"
                  />
                </div>
              </div>
            </div>
          </template>
          <div>
            <ClientOnly fallback-tag="span" fallback="Loading pagination...">
              <Paginator :rows="rows" :totalRecords="totalRecords"> </Paginator>
            </ClientOnly>
          </div>
        </template>
        <div v-else-if="error">Failed to load posts.</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { IconLink, IconChevronRight } from "@tabler/icons-vue";
import type { AxiosResponse } from "axios";
import type { TBasePaginateResponse, TBaseResponse } from "~/types/base.type";
import type {
  TParamsFilterPublicProject,
  TPublicProject,
} from "~/types/project.type";
useHead({
  title: "Project",
  titleTemplate: "%s | Portofolio",
});

const params = reactive<TParamsFilterPublicProject>({
  page: "1",
  limit: "5",
  sort: "DESC",
  order: "updated_at",
  search: "",
});
const totalRecords = ref(0);
const rows = ref(5);
const { $axios } = useNuxtApp() as unknown as any;

const {
  data: dataProjects,
  pending,
  error,
} = await useAsyncData("publicProjects", async () => {
  try {
    const response: AxiosResponse<
      TBaseResponse<TBasePaginateResponse<TPublicProject[]>>
    > = await $axios.get("/api-public/projects", {
      params: {
        ...params,
      },
    });
    totalRecords.value = response.data.data.pagination.total;
    return response.data;
  } catch (err) {
    console.error("Error fetching data:", err);
    return null;
  }
});
</script>
<style lang=""></style>
