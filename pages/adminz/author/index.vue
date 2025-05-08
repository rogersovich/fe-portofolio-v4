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
        :loading="loadingAuthorDelete || loadingAuthor"
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
import type { TAuthor } from "~/types/author.type";

useHead({
  title: "Admin - Author",
  titleTemplate: "%s | Portofolio",
});

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const confirm = useConfirm();

const first = ref(0);
const rows = ref(5);
const sortField = ref("");
const sortOrder = ref(1);
const filters = ref({
  name: { value: "", matchMode: "contains" },
  created_at: { value: "", matchMode: "contains" },
});
const authors = ref<TAuthor[]>([]);

// Debounced filter callback function with a 500ms delay (adjust as needed)
const debouncedFilterCallback = useDebounceFn(
  ({ field, value }: { field: string; value: any }) => {
    console.log({ field, value });
  },
  500
);

// Fetch author list data
const { loading: loadingAuthor, authorListData, fetchAuthors, totalRecords } = useAuthorAPI();

// Delete author
const { loading: loadingAuthorDelete, deleteAuthor} = useAuthorAPI();

watch(
  () => [authorListData.value],
  () => {
    authors.value = authorListData.value;
  }
);

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
      await fetchAuthors();
    },
    reject: () => {},
  });
};

onMounted(async() => {
  await fetchAuthors();
});
</script>
<style></style>
