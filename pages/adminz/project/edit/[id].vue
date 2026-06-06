<template>
  <div>
    <div class="mb-6">
      <div class="flex justify-between">
        <div>
          <div class="text-3xl font-rethink font-bold">Edit - Page Project</div>
          <div class="text-muted-foreground font-light mt-2">
            Edit reliable Project in here
          </div>
        </div>
        <div>
          <Button variant="text" @click="$router.push('/adminz/project')">
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
            <div class="text-2xl font-rethink font-bold">Form Edit</div>
          </div>
          <hr class="seperator-line mt-3" />
        </div>
        <div class="col-span-3">
          <div class="flex flex-col gap-1 text-left">
            <label class="mb-1">Image Upload</label>
            <!-- Hidden file input -->
            <input
              ref="refImage"
              type="file"
              style="display: none"
              @change="handleImageChange"
            />

            <div class="flex flex-col items-center justify-center gap-3 mb-3">
              <template v-if="!imageNew.is_changed">
                <NuxtImg
                  :src="forms?.image_url"
                  class="rounded-lg w-full"
                ></NuxtImg>
              </template>
              <template v-else>
                <NuxtImg
                  :src="imageNew.blob_url"
                  class="rounded-lg w-full"
                ></NuxtImg>
              </template>
              <div class="w-full flex flex-col items-center gap-3">
                <Button
                  type="button"
                  variant="outlined"
                  label="Select Image"
                  class="w-full"
                  @click="triggerImageChange"
                  :disabled="loading || loadingTech"
                />
                <template v-if="imageNew.is_changed">
                  <Button
                    type="button"
                    variant="outlined"
                    severity="danger"
                    label="Cancel Image"
                    class="w-full"
                    @click="cancelImage"
                    :disabled="loading || loadingTech"
                  />
                </template>
              </div>
            </div>
          </div>
          <Message
            v-if="imageError"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ imageError }}
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
                  :disabled="loading || loadingTech"
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

            <div class="col-span-3">
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

            <div class="col-span-3">
              <div class="flex flex-col gap-1 text-left">
                <label for="is_highlight" class="mb-1">Highlight</label>
                <Select
                  v-model="forms.is_highlight"
                  :options="is_highlight_options"
                  optionLabel="label"
                  option-value="value"
                  placeholder="Select"
                  class="w-full"
                />
              </div>
            </div>

            <div class="col-span-6">
              <div class="flex flex-col gap-1 text-left">
                <label for="slug" class="mb-1">Slug</label>
                <InputText
                  v-model="forms.slug"
                  id="slug"
                  type="text"
                  placeholder="e.g. slug"
                  fluid
                  variant="outlined"
                  :disabled="loading || loadingTech"
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
                <label for="technology" class="mb-1">Technology</label>
                <MultiSelect
                  v-model="forms.technology_ids"
                  :options="technologies_options"
                  optionLabel="name"
                  optionValue="id"
                  filter
                  placeholder="Select Technology"
                  :maxSelectedLabels="5"
                  class="w-full"
                  :disabled="loading || loadingTech"
                >
                  <template #option="slotProps">
                    <div class="flex items-center">
                      <img
                        :alt="slotProps.option.name"
                        :src="useTechIcon(slotProps.option.slug)"
                        class="mr-2 w-[22px]"
                      />
                      <div>{{ slotProps.option.name }}</div>
                    </div>
                  </template>
                </MultiSelect>

                <div
                  v-if="
                    formErrors.technology_ids &&
                    formErrors.technology_ids.length > 0
                  "
                >
                  <Message
                    v-for="(message, index) in formErrors.technology_ids"
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
                <label for="repository_url" class="mb-1">Repository</label>
                <InputText
                  v-model="forms.repository_url"
                  id="repository_url"
                  type="text"
                  placeholder="e.g. repository_url"
                  fluid
                  variant="outlined"
                  :disabled="loading || loadingTech"
                />
              </div>
            </div>

            <div class="col-span-6">
              <div class="flex flex-col gap-1 text-left">
                <label for="website_url" class="mb-1">Website URL</label>
                <InputText
                  v-model="forms.website_url"
                  id="website_url"
                  type="text"
                  placeholder="e.g. website_url"
                  fluid
                  variant="outlined"
                  :disabled="loading || loadingTech"
                />
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
                  :disabled="!loadingTech"
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
                  :disabled="!loadingTech"
                  uploadUrlAPI="project-content-images/store"
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
            severity="secondary"
            label="Cancel"
            class="w-full"
            @click="$router.push('/adminz/project')"
            :disabled="loading || loadingTech"
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
            :disabled="loading || loadingTech"
          />
        </div>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { z } from "zod";
