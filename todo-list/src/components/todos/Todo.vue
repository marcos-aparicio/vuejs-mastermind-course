<template>
  <p class="flex-1">{{ todo.title }}</p>
  <div class="flex gap-2">
    <Btn class="btn btn-xs btn-info btn-circle !text-md p-1">
      <Pencil />
    </Btn>
    <Btn class="btn btn-xs btn-error btn-circle !text-xl" @click="$emit('delete-click', todo.index)">
      &times;
    </Btn>
  </div>
</template>
<script>
import Btn from '@/components/Btn.vue';
import Pencil from '../icons/Pencil.vue';

export default {
  components: { Btn, Pencil },
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
