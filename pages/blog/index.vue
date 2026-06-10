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
                  <div class="mb-6">
                    <div class="mb-3 text-[13px] tracking-wider">
                      Filter by date
                    </div>
                    <div>
                      <DatePicker
                        v-model="filterDate"
                        variant="outlined"
                        selectionMode="range"
                        fluid
                        showButtonBar
                        placeholder="Select date"
                        inputClass="!border-zinc-50/[.05] !text-[12px]"
                      />
                    </div>
                  </div>
                  <template v-if="pendingTopic"> loading topic... </template>
                  <div v-else-if="dataTopics">
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
                              topic.id as never
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
                <template
                  v-for="(blog, index) in blogs"
                  :key="blog.id"
                >
                  <BlogCard
                    :blog="blog"
                    :blog_length="blogs.length"
                    :index="index"
                    :filter-topics="filterTopics"
                  />
                </template>
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
                  <div class="mb-6">
                    <div class="mb-3 text-[14px] tracking-wider">
                      Filter by date
                    </div>
                    <div>
                      <DatePicker
                        v-model="filterDate"
                        variant="outlined"
                        selectionMode="range"
                        fluid
                        showButtonBar
                        placeholder="Select date"
                        inputClass="!border-zinc-50/[.05] text-sm"
                      />
                    </div>
                  </div>
                  <template v-if="pendingTopic"> loading topic... </template>
                  <div v-else-if="dataTopics">
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
                              topic.id as never
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
import {
  IconBook2,
} from "@tabler/icons-vue";
import type { TBaseResponse } from "~/types/base.type";
import type {
  TParamsFilterPublicBlog,
  TPublicBlogListResponse,
  TPublicBlog,
} from "~/types/blog.type";
import type { TPublicTopic } from "~/types/topic.type";

useHead({
  title: "Blog",
  titleTemplate: "%s | Portofolio",
});

const runtimeConfig = useRuntimeConfig();
const BASE_API = runtimeConfig.public.apiBase;

const params = reactive<TParamsFilterPublicBlog>({
  page: "1",
  limit: "5",
  sort: "DESC",
  order: "updated_at",
  search: "",
  topics: "[]",
});

const searchQuery = ref("");
const filterDate = ref(null);
const filterTopics = ref([]);

const debouncedFilterCallback = useDebounceFn(async () => {
  params.search = searchQuery.value;
}, 500);

const blogs = ref<TPublicBlog[]>([]);
const page = ref(1);
const total = ref(0);
const isNextPageLoading = ref(false);
const errorLoading = ref(false);

const hasMore = computed(() => {
  return blogs.value.length < total.value;
});

// Fetch first page (runs on SSR and watches filter parameters)
const { data: initialData, pending: isInitialLoading, refresh } = await useAsyncData(
  "public-blogs",
  async () => {
    try {
      const response = await $fetch<TPublicBlogListResponse>(
        `${BASE_API}/api-public/blogs`,
        {
          params: {
            page: "1",
            limit: params.limit,
            sort: params.sort,
            order: params.order,
            search: params.search,
            topics: params.topics,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.error("Error fetching initial blogs data:", err);
      errorLoading.value = true;
      return null;
    }
  },
  {
    watch: [() => params.search, () => params.topics],
  }
);

// Fetch topics metadata once (no watch: [params] to avoid duplicate calls on scroll)
const { data: dataTopics, pending: pendingTopic } = await useAsyncData(
  "public-topics",
  async () => {
    try {
      const response = await $fetch<TBaseResponse<TPublicTopic[]>>(
        `${BASE_API}/api-public/topics`
      );
      return response.data;
    } catch (err) {
      console.error("Error fetching topics data:", err);
      return null;
    }
  }
);

// Watch for initial load or filter updates to reset and set first page items
watch(
  initialData,
  (newData) => {
    if (newData) {
      blogs.value = [...newData.items];
      total.value = newData.pagination.total;
      page.value = 1;
      errorLoading.value = false;
    } else {
      blogs.value = [];
      total.value = 0;
      page.value = 1;
      errorLoading.value = true;
    }
  },
  { immediate: true }
);

// Clear the blogs list immediately when search or topic filters change to show skeletons
watch(
  [() => params.search, () => params.topics],
  () => {
    blogs.value = [];
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
    const response = await $fetch<TPublicBlogListResponse>(
      `${BASE_API}/api-public/blogs`,
      {
        params: {
          page: nextPage.toString(),
          limit: params.limit,
          sort: params.sort,
          order: params.order,
          search: params.search,
          topics: params.topics,
        },
      }
    );

    if (response && response.data) {
      blogs.value = [...blogs.value, ...response.data.items];
      page.value = nextPage;
      total.value = response.data.pagination.total;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (err) {
    console.error("Error loading next blogs page:", err);
    errorLoading.value = true;
  } finally {
    isNextPageLoading.value = false;
  }
};

// Retry handler for load failures
const handleLoadMore = () => {
  if (blogs.value.length === 0) {
    refresh();
  } else {
    loadNextPage();
  }
};

const onClearSearch = () => {
  filterTopics.value = [];
  params.search = "";
  params.topics = "[]";
  searchQuery.value = "";
};

const onClickTopic = (topicId: number) => {
  if (filterTopics.value.includes(topicId as never)) {
    filterTopics.value = filterTopics.value.filter((id) => id !== topicId);
  } else {
    filterTopics.value.push(topicId as never);
  }

  params.topics = JSON.stringify(filterTopics.value);
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
  }
);
</script>
<style lang=""></style>
