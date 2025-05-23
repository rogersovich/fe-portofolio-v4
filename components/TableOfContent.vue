<template>
  <div class="text-[16px] font-rethink font-bold mb-3">Table of Contents</div>
  <ul id="toc-list">
    <li v-for="link in tocLinks" :key="link.id">
      <a
        :href="'#' + link.id"
        class="text-[13px] no-underline text-muted-foreground font-light"
        :class="{
          'text-orange-400 font-bold': activeId === link.id,
        }"
        @click.prevent="onClickTOC(link.id)"
        >{{ link.text }}</a
      >
    </li>
  </ul>
</template>
<script setup lang="ts">
const { tocLinks, activeId } = defineProps<{
  tocLinks: any[];
  activeId: any;
}>();

const emit = defineEmits<{
  (e: "handle-click-toc", id: any): void;
}>();

const onClickTOC = (id: any) => {
  emit("handle-click-toc", id);
};
</script>
<style lang=""></style>
