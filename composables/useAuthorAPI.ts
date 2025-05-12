import { ref } from "vue";
import { useRoute } from "vue-router";
import type { AxiosResponse } from "axios";
import type { TBasePaginateResponse, TBaseResponse } from "~/types/base.type";
import type { TAuthor, TBaseParamsAuthor, TPublicAuthor } from "~/types/author.type";

export const useAuthorAPI = () => {
  const axios = useAxios();
  const loading = ref(false);
  const error = ref(null);
  const authorData = ref<TAuthor | null>(null);
  const authorListData = ref<TAuthor[]>([]);
  const authorPublicListData = ref<TPublicAuthor[]>([]);
  const totalRecords = ref(0);
  const route = useRoute();
  const alertStore = useAlertStore();

  const fetchAuthor = async () => {
    loading.value = true;
    try {
      const { data }: AxiosResponse<TBaseResponse<TAuthor>> = await axios.get(
        `/api/authors/${route.params.id}`
      );

      authorData.value = data.data;

      loading.value = false;
    } catch (err: any) {
      error.value = err;
      loading.value = false;
    }
  };

  const fetchAuthors = async (params: TBaseParamsAuthor) => {
    loading.value = true;
    try {
      const {
        data,
      }: AxiosResponse<TBaseResponse<TBasePaginateResponse<TAuthor[]>>> =
        await axios.get(`/api/authors`, {
          params: {
            ...params,
          },
        });

      const res = data.data;

      authorListData.value = res.items;
      totalRecords.value = res.pagination.total;

      loading.value = false;
    } catch (error) {
      loading.value = false;
    }
  };

  const updateAuthor = async (payload: any) => {
    try {
      loading.value = true;
      const { data }: AxiosResponse<TBaseResponse<any>> = await axios.post(
        "/api/authors/update",
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

      loading.value = false;
      navigateTo("/adminz/author");
    } catch (error: any) {
      loading.value = false;
      resultErrMessage(error);
    }
  };

  const storeAuthor = async (payload: any) => {
    try {
      loading.value = true;
      const { data }: AxiosResponse<TBaseResponse<any>> = await axios.post(
        "/api/authors/store",
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

      loading.value = false;
      navigateTo("/adminz/author");
    } catch (error: any) {
      loading.value = false;
      resultErrMessage(error);
    }
  };

  const deleteAuthor = async (id: number) => {
    loading.value = true;
    try {
      const { data }: AxiosResponse<TBaseResponse<any>> = await axios.post(
        `/api/authors/delete`,
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

  const fetchPublicAuthors = async () => {
    loading.value = true;
    try {
      const {
        data,
      }: AxiosResponse<TBaseResponse<TPublicAuthor[]>> =
        await axios.get(`/api-public/authors`);

      const res = data.data;

      authorPublicListData.value = res;

      loading.value = false;
    } catch (error) {
      loading.value = false;
    }
  };

  const resultErrMessage = (error: any) => {
    const errData = error.response.data;

    if (errData.errors) {
      if (errData.errors.length > 0) {
        alertStore.setAlert({
          severity: "error",
          summary: errData.errors[0].message,
          show_alert: true,
        });
      }
    } else {
      alertStore.setAlert({
        severity: "error",
        summary: errData.message,
        show_alert: true,
      });
    }
  };

  return {
    loading,
    error,
    totalRecords,
    authorData,
    authorListData,
    authorPublicListData,
    fetchAuthor,
    updateAuthor,
    storeAuthor,
    fetchAuthors,
    deleteAuthor,
    fetchPublicAuthors,
  };
};
