<template>
  <Alert :message="alertMessage" @close="alertMessage = ''" />
  <section class="bg-base-200 p-4 rounded w-full">
    <AddTodo @submit="addTodo" />
  </section>
  <section class="p-4 bg-base-200 m-2 flex flex-col gap-2">
    <span class="loading loading-spinner loading-xl mx-auto text-primary" v-if="isLoading"></span>
    <div v-else="!isLoading" class="flex flex-col gap-2">
      <div class="bg-primary rounded p-2 flex" v-for="todo in todos" v-bind:key="todo.index">
        <Todo v-bind:key="todo.index" :todo="todo" @delete="removeTodo"
          @edit="$router.push(`/todos/${todo.index}/edit`)" />
      </div>
    </div>
  </section>
</template>

<script setup>
import Todo from "@/components/todos/Todo.vue"
import Alert from "@/components/Alert.vue";
import AddTodo from "@/components/todos/AddTodo.vue";
import { api as todoApi } from "@/services/todos";
import { ref } from "vue";
import { useFetch } from "@/composables/fetch";

const alertMessage = ref("");

const { data: todos, isLoading } = useFetch("/api/todos", {
  onError: () => {
    alertMessage.value = "Error fetching todos";
  }
});

async function removeTodo(index) {
  const removedTodo = await todoApi.deleteTodo(index);
  if (!removedTodo) return;
  todos.value = todos.value.filter((todo) => todo.index !== index);
};
async function addTodo(title) {
  if (title === "") {
    alertMessage.value = "Please fill in the title."
    return;
  }

  alertMessage.value = "";
  const newTodo = await todoApi.addTodo({ title });

  todos.value.push({
    title,
    index: newTodo.id
  });
};
</script>
