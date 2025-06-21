<template>
  <section
    class="layout pb-6 pt-6 md:pb-12 md:pt-12 flex flex-col justify-center"
  >
    <div class="flex flex-col gap-6 md:gap-12">
      <div class="flex flex-row gap-4 items-center">
        <div
          class="border border-solid border-zinc-950/10 dark:border-zinc-50/10 px-2 bg-zinc-400/[.35] dark:bg-zinc-800/[.35] py-1 text-xl rounded-full"
        >
          🏆
        </div>
        <div class="text-2xl font-rethink font-bold">Certificates</div>
      </div>
      <div class="grid grid-cols-12 gap-6">
        <template
          v-for="(cert, i) in listHighlightCertificatesReverse"
          :key="i"
        >
          <CardCertificate :cert="cert" />
        </template>
        <div class="col-span-12 text-center">
          <Button
            severity="secondary"
            class="!text-[13px] md:!text-base shadow md:!rounded-md !px-8 w-full md:w-fit !rounded-full"
            @click="show_dialog = true"
            >All Certificates</Button
          >
        </div>
      </div>
    </div>

    <Dialog
      v-model:visible="show_dialog"
      modal
      header="All Certificates"
      :style="{ width: isMobile ? '95%' : '75%' }"
    >
      <div class="grid grid-cols-12 gap-6">
        <template v-for="(cert, i) in listCertificatesReverse" :key="i">
          <CardCertificate :cert="cert" />
        </template>
      </div>
    </Dialog>
  </section>
</template>
<script setup lang="ts">
import { isMobile } from "~/composables/useBreakpoint";

const show_dialog = ref(false);
const { LIST_CERTIFICATES, HIGHLIGHT_CERTIFICATES } = useListCertificates();

const listCertificatesReverse = computed(() => {
  return LIST_CERTIFICATES.reverse();
});

const listHighlightCertificatesReverse = computed(() => {
  return HIGHLIGHT_CERTIFICATES.reverse();
});
</script>
<style lang=""></style>
