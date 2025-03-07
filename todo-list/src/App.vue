<template>
  <Navbar />
  <main class="flex flex-col my-4 w-swv p-4">
    <Alert v-bind:show="showAlert" @close="showAlert = false" message="Please fill the input text" />
    <section class="bg-base-200 p-4 rounded w-full">
      <AddTodo />
    </section>
    <section class="p-4 bg-base-200 m-2 flex flex-col gap-2">
      <Todos />
    </section>
  </main>
</template>
<script>

import Navbar from "@/components/Navbar.vue";
import Todos from "@/components/todos/Todos.vue"
import Alert from "./components/Alert.vue";
import AddTodo from "./components/todos/AddTodo.vue";

export default {
  components: { Navbar, Todos, AddTodo, Alert },
  data() {
    return {
      showAlert: false,
    }
  },
}
</script>
