<template>
  <form action="" class="flex gap-4">
    <input v-model="todoTitle" type="text" placeholder="Todo Title" class="input flex-1" />
    <div>
      <Btn class="btn btn-primary btn-sm" @click="$emit('submit', todoTitle)">Add Todo</Btn>
    </div>
  </form>
</template>
<script>
import Btn from '@/components/Btn.vue';

export default {

  components: { Btn },
  data() {
    return { todoTitle: '' }
  },
  emits: ['submit']
}
</script>
