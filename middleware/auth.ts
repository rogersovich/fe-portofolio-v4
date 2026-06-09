export default defineNuxtRouteMiddleware((to, from) => {
  // skip when in ssr
  if (import.meta.server) return

  // Check if it's client-side
  if (import.meta.client) {
    const authStore = useAuthStore();
    const sidebarStore = useSidebarStore();
    
    let isAuthenticated = !!authStore.auth.token;

    // Client-side JWT expiration check
    if (isAuthenticated) {
      try {
        const parts = authStore.auth.token.split('.');
        if (parts.length === 3) {
          const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
          const now = Math.floor(Date.now() / 1000);
          if (payload.exp && payload.exp < now) {
            authStore.logout();
            isAuthenticated = false;
          }
        } else {
          authStore.logout();
          isAuthenticated = false;
        }
      } catch (e) {
        authStore.logout();
        isAuthenticated = false;
      }
    }

    // Check if the sidebar store is initialized
    sidebarStore.$state; // Wait for Pinia store state to load

    // Redirect based on authentication state
    if (to.fullPath.startsWith("/adminz") && !isAuthenticated) {
      return navigateTo("/authz/login");
    }

    if (to.fullPath.startsWith("/authz/login") && isAuthenticated) {
      return navigateTo("/adminz/dashboard");
    }

    // Redirect from /adminz root to /adminz/dashboard if logged in
    if ((to.path === "/adminz" || to.path === "/adminz/") && isAuthenticated) {
      return navigateTo("/adminz/dashboard");
    }
  }
});

