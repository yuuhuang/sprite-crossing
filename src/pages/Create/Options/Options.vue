<template>
  <div class="options-container">
    <div class="btn-bar elevation-1">
      <option-item tip="New Project" ref="new" value="new" left-style @click-option="clickOption">
        <new></new>
      </option-item>
      <option-item tip="Reset ( Ctrl + f )" ref="reset" value="reset" @click-option="clickOption">
        <reset></reset>
      </option-item>
      <option-item tip="Show Grid ( Ctrl + g )" ref="grid" value="grid" with-chosen-status @click-option="clickOption">
        <grid></grid>
      </option-item>
      <option-item
        tip="Undo ( Ctrl + z )" ref="undo" value="undo" :disabled="!history.canUndo()" @click-option="clickOption">
        <undo></undo>
      </option-item>
      <option-item
        tip="Redo ( Ctrl + y )" ref="redo" value="redo" :disabled="!history.canRedo()" @click-option="clickOption">
        <redo></redo>
      </option-item>
      <option-item tip="Save ( Ctrl + s )" ref="save" value="save" right-style @click-option="clickOption">
        <save></save>
      </option-item>
    </div>
  </div>
</template>

<script>
require('@/assets/optionsBar/index')

import OptionItem from './OptionItem';

import {optionsKeypress} from '@/scripts/keypress';

import {history} from '@/pages/Create/Board/history';

export default {
  name: 'Options',
  components: {OptionItem},
  props: {
    currentScale: Number
  },
  data() {
    return {
      options: [],
      history,
    }
  },
  methods: {
    clickOption(val) {
      this.$emit('click-option', val);
    }
  },
  mounted() {
    optionsKeypress(this);
  }
}
</script>

<style scoped>
.options-container {
  position: absolute;
  width: 100%;
  height: 0;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.btn-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  border-radius: 4px;
}
</style>