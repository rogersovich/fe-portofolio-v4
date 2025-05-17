<template>
  <div>
    <div class="mb-6">
      <div class="flex justify-between">
        <div>
          <div class="text-3xl font-rethink font-bold">Create - Page Blog</div>
          <div class="text-muted-foreground font-light mt-2">
            Create reliable Blog in here
          </div>
        </div>
        <div>
          <Button variant="text" @click="$router.push('/adminz/blog')">
            <IconArrowLeft class="size-5" />
            <span> Back </span>
          </Button>
        </div>
      </div>
    </div>
    <div class="pt-3">
      <form @submit.prevent="onFormSubmit" class="grid grid-cols-12 gap-6">
        <div class="col-span-12">
          <div class="flex justify-between">
            <div class="text-2xl font-rethink font-bold">Form Create</div>
          </div>
          <hr class="border-zinc-50/[.15] mt-3" />
        </div>
        <div class="col-span-3">
          <div class="flex flex-col gap-1 text-left">
            <label class="mb-1">Image Upload</label>
            <!-- Hidden file input -->
            <input
              ref="refBanner"
              type="file"
              style="display: none"
              @change="handleBannerChange"
            />

            <div class="flex flex-col items-center justify-center gap-3 mb-3">
              <template v-if="forms?.banner_file?.file">
                <NuxtImg
                  :src="forms?.banner_file.blob_url"
                  class="rounded-lg w-full"
                ></NuxtImg>
              </template>
              <template v-else>
                <div
                  class="w-full h-[200px] border border-dashed border-zinc-50/[.2] rounded-md flex flex-col items-center justify-center gap-3"
                >
                  <IconPhoto class="size-10 text-zinc-50" />
                  <span class="text-zinc-50"> Select a image </span>
                </div>
              </template>
              <div class="w-full flex flex-col items-center gap-3">
                <Button
                  type="button"
                  variant="outlined"
                  label="Select Image"
                  class="w-full"
                  @click="triggerBannerChange"
                  :disabled="loading || loadingTopic || loadingAuthor"
                />
                <template v-if="forms?.banner_file?.file">
                  <Button
                    type="button"
                    variant="outlined"
                    severity="danger"
                    label="Cancel Image"
                    class="w-full"
                    @click="cancelBanner"
                    :disabled="loading || loadingTopic || loadingAuthor"
                  />
                </template>
              </div>
            </div>
          </div>
          <Message
            v-if="bannerError"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ bannerError }}
          </Message>
        </div>
        <div class="col-span-9">
          <div class="grid grid-cols-12 gap-6">
            <div class="col-span-12">
              <div class="flex flex-col gap-1 text-left">
                <label for="title" class="mb-1">Title</label>
                <InputText
                  v-model="forms.title"
                  id="title"
                  type="text"
                  placeholder="e.g. title"
                  fluid
                  variant="outlined"
                  :disabled="loading || loadingTopic || loadingAuthor"
                />
                <div v-if="formErrors.title && formErrors.title.length > 0">
                  <Message
                    v-for="(message, index) in formErrors.title"
                    :key="index"
                    severity="error"
                    size="small"
                    variant="simple"
                  >
                    {{ message }}
                  </Message>
                </div>
              </div>
            </div>

            <div class="col-span-4">
              <div class="flex flex-col gap-1 text-left">
                <label for="is_published" class="mb-1">Status</label>
                <Select
                  v-model="forms.is_published"
                  :options="is_published_options"
                  optionLabel="label"
                  option-value="value"
                  placeholder="Select"
                  class="w-full"
                />
              </div>
            </div>

            <div class="col-span-8">
              <div class="flex flex-col gap-1 text-left">
                <label for="slug" class="mb-1">Slug</label>
                <InputText
                  v-model="forms.slug"
                  id="slug"
                  type="text"
                  placeholder="e.g. slug"
                  fluid
                  variant="outlined"
                  :disabled="loading || loadingTopic || loadingAuthor"
                />
                <div v-if="formErrors.slug && formErrors.slug.length > 0">
                  <Message
                    v-for="(message, index) in formErrors.slug"
                    :key="index"
                    severity="error"
                    size="small"
                    variant="simple"
                  >
                    {{ message }}
                  </Message>
                </div>
              </div>
            </div>

            <div class="col-span-6">
              <div class="flex flex-col gap-1 text-left">
                <label for="topic" class="mb-1">Topic</label>
                <MultiSelect
                  v-model="forms.topic_ids"
                  :options="topics_options"
                  optionLabel="name"
                  optionValue="id"
                  filter
                  placeholder="Select Topic"
                  :maxSelectedLabels="5"
                  class="w-full"
                  :disabled="loading || loadingTopic || loadingAuthor"
                >
                </MultiSelect>

                <div
                  v-if="formErrors.topic_ids && formErrors.topic_ids.length > 0"
                >
                  <Message
                    v-for="(message, index) in formErrors.topic_ids"
                    :key="index"
                    severity="error"
                    size="small"
                    variant="simple"
                  >
                    {{ message }}
                  </Message>
                </div>
              </div>
            </div>

            <div class="col-span-6">
              <div class="flex flex-col gap-1 text-left">
                <label for="author" class="mb-1">Author</label>
                <Select
                  v-model="forms.author_id"
                  :options="authors_options"
                  optionLabel="name"
                  option-value="id"
                  placeholder="Select"
                  class="w-full"
                >
                  <template #option="slotProps">
                    <div class="flex items-center">
                      <img
                        :alt="slotProps.option.name"
                        :src="slotProps.option.avatar_url"
                        class="mr-3 w-[30px] h-[30px] rounded-full object-cover"
                      />
                      <div>{{ slotProps.option.name }}</div>
                    </div>
                  </template>
                </Select>

                <div
                  v-if="formErrors.author_id && formErrors.author_id.length > 0"
                >
                  <Message
                    v-for="(message, index) in formErrors.author_id"
                    :key="index"
                    severity="error"
                    size="small"
                    variant="simple"
                  >
                    {{ message }}
                  </Message>
                </div>
              </div>
            </div>

            <div
              class="col-start-1 col-span-12 2xl:col-start-1 2xl:col-span-12"
            >
              <div class="flex flex-col gap-1 text-left">
                <label class="mb-1">Summary HTML</label>
                <BaseCustomEditor
                  v-model="forms.summary"
                  :errMessage="summaryHtmlError"
                  :disabled="!loadingTopic || !loadingAuthor"
                  :exclude="['image']"
                />
                <Message
                  v-if="summaryHtmlError"
                  severity="error"
                  size="small"
                  variant="simple"
                >
                  {{ summaryHtmlError }}
                </Message>
              </div>
            </div>

            <div
              class="col-start-1 col-span-12 2xl:col-start-1 2xl:col-span-12"
            >
              <div class="flex flex-col gap-1 text-left">
                <label class="mb-1">Description HTML</label>
                <BaseCustomEditor
                  v-model="forms.description"
                  :errMessage="descriptionHtmlError"
                  :disabled="!loadingTopic || !loadingAuthor"
                  uploadUrlAPI="blog-content-images/store"
                />
                <Message
                  v-if="descriptionHtmlError"
                  severity="error"
                  size="small"
                  variant="simple"
                >
                  {{ descriptionHtmlError }}
                </Message>
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-start-9 col-end-11 w-full sticky bottom-2 z-1"
        >
          <Button
            type="button"
            variant="outlined"
            label="Cancel"
            class="w-full bg-zinc-950 hover:!bg-zinc-800"
            @click="$router.push('/adminz/blog')"
            :disabled="loading || loadingTopic || loadingAuthor"
          />
        </div>
        <div
          class="col-start-11 col-end-13 w-full sticky bottom-2 z-1"
        >
          <Button
            type="submit"
            severity="contrast"
            label="Submit"
            class="w-full"
            :disabled="loading || loadingTopic || loadingAuthor"
          />
        </div>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { z } from "zod";
