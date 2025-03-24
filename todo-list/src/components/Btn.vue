<template>
  <button @click.prevent="emit('click')">
    <slot />
  </button>
</template>

<script setup>
const emit = defineEmits(['click']);

</script>
