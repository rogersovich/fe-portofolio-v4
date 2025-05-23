<template>
  <ClientOnly>
    <div class="fixed bottom-4 left-4" v-if="isMobile">
      <Button
        type="button"
        @click="$router.push(url_back)"
        class="py-2 px-3 gap-2 rounded-md border border-solid !border-zinc-50/[.1] !bg-zinc-800/60 flex items-center justify-center cursor-pointer backdrop-blur-sm focus:!bg-zinc-800/60 focus:!border-zinc-50/[.1]"
      >
        <IconArrowLeft class="size-4 text-white" />
        <span class="text-[13px] font-rethink text-white"
          >Back</span
        >
      </Button>
    </div>
  </ClientOnly>
</template>
<script setup lang="ts">
import { IconArrowLeft } from "@tabler/icons-vue";
import { isMobile } from "~/composables/useBreakpoint";

const { url_back } = defineProps<{
  url_back: string;
}>();
</script>
<style lang=""></style>
