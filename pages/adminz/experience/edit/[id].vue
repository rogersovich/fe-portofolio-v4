<template>
  <div>
    <div class="mb-6">
      <div class="flex justify-between">
        <div>
          <div class="text-3xl font-rethink font-bold">
            Edit - Page Experience
          </div>
          <div class="text-muted-foreground font-light mt-2">
            Edit reliable Experience in here
          </div>
        </div>
        <div>
          <Button variant="text" @click="$router.push('/adminz/experience')">
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
        :disabled="loading"
      >
        <div class="col-span-12">
          <div class="text-2xl font-rethink font-bold">Form Edit</div>
          <hr class="border-zinc-50/[.15] mt-3" />
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
              <template v-if="!logoNew.is_changed">
                <NuxtImg
                  :src="forms?.comp_image_url"
                  height="150"
                  class="rounded-lg"
                ></NuxtImg>
              </template>
              <template v-else>
                <NuxtImg
                  :src="logoNew.blob_url"
                  height="150"
                  class="rounded-lg"
                ></NuxtImg>
              </template>
              <div class="w-full flex flex-col items-center gap-3">
                <Button
                  type="button"
                  variant="outlined"
                  label="Change Image"
                  class="w-full"
                  @click="triggerLogoChange"
                  :disabled="loading"
                />
                <template v-if="logoNew.is_changed">
                  <Button
                    type="button"
                    variant="outlined"
                    severity="danger"
                    label="Cancel Image"
                    class="w-full"
                    @click="cancelLogo"
                    :disabled="loading"
                  />
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-9 2xl:col-span-7">
          <div class="grid grid-cols-12 gap-6">
            <div class="col-start-1 col-span-4">
              <div class="flex flex-col gap-1 text-left">
                <label for="is_current" class="mb-1">Is Current</label>
                <Select
                  v-model="forms.is_current"
                  :options="is_current_options"
                  optionLabel="label"
                  option-value="value"
                  placeholder="Select"
                  class="w-full"
                  @change="handleIsCurrentChange"
                />
              </div>
            </div>

            <div class="col-span-8">
              <div class="flex flex-col gap-1 text-left">
                <label for="work_type" class="mb-1">Work Type</label>
                <Select
                  v-model="forms.work_type"
                  :options="work_type_options"
                  optionLabel="label"
                  option-value="value"
                  placeholder="Select"
                  class="w-full"
                />
                <div
                  v-if="formErrors.work_type && formErrors.work_type.length > 0"
                >
                  <Message
                    v-for="(message, index) in formErrors.work_type"
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

            <div class="col-span-6">
              <div class="flex flex-col gap-1 text-left">
                <label for="position" class="mb-1">Position</label>
                <InputText
                  v-model="forms.position"
                  id="position"
                  type="text"
                  placeholder="e.g. Developer"
                  fluid
                  variant="outlined"
                  :disabled="loading"
                />
                <div
                  v-if="formErrors.position && formErrors.position.length > 0"
                >
                  <Message
                    v-for="(message, index) in formErrors.position"
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

            <div class="col-span-6">
              <div class="flex flex-col gap-1 text-left">
                <label for="company_name" class="mb-1">Company Name</label>
                <InputText
                  v-model="forms.company_name"
                  id="company_name"
                  type="text"
                  placeholder="e.g. Netflix"
                  fluid
                  variant="outlined"
                  :disabled="loading"
                />
                <div
                  v-if="
                    formErrors.company_name &&
                    formErrors.company_name.length > 0
                  "
                >
                  <Message
                    v-for="(message, index) in formErrors.company_name"
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

            <div class="col-span-6">
              <div class="flex flex-col gap-1 text-left">
                <label for="country" class="mb-1">Country</label>
                <InputText
                  v-model="forms.country"
                  id="country"
                  type="text"
                  placeholder="e.g. Indonesia"
                  fluid
                  variant="outlined"
                  :disabled="loading"
                />
                <div v-if="formErrors.country && formErrors.country.length > 0">
                  <Message
                    v-for="(message, index) in formErrors.country"
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

            <div class="col-span-6">
              <div class="flex flex-col gap-1 text-left">
                <label for="city" class="mb-1">City</label>
                <InputText
                  v-model="forms.city"
                  id="city"
                  type="text"
                  placeholder="e.g. Bogor"
                  fluid
                  variant="outlined"
                  :disabled="loading"
                />
                <div v-if="formErrors.city && formErrors.city.length > 0">
                  <Message
                    v-for="(message, index) in formErrors.city"
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

            <div class="col-span-12">
              <div class="flex flex-col gap-1 text-left">
                <label for="comp_website_url" class="mb-1">Website URL</label>
                <InputText
                  v-model="forms.comp_website_url"
                  id="comp_website_url"
                  type="text"
                  placeholder="e.g. www.google.com"
                  fluid
                  variant="outlined"
                  :disabled="loading"
                />
                <div
                  v-if="
                    formErrors.comp_website_url &&
                    formErrors.comp_website_url.length > 0
                  "
                >
                  <Message
                    v-for="(message, index) in formErrors.comp_website_url"
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

            <div class="col-span-6">
              <div class="flex flex-col gap-1 text-left">
                <label for="from_date" class="mb-1">From Date</label>
                <DatePicker
                  v-model="forms.from_date"
                  :manualInput="false"
                  placeholder="Select Date"
                  fluid
                  :show-button-bar="true"
                  @clear-click="forms.from_date = null"
                />
                <div
                  v-if="formErrors.from_date && formErrors.from_date.length > 0"
                >
                  <Message
                    v-for="(message, index) in formErrors.from_date"
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

            <div class="col-span-6">
              <div class="flex flex-col gap-1 text-left">
                <label for="to_date" class="mb-1">To Date</label>
                <DatePicker
                  v-model="forms.to_date"
                  :manualInput="false"
                  placeholder="Select Date"
                  fluid
                  :show-button-bar="true"
                  :disabled="disableToDate"
                  @clear-click="forms.to_date = null"
                />
                <div v-if="formErrors.to_date && formErrors.to_date.length > 0">
                  <Message
                    v-for="(message, index) in formErrors.to_date"
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
                <label class="mb-1">Summary HTML</label>
                <BaseCustomEditor
                  v-model="forms.summary_html"
                  :errMessage="summaryHtmlError"
                  :disabled="!loading"
                />
                <Message
                  v-if="summaryHtmlError"
                  severity="error"
                  size="small"
                  variant="simple"
                >
                  {{ summaryHtmlError }}
                </Message>
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-start-9 col-end-11 2xl:col-start-9 2xl:col-end-10 w-full sticky bottom-2 z-1"
        >
          <Button
            type="button"
            severity="secondary"
            label="Cancel"
            class="w-full"
            @click="$router.push('/adminz/experience')"
            :disabled="loading"
          />
        </div>
        <div
          class="col-start-11 col-end-13 2xl:col-start-10 2xl:col-end-11 w-full sticky bottom-2 z-1"
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
import dayjs from "dayjs";
import type { TExperienceEdit } from "~/types/experience.type";

