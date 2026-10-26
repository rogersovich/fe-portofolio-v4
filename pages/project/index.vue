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

useHead({
  title: "Project",
  titleTemplate: "%s | Portofolio",
});

const PAGE_SIZE = 5;

const searchQuery = ref("");
const search = ref("");

const debouncedFilterCallback = useDebounceFn(() => {
  search.value = searchQuery.value;
}, 500);

// All projects are prerendered into the page payload; filtering happens client-side
const { data: allProjects, pending: isInitialLoading, refresh } = await useAsyncData(
  "projects",
  fetchProjects
);
const errorLoading = computed(() => !isInitialLoading.value && !allProjects.value);
const isNextPageLoading = ref(false);

const filteredProjects = computed(() =>
  (allProjects.value ?? []).filter((project) => matchesSearch(project, search.value))
);

const visibleCount = ref(PAGE_SIZE);
const projects = computed(() => filteredProjects.value.slice(0, visibleCount.value));
const hasMore = computed(() => projects.value.length < filteredProjects.value.length);

watch(search, () => {
  visibleCount.value = PAGE_SIZE;
});

// Scroll Sentinel ref
const loadMoreSentinel = ref<HTMLElement | null>(null);

const isSentinelNearViewport = () => {
  const rect = loadMoreSentinel.value?.getBoundingClientRect();
  return !!rect && rect.top < window.innerHeight + 300;
};

const loadNextPage = async () => {
  if (!hasMore.value) return;
  visibleCount.value += PAGE_SIZE;
  // The observer only fires on changes, so keep filling while the sentinel stays visible
  await nextTick();
  if (hasMore.value && isSentinelNearViewport()) loadNextPage();
};

// Retry handler for load failures
const handleLoadMore = () => {
  if (!allProjects.value) {
    refresh();
  } else {
    loadNextPage();
  }
};

const onClearSearch = () => {
  search.value = "";
  searchQuery.value = "";
};

// Intersection observer configuration to trigger page load on scrolling near bottom
useIntersectionObserver(
  loadMoreSentinel,
  ([{ isIntersecting }]) => {
    if (isIntersecting && hasMore.value) {
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
