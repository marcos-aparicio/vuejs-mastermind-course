<template>
  <form action="" class="flex gap-4">
    <input v-model="todoTitle" type="text" placeholder="Todo Title" class="input flex-1" />
    <div>
      <Btn class="btn btn-primary btn-sm" @click="$emit('submit', todoTitle)">Add Todo</Btn>
    </div>
  </form>
</template>

<script setup>
import Btn from '@/components/Btn.vue';
import { ref } from 'vue';

const emit = defineEmits(['submit']);
const todoTitle = ref("");
</script>
