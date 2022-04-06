<template>
  <v-container>
    <draggable
      :style="{
        display: 'grid',
        'grid-template-columns': `repeat(${cols}, auto)`,
        'grid-template-rows': `repeat(${rows}, ${ceilSize})`
      }"
      v-model="colors"
      @start="startDrag"
      @end="endDrag"
    >
      <div
        :class="{'flex-center': true, 'focus': focusColor === item}"
        v-for="(item, index) in colors"
        :key="index"
      >
        <color-block
          class="elevation-2 pointer"
          :color="item"
          :size="size"
          @left-click="clickColor(item)"
        ></color-block>
      </div>
    </draggable>
  </v-container>
</template>

<script>
import ColorBlock from './ColorBlock';
import draggable from 'vuedraggable';

import {computePx} from '@/utils';

export default {
  name: 'ColorGroup',
  components: {ColorBlock, draggable},
  props: {
    rows: {
      type: Number,
      default: 6
    },
    cols: {
      type: Number,
      default: 5
    },
    size: {
      type: String,
      default: '24px',
    },
    currentColor: String,
    colorsInit: {
      type: Array,
      default: () => [
        '#FF0000FF', '#AA0000FF', '#550000FF', '#FFFF00FF',
        '#AAAA00FF', '#555500FF', '#00FF00FF', '#00AA00FF',
        '#005500FF', '#00AAAAFF', '#005555FF', '#0000FFFF',
      ]
    },
  },
  data() {
    return {
      focusColor: this.currentColor,
      colors: this.colorsInit,
      ceilSize: computePx(this.size, x => x * 5 / 4),
    }
  },
  watch: {
    currentColor(val) {
      if (val) {
        this.focusColor = this.currentColor;
      }
    },
    // focusColor(val) {
    //   if (val) {
    //     this.$emit('choose-color', val);
    //   }
    // }
  },
  methods: {
    addColor(val) {
      if (this.colors.length < 30) {
        this.colors.push(val);
      }
    },
    startDrag() {
      this.$emit('drag', true);
    },
    endDrag() {
      this.$emit('drag', false);
    },
    clickColor(item) {
      this.focusColor = item;
      this.$emit('click-color', this.focusColor);
    }
  }
}
</script>

<style scoped>
.flex-center {
  display: flex !important;
  justify-content: center;
  align-items: center;
}
.focus {
  transform: rotateZ(45deg);
  transition: transform 0.5s cubic-bezier(.35,.06,.59,1.62);
}
.pointer:hover {
  cursor: pointer;
}
</style>