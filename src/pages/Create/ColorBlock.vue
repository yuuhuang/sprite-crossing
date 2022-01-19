<template>
  <div
    class="block"
    ref="color-block"
    :style="{
      width: size,
      height: size,
      backgroundColor: color,
      borderRadius: '2px',
      border: `${border} !important`,
    }"
  ></div>
</template>

<script>
import {computePx} from '@/utils'

export default {
  name: 'ColorBlock',
  props: {
    size: {
      type: String,
      default: '20px'
    },
    color: {
      type: String,
      default: '#666'
    },

    focus: {
      type: Boolean,
      default: false,
    },
    leftClick: {
      type: Boolean,
      default: false,
    },
    rightClick: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      border: 'none',
    }
  },
  watch: {
    focus(val) {
      if (!val) {
        this.border = 'none'
      }
    }
  },
  mounted() {
    this.$refs['color-block'].style.setProperty(
'--triangle-size',
         computePx(this.size, x => Math.ceil(x / 4))
    );
    this.$refs['color-block'].style.setProperty('--block-size', this.size);

    if (this.leftClick) {
      this.$refs['color-block'].addEventListener('click', () => {
        this.border = '4px ridge #0006';
        console.log(this.border);
        this.$emit('left-click', this.color);
      })
    }
    if (this.rightClick) {
      this.$refs['color-block'].addEventListener('contextmenu', e => {
        e.preventDefault();
        console.log(e);
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.block {
  display: inline-block;
}
</style>