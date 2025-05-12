// composables/useAxios.ts
import axios, { type AxiosInstance } from "axios";

export const useAxios = () => {
  const authStore = useAuthStore();
  const config = useRuntimeConfig();

  // Function to create the axios instance
  const createAxiosInstance = (): AxiosInstance => {
    const axiosInstance = axios.create({
      baseURL: config.public.apiBase,
      headers: {
        Authorization: `Bearer ${authStore.getToken()}`,
      },
    });

    // Request interceptor
    axiosInstance.interceptors.request.use(
      (config) => {
        // You can modify the config here if needed
        return config;
      },
      (error) => {
        console.error("Request error: ", error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    axiosInstance.interceptors.response.use(
      (response) => {
        return response; // Simply return the response data as is
      },
      (error) => {
        console.error("Response error: ", error.response || error.message);

        // Example: handle 401 (Unauthorized) errors, maybe redirect to login
        if (error.response && error.response.status === 401) {
          authStore.logout();
          navigateTo("/authz/login");
        }

        return Promise.reject(error);
      }
    );

    return axiosInstance;
  };

  // Return the axios instance
  return createAxiosInstance();
};