import { IconArrowLeft } from "@tabler/icons-vue";
import type { TPublicTechnology } from "~/types/technology.type";

useHead({
  title: "Admin - Edit Project",
  titleTemplate: "%s | Portofolio",
});

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const route = useRoute();

const refImage = ref("");
const imageNew = ref({
  file: null,
  blob_url: "",
  is_changed: false,
});
const forms = ref<any>({
  title: "",
  slug: "",
  description: "",
  summary: "",
  repository_url: "",
  website_url: "",
  is_published: "N",
  technology_ids: [],
  image_url: "",
  is_highlight: "N",
});
const is_published_options = ref([
  { label: "Published", value: "Y" },
  { label: "Unpublished", value: "N" },
]);
const is_highlight_options = ref([
  { label: "Highlight", value: "Y" },
  { label: "Not Highlight", value: "N" },
]);

const descriptionHtmlError = ref<string>("");
const summaryHtmlError = ref<string>("");
const formSchema = z.object({
  title: z.string().nonempty("Title is required."),
  slug: z.string().nonempty("Slug is required."),
  technology_ids: z.array(z.number()).min(1, "Technology is required."),
});

const handleImageChange = (event: any) => {
  const file = event.target.files[0];
  if (file) {
    imageNew.value.blob_url = URL.createObjectURL(file);
    imageNew.value.file = file;
    imageNew.value.is_changed = true;
  }
};

const triggerImageChange = () => {
  const fileInput = refImage.value as unknown as HTMLInputElement;
  fileInput.click();
};

const cancelImage = () => {
  imageNew.value.file = null;
  imageNew.value.blob_url = "";
  imageNew.value.is_changed = false;
};

const { formErrors, validateForm } = useValidateForm();
const imageError = ref("");

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

watch(
  () => [forms.value.description, forms.value.summary],
  () => {
    validateDescriptionHtml();
    validateSummaryHtml();
  }
);

watch(
  () => [forms.value.title, forms.value.slug, forms.value.technology_ids],
  () => {
    validateForm(formSchema, forms.value);
  }
);

// API
const { updateProject, fetchProject, loading, projectData } = useProjectAPI();
const {
  fetchPublicTechnologies,
  loading: loadingTech,
  technologyPublicListData,
} = useTechnologyAPI();

const technologies_options = ref<TPublicTechnology[]>([]);

const { slugToString } = useSlugify();

watch(
  () => technologyPublicListData.value,
  (newValue) => {
    technologies_options.value = newValue || [];
  }
);

watch(projectData, (newData) => {
  if (newData) {
    forms.value = {
      title: newData.title,
      slug: slugToString(newData.slug),
      description: newData.description,
      summary: newData.summary,
      repository_url: newData.repository_url,
      website_url: newData.website_url,
      is_published: newData.status == "Published" ? "Y" : "N",
      technology_ids: newData.technologies.map((tech) => tech.tech_id),
      image_url: newData.image_url,
      is_highlight: newData.is_highlight ? "Y" : "N",
    };
  } else {
    forms.value = {
      title: "",
      slug: "",
      description: "",
      summary: "",
      repository_url: "",
      website_url: "",
      is_published: "N",
      technology_ids: [],
      image_url: "",
      is_highlight: "N",
    };
  }
});

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

  if (!descriptionHtmlError.value && !summaryHtmlError.value && isValid) {
    const contentImageUrls = getImageUrlsFromHTML(forms.value.description);
    const id = route.params.id as string;

    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", forms.value.title);
    formData.append("slug", forms.value.slug);
    formData.append("description", forms.value.description);
    formData.append("summary", forms.value.summary);
    if (forms.value.repository_url) {
      formData.append("repository_url", forms.value.repository_url);
    }
    if (forms.value.website_url) {
      formData.append("website_url", forms.value.website_url);
    }
    formData.append("is_published", forms.value.is_published);

    const isHighlight = forms.value.is_highlight;
    formData.append("is_highlight", isHighlight);

    const formattedTechIds = forms.value.technology_ids.map((id: number) => ({ tech_id: id }));
    const techIdsStringify = JSON.stringify(formattedTechIds);
    formData.append("technology_ids", techIdsStringify);

    const contentImageUrlsStringify = JSON.stringify(contentImageUrls);
    formData.append("project_images", contentImageUrlsStringify);

    const imageNewFile = imageNew.value.file as unknown as File;
    if (imageNew.value.is_changed && imageNewFile) {
      formData.append("image_file", imageNewFile);
    }

    await updateProject(formData);
  }
};

onMounted(async () => {
  await fetchPublicTechnologies();
  await fetchProject();
});
</script>
<style lang=""></style>
