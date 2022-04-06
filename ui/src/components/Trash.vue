<template>
  <div ref="trash" class="outer elevation-6">
    <draggable
      class="draggable"
      v-bind="trashOptions"
    >
      <delete class="delete"></delete>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import Delete from '@/assets/delete.svg';

import {computePx} from '@/utils';

export default {
  name: 'Trash',
  components: {draggable, Delete},
  props: {
    size: {
      default: '40px',
      type: String,
    },
  },
  data() {
    return {
      trashOptions: {
        group: {
          name: 'trash',
          draggable: '.dropitem',
          put: () => true,
          pull: false
        }
      }
    }
  },
  mounted() {
    this.$refs.trash.style.setProperty('--size-px', this.size);
    this.$refs.trash.style.setProperty('--half-size-px', computePx(this.size, x => x / 2));
  },
}
</script>

<style scoped>
:root {
  --size-px: 40px;
  --half-size-px: 20px;
}
.outer {
  width: var(--size-px);
  height: var(--size-px);
  border-radius: 4px;
  background-color: white;
}
.delete {
  position: absolute;
  display: block;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin-top: calc(var(--half-size-px) - 12px);
  margin-left: calc(var(--half-size-px) - 12px);
  z-index: 1000;
}
.draggable {
  height: 100%;
  width: 100%;
  padding-top: calc(var(--half-size-px) - 12px);
}
</style>