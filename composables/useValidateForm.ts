import { ref } from 'vue';

export const useValidateForm = () => {
  const formErrors = ref<Record<string, string[]>>({}); // To store validation errors

  // Function to validate form data
  const validateForm = (formSchema: any, forms: any) => {
    formErrors.value = {}; // Reset errors before validation

    // Parse the form data with Zod schema
    const result = formSchema.safeParse(forms);

    // If validation fails, process errors
    if (!result.success) {
      result.error.errors.forEach((err: any) => {
        // Initialize error array if not already created for the field
        if (!formErrors.value[err.path[0]]) {
          formErrors.value[err.path[0]] = [];
        }
        // Push the error message for that field
        formErrors.value[err.path[0]].push(err.message);
      });

      return false; // Return false indicating the form is invalid
    }

    return true; // Return true if the form is valid
  };

  // Return formErrors and validation function for use in components
  return {
    formErrors,
    validateForm,
  };
};
