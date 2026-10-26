<template>
  <div
    class="min-h-screen bg-zinc-50 dark:bg-zinc-950 relative overflow-y-scroll z-10 overflow-x-hidden"
  >
    <div class="absolute bottom-0 left-0 md:left-8 z-[-1]">
      <div
        class="uppercase text-[5rem] md:text-[10rem] font-rethink font-bold text-zinc-950/[.05] dark:text-zinc-50/[.05]"
      >
        My Blogs
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
            <IconBook2 class="size-6" />
          </div>
        </ClientOnly>
        <div class="text-4xl md:text-6xl font-rethink font-bold">
          <span> The </span>
          <BaseTextHighlight
            :duration="500"
            class="text-head-highlight"
          >
            Blog
          </BaseTextHighlight>
        </div>
        <div class="text-muted-foreground text-sm md:text-base md:mt-3">
          Explore my thoughts, insights, and latest articles on a variety of topics.
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
            placeholder="Search Blog"
            class="input-search"
          />
        </div>
        <div v-if="isInitialLoading && blogs.length === 0">
          <template v-for="i in 5" :key="i">
            <Skeleton width="100%" height="8rem" class="mb-2"></Skeleton>
          </template>
        </div>
        <template v-else-if="blogs.length > 0 || (!errorLoading && blogs.length === 0)">
          <div class="grid grid-cols-12 gap-6">
            <ClientOnly>
              <div v-if="isMobile" class="col-span-12">
                <div
                  class="p-4 border border-solid border-zinc-950/[.05] dark:border-zinc-50/[.05] rounded-xl"
                >
                  <div v-if="dataTopics.length">
                    <div class="mb-3 text-[13px] tracking-wider">
                      Filter by topic
                    </div>
                    <div class="flex flex-wrap gap-2">
                      <template v-for="topic in dataTopics" :key="topic.id">
                        <Chip
                          @click="onClickTopic(topic.id)"
                          :label="topic.name"
                          class="text-[12px] text-muted-foreground px-2.5 py-1.5 cursor-pointer hover:text-foreground"
                          :class="{
                            '!text-foreground !bg-orange-400/[.4]': filterTopics.includes(
                              topic.id
                            ),
                          }"
                        />
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </ClientOnly>
            <div class="col-span-12 md:col-span-9">
              <template v-if="blogs.length > 0">
                <TransitionGroup
                  name="fade-slide"
                  tag="div"
                  class="flex flex-col"
                >
                  <BlogCard
                    v-for="(blog, index) in blogs"
                    :key="blog.id"
                    :blog="blog"
                    :blog_length="blogs.length"
                    :index="index"
                    :filter-topics="filterTopics"
                  />
                </TransitionGroup>
              </template>
              <template v-else>
                <BaseEmptyData @clear-search="onClearSearch()" title="Blogs" />
              </template>

              <!-- Scroll sentinel for infinite scroll -->
              <div
                v-if="hasMore"
                ref="loadMoreSentinel"
                class="w-full flex flex-col items-center justify-center py-6"
              >
                <template v-if="isNextPageLoading">
                  <div class="flex items-center gap-2 text-zinc-500 font-medium dark:text-zinc-400">
                    <i class="pi pi-spin pi-spinner text-lg"></i>
                    <span>Loading more blogs...</span>
                  </div>
                </template>
                <template v-else-if="errorLoading">
                  <div class="flex flex-col items-center gap-2">
                    <span class="text-red-500 text-sm font-medium">Failed to load more blogs.</span>
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
            </div>
            <ClientOnly>
              <div v-if="!isMobile && !isTablet" class="col-span-3">
                <div
                  class="py-4 px-4 border border-solid border-zinc-950/[.05] dark:border-zinc-50/[.05] rounded-xl"
                >
                  <div v-if="dataTopics.length">
                    <div class="mb-3 text-[14px] tracking-wider">
                      Filter by topic
                    </div>
                    <div class="flex flex-wrap gap-2">
                      <template v-for="topic in dataTopics" :key="topic.id">
                        <Chip
                          @click="onClickTopic(topic.id)"
                          :label="topic.name"
                          class="text-[12px] text-muted-foreground px-2.5 py-1.5 cursor-pointer hover:text-foreground"
                          :class="{
                            '!text-foreground !bg-orange-500/[.3]': filterTopics.includes(
                              topic.id
                            ),
                          }"
                        />
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </ClientOnly>
          </div>
        </template>
        <template v-else-if="errorLoading && blogs.length === 0">
          <div class="flex flex-col items-center justify-center py-12 gap-3 text-center">
            <div class="p-3 bg-red-500/10 rounded-full text-red-500 mb-2">
              <i class="pi pi-exclamation-triangle text-2xl"></i>
            </div>
            <span class="text-zinc-950 dark:text-zinc-50 font-semibold text-lg">Failed to load blogs</span>
            <span class="text-muted-foreground text-sm max-w-xs">
              Something went wrong while retrieving blogs. Please check your connection and try again.
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
          <BaseEmptyData @clear-search="onClearSearch()" title="Blogs" />
        </template>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { isMobile, isTablet } from "~/composables/useBreakpoint";
import { IconBook2 } from "@tabler/icons-vue";

useHead({
  title: "Blog",
  titleTemplate: "%s | Portofolio",
});

const PAGE_SIZE = 5;

const searchQuery = ref("");
const search = ref("");
const filterTopics = ref<string[]>([]);

const debouncedFilterCallback = useDebounceFn(() => {
  search.value = searchQuery.value;
}, 500);

// All blogs are prerendered into the page payload; filtering happens client-side
const { data: allBlogs, pending: isInitialLoading, refresh } = await useAsyncData(
  "blogs",
  fetchBlogs
);
const errorLoading = computed(() => !isInitialLoading.value && !allBlogs.value);
const dataTopics = computed(() => getTopics(allBlogs.value ?? []));
const isNextPageLoading = ref(false);

const filteredBlogs = computed(() =>
  (allBlogs.value ?? []).filter(
    (blog) =>
      matchesSearch(blog, search.value) &&
      (filterTopics.value.length === 0 ||
        blog.topics.some((topic) => filterTopics.value.includes(topic.id)))
  )
);

const visibleCount = ref(PAGE_SIZE);
const blogs = computed(() => filteredBlogs.value.slice(0, visibleCount.value));
const hasMore = computed(() => blogs.value.length < filteredBlogs.value.length);

watch([search, filterTopics], () => {
  visibleCount.value = PAGE_SIZE;
}, { deep: true });

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
  if (!allBlogs.value) {
    refresh();
  } else {
    loadNextPage();
  }
};

const onClearSearch = () => {
  filterTopics.value = [];
  search.value = "";
  searchQuery.value = "";
};

const onClickTopic = (topicId: string) => {
  if (filterTopics.value.includes(topicId)) {
    filterTopics.value = filterTopics.value.filter((id) => id !== topicId);
  } else {
    filterTopics.value.push(topicId);
  }
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
