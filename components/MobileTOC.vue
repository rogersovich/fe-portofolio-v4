<template>
  <DrawerRoot should-scale-background v-model:open="isOpen">
    <ClientOnly>
      <DrawerTrigger
        v-if="isMobile"
        class="fixed bottom-4 right-4 bg-transparent border-none p-0 focus:bg-transparent z-50"
      >
        <div
          class="btn-float-toc"
        >
          <IconListTree class="size-4 text-foreground" />
          <span class="text-[13px] font-rethink text-foreground"
            >Table of Contents</span
          >
        </div>
      </DrawerTrigger>
    </ClientOnly>
    <DrawerPortal>
      <DrawerOverlay class="fixed bg-zinc-700/40 dark:bg-zinc-900/40 inset-0 z-50" />
      <DrawerContent
        aria-describedby="drawer-desc"
        id="drawer-content-blog-toc"
        class="backdrop-blur-sm bg-zinc-600/[.6] dark:bg-zinc-800/[.6] flex flex-col rounded-t-[10px] h-auto mt-24 max-h-[50%] fixed bottom-0 left-0 right-0 z-50"
      >
        <div class="p-4 ounded-t-[10px] flex-1">
          <DrawerHandle data-testid="handle" class="mb-8 mt-2" />

          <div class="text-[18px] font-rethink font-bold mb-3 text-zinc-50">
            Table of Contents
          </div>
          <ul id="toc-list">
            <li v-for="link in tocLinks" :key="link.id">
              <a
                :href="'#' + link.id"
                class="text-[15px] no-underline text-zinc-300 dark:text-muted-foreground font-normal"
                :class="{
                  '!text-orange-400 dark:!text-orange-400 !font-bold': activeId === link.id,
                }"
                @click.prevent="handleClickToc(link.id)"
                >{{ link.text }}</a
              >
            </li>
          </ul>
        </div>
      </DrawerContent>
    </DrawerPortal>
  </DrawerRoot>
</template>

<script setup lang="ts">
import { IconListTree } from "@tabler/icons-vue";
import { isMobile } from "~/composables/useBreakpoint";
import {
  DrawerContent,
  DrawerHandle,
  DrawerOverlay,
  DrawerPortal,
  DrawerRoot,
  DrawerTrigger,
} from "vaul-vue";

const { tocLinks, activeId } = defineProps<{
  tocLinks: any[];
  activeId: any;
}>();

const emit = defineEmits(["handle-click-toc"]);

const isOpen = ref(false)

const closeDrawer = () => {
  isOpen.value = false
}

const handleClickToc = (id: string) => {
  closeDrawer()
  emit("handle-click-toc", id);
}
</script>

<style></style>
