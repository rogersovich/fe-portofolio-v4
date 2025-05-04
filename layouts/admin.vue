<template>
  <div class="grid grid-cols-12">
    <div
      class="border border-zinc-50/[.05] border-t-0 border-b-0"
      :class="{
        'col-span-1': !sidebarExpanded,
        'col-span-2': sidebarExpanded,
      }"
    >
      <BaseSidebarMenu/>
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
<script setup lang="ts">
import { useSidebarStore } from '~/stores/useSidebar';

const {
  sidebarExpanded,
} = useSidebarStore()
</script>
<style lang=""></style>
