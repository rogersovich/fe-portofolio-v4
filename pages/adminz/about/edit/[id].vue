<template>
  <div>
    <div class="mb-6">
      <div class="flex justify-between">
        <div>
          <div class="text-3xl font-rethink font-bold">Edit - Page About</div>
          <div class="text-muted-foreground font-light mt-2">
            Edit summary about your personality
          </div>
        </div>
        <div>
          <Button variant="text" @click="$router.push('/adminz/about')">
            <IconArrowLeft class="size-5" />
            <span> Back </span>
          </Button>
        </div>
      </div>
    </div>
    <div class="pt-3">
      <div>
        <form @submit.prevent="onFormSubmit" class="grid grid-cols-12 gap-6">
          <div class="col-span-12">
            <div class="text-2xl font-rethink font-bold">Form Edit</div>
            <hr class="border-zinc-50/[.15] mt-3" />
          </div>
          <div class="col-span-3">
            <div class="flex flex-col gap-1 text-left">
              <label class="mb-1">Avatar</label>
              <!-- Hidden file input -->
              <input
                ref="refAvatarNew"
                type="file"
                style="display: none"
                @change="handleAvatarChange"
              />

              <template v-if="!loading">
                <div
                  class="flex flex-col items-start justify-center gap-3 mb-3"
                >
                  <template v-if="!avatarNew.is_changed">
                    <NuxtImg
                      :src="forms?.avatar_old"
                      width="w-full"
                      class="rounded-lg"
                    ></NuxtImg>
                  </template>
                  <template v-else>
                    <NuxtImg
                      :src="avatarNew.blob_url"
                      width="w-full"
                      class="rounded-lg"
                    ></NuxtImg>
                  </template>
                  <div class="w-full flex flex-col items-center gap-3">
                    <Button
                      type="button"
                      variant="outlined"
                      label="Change Avatar"
                      size="small"
                      class="w-full"
                      @click="triggerAvatarChange"
                      :disabled="loading"
                    />
                    <template v-if="avatarNew.is_changed">
                      <Button
                        type="button"
                        variant="outlined"
                        severity="danger"
                        label="Cancel Avatar"
                        size="small"
                        class="w-full"
                        @click="cancelEditAvatar"
                        :disabled="loading"
                      />
                    </template>
                  </div>
                </div>
              </template>
              <template v-else>
                <div>
                  <Skeleton width="100%" height="250px" class="mb-3"></Skeleton>
                  <Skeleton width="100%" height="36px" class="mb-3"></Skeleton>
                </div>
              </template>
            </div>
          </div>
          <div class="col-span-8">
            <div class="grid grid-cols-12 gap-6">
              <div class="col-span-7">
                <div class="flex flex-col gap-1 text-left">
                  <label for="title" class="mb-1">Title</label>
                  <InputText
                    v-model="forms.title"
                    name="title"
                    type="text"
                    placeholder="e.g. Title"
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
              <div class="col-start-1 col-span-5">
                <div class="col-span-5">
                  <div class="flex flex-col gap-1 text-left">
                    <label class="mb-1">Usage status</label>
                    <Select
                      v-model="forms.is_used"
                      name="is_used"
                      :options="isUsedOptions"
                      optionLabel="label"
                      optionValue="value"
                      placeholder="Select"
                      fluid
                      variant="outlined"
                      :disabled="loading"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-start-1 2xl:col-end-9 col-end-13">
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
          <div
            class="col-start-9 col-end-11 2xl:col-start-7 2xl:col-end-8 w-full"
          >
            <Button
              type="button"
              variant="outlined"
              label="Cancel"
              size="small"
              class="w-full"
              @click="$router.push('/adminz/about')"
              :disabled="loading"
            />
          </div>
          <div
            class="col-start-11 col-end-13 2xl:col-start-8 2xl:col-end-9 w-full"
          >
            <Button
              type="submit"
              severity="contrast"
              label="Submit"
              size="small"
              class="w-full"
              :disabled="loading"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { z } from "zod";
