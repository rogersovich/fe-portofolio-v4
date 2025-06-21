<template>
  <NuxtLayout>
    <ClientOnly>
      <Toast position="top-right" />
      <ConfirmDialog />
    </ClientOnly>
    <NuxtRouteAnnouncer />
    <NuxtPage />
    <NuxtLoadingIndicator />
  </NuxtLayout>
</template>

<script setup lang="ts">
import "primeicons/primeicons.css";

const toast = useToast();
const alertStore = useAlertStore();

alertStore.$subscribe((mutation, state) => {
  if (state.show_alert) {
    setTimeout(() => {
      toast.add({
        severity: state.severity,
        summary: state.summary,
        life: state.life,
      });
    }, 300);
  }
});
</script>
