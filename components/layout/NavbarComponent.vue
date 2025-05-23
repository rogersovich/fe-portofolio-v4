<template>
  <ClientOnly>
    <div
      v-if="!isMobile && !isTablet"
      class="pointer-events-none fixed top-0 inset-x-0 z-50 opacity-100 hover:!opacity-100"
    >
      <div
        class="nav-container"
      >
        <div class="flex items-center gap-4">
          <span
            v-for="nav in listNavs"
            :key="nav.title"
            @click="onClickNav(nav.key)"
            :class="{ 'dark:!text-orange-400 !text-orange-500': nav.active }"
            class="nav-item"
          >
            {{ nav.title }}
          </span>
        </div>
      </div>
    </div>
    <template v-else-if="isMobile">
      <div class="fixed top-5 right-5 z-50">
        <button
          ref="targetMenu"
          @click="handleToggleMobileMenu()"
          type="button"
          class="py-2 px-3 gap-2 rounded-md border border-solid border-zinc-50/[.1] bg-zinc-800/60 flex items-center justify-center cursor-pointer backdrop-blur-sm"
        >
          <span class="text-[13px] font-rethink text-white">Menu</span>
          <IconChevronDown v-if="!menu_mobile" class="size-4 text-white" />
          <IconChevronUp v-else class="size-4 text-white" />
        </button>
      </div>

      <div
        v-if="menu_mobile"
        class="fixed top-20 right-5 z-50 transition-transform duration-300"
      >
        <div
          class="p-3 rounded-lg border border-solid border-zinc-50/[.1] bg-zinc-800/60 min-w-[300px] flex flex-col space-y-2 backdrop-blur-md"
        >
          <template v-for="nav in listNavs" :key="nav.key">
            <div
              @click="onClickNav(nav.key)"
              class="flex rounded-lg space-x-4 items-center text-[13px] bg-zinc-950/30 px-4 py-3 no-underline cursor-pointer"
            >
              <div
                class="bg-zinc-800/60 p-2 rounded-lg flex items-center justify-center"
              >
                <component
                  :is="nav.icon"
                  class="size-5 text-white"
                  :class="{ '!text-orange-400': nav.active }"
                />
              </div>
              <div>
                <div
                  class="text-[13px] font-rethink text-white"
                  :class="{ '!text-orange-400': nav.active }"
                >
                  {{ nav.title }}
                </div>
                <div
                  class="text-[11px] mt-1 text-muted-foreground"
                  :class="{ '!text-orange-100': nav.active }"
                >
                  {{ nav.description }}
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </template>
  </ClientOnly>
</template>
<script setup lang="ts">
import {
  IconHome,
  IconBriefcase,
  IconBook2,
  IconComet,
  IconUserSquare,
  IconChevronDown,
  IconChevronUp,
} from "@tabler/icons-vue";
import { isMobile, isTablet } from "~/composables/useBreakpoint";
import { onClickOutside } from "@vueuse/core";
import { useTemplateRef } from "vue";

const route = useRoute();
const router = useRouter();
const listNavs = reactive([
  {
    title: "Home",
    key: "home",
    link: "/",
    active: true,
    icon: IconHome,
    description: "Highlight of my work and projects",
  },
  {
    title: "Project",
    key: "project",
    link: "/project",
    active: false,
    icon: IconBriefcase,
    description: "Showcasing my best work and creative projects",
  },
  {
    title: "Blog",
    key: "blog",
    link: "/blog",
    active: false,
    icon: IconBook2,
    description: "Insights, tutorials, and stories from my journey",
  },
  {
    title: "Fun Fact",
    key: "fun-fact",
    link: "/fun-fact",
    active: false,
    icon: IconComet,
    description: "Discovery my Hobbies and Fun facts",
  },
  {
    title: "About",
    key: "about",
    link: "/about",
    active: false,
    icon: IconUserSquare,
    description: "A story of growth and experiences",
  },
]);

const menuStore = useMenuStore();
const { menu_mobile } = storeToRefs(menuStore);

const targetMenu = useTemplateRef<HTMLElement>("targetMenu");

const onClickNav = (key: string) => {
  listNavs.forEach((nav) => {
    nav.active = false;
  });
  const nav = listNavs.find((nav) => nav.key === key);
  if (nav) {
    nav.active = true;
    menuStore.setActivePath(nav.link);
    router.push(nav.link);
  }
};

const setActivePath = () => {
  listNavs.forEach((nav) => {
    nav.active = false;
    if (route.path.includes(nav.key)) {
      menuStore.setActivePath(nav.link);
      nav.active = true;
    } else if (route.path === "/" && nav.key === "home") {
      menuStore.setActivePath(nav.link);
      nav.active = true;
    }
  });
};

const setStoreMenuPath = (active_path: string) => {
  listNavs.forEach((nav) => {
    nav.active = false;
  });
  const nav = listNavs.find((nav) => nav.link === active_path);
  if (nav) {
    nav.active = true;
  }
};

const handleToggleMobileMenu = () => {
  menuStore.toggleMobileMenu();
};

menuStore.$subscribe((mutation, state) => {
  const events = mutation.events as any;
  if (events.key === "active_path") {
    setStoreMenuPath(state.active_path);
  }
});

onClickOutside(targetMenu, () => {
  menuStore.hideMobileMenu();
});

onMounted(() => {
  setActivePath();
});
</script>
<style lang=""></style>
