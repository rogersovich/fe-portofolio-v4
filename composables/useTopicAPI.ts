import { ref } from "vue";
import { useRoute } from "vue-router";
import type { AxiosResponse } from "axios";
import type {
  TBasePaginateResponse,
  TBaseResponse,
} from "~/types/base.type";
import type { TBaseParamsTopic, TPublicTopic, TTopic } from "~/types/topic.type";

export const useTopicAPI = () => {
  const { $axios } = useNuxtApp() as unknown as any;
  const loading = ref(false);
  const error = ref(null);
  const topicData = ref<TTopic | null>(null);
  const topicListData = ref<TTopic[]>([]);
  const topicPublicListData = ref<TPublicTopic[]>([]);
  const totalRecords = ref(0);
  const route = useRoute();
  const alertStore = useAlertStore();

  const fetchTopic = async () => {
    loading.value = true;
    try {
      const { data }: AxiosResponse<TBaseResponse<TTopic>> = await $axios.get(
        `/api/topics/${route.params.id}`
      );

      topicData.value = data.data;

      loading.value = false;
    } catch (err: any) {
      error.value = err;
      loading.value = false;
    }
  };

  const fetchTopics = async (params: TBaseParamsTopic) => {
    loading.value = true;
    try {
      const {
        data,
      }: AxiosResponse<TBaseResponse<TBasePaginateResponse<TTopic[]>>> =
        await $axios.get(`/api/topics`, {
          params: {
            ...params,
          },
        });

      const res = data.data;
      
      topicListData.value = res.items;
      totalRecords.value = res.pagination.total;

      loading.value = false;
    } catch (error) {
      loading.value = false;
    }
  };

  const updateTopic = async (payload: any) => {
    loading.value = true;
    try {
      const { data }: AxiosResponse<TBaseResponse<any>> = await $axios.post(
        "/api/topics/update",
        payload,
      );

      const message = toCapitalize(data.message);

      alertStore.setAlert({
        severity: "info",
        summary: message,
        show_alert: true,
      });

      loading.value = false;
      navigateTo("/adminz/topic");
    } catch (error: any) {
      loading.value = false;
      resultErrMessage(error);
    }
  };

  const storeTopic = async (payload: any) => {
    try {
      loading.value = true;
      const { data }: AxiosResponse<TBaseResponse<any>> = await $axios.post(
        "/api/topics/store",
        payload
      );

      const message = toCapitalize(data.message);

      alertStore.setAlert({
        severity: "info",
        summary: message,
        show_alert: true,
      });

      loading.value = false;
      navigateTo("/adminz/topic");
    } catch (error: any) {
      loading.value = false;
      resultErrMessage(error);
    }
  };

  const deleteTopic = async (id: number) => {
    loading.value = true;
    try {
      const { data }: AxiosResponse<TBaseResponse<any>> = await $axios.post(
        `/api/topics/delete`,
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

  const fetchPublicTopics = async () => {
    loading.value = true;
    try {
      const {
        data,
      }: AxiosResponse<TBaseResponse<TPublicTopic[]>> =
        await $axios.get(`/api-public/topics`);

      const res = data.data;

      topicPublicListData.value = res;

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
    topicData,
    topicListData,
    topicPublicListData,
    fetchTopic,
    updateTopic,
    storeTopic,
    fetchTopics,
    deleteTopic,
    fetchPublicTopics,
  };
};