import { IconArrowLeft, IconPhoto } from "@tabler/icons-vue";
import type { TPublicTopic } from "~/types/topic.type";
import type { TPublicAuthor } from "~/types/author.type";

useHead({
  title: "Admin - Create Blog",
  titleTemplate: "%s | Portofolio",
});

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const refBanner = ref("");
const forms = ref({
  title: "",
  slug: "",
  description: "",
  summary: "",
  is_published: "N",
  topic_ids: [],
  author_id: null,
  banner_file: {
    file: null,
    blob_url: "",
  },
});
const is_published_options = ref([
  { label: "Published", value: "Y" },
  { label: "Unpublished", value: "N" },
]);

const descriptionHtmlError = ref<string>("");
const summaryHtmlError = ref<string>("");
const formSchema = z.object({
  title: z.string().nonempty("Title is required."),
  slug: z.string().nonempty("Slug is required."),
  topic_ids: z.array(z.number()).min(1, "Technology is required."),
  author_id: z.number().min(1, "Author is required."),
});

const handleBannerChange = (event: any) => {
  const file = event.target.files[0];
  if (file) {
    forms.value.banner_file.blob_url = URL.createObjectURL(file);
    forms.value.banner_file.file = file;
  }
};

const triggerBannerChange = () => {
  const fileInput = refBanner.value as unknown as HTMLInputElement;
  fileInput.click();
};

