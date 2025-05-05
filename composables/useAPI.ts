import type { UseFetchOptions } from 'nuxt/app'
import { useAuthStore } from '~/stores/useAuth'

export function useAPI<T>(
  url: string | (() => string),
  options?: UseFetchOptions<T>,
) {
  const authStore = useAuthStore()
  return useFetch(url, {
    ...options,
    baseURL: process.env.NUXT_API_BASE || "http://localhost:4000/api",
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${authStore.getToken()}`,
    },
    $fetch: useNuxtApp().$api as typeof $fetch
  })
}
