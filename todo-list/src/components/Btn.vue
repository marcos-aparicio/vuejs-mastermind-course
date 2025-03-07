<template>
  <button @click.prevent="$emit('click')">
    <slot />
  </button>
</template>
<script>
export default {
  emits: ['click']
}
</script>
