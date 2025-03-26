import { computed } from "vue";

function useBackgroundColor(props) {
  return computed(() => {
    return props.variant ?? "error";
  });
}
const useBackgroundColorProps = {
  variant: {
    default: "error",
    type: String,
    validator(input) {
      return ["error", "success", "warning", "info"].includes(input);
    },
  },
};
export { useBackgroundColor, useBackgroundColorProps };
