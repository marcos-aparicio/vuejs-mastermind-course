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

<script>
import Btn from './Btn.vue';

export default {
  components: { Btn },
  emits: ['close'],
  props: {
    open: {
      type: Boolean,
      default: false,
      required: true,
    },
    id: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      clickListener: (e) => {
        if (e.target !== this.$refs.modal) return;
        if (!this.open) return;

        this.$emit('close');
      },
      escListener: (e) => {
        if (e.key !== 'Escape') return;
        if (!this.open) return;

        this.$emit('close');
      }
    };
  },
  mounted() {
    window.addEventListener('click', this.clickListener);
    window.addEventListener('keydown', this.escListener);
  },
  beforeUnmount() {
    window.removeEventListener('click', this.clickListener);
    window.removeEventListener('keydown', this.escListener);
  }
}
</script>
