<template>
  <div>
    <div
      class="layout text-center pb-12 pt-12 md:pb-16 md:pt-36 flex flex-col justify-center items-center"
    >
      <div
        class="card flex justify-center items-center flex-col gap-4 sm:w-[30rem]"
      >
        <div class="flex flex-col gap-2 mb-4">
          <div class="text-5xl font-rethink font-bold">
            <span> Welcome to </span>
            <BaseTextHighlight
              :duration="500"
              class="rounded-lg bg-gradient-to-r from-[#9E7AFF] to-[#FE8BBB]"
            >
              Login
            </BaseTextHighlight>
          </div>
          <div class="text-muted-foreground">
            Sign in to Continue to the Dashboard
          </div>
        </div>
        <Form
          v-slot="$form"
          :initialValues="formData"
          :resolver="formResolver"
          @submit="onFormSubmit"
          class="flex flex-col gap-4 w-full sm:w-[24rem]"
        >
          <div class="flex flex-col gap-1 text-left">
            <label for="email" class="mb-1">Email</label>
            <InputText
              name="email"
              type="text"
              placeholder="Email"
              fluid
              variant="outlined"
            />
            <Message
              v-if="$form.email?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.email.error?.message }}</Message
            >
          </div>
          <div class="flex flex-col gap-1 text-left">
            <label for="password" class="mb-1">Password</label>
            <InputText
              name="password"
              type="text"
              placeholder="Password"
              fluid
              variant="outlined"
            />
            <Message
              v-if="$form.password?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.password.error?.message }}</Message
            >
          </div>
          <div class="mt-2 w-full">
            <Button
              type="submit"
              severity="contrast"
              label="Submit"
              class="w-full"
            />
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "@primevue/forms/form";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { useAuthStore } from "~/stores/useAuth";
import type { TLoginResponse } from "~/types/auth.type";
import type { TBaseResponse } from "~/types/base.type";
import type { AxiosResponse } from "axios";

useHead({
  title: "Auth Login",
  titleTemplate: "%s | Portofolio",
});

definePageMeta({
  middleware: "auth",
});

const router = useRouter();
const { $axios } = useNuxtApp();
const authStore = useAuthStore();
const sidebarStore = useSidebarStore();
const alertStore = useAlertStore();
const formData = ref({
  email: "",
  password: "",
});

const formSchema = z.object({
  email: z.string().nonempty("Email is required."),
  password: z.string().nonempty("Password is required."),
});

const formResolver = zodResolver(formSchema);

const onFormSubmit = async ({ valid, values }: FormSubmitEvent) => {
  if (valid) {
    try {
      const { data }: AxiosResponse<TBaseResponse<TLoginResponse>> =
        await $axios.post(`/auth/login`, {
          email: values.email,
          password: values.password,
        });

      authStore.setAuth(data.data);

      const message = toCapitalize(data.message);

      alertStore.setAlert({
        severity: "info",
        summary: message,
        show_alert: true,
      });

      sidebarStore.setInitMenuList();

      router.push("/adminz/dashboard").then(() => {
        window.location.reload();
      });
    } catch (error: any) {
      alertStore.setAlert({
        severity: "error",
        summary: error.message,
        show_alert: true,
      });
    }
  }
};
</script>
<style lang=""></style>
