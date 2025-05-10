import { ref } from "vue";
import { useRoute } from "vue-router";
import type { AxiosResponse } from "axios";
import type { TBasePaginateResponse, TBaseResponse } from "~/types/base.type";
import type { TBaseParamsUser, TMasterUser } from "~/types/user.type";

export const useUserAPI = () => {
  const { $axios } = useNuxtApp();
  const loading = ref(false);
  const error = ref(null);
  const userData = ref<TMasterUser | null>(null);
  const userListData = ref<TMasterUser[]>([]);
  const totalRecords = ref(0);
  const route = useRoute();
  const alertStore = useAlertStore();

  const fetchUser = async () => {
    loading.value = true;
    try {
      const { data }: AxiosResponse<TBaseResponse<TMasterUser>> =
        await $axios.get(`/users/${route.params.id}`);

      userData.value = data.data;

      loading.value = false;
    } catch (err: any) {
      error.value = err;
      loading.value = false;
    }
  };

  const fetchUsers = async (params: TBaseParamsUser) => {
    loading.value = true;
    try {
      const {
        data,
      }: AxiosResponse<TBaseResponse<TBasePaginateResponse<TMasterUser[]>>> =
        await $axios.get(`/users`, {
          params: {
            ...params,
          },
        });

      const res = data.data;

      userListData.value = res.items;
      totalRecords.value = res.pagination.total;

      loading.value = false;
    } catch (error) {
      loading.value = false;
    }
  };

  const updateUser = async (payload: any) => {
    try {
      const { data }: AxiosResponse<TBaseResponse<any>> = await $axios.post(
        "/users/update",
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

      navigateTo("/adminz/user");
    } catch (error: any) {
      alertStore.setAlert({
        severity: "error",
        summary: error.message,
        show_alert: true,
      });
    }
  };

  return {
    loading,
    error,
    totalRecords,
    userData,
    userListData,
    fetchUser,
    updateUser,
    fetchUsers,
  };
};
