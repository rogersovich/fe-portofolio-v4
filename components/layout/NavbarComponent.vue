<template>
  <ClientOnly>
    <div
      v-if="!isMobile && !isTablet"
      class="pointer-events-none fixed top-0 inset-x-0 z-50 opacity-100 hover:!opacity-100"
    >
      <div class="nav-container">
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
          <span class="text-[12px] text-zinc-400 dark:text-zinc-600">|</span>
          <span
            class="font-rethink text-zinc-800 dark:text-zinc-50 cursor-pointer fcc gap-2"
            @click="toggleMenuDeep"
          >
            More
            <IconMenuDeep class="size-4" />
          </span>
        </div>
      </div>
      <div
        v-if="show_menu_deep"
        ref="targetDeepMenu"
        class="nav-container-deep-menu"
      >
        <div
          class="nav-item-deep-menu group"
        >
          <IconSignature class="size-6 text-foreground group-hover:text-orange-500" />
          <div class="text-[14px] font-rethink group-hover:text-orange-300">Write Message</div>
        </div>
        <div
          class="nav-item-deep-menu group"
        >
          <IconSparkles class="size-6 text-foreground group-hover:text-orange-500" />
          <div class="text-[14px] font-rethink group-hover:text-orange-300">Useful Website</div>
        </div>
        <div
          class="nav-item-deep-menu group"
          @click="toggleTheme"
        >
          <IconMoon
            v-if="colorMode.preference == 'dark'"
            class="size-4 text-foreground group-hover:text-orange-500"
          />
          <IconSun
            v-else-if="colorMode.preference == 'light'"
            class="size-4 text-foreground group-hover:text-orange-500"
          />
          <IconSunMoon v-else class="size-4 text-foreground group-hover:text-orange-500" />
          <div class="text-[14px] font-rethink group-hover:text-orange-300">Switch Theme</div>
        </div>
      </div>
    </div>
    <template v-else-if="isMobile">
      <div class="fixed top-5 right-5 z-50">
        <button
          ref="targetMenu"
          @click="handleToggleMobileMenu()"
          type="button"
          class="nav-btn-menu-mobile"
        >
          <span class="text-[13px] font-rethink text-foreground">Menu</span>
          <IconChevronDown v-if="!menu_mobile" class="size-4 text-foreground" />
          <IconChevronUp v-else class="size-4 text-foreground" />
        </button>
      </div>

      <div
        v-if="menu_mobile"
        class="fixed top-20 right-5 z-50 transition-transform duration-300"
      >
        <div
          class="nav-mobile-container"
        >
          <template v-for="nav in listNavs" :key="nav.key">
            <div
              @click="onClickNav(nav.key)"
              class="nav-mobile-item"
            >
              <div
                class="bg-zinc-400/60 dark:bg-zinc-800/60 p-2 rounded-lg flex items-center justify-center"
              >
                <component
                  :is="nav.icon"
                  class="size-5 text-foreground"
                  :class="{
                    'dark:!text-orange-400 text-orange-500': nav.active,
                  }"
                />
              </div>
              <div>
                <div
                  class="text-[13px] font-rethink text-foreground"
                  :class="{
                    'dark:!text-orange-400 text-orange-500': nav.active,
                  }"
                >
                  {{ nav.title }}
                </div>
                <div
                  class="text-[11px] mt-1 text-muted-foreground"
                  :class="{
                    'dark:!text-orange-100 text-orange-950': nav.active,
                  }"
                >
                  {{ nav.description }}
                </div>
              </div>
            </div>
          </template>
          <div
            class="nav-switch-theme"
            @click="toggleTheme"
          >
            <div
              class="bg-zinc-400/60 dark:bg-zinc-800/60 p-2 rounded-lg flex items-center justify-center"
            >
              <IconMoon
                v-if="colorMode.preference == 'dark'"
                class="size-5 text-foreground"
              />
              <IconSun
                v-else-if="colorMode.preference == 'light'"
                class="size-5 text-foreground"
              />
              <IconSunMoon v-else class="size-5 text-foreground" />
            </div>
            <div>
              <div class="text-[13px] font-rethink text-foreground">
                Switch Theme
              </div>
              <div class="text-[11px] mt-1 text-muted-foreground">
                Change theme if you want
              </div>
            </div>
          </div>
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
  IconMenuDeep,
  IconSignature,
  IconMoon,
  IconSun,
  IconSunMoon,
  IconSparkles,
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
const colorMode = useColorMode();

const targetMenu = useTemplateRef<HTMLElement>("targetMenu");
const targetDeepMenu = useTemplateRef<HTMLElement>("targetDeepMenu");

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

const show_menu_deep = ref(false);

const toggleMenuDeep = () => {
  if (show_menu_deep.value) {
    return;
  } else {
    show_menu_deep.value = !show_menu_deep.value;
  }
};

const toggleTheme = () => {
  if (colorMode.preference == "dark") {
    colorMode.preference = "light";
  } else {
    colorMode.preference = "dark";
  }
};

const handleToggleMobileMenu = () => {
  menuStore.toggleMobileMenu();
};

menuStore.$subscribe((mutation, state) => {
  setStoreMenuPath(state.active_path);
});

onClickOutside(targetMenu, () => {
  menuStore.hideMobileMenu();
});

onClickOutside(targetDeepMenu, () => {
  setTimeout(() => {
    show_menu_deep.value = !show_menu_deep.value;
  }, 50);
});

onMounted(() => {
  setActivePath();
});
</script>
<style lang=""></style>
