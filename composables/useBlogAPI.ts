import { ref } from "vue";
import { useRoute } from "vue-router";
import type { AxiosResponse } from "axios";
import type { TBasePaginateResponse, TBaseResponse } from "~/types/base.type";
import type { TBaseParamsBlog, TBlog, TBlogDetail } from "~/types/blog.type";

export const useBlogAPI = () => {
  const axios = useAxios();
  const loading = ref(false);
  const error = ref(null);
  const blogData = ref<TBlogDetail | null>(null);
  const blogListData = ref<TBlog[]>([]);
  const totalRecords = ref(0);
  const route = useRoute();
  const alertStore = useAlertStore();

  const fetchBlog = async () => {
    loading.value = true;
    try {
      const { data }: AxiosResponse<TBaseResponse<TBlogDetail>> =
        await axios.get(`/api/blogs/${route.params.id}`);

      blogData.value = data.data;

      loading.value = false;
    } catch (err: any) {
      error.value = err;
      loading.value = false;
    }
  };

  const fetchBlogs = async (params: TBaseParamsBlog) => {
    loading.value = true;
    try {
      const {
        data,
      }: AxiosResponse<TBaseResponse<TBasePaginateResponse<TBlog[]>>> =
        await axios.get(`/api/blogs`, {
          params: {
            ...params,
          },
        });

      const res = data.data;

      blogListData.value = res.items;
      totalRecords.value = res.pagination.total;

      loading.value = false;
    } catch (error) {
      loading.value = false;
    }
  };

  const updateBlog = async (payload: any) => {
    loading.value = true;
    try {
      const { data }: AxiosResponse<TBaseResponse<any>> = await axios.post(
        "/api/blogs/update",
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
      navigateTo("/adminz/blog");
    } catch (error: any) {
      loading.value = false;
      resultErrMessage(error);
    }
  };

  const storeBlog = async (payload: any) => {
    try {
      loading.value = true;
      const { data }: AxiosResponse<TBaseResponse<any>> = await axios.post(
        "/api/blogs/store",
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
      navigateTo("/adminz/blog");
    } catch (error: any) {
      loading.value = false;
      resultErrMessage(error);
    }
  };

  const deleteBlog = async (id: number) => {
    loading.value = true;
    try {
      const { data }: AxiosResponse<TBaseResponse<any>> = await axios.post(
        `/api/blogs/delete`,
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
    blogData,
    blogListData,
    fetchBlog,
    fetchBlogs,
    updateBlog,
    storeBlog,
    deleteBlog,
  };
};
