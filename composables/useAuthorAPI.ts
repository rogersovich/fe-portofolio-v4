import { ref } from "vue";
import { useRoute } from "vue-router";
import type { AxiosResponse } from "axios";
import type {
  TBasePaginateParams,
  TBasePaginateResponse,
  TBaseResponse,
  TBaseSortingParams,
} from "~/types/base.type";
import type { TAuthor, TParamsFilterAuthor } from "~/types/author.type";

export const useAuthorAPI = () => {
  const { $axios } = useNuxtApp();
  const loading = ref(false);
  const error = ref(null);
  const authorData = ref<TAuthor | null>(null);
  const authorListData = ref<TAuthor[]>([]);
  const totalRecords = ref(0);
  const route = useRoute();
  const alertStore = useAlertStore();

  const fetchAuthor = async () => {
    loading.value = true;
    try {
      // Fetch author data from the API
      const { data }: AxiosResponse<TBaseResponse<TAuthor>> = await $axios.get(
        `/authors/${route.params.id}`
      );

      // Assuming `data.data` contains the author information
      authorData.value = data.data;

      loading.value = false;
    } catch (err: any) {
      error.value = err;
      loading.value = false;
    }
  };

  const fetchAuthors = async (params: TBasePaginateParams & Partial<TBaseSortingParams> & Partial<TParamsFilterAuthor>) => {
    loading.value = true;
    try {
      const {
        data,
      }: AxiosResponse<TBaseResponse<TBasePaginateResponse<TAuthor[]>>> =
        await $axios.get(`/authors`, {
          params: {
            ...params,
          },
        });

      const res = data.data;
      
      if (res.items.length > 0) {
        authorListData.value = res.items;
        totalRecords.value = res.pagination.total;
      }

      loading.value = false;
    } catch (error) {
      loading.value = false;
    }
  };

  const updateAuthor = async (payload: any) => {
    try {
      const { data }: AxiosResponse<TBaseResponse<any>> = await $axios.post(
        "/authors/update",
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const message = toCapitalize(data.message);

      alertStore.setAlert({
        severity: "info",
        summary: message,
        show_alert: true,
      });

      navigateTo("/adminz/author");
    } catch (error: any) {
      alertStore.setAlert({
        severity: "error",
        summary: error.message,
        show_alert: true,
      });
    }
  };

  const storeAuthor = async (payload: any) => {
    try {
      const { data }: AxiosResponse<TBaseResponse<any>> = await $axios.post(
        "/authors/store",
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const message = toCapitalize(data.message);

      alertStore.setAlert({
        severity: "info",
        summary: message,
        show_alert: true,
      });

      navigateTo("/adminz/author");
    } catch (error: any) {
      loading.value = false;
      alertStore.setAlert({
        severity: "error",
        summary: error.message,
        show_alert: true,
      });
    }
  };

  const deleteAuthor = async (id: number) => {
    loading.value = true;
    try {
      const { data }: AxiosResponse<TBaseResponse<any>> = await $axios.post(
        `/authors/delete`,
        {
          id,
        }
      );

      const message = toCapitalize(data.message);

      alertStore.setAlert({
        severity: "info",
        summary: message,
        show_alert: true,
      });

      loading.value = false;
    } catch (error) {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    totalRecords,
    authorData,
    authorListData,
    fetchAuthor,
    updateAuthor,
    storeAuthor,
    fetchAuthors,
    deleteAuthor,
  };
};
