<template>
  <div>
    <div class="mb-6">
      <div class="text-3xl font-rethink font-bold">Page Statistic</div>
      <div class="text-muted-foreground font-light mt-2">
        List Statistic in here
      </div>
    </div>
    <div>
      <DataTable
        :value="statistics"
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
            <span class="text-lg font-bold">List Statistic</span>
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
        <template #empty> No statistics found. </template>
        <template #loading> Loading statistics data. Please wait. </template>
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
          field="likes"
          header="Likes"
          headerClass="w-[100px]"
          sortable
          :showFilterMenu="false"
          body-class="!text-center"
        >
          <template #filter="{ field }">
            <div class="flex items-start gap-3">
              <input
                type="number"
                v-model="filters.min_likes.value"
                :min="0"
                placeholder="min"
                class="text-sm w-24 p-2 !border border-solid !border-zinc-600 bg-zinc-950 outline-none rounded-md"
                @input="
                  debouncedFilterCallback({
                    field: 'min_likes',
                    value: filters.min_likes.value,
                  })
                "
              />
              <input
                type="number"
                v-model="filters.max_likes.value"
                :min="0"
                placeholder="max"
                class="text-sm w-24 p-2 !border border-solid !border-zinc-600 bg-zinc-950 outline-none rounded-md"
                @input="
                  debouncedFilterCallback({
                    field: 'max_likes',
                    value: filters.max_likes.value,
                  })
                "
              />
            </div>
          </template>
        </Column>
        <Column
          field="views"
          header="Views"
          headerClass="w-[100px]"
          sortable
          :showFilterMenu="false"
          body-class="!text-center"
        >
          <template #filter="{ filterModel, filterCallback }">
            <div class="flex items-start gap-3">
              <input
                type="number"
                v-model="filters.min_views.value"
                :min="0"
                placeholder="min"
                class="text-sm w-24 p-2 !border border-solid !border-zinc-600 bg-zinc-950 outline-none rounded-md"
                @input="
                  debouncedFilterCallback({
                    field: 'min_views',
                    value: filters.min_views.value,
                  })
                "
              />
              <input
                type="number"
                v-model="filters.max_views.value"
                :min="0"
                placeholder="max"
                class="text-sm w-24 p-2 !border border-solid !border-zinc-600 bg-zinc-950 outline-none rounded-md"
                @input="
                  debouncedFilterCallback({
                    field: 'max_views',
                    value: filters.max_views.value,
                  })
                "
              />
            </div>
          </template>
        </Column>
        <Column
          field="created_at"
          header="Created At"
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
import type { TBaseParamsStatistic, TStatistic } from "~/types/statistic.type";

useHead({
  title: "Admin - Statistic",
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
  min_likes: { value: null, matchMode: "contains" },
  max_likes: { value: null, matchMode: "contains" },
  min_views: { value: null, matchMode: "contains" },
  max_views: { value: null, matchMode: "contains" },
  created_at: { value: [], matchMode: "contains" },
});
const statistics = ref<TStatistic[]>([]);
const type_options = ref([
  { label: "All", value: "all" },
  { label: "Blog", value: "Blog" },
  { label: "Project", value: "Project" },
]);

// API
const { loading, statisticListData, totalRecords, fetchStatistics } =
  useStatisticAPI();

// Watch list
watch(
  () => statisticListData.value,
  (newValue) => {
    statistics.value = newValue || [];
  }
);

const debouncedFilterCallback = useDebounceFn(
  async ({ field, value }: { field: string; value: any }) => {
    filters.value[field].value = value;

    await handleAPIFetchStatistics();
  },
  500
);

const onPageChange = async (event: any) => {
  paginate.page = event.page;
  paginate.first = event.first;
  paginate.limit = event.rows;

  await handleAPIFetchStatistics();
};

// Event handler for sorting
const onSortChange = async (event: any) => {
  sortField.value = event.sortField;
  sortOrder.value = event.sortOrder;

  sorts.order = event.sortField;
  sorts.sort = event.sortOrder == 1 ? "ASC" : "DESC";

  await handleAPIFetchStatistics();
};

const onFilter = async (event: any) => {
  filters.value = event.filters;

  await handleAPIFetchStatistics();
};

const calculateIndex = (rowIndex: number) => {
  return paginate.first + rowIndex + 1;
};

const handleRefresh = () => {
  fetchStatistics({
    page: 1,
    limit: 10,
    sort: "DESC",
    order: "updated_at",
  });
};

const clearFilterDate = async (field: string) => {
  filters.value[field].value = [];

  setTimeout(async () => {
    await handleAPIFetchStatistics();
  }, 10);
};

const setFilters = (params: TBaseParamsStatistic) => {
  if (filters.value.min_likes) {
    const filterMinLikes = filters.value.min_likes;

    if (filterMinLikes.value) {
      params = {
        ...params,
        min_likes: filters.value.min_likes.value,
      };
    } else {
      delete params.min_likes;
    }
  }
  if (filters.value.max_likes) {
    const filterMaxLikes = filters.value.max_likes;

    if (filterMaxLikes.value) {
      params = {
        ...params,
        max_likes: filters.value.max_likes.value,
      };
    } else {
      delete params.max_likes;
    }
  }
  if (filters.value.min_views) {
    const filterMinViews = filters.value.min_views;

    if (filterMinViews.value) {
      params = {
        ...params,
        min_views: filters.value.min_views.value,
      };
    } else {
      delete params.min_views;
    }
  }
  if (filters.value.max_views) {
    const filterMaxViews = filters.value.max_views;

    if (filterMaxViews.value) {
      params = {
        ...params,
        max_views: filters.value.max_views.value,
      };
    } else {
      delete params.max_views;
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

const handleAPIFetchStatistics = async () => {
  let params = {
    page: paginate.page + 1,
    limit: paginate.limit,
    sort: sorts.sort,
    order: sorts.order,
  } as TBaseParamsStatistic;

  params = setFilters(params);

  await fetchStatistics(params);
};

onMounted(async () => {
  await handleAPIFetchStatistics();
});
</script>
<style lang=""></style>
