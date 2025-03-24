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
<script>

import Navbar from "@/components/Navbar.vue";
import Todo from "@/components/todos/Todo.vue"
import Alert from "@/components/Alert.vue";
import AddTodo from "@/components/todos/AddTodo.vue";
import Modal from "@/components/Modal.vue";
import Btn from "@/components/Btn.vue";
import EditTodoForm from "@/components/EditTodoForm.vue";
import { api as todoApi } from "./apis/todos";

export default {
  components: { Navbar, Todo, AddTodo, Alert, Modal, Btn, EditTodoForm },
  data() {
    return {
      todos: [],
      alertMessage: "",
      isLoading: false,
      lastIndex: 0,
      showEditModal: false,
      editTodoForm: {
        open: false,
        todo: {
          id: -1,
          title: ""
        },
      }
    }
  },
  async created() {
    this.isLoading = true;
    setTimeout(() => {
      todoApi.getTodos()
        .then(todos => {
          this.todos = todos;
          this.isLoading = false;
        })
        .catch((e) => {
          console.log(e);
          this.alertMessage = "Error communicating with the server";
          this.isLoading = false;
        });
    }, 4000);
  },
  methods: {
    openEditForm(todo) {
      this.editTodoForm.open = true;
      this.editTodoForm.todo = { ...todo }

    },
    async updateTodo() {
      if (this.editTodoForm.index === -1) return;
      // trying to be immutable
      const todoToUpdate = this.todos.find(todo => {
        return todo.index === this.editTodoForm.todo.index
      });

      if (!todoToUpdate) return;
      todoToUpdate.title = this.editTodoForm.todo.title;
      const updatedTodo = await todoApi.updateTodo(todoToUpdate);
      if (!updatedTodo) return;
      todoToUpdate.title = this.editTodoForm.todo.title;
      this.editTodoForm.open = false;

    },
    async removeTodo(index) {
      const removedTodo = await todoApi.deleteTodo(index);
      if (!removedTodo) return;
      this.todos = this.todos.filter((todo) => todo.index !== index);
    },
    async addTodo(title) {
      if (title === "") {
        this.alertMessage = "Please fill in the title."
        return;
      }

      this.alertMessage = "";
      const newTodo = await todoApi.addTodo({ title });

      this.todos.push({
        title,
        index: newTodo.id
      });
    },
  },
}
</script>
