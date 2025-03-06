<template>
  <nav class="navbar bg-base-200 shadow-sm">
    <div class="flex-1">
      <div class="avatar">
        <div class="w-8">
          <img src="./assets/logo.svg" alt="logo" />
        </div>
      </div>
    </div>
    <span>Todo List App</span>
  </nav>
  <main class="flex flex-col my-4 w-swv p-4">
    <Alert v-bind:show="showAlert" @close="showAlert = false" message="Please fill the input text" />
    <section class="bg-base-200 p-4 rounded w-full">
      <form action="" class="flex gap-4">
        <input v-model="todoTitle" type="text" placeholder="Todo Title" class="input flex-1" />
        <div>
          <button class="btn btn-primary btn-sm" @click.prevent="addTodo">Add Todo</button>
        </div>
      </form>
    </section>
    <section class="p-4 bg-base-200 m-2 flex flex-col gap-2">
      <div class="bg-primary rounded p-2 flex" v-for="todo in todos" v-bind:key="todo.index">
        <p class="flex-1">{{ todo.title }}</p>
        <div>
          <button class="btn btn-xs btn-danger btn-error btn-circle !text-xl" @click="() => removeTodo(todo.index)">
            &times;
          </button>
        </div>
      </div>
    </section>
  </main>
</template>
<script>

import Alert from "./components/Alert.vue";

export default {
  components: { Alert },
  data() {
    return {
      lastIndex: 0,
      todoTitle: "",
      showAlert: false,
      todos: [],
    }
  },
  methods: {
    addTodo(e) {
      e.preventDefault();

      if (this.todoTitle === "") {
        this.showAlert = true;
        return;
      }

      this.todos.push({
        title: this.todoTitle,
        index: this.lastIndex++
      });
    },
    removeTodo(index) {
      this.todos = this.todos.filter((todo) => todo.index !== index);
    }
  }
}
</script>
