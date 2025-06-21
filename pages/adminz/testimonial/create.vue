<template>
  <div>
    <div class="mb-6">
      <div class="flex justify-between">
        <div>
          <div class="text-3xl font-rethink font-bold">
            Create - Page Testimonial
          </div>
          <div class="text-muted-foreground font-light mt-2">
            Create reliable Testimonial in here
          </div>
        </div>
        <div>
          <Button variant="text" @click="$router.push('/adminz/testimonial')">
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
        <div class="col-span-4">
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
        <div class="col-span-4">
          <div class="flex flex-col gap-1 text-left">
            <label for="role" class="mb-1">Role</label>
            <InputText
              v-model="forms.role"
              id="role"
              type="text"
              placeholder="e.g. role"
              fluid
              variant="outlined"
              :disabled="loading"
            />
            <div v-if="formErrors.role && formErrors.role.length > 0">
              <Message
                v-for="(message, index) in formErrors.role"
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
        <div class="col-start-1 col-span-4">
          <div class="flex flex-col gap-1 text-left">
            <label for="working_at" class="mb-1">Working At</label>
            <InputText
              v-model="forms.working_at"
              id="working_at"
              type="text"
              placeholder="e.g. working_at"
              fluid
              variant="outlined"
              :disabled="loading"
            />
            <div
              v-if="formErrors.working_at && formErrors.working_at.length > 0"
            >
              <Message
                v-for="(message, index) in formErrors.working_at"
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
        <div class="col-start-5 col-span-4">
          <div class="flex flex-col gap-1 text-left">
            <label for="is_used" class="mb-1">Is Used</label>
            <Select
              v-model="forms.is_used"
              :options="is_used_options"
              optionLabel="label"
              option-value="value"
              placeholder="Select"
              class="w-full"
            />
          </div>
        </div>
        <div class="col-span-8">
          <div class="flex flex-col gap-1 text-left">
            <label for="company_url" class="mb-1">Company URL</label>
            <InputText
              v-model="forms.company_url"
              id="company_url"
              type="text"
              placeholder="e.g. https://linkedin.com"
              fluid
              variant="outlined"
              :disabled="loading"
            />
          </div>
        </div>
        <div class="col-span-8">
          <div class="flex flex-col gap-1 text-left">
            <label for="message" class="mb-1">Message</label>
            <Textarea
              v-model="forms.message"
              id="message"
              type="text"
              placeholder="e.g. message"
              fluid
              variant="outlined"
              rows="5"
              :disabled="loading"
            />
            <div v-if="formErrors.message && formErrors.message.length > 0">
              <Message
                v-for="(message, index) in formErrors.message"
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
        <div class="col-start-5 col-end-7 2xl:col-start-7 2xl:col-end-8 w-full">
          <Button
            type="button"
            severity="secondary"
            label="Cancel"
            class="w-full"
            @click="$router.push('/adminz/testimonial')"
            :disabled="loading"
          />
        </div>
        <div class="col-start-7 col-end-9 2xl:col-start-8 2xl:col-end-9 w-full">
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
  title: "Admin - Create Testimonial",
  titleTemplate: "%s | Portofolio",
});

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const forms = ref({
  name: "",
  role: "",
  working_at: "",
  is_used: "N",
  message: "",
  company_url: "",
});
const is_used_options = ref([
  { label: "Yes", value: "Y" },
  { label: "No", value: "N" },
]);

const formSchema = z.object({
  name: z.string().nonempty("Name is required."),
  role: z.string().nonempty("Role is required."),
  working_at: z.string().nonempty("Working at is required."),
  message: z.string().nonempty("Message is required."),
});

const { formErrors, validateForm } = useValidateForm();

watch(
  () => [forms.value.name, forms.value.role, forms.value.working_at, forms.value.message],
  () => {
    validateForm(formSchema, forms.value);
  }
);

// Update author data
const { storeTestimonial, loading } = useTestimonialAPI();

const onFormSubmit = async () => {
  const isValid = validateForm(formSchema, forms.value);

  if (isValid) {
    const formData = {
      name: forms.value.name,
      role: forms.value.role,
      working_at: forms.value.working_at,
      is_used: forms.value.is_used,
      message: forms.value.message,
      company_url: forms.value.company_url
    };

    await storeTestimonial(formData);
  }
};
</script>
<style lang=""></style>
