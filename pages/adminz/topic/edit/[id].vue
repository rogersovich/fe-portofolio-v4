<template>
  <div>
    <div class="mb-6">
      <div class="flex justify-between">
        <div>
          <div class="text-3xl font-rethink font-bold">Edit - Page Topic</div>
          <div class="text-muted-foreground font-light mt-2">
            Edit reliable Topic in here
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
          <div class="text-2xl font-rethink font-bold">Form Edit</div>
          <hr class="seperator-line mt-3" />
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
        <div class="col-start-3 col-end-5 2xl:col-start-5 2xl:col-end-6 w-full">
          <Button
            type="button"
            severity="secondary"
            label="Cancel"
            class="w-full"
            @click="$router.push('/adminz/topic')"
            :disabled="loading"
          />
        </div>
        <div class="col-start-5 col-end-7 2xl:col-start-6 2xl:col-end-7 w-full">
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
  title: "Admin - Edit Topic",
  titleTemplate: "%s | Portofolio",
});

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const route = useRoute();

const forms = ref({
  name: "",
});

const formSchema = z.object({
  name: z.string().nonempty("Name is required."),
});

const { formErrors, validateForm } = useValidateForm();

// Update author data
const { loading, fetchTopic, topicData, updateTopic } = useTopicAPI();

watch(
  () => [forms.value.name],
  () => {
    validateForm(formSchema, forms.value);
  }
);

watch(topicData, (newData) => {
  if (newData) {
    forms.value = { ...newData };
  } else {
    forms.value = {
      name: "",
    };
  }
});

const onFormSubmit = async () => {
  const isValid = validateForm(formSchema, forms.value);

  if (isValid) {
    const id = +route.params.id;
    const formData = {
      id,
      name: forms.value.name,
    };

    await updateTopic(formData);
  }
};

onMounted(async () => {
  await fetchTopic();
});
</script>
<style lang=""></style>
