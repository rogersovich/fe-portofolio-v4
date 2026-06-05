<template>
  <div>
    <div class="mb-6">
      <div class="text-3xl font-rethink font-bold">Page Author</div>
      <div class="text-muted-foreground font-light mt-2">
        Create & List Author in here
      </div>
    </div>
    <div>
      <DataTable
        :value="authors"
        :paginator="true"
        :rows="paginate.limit"
        :totalRecords="totalRecords"
        :lazy="true"
        :first="paginate.first"
        :rowsPerPageOptions="[5, 10, 20]"
        :sortField="sortField"
        :sortOrder="sortOrder"
        :loading="loadingAuthor"
        filterDisplay="row"
        v-model:filters="filters"
        ref="dt"
        @page="onPageChange"
        @sort="onSortChange"
        @filter="onFilter"
      >
        <template #header>
          <div class="flex flex-wrap items-center justify-between gap-2">
            <span class="text-lg font-bold">List Author</span>
            <div class="flex items-center justify-center gap-4">
              <router-link to="author/create">
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
        <template #empty> No authors found. </template>
        <template #loading> Loading authors data. Please wait. </template>
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
          field="avatar_url"
          header="Avatar"
          :showFilterMenu="false"
          headerClass="w-[100px]"
        >
          <template #body="{ data }">
            <NuxtImg :src="data.avatar_url" fit="cover" class="rounded-md h-[70px]" />
          </template>
        </Column>
        <Column field="name" header="Name" sortable :showFilterMenu="false">
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
                :to="`/adminz/author/edit/${data.id}`"
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
import { IconEdit, IconTrash, IconPlus } from "@tabler/icons-vue";
import type { TAuthor, TBaseParamsAuthor } from "~/types/author.type";
import dayjs from "dayjs";

useHead({
  title: "Admin - Author",
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
  total_records: 0,
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
const authors = ref<TAuthor[]>([]);

// Debounced filter callback function with a 500ms delay (adjust as needed)
const debouncedFilterCallback = useDebounceFn(
  async ({ field, value }: { field: string; value: any }) => {
    filters.value[field].value = value;

    await handleAPIFetchAuthors();
  },
  500
);

// Author API
const {
  loading: loadingAuthor,
  authorListData,
  totalRecords,
  fetchAuthors,
  deleteAuthor
} = useAuthorAPI();

// Watch author list data
watch(
  () => authorListData.value,
  (newValue) => {
    authors.value = newValue || [];
  }
);

const onPageChange = async (event: any) => {
  paginate.page = event.page;
  paginate.first = event.first;
  paginate.limit = event.rows;

  await handleAPIFetchAuthors();
};

// Event handler for sorting
const onSortChange = async (event: any) => {
  sortField.value = event.sortField;
  sortOrder.value = event.sortOrder;

  sorts.order = event.sortField;
  sorts.sort = event.sortOrder == 1 ? "ASC" : "DESC";

  await handleAPIFetchAuthors();
};

const onFilter = async (event: any) => {
  filters.value = event.filters;

  await handleAPIFetchAuthors();
};

const calculateIndex = (rowIndex: number) => {
  return paginate.first + rowIndex + 1;
};

const handleRefresh = () => {
  fetchAuthors({
    page: 1,
    limit: 5,
    sort: "DESC",
    order: "updated_at",
  });
};

const clearFilterDate = async (field: string) => {
  filters.value[field].value = [];

  setTimeout(async () => {
    await handleAPIFetchAuthors();
  }, 10);
};

const setFilters = (params: TBaseParamsAuthor) => {
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

const handleAPIFetchAuthors = async () => {
  let params = {
    page: paginate.page + 1,
    limit: paginate.limit,
    sort: sorts.sort,
    order: sorts.order,
  } as TBaseParamsAuthor;

  params = setFilters(params);

  await fetchAuthors(params);
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
      await deleteAuthor(id);
      await fetchAuthors({
        page: paginate.page + 1,
        limit: paginate.limit,
      });
    },
    reject: () => {},
  });
};

onMounted(async () => {
  await handleAPIFetchAuthors();
});
</script>
<style></style>
