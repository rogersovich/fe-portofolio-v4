import axios, { type AxiosInstance } from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  // Access authStore to get the token
  const authStore = useAuthStore(); // Adjust this if your store has a different name

  // Function to create the axios instance
  const createAxiosInstance = (): AxiosInstance => {
    const axiosInstance = axios.create({
      baseURL: process.env.NUXT_API_BASE || "http://localhost:4000/api", // Replace with your API base URL
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
          // Optionally, you can redirect to the login page
          // nuxtApp.router.push('/login'); // Uncomment if you're using Vue Router
        }

        return Promise.reject(error); // Always return the rejected promise for proper error handling
      }
    );

    return axiosInstance;
  };

  // Create the axios instance
  const axiosInstance = createAxiosInstance();

  // Make this axios instance available globally
  nuxtApp.provide("axios", axiosInstance);
});
