<template>
  <div class="screen-container">
    <div
      class="canvas-container"
      :style="{
        width: `${basicSize * currentScale + 8}px`,
        height: `${basicSize * currentScale + 8}px`
      }"
    >
      <canvas
        ref="drawing-board"
        class="drawing-board"
        :width="basicSize"
        :height="basicSize"
        :style="{transform: `scale(${currentScale})`}"
      ></canvas>
    </div>
  </div>
</template>

<script>
import {restrict} from '@/utils';
import {drawing} from './drawing';

export default {
  name: 'Board',
  props: {
    tool: String,
    color: Object,
  },
  data() {
    return {
      // Basic
      basicSize: 2560,
      imageSize: 128,
      // Scale
      currentScale: 0.25,
      maxScale: 1,
      minScale: 0.025,
      scaleSpeed: 0.001,
      // Grid
      gridShown: false,
    };
  },
  methods: {
    // Mouse Events
    mousedown(e) {
      switch (this.tool) {
        case 'pencil':
          drawing.drawPoint(this.getPosition(e.offsetX, e.offsetY), this.color);
          this.$refs['drawing-board'].onmousemove = this.mousemove;
          break;
        case 'eraser':
          break;
        case 'eyedropper':
          break;
        case 'bucket':
          break;
        case 'rectangle-fill':
          break;
        case 'rectangle-outline':
          break;
        case 'ellipse-fill':
          break;
        case 'ellipse-outline':
          break;
        case 'move':
          break;
        case 'zoom-in': {
          this.zoomIn();
          break;
        }
        case 'zoom-out': {
          this.zoomOut();
          break;
        }
        default:
          break;
      }
    },
    mousemove(e) {
      if (e.buttons) {
        drawing.pencil(this.getPosition(e.offsetX, e.offsetY), this.color);
      }
    },
    removeMoveEvent() {
      this.$refs['drawing-board'].onmousemove = null;
    },
    mouseout(e) {
      if (e.buttons) {
        drawing.drawLine(this.getPosition(e.offsetX, e.offsetY), this.color);
      }
    },
    getPosition(offsetX, offsetY) {
      return {
        x: restrict(Math.floor(this.imageSize * offsetX / this.basicSize), 0, this.imageSize - 1),
        y: restrict(Math.floor(this.imageSize * offsetY / this.basicSize), 0, this.imageSize - 1),
      }
    },
    // Scale
    zoomWheel(e) {
      e.preventDefault();
      this.currentScale = restrict(this.currentScale * (1 + e.deltaY * this.scaleSpeed), this.minScale, this.maxScale);
    },
    zoomIn() {
      this.currentScale = restrict(this.currentScale * 1.25, this.minScale, this.maxScale);
    },
    zoomOut() {
      this.currentScale = restrict(this.currentScale * 0.8, this.minScale, this.maxScale);
    },
    zoomResize() {
      this.currentScale = 0.25;
    },
    // Grid
    showGrid() {
      this.gridShown = true;
      console.log('show grid');
    },
    hideGrid() {
      this.gridShown = false;
      console.log('hide grid');
    },
  },
  watch: {
    currentScale: {
      handler(val) {
        this.$emit('scale', val);
      },
      immediate: true,
    }
  },
  mounted() {
    this.$refs['drawing-board'].onwheel = this.zoomWheel;
    this.$refs['drawing-board'].onmousedown = this.mousedown;
    this.$refs['drawing-board'].onmouseout = this.mouseout;
    document.body.onmouseup = this.removeMoveEvent;

    drawing.init(this.$refs['drawing-board'], this.imageSize);
  },
  beforeDestroy() {
    this.$refs['drawing-board'].onwheel = null;
    this.$refs['drawing-board'].onclick = null;
  }
}
</script>

<style scoped>
.screen-container {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.canvas-container {
  padding: 4px;
  border: solid 2px #ccc;
  border-radius: 2px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.drawing-board {
}
</style>