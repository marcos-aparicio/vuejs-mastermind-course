<template>
  <Alert :message="alert.message" :show="alert.show" @close="alert.show = false; alert.message = null" />
  <span class="loading loading-spinner loading-xl mx-auto text-primary" v-if="isLoading"></span>
  <div v-else class="max-w-2xl flex flex-col gap-8 bg-base-200 p-4 px-16 rounded-xl self-center">
    <h3 class="text-2xl text-center font-bold">Edit Todo</h3>
    <TodoForm :todo="todo" @submit="submit" @validationError="onValidationError" />
  </div>
</template>

<script setup>
import { api as todoApi } from "@/services/todos";
import { useFetch } from "@/composables/fetch";
import { useAlert } from "@/composables/alert";
import { ref } from "vue";
import { useRouter } from "vue-router";
import TodoForm from "@/components/todos/TodoForm.vue";
import Alert from "@/components/Alert.vue";

const props = defineProps(["id"]);

const { alert, showAlert } = useAlert();
const router = useRouter();
const { data: todo, isLoading } = useFetch(`/api/todos/${props.id}`, {
  onError: () => showAlert("Error fetching the todo")
});

const isUpdatingTodo = ref(false);

const onValidationError = (error) => {
  showAlert(error);
}

const submit = async () => {
  const updatedTodo = await todoApi.updateTodo(todo.value);
  if (!updatedTodo) {
    showAlert("Error trying to update value");
    return;
  }

  isUpdatingTodo.value = false;
  router.push("/");
};

</script>
