export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();
  const sidebarStore = useSidebarStore();
  const isAuthenticated = !!authStore.auth.token;

  // if (to.fullPath.startsWith("/adminz") && !isAuthenticated) {
  //   setTimeout(() => {
  //     return navigateTo("/authz/login");
  //   }, 0);
  // }

  // if (to.fullPath.startsWith("/authz/login") && isAuthenticated) {
  //   setTimeout(() => {
  //     return navigateTo("/adminz/dashboard");
  //   }, 50);
  // }

  // Check if it's client-side
  if (import.meta.client) {
    // Check if the sidebar store is initialized
    sidebarStore.$state; // Wait for Pinia store state to load

    // Redirect based on authentication state
    if (to.fullPath.startsWith("/adminz") && !isAuthenticated) {
      return navigateTo("/authz/login");
    }

    if (to.fullPath.startsWith("/authz/login") && isAuthenticated) {
      console.log(sidebarStore.menuList)
      return navigateTo("/adminz/dashboard");
    }
  }
});
