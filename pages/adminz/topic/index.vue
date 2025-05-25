<template>
  <div>
    <div class="mb-6">
      <div class="text-3xl font-rethink font-bold">Page Topic</div>
      <div class="text-muted-foreground font-light mt-2">List Topic in here</div>
    </div>
    <div>
      <DataTable
        :value="topics"
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
      >
        <template #header>
          <div class="flex flex-wrap items-center justify-between gap-2">
            <span class="text-lg font-bold">List Topic</span>
            <div class="flex items-center justify-center gap-4">
              <div class="flex items-center gap-3">
                <span>
                  Total:
                </span>
                <span>
                  {{ totalRecords }}
                </span>
              </div>
              <router-link to="topic/create">
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
        <template #empty> No topics found. </template>
        <template #loading> Loading topics data. Please wait. </template>
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

        <Column
          field="name"
          header="Name"
          sortable
          :showFilterMenu="false"
        >
          <template #filter="{ filterModel, field }">
            <InputText
              id="name"
              type="text"
              v-model="filterModel.value"
              @input="
                debouncedFilterCallback({
                  field,
                  value: filterModel.value,
                })
              "
              class="p-column-filter"
              placeholder="Name"
              fluid
            />
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
              @value-change="filterCallback"
              @clear-click="clearFilterDate(field)"
            />
          </template>
        </Column>
        <Column
          header="Action"
          headerClass="flex items-center justify-center"
          bodyClass="!text-center"
        >
          <template #body="{ data }">
            <div class="flex items-center justify-center gap-4">
              <NuxtLink
                :to="`/adminz/topic/edit/${data.id}`"
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
import type { TBaseParamsTopic, TTopic } from "~/types/topic.type";
import { IconEdit, IconTrash, IconPlus } from "@tabler/icons-vue";

useHead({
  title: "Admin - Topic",
  titleTemplate: "%s | Portofolio",
});

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const confirm = useConfirm();

const paginate = reactive({
  page: 0,
  limit: 5,
  first: 0,
});
const sorts = reactive({
  sort: "DESC",
  order: "updated_at",
});
const sortField = ref("");
const sortOrder = ref(1);
const filters = ref<any>({
  name: { value: "", matchMode: "contains" },
  created_at: { value: [], matchMode: "contains" },
});
const topics = ref<TTopic[]>([]);

// Debounced filter callback function with a 500ms delay (adjust as needed)
const debouncedFilterCallback = useDebounceFn(
  async ({ field, value }: { field: string; value: any }) => {
    filters.value[field].value = value;

    await handleAPIFetchTopics();
  },
  500
);

// User API
const {
  loading,
  topicListData,
  totalRecords,
  fetchTopics,
  deleteTopic
} = useTopicAPI();

// Watch user list data
watch(
  () => topicListData.value,
  (newValue) => {
    topics.value = newValue || [];
  }
);

const onPageChange = async (event: any) => {
  paginate.page = event.page;
  paginate.first = event.first;
  paginate.limit = event.rows;

  await handleAPIFetchTopics();
};

// Event handler for sorting
const onSortChange = async (event: any) => {
  sortField.value = event.sortField;
  sortOrder.value = event.sortOrder;

  sorts.order = event.sortField;
  sorts.sort = event.sortOrder == 1 ? "ASC" : "DESC";

  await handleAPIFetchTopics();
};

const onFilter = async (event: any) => {
  filters.value = event.filters;

  await handleAPIFetchTopics();
};

const calculateIndex = (rowIndex: number) => {
  return paginate.first + rowIndex + 1;
};

const handleRefresh = () => {
  fetchTopics({
    page: 1,
    limit: 5,
    sort: "DESC",
    order: "updated_at",
  });
};

const clearFilterDate = async (field: string) => {
  filters.value[field].value = [];

  setTimeout(async () => {
    await handleAPIFetchTopics();
  }, 10);
};

const setFilters = (params: TBaseParamsTopic) => {
  if (filters.value.name) {
    const filterName = filters.value.name;

    if (filterName.value) {
      params = {
        ...params,
        name: filters.value.name.value,
      };
    } else {
      delete params.name;
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

const handleAPIFetchTopics = async () => {
  let params = {
    page: paginate.page + 1,
    limit: paginate.limit,
    sort: sorts.sort,
    order: sorts.order,
  } as TBaseParamsTopic;

  params = setFilters(params);

  await fetchTopics(params);
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
      await deleteTopic(id);
      await fetchTopics({
        page: paginate.page + 1,
        limit: paginate.limit,
      });
    },
    reject: () => {},
  });
};

onMounted(async () => {
  await handleAPIFetchTopics();
});
</script>
<style lang=""></style>
