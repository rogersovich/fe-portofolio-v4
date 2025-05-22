<template>
  <div class="min-h-screen bg-zinc-950 relative overflow-y-scroll z-10 overflow-x-hidden">
    <div class="absolute bottom-0 left-0 md:left-8 z-[-1]">
      <div
        class="uppercase text-[5rem] md:text-[10rem] font-rethink font-bold text-zinc-50/[.05]"
      >
        My Blogs
      </div>
    </div>
    <div
      class="layout text-center pb-12 pt-12 md:pb-16 md:pt-36 flex flex-col justify-center"
    >
      <div class="flex flex-col items-center justify-center md:justify-start gap-3 md:gap-2">
        <ClientOnly>
          <div
            v-if="isMobile"
            class="border border-solid border-zinc-50/[.1] rounded-lg p-2 flex items-center justify-center mb-2"
          >
            <IconBook2 class="size-6" />
          </div>
        </ClientOnly>
        <div class="text-4xl md:text-6xl font-rethink font-bold">
          <span> My </span>
          <BaseTextHighlight
            :duration="500"
            class="rounded-lg bg-gradient-to-r from-[#fb923c] to-[#f87171]"
          >
            Blogs
          </BaseTextHighlight>
        </div>
        <div class="text-muted-foreground text-sm md:text-base md:mt-3">Insights, tutorials, and stories from my journey</div>
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
        <div v-if="pending">
          <template v-for="i in 3" :key="i">
            <Skeleton width="100%" height="8rem" class="mb-2"></Skeleton>
          </template>
        </div>
        <template v-else-if="dataBlogs">
          <div class="grid grid-cols-12 gap-6">
            <div class="col-span-12 md:col-span-9">
              <template v-if="dataBlogs.items.length > 0">
                <template
                  v-for="(blog, index) in dataBlogs.items"
                  :key="blog.id"
                >
                  <div
                    class="w-full mb-6"
                    :class="{
                      'mb-0': index === dataBlogs.items.length - 1,
                    }"
                  >
                    <div
                      class="border border-solid border-zinc-50/[.05] rounded-xl p-6 w-full"
                    >
                      <div class="flex items-center gap-2">
                        <IconCalendar
                          class="h-[18px] w-[18px] text-muted-foreground"
                        />
                        <span class="text-[12px] md:text-[13px]">
                          {{ formatDate(blog.published_at) }}
                        </span>
                      </div>
                      <div class="mt-4 font-rethink mb-0 text-xl md:text-2xl font-bold">
                        {{ blog.title }}
                      </div>
                      <div
                        class="text-muted-foreground font-light text-sm md:text-base"
                        v-html="blog.summary"
                      ></div>
                      <div class="flex flex-col md:flex-row gap-4 md:gap-0 justify-between pb-5">
                        <div class="flex items-center gap-5">
                          <div class="flex items-center gap-2">
                            <IconEye class="size-4 text-orange-400" />
                            <span class="text-[11px] md:text-[12px]text-[12px] text-zinc-300"
                              >{{ blog.statistic.views }}
                              views
                            </span>
                          </div>
                          <div class="flex items-center gap-2">
                            <IconBook class="size-4 text-orange-400" />
                            <span class="text-[11px] md:text-[12px] text-zinc-300"
                              >{{
                                blog.reading_time
                                  ? formatReadingTime(
                                      blog.reading_time.estimated_seconds
                                    )
                                  : formatReadingTime(0)
                              }}
                            </span>
                          </div>
                        </div>
                        <div class="flex items-center gap-2">
                          <template
                            v-for="topic in blog.topics"
                            :key="topic.id"
                          >
                            <Chip
                              :label="topic.name"
                              class="text-[11px] md:text-[12px] text-muted-foreground px-2.5 py-1.5"
                              :class="{
                            'text-white bg-orange-500/[.3]': filterTopics.includes(
                              topic.id as never
                            ),
                          }"
                            />
                          </template>
                        </div>
                      </div>
                      <div class="flex items-center justify-between">
                        <RouterLink :to="`/blog/${blog.slug}`">
                          <Button
                            variant="outlined"
                            size="large"
                            class="text-[13px] md:text-sm text-white group hover:!border-orange-500/[.2] group"
                          >
                            <span> View blog </span>
                            <IconChevronRight
                              class="size-[18px] text-muted-foreground group-hover:text-orange-400"
                            />
                          </Button>
                        </RouterLink>
                      </div>
                    </div>
                  </div>
                </template>
              </template>
              <template v-else>
                <BaseEmptyData @clear-search="onClearSearch()"/>
              </template>
            </div>
            <div class="hidden md:block md:col-span-3">
              <div
                class="py-4 px-4 border border-solid border-zinc-50/[.05] rounded-xl"
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
                        class="text-[12px] text-muted-foreground px-2.5 py-1.5 cursor-pointer hover:text-white"
                        :class="{
                          'text-white bg-orange-500/[.3]': filterTopics.includes(
                            topic.id as never
                          ),
                        }"
                      />
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Paginator
            :first="first"
            :rows="rows"
            :totalRecords="dataBlogs?.pagination.total"
            @page="onPageChange"
          >
          </Paginator>
        </template>
        <template v-else>
          <BaseEmptyData @clear-search="onClearSearch()"/>
        </template>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { isMobile } from "~/composables/useBreakpoint";
