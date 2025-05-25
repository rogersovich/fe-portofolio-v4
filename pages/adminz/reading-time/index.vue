<template>
  <div>
    <div class="mb-6">
      <div class="text-3xl font-rethink font-bold">Page Reading Time</div>
      <div class="text-muted-foreground font-light mt-2">
        List Reading Time in here
      </div>
    </div>
    <div>
      <DataTable
        :value="reading_times"
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
        scroll-height="600px"
      >
        <template #header>
          <div class="flex flex-wrap items-center justify-between gap-2">
            <span class="text-lg font-bold">List Reading Time</span>
            <div class="flex items-center justify-center gap-4">
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
        <template #empty> No Reading Time found. </template>
        <template #loading> Loading Reading Time data. Please wait. </template>
        <Column
          field="id"
          header="ID"
          headerClass="flex items-center justify-center"
          bodyClass="!text-center"
          sortable
        >
          <template #body="{ index }">
            {{ calculateIndex(index) }}
          </template></Column
        >

        <Column field="type" header="Type" sortable :showFilterMenu="false">
          <template #filter="{ filterModel, filterCallback }">
            <Select
              v-model="filterModel.value"
              :options="type_options"
              @change="filterCallback"
              optionLabel="label"
              option-value="value"
              placeholder="Select"
              class="w-full text-sm"
            />
          </template>
        </Column>
        <Column
          field="minutes"
          header="Minutes"
          headerClass="w-[100px]"
          sortable
          :showFilterMenu="false"
          body-class="!text-center"
        >
          <template #filter="{ field }">
            <div class="flex items-start gap-3">
              <input
                type="number"
                v-model="filters.min_minutes.value"
                :min="0"
                placeholder="min"
                class="text-sm w-24 p-2 !border border-solid !border-zinc-600 bg-zinc-950 outline-none rounded-md"
                @input="
                  debouncedFilterCallback({
                    field: 'min_minutes',
                    value: filters.min_minutes.value,
                  })
                "
              />
              <input
                type="number"
                v-model="filters.max_minutes.value"
                :min="0"
                placeholder="max"
                class="text-sm w-24 p-2 !border border-solid !border-zinc-600 bg-zinc-950 outline-none rounded-md"
                @input="
                  debouncedFilterCallback({
                    field: 'max_minutes',
                    value: filters.max_minutes.value,
                  })
                "
              />
            </div>
          </template>
        </Column>
        <Column
          field="estimated_seconds"
          header="Estimated"
          headerClass="w-[100px]"
          sortable
          :showFilterMenu="false"
          body-class="!text-center"
        >
          <template #filter="{ filterModel, filterCallback }">
            <div class="flex items-start gap-3">
              <input
                type="number"
                v-model="filters.min_estimates.value"
                :min="0"
                placeholder="min"
                class="text-sm w-24 p-2 !border border-solid !border-zinc-600 bg-zinc-950 outline-none rounded-md"
                @input="
                  debouncedFilterCallback({
                    field: 'min_estimates',
                    value: filters.min_estimates.value,
                  })
                "
              />
              <input
                type="number"
                v-model="filters.max_estimates.value"
                :min="0"
                placeholder="max"
                class="text-sm w-24 p-2 !border border-solid !border-zinc-600 bg-zinc-950 outline-none rounded-md"
                @input="
                  debouncedFilterCallback({
                    field: 'max_estimates',
                    value: filters.max_estimates.value,
                  })
                "
              />
            </div>
          </template>
        </Column>
        <Column
          field="text_length"
          header="Text Length"
          headerClass="w-[150px]"
          sortable
          :showFilterMenu="false"
          body-class="!text-center"
        ></Column>
        <Column
          field="word_count"
          header="Word Count"
          headerClass="w-[150px]"
          sortable
          :showFilterMenu="false"
          body-class="!text-center"
        ></Column>
        <Column
          field="created_at"
          header="Created At"
          headerClass="w-[176px]"
          sortable
          :showFilterMenu="false"
        >
          <template #filter="{ filterModel, filterCallback, field }">
            <DatePicker
              v-model="filterModel.value"
              selectionMode="range"
              :manualInput="false"
              placeholder="Select Date"
              fluid
              :show-button-bar="true"
              input-class="text-sm"
              @value-change="filterCallback"
              @clear-click="clearFilterDate(field)"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
<script setup lang="ts">
import dayjs from "dayjs";
import type {
  TBaseParamsReadingTime,
  TReadingTime,
} from "~/types/reading_time.type";

