<template>
  <div>
    <div class="mb-6">
      <div class="flex justify-between">
        <div>
          <div class="text-3xl font-rethink font-bold">
            Create - Page Author
          </div>
          <div class="text-muted-foreground font-light mt-2">
            Create reliable author in here
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
      <form @submit.prevent="onFormSubmit" class="grid grid-cols-12 gap-6">
        <div class="col-span-12">
          <div class="text-2xl font-rethink font-bold">Form Create</div>
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
              <template v-if="forms?.avatar_file?.file">
                <NuxtImg
                  :src="forms?.avatar_file.blob_url"
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
                  label="Select Avatar"
                  size="small"
                  class="w-full"
                  @click="triggerAvatarChange"
                  :disabled="loadingStore"
                />
                <template v-if="forms?.avatar_file?.file">
                  <Button
                    type="button"
                    variant="outlined"
                    severity="danger"
                    label="Cancel Avatar"
                    size="small"
                    class="w-full"
                    @click="cancelEditAvatar"
                    :disabled="loadingStore"
                  />
                </template>
              </div>
            </div>
          </div>
          <Message
            v-if="avatarError"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ avatarError }}
          </Message>
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
          class="col-start-9 col-end-11 2xl:col-start-7 2xl:col-end-8 w-full"
        >
          <Button
            type="button"
            variant="outlined"
            label="Cancel"
            size="small"
            class="w-full"
            @click="$router.push('/adminz/author')"
            :disabled="loadingStore"
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
  title: "Admin - Create Author",
  titleTemplate: "%s | Portofolio",
});

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const refAvatar = ref("");
const forms = ref({
  name: "",
  avatar_file: {
    file: null,
    blob_url: "",
  },
});

const formSchema = z.object({
  name: z.string().nonempty("Name is required."),
});

const handleAvatarChange = (event: any) => {
  const file = event.target.files[0];
  if (file) {
    forms.value.avatar_file.blob_url = URL.createObjectURL(file);
    forms.value.avatar_file.file = file;
  }
};

const triggerAvatarChange = () => {
  const fileInput = refAvatar.value as unknown as HTMLInputElement;
  fileInput.click();
};

const cancelEditAvatar = () => {
  forms.value.avatar_file.file = null;
  forms.value.avatar_file.blob_url = "";
};

const { formErrors, validateForm } = useValidateForm();
const avatarError = ref("");

const validateAvatar = () => {
  avatarError.value = "";
  if (!forms.value.avatar_file.file) {
    avatarError.value = "Avatar is required.";
    return false;
  }

  return true;
};

watch(
  () => [forms.value.avatar_file.file],
  () => {
    validateAvatar();
  }
);

watch(
  () => [forms.value.name],
  () => {
    validateForm(formSchema, forms.value)
  }
);

// Update author data
const { storeAuthor, loading: loadingStore } = useAuthorAPI();

const onFormSubmit = async () => {
  const isValid = validateForm(formSchema, forms.value);
  const isValidAvatar = validateAvatar();
  if (isValid && isValidAvatar) {
    const formData = new FormData();
    formData.append("name", forms.value.name);
    const avatarNewFile = forms.value.avatar_file.file as unknown as File;
    formData.append("avatar_file", avatarNewFile);

    await storeAuthor(formData);
  }
};
</script>
<style lang=""></style>
