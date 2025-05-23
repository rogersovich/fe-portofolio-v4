<template>
  <div class="relative">
    <div
      class="layout text-center pb-4 pt-12 md:pt-32 flex flex-col justify-center"
    >
    <ClientOnly>
        <NuxtImg
          :src="MINIO_BASE_URL + blogs?.data.banner_file_name"
          class="rounded-lg w-full max-h-[200px] object-cover blur-sm brightness-[.15] absolute top-0 left-0"
        />
      </ClientOnly>
      <div class="flex flex-col gap-3 z-10">
        <div
          class="flex flex-col items-start gap-2 md:px-4 pb-0 py-5 rounded-md"
        >
          <div
            class="text-3xl text-center md:text-left md:text-5xl font-rethink font-bold mb-3"
            v-if="blogs"
          >
            {{ blogs.data.title }}
          </div>
          <template v-if="blogs">
            <div
              class="text-muted-foreground text-center md:text-left text-sm md:text-base w-full"
              v-html="blogs.data.summary"
            ></div>
          </template>
        </div>
        <template v-if="blogs">
          <BlogStatisticInfo
            :statistic="blogs.data.statistic"
            :reading_time="blogs.data.reading_time"
          />
        </template>
      </div>
    </div>
    <div class="layout grid grid-cols-12 gap-6">
      <div class="col-span-12 md:col-span-9">
        <template v-if="blogs">
          <div
            id="description-content"
            class="text-muted-foreground md:px-4 text-sm md:text-base"
            ref="htmlContent"
            v-html="blogs.data.description_html"
          ></div>
        </template>
      </div>
      <div class="hidden md:block md:col-span-3">
        <div class="sticky top-20 right-0">
          <div class="mb-3">
            <router-link to="/blog">
              <Button
                type="button"
                fluid
                variant="text"
                class="text-sm justify-start"
              >
                <IconArrowLeft class="size-4" />
                <span> Back to Blog </span>
              </Button>
            </router-link>
          </div>
          <div v-if="blogs" id="toc">
            <TableOfContent
              :active-id="activeId"
              :toc-links="tocLinks"
              @handle-click-toc="onClickTOC"
            />
          </div>
        </div>
      </div>
      <div class="col-span-12">
        <hr class="border-zinc-50/[.05]" />

        <div class="mt-8 text-center">
          <router-link to="/blog">
            <Button
              type="button"
              variant="outlined"
              class="text-sm justify-start"
            >
              <IconArrowLeft class="size-4" />
              <span> Back to Blog </span>
            </Button>
          </router-link>
        </div>
      </div>
    </div>

    <MobileTOC
      :tocLinks="tocLinks"
      :activeId="activeId"
      @handle-click-toc="onClickTOC"
    />

    <ButtonBackDetail :url_back="'/blog'" />
  </div>
</template>
<script setup lang="ts">
import { IconArrowLeft } from "@tabler/icons-vue";
import type { TBaseResponse } from "~/types/base.type";
import type { TPublicBlogDetail } from "~/types/blog.type";

import hljs from "highlight.js";
import "./../../assets/css/editor-content.css";
import "highlight.js/styles/atom-one-dark-reasonable.min.css";

const route = useRoute();
const { slugToStringUppercase } = useSlugify();
const slug = route.params.slug as string;

const runtimeConfig = useRuntimeConfig();
const BASE_API = runtimeConfig.public.apiBase;
const MINIO_BASE_URL = useMinioUrl();

useHead({
  title: `${slugToStringUppercase(slug)}`,
  titleTemplate: "%s | Blog",
});

const { data: blogs } = await useAsyncData("public-blog", async () => {
  try {
    const response = await $fetch<TBaseResponse<TPublicBlogDetail>>(
      `${BASE_API}/api-public/blogs/${slug}`
    );

    return response;
  } catch (err) {
    console.error("Error fetching data:", err);
    return null;
  }
});

const tocLinks = ref<any[]>([]);
const tocSelectorEl =
  "#description-content h1, #description-content h2, #description-content h3, #description-content h4, #description-content h5, #description-content h6";
const activeId: any = ref(null);
const scrollDelay = 100;
let observer: any = null;
const isUserClicking = ref(false);

const generateToc = () => {
  tocLinks.value = [];
  const headings = document.querySelectorAll(tocSelectorEl);

  headings.forEach((heading) => {
    const id = heading.id || generateId(heading.textContent);
    heading.id = id;
    tocLinks.value.push({
      id: id,
      text: heading.textContent,
      level: parseInt(heading.tagName.substring(1)),
    });
  });
};

const generateId = (text: any) => {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

const onClickTOC = (targetId: any) => {
  isUserClicking.value = true;
  activeId.value = targetId;
  scrollToWithDelay(targetId);
};

const scrollToWithDelay = (targetId: any) => {
  setTimeout(() => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }, scrollDelay);
};

const setupIntersectionObserver = () => {
  const headings = document.querySelectorAll(tocSelectorEl);

  observer = new IntersectionObserver(
    (entries) => {
      const intersectingHeadings = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      if (intersectingHeadings.length > 0) {
        if (
          activeId.value !== intersectingHeadings[0].target.id &&
          !isUserClicking.value
        ) {
          activeId.value = intersectingHeadings[0].target.id;
        } else {
          setTimeout(() => {
            isUserClicking.value = false;
          }, scrollDelay + 200);
        }
      }
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    }
  );

  headings.forEach((heading) => {
    observer.observe(heading);
  });
};

const htmlContent = ref<any>(null);

const highlightHtml = () => {
  if (htmlContent.value) {
    const codeBlocks = htmlContent.value.querySelectorAll("pre code");
    codeBlocks.forEach((block: any) => {
      const languageClass = block.className.match(/language-(\w+)/);
      let language = languageClass ? languageClass[1] : null;

      try {
        if (language === "vue" && !hljs.getLanguage("vue")) {
          // If the requested language is 'vue' but it's not registered,
          // force it to 'html'
          block.className = block.className.replace(
            "language-vue",
            "language-html"
          );
          hljs.highlightElement(block);
        } else if (language && hljs.getLanguage(language)) {
          hljs.highlightElement(block);
        } else {
          // If no language is specified or the language is unknown (not 'vue'),
          // let Highlight.js attempt auto-detection or treat as plain text
          hljs.highlightElement(block);
        }
      } catch (error) {
        console.warn(`Highlight.js error for language '${language}':`, error);
        // Fallback to 'html' in case of an error
        block.className = block.className.replace(
          languageClass ? `language-${language}` : "",
          "language-html"
        );
        hljs.highlightElement(block);
      }
    });
  }
};

onMounted(() => {
  generateToc();
  highlightHtml();
  setupIntersectionObserver();
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style scoped></style>
