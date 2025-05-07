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
                  <template v-if="!avatarOld.is_changed">
                    <NuxtImg
                      :src="forms?.avatar_old"
                      width="w-full"
                      class="rounded-lg"
                    ></NuxtImg>
                  </template>
                  <template v-else>
                    <NuxtImg
                      :src="avatarOld.blob_url"
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
                    <template v-if="avatarOld.is_changed">
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
import axios from "axios";

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

const route = useRoute();
const alertStore = useAlertStore();
const authStore = useAuthStore();

const loading = ref(false);
const forms = ref({
  title: "",
  is_used: true,
  description_html: "",
  avatar_old: "",
  avatar_new: "",
});
const refAvatarNew = ref("");
const avatarOld = reactive<{
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
    const { data, error } = await useAPI<TBaseResponse<TAbout>>(
      `/abouts/${route.params.id}`,
      {
        method: "GET",
        lazy: true,
        server: false,
      }
    );

    if (error.value) {
      const errMsg = toCapitalize(error.value.data.message);
      throw new Error(errMsg);
    }

    if (data.value) {
      const res = data.value.data;

      fillForm(res);
    }
  } catch (error) {
    loading.value = false;
    console.warn(error);
  }
};

const fillForm = (data: TAbout) => {
  forms.value = {
    title: data.title,
    is_used: data.is_used == "Y" ? true : false,
    description_html: data.description_html,
    avatar_old: data.avatar_url,
    avatar_new: "",
  };
};

const handleAvatarChange = (event: any) => {
  const file = event.target.files[0];
  if (file) {
    avatarOld.blob_url = URL.createObjectURL(file);
    avatarOld.file = file;
    avatarOld.is_changed = true;
  }
};

const triggerAvatarChange = () => {
  const fileInput = refAvatarNew.value as unknown as HTMLInputElement;
  fileInput.click();
};

const cancelEditAvatar = () => {
  avatarOld.file = null;
  avatarOld.blob_url = "";
  avatarOld.is_changed = false;
};

const formErrors = ref<any>({}); // Store all error messages

const validateDescriptionHtml = () => {
  const val = forms.value.description_html.trim();
  if (val == "" || val == "<p></p>") {
    descriptionHtmlError.value = "Description HTML is required.";
  } else {
    descriptionHtmlError.value = "";
  }
};

// Validate form data
const validateForm = () => {
  formErrors.value = [];
  const result = formSchema.safeParse(forms.value);
  if (!result.success) {
    result.error.errors.forEach((err) => {
      // Add each error to the formErrors object
      if (!formErrors.value[err.path[0]]) {
        formErrors.value[err.path[0]] = [];
      }
      formErrors.value[err.path[0]].push(err.message);
    });

    return false;
  }
  return true;
};

const onFormSubmit = async () => {
  validateDescriptionHtml();

  if (!validateForm()) return;

  if (!descriptionHtmlError.value) {
    loading.value = true;

    const id = route.params.id;

    const formData = new FormData();
    formData.append("id", id.toString());
    formData.append("title", forms.value.title);
    formData.append("description_html", forms.value.description_html);
    formData.append("is_used", forms.value.is_used ? "Y" : "N");

    if (avatarOld.is_changed && avatarOld.file instanceof File) {
      const avatarOldFile = avatarOld.file as File;
      formData.append("avatar_file", avatarOldFile);
    }

    await handleUpdateAbout(formData);

    loading.value = false;
  }
};

const handleUpdateAbout = async (payload: any) => {
  try {
    const data = await axios.post(
      "http://localhost:4000/api/abouts/update",
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authStore.getToken()}`,
        },
      }
    );

    console.log(data);

    // const { data, error } = await useAPI<TBaseResponse<any>>(`/abouts/update`, {
    //   method: "POST",
    //   body: payload,
    //   server: false,
    // });

    // if (error.value) {
    //   const errMsg = toCapitalize(error.value.data.message);
    //   throw new Error(errMsg);
    // }

    // if (data.value) {
    //   const message = toCapitalize(data.value.message);

    //   alertStore.setAlert({
    //     severity: "info",
    //     summary: message,
    //     show_alert: true,
    //   });

    //   navigateTo("/adminz/about");
    // }
  } catch (error: any) {
    loading.value = false;
    console.warn(error);
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
    validateForm();
  }
);

onMounted(async () => {
  loading.value = true;
  await fetchAbout();
  loading.value = false;
});
</script>
<style lang=""></style>
