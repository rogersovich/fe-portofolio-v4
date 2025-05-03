<template>
  <div class="grid grid-cols-12">
    <div
      class="border border-zinc-50/[.05] border-t-0 border-b-0"
      :class="{
        'col-span-1': !sidebarExpanded,
        'col-span-2': sidebarExpanded,
      }"
    >
      <div
        class="flex flex-col justify-start gap-2 min-h-screen relative py-4"
        :class="{
          'gap-2': sidebarExpanded,
          'gap-3': !sidebarExpanded,
        }"
      >
        <template v-if="sidebarExpanded">
          <div
            class="flex justify-between items-center gap-3 px-4 cursor-pointer mt-3 mb-1"
          >
            <div class="flex items-center gap-3">
              <NuxtImg src="/images/logo.png" class="w-[60px] h-[60px]" />
              <div class="font-bold text-2xl font-rethink">Zeraphi</div>
            </div>
            <div>
              <IconChevronLeft
                @click="toggleSidebar()"
                class="size-6 cursor-pointer text-white bg-zinc-50/[.2] p-1 rounded-full"
              />
            </div>
          </div>

          <template v-for="item in menuList" :key="item.title">
            <div
              class="flex gap-4 mx-4 text-[13px]"
              :class="{
                'items-center': !item.is_active,
                'items-start flex-col': item.is_active,
              }"
            >
              <div
                class="flex items-center justify-between w-full cursor-pointer px-5 py-3 group"
                :class="{
                  'bg-zinc-50/5 rounded-full': item.is_active,
                }"
                @click="toggleMenu(item)"
              >
                <div class="flex items-center gap-4">
                  <component
                    :is="item.icon"
                    class="size-5"
                    :class="{
                      'text-orange-500': item.is_active,
                      'text-white': !item.is_active,
                    }"
                  />
                  <div
                    :class="{
                      'text-orange-500 font-bold': item.is_active,
                      'text-white': !item.is_active,
                    }"
                    class="group-hover:font-bold"
                  >
                    {{ item.title }}
                  </div>
                </div>
                <div v-if="item.children.length > 0">
                  <IconChevronDown
                    class="size-6 text-white"
                    v-if="!item.is_active"
                  />
                  <IconChevronUp class="size-6 text-orange-500" v-else />
                </div>
              </div>
              <div
                class="flex items-start gap-2 flex-col pl-10 w-full"
                v-if="item.children.length > 0 && item.is_active"
              >
                <div
                  class="py-2 cursor-pointer hover:text-white hover:font-bold w-full"
                  v-for="child in item.children"
                  :key="child.title"
                  :class="{
                    'font-bold text-white': child.is_active,
                    'font-light text-zinc-50/50': !child.is_active,
                  }"
                  @click="toggleMenuChild(item, child)"
                >
                  {{ child.title }}
                </div>
              </div>
            </div>
          </template>

          <div class="absolute bottom-5 left-0 px-4 w-full">
            <div class="flex flex-col gap-5 py-3">
              <div
                class="flex items-center gap-2 px-3 bg-zinc-50/[.05] border border-zinc-50/[.1] rounded-md py-1"
              >
                <NuxtImg
                  src="/images/logo.png"
                  class="w-[50px] h-[50px rounded-full"
                />
                <div class="flex flex-col gap-0">
                  <div class="text-[13px] font-bold">Dimas Roger W</div>
                  <div class="text-[12px] font-light">Super Admin</div>
                </div>
              </div>
              <div class="flex items-center gap-4 px-6 cursor-pointer group">
                <IconLogout
                  class="size-5 text-zinc-50 group-hover:text-orange-500"
                />
                <div
                  class="text-[14px] text-zinc-50 group-hover:text-orange-500"
                >
                  Sign Out
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div
            class="flex justify-center items-center gap-3 px-4 cursor-pointer mt-3 relative"
          >
            <NuxtImg src="/images/logo.png" class="w-[70px] h-[70px]" />
            <div class="absolute -right-3">
              <IconChevronLeft
                @click="toggleSidebar()"
                class="size-6 cursor-pointer text-white bg-zinc-50/[.2] p-1 rounded-full"
              />
            </div>
          </div>
          <template v-for="item in menuList" :key="item.title">
            <div class="flex justify-center items-center gap-3 px-4">
              <div
                class="w-10 h-10 flex items-center justify-center"
                :class="{
                  'bg-zinc-50/[.05] rounded-full': item.is_active,
                }"
              >
                <component
                  :is="item.icon"
                  class="w-6 h-6 cursor-pointer hover:text-orange-500"
                  :class="{
                    'text-orange-500': item.is_active,
                    'text-white': !item.is_active,
                  }"
                  @click="toggleMenu(item)"
                />
              </div>
            </div>
          </template>
          <div class="absolute bottom-5 left-0 px-4 w-full">
            <div class="flex flex-col gap-6 py-3">
              <div
                class="flex items-center justify-center "
              >
                <NuxtImg
                  src="/images/logo.png"
                  class="w-[50px] h-[50px bg-zinc-50/[.05] p-2 rounded-full"
                />
              </div>
              <div class="flex items-center justify-center px-6 cursor-pointer group">
                <IconLogout
                  class="size-5 text-zinc-50 group-hover:text-orange-500"
                />
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div
      :class="{
        'col-span-11': !sidebarExpanded,
        'col-span-10': sidebarExpanded,
      }"
    >
      <slot />
    </div>
  </div>
