<template>
  <div>
    <LayoutNavbarComponent ref="target" />
    <slot />
    <BaseFooterComponent />
  </div>
</template>
<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { useTemplateRef } from "vue";

const target = useTemplateRef<HTMLElement>("target");

const menuStore = useMenuStore();

onClickOutside(target, () => {
  menuStore.hideMobileMenu();
});
</script>
<style lang=""></style>
