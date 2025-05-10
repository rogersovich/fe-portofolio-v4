<template>
  <div>
    <div class="mb-6">
      <div class="text-3xl font-rethink font-bold">Page About</div>
      <div class="text-muted-foreground font-light mt-2">
        Create summary about your personality
      </div>
    </div>
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 2xl:col-span-10">
        <div class="border border-zinc-50/[.1] rounded-lg px-5 py-4">
          <div class="grid grid-cols-12 gap-8">
            <div class="col-span-4">
              <template v-if="!loadingAbout && about">
                <div class="flex flex-col items-start justify-center gap-4">
                  <NuxtImg
                    :src="about?.avatar_url"
                    class="rounded-lg w-full"
                    densities="x1 x2"
                  />
                  <div class="w-full">
                    <router-link :to="`/adminz/about/edit/${about?.id}`">
                      <Button type="button" fluid variant="outlined">
                        <IconEdit class="size-5" />
                        <span> Edit </span>
                      </Button>
                    </router-link>
                  </div>
                </div>
              </template>
              <template v-else>
                <div>
                  <Skeleton width="100%" height="250px" class="mb-3"></Skeleton>
                  <Skeleton width="100%" height="50px"></Skeleton>
                </div>
              </template>
            </div>
            <div class="col-span-8">
              <template v-if="!loadingAbout && about">
                <div>
                  <div class="text-5xl text-zinc-50 font-rethink font-bold">
                    {{ about?.title }}
                  </div>
                  <div class="pt-8 text-muted-foreground text-base">
                    <span v-html="about?.description_html"></span>
                  </div>
                </div>
              </template>
              <template v-else>
                <div>
                  <Skeleton width="80%" height="50px" class="mb-3"></Skeleton>

                  <template v-for="i in 6" :key="i">
                    <Skeleton width="75%" height="15px" class="mb-3"></Skeleton>
                  </template>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { IconEdit } from "@tabler/icons-vue";
import type { TAbout } from "~/types/about.type";

useHead({
  title: "Admin - About",
  titleTemplate: "%s | Portofolio",
});

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const about = ref<TAbout | null>(null);

const { fetchAbouts, loading: loadingAbout, aboutData } = useAboutAPI();

watch(
  () => [aboutData.value],
  () => {
    about.value = aboutData.value;
  })

onMounted(async () => {
  await fetchAbouts();
});
</script>
<style></style>
