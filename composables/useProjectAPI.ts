import { ref } from "vue";
import { useRoute } from "vue-router";
import type { AxiosResponse } from "axios";
import type { TBasePaginateResponse, TBaseResponse } from "~/types/base.type";
import type { TBaseParamsProject, TProject } from "~/types/project.type";

export const useProjectAPI = () => {
  const { $axios } = useNuxtApp();
  const loading = ref(false);
  const error = ref(null);
  const projectData = ref<TProject | null>(null);
  const projectListData = ref<TProject[]>([]);
  const totalRecords = ref(0);
  const route = useRoute();
  const alertStore = useAlertStore();

  const fetchProject = async () => {
    loading.value = true;
    try {
      const { data }: AxiosResponse<TBaseResponse<TProject>> =
        await $axios.get(`/api/projects/${route.params.id}`);

      projectData.value = data.data;

      loading.value = false;
    } catch (err: any) {
      error.value = err;
      loading.value = false;
    }
  };

  const fetchProjects = async (params: TBaseParamsProject) => {
    loading.value = true;
    try {
      const {
        data,
      }: AxiosResponse<TBaseResponse<TBasePaginateResponse<TProject[]>>> =
        await $axios.get(`/api/projects`, {
          params: {
            ...params,
          },
        });

      const res = data.data;

      projectListData.value = res.items;
      totalRecords.value = res.pagination.total;

      loading.value = false;
    } catch (error) {
      loading.value = false;
    }
  };

  const updateProject = async (payload: any) => {
    try {
      const { data }: AxiosResponse<TBaseResponse<any>> = await $axios.post(
        "/api/projects/update",
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

      navigateTo("/adminz/project");
    } catch (error: any) {
      alertStore.setAlert({
        severity: "error",
        summary: error.message,
        show_alert: true,
      });
    }
  };

  const storeProject = async (payload: any) => {
    try {
      loading.value = true;
      const { data }: AxiosResponse<TBaseResponse<any>> = await $axios.post(
        "/api/projects/store",
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
      navigateTo("/adminz/project");
    } catch (error: any) {
      resultErrMessage(error);
      loading.value = false;
    }
  };

  const deleteProject = async (id: number) => {
    loading.value = true;
    try {
      const { data }: AxiosResponse<TBaseResponse<any>> = await $axios.post(
        `/api/projects/delete`,
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

    if (errData.errors.length > 0) {
      alertStore.setAlert({
        severity: "error",
        summary: errData.errors[0].message,
        show_alert: true,
      });
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
    projectData,
    projectListData,
    fetchProject,
    fetchProjects,
    updateProject,
    storeProject,
    deleteProject,
  };
};
