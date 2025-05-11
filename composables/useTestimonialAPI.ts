import { ref } from "vue";
import { useRoute } from "vue-router";
import type { AxiosResponse } from "axios";
import type { TBasePaginateResponse, TBaseResponse } from "~/types/base.type";
import type {
  TBaseParamsTestimonial,
  TTestimonial,
} from "~/types/testimonial.type";

export const useTestimonialAPI = () => {
  const { $axios } = useNuxtApp();
  const loading = ref(false);
  const error = ref(null);
  const testimonialData = ref<TTestimonial | null>(null);
  const testimonialListData = ref<TTestimonial[]>([]);
  const totalRecords = ref(0);
  const route = useRoute();
  const alertStore = useAlertStore();

  const fetchTestimonial = async () => {
    loading.value = true;
    try {
      const { data }: AxiosResponse<TBaseResponse<TTestimonial>> =
        await $axios.get(`/api/testimonials/${route.params.id}`);

      testimonialData.value = data.data;

      loading.value = false;
    } catch (err: any) {
      error.value = err;
      loading.value = false;
    }
  };

  const fetchTestimonials = async (params: TBaseParamsTestimonial) => {
    loading.value = true;
    try {
      const {
        data,
      }: AxiosResponse<TBaseResponse<TBasePaginateResponse<TTestimonial[]>>> =
        await $axios.get(`/api/testimonials`, {
          params: {
            ...params,
          },
        });

      const res = data.data;

      testimonialListData.value = res.items;
      totalRecords.value = res.pagination.total;

      loading.value = false;
    } catch (error) {
      loading.value = false;
    }
  };

  const updateTestimonial = async (payload: any) => {
    loading.value = true;
    try {
      const { data }: AxiosResponse<TBaseResponse<any>> = await $axios.post(
        "/api/testimonials/update",
        payload
      );

      const message = toCapitalize(data.message);

      alertStore.setAlert({
        severity: "info",
        summary: message,
        show_alert: true,
      });

      loading.value = false;
      navigateTo("/adminz/testimonial");
    } catch (error: any) {
      loading.value = false;
      resultErrMessage(error);
    }
  };

  const storeTestimonial = async (payload: any) => {
    try {
      loading.value = true;
      const { data }: AxiosResponse<TBaseResponse<any>> = await $axios.post(
        "/api/testimonials/store",
        payload
      );

      const message = toCapitalize(data.message);

      alertStore.setAlert({
        severity: "info",
        summary: message,
        show_alert: true,
      });

      loading.value = false;
      navigateTo("/adminz/testimonial");
    } catch (error: any) {
      loading.value = false;
      resultErrMessage(error);
    }
  };

  const deleteTestimonial = async (id: number) => {
    loading.value = true;
    try {
      const { data }: AxiosResponse<TBaseResponse<any>> = await $axios.post(
        `/api/testimonials/delete`,
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
    testimonialData,
    testimonialListData,
    fetchTestimonial,
    updateTestimonial,
    storeTestimonial,
    fetchTestimonials,
    deleteTestimonial,
  };
};
