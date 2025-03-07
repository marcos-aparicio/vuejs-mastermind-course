<script setup>
import { store } from "@/stores/todos.js";
</script>

<template>
  <form action="" class="flex gap-4">
    <input v-model="store.todoTitle" type="text" placeholder="Todo Title" class="input flex-1" />
    <div>
      <button class="btn btn-primary btn-sm" @click.prevent="store.addTodo()">Add Todo</button>
    </div>
  </form>
</template>
