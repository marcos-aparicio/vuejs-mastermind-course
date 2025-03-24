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

<script setup>
import Btn from '@/components/Btn.vue';
import Pencil from '../icons/Pencil.vue';

const emit = defineEmits(['delete', 'edit']);
const props = defineProps({
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

});
props.todo.index = props.todo.id;

</script>
