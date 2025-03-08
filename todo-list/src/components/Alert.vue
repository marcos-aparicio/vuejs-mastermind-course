<template>
  <div class="alert-error"></div>
  <div class="alert-info"></div>
  <div class="alert-success"></div>
  <div class="alert-warning"></div>
  <div v-if="message !== ''" role="alert"
    :class="['absolute bottom-0 right-0 alert alert-soft m-2 flex justify-between', `alert-${type}`]">
    <span class="text-lg">{{ message ?? 'Topuria' }}</span>
    <Btn class="btn btn-xs btn-ghost btn-circle !text-xl" @click="closeAlert">
      &times;
    </Btn>
  </div>
</template>

<script>
import Btn from './Btn.vue';

export default {
  components: { Btn },
  props: {
    message: {
      required: true,
      type: String,
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
