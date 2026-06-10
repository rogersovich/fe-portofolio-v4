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
          <span> Work </span>
          <BaseTextHighlight :duration="500" class="text-head-highlight">
            I've Done
          </BaseTextHighlight>
        </div>
        <div class="text-muted-foreground text-sm md:text-base md:mt-3">
          Discover a showcase of my proudest work and creative endeavors.
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
        <div v-if="isInitialLoading && projects.length === 0">
          <template v-for="i in 5" :key="i">
            <Skeleton width="100%" height="8rem" class="mb-2"></Skeleton>
          </template>
        </div>
        <template v-else-if="projects.length > 0">
          <TransitionGroup
            name="fade-slide"
            tag="div"
            class="flex flex-col gap-6"
          >
            <ProjectCard
              v-for="project in projects"
              :key="project.id"
              :project="project"
            />
          </TransitionGroup>

          <div
            v-if="hasMore"
            ref="loadMoreSentinel"
            class="w-full flex flex-col items-center justify-center py-6"
          >
            <template v-if="isNextPageLoading">
              <div class="flex items-center gap-2 text-zinc-500 font-medium dark:text-zinc-400">
                <i class="pi pi-spin pi-spinner text-lg"></i>
                <span>Loading more projects...</span>
              </div>
            </template>
            <template v-else-if="errorLoading">
              <div class="flex flex-col items-center gap-2">
                <span class="text-red-500 text-sm font-medium">Failed to load more projects.</span>
                <Button
                  type="button"
                  severity="secondary"
                  class="text-sm"
                  @click="handleLoadMore"
                >
                  <i class="pi pi-refresh mr-1"></i>
                  <span>Load More</span>
                </Button>
              </div>
            </template>
          </div>
        </template>
        <template v-else-if="errorLoading && projects.length === 0">
          <div class="flex flex-col items-center justify-center py-12 gap-3 text-center">
            <div class="p-3 bg-red-500/10 rounded-full text-red-500 mb-2">
              <i class="pi pi-exclamation-triangle text-2xl"></i>
            </div>
            <span class="text-zinc-950 dark:text-zinc-50 font-semibold text-lg">Failed to load projects</span>
            <span class="text-muted-foreground text-sm max-w-xs">
              Something went wrong while retrieving projects. Please check your connection and try again.
            </span>
            <Button
              type="button"
              class="text-sm mt-2"
              @click="handleLoadMore"
            >
              <i class="pi pi-refresh mr-2"></i>
              <span>Retry</span>
            </Button>
          </div>
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
  TPublicProject,
} from "~/types/project.type";

useHead({
  title: "Project",
  titleTemplate: "%s | Portofolio",
});

const params = reactive<TParamsFilterPublicProject>({
  page: "1",
  limit: "5",
  sort: "ASC",
  order: "sort_order",
  search: "",
});

const searchQuery = ref("");

const runtimeConfig = useRuntimeConfig();
const BASE_API = runtimeConfig.public.apiBase;

const debouncedFilterCallback = useDebounceFn(async () => {
  params.search = searchQuery.value;
}, 500);

const projects = ref<TPublicProject[]>([]);
const page = ref(1);
const total = ref(0);
const isNextPageLoading = ref(false);
const errorLoading = ref(false);

const hasMore = computed(() => {
  return projects.value.length < total.value;
});

// Fetch first page (runs on SSR and watches search input)
const { data: initialData, pending: isInitialLoading, refresh } = await useAsyncData(
  "publicProjects",
  async () => {
    try {
      const delayDuration = import.meta.client ? 500 : 0;
      const [response] = await Promise.all([
        $fetch<TPublicProjectListResponse>(
          `${BASE_API}/api-public/projects`,
          {
            params: {
              page: "1",
              limit: params.limit,
              sort: params.sort,
              order: params.order,
              search: params.search,
            },
          }
        ),
        new Promise((resolve) => setTimeout(resolve, delayDuration))
      ]);
      return response.data;
    } catch (err) {
      console.error("Error fetching initial projects data:", err);
      errorLoading.value = true;
      return null;
    }
  },
  {
    watch: [() => params.search],
  }
);

// Watch for initial load or search update to reset and set first page items
watch(
  initialData,
  (newData) => {
    if (newData) {
      projects.value = [...newData.items];
      total.value = newData.pagination.total;
      page.value = 1;
      errorLoading.value = false;
    } else {
      projects.value = [];
      total.value = 0;
      page.value = 1;
      errorLoading.value = true;
    }
  },
  { immediate: true }
);

// Clear the projects list immediately when search changes to show skeletons
watch(
  () => params.search,
  () => {
    projects.value = [];
    errorLoading.value = false;
  }
);

// Fetch subsequent pages
const loadNextPage = async () => {
  if (isNextPageLoading.value || isInitialLoading.value || !hasMore.value) return;

  isNextPageLoading.value = true;
  errorLoading.value = false;

  try {
    const nextPage = page.value + 1;
    const delayDuration = import.meta.client ? 500 : 0;
    const [response] = await Promise.all([
      $fetch<TPublicProjectListResponse>(
        `${BASE_API}/api-public/projects`,
        {
          params: {
            page: nextPage.toString(),
            limit: params.limit,
            sort: params.sort,
            order: params.order,
            search: params.search,
          },
        }
      ),
      new Promise((resolve) => setTimeout(resolve, delayDuration))
    ]);

    if (response && response.data) {
      projects.value = [...projects.value, ...response.data.items];
      page.value = nextPage;
      total.value = response.data.pagination.total;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (err) {
    console.error("Error loading next projects page:", err);
    errorLoading.value = true;
  } finally {
    isNextPageLoading.value = false;
  }
};

// Retry handler for load failures
const handleLoadMore = () => {
  if (projects.value.length === 0) {
    refresh();
  } else {
    loadNextPage();
  }
};

const onClearSearch = () => {
  params.search = "";
  searchQuery.value = "";
};

// Scroll Sentinel ref
const loadMoreSentinel = ref<HTMLElement | null>(null);

// Intersection observer configuration to trigger page load on scrolling near bottom
useIntersectionObserver(
  loadMoreSentinel,
  ([{ isIntersecting }]) => {
    if (isIntersecting && !isNextPageLoading.value && !errorLoading.value && hasMore.value) {
      loadNextPage();
    }
  },
  {
    rootMargin: "300px",
  }
);
</script>
<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
.fade-slide-move {
  transition: transform 0.5s ease;
}
</style>
