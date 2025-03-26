<template>
  <Alert :message="alert.message" :show="alert.show" @close="alert.show = false; alert.message = null" />
  <section class="p-4 bg-base-200 m-2 flex flex-col gap-8 rounded-xl">
    <h2 class="text-2xl font-bold text-center">Tasks</h2>
    <span class="loading loading-spinner loading-xl mx-auto text-primary" v-if="isLoading"></span>
    <div v-else="!isLoading" class="flex flex-col lg:flex-row gap-2 flex-wrap lg:justify-around">
      <Todo v-if="todos.length > 0" v-for="todo in todos" v-bind:key="todo.id" :todo="todo" @delete="removeTodo"
        @edit="$router.push(`/todos/${todo.id}/edit`)" @toggle="toggleTodoStatus" />
      <div v-else class="flex justify-center items-center gap-4">
        <span>It seems there are no tasks!</span>
        <RouterLink to="/add-todo"><button class="btn btn-soft btn-info">Add one</button></RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import Todo from "@/components/todos/Todo.vue";
import Alert from "@/components/Alert.vue";
import { api as todoApi } from "@/services/todos";
import { useFetch } from "@/composables/fetch";
import { useAlert } from "@/composables/alert";

const { alert, showAlert } = useAlert();

const { data: todos, isLoading } = useFetch("/api/todos", {
  onError: () => showAlert("Error fetching todos")
});

async function removeTodo(id) {
  try {
    const removedTodo = await todoApi.deleteTodo(id);
    if (!removedTodo) {
      showAlert("Error: can't delete todo");
      return;
    }
    todos.value = todos.value.filter((todo) => todo.id !== id);
  } catch {
    showAlert("Error: can't delete todo");
  }
};

async function toggleTodoStatus(id, value, todo) {
  try {
    const updatedTodo = await todoApi.updateTodo(id, { ...todo, completed: value });
    console.log("updating madapacka");
    if (!updatedTodo) {
      showAlert("Can't update completion of todo");
      return;
    }
    todos.value = todos.value.map(todo => {
      if (todo.id !== id) return todo;
      return { ...todo, completed: value };
    })

  } catch (error) {
    showAlert("Can't update completion of todo");
  }

}
</script>
