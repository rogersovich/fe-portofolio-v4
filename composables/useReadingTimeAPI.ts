import { ref } from "vue";
import { useRoute } from "vue-router";
import type { AxiosResponse } from "axios";
import type { TBasePaginateResponse, TBaseResponse } from "~/types/base.type";
import type {
  TBaseParamsReadingTime,
  TReadingTime,
} from "~/types/reading_time.type";

export const useReadingTimeAPI = () => {
  const { $axios } = useNuxtApp() as unknown as any;
  const loading = ref(false);
  const error = ref(null);
  const readingTimeData = ref<TReadingTime | null>(null);
  const readingTimeListData = ref<TReadingTime[]>([]);
  const totalRecords = ref(0);
  const route = useRoute();
  const alertStore = useAlertStore();

  const fetchReadingTime = async () => {
    loading.value = true;
    try {
      const { data }: AxiosResponse<TBaseResponse<TReadingTime>> =
        await $axios.get(`/api/reading-times/${route.params.id}`);

      readingTimeData.value = data.data;

      loading.value = false;
    } catch (err: any) {
      error.value = err;
      loading.value = false;
    }
  };

  const fetchReadingTimes = async (params: TBaseParamsReadingTime) => {
    loading.value = true;
    try {
      const {
        data,
      }: AxiosResponse<TBaseResponse<TBasePaginateResponse<TReadingTime[]>>> =
        await $axios.get(`/api/reading-times`, {
          params: {
            ...params,
          },
        });

      const res = data.data;

      readingTimeListData.value = res.items;
      totalRecords.value = res.pagination.total;

      loading.value = false;
    } catch (error) {
      loading.value = false;
    }
  };

  const updateReadingTime = async (payload: any) => {
    try {
      loading.value = true;
      const { data }: AxiosResponse<TBaseResponse<any>> = await $axios.post(
        "/api/reading-times/update",
        payload
      );

      const message = toCapitalize(data.message);

      alertStore.setAlert({
        severity: "info",
        summary: message,
        show_alert: true,
      });

      loading.value = false;
      navigateTo("/adminz/reading-time");
    } catch (error: any) {
      resultErrMessage(error);
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
    readingTimeData,
    readingTimeListData,
    fetchReadingTime,
    updateReadingTime,
    fetchReadingTimes,
  };
};
