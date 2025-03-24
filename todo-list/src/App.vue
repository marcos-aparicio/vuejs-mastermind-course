<template>
  <Navbar />
  <main class="flex flex-col my-4 w-swv p-4 gap-2">
    <Alert :message="alertMessage" @close="alertMessage = ''" />
    <section class="bg-base-200 p-4 rounded w-full">
      <AddTodo @submit="addTodo" />
    </section>
    <section class="p-4 bg-base-200 m-2 flex flex-col gap-2">
      <span class="loading loading-spinner loading-xl mx-auto text-primary" v-if="isLoading"></span>
      <div v-else="!isLoading" class="flex flex-col gap-2">
        <div class="bg-primary rounded p-2 flex" v-for="todo in todos" v-bind:key="todo.index">
          <Todo v-bind:key="todo.index" :todo="todo" @delete="removeTodo" @edit="openEditForm" />
        </div>
      </div>
    </section>
    <EditTodoForm :show="editTodoForm.open" @close="editTodoForm.open = false" @submit="updateTodo"
      v-model="editTodoForm.todo.title" />
  </main>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import Todo from "@/components/todos/Todo.vue"
import Alert from "@/components/Alert.vue";
import AddTodo from "@/components/todos/AddTodo.vue";
import EditTodoForm from "@/components/EditTodoForm.vue";
import { api as todoApi } from "./apis/todos";
import { reactive, ref } from "vue";

const alertMessage = ref("");
const isLoading = ref(false);
const todos = ref([]);
const editTodoForm = reactive({
  open: false,
  todo: {
    id: -1,
    title: ""
  },
});
fetchTodos();

function openEditForm(todo) {
  editTodoForm.open = true;
  editTodoForm.todo = { ...todo }
};

async function fetchTodos() {
  isLoading.value = true;
  todoApi.getTodos()
    .then(res => {
      todos.value = res;
      isLoading.value = false;
    })
    .catch((e) => {
      console.log(e);
      alertMessage.value = "Error communicating with the server";
      isLoading.value = false;
    });
};

async function updateTodo() {
  if (editTodoForm.index === -1) return;
  // trying to be immutable
  const todoToUpdate = todos.value.find(todo => {
    return todo.index === editTodoForm.todo.index
  });

  if (!todoToUpdate) return;
  todoToUpdate.title = editTodoForm.todo.title;
  const updatedTodo = await todoApi.updateTodo(todoToUpdate);
  if (!updatedTodo) return;
  todoToUpdate.title = editTodoForm.todo.title;
  editTodoForm.open = false;

};
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
