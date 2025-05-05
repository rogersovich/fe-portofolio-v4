<template>
  <ClientOnly>
    <div class="grid grid-cols-12">
      <div
        class="border border-zinc-50/[.05] border-t-0 border-b-0"
        :class="{
          'col-span-1': !sidebarExpanded,
          'col-span-2': sidebarExpanded,
        }"
      >
        <BaseSidebarMenu />
      </div>
      <div
        :class="{
          'col-span-11': !sidebarExpanded,
          'col-span-10': sidebarExpanded,
        }"
      >
        <div class="px-10 py-8">
          <slot />
        </div>
      </div>
    </div>
  </ClientOnly>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useSidebarStore } from "~/stores/useSidebar";

const route = useRoute();
const sidebarStore = useSidebarStore();
const { sidebarExpanded, menuList } = storeToRefs(sidebarStore);

const syncMenuActive = (routePath: string) => {
  const oldActiveIndex = menuList.value.findIndex((menu) => {
    return menu.is_active;
  });

  menuList.value[oldActiveIndex].is_active = false;

  const findMenuIndex = menuList.value.findIndex((menu) => {
    return routePath.includes(menu.key);
  });

  if (findMenuIndex == -1) {
    return;
  }

  menuList.value[findMenuIndex].is_active = true;
};

onMounted(() => {
  sidebarStore.setInitMenuList();
  setTimeout(() => {
    syncMenuActive(route.path);
  }, 500);
});
</script>
<style lang=""></style>
