<template>
  <div class="flex w-full flex-col gap-2">
    <label class="input w-full">
      <span class="label">Title: </span>
      <input type="text" placeholder="Your task" v-model="props.todo.title" />
    </label>
    <textarea class="textarea" placeholder="Description" v-model="props.todo.description"></textarea>
    <input v-model="props.todo.due" type="date" class="input" />
  </div>
  <div class="flex gap-2 justify-end">
    <Btn class="btn btn-info btn-sm" @click="submit">
      <span>Submit</span>

    </Btn>
  </div>
</template>

<script setup>
import Btn from '@/components/Btn.vue';

const props = defineProps({
  todo: {
    type: Object,
    required: false,
  }
});
const emit = defineEmits(['validationError', 'submit']);

const isTodoIsValid = () => {
  if (!props.todo.title) {
    emit('validationError', "Title must not be empty");
    return false;
  }
  if (!props.todo.description) {
    emit('validationError', "Description must not be empty");
    return false;
  }
  try {
    const tomorrow = new Date();
    // Split the date string into year, month, and day
    const [year, month, day] = props.todo.due.split('-').map(Number);
    // Create a new Date object as a local date
    const date = new Date(year, month - 1, day); // Month is 0-indexed
    tomorrow.setDate(tomorrow.getDate() + 1); // Move to tomorrow
    tomorrow.setHours(0, 0, 0, 0); // Set to 12:00 AM (midnight)

    if (date < tomorrow) {
      emit("validationError", "Due Date must be in the future!");
      return false;
    }

  } catch (err) {
    emit('validationError', 'Due Date is wrong');
    return false;
  }

  return true;
}

const submit = () => {
  if (!isTodoIsValid()) return;
  emit('submit', props.todo);
}

</script>
