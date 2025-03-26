import { ref } from "vue";
import { reactive } from "vue";

const useAlert = () => {
  const alert = reactive({
    show: false,
    message: null,
    variant: "error",
  });
  const theTimeout = ref(null);

  const showAlert = (message, opts) => {
    if (theTimeout.value) {
      clearTimeout(theTimeout.value);
      theTimeout.value = null;
    }

    alert.show = true;
    alert.message = message;
    if (opts?.variant ?? false) alert.variant = opts.variant;
    theTimeout.value = setTimeout(() => {
      alert.show = false;
      theTimeout.value = null;
      clearTimeout(theTimeout.value);
    }, 3000);
  };

  return { alert, showAlert };
};
export { useAlert };
