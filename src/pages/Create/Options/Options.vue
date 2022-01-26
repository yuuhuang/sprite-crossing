<template>
  <div class="options-container">
    <div class="btn-bar elevation-3">
      <option-item tip="New Project ( Ctrl + n )" value="new" left-style @click-option="clickOption">
        <new></new>
      </option-item>
      <option-item tip="Default Scale ( Ctrl + f )" value="rescale" @click-option="clickOption">
        <rescale></rescale>
      </option-item>
      <option-item tip="Show Grid ( Ctrl + g )" value="grid" with-chosen-status @click-option="clickOption">
        <grid></grid>
      </option-item>
      <option-item tip="Undo ( Ctrl + z )" value="undo" @click-option="clickOption">
        <undo></undo>
      </option-item>
      <option-item tip="Redo ( Ctrl + y )" value="redo" @click-option="clickOption">
        <redo></redo>
      </option-item>
      <option-item tip="Save ( Ctrl + s )" value="save" right-style @click-option="clickOption">
        <save></save>
      </option-item>
    </div>
  </div>
</template>

<script>
require('@/assets/optionsBar/index')

import OptionItem from './OptionItem';

export default {
  name: 'Options',
  components: {OptionItem},
  props: {
    currentScale: Number
  },
  data() {
    return {
      options: [],
    }
  },
  methods: {
    clickOption(val) {
      this.$emit('click-option', val);
    }
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
}
.btn-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  border-radius: 4px;
}
</style>