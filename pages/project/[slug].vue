<template>
  <div class="relative">
    <div
      class="layout text-center !px-0 pb-4 pt-4 md:pt-32 flex flex-col justify-center"
    >
      <ClientOnly>
        <NuxtImg
          :src="getRandomBanner()"
          class="rounded-lg w-full max-h-[200px] object-cover blur-[4px] absolute top-0 left-0"
        />
      </ClientOnly>
      <div class="flex flex-col gap-3 z-10">
        <div
          class="flex flex-col items-start gap-2 md:px-4 pb-0 md:py-5 rounded-md"
        >
          <div
            class="text-4xl md:text-5xl font-rethink font-bold md:mb-3 text-center w-full"
            v-if="projects"
          >
            {{ projects.data.title }}
          </div>
          <template v-if="projects">
            <div
              class="text-foreground dark:text-muted-foreground text-center md:text-left text-sm md:text-base w-full"
              v-html="projects.data.summary"
            ></div>
          </template>
        </div>
        <template v-if="projects && projects.data.statistic">
          <template v-if="viewNew">
            <ProjectStatisticInfo
              :project="projects?.data"
              :is-like="isLike"
              :new-like="likesNew"
              :view-new="viewNew"
            />
          </template>
        </template>
      </div>
    </div>
    <div class="layout grid grid-cols-12 gap-6 z-10 relative">
      <div class="col-span-12 md:col-span-9">
        <template v-if="projects">
          <div
            id="description-content"
            class="text-muted-foreground md:px-4 text-sm md:text-base"
            v-html="projects.data.description"
          ></div>
        </template>
      </div>
      <div class="hidden md:block col-span-3">
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
            <TableOfContent
              :active-id="activeId"
              :toc-links="tocLinks"
              @handle-click-toc="onClickTOC"
            />
          </div>
          <div v-if="viewNew && projects" class="mt-3">
            <ProjectButtonLike
              :project="projects?.data"
              :view-new="viewNew"
              @trigger-new-like="updateNewLike($event)"
            />
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

    <MobileTOC
      :tocLinks="tocLinks"
      :activeId="activeId"
      @handle-click-toc="onClickTOC"
    />

    <ButtonBackDetail :url_back="'/project'" />

    <MobileProjectButtonLike
      v-if="isMobile && viewNew && projects"
      :project="projects?.data"
      :view-new="viewNew"
      @trigger-new-like="updateNewLike($event)"
    />
  </div>
</template>
<script setup lang="ts">
import { isMobile } from "~/composables/useBreakpoint";
import { IconArrowLeft } from "@tabler/icons-vue";
import "./../../assets/css/editor-content.css";

import type { TBaseResponse } from "~/types/base.type";
import type { TPublicProjectDetail } from "~/types/project.type";

const route = useRoute();
const { slugToStringUppercase } = useSlugify();
const slug = route.params.slug as string;

const runtimeConfig = useRuntimeConfig();
const BASE_API = runtimeConfig.public.apiBase;

useHead({
  title: `${slugToStringUppercase(slug)}`,
  titleTemplate: "%s | Project",
});

const { data: projects } = await useAsyncData("publicProject", async () => {
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

const getRandomBanner = () => {
  const banners = [
    "/images/banner-detail-1.png",
    "/images/banner-detail-2.png",
    "/images/banner-detail-3.png",
    "/images/banner-detail-4.png",
  ];

  return banners[Math.floor(Math.random() * banners.length)];
};

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

const viewNew = ref<any>(null);
const isLike = ref<boolean>(false);
const likesNew = ref<any>(null);

const updateNewLike = (newLike: any) => {
  isLike.value = true;
  likesNew.value = newLike;
};

const updateProjectStatisticViewAPI = async () => {
  if (projects.value?.data.statistic == null) return;
  const viewOld = projects.value?.data.statistic.views as unknown as number;
  const body = {
    project_id: projects.value?.data.id,
    statistic_id: projects.value?.data.statistic.id,
    likes: projects.value?.data.statistic.likes,
    views: viewOld + 1,
    type: "Project",
  };

  try {
    const response = await $fetch<TBaseResponse<any>>(
      `${BASE_API}/api-public/update-statistic-project`,
      {
        method: "POST",
        body,
      }
    );

    viewNew.value = response.data["views"];
    return response;
  } catch (err) {
    console.error("Error update statistic:", err);
    return null;
  }
};

onMounted(() => {
  generateToc();
  setupIntersectionObserver();
  setTimeout(() => {
    updateProjectStatisticViewAPI();
  }, 500);
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
</style>
