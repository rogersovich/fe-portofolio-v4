import { defineStore } from "pinia";
import type { TAuth, TLoginResponse } from "~/types/auth.type";

export const useAuthStore = defineStore("auth", () => {
  const auth = reactive<TAuth>({
    token: "",
    user: null,
  });

  const setAuth = (data: TLoginResponse) => {
    auth.token = data.token;
    auth.user = {
      id: data.id,
      username: data.username,
      email: data.email,
    };
  };

  const logout = () => {
    auth.token = "";
    auth.user = null;
  };

  // Get the token
  const getToken = () => {
    return auth.token
  }

  const getUserLogin = () => {
    return auth.user
  }

  return {
    auth,
    setAuth,
    logout,
    getToken,
    getUserLogin
  };
}, {
  persist: {
    pick: ['auth'],
    storage: piniaPluginPersistedstate.localStorage(),
    key: 'auth',
  }
});
