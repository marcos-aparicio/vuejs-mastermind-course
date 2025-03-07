<template>
  <Navbar />
  <main class="flex flex-col my-4 w-swv p-4">
    <Alert v-bind:show="showAlert" @close="showAlert = false" message="Please fill the input text" />
    <section class="bg-base-200 p-4 rounded w-full">
      <AddTodo @submit="addTodo" />
    </section>
    <section class="p-4 bg-base-200 m-2 flex flex-col gap-2">
      <div class="bg-primary rounded p-2 flex" v-for="todo in todos" v-bind:key="todo.index">
        <Todo v-bind:key="todo.index" :todo="todo" @delete-click="removeTodo" />
      </div>
    </section>
  </main>
</template>
<script>

import Navbar from "@/components/Navbar.vue";
import Todo from "@/components/todos/Todo.vue"
import Alert from "@/components/Alert.vue";
import AddTodo from "@/components/todos/AddTodo.vue";

export default {
  components: { Navbar, Todo, AddTodo, Alert },
  data() {
    return {
      todos: [],
      showAlert: false,
      lastIndex: 0,
    }
  },
  methods: {
    removeTodo(index) {
      this.todos = this.todos.filter((todo) => todo.index !== index);
    },
    addTodo(title) {
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

  }
}
</script>
