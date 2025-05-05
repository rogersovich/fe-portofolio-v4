export default defineNuxtRouteMiddleware((to, from) => {
  // skip when in ssr
  if (import.meta.server) return

  // Check if it's client-side
  if (import.meta.client) {
    const authStore = useAuthStore();
    const sidebarStore = useSidebarStore();
    const isAuthenticated = !!authStore.auth.token;

    // Check if the sidebar store is initialized
    sidebarStore.$state; // Wait for Pinia store state to load

    // Redirect based on authentication state
    if (to.fullPath.startsWith("/adminz") && !isAuthenticated) {
      return navigateTo("/authz/login");
    }

    if (to.fullPath.startsWith("/authz/login") && isAuthenticated) {
      return navigateTo("/adminz/dashboard");
    }
  }
});