import { IconArrowLeft } from "@tabler/icons-vue";
import type { TBaseResponse } from "~/types/base.type";
import type { TAbout } from "~/types/about.type";
import { type AxiosResponse } from "axios";

useHead({
  title: "Admin - Edit About",
  titleTemplate: "%s | Portofolio",
});

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const isUsedOptions = [
  {
    label: "Yes",
    value: true,
  },
  {
    label: "No",
    value: false,
  },
];

const { $axios } = useNuxtApp();
const route = useRoute();
const alertStore = useAlertStore();

const loading = ref(false);
const forms = ref({
  title: "",
  is_used: true,
  description_html: "",
  avatar_old: "",
});
const refAvatarNew = ref("");
const avatarNew = reactive<{
  file: File | null;
  blob_url: string;
  is_changed: boolean;
}>({
  file: null,
  blob_url: "",
  is_changed: false,
});

const formSchema = z.object({
  title: z.string().nonempty("Title is required."),
});

const descriptionHtmlError = ref<string>("");

const fetchAbout = async () => {
  try {
    const { data }: AxiosResponse<TBaseResponse<TAbout>> = await $axios.get(
      `/abouts/${route.params.id}`
    );

    const res = data.data;

    fillForm(res);
  } catch (error) {
    loading.value = false;
  }
};

const fillForm = (data: TAbout) => {
  forms.value = {
    title: data.title,
    is_used: data.is_used == "Y" ? true : false,
    description_html: data.description_html,
    avatar_old: data.avatar_url,
  };
};

const handleAvatarChange = (event: any) => {
  const file = event.target.files[0];
  if (file) {
    avatarNew.blob_url = URL.createObjectURL(file);
    avatarNew.file = file;
    avatarNew.is_changed = true;
  }
};

const triggerAvatarChange = () => {
  const fileInput = refAvatarNew.value as unknown as HTMLInputElement;
  fileInput.click();
};

const cancelEditAvatar = () => {
  avatarNew.file = null;
  avatarNew.blob_url = "";
  avatarNew.is_changed = false;
};

const { formErrors,  validateForm } = useValidateForm();

const validateDescriptionHtml = () => {
  const val = forms.value.description_html.trim();
  if (val == "" || val == "<p></p>") {
    descriptionHtmlError.value = "Description HTML is required.";
  } else {
    descriptionHtmlError.value = "";
  }
};


const onFormSubmit = async () => {
  validateDescriptionHtml();

  const isValid = validateForm(formSchema, forms.value);

  if (!descriptionHtmlError.value && isValid) {
    loading.value = true;

    const id = route.params.id;

    const formData = new FormData();
    formData.append("id", id.toString());
    formData.append("title", forms.value.title);
    formData.append("description_html", forms.value.description_html);
    formData.append("is_used", forms.value.is_used ? "Y" : "N");

    if (avatarNew.is_changed && avatarNew.file instanceof File) {
      const avatarNewFile = avatarNew.file as File;
      formData.append("avatar_file", avatarNewFile);
    }

    await handleUpdateAbout(formData);

    loading.value = false;
  }
};

const handleUpdateAbout = async (payload: any) => {
  try {
    const { data }: AxiosResponse<TBaseResponse<any>> = await $axios.post(
      "/abouts/update",
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const message = toCapitalize(data.message);

    alertStore.setAlert({
      severity: "info",
      summary: message,
      show_alert: true,
    });

    navigateTo("/adminz/about");
  } catch (error: any) {
    loading.value = false;
    alertStore.setAlert({
      severity: "error",
      summary: error.message,
      show_alert: true,
    });
  }
};

watch(
  () => [forms.value.description_html],
  () => {
    validateDescriptionHtml();
  }
);
watch(
  () => [forms.value.title, forms.value.is_used],
  () => {
    validateForm(formSchema, forms.value);
  }
);

onMounted(async () => {
  loading.value = true;
  await fetchAbout();
  loading.value = false;
});
</script>
<style lang=""></style>
