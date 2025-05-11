import { ref } from "vue";
import { useRoute } from "vue-router";
import type { AxiosResponse } from "axios";
import type {
  TBasePaginateResponse,
  TBaseResponse,
} from "~/types/base.type";
import type { TBaseParamsExperience, TExperience } from "~/types/experience.type";

export const useExperienceAPI = () => {
  const { $axios } = useNuxtApp();
  const loading = ref(false);
  const error = ref(null);
  const experienceData = ref<TExperience | null>(null);
  const experienceListData = ref<TExperience[]>([]);
  const totalRecords = ref(0);
  const route = useRoute();
  const alertStore = useAlertStore();

  const fetchExperience = async () => {
    loading.value = true;
    try {
      const { data }: AxiosResponse<TBaseResponse<TExperience>> = await $axios.get(
        `/api/experiences/${route.params.id}`
      );
      experienceData.value = data.data;

      loading.value = false;
    } catch (err: any) {
      error.value = err;
      loading.value = false;
    }
  };

  const fetchExperiences = async (params: TBaseParamsExperience) => {
    loading.value = true;
    try {
      const {
        data,
      }: AxiosResponse<TBaseResponse<TBasePaginateResponse<TExperience[]>>> =
        await $axios.get(`/api/experiences`, {
          params: {
            ...params,
          },
        });

      const res = data.data;
      
      experienceListData.value = res.items;
      totalRecords.value = res.pagination.total;

      loading.value = false;
    } catch (error) {
      loading.value = false;
    }
  };

  const updateExperience = async (payload: any) => {
    loading.value = true;
    try {
      const { data }: AxiosResponse<TBaseResponse<any>> = await $axios.post(
        "/api/experiences/update",
        payload,
      );

      const message = toCapitalize(data.message);

      alertStore.setAlert({
        severity: "info",
        summary: message,
        show_alert: true,
      });

      loading.value = false;
      navigateTo("/adminz/experience");
    } catch (error: any) {
      loading.value = false;
      resultErrMessage(error);
    }
  };

  const storeExperience = async (payload: any) => {
    try {
      loading.value = true;
      const { data }: AxiosResponse<TBaseResponse<any>> = await $axios.post(
        "/api/experiences/store",
        payload
      );

      const message = toCapitalize(data.message);

      alertStore.setAlert({
        severity: "info",
        summary: message,
        show_alert: true,
      });

      loading.value = false;
      navigateTo("/adminz/experience");
    } catch (error: any) {
      loading.value = false;
      resultErrMessage(error);
    }
  };

  const deleteExperience = async (id: number) => {
    loading.value = true;
    try {
      const { data }: AxiosResponse<TBaseResponse<any>> = await $axios.post(
        `/api/experiences/delete`,
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
    experienceData,
    experienceListData,
    fetchExperience,
    updateExperience,
    storeExperience,
    fetchExperiences,
    deleteExperience,
  };
};
