import { ref } from "vue";
import { useRoute } from "vue-router";
import type { AxiosResponse } from "axios";
import type { TBasePaginateResponse, TBaseResponse } from "~/types/base.type";
import type {
  TBaseParamsTechnology,
  TPublicTechnology,
  TTechnology,
} from "~/types/technology.type";

export const useTechnologyAPI = () => {
  const { $axios } = useNuxtApp();
  const loading = ref(false);
  const error = ref(null);
  const technologyData = ref<TTechnology | null>(null);
  const technologyListData = ref<TTechnology[]>([]);
  const technologyPublicListData = ref<TPublicTechnology[]>([]);
  const totalRecords = ref(0);
  const route = useRoute();
  const alertStore = useAlertStore();

  const fetchTechnology = async () => {
    loading.value = true;
    try {
      const { data }: AxiosResponse<TBaseResponse<TTechnology>> =
        await $axios.get(`/api/technologies/${route.params.id}`);

      technologyData.value = data.data;

      loading.value = false;
    } catch (err: any) {
      error.value = err;
      loading.value = false;
    }
  };

  const fetchTechnologies = async (params: TBaseParamsTechnology) => {
    loading.value = true;
    try {
      const {
        data,
      }: AxiosResponse<TBaseResponse<TBasePaginateResponse<TTechnology[]>>> =
        await $axios.get(`/api/technologies`, {
          params: {
            ...params,
          },
        });

      const res = data.data;

      technologyListData.value = res.items;
      totalRecords.value = res.pagination.total;

      loading.value = false;
    } catch (error) {
      loading.value = false;
    }
  };

  const updateTechnology = async (payload: any) => {
    loading.value = true;
    try {
      const { data }: AxiosResponse<TBaseResponse<any>> = await $axios.post(
        "/api/technologies/update",
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
      navigateTo("/adminz/technology");
    } catch (error: any) {
      loading.value = false;
      resultErrMessage(error);
    }
  };

  const storeTechnology = async (payload: any) => {
    try {
      loading.value = true;
      const { data }: AxiosResponse<TBaseResponse<any>> = await $axios.post(
        "/api/technologies/store",
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
      navigateTo("/adminz/technology");
    } catch (error: any) {
      loading.value = false;
      resultErrMessage(error);
    }
  };

  const deleteTechnology = async (id: number) => {
    loading.value = true;
    try {
      const { data }: AxiosResponse<TBaseResponse<any>> = await $axios.post(
        `/api/technologies/delete`,
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

  const fetchPublicTechnologies = async () => {
    loading.value = true;
    try {
      const {
        data,
      }: AxiosResponse<TBaseResponse<TPublicTechnology[]>> =
        await $axios.get(`/api-public/technologies`);

      const res = data.data;

      technologyPublicListData.value = res;

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
    technologyData,
    technologyListData,
    technologyPublicListData,
    fetchTechnology,
    fetchTechnologies,
    updateTechnology,
    storeTechnology,
    deleteTechnology,
    fetchPublicTechnologies,
  };
};
