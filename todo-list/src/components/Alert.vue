<template>
  <div class="alert-error"></div>
  <div class="alert-info"></div>
  <div class="alert-success"></div>
  <div class="alert-warning"></div>
  <div v-if="show" role="alert"
    :class="['absolute bottom-0 right-0 alert alert-soft m-2 flex justify-between', `alert-${type}`]">
    <span class="text-lg">{{ message ?? 'Topuria' }}</span>
    <button class="btn btn-xs btn-ghost btn-circle !text-xl" @click="closeAlert">
      &times;
    </button>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      required: true,
      type: String,
    },
    show: {
      required: true,
      type: Boolean
    },
    type: {
      default: "error",
      type: String,
      validator(input) {
        return ["error", "success", "warning", "info"].includes(input);

      }
    }
  },
  emits: ['close'],
  methods: {
    closeAlert() {
      this.$emit('close');
    }
  }

}
</script>
