<template>
  <Navbar />
  <main class="flex flex-col my-4 w-swv p-4 gap-2">
    <RouterView />
  </main>
</template>

<script setup>
  import Navbar from "@/components/Navbar.vue";
</script>