</template>
<script setup>
import {
  IconLayoutDashboard,
  IconUserEdit,
  IconChevronDown,
  IconChevronUp,
  IconChevronLeft,
  IconUsersGroup,
  IconTool,
  IconBook,
  IconBuildings,
  IconTimeline,
  IconTag,
  IconBubbleText,
  IconVocabulary,
  IconPresentation,
  IconNews,
  IconLogout,
} from "@tabler/icons-vue";

const menuList = reactive([
  {
    title: "Dashboard",
    icon: IconLayoutDashboard,
    is_active: true,
    children: [],
  },
  {
    title: "User",
    icon: IconUsersGroup,
    is_active: false,
    children: [],
  },
  {
    title: "Author",
    icon: IconUserEdit,
    is_active: false,
    children: [
      {
        title: "All",
        is_active: false,
      },
      {
        title: "Create",
        is_active: false,
      },
    ],
  },
  {
    title: "About",
    icon: IconBook,
    is_active: false,
    children: [],
  },
  {
    title: "Project",
    icon: IconPresentation,
    is_active: false,
    children: [],
  },
  {
    title: "Blog",
    icon: IconNews,
    is_active: false,
    children: [],
  },
  {
    title: "Technology",
    icon: IconTool,
    is_active: false,
    children: [],
  },
  {
    title: "Experience",
    icon: IconBuildings,
    is_active: false,
    children: [],
  },
  {
    title: "Topic",
    icon: IconTag,
    is_active: false,
    children: [],
  },
  {
    title: "Statistic",
    icon: IconTimeline,
    is_active: false,
    children: [],
  },
  {
    title: "Testimonial",
    icon: IconBubbleText,
    is_active: false,
    children: [],
  },
  {
    title: "Reading Time",
    icon: IconVocabulary,
    is_active: false,
    children: [],
  },
]);

const toggleMenu = (menu) => {
  menuList.forEach((item) => {
    item.is_active = false;
  });

  if (menu.children.length > 0) {
    menu.children.forEach((child) => {
      child.is_active = false;
    });

    menu.children[0].is_active = true;
    menu.is_active = !menu.is_active;
  } else {
    menu.is_active = !menu.is_active;
  }
};

const toggleMenuChild = (menuParent, menuChild) => {
  menuParent.children.forEach((child) => {
    child.is_active = false;
  });
  menuChild.is_active = !menuChild.is_active;
};

const sidebarExpanded = ref(true);

const toggleSidebar = () => {
  sidebarExpanded.value = !sidebarExpanded.value;
};
</script>
<style lang=""></style>
