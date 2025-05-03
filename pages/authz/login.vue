<template>
  <div>
    <div
      class="layout text-center pb-12 pt-12 md:pb-16 md:pt-36 flex flex-col justify-center items-center"
    >
      <Toast position="top-center" />
      <div class="card flex justify-center items-center flex-col gap-4 sm:w-[30rem]">
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
          :initialValues
          :resolver="formResolver"
          @submit="onFormSubmit"
          class="flex flex-col gap-4 w-full sm:w-[24rem]"
        >
          <div class="flex flex-col gap-1 text-left">
            <label for="username" class="mb-1">Username</label>
            <InputText
              name="username"
              type="text"
              placeholder="Username"
              fluid
              variant="outlined"
              size="small"
            />
            <Message
              v-if="$form.username?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.username.error?.message }}</Message
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
              size="small"
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
              size="small"
              class="w-full"
            />
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>
<script setup>

useHead({
  title: "Auth Login",
  titleTemplate: "%s | Portofolio",
});

const toast = useToast();
const initialValues = reactive({
  username: "",
  password: "",
});

const formResolver = ({ values }) => {
  const errors = {};

  if (!values.username) {
    errors.username = [{ message: "Username is required." }];
  }

  if (!values.password) {
    errors.password = [{ message: "Password is required." }];
  }

  return {
    values, // (Optional) Used to pass current form values to submit event.
    errors,
  };
};

const onFormSubmit = ({ valid }) => {
  if (valid) {
    toast.add({
      severity: "info",
      summary: "Welcome to Dashboard Admin",
      life: 3000,
    });
  }
};
</script>
<style lang=""></style>