useHead({
  title: "Admin - Edit Experience",
  titleTemplate: "%s | Portofolio",
});

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const route = useRoute();
const MINIO_BASE_URL = useMinioUrl();

const refLogo = ref("");
const logoNew = ref({
  file: null,
  blob_url: "",
  is_changed: false,
});
const forms = ref<TExperienceEdit>({
  position: "",
  company_name: "",
  work_type: "",
  country: "",
  city: "",
  from_date: null,
  to_date: null,
  summary_html: "",
  is_current: "N",
  comp_website_url: "",
  comp_image_url: "",
});
const is_current_options = ref([
  { label: "Yes", value: "Y" },
  { label: "No", value: "N" },
]);
const work_type_options = ref([
  { label: "Remote", value: "Remote" },
  { label: "Office", value: "Office" },
  { label: "Hybrid", value: "Hybrid" },
]);

const summaryHtmlError = ref<string>("");
const formSchema = z.object({
  position: z.string().nonempty("Position is required."),
  company_name: z.string().nonempty("Company name is required."),
  work_type: z.string().nonempty("Work type is required."),
  country: z.string().nonempty("Country is required."),
  city: z.string().nonempty("City is required."),
  from_date: z.date({ message: "From date is required." }),
  to_date: z.date().nullable(),
  is_current: z.string().nonempty("Is current is required."),
});

// API
const { loading, experienceData, fetchExperience, updateExperience } =
  useExperienceAPI();

const handleLogoChange = (event: any) => {
  const file = event.target.files[0];
  if (file) {
    logoNew.value.blob_url = URL.createObjectURL(file);
    logoNew.value.file = file;
    logoNew.value.is_changed = true;
  }
};

const triggerLogoChange = () => {
  const fileInput = refLogo.value as unknown as HTMLInputElement;
  fileInput.click();
};

const cancelLogo = () => {
  logoNew.value.file = null;
  logoNew.value.blob_url = "";
  logoNew.value.is_changed = false;
};

const disableToDate = ref(false);

const handleIsCurrentChange = () => {
  if (forms.value.is_current == "Y") {
    forms.value.to_date = null;
    disableToDate.value = true;
  } else {
    disableToDate.value = false;
  }
};

const { formErrors, validateForm } = useValidateForm();
const validateSummaryHtml = () => {
  const val = forms.value.summary_html.trim();
  if (val == "" || val == "<p></p>") {
    summaryHtmlError.value = "Summary HTML is required.";
  } else {
    summaryHtmlError.value = "";
  }
};

watch(
  () => [forms.value.summary_html],
  () => {
    validateSummaryHtml();
  }
);
watch(
  () => [
    forms.value.position,
    forms.value.company_name,
    forms.value.work_type,
    forms.value.country,
    forms.value.city,
    forms.value.from_date,
    forms.value.to_date,
    forms.value.is_current,
    forms.value.comp_website_url,
  ],
  () => {
    validateForm(formSchema, forms.value);
  }
);

watch(experienceData, (newData) => {
  if (newData) {
    const fromDate = dayjs(newData.from_date).toDate();
    const toDateFormatted = dayjs(newData.to_date).toDate();
    let toDate = null;

    if (newData.is_current == "Y") {
      disableToDate.value = true;
    } else {
      disableToDate.value = false;
      toDate = toDateFormatted;
    }

    forms.value = {
      position: newData.position,
      company_name: newData.company_name,
      work_type: newData.work_type,
      country: newData.country,
      city: newData.city,
      from_date: fromDate,
      to_date: toDate,
      summary_html: newData.summary_html,
      is_current: newData.is_current,
      comp_website_url: newData.comp_website_url,
      comp_image_url: MINIO_BASE_URL + newData.comp_image_file_name,
    };
  } else {
    forms.value = {
      position: "",
      company_name: "",
      work_type: "",
      country: "",
      city: "",
      from_date: null,
      to_date: null,
      summary_html: "",
      is_current: "N",
      comp_website_url: "",
      comp_image_url: "",
    };
  }
});

const onFormSubmit = async () => {
  validateSummaryHtml();
  const isValid = validateForm(formSchema, forms.value);
  if (!summaryHtmlError.value && isValid) {
    const id = route.params.id as string;

    const formData = new FormData();
    formData.append("id", id);
    formData.append("position", forms.value.position);
    formData.append("company_name", forms.value.company_name);
    formData.append("work_type", forms.value.work_type);
    formData.append("country", forms.value.country);
    formData.append("city", forms.value.city);
    formData.append("comp_website_url", forms.value.comp_website_url);
    const fromDate = dayjs(forms.value.from_date).format("YYYY-MM-DD");
    const toDate = dayjs(forms.value.to_date).format("YYYY-MM-DD");
    formData.append("from_date", fromDate);
    formData.append("to_date", toDate);
    formData.append("is_current", forms.value.is_current);
    formData.append("summary_html", forms.value.summary_html);
    const logoNewFile = logoNew.value.file as unknown as File;
    if (logoNew.value.is_changed && logoNewFile) {
      formData.append("comp_image_file", logoNewFile);
    }

    await updateExperience(formData);
  }
};

onMounted(async () => {
  await fetchExperience();
});
</script>
<style lang=""></style>
