import { ref, watch } from "vue";

function useFetch(url, opts = { onError: null }) {
  const data = ref(null);
  const error = ref(null);
  const isLoading = ref(true);

  let stopErrorWatcher = null;
  if (opts.onError !== null)
    stopErrorWatcher = watch(error, (e, eOld) => opts.onError(e, eOld));

  fetch(url)
    .then((res) => res.json())
    .then((res) => (data.value = res))
    .catch((e) => (error.value = e))
    .finally(() => {
      isLoading.value = false;

      if (stopErrorWatcher !== null) stopErrorWatcher();
    });

  return { data, error, isLoading };
}
export { useFetch };
