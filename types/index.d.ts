import axios from 'axios';
import { Router } from 'vue-router';


declare module '#app' {
  interface NuxtApp {
    $axios: typeof axios;
    $router: Router;
  }
}

declare module 'nuxt/dist/app/nuxt' {
  interface NuxtApp {
    $axios: typeof axios;
    $router: Router;
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: typeof axios;
    $router: Router;
  }
}