<template>
  <Alert :message="alert.message" :show="alert.show" @close="alert.show = false; alert.message = null"
    :variant="alert.variant" />
  <div class="max-w-2xl flex flex-col gap-8 bg-base-200 p-4 px-16 rounded-xl self-center">
    <h3 class="text-2xl text-center font-bold">Add Todo</h3>
    <TodoForm :todo="todo" @submit="submit" @validationError="onValidationError" />
  </div>
</template>

<script setup>
import Alert from '@/components/Alert.vue';
import TodoForm from '@/components/todos/TodoForm.vue';
import { useAlert } from '@/composables/alert';
import { api as todoApi } from '@/services/todos';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const { alert, showAlert } = useAlert();
const router = useRouter();


const todo = ref({
  title: "", description: "", due: new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(Date.now() + 24 * 60 * 60)
});

const isLoading = ref(false);

const submit = async () => {
  isLoading.value = true;
  try {
    await todoApi.addTodo(todo.value);
  } catch (error) {
    showAlert("Error adding new todo");
  } finally {
    isLoading.value = false;
  }

  router.push("/");
};
const onValidationError = (error) => {
  showAlert(error, { variant: "info" });
};

</script>
