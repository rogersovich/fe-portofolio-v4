<template>
  <div class="fixed bottom-20 right-4 z-50 bg-transparent rounded-full">
    <Button
      type="button"
      fluid
      variant="outlined"
      class="!text-[12px] !p-3 !items-center !justify-center !rounded-full !bg-zinc-300/60 dark:!bg-zinc-800/60 backdrop-blur-sm "
      :class="{
        '!border-red-600/[.3]': isLike,
      }"
      @click="handleLike"
    >
      <IconHeartFilled v-if="isLike" class="size-5 text-red-500" />
      <IconHeart v-else class="size-5 text-muted-foreground" />
    </Button>
  </div>
</template>
<script setup lang="ts">
import type { TBaseResponse } from "~/types/base.type";
import type { TPublicBlogDetail } from "~/types/blog.type";
import { IconHeart, IconHeartFilled } from "@tabler/icons-vue";

const { blog, viewNew } = defineProps<{
  blog: TPublicBlogDetail;
  viewNew: any;
}>();

const emit = defineEmits<{
  (e: 'triggerNewLike', newLike: any): void
}>();


const runtimeConfig = useRuntimeConfig();
const BASE_API = runtimeConfig.public.apiBase;

const isLike = ref<boolean>(false);

const handleLike = async () => {
  if (isLike.value) return;

  isLike.value = true;

  await updateBlogStatisticLikeAPI();
};

const updateBlogStatisticLikeAPI = async () => {
  const likesOld = blog.statistic.likes as unknown as number;
  const body = {
    blog_id: blog.id,
    statistic_id: blog.statistic.id,
    likes: likesOld + 1,
    views: viewNew,
    type: "Blog",
  };

  try {
    const response = await $fetch<TBaseResponse<any>>(
      `${BASE_API}/api-public/update-statistic-blog`,
      {
        method: "POST",
        body,
      }
    );

    emit('triggerNewLike', response.data["likes"])

    return response;
  } catch (err) {
    console.error("Error update statistic:", err);
    return null;
  }
};
</script>
<style lang=""></style>
