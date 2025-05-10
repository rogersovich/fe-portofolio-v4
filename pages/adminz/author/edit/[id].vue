<template>
  <div>
    <div class="mb-6">
      <div class="flex justify-between">
        <div>
          <div class="text-3xl font-rethink font-bold">Edit - Page Author</div>
          <div class="text-muted-foreground font-light mt-2">
            Edit reliable author in here
          </div>
        </div>
        <div>
          <Button variant="text" @click="$router.push('/adminz/author')">
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
        :disabled="loading || loadingAuthor"
      >
        <div class="col-span-12">
          <div class="text-2xl font-rethink font-bold">Form Edit</div>
          <hr class="border-zinc-50/[.15] mt-3" />
        </div>
        <div class="col-span-3">
          <div class="flex flex-col gap-1 text-left">
            <label class="mb-1">Avatar Upload</label>
            <!-- Hidden file input -->
            <input
              ref="refAvatar"
              type="file"
              style="display: none"
              @change="handleAvatarChange"
            />

            <div class="flex flex-col items-start justify-center gap-3 mb-3">
              <template v-if="!avatarNew.is_changed">
                <NuxtImg
                  :src="forms?.avatar_url"
                  class="rounded-lg w-full"
                ></NuxtImg>
              </template>
              <template v-else>
                <NuxtImg
                  :src="avatarNew.blob_url"
                  class="rounded-lg w-full"
                ></NuxtImg>
              </template>
              <div class="w-full flex flex-col items-center gap-3">
                <Button
                  type="button"
                  variant="outlined"
                  label="Change Avatar"
                  class="w-full"
                  @click="triggerAvatarChange"
                  :disabled="loading || loadingAuthor"
                />
                <template v-if="avatarNew.is_changed">
                  <Button
                    type="button"
                    variant="outlined"
                    severity="danger"
                    label="Cancel Avatar"
                    class="w-full"
                    @click="cancelEditAvatar"
                    :disabled="loading || loadingAuthor"
                  />
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-6">
          <div class="flex flex-col gap-1 text-left">
            <label for="name" class="mb-1">Name</label>
            <InputText
              v-model="forms.name"
              name="name"
              type="text"
              placeholder="e.g. name"
              fluid
              variant="outlined"
              :disabled="loading || loadingAuthor"
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
          class="col-start-6 col-end-8 2xl:col-start-8 2xl:col-end-9 w-full"
        >
          <Button
            type="button"
            variant="outlined"
            label="Cancel"
            class="w-full"
            @click="$router.push('/adminz/author')"
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
  title: "Admin - Edit Author",
  titleTemplate: "%s | Portofolio",
});

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const route = useRoute();

const loading = ref(false);
const refAvatar = ref("");
const avatarNew = ref({
  file: null,
  blob_url: "",
  is_changed: false,
});
const forms = ref({
  name: "",
  avatar_url: "",
});

const formSchema = z.object({
  name: z.string().nonempty("Name is required."),
});

// Fetch author data
const { loading: loadingAuthor, authorData, fetchAuthor } = useAuthorAPI();

// Update author data
const { updateAuthor } = useAuthorAPI();

const handleAvatarChange = (event: any) => {
  const file = event.target.files[0];
  if (file) {
    avatarNew.value.blob_url = URL.createObjectURL(file);
    avatarNew.value.file = file;
    avatarNew.value.is_changed = true;
  }
};

const triggerAvatarChange = () => {
  const fileInput = refAvatar.value as unknown as HTMLInputElement;
  fileInput.click();
};

const cancelEditAvatar = () => {
  avatarNew.value.file = null;
  avatarNew.value.blob_url = "";
  avatarNew.value.is_changed = false;
};

const { formErrors, validateForm } = useValidateForm();

watch(
  () => [forms.value.name],
  () => {
    validateForm(formSchema, forms.value);
  }
);

watch(authorData, (newAuthor) => {
  if (newAuthor) {
    forms.value = { ...newAuthor };
  } else {
    forms.value = { name: "", avatar_url: "" };
  }
});

const onFormSubmit = async () => {
  const isValid = validateForm(formSchema, forms.value);
  if (isValid) {
    loading.value = true;

    const id = route.params.id as string;

    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", forms.value.name);

    const avatarNewFile = avatarNew.value.file as unknown as File;
    if (avatarNew.value.is_changed && avatarNewFile) {
      formData.append("avatar_file", avatarNewFile);
    }

    await updateAuthor(formData);
    loading.value = false;
  }
};

onMounted(async () => {
  await fetchAuthor();
});

onUnmounted(() => {});
</script>
<style lang=""></style>
