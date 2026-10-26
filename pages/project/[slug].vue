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
            v-if="project"
          >
            {{ project.title }}
          </div>
          <template v-if="project">
            <div
              class="text-foreground dark:text-muted-foreground text-center md:text-left text-sm md:text-base w-full"
              v-html="project.summary"
            ></div>
          </template>
        </div>
        <ProjectStatisticInfo v-if="project" :project="project" />
      </div>
    </div>
    <div class="layout grid grid-cols-12 gap-6 z-10 relative">
      <div class="col-span-12 md:col-span-9">
        <template v-if="project">
          <div
            id="description-content"
            class="text-muted-foreground md:px-4 text-sm md:text-base"
          >
            <ContentRenderer :value="project.body" />
          </div>
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
          <div v-if="project" id="toc">
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
  </div>
</template>
<script setup lang="ts">
import { IconArrowLeft } from "@tabler/icons-vue";
import "./../../assets/css/editor-content.css";

const route = useRoute();
const slug = route.params.slug as string;

const { data: project } = await useAsyncData(`project-${slug}`, () => fetchProject(slug));

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: "Project not found", fatal: true });
}

useHead({
  title: project.value.title,
  titleTemplate: "%s | Project",
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
</style>
