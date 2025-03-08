<template>
  <Navbar />
  <main class="flex flex-col my-4 w-swv p-4 gap-2">
    <Alert :message="alertMessage" @close="alertMessage = ''" />
    <section class="bg-base-200 p-4 rounded w-full">
      <AddTodo @submit="addTodo" />
    </section>
    <section class="p-4 bg-base-200 m-2 flex flex-col gap-2" v-if="todos.length">
      <div class="bg-primary rounded p-2 flex" v-for="todo in todos" v-bind:key="todo.index">
        <Todo v-bind:key="todo.index" :todo="todo" @delete="removeTodo" @edit="openEditForm" />
      </div>
    </section>
    <Modal id="editTodoForm" :open="editTodoForm.open" @close="editTodoForm.open = false">
      <template v-slot:header>
        <h3>Edit Todo</h3>
      </template>
      <template #body>
        <div class="flex w-full flex-col">
          <label class="input w-full">
            <span class="label">Title: </span>
            <input type="text" placeholder="Your task" v-model="editTodoForm.todo.title" />
          </label>
        </div>
      </template>
      <template #footer>

        <div class="flex gap-2 justify-end">
          <Btn class="btn btn-error btn-sm" @click="editTodoForm.open = false">Close</Btn>
          <Btn class="btn btn-info btn-sm" @click="updateTodo">Edit</Btn>
        </div>
      </template>
    </Modal>
  </main>
</template>
<script>

import Navbar from "@/components/Navbar.vue";
import Todo from "@/components/todos/Todo.vue"
import Alert from "@/components/Alert.vue";
import AddTodo from "@/components/todos/AddTodo.vue";
import Modal from "@/components/Modal.vue";
import Btn from "@/components/Btn.vue";
import { api as todoApi } from "./apis/todos";

export default {
  components: { Navbar, Todo, AddTodo, Alert, Modal, Btn },
  data() {
    return {
      todos: [],
      alertMessage: "",
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
  created() {
    todoApi.getTodos()
      .then(todos => this.todos = todos)
      .catch((e) => {
        this.alertMessage = "Error communicating with the server";
      });
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
