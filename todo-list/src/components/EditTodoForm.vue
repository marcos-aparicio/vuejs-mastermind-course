<template>
  <Modal id="editTodoForm" :open="show" @close="$emit('close')">
    <template v-slot:header>
      <h3>Edit Todo</h3>
    </template>
    <template #body>
      <div class="flex w-full flex-col">
        <label class="input w-full">
          <span class="label">Title: </span>
          <input type="text" placeholder="Your task" :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)" />
        </label>
      </div>
    </template>
    <template #footer>

      <div class="flex gap-2 justify-end">
        <Btn class="btn btn-error btn-sm" @click="$emit('close')">Close</Btn>
        <Btn class="btn btn-info btn-sm" @click="$emit('submit')">Edit</Btn>
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from "./Modal.vue";
import Btn from "./Btn.vue";



export default {
  components: {
    Modal, Btn
  },
  props: ['modelValue', 'show'],
  emits: ['close', 'submit', 'update:modelValue']
}
</script>
