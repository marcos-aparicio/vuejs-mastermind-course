<script setup>
  import HelloWorld from './components/HelloWorld.vue'
  import TheWelcome from './components/TheWelcome.vue'
</script>

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
    <section class="bg-base-200 p-4 rounded w-full">
      <form action="" class="flex gap-4">
        <input type="text" placeholder="Todo Title" class="input flex-1" />
        <div>
          <button class="btn btn-primary btn-sm">Add Todo</button>
        </div>
      </form>
    </section>
    <section class="p-4 bg-base-200 m-2">
      <div class="bg-primary rounded p-2 flex">
        <p class="flex-1">Pasear al perro</p>
        <div>
          <button class="btn btn-xs btn-danger btn-error btn-circle !text-xl">&times;</button>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
  export default {

  }
</script>

<style scoped></style>
