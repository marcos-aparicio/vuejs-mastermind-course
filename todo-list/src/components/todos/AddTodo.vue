<template>
  <form action="" class="flex gap-4">
    <input v-model="todoTitle" type="text" placeholder="Todo Title" class="input flex-1" />
    <div>
      <button class="btn btn-primary btn-sm" @click.prevent="$emit('submit', todoTitle)">Add Todo</button>
    </div>
  </form>
</template>
<script>
export default {
  data() {
    return { todoTitle: '' }
  },
  emits: ['submit']
}
</script>
