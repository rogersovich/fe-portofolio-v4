<template>
  <div>
    <div class="mb-6">
      <div class="flex justify-between">
        <div>
          <div class="text-3xl font-rethink font-bold">
            Create - Page Project
          </div>
          <div class="text-muted-foreground font-light mt-2">
            Create reliable Project in here
          </div>
        </div>
        <div>
          <Button
            variant="text"
            @click="$router.push('/adminz/project')"
          >
            <IconArrowLeft class="size-5" />
            <span> Back </span>
          </Button>
        </div>
      </div>
    </div>
    <div class="pt-3">
      <form @submit.prevent="onFormSubmit" class="grid grid-cols-12 gap-6">
        <div class="col-span-12">
          <div class="text-2xl font-rethink font-bold">Form Create</div>
          <hr class="border-zinc-50/[.15] mt-3" />
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
              <template v-if="forms?.image_file?.file">
                <NuxtImg
                  :src="forms?.image_file.blob_url"
                  height="100"
                  width="100"
                  class="rounded-lg"
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
                  @click="triggerImageChange"
                  :disabled="loading"
                />
                <template v-if="forms?.image_file?.file">
                  <Button
                    type="button"
                    variant="outlined"
                    severity="danger"
                    label="Cancel Image"
                    class="w-full"
                    @click="cancelImage"
                    :disabled="loading"
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
        <div class="col-span-9 2xl:col-span-6">
          <div class="grid grid-cols-12 gap-6">
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
                <label for="title" class="mb-1">Title</label>
                <InputText
                  v-model="forms.title"
                  id="title"
                  type="text"
                  placeholder="e.g. title"
                  fluid
                  variant="outlined"
                  :disabled="loading"
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

            <div
              class="col-start-1 col-span-12 2xl:col-start-1 2xl:col-span-12"
            >
              <div class="flex flex-col gap-1 text-left">
                <label class="mb-1">Summary HTML</label>
                <BaseCustomEditor
                  v-model="forms.summary"
                  :errMessage="summaryHtmlError"
                  :disabled="true"
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
                  :disabled="true"
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
          class="col-start-9 col-end-11 2xl:col-start-8 2xl:col-end-9 w-full"
        >
          <Button
            type="button"
            variant="outlined"
            label="Cancel"
            class="w-full"
            @click="$router.push('/adminz/project')"
            :disabled="loading"
          />
        </div>
        <div
          class="col-start-11 col-end-13 2xl:col-start-9 2xl:col-end-10 w-full"
        >
          <Button
            type="submit"
            severity="contrast"
            label="Submit"
            class="w-full"
            :disabled="loading"
          />
        </div>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { z } from "zod";
import { IconArrowLeft, IconPhoto } from "@tabler/icons-vue";

useHead({
  title: "Admin - Create Project",
  titleTemplate: "%s | Portofolio",
});

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const refImage = ref("");
const forms = ref({
  title: "",
  description: "",
  summary: "",
  repository_url: "",
  is_published: "N",
  image_file: {
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
  repository_url: z.string().nonempty("Repository URL is required."),
});

const handleImageChange = (event: any) => {
  const file = event.target.files[0];
  if (file) {
    forms.value.image_file.blob_url = URL.createObjectURL(file);
    forms.value.image_file.file = file;
  }
};

const triggerImageChange = () => {
  const fileInput = refImage.value as unknown as HTMLInputElement;
  fileInput.click();
};

const cancelImage = () => {
  forms.value.image_file.file = null;
  forms.value.image_file.blob_url = "";
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

const validateImage = () => {
  imageError.value = "";
  if (!forms.value.image_file.file) {
    imageError.value = "Logo is required.";
    return false;
  }

  return true;
};

watch(
  () => [forms.value.description],
  () => {
    validateDescriptionHtml();
  }
);
watch(
  () => [forms.value.image_file.file],
  () => {
    validateImage();
  }
);

watch(
  () => [forms.value.title, forms.value.repository_url],
  () => {
    validateForm(formSchema, forms.value);
  }
);

// Update author data
const { storeProject, loading } = useProjectAPI();

const onFormSubmit = async () => {
  validateDescriptionHtml();

  const isValid = validateForm(formSchema, forms.value);
  const isValidLogo = validateImage();

  if (!descriptionHtmlError.value && isValid && isValidLogo) {
    const formData = new FormData();
    formData.append("title", forms.value.title);
    formData.append("is_published", forms.value.is_published);
    formData.append("description", forms.value.description);
    const avatarNewFile = forms.value.image_file.file as unknown as File;
    formData.append("image_file", avatarNewFile);

    await storeProject(formData);
  }
};
</script>
<style lang=""></style>
