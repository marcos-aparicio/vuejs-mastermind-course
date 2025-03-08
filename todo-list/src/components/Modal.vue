<template>
  <input type="checkbox" :id="id" :checked="open" class="modal-toggle" />
  <div class="modal" role="dialog">
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
}
</script>
