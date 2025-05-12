<template>
  <div
    class="pointer-events-none fixed top-0 inset-x-0 z-50 opacity-100 hover:!opacity-100"
  >
    <div
      class="hidden min-[570px]:flex pointer-events-auto mt-8 px-3 rounded-lg bg-zinc-800/60 w-fit mx-auto text-sm md:text-base"
    >
      <div class="flex items-center gap-4">
        <span
          v-for="nav in listNavs"
          :key="nav.title"
          @click="onClickNav(nav.key)"
          :class="{ '!text-orange-400': nav.active }"
          class="py-3 px-2 font-rethink transition-colors cursor-pointer text-white no-underline hover:underline hover:text-orange-400"
        >
          {{ nav.title }}
        </span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const listNavs = reactive([
  {
    title: "Home",
    key: "home",
    link: "/",
    active: true,
  },
  {
    title: "Project",
    key: "project",
    link: "/project",
    active: false,
  },
  {
    title: "Fun Fact",
    key: "fun-fact",
    link: "/fun-fact",
    active: false,
  },
  {
    title: "About",
    key: "about",
    link: "/about",
    active: false,
  },
]);

const onClickNav = (key: string) => {
  listNavs.forEach((nav) => {
    nav.active = false;
  });
  const nav = listNavs.find((nav) => nav.key === key);
  if (nav) {
    nav.active = true;
    router.push(nav.link);
  }
};

const setActivePath = () => {
  listNavs.forEach((nav) => {
    nav.active = false;
    if (route.path.includes(nav.key)) {
      nav.active = true;
    }
  });
};

onMounted(() => {
  setActivePath();
});
</script>
<style lang=""></style>
