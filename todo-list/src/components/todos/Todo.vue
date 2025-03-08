<template>
  <p class="flex-1">{{ todo.title }}</p>
  <div class="flex gap-2">
    <Btn class="btn btn-xs btn-info btn-circle !text-md p-1" @click="$emit('edit', todo)">
      <Pencil />
    </Btn>
    <Btn class="btn btn-xs btn-error btn-circle !text-xl" @click="$emit('delete', todo.index)">
      &times;
    </Btn>
  </div>
</template>
<script>
import Btn from '@/components/Btn.vue';
import Pencil from '../icons/Pencil.vue';

export default {
  created() {
    this.todo.index = this.todo.id;
  },
  components: { Btn, Pencil },
  props: {
    todo: {
      title: {
        type: String,
        required: true,
      },
      index: {
        type: String,
        required: true
      }
    }
  },
  emits: ['delete', 'edit']

}
</script>
