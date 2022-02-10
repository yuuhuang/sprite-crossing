<template>
  <div class="screen-container">
    <grid
      v-show="gridShown"
      :size="basicSize * currentScale + 8"
      style="position: absolute; z-index: 1"
    ></grid>
    <div
      class="canvas-container"
      :style="{
        width: `${basicSize * currentScale + 8}px`,
        height: `${basicSize * currentScale + 8}px`,
        transform: `translateX(${translateX * translateSpeed * currentScale}px)
         translateY(${translateY * translateSpeed * currentScale}px)`
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
import {Drawing} from './drawing';
import {history} from './history';

import Grid from './Grid';

export default {
  name: 'Board',
  components: {Grid},
  props: {
    tool: String,
    color: Object,
  },
  data() {
    return {
      // Basic
      basicSize: 2560,
      imageSize: 16,
      // Scale
      currentScale: 0.25,
      maxScale: 1,
      minScale: 0.025,
      scaleSpeed: 0.001,
      // translate
      translateX: 0,
      translateY: 0,
      translateFromX: 0,
      translateFromY: 0,
      translateSpeed: 1,
      // Grid
      gridShown: false,
      // Drawing
      drawing: null,
    };
  },
  methods: {
    // Mouse Events
    mousedown(e) {
      switch (this.tool) {
        case 'pencil':
          this.drawing.drawPoint(this.getPosition(e.offsetX, e.offsetY), this.color);
          this.$refs['drawing-board'].onmousemove = this.mousemove;
          break;
        case 'eraser':
          this.drawing.drawPoint(this.getPosition(e.offsetX, e.offsetY));
          this.$refs['drawing-board'].onmousemove = this.mousemove;
          break;
        case 'eyedropper':
          this.$emit('eyedropper-pick', this.drawing.getPixelColor(this.getPosition(e.offsetX, e.offsetY)));
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
        case 'move-object':
          this.drawing.setLast(this.getPosition(e.offsetX, e.offsetY));
          this.$refs['drawing-board'].onmousemove = this.mousemove;
          break;
        case 'move-board':
          this.translateFromX = e.offsetX;
          this.translateFromY = e.offsetY;
          this.$refs['drawing-board'].onmousemove = this.mousemove;
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
        switch (this.tool) {
          case 'pencil':
            this.drawing.drawLine(this.getPosition(e.offsetX, e.offsetY), this.color);
            break;
          case 'eraser':
            this.drawing.drawLine(this.getPosition(e.offsetX, e.offsetY));
            break;
          case 'move-object':
            this.drawing.translate(this.getPosition(e.offsetX, e.offsetY));
            break;
          case 'move-board':
            this.translateX += e.offsetX - this.translateFromX;
            this.translateY += e.offsetY - this.translateFromY;
            break;
          default:
            break;
        }
      }
    },
    removeMoveEvent() {
      this.$refs['drawing-board'].onmousemove = null;
    },
    mouseenter(e) {
      switch (this.tool) {
        case 'pencil':
          this.drawing.setLast(this.getPosition(e.offsetX, e.offsetY));
          break;
        default:
          break;
      }
    },
    mouseout(e) {
      if (e.buttons) {
        switch (this.tool) {
          case 'pencil':
            this.drawing.drawLine(this.getPosition(e.offsetX, e.offsetY), this.color);
            history.record(this.drawing.imageData.data);
            break;
          case 'eraser':
          case 'bucket':
          case 'rectangle-fill':
          case 'rectangle-outline':
          case 'ellipse-fill':
          case 'ellipse-outline':
            history.record(this.drawing.imageData.data);
            break;
          default:
            break;
        }
      }
    },
    click() {
      switch (this.tool) {
        case 'pencil':
        case 'eraser':
        case 'bucket':
        case 'rectangle-fill':
        case 'rectangle-outline':
        case 'ellipse-fill':
        case 'ellipse-outline':
          history.record(this.drawing.imageData.data);
          break;
        default:
          break;
      }
    },
    bodyMouseup(e) {
      this.removeMoveEvent();
      if (this.tool === 'move-board') {
        this.translateFromX = e.offsetX;
        this.translateFromY = e.offsetY;
      }
    },
    getPosition(offsetX, offsetY) {
      return {
        x: Math.floor(this.imageSize * offsetX / this.basicSize),
        y: Math.floor(this.imageSize * offsetY / this.basicSize),
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
    // Translate
    translateReset() {
      this.translateX = 0;
      this.translateY = 0;
    },
    // Grid
    showGrid() {
      this.gridShown = true;
    },
    hideGrid() {
      this.gridShown = false;
    },
    // Redo && Undo
    redo() {
      this.drawing.putImageData(history.redo());
    },
    undo() {
      this.drawing.putImageData(history.undo());
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
    this.drawing = new Drawing();

    this.$refs['drawing-board'].onwheel = this.zoomWheel;
    this.$refs['drawing-board'].onmousedown = this.mousedown;
    this.$refs['drawing-board'].onmouseout = this.mouseout;
    this.$refs['drawing-board'].onmouseenter = this.mouseenter;
    this.$refs['drawing-board'].onclick = this.click;
    document.body.onmouseup = this.bodyMouseup;

    this.drawing.init(this.$refs['drawing-board'], this.imageSize);
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