useHead({
  title: "Admin - Reading Time",
  titleTemplate: "%s | Portofolio",
});

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const paginate = reactive({
  page: 0,
  limit: 10,
  first: 0,
});
const sorts = reactive({
  sort: "DESC",
  order: "updated_at",
});
const sortField = ref("");
const sortOrder = ref(1);
const filters = ref<any>({
  type: { value: "all", matchMode: "contains" },
  min_minutes: { value: null, matchMode: "contains" },
  max_minutes: { value: null, matchMode: "contains" },
  min_estimates: { value: null, matchMode: "contains" },
  max_estimates: { value: null, matchMode: "contains" },
  created_at: { value: [], matchMode: "contains" },
});
const reading_times = ref<TReadingTime[]>([]);
const type_options = ref([
  { label: "All", value: "all" },
  { label: "Blog", value: "Blog" },
]);

// API
const { loading, readingTimeListData, totalRecords, fetchReadingTimes } =
  useReadingTimeAPI();

// Watch list
watch(
  () => readingTimeListData.value,
  (newValue) => {
    reading_times.value = newValue || [];
  }
);

const debouncedFilterCallback = useDebounceFn(
  async ({ field, value }: { field: string; value: any }) => {
    filters.value[field].value = value;

    await handleAPIFetchReadingTimes();
  },
  500
);

const onPageChange = async (event: any) => {
  paginate.page = event.page;
  paginate.first = event.first;
  paginate.limit = event.rows;

  await handleAPIFetchReadingTimes();
};

// Event handler for sorting
const onSortChange = async (event: any) => {
  sortField.value = event.sortField;
  sortOrder.value = event.sortOrder;

  sorts.order = event.sortField;
  sorts.sort = event.sortOrder == 1 ? "ASC" : "DESC";

  await handleAPIFetchReadingTimes();
};

const onFilter = async (event: any) => {
  filters.value = event.filters;

  await handleAPIFetchReadingTimes();
};

const calculateIndex = (rowIndex: number) => {
  return paginate.first + rowIndex + 1;
};

const handleRefresh = () => {
  fetchReadingTimes({
    page: 1,
    limit: 10,
    sort: "DESC",
    order: "updated_at",
  });
};

const clearFilterDate = async (field: string) => {
  filters.value[field].value = [];

  setTimeout(async () => {
    await handleAPIFetchReadingTimes();
  }, 10);
};

const setFilters = (params: TBaseParamsReadingTime) => {
  if (filters.value.min_minutes) {
    const filterMinMinutes = filters.value.min_minutes;

    if (filterMinMinutes.value) {
      params = {
        ...params,
        min_minutes: filters.value.min_minutes.value,
      };
    } else {
      delete params.min_minutes;
    }
  }
  if (filters.value.max_minutes) {
    const filterMaxMinutes = filters.value.max_minutes;

    if (filterMaxMinutes.value) {
      params = {
        ...params,
        max_minutes: filters.value.max_minutes.value,
      };
    } else {
      delete params.max_minutes;
    }
  }
  if (filters.value.min_estimates) {
    const filterMinEstimates = filters.value.min_estimates;

    if (filterMinEstimates.value) {
      params = {
        ...params,
        min_estimates: filters.value.min_estimates.value,
      };
    } else {
      delete params.min_estimates;
    }
  }
  if (filters.value.max_estimates) {
    const filterMaxEstimates = filters.value.max_estimates;

    if (filterMaxEstimates.value) {
      params = {
        ...params,
        max_estimates: filters.value.max_estimates.value,
      };
    } else {
      delete params.max_estimates;
    }
  }

  if (filters.value.type) {
    const filterType = filters.value.type;

    if (filterType.value) {
      if (filterType.value == "all") {
        delete params.type;
      } else {
        params = {
          ...params,
          type: filters.value.type.value,
        };
      }
    } else {
      delete params.type;
    }
  }

  if (filters.value.created_at) {
    let created_at_arr = [] as any[];
    const filterCreatedAt = filters.value.created_at;

    if (!filterCreatedAt) {
      delete params.created_at;
    }

    if (filterCreatedAt.value.length > 0) {
      filterCreatedAt.value.forEach((date: any) => {
        if (date) {
          const formattedDate = dayjs(date).format("YYYY-MM-DD");
          created_at_arr.push(formattedDate);
        }
      });

      const created_at_string = created_at_arr.join(",");

      params = {
        ...params,
        created_at: created_at_string,
      };
    } else {
      delete params.created_at;
    }
  }

  return params;
};

const handleAPIFetchReadingTimes = async () => {
  let params = {
    page: paginate.page + 1,
    limit: paginate.limit,
    sort: sorts.sort,
    order: sorts.order,
  } as TBaseParamsReadingTime;

  params = setFilters(params);

  await fetchReadingTimes(params);
};

onMounted(async () => {
  await handleAPIFetchReadingTimes();
});
</script>
<style lang=""></style>
