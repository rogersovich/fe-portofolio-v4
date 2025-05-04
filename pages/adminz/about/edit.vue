<template>
  <div>
    <div class="mb-6">
      <div class="text-3xl font-rethink font-bold">Edit - Page About</div>
      <div class="text-muted-foreground font-light mt-2">
        Edit summary about your personality
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
          <div class="col-span-4">
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
          <div class="col-start-1 col-end-4 w-full">
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
import type { FormResolverOptions } from "@primevue/forms/form";

useHead({
  title: "Admin - Edit About",
  titleTemplate: "%s | Portofolio",
});

definePageMeta({
  layout: "admin",
});

interface FormValues {
  title: string;
  description_html: string;
}

const toast = useToast();
const initialValues = reactive({
  title: "",
  description_html: "",
});

const formResolver = ({ values }: FormResolverOptions) => {
  const errors: any = {};

  if (!values.title) {
    errors.title = [{ message: "Title is required." }];
  }

  if (!values.description_html) {
    errors.description_html = [{ message: "Description HTML is required." }];
  }

  return {
    values, // (Optional) Used to pass current form values to submit event.
    errors,
  };
};

const onFormSubmit = ({ valid }: { valid: boolean }) => {
  if (valid) {
    toast.add({
      severity: "info",
      summary: "Welcome to Dashboard Admin",
      life: 3000,
    });
  }
};
</script>
<style lang=""></style>
