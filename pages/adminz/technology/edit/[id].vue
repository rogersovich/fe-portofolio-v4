<template>
  <div>
    <div class="mb-6">
      <div class="flex justify-between">
        <div>
          <div class="text-3xl font-rethink font-bold">
            Edit - Page Technology
          </div>
          <div class="text-muted-foreground font-light mt-2">
            Edit reliable Technology in here
          </div>
        </div>
        <div>
          <Button variant="text" @click="$router.push('/adminz/technology')">
            <IconArrowLeft class="size-5" />
            <span> Back </span>
          </Button>
        </div>
      </div>
    </div>
    <div class="pt-3">
      <form
        @submit.prevent="onFormSubmit"
        class="grid grid-cols-12 gap-6"
        :disabled="loading"
      >
        <div class="col-span-12">
          <div class="text-2xl font-rethink font-bold">Form Edit</div>
          <hr class="border-zinc-50/[.15] mt-3" />
        </div>
        <div class="col-span-3">
          <div class="flex flex-col gap-1 text-left">
            <label class="mb-1">Logo Upload</label>
            <!-- Hidden file input -->
            <input
              ref="refLogo"
              type="file"
              style="display: none"
              @change="handleLogoChange"
            />

            <div class="flex flex-col items-start justify-center gap-3 mb-3">
              <template v-if="!logoNew.is_changed">
                <NuxtImg
                  :src="forms?.logo_url"
                  class="rounded-lg w-full"
                ></NuxtImg>
              </template>
              <template v-else>
                <NuxtImg
                  :src="logoNew.blob_url"
                  class="rounded-lg w-full"
                ></NuxtImg>
              </template>
              <div class="w-full flex flex-col items-center gap-3">
                <Button
                  type="button"
                  variant="outlined"
                  label="Change Image"
                  class="w-full"
                  @click="triggerLogoChange"
                  :disabled="loading"
                />
                <template v-if="logoNew.is_changed">
                  <Button
                    type="button"
                    variant="outlined"
                    severity="danger"
                    label="Cancel Image"
                    class="w-full"
                    @click="cancelLogo"
                    :disabled="loading"
                  />
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-9 2xl:col-span-6">
          <div class="grid grid-cols-12 gap-6">
            <div class="col-start-1 col-span-3">
              <div class="flex flex-col gap-1 text-left">
                <label for="is_major" class="mb-1">Is Major</label>
                <Select
                  v-model="forms.is_major"
                  :options="is_major_options"
                  optionLabel="label"
                  option-value="value"
                  placeholder="Select"
                  class="w-full"
                  :disabled="loading"
                />
              </div>
            </div>

            <div class="col-span-9">
              <div class="flex flex-col gap-1 text-left">
                <label for="name" class="mb-1">Name</label>
                <InputText
                  v-model="forms.name"
                  id="name"
                  type="text"
                  placeholder="e.g. name"
                  fluid
                  variant="outlined"
                  :disabled="loading"
                />
                <div v-if="formErrors.name && formErrors.name.length > 0">
                  <Message
                    v-for="(message, index) in formErrors.name"
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
                <label class="mb-1">Description HTML</label>
                <BaseCustomEditor
                  v-model="forms.description_html"
                  :errMessage="descriptionHtmlError"
                  :disabled="!loading"
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
        <div class="col-start-6 col-end-8 2xl:col-start-8 2xl:col-end-9 w-full">
          <Button
            type="button"
            variant="outlined"
            label="Cancel"
            class="w-full"
            @click="$router.push('/adminz/technology')"
            :disabled="loading"
          />
        </div>
        <div
          class="col-start-8 col-end-10 2xl:col-start-9 2xl:col-end-10 w-full"
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
import { IconArrowLeft } from "@tabler/icons-vue";

useHead({
  title: "Admin - Edit Technology",
  titleTemplate: "%s | Portofolio",
});

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const route = useRoute();
const MINIO_BASE_URL = useMinioUrl()

const refLogo = ref("");
const logoNew = ref({
  file: null,
  blob_url: "",
  is_changed: false,
});
const forms = ref({
  name: "",
  description_html: "",
  is_major: "N",
  logo_url: "",
});
const is_major_options = ref([
  { label: "Yes", value: "Y" },
  { label: "No", value: "N" },
]);

const descriptionHtmlError = ref<string>("");
const formSchema = z.object({
  name: z.string().nonempty("Name is required."),
});

// API
const { loading, technologyData, fetchTechnology, updateTechnology } =
  useTechnologyAPI();

const handleLogoChange = (event: any) => {
  const file = event.target.files[0];
  if (file) {
    logoNew.value.blob_url = URL.createObjectURL(file);
    logoNew.value.file = file;
    logoNew.value.is_changed = true;
  }
};

const triggerLogoChange = () => {
  const fileInput = refLogo.value as unknown as HTMLInputElement;
  fileInput.click();
};

const cancelLogo = () => {
  logoNew.value.file = null;
  logoNew.value.blob_url = "";
  logoNew.value.is_changed = false;
};

const { formErrors, validateForm } = useValidateForm();
const validateDescriptionHtml = () => {
  const val = forms.value.description_html.trim();
  if (val == "" || val == "<p></p>") {
    descriptionHtmlError.value = "Description HTML is required.";
  } else {
    descriptionHtmlError.value = "";
  }
};

watch(
  () => [forms.value.description_html],
  () => {
    validateDescriptionHtml();
  }
);
watch(
  () => [forms.value.name],
  () => {
    validateForm(formSchema, forms.value);
  }
);

watch(technologyData, (newData) => {
  if (newData) {
    forms.value = { ...newData, logo_url: MINIO_BASE_URL + newData.logo_file_name };
  } else {
    forms.value = {
      name: "",
      logo_url: "",
      is_major: "N",
      description_html: "",
    };
  }
});

const onFormSubmit = async () => {
  validateDescriptionHtml();
  const isValid = validateForm(formSchema, forms.value);
  if (!descriptionHtmlError.value && isValid) {
    const id = route.params.id as string;

    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", forms.value.name);
    formData.append("is_major", forms.value.is_major);
    formData.append("description_html", forms.value.description_html);
    const logoNewFile = logoNew.value.file as unknown as File;
    if (logoNew.value.is_changed && logoNewFile) {
      formData.append("logo_file", logoNewFile);
    }

    await updateTechnology(formData);
  }
};

onMounted(async () => {
  await fetchTechnology();
});
</script>
<style lang=""></style>
