<template>
  <div>
    <div
      class="layout text-center pb-4 pt-12 md:pt-32 flex flex-col justify-center"
    >
      <div class="flex flex-col gap-3">
        <div class="flex flex-col items-start gap-2 px-4 pb-0 py-5 rounded-md">
          <div class="text-5xl font-rethink font-bold mb-3" v-if="projects">
            {{ projects.data.title }}
          </div>
          <template v-if="projects">
            <div
              class="text-muted-foreground text-left"
              v-html="projects.data.summary"
            ></div>
          </template>
        </div>
        <div
          class="flex justify-between p-4 border border-solid border-zinc-50/[.05] border-x-0"
        >
          <div class="flex items-center gap-5" v-if="projects">
            <div class="flex items-center gap-2 group">
              <IconUser
                class="size-4 text-zinc-500 group-hover:text-orange-400"
              />
              <span class="text-[12px] text-zinc-300"> Personal Project </span>
            </div>
            <div class="flex items-center gap-2 group">
              <IconEye
                class="size-4 text-zinc-500 group-hover:text-orange-400"
              />
              <span class="text-[12px] text-zinc-300"
                >{{
                  projects.data.statistic ? projects.data.statistic.views : 0
                }}
                views
              </span>
            </div>
            <div class="flex items-center gap-2 group">
              <IconHeart
                class="size-4 text-zinc-500 group-hover:text-orange-400"
              />
              <span class="text-[12px] text-zinc-300">
                {{
                  projects.data.statistic ? projects.data.statistic.likes : 0
                }}
                likes
              </span>
            </div>
          </div>
          <div class="flex items-center gap-5" v-if="projects">
            <a
              v-if="projects.data.repository_url"
              :href="projects.data.repository_url"
              target="_blank"
              class="flex items-center gap-2 group cursor-pointer no-underline"
            >
              <IconBrandGithub
                class="size-4 text-zinc-500 group-hover:text-orange-400"
              />
              <span
                class="text-[12px] text-zinc-300 group-hover:underline group-hover:text-white"
              >
                Repository
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="layout grid grid-cols-12 gap-6">
      <div class="col-span-9">
        <template v-if="projects">
          <div
            id="description-content"
            class="text-muted-foreground px-4"
            v-html="projects.data.description"
          ></div>
        </template>
      </div>
      <div class="col-span-3">
        <div class="sticky top-20 right-0">
          <div class="mb-3">
            <router-link to="/project">
              <Button
                type="button"
                fluid
                variant="text"
                class="text-sm justify-start"
              >
                <IconArrowLeft class="size-4" />
                <span> Back to Project </span>
              </Button>
            </router-link>
          </div>
          <div v-if="projects" id="toc">
            <div class="text-[16px] font-rethink font-bold mb-3">
              Table of Contents
            </div>
            <ul id="toc-list">
              <li v-for="link in tocLinks" :key="link.id">
                <a
                  :href="'#' + link.id"
                  class="text-[13px] no-underline text-muted-foreground font-light"
                  :class="{ 'text-orange-400 font-bold': activeId === link.id }"
                  @click.prevent="onClickTOC(link.id)"
                  >{{ link.text }}</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-span-12">
        <hr class="border-zinc-50/[.05]" />

        <div class="mt-8 text-center">
          <router-link to="/project">
            <Button
              type="button"
              variant="outlined"
              class="text-sm justify-start"
            >
              <IconArrowLeft class="size-4" />
              <span> Back to Project </span>
            </Button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  IconUser,
  IconEye,
  IconHeart,
  IconBrandGithub,
  IconArrowLeft,
} from "@tabler/icons-vue";
import type { TBaseResponse } from "~/types/base.type";
import type { TPublicProjectDetail } from "~/types/project.type";
import "./../../assets/css/editor-content.css";
const route = useRoute();
const { slugToStringUppercase } = useSlugify();
const slug = route.params.slug as string;

const runtimeConfig = useRuntimeConfig();
const BASE_API = runtimeConfig.public.apiBase;

useHead({
  title: `${slugToStringUppercase(slug)}`,
  titleTemplate: "%s | Project",
});

const {
  data: projects,
} = await useAsyncData("publicProject", async () => {
  try {
    const response = await $fetch<TBaseResponse<TPublicProjectDetail>>(
      `${BASE_API}/api-public/projects/${slug}`
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

onMounted(() => {
  generateToc();
  setupIntersectionObserver();
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style scoped>
#toc ul {
  list-style-type: none;
  padding: 0;
  margin-top: 7px;
}

#toc li {
  margin-bottom: 7px;
}

/* #toc li::before {
  content: "- "; 
}

#toc li:where(:nth-child(n + 1)) {
  padding-left: calc(var(--level, 1) * 1em);
} */
</style>
