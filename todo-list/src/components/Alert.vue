<template>
  <div class="alert-info"></div>
  <div class="alert-success"></div>
  <div class="alert-warning"></div>
  <div class="alert-error"></div>
  <div v-if="message" role="alert"
    :class="['absolute bottom-0 right-0 alert alert-soft m-2 flex justify-between', `alert-${variant}`]">
    <span class="text-lg">{{ message ?? 'Topuria' }}</span>
    <Btn class="btn btn-xs btn-ghost btn-circle !text-xl" @click="closeAlert">
      &times;
    </Btn>
  </div>
</template>

<script setup>
import { useBackgroundColor, useBackgroundColorProps } from '@/composables/backgroundColor';
import Btn from './Btn.vue';

const emit = defineEmits(['close']);
const props = defineProps(
  {
    message: {
      required: true,
      type: String,
    },
    ...useBackgroundColorProps
  }
);

// i know this is not the same as the course (since i am using daisyui) but still serves the same purpose
const variant = useBackgroundColor(props);
const closeAlert = () => {
  emit('close');
}

</script>