const cancelBanner = () => {
  forms.value.banner_file.file = null;
  forms.value.banner_file.blob_url = "";
};

const { formErrors, validateForm } = useValidateForm();
const bannerError = ref("");

const validateDescriptionHtml = () => {
  const val = forms.value.description.trim();
  if (val == "" || val == "<p></p>") {
    descriptionHtmlError.value = "Description HTML is required.";
  } else {
    descriptionHtmlError.value = "";
  }
};

const validateSummaryHtml = () => {
  const val = forms.value.summary.trim();
  if (val == "" || val == "<p></p>") {
    summaryHtmlError.value = "summary HTML is required.";
  } else {
    summaryHtmlError.value = "";
  }
};

const validateBanner = () => {
  bannerError.value = "";
  if (!forms.value.banner_file.file) {
    bannerError.value = "Banner is required.";
    return false;
  }

  return true;
};

watch(
  () => [forms.value.description, forms.value.summary],
  () => {
    validateDescriptionHtml();
    validateSummaryHtml();
  }
);
watch(
  () => [forms.value.banner_file.file],
  () => {
    validateBanner();
  }
);

watch(
  () => [forms.value.title, forms.value.slug, forms.value.topic_ids, forms.value.author_id],
  () => {
    validateForm(formSchema, forms.value);
  }
);

// API
const { storeBlog, loading } = useBlogAPI();
const {
  fetchPublicTopics,
  loading: loadingTopic,
  topicPublicListData,
} = useTopicAPI();
const {
  fetchPublicAuthors,
  loading: loadingAuthor,
  authorPublicListData,
} = useAuthorAPI();

const topics_options = ref<TPublicTopic[]>([]);
const authors_options = ref<TPublicAuthor[]>([]);

watch(
  () => topicPublicListData.value,
  (newValue) => {
    topics_options.value = newValue || [];
  }
);

watch(
  () => authorPublicListData.value,
  (newValue) => {
    authors_options.value = newValue || [];
  }
);

const getImageUrlsFromHTML = (html: string) => {
  const regex = /<img [^>]*src="([^"]+)"/g;
  let matches;
  const imageUrls = [];

  // Loop through all matches in the HTML string
  while ((matches = regex.exec(html)) !== null) {
    imageUrls.push(matches[1]); // Capture the src value (image URL)
  }

  return imageUrls;
};

const onFormSubmit = async () => {
  validateDescriptionHtml();
  validateSummaryHtml();

  const isValid = validateForm(formSchema, forms.value);
  const isValidLogo = validateBanner();

  if (
    !descriptionHtmlError.value &&
    !summaryHtmlError.value &&
    isValid &&
    isValidLogo
  ) {
    const contentImageUrls = getImageUrlsFromHTML(forms.value.description);

    const formData = new FormData();
    formData.append("title", forms.value.title);
    formData.append("slug", forms.value.slug);
    formData.append("description", forms.value.description);
    formData.append("summary", forms.value.summary);
    formData.append("is_published", forms.value.is_published);

    const authorIdStr = JSON.stringify(forms.value.author_id);
    formData.append("author_id", authorIdStr);

    const topicIdsStringify = JSON.stringify(forms.value.topic_ids);
    formData.append("topic_ids", topicIdsStringify);

    if (contentImageUrls.length > 0) {
      const contentImageUrlsStringify = JSON.stringify(contentImageUrls);
      formData.append("content_images", contentImageUrlsStringify);
    }

    const avatarNewFile = forms.value.banner_file.file as unknown as File;
    formData.append("banner_file", avatarNewFile);

    await storeBlog(formData);
  }
};

onMounted(async () => {
  await fetchPublicTopics();
  await fetchPublicAuthors();
});
</script>
<style lang=""></style>
