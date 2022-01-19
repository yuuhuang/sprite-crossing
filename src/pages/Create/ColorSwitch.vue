<template>
  <div :style="{width: size, height: size, position: 'relative'}">
    <v-tooltip
      bottom
      right
      open-delay="100"
    >
      <template v-slot:activator="{on, attrs}">
        <v-btn
          v-on="on"
          v-bind="attrs"
          :min-width="computePx(size, val => val / 4)"
          :min-height="computePx(size, val => val / 4)"
          :width="computePx(size, val => val / 4)"
          :height="computePx(size, val => val / 4)"
          depressed
          color="#fff"
          :style="{
            position: 'absolute',
            width: `${computePx(size, val => val / 4)} !important`,
            padding: '0 !important',
            top: computePx(size, val => val / 2 + 10),
            left: computePx(size, val => val / 8),
        }"
          @click="swap"
        >
          <arrow-swap></arrow-swap>
        </v-btn>
      </template>
      <span>Swap Color ( x )</span>
    </v-tooltip>
    <div
      class="border"
      :style="{
        height: computePx(size, val => val / 2),
        width: computePx(size, val => val / 2),
        position: 'relative',
        top: computePx(size, val => val / 8),
        left: computePx(size, val => val / 8),
      }"
    >
      <color-block
        :color="reserveColor"
        :size="computePx(size, val => (val - 12) / 2)"
      ></color-block>
    </div>
    <div
      class="border"
      :style="{
        height: computePx(size, val => val / 2),
        width: computePx(size, val => val / 2),
        position: 'relative',
        bottom: computePx(size, val => val / 8),
        left: computePx(size, val => 3 * val / 8),
      }"
    >
      <color-block
        :color="currentColor"
        :size="computePx(size, val => (val - 12) / 2)"
      ></color-block>
    </div>
  </div>
</template>

<script>
import ColorBlock from './ColorBlock'

import {computePx} from '@/utils'

import {swapColorKeypress} from '@/scripts/keypress'

import ArrowSwap from '@/assets/arrow-swap.svg'

export default {
  name: 'ColorSwitch',
  components: {ColorBlock, ArrowSwap},
  props: {
    size: {
      type: String,
      default: '80px'
    },
    currentInit: {
      type: String,
      default: '#000000ff'
    },
    reserveInit: {
      type: String,
      default: '#ffffffff'
    }
  },
  data() {
    return {
      computePx,
      currentColor: this.currentInit,
      reserveColor: this.reserveInit,
    }
  },
  methods: {
    swap() {
      [this.currentColor, this.reserveColor] = [this.reserveColor, this.currentColor];
    },
    setCurrentColor(color) {
      this.currentColor = color;
    }
  },
  mounted() {
    swapColorKeypress(this);
  }
}
</script>

<style scoped>
.border {
  border: 1px solid #ccc;
  border-radius: 2px;
  background-color: #eee;
  padding: 2px;
}
</style>