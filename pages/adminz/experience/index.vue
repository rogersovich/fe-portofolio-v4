<template>
  <div>
    <div class="mb-6">
      <div class="text-3xl font-rethink font-bold">Page Experience</div>
      <div class="text-muted-foreground font-light mt-2">
        Create & List Experience in here
      </div>
    </div>
    <div>
      <DataTable
        :value="experiences"
        :paginator="true"
        :rows="paginate.limit"
        :totalRecords="totalRecords"
        :lazy="true"
        :first="paginate.first"
        :rowsPerPageOptions="[5, 10, 20]"
        :sortField="sortField"
        :sortOrder="sortOrder"
        :loading="loading"
        filterDisplay="row"
        v-model:filters="filters"
        ref="dt"
        @page="onPageChange"
        @sort="onSortChange"
        @filter="onFilter"
        size="small"
        scroll-height="600px"
      >
        <template #header>
          <div class="flex flex-wrap items-center justify-between gap-2">
            <span class="text-lg font-bold">List Experience</span>
            <div class="flex items-center justify-center gap-4">
              <div class="flex items-center gap-3">
                <span> Total: </span>
                <span>
                  {{ totalRecords }}
                </span>
              </div>
              <router-link to="experience/create">
                <Button
                  variant="filled"
                  class="py-2.5 bg-blue-600 !border-none hover:!bg-blue-700 !text-white"
                >
                  <IconPlus class="size-5" />
                </Button>
              </router-link>
              <Button
                icon="pi pi-refresh"
                class="!text-white bg-zinc-600 hover:!bg-zinc-700 !border-none"
                rounded
                raised
                @click="handleRefresh()"
              />
            </div>
          </div>
        </template>
        <template #empty>
          <div class="text-left p-4">
            No experiences found. 
          </div>
        </template>
        <template #loading> Loading experiences data. Please wait. </template>
        <Column
          field="id"
          header="ID"
          headerClass="flex items-center justify-center"
          bodyClass="!text-center"
          sortable
          style="width: 6rem"
        >
          <template #body="{ index }">
            {{ calculateIndex(index) }}
          </template></Column
        >
        <Column
          field="comp_image_url"
          header="Company Logo"
          :showFilterMenu="false"
          style="min-width: 10rem"
          body-class="flex items-center justify-center"
        >
          <template #body="{ data }">
            <a :href="data.comp_website_url" target="_blank">
              <NuxtImg
                :src="data.comp_image_url"
                fit="cover"
                class="rounded-md h-[40px]"
              />
            </a>
          </template>
        </Column>
        <Column
          field="position"
          header="Position"
          sortable
          :showFilterMenu="false"
          style="min-width: 15rem"
        >
          <template #filter="{ filterModel, field }">
            <InputText
              type="text"
              v-model="filterModel.value"
              @input="
                debouncedFilterCallback({
                  field,
                  value: filterModel.value,
                })
              "
              class="p-column-filter"
              placeholder="Position"
              fluid
            />
          </template>
        </Column>
        <Column
          field="company_name"
          header="Company Name"
          sortable
          :showFilterMenu="false"
          style="min-width: 15rem"
        >
          <template #filter="{ filterModel, field }">
            <InputText
              type="text"
              v-model="filterModel.value"
              @input="
                debouncedFilterCallback({
                  field,
                  value: filterModel.value,
                })
              "
              class="p-column-filter"
              placeholder="Company Name"
              fluid
            />
          </template>
        </Column>
        <Column
          field="work_type"
          header="Work Type"
          sortable
          :showFilterMenu="false"
          style="min-width: 12rem"
        >
          <template #filter="{ filterModel, filterCallback }">
            <Select
              v-model="filterModel.value"
              :options="work_type_options"
              @change="filterCallback"
              optionLabel="label"
              option-value="value"
              placeholder="Select"
              class="w-full"
            />
          </template>
        </Column>
        <Column
          field="country"
          header="Country"
          sortable
          :showFilterMenu="false"
          style="min-width: 12rem"
        >
          <template #filter="{ filterModel, field }">
            <InputText
              type="text"
              v-model="filterModel.value"
              @input="
                debouncedFilterCallback({
                  field,
                  value: filterModel.value,
                })
              "
              class="p-column-filter"
              placeholder="Country"
              fluid
            />
          </template>
        </Column>
        <Column field="city" header="City" sortable :showFilterMenu="false" style="min-width: 12rem">
          <template #filter="{ filterModel, field }">
            <InputText
              type="text"
              v-model="filterModel.value"
              @input="
                debouncedFilterCallback({
                  field,
                  value: filterModel.value,
                })
              "
              class="p-column-filter"
              placeholder="city"
              fluid
            />
          </template>
        </Column>
        <Column
          field="is_current"
          header="Is Current"
          sortable
          :showFilterMenu="false"
          style="min-width: 12rem"
        >
          <template #body="{ data }">
            {{ data.is_current == "Y" ? "Yes" : "No" }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <Select
              v-model="filterModel.value"
              :options="is_current_options"
              @change="filterCallback"
              optionLabel="label"
              option-value="value"
              placeholder="Select"
              class="w-full"
            />
          </template>
        </Column>
        <Column
          field="from_date"
          header="From Date"
          sortable
          :showFilterMenu="false"
          style="min-width: 12rem"
        >
          <template #filter="{ filterModel, filterCallback, field }">
            <DatePicker
              v-model="filterModel.value"
              selectionMode="range"
              :manualInput="false"
              placeholder="Select Date"
              fluid
              :show-button-bar="true"
              @value-change="filterCallback"
              @clear-click="clearFilterDate(field)"
            />
          </template>
        </Column>
        <Column
          field="to_date"
          header="To Date"
          sortable
          :showFilterMenu="false"
          style="min-width: 12rem"
        >
          <template #filter="{ filterModel, filterCallback, field }">
            <DatePicker
              v-model="filterModel.value"
              selectionMode="range"
              :manualInput="false"
              placeholder="Select Date"
              fluid
              :show-button-bar="true"
              @value-change="filterCallback"
              @clear-click="clearFilterDate(field)"
            />
          </template>
        </Column>
        <Column
          header="Action"
          headerClass="flex items-center justify-center"
          bodyClass="!text-center"
          style="min-width: 12rem"
        >
          <template #body="{ data }">
            <div class="flex items-center justify-center gap-4">
              <NuxtLink
                :to="`/adminz/experience/edit/${data.id}`"
                class="cursor-pointer hover:bg-zinc-50/[.05] p-2 rounded-md"
              >
                <IconEdit class="size-6 text-orange-500" />
              </NuxtLink>
              <div
                class="cursor-pointer hover:bg-zinc-50/[.05] p-2 rounded-md"
                @click="handleConfirmDelete(data.id)"
              >
                <IconTrash class="size-6 text-red-500" />
              </div>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
<script setup lang="ts">
import dayjs from "dayjs";
import { IconEdit, IconTrash, IconPlus } from "@tabler/icons-vue";
import type {
  TBaseParamsExperience,
  TExperience,
} from "~/types/experience.type";

useHead({
  title: "Admin - Experience",
  titleTemplate: "%s | Portofolio",
});

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const confirm = useConfirm();

const paginate = reactive({
  page: 0,
  limit: 10,
  first: 0,
});
const sorts = reactive({
  sort: "DESC",
  order: "id",
});
const sortField = ref("");
const sortOrder = ref(1);
const filters = ref<any>({
  position: { value: "", matchMode: "contains" },
  company_name: { value: "", matchMode: "contains" },
  work_type: { value: "all", matchMode: "contains" },
  country: { value: "", matchMode: "contains" },
  city: { value: "", matchMode: "contains" },
  from_date: { value: "", matchMode: "contains" },
  to_date: { value: "", matchMode: "contains" },
  comp_website_url: { value: "", matchMode: "contains" },
  summary_html: { value: "", matchMode: "contains" },
  is_current: { value: "all", matchMode: "contains" },
});
const experiences = ref<TExperience[]>([]);
const is_current_options = ref([
  { label: "All", value: "all" },
  { label: "Yes", value: "Y" },
  { label: "No", value: "N" },
]);
const work_type_options = ref([
  { label: "All", value: "all" },
  { label: "Remote", value: "Remote" },
  { label: "Office", value: "Office" },
  { label: "Hybrid", value: "Hybrid" },
]);

// Debounced filter callback function with a 500ms delay (adjust as needed)
const debouncedFilterCallback = useDebounceFn(
  async ({ field, value }: { field: string; value: any }) => {
    filters.value[field].value = value;

    await handleAPIFetchExperiences();
  },
  500
);

// API
const {
  loading,
  experienceListData,
  totalRecords,
  fetchExperiences,
  deleteExperience,
} = useExperienceAPI();

// Watch data
watch(
  () => experienceListData.value,
  (newValue) => {
    experiences.value = newValue || [];
  }
);

const onPageChange = async (event: any) => {
  paginate.page = event.page;
  paginate.first = event.first;
  paginate.limit = event.rows;

  await handleAPIFetchExperiences();
};

// Event handler for sorting
const onSortChange = async (event: any) => {
  sortField.value = event.sortField;
  sortOrder.value = event.sortOrder;

  sorts.order = event.sortField;
  sorts.sort = event.sortOrder == 1 ? "ASC" : "DESC";

  await handleAPIFetchExperiences();
};

const onFilter = async (event: any) => {
  filters.value = event.filters;

  await handleAPIFetchExperiences();
};

const calculateIndex = (rowIndex: number) => {
  return paginate.first + rowIndex + 1;
};

const handleRefresh = () => {
  fetchExperiences({
    page: 1,
    limit: 10,
    sort: "DESC",
    order: "id",
  });
};

const clearFilterDate = async (field: string) => {
  filters.value[field].value = [];

  setTimeout(async () => {
    await handleAPIFetchExperiences();
  }, 10);
};

const setFilters = (params: TBaseParamsExperience) => {
  if (filters.value.position) {
    const filterPosition = filters.value.position;

    if (filterPosition.value) {
      params = {
        ...params,
        position: filters.value.position.value,
      };
    } else {
      delete params.position;
    }
  }

  if (filters.value.company_name) {
    const filterCompanyName = filters.value.company_name;

    if (filterCompanyName.value) {
      params = {
        ...params,
        company_name: filters.value.company_name.value,
      };
    } else {
      delete params.company_name;
    }
  }

  if (filters.value.work_type) {
    const filterWorkType = filters.value.work_type;

    if (filterWorkType.value) {
      if (filterWorkType.value == "all") {
        delete params.work_type;
      } else {
        params = {
          ...params,
          work_type: filters.value.work_type.value,
        };
      }
    } else {
      delete params.work_type;
    }
  }

  if (filters.value.country) {
    const filterCountry = filters.value.country;

    if (filterCountry.value) {
      params = {
        ...params,
        country: filters.value.country.value,
      };
    } else {
      delete params.country;
    }
  }

  if (filters.value.city) {
    const filterCity = filters.value.city;

    if (filterCity.value) {
      params = {
        ...params,
        city: filters.value.city.value,
      };
    } else {
      delete params.city;
    }
  }

  if (filters.value.summary_html) {
    const filterSummary = filters.value.summary_html;

    if (filterSummary.value) {
      params = {
        ...params,
        summary_html: filters.value.summary_html.value,
      };
    } else {
      delete params.summary_html;
    }
  }

  if (filters.value.is_current) {
    const filterIsCurrent = filters.value.is_current;

    if (filterIsCurrent.value) {
      if (filterIsCurrent.value == "all") {
        delete params.is_current;
      } else {
        params = {
          ...params,
          is_current: filters.value.is_current.value,
        };
      }
    } else {
      delete params.is_current;
    }
  }

  if (filters.value.from_date) {
    let from_date_arr = [] as any[];
    const filterFromDate = filters.value.from_date;

    if (!filterFromDate) {
      delete params.from_date;
    }

    if (filterFromDate.value.length > 0) {
      filterFromDate.value.forEach((date: any) => {
        if (date) {
          const formattedDate = dayjs(date).format("YYYY-MM-DD");
          from_date_arr.push(formattedDate);
        }
      });

      const from_date_string = from_date_arr.join(",");

      params = {
        ...params,
        from_date: from_date_string,
      };
    } else {
      delete params.from_date;
    }
  }

  if (filters.value.to_date) {
    let to_date_arr = [] as any[];
    const filterToDate = filters.value.to_date;

    if (!filterToDate) {
      delete params.to_date;
    }

    if (filterToDate.value.length > 0) {
      filterToDate.value.forEach((date: any) => {
        if (date) {
          const formattedDate = dayjs(date).format("YYYY-MM-DD");
          to_date_arr.push(formattedDate);
        }
      });

      const to_date_string = to_date_arr.join(",");

      params = {
        ...params,
        to_date: to_date_string,
      };
    } else {
      delete params.to_date;
    }
  }

  return params;
};

const handleAPIFetchExperiences = async () => {
  let params = {
    page: paginate.page + 1,
    limit: paginate.limit,
    sort: sorts.sort,
    order: sorts.order,
  } as TBaseParamsExperience;

  params = setFilters(params);

  await fetchExperiences(params);
};

const handleConfirmDelete = (id: number) => {
  confirm.require({
    message: "Are you sure you want to delete?",
    header: "Delete Confirmation",
    icon: "pi pi-exclamation-triangle",
    acceptClass: "btn-accept-dialog",
    rejectClass: "btn-reject-dialog",
    acceptLabel: "Yes",
    rejectLabel: "Cancel",
    accept: async () => {
      await deleteExperience(id);
      await fetchExperiences({
        page: paginate.page + 1,
        limit: paginate.limit,
      });
    },
    reject: () => {},
  });
};

onMounted(async () => {
  await handleAPIFetchExperiences();
});
</script>
<style></style>
