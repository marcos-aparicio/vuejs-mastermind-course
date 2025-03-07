<script setup>
import { store } from "@/stores/todos.js"
</script>
<template>
  <div class="bg-primary rounded p-2 flex" v-for="todo in store.todos" v-bind:key="todo.index">
    <p class="flex-1">{{ todo.title }}</p>
    <div>
      <button class="btn btn-xs btn-danger btn-error btn-circle !text-xl" @click="() => store.removeTodo(todo.index)">
        &times;
      </button>
    </div>
  </div>
</template>
