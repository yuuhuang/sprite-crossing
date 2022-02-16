<template>
  <canvas
    ref="canvas"
    class="canvas"
    :width="basicSize"
    :height="basicSize"
    :style="{
      transform: `scale(${currentScale})`,
    }"
  ></canvas>
</template>

<script>
import {Drawing} from './drawing';

export default {
  name: 'TrackCanvas',
  props: {
    currentScale: {
      default: 0.25,
      type: Number
    },
    imageSize: {
      default: 32,
      type: Number
    },
    tool: {
      default: 'pencil',
      type: String
    },
    color: Object
  },
  data() {
    return {
      basicSize: 2560,
      track: null,
    }
  },
  methods: {
    init(size) {
      this.track = new Drawing();
      this.track.init(this.$refs.canvas, size ?? this.imageSize);
      this.track.putImageData();
    },
    mousemove(e) {
      switch (this.tool) {
        case 'pencil':
        case 'rectangle-fill':
        case 'rectangle-outline':
        case 'ellipse-fill':
        case 'ellipse-outline':
          this.track.clearBoard();
          this.track.drawPoint(this.getPosition(e.offsetX, e.offsetY), this.color);
          break;
        default:
          break;
      }

      return false;
    },
    mouseout() {
      this.track.clearBoard();
    },
    getPosition(offsetX, offsetY) {
      return {
        x: Math.floor(this.imageSize * offsetX / this.basicSize),
        y: Math.floor(this.imageSize * offsetY / this.basicSize),
      }
    },
  },
  watch: {
    tool(val) {
      if (!['pencil', 'rectangle-fill', 'rectangle-outline', 'ellipse-fill', 'ellipse-outline'].includes(val)) {
        this.track.clearBoard();
      }
    }
  },
  mounted() {
    this.init();
  },
}
</script>

<style scoped>
.canvas {
  background-color: #fff0;
  pointer-events: none;
  position: absolute;
  z-index: 2;
}
</style>