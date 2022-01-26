<template>
  <div class="screen-container">
    <div class="canvas-container">
      <canvas
        ref="drawing-board"
        class="drawing-board"
        :width="basicSize * currentScale"
        :height="basicSize * currentScale"
      ></canvas>
    </div>
  </div>
</template>

<script>
import {restrict} from '@/utils';

export default {
  name: 'Board',
  props: {
    tool: String,
  },
  data() {
    return {
      // Basic
      basicSize: 500,
      // Scale
      currentScale: 1,
      maxScale: 8,
      minScale: 0.125,
      scaleSpeed: 0.001,
      // Grid
      gridShown: false,
    };
  },
  methods: {
    click() {
      switch (this.tool) {
        case 'pencil':
        case 'eraser':
        case 'eyedropper':
        case 'bucket':
        case 'rectangle-fill':
        case 'rectangle-outline':
        case 'ellipse-fill':
        case 'ellipse-outline':
        case 'move':
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
    // Scale
    zoomWheel(e) {
      e.preventDefault();
      this.currentScale = restrict(this.currentScale - e.deltaY * this.scaleSpeed, this.minScale, this.maxScale);
    },
    zoomIn() {
      this.currentScale = restrict(this.currentScale + 0.2, this.minScale, this.maxScale);
    },
    zoomOut() {
      this.currentScale = restrict(this.currentScale - 0.2, this.minScale, this.maxScale);
    },
    zoomResize() {
      this.currentScale = 1;
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
    this.$refs['drawing-board'].onclick = this.click;
  },
  destroyed() {
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
}
.drawing-board {
}
</style>