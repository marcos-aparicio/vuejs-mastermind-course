<template>
  <p class="flex-1">{{ todo.title }}</p>
  <div>
    <button class="btn btn-xs btn-danger btn-error btn-circle !text-xl" @click="$emit('delete-click', todo.index)">
      &times;
    </button>
  </div>
</template>
<script>
export default {
  props: {
    todo: {
      title: {
        type: String,
        required: true,
      },
      index: {
        type: Number,
        required: true
      }
    }
  },
  emits: ['delete-click']

}
</script>
