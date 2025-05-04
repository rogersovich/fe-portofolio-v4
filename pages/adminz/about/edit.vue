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
      <Toast position="top-center" />
      <div>
        <Form
          v-slot="$form"
          :initialValues
          :resolver="formResolver"
          @submit="onFormSubmit"
          class="grid grid-cols-12 gap-6"
        >
          <div class="col-span-12">
            <div class="text-2xl font-rethink font-bold">Form Edit</div>
            <hr class="border-zinc-50/[.15] mt-3" />
          </div>
          <div class="col-start-1 col-span-4">
            <div class="flex flex-col gap-1 text-left">
              <label for="title" class="mb-1">Title</label>
              <InputText
                name="title"
                type="text"
                placeholder="e.g. Title"
                fluid
                variant="outlined"
              />
              <Message
                v-if="$form.title?.invalid"
                severity="error"
                size="small"
                variant="simple"
                >{{ $form.title.error?.message }}</Message
              >
            </div>
          </div>
          <div class="col-start-5 col-span-3">
            <div class="flex flex-col gap-1 text-left">
              <label class="mb-1">Usage status</label>
              <Select
                name="is_used"
                :options="isUsedOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="Select"
                fluid
                variant="outlined"
              />
            </div>
          </div>
          <div class="col-start-1 2xl:col-end-9 col-end-13">
            <div class="flex flex-col gap-1 text-left">
              <label class="mb-1">Description HTML</label>
              <BaseCustomEditor v-model="initialValues.description_html" :errMessage="descriptionHtmlError" />
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
          <div class="col-start-1 2xl:col-end-9 col-end-13">
            <div class="flex flex-col gap-1 text-left">
              <label class="mb-1">Image</label>
            </div>
          </div>
          <div class="col-start-9 col-end-11 2xl:col-start-7 2xl:col-end-8 w-full">
            <Button
              type="button"
              variant="outlined"
              label="Cancel"
              size="small"
              class="w-full"
              @click="$router.push('/adminz/about')"
            />
          </div>
          <div class="col-start-11 col-end-13 2xl:col-start-8 2xl:col-end-9 w-full">
            <Button
              type="submit"
              severity="contrast"
              label="Submit"
              size="small"
              class="w-full"
            />
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { z } from "zod";
import { IconArrowLeft } from "@tabler/icons-vue";
import type { FormSubmitEvent } from "@primevue/forms/form";
import { zodResolver } from "@primevue/forms/resolvers/zod";

useHead({
  title: "Admin - Edit About",
  titleTemplate: "%s | Portofolio",
});

definePageMeta({
  layout: "admin",
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

const toast = useToast();
const initialValues = reactive({
  title: "",
  is_used: true,
  description_html: "",
});

const formSchema = z.object({
  title: z.string().nonempty("Title is required."),
});

const formResolver = zodResolver(formSchema);

const descriptionHtmlError = ref<string>('');

const validateDescriptionHtml = () => {
  const val = initialValues.description_html.trim();
  if (val == "" || val == "<p></p>") {
    descriptionHtmlError.value = "Description HTML is required.";
  } else {
    descriptionHtmlError.value = '';
  }
};

watch(
  () => initialValues.description_html,
  () => {
    validateDescriptionHtml();
  }
);

const onFormSubmit = async ({ valid }: FormSubmitEvent) => {
  validateDescriptionHtml();
  if (valid && !descriptionHtmlError.value) {
    toast.add({
      severity: "info",
      summary: "Success to created data",
      life: 3000,
    });
  }
};
</script>
<style lang=""></style>
