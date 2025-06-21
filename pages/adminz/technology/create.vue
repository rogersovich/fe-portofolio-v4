<template>
  <div>
    <div class="mb-6">
      <div class="flex justify-between">
        <div>
          <div class="text-3xl font-rethink font-bold">
            Create - Page Technology
          </div>
          <div class="text-muted-foreground font-light mt-2">
            Create reliable Technology in here
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
      <form @submit.prevent="onFormSubmit" class="grid grid-cols-12 gap-6">
        <div class="col-span-12">
          <div class="text-2xl font-rethink font-bold">Form Create</div>
          <hr class="seperator-line mt-3" />
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

            <div class="flex flex-col items-center justify-center gap-3 mb-3">
              <template v-if="forms?.logo_file?.file">
                <NuxtImg
                  :src="forms?.logo_file.blob_url"
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
                  label="Select Logo"
                  class="w-full"
                  @click="triggerLogoChange"
                  :disabled="loadingStore"
                />
                <template v-if="forms?.logo_file?.file">
                  <Button
                    type="button"
                    variant="outlined"
                    severity="danger"
                    label="Cancel Logo"
                    class="w-full"
                    @click="cancelLogo"
                    :disabled="loadingStore"
                  />
                </template>
              </div>
            </div>
          </div>
          <Message
            v-if="logoError"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ logoError }}
          </Message>
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
                  :disabled="loadingStore"
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
            severity="secondary"
            label="Cancel"
            class="w-full"
            @click="$router.push('/adminz/technology')"
            :disabled="loadingStore"
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
            :disabled="loadingStore"
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
  title: "Admin - Create Technology",
  titleTemplate: "%s | Portofolio",
});

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const refLogo = ref("");
const forms = ref({
  name: "",
  description_html: "",
  is_major: "N",
  logo_file: {
    file: null,
    blob_url: "",
  },
});
const is_major_options = ref([
  { label: "Yes", value: "Y" },
  { label: "No", value: "N" },
]);

const descriptionHtmlError = ref<string>("");
const formSchema = z.object({
  name: z.string().nonempty("Name is required."),
});

const handleLogoChange = (event: any) => {
  const file = event.target.files[0];
  if (file) {
    forms.value.logo_file.blob_url = URL.createObjectURL(file);
    forms.value.logo_file.file = file;
  }
};

const triggerLogoChange = () => {
  const fileInput = refLogo.value as unknown as HTMLInputElement;
  fileInput.click();
};

const cancelLogo = () => {
  forms.value.logo_file.file = null;
  forms.value.logo_file.blob_url = "";
};

const { formErrors, validateForm } = useValidateForm();
const logoError = ref("");

const validateDescriptionHtml = () => {
  const val = forms.value.description_html.trim();
  if (val == "" || val == "<p></p>") {
    descriptionHtmlError.value = "Description HTML is required.";
  } else {
    descriptionHtmlError.value = "";
  }
};

const validateLogo = () => {
  logoError.value = "";
  if (!forms.value.logo_file.file) {
    logoError.value = "Logo is required.";
    return false;
  }

  return true;
};

watch(
  () => [forms.value.description_html],
  () => {
    validateDescriptionHtml();
  }
);
watch(
  () => [forms.value.logo_file.file],
  () => {
    validateLogo();
  }
);

watch(
  () => [forms.value.name],
  () => {
    validateForm(formSchema, forms.value);
  }
);

// Update author data
const { storeTechnology, loading: loadingStore } = useTechnologyAPI();

const onFormSubmit = async () => {
  validateDescriptionHtml();

  const isValid = validateForm(formSchema, forms.value);
  const isValidLogo = validateLogo();

  if (!descriptionHtmlError.value && isValid && isValidLogo) {
    const formData = new FormData();
    formData.append("name", forms.value.name);
    formData.append("is_major", forms.value.is_major);
    formData.append("description_html", forms.value.description_html);
    const avatarNewFile = forms.value.logo_file.file as unknown as File;
    formData.append("logo_file", avatarNewFile);

    await storeTechnology(formData);
  }
};
</script>
<style lang=""></style>
