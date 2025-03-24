<script setup>
import { onMounted, onBeforeUnmount, useTemplateRef } from 'vue';

const emit = defineEmits(['close']);
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
    required: true,
  },
  id: {
    required: true,
    type: String,
  },
});

// refs
const modal = useTemplateRef("modal");

const clickListener = (e) => {
  if (e.target !== modal) return;
  if (!props.open) return;

  emit('close');
};
const escListener = (e) => {
  if (e.key !== 'Escape') return;
  if (!this.open) return;

  emit('close');
};

onMounted(() => {
  window.addEventListener('click', clickListener);
  window.addEventListener('keydown', escListener);
});
onBeforeUnmount(() => {

  window.removeEventListener('click', clickListener);
  window.removeEventListener('keydown', escListener);
})
</script>

<template>
  <input type="checkbox" :id="id" :checked="open" class="modal-toggle" />
  <div class="modal" role="dialog" ref="modal">
    <div class="modal-box flex flex-col justify-around">
      <div class="modal-header">
        <slot name="header" />
        <div class="divider m-1"></div>
      </div>

      <div class="modal-body py-4">
        <slot name="body" />
      </div>

      <div class="modal-footer">
        <div class="divider m-1"></div>
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>