import {
  IconCalendar,
  IconChevronRight,
  IconEye,
  IconBook,
  IconBook2
} from "@tabler/icons-vue";
import dayjs from "dayjs";
import type { TBaseResponse } from "~/types/base.type";
import type {
  TParamsFilterPublicBlog,
  TPublicBlogListResponse,
} from "~/types/blog.type";
import type { TPublicTopic } from "~/types/topic.type";

useHead({
  title: "Blog",
  titleTemplate: "%s | Portofolio",
});

const runtimeConfig = useRuntimeConfig();
const BASE_API = runtimeConfig.public.apiBase

const params = reactive<TParamsFilterPublicBlog>({
  page: "1",
  limit: "3",
  sort: "DESC",
  order: "updated_at",
  search: "",
  topics: "[]",
});
const rows = ref(3);
const first = ref(1);
const searchQuery = ref("");
const filterDate = ref(null);
const filterTopics = ref([]);

const debouncedFilterCallback = useDebounceFn(async () => {
  params.search = searchQuery.value;
}, 500);

const { data: dataBlogs, pending } = await useAsyncData(
  "public-blogs",
  async () => {
    try {
      const response = await $fetch<TPublicBlogListResponse>(
        `${BASE_API}/api-public/blogs`,
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

const { data: dataTopics, pending: pendingTopic } = await useAsyncData(
  "public-topics",
  async () => {
    try {
      const response = await $fetch<TBaseResponse<TPublicTopic[]>>(
        `${BASE_API}/api-public/topics`
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
  filterTopics.value = [];
  params.search = "";
  params.topics = "[]";
  searchQuery.value = "";
};

const onPageChange = (event: any) => {
  params.page = event.page + 1;
  first.value = event.first;
};

const formatDate = (dateString: string, format: string = "MMM DD, YYYY") => {
  return dayjs(dateString).format(format);
};

const formatReadingTime = (estimated_seconds: number) => {
  const minutes = Math.floor(estimated_seconds / 60);
  const seconds = estimated_seconds % 60;

  if (minutes > 0) {
    return `${minutes} min read`;
  } else if (seconds > 0) {
    return `${seconds} sec read`;
  } else {
    return "0 sec read";
  }
};

const onClickTopic = (topicId: number) => {
  if (filterTopics.value.includes(topicId as never)) {
    filterTopics.value = filterTopics.value.filter((id) => id !== topicId);
  } else {
    filterTopics.value.push(topicId as never);
  }

  params.topics = JSON.stringify(filterTopics.value);
};
</script>
<style lang=""></style>
