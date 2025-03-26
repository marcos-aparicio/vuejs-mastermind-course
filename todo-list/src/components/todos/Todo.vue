<template>
  <div class="rounded-xl flex flex-col gap-4 bg-neutral hover:opacity-75 text-neutral-content p-4 lg:min-w-md">
    <div class="flex justify-between w-full flex-col gap-2 md:flex-row">
      <div class="flex justify-center items-center gap-4">
        <input type="checkbox" v-model="todo.completed" class="checkbox checkbox-primary"
          @change="(e) => emit('toggle', todo.id, e.target.checked, todo)" />
        <h2 class="font-extrabold text-lg" :class="{ 'line-through': todo.completed }">{{ todo.title }}</h2>
      </div>
      <span>{{ todo.due }}</span>
    </div>
    <p class="truncate text-sm">{{ todo.description }}</p>
    <div class="card-actions justify-end">
      <Btn class="link hover:link-primary hover:scale-110" @click="$emit('edit', todo)">
        <Pencil />
      </Btn>
      <Btn class="link hover:link-error hover:scale-110 !text-xl" @click="$emit('delete', todo.id)">
        <Trash />
      </Btn>
    </div>
  </div>
</template>

<script setup>
import Btn from '@/components/Btn.vue';
import Pencil from '@/components/icons/Pencil.vue';
import Trash from '@/components/icons/Trash.vue';

const emit = defineEmits(['delete', 'edit', 'toggle']);
const props = defineProps({
  todo: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  }

});

</script>
