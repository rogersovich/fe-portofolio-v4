import axios, { type AxiosInstance } from "axios";

export default defineNuxtPlugin(() => {
  const authStore = useAuthStore();
  const nuxtApp = useNuxtApp();
  const config = useRuntimeConfig()

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
        // You can return the config object to send it out
        return config;
      },
      (error) => {
        // Handle request errors globally
        console.error("Request error: ", error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    axiosInstance.interceptors.response.use(
      (response) => {
        return response; // Return the response data as is
      },
      (error) => {
        // Handle response errors globally
        console.error("Response error: ", error.response || error.message);

        // Example: handle 401 (Unauthorized) errors, perhaps redirect to login
        if (error.response && error.response.status === 401) {
          authStore.logout();
          navigateTo("/authz/login");
        }

        return Promise.reject(error); // Always return the rejected promise for proper error handling
      }
    );

    return axiosInstance;
  };

  // Check if $axios is already provided
  if (!nuxtApp.$axios) {
    // Create the axios instance only if it hasn't been provided yet
    const axiosInstance = createAxiosInstance();

    // Make this axios instance available globally
    nuxtApp.provide('axios', axiosInstance);
  }
});
