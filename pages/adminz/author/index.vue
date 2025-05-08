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
        :rows="rows"
        :totalRecords="totalRecords"
        :lazy="true"
        :first="first"
        :sortField="sortField"
        :sortOrder="sortOrder"
        :loading="loading"
        filterDisplay="row"
        v-model:filters="filters"
        ref="dt"
        @page="onPageChange"
        @sort="onSortChange"
      >
        <template #header>
          <div class="flex flex-wrap items-center justify-between gap-2">
            <span class="text-lg font-bold">List Author</span>
            <div class="flex items-center justify-center gap-4">
              <Button variant="filled" class="py-2.5 bg-blue-600 !border-none hover:!bg-blue-700 !text-white">
                <IconPlus class="size-5" />
              </Button>
              <Button
                icon="pi pi-refresh"
                class="!text-white bg-zinc-600 hover:!bg-zinc-700 !border-none"
                rounded
                raised
                @click="fetchAuthors"
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
        >
          <template #body="{ index }"> {{ index + 1 }} </template></Column
        >
        <Column
          field="avatar_url"
          header="Avatar"
          :showFilterMenu="false"
          headerClass="w-[100px]"
        >
          <template #body="{ data }">
            <NuxtImg :src="data.avatar_url" fit="cover" class="rounded-md" />
          </template>
        </Column>
        <Column field="name" header="Name" :showFilterMenu="false">
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
              disabled
            />
          </template>
        </Column>
        <Column
          field="created_at"
          header="Created At"
          sortable
          :showFilterMenu="false"
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
              placeholder="Code"
              fluid
              disabled
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
                to="/adminz/author/create"
                class="cursor-pointer hover:bg-zinc-50/[.05] p-2 rounded-md"
              >
                <IconEdit class="size-6 text-orange-500" />
              </NuxtLink>
              <div class="cursor-pointer hover:bg-zinc-50/[.05] p-2 rounded-md">
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
import type { AxiosResponse } from "axios";
import type { TAuthor } from "~/types/author.type";
import type { TBaseResponse } from "~/types/base.type";

useHead({
  title: "Admin - Author",
  titleTemplate: "%s | Portofolio",
});

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const { $axios } = useNuxtApp();
const totalRecords = ref(5);
const first = ref(0);
const rows = ref(2);
const sortField = ref("");
const sortOrder = ref(1);
const filters = ref({
  name: { value: "", matchMode: "contains" },
  created_at: { value: "", matchMode: "contains" },
});
const loading = ref(false);
const authors = ref<TAuthor[]>([]);

// Debounced filter callback function with a 500ms delay (adjust as needed)
const debouncedFilterCallback = useDebounceFn(
  ({ field, value }: { field: string; value: any }) => {
    console.log({ field, value });
  },
  500
);

const products = reactive([
  {
    id: "1000",
    code: "f230fh0g3",
    name: "Bamboo Watch",
    description: "Product Description",
    image: "bamboo-watch.jpg",
    price: 65,
    category: "Accessories",
    quantity: 24,
    inventoryStatus: "INSTOCK",
    rating: 5,
  },
  {
    id: "1001",
    code: "nvklal433",
    name: "Black Watch",
    description: "Product Description",
    image: "black-watch.jpg",
    price: 72,
    category: "Accessories",
    quantity: 61,
    inventoryStatus: "INSTOCK",
    rating: 4,
  },
  {
    id: "1002",
    code: "zz21cz3c1",
    name: "Blue Band",
    description: "Product Description",
    image: "blue-band.jpg",
    price: 79,
    category: "Fitness",
    quantity: 2,
    inventoryStatus: "LOWSTOCK",
    rating: 3,
  },
  {
    id: "1003",
    code: "zz21cz3c1",
    name: "Blue Band",
    description: "Product Description",
    image: "blue-band.jpg",
    price: 79,
    category: "Fitness",
    quantity: 2,
    inventoryStatus: "LOWSTOCK",
    rating: 3,
  },
  {
    id: "1004",
    code: "zz21cz3c1",
    name: "Blue Band",
    description: "Product Description",
    image: "blue-band.jpg",
    price: 79,
    category: "Fitness",
    quantity: 2,
    inventoryStatus: "LOWSTOCK",
    rating: 3,
  },
]);

const fetchAuthors = async () => {
  loading.value = true;
  try {
    const { data }: AxiosResponse<TBaseResponse<TAuthor[]>> = await $axios.get(
      `/authors`
    );

    const res = data.data;

    if (res.length > 0) {
      authors.value = res;
    }

    loading.value = false;
  } catch (error) {
    loading.value = false;
  }
};

const onPageChange = (event: any) => {
  first.value = event.first;
  rows.value = event.rows;
  console.log(event);
};

// Event handler for sorting
const onSortChange = (event: any) => {
  sortField.value = event.sortField;
  sortOrder.value = event.sortOrder;
  console.log(event);
};

function onFilter(event: any) {
  filters.value = event.filters;

  console.log(event);
}

onMounted(() => {
  fetchAuthors();
});
</script>
<style></style>
