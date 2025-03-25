import { computed } from "vue";

function useBackgroundColor(props) {
  return computed(() => {
    return props.type ?? "error";
  });
}
const useBackgroundColorProps = {
  type: {
    default: "error",
    type: String,
    validator(input) {
      return ["error", "success", "warning", "info"].includes(input);
    },
  },
};
export { useBackgroundColor, useBackgroundColorProps };
