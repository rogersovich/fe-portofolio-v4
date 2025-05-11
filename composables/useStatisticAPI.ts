import { ref } from "vue";
import { useRoute } from "vue-router";
import type { AxiosResponse } from "axios";
import type { TBasePaginateResponse, TBaseResponse } from "~/types/base.type";
import type { TBaseParamsStatistic, TStatistic } from "~/types/statistic.type";

export const useStatisticAPI = () => {
  const { $axios } = useNuxtApp();
  const loading = ref(false);
  const error = ref(null);
  const statisticData = ref<TStatistic | null>(null);
  const statisticListData = ref<TStatistic[]>([]);
  const totalRecords = ref(0);
  const route = useRoute();
  const alertStore = useAlertStore();

  const fetchStatistic = async () => {
    loading.value = true;
    try {
      const { data }: AxiosResponse<TBaseResponse<TStatistic>> =
        await $axios.get(`/api/statistics/${route.params.id}`);

      statisticData.value = data.data;

      loading.value = false;
    } catch (err: any) {
      error.value = err;
      loading.value = false;
    }
  };

  const fetchStatistics = async (params: TBaseParamsStatistic) => {
    loading.value = true;
    try {
      const {
        data,
      }: AxiosResponse<TBaseResponse<TBasePaginateResponse<TStatistic[]>>> =
        await $axios.get(`/api/statistics`, {
          params: {
            ...params,
          },
        });

      const res = data.data;

      statisticListData.value = res.items;
      totalRecords.value = res.pagination.total;

      loading.value = false;
    } catch (error) {
      loading.value = false;
    }
  };

  const updateStatistic = async (payload: any) => {
    try {
      loading.value = true;
      const { data }: AxiosResponse<TBaseResponse<any>> = await $axios.post(
        "/api/statistics/update",
        payload
      );

      const message = toCapitalize(data.message);

      alertStore.setAlert({
        severity: "info",
        summary: message,
        show_alert: true,
      });

      loading.value = false;
      navigateTo("/adminz/statistic");
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
    statisticData,
    statisticListData,
    fetchStatistic,
    updateStatistic,
    fetchStatistics,
  };
};
