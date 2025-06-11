<template>
  <div class="col-span-12 md:col-span-6">
    <div
      class="border border-solid border-zinc-950/10 dark:border-zinc-50/10 rounded-xl p-6 min-h-[250px]"
    >
      <div
        class="bg-zinc-200 dark:bg-zinc-50 w-fit mb-4"
        :class="{
          'rounded-full pb-1 px-2 pt-2': cert.cert_type == 'School',
          'rounded-lg px-5 pb-1 pt-2': cert.cert_type != 'School',
        }"
      >
        <template v-if="cert.cert_type == 'Udemy'">
          <NuxtImg src="/images/udemy.png" class="h-[20px]" />
        </template>
        <template v-else-if="cert.cert_type == 'School'">
          <NuxtImg src="/images/wikrama.png" class="h-[30px]" />
        </template>
      </div>
      <a
        :href="cert.cert_url"
        target="_blank"
        class="font-rethink font-bold text-xl md:text-3xl text-muted-foreground no-underline hover:md:underline cursor-pointer"
      >
        <span>{{ cert.title }}</span>
      </a>
      <div class="mt-3.5 flex flex-col space-y-3">
        <template v-if="cert.cert_type != 'School'">
          <div
            class="text-muted-foreground text-[13px] md:text-base"
            v-if="cert.instructor"
          >
            Instructor:
            <span
              class="block mt-2 text-orange-500 md:text-foreground md:mt-0 md:inline-block"
            >
              {{ cert.instructor }}
            </span>
          </div>
          <div
            class="text-muted-foreground text-[13px] md:text-base"
            v-if="cert.cert_id"
          >
            Certificate ID:
            <span
              class="block mt-2 text-orange-500 md:text-foreground md:mt-0 md:inline-block"
            >
              {{ cert.cert_id }}</span
            >
          </div>
        </template>
        <template v-else>
          <div class="text-muted-foreground text-[13px] md:text-base">
            School:
            <span
              class="block mt-2 text-orange-500 md:text-foreground md:mt-0 md:inline-block"
            >
              SMK Wikrama Bogor
            </span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  cert: {
    title: string;
    instructor?: string;
    cert_id?: string;
    cert_type: string;
    cert_url?: string;
  }
}>();

</script>
<style lang=""></style>
