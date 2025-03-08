<template>
  <Navbar />
  <main class="flex flex-col my-4 w-swv p-4 gap-2">
    <Alert v-bind:show="showAlert" @close="showAlert = false" message="Please fill the input text" />
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

export default {
  components: { Navbar, Todo, AddTodo, Alert, Modal, Btn },
  data() {
    return {
      todos: [],
      showAlert: false,
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
  methods: {
    openEditForm(todo) {
      this.editTodoForm.open = true;
      this.editTodoForm.todo = { ...todo }

    },
    updateTodo() {
      if (this.editTodoForm.index === -1) return;
      // trying to be immutable
      const todoToUpdate = this.todos.find(todo => todo.index === this.editTodoForm.index);

      if (!todoToUpdate) return;
      todoToUpdate.title = this.editTodoForm.todo.title;
      this.editTodoForm.open = false;

    },
    removeTodo(index) {
      this.todos = this.todos.filter((todo) => todo.index !== index);
    },
    addTodo(title) {
      console.log('ahora que xhuxha');
      if (title === "") {
        this.showAlert = true;
        return;
      }

      this.showAlert = false;
      this.todos.push({
        title,
        index: this.lastIndex++,
      });
    },
  },
}
</script>
