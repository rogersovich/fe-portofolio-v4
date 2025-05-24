<template>
  <ClientOnly>
    <div class="fixed bottom-6 left-4 z-50" v-if="isMobile">
      <Button
        type="button"
        @click="$router.push(url_back)"
        class="btn-float-back"
      >
        <IconArrowLeft class="size-4 text-foreground" />
        <span class="text-[13px] font-rethink text-foreground"
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
