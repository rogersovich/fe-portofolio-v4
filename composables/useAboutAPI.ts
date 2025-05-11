import type { AxiosResponse } from "axios";
import type { TAbout } from "~/types/about.type";
import type { TBaseResponse } from "~/types/base.type";

export const useAboutAPI = () => {
  const { $axios } = useNuxtApp() as unknown as any;
  const loading = ref(false);
  const error = ref(null);
  const aboutData = ref<TAbout | null>(null);
  const route = useRoute();
  const alertStore = useAlertStore();

  const fetchAbout = async () => {
    loading.value = true;
    try {
      const { data }: AxiosResponse<TBaseResponse<TAbout>> = await $axios.get(
        `/api/abouts/${route.params.id}`
      );

      aboutData.value = data.data;

      loading.value = false;
    } catch (err: any) {
      error.value = err;
      loading.value = false;
    }
  };

  const fetchAbouts = async () => {
    loading.value = true;
    try {
      const { data }: AxiosResponse<TBaseResponse<TAbout[]>> = await $axios.get(
        `/api/abouts`
      );

      if (data.data.length > 0) {
        aboutData.value = data.data[0];
      }

      loading.value = false;
    } catch (err: any) {
      error.value = err;
      loading.value = false;
    }
  };

  const updateAbout = async (payload: any) => {
    try {
      const { data }: AxiosResponse<TBaseResponse<any>> = await $axios.post(
        "/api/abouts/update",
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

      navigateTo("/adminz/about");
    } catch (error: any) {
      loading.value = false;
      resultErrMessage(error);
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
    aboutData,
    fetchAbout,
    fetchAbouts,
    updateAbout,
  };
};
