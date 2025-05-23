import { definePreset } from "@primeuix/themes";
import Aura from "@primeuix/themes/aura";

export default definePreset(Aura, {
  semantic: {
    primary: {
      50: "{zinc.950}",
      100: "{zinc.900}",
      200: "{zinc.800}",
      300: "{zinc.700}",
      400: "{zinc.600}",
      500: "{zinc.500}",
      600: "{zinc.400}",
      700: "{zinc.300}",
      800: "{zinc.200}",
      900: "{zinc.100}",
      950: "{zinc.50}",
    }
  },
});
