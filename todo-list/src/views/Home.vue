<template>
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
</template>

<script setup>
import Todo from "@/components/todos/Todo.vue"
import Alert from "@/components/Alert.vue";
import AddTodo from "@/components/todos/AddTodo.vue";
import EditTodoForm from "@/components/EditTodoForm.vue";
import { api as todoApi } from "@/apis/todos";
import { reactive, ref } from "vue";
import { useFetch } from "@/composables/fetch";

const alertMessage = ref("");
const editTodoForm = reactive({
  open: false,
  todo: {
    id: -1,
    title: ""
  },
});

function openEditForm(todo) {
  editTodoForm.open = true;
  editTodoForm.todo = { ...todo }
};

const { data: todos, isLoading } = useFetch("/api/todos", {
  onError: () => {
    alertMessage.value = "Error fetching todos";
  }
});




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
