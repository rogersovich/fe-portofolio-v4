<template>
  <div>
    <div class="mb-6">
      <div class="text-3xl font-rethink font-bold">Page Blog</div>
      <div class="text-muted-foreground font-light mt-2">
        Create & List Blog in here
      </div>
    </div>
    <div>
      <DataTable
        :value="blogs"
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
            <span class="text-lg font-bold">List Blog</span>
            <div class="flex items-center justify-center gap-4">
              <div class="flex items-center gap-3">
                <span> Total: </span>
                <span>
                  {{ totalRecords }}
                </span>
              </div>
              <router-link to="blog/create">
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
        <template #empty> No blogs found. </template>
        <template #loading> Loading blogs data. Please wait. </template>
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
          field="banner_url"
          header="Banner"
          :showFilterMenu="false"
          headerClass="w-[80px]"
        >
          <template #body="{ data }">
            <NuxtImg
              :src="MINIO_BASE_URL + data.banner_file_name"
              fit="cover"
              class="rounded-md h-[60px]"
            />
          </template>
        </Column>
        <Column field="title" header="Title" sortable :showFilterMenu="false">
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
              placeholder="Title"
              fluid
            />
          </template>
        </Column>
        <Column field="status" header="Status" sortable :showFilterMenu="false">
          <template #body="{ data }">
            {{ data.status }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <Select
              v-model="filterModel.value"
              :options="status_options"
              @change="filterCallback"
              optionLabel="label"
              option-value="value"
              placeholder="Select"
              class="w-full"
            />
          </template>
        </Column>
        <Column
          field="published_at"
          header="Published at"
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
                :to="`/adminz/blog/edit/${data.id}`"
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
import type { TBaseParamsBlog, TBlog } from "~/types/blog.type";

useHead({
  title: "Admin - Blog",
  titleTemplate: "%s | Portofolio",
});

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const confirm = useConfirm();
const MINIO_BASE_URL = useMinioUrl()

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
  title: { value: "", matchMode: "contains" },
  status: { value: "all", matchMode: "contains" },
  published_at: { value: "", matchMode: "contains" },
  created_at: { value: [], matchMode: "contains" },
});
const blogs = ref<TBlog[]>([]);
const status_options = ref([
  { label: "All", value: "all" },
  { label: "Published", value: "Published" },
  { label: "Unpublished", value: "Unpublished" },
]);

// Debounced filter callback function with a 500ms delay (adjust as needed)
const debouncedFilterCallback = useDebounceFn(
  async ({ field, value }: { field: string; value: any }) => {
    filters.value[field].value = value;

    await handleAPIFetchBlogs();
  },
  500
);

// API
const { loading, blogListData, totalRecords, fetchBlogs, deleteBlog } =
  useBlogAPI();

// Watch data
watch(
  () => blogListData.value,
  (newValue) => {
    blogs.value = newValue || [];
  }
);

const onPageChange = async (event: any) => {
  paginate.page = event.page;
  paginate.first = event.first;
  paginate.limit = event.rows;

  await handleAPIFetchBlogs();
};

// Event handler for sorting
const onSortChange = async (event: any) => {
  sortField.value = event.sortField;
  sortOrder.value = event.sortOrder;

  sorts.order = event.sortField;
  sorts.sort = event.sortOrder == 1 ? "ASC" : "DESC";

  await handleAPIFetchBlogs();
};

const onFilter = async (event: any) => {
  filters.value = event.filters;

  await handleAPIFetchBlogs();
};

const calculateIndex = (rowIndex: number) => {
  return paginate.first + rowIndex + 1;
};

const handleRefresh = () => {
  filters.value.status.value = "all";
  fetchBlogs({
    page: 1,
    limit: 10,
    sort: "DESC",
    order: "updated_at",
  });
};

const clearFilterDate = async (field: string) => {
  filters.value[field].value = [];

  setTimeout(async () => {
    await handleAPIFetchBlogs();
  }, 10);
};

const setFilters = (params: TBaseParamsBlog) => {
  if (filters.value.title) {
    const filterTitle = filters.value.title;

    if (filterTitle.value) {
      params = {
        ...params,
        title: filters.value.title.value,
      };
    } else {
      delete params.title;
    }
  }

  if (filters.value.status) {
    const filterStatus = filters.value.status;

    if (filterStatus.value) {
      if (filterStatus.value == "all") {
        delete params.status;
      } else {
        params = {
          ...params,
          status: filters.value.status.value,
        };
      }
    } else {
      delete params.status;
    }
  }

  if (filters.value.published_at) {
    let published_at_arr = [] as any[];
    const filterPublishedAt = filters.value.published_at;

    if (!filterPublishedAt) {
      delete params.published_at;
    }

    if (filterPublishedAt.value.length > 0) {
      filterPublishedAt.value.forEach((date: any) => {
        if (date) {
          const formattedDate = dayjs(date).format("YYYY-MM-DD");
          published_at_arr.push(formattedDate);
        }
      });

      const published_at_string = published_at_arr.join(",");

      params = {
        ...params,
        published_at: published_at_string,
      };
    } else {
      delete params.published_at;
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

const handleAPIFetchBlogs = async () => {
  let params = {
    page: paginate.page + 1,
    limit: paginate.limit,
    sort: sorts.sort,
    order: sorts.order,
  } as TBaseParamsBlog;

  params = setFilters(params);

  await fetchBlogs(params);
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
      await deleteBlog(id);
      await fetchBlogs({
        page: paginate.page + 1,
        limit: paginate.limit,
      });
    },
    reject: () => {},
  });
};

onMounted(async () => {
  await handleAPIFetchBlogs();
});
</script>
<style lang=""></style>
