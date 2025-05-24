<template>
  <div>
    <div class="mb-6">
      <div class="flex justify-between">
        <div>
          <div class="text-3xl font-rethink font-bold">Create - Page Topic</div>
          <div class="text-muted-foreground font-light mt-2">
            Create reliable Topic in here
          </div>
        </div>
        <div>
          <Button variant="text" @click="$router.push('/adminz/topic')">
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
        <div class="col-span-6">
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
        <div class="col-start-3 col-end-5 2xl:col-start-5 2xl:col-end-6 w-full">
          <Button
            type="button"
            severity="secondary"
            label="Cancel"
            class="w-full"
            @click="$router.push('/adminz/topic')"
            :disabled="loadingStore"
          />
        </div>
        <div class="col-start-5 col-end-7 2xl:col-start-6 2xl:col-end-7 w-full">
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
import { IconArrowLeft } from "@tabler/icons-vue";

useHead({
  title: "Admin - Create Topic",
  titleTemplate: "%s | Portofolio",
});

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const forms = ref({
  name: "",
});

const formSchema = z.object({
  name: z.string().nonempty("Name is required."),
});

const { formErrors, validateForm } = useValidateForm();

watch(
  () => [forms.value.name],
  () => {
    validateForm(formSchema, forms.value);
  }
);

// Update author data
const { storeTopic, loading: loadingStore } = useTopicAPI();

const onFormSubmit = async () => {
  const isValid = validateForm(formSchema, forms.value);

  if (isValid) {
    const formData = {
      name: forms.value.name,
    };

    await storeTopic(formData);
  }
};
</script>
<style lang=""></style>
