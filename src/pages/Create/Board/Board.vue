<template>
  <div class="screen-container">
    <grid
      v-show="gridShown"
      :size="basicSize * currentScale + 8"
      :style="{
         transform: `translateX(${translateX * translateSpeed * currentScale}px)
         translateY(${translateY * translateSpeed * currentScale}px)`
      }"
    ></grid>
    <div
      class="canvas-container"
      :style="{
        width: `${basicSize * currentScale + 8}px`,
        height: `${basicSize * currentScale + 8}px`,
        transform: `translateX(${translateX * translateSpeed * currentScale}px)
         translateY(${translateY * translateSpeed * currentScale}px)`,
      }"
    >
      <mouse-track
        ref="mouse-track"
        :current-scale="currentScale"
        :image-size="imageSize"
        :color="color"
        :tool="tool"
      ></mouse-track>
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

import MouseTrack from './MouseTrack';
import Grid from './Grid';

export default {
  name: 'Board',
  components: {Grid, MouseTrack},
  props: {
    tool: String,
    color: Object,
    size: {
      type: Number,
      default: 32
    }
  },
  data() {
    return {
      // Basic
      imageSize: this.size,
      basicSize: 2560,
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
      listenDrawMove: false,
    };
  },
  methods: {
    // Mouse Events
    mousedown(e) {
      switch (this.tool) {
        case 'pencil':
          this.drawing.drawPoint(this.getPosition(e.offsetX, e.offsetY), this.color);
          this.listenDrawMove = true;
          break;
        case 'eraser':
          this.drawing.drawPoint(this.getPosition(e.offsetX, e.offsetY));
          this.listenDrawMove = true;
          break;
        case 'eyedropper':
          this.$emit('eyedropper-pick', this.drawing.getPixelColor(this.getPosition(e.offsetX, e.offsetY)));
          break;
        case 'bucket':
          this.drawing.fill(this.getPosition(e.offsetX, e.offsetY), this.color);
          break;
        case 'straight':
        case 'rectangle-fill':
        case 'rectangle-outline':
        case 'ellipse-fill':
        case 'ellipse-outline':
          this.drawing.setGeometryLast(this.getPosition(e.offsetX, e.offsetY));
          this.$refs['mouse-track'].mousedown(e);
          break;
        case 'move-object':
          this.drawing.setLast(this.getPosition(e.offsetX, e.offsetY));
          this.listenDrawMove = true;
          break;
        case 'move-board':
          this.translateFromX = e.offsetX;
          this.translateFromY = e.offsetY;
          this.listenDrawMove = true;
          break;
        default:
          break;
      }
    },
    mousemove(e) {
      if (e.buttons && this.listenDrawMove) {
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
      } else {
        this.$refs['mouse-track'].mousemove(e);
      }
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
        if (this.tool === 'pencil') {
          this.drawing.drawLine(this.getPosition(e.offsetX, e.offsetY), this.color);
        }
      } else {
        this.$refs['mouse-track'].clear();
      }
    },
    click() {
      switch (this.tool) {
        case 'pencil':
        case 'eraser':
        case 'bucket':
        case 'straight':
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
    mouseup(e) {
      switch (this.tool) {
        case 'straight':
          this.drawing.drawLine(this.getPosition(e.offsetX, e.offsetY), this.color, this.drawing.getGeometryLast());
          break;
        case 'rectangle-fill':
          this.drawing.drawRect(this.getPosition(e.offsetX, e.offsetY), this.color, true);
          break;
        case 'rectangle-outline':
          this.drawing.drawRect(this.getPosition(e.offsetX, e.offsetY), this.color);
          break;
        case 'ellipse-fill':
          this.drawing.drawArc(this.getPosition(e.offsetX, e.offsetY), this.color, true);
          break;
        case 'ellipse-outline':
          this.drawing.drawArc(this.getPosition(e.offsetX, e.offsetY), this.color);
          break;
        default:
          break;
      }
    },
    bodyMouseup(e) {
      this.listenDrawMove = false;
      if (this.tool === 'move-board') {
        this.translateFromX = e.offsetX;
        this.translateFromY = e.offsetY;
      }
      this.$refs['mouse-track'].clear();
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
    // Save
    save(fileName, size) {
      this.drawing.download(fileName, size);
    },
    // New
    create(size) {
      history.init();
      this.drawing = new Drawing();
      if (size) {
        this.drawing.init(this.$refs['drawing-board'], size);
        this.drawing.putImageData();
      } else if (Number(window.localStorage.getItem('size')) && Number(window.localStorage.getItem('size'))) {
        this.drawing.init(this.$refs['drawing-board'], Number(window.localStorage.getItem('size')));
        const localImageData = JSON.parse(window.localStorage.getItem('imageData'));
        localImageData.length = Number(window.localStorage.getItem('size')) ** 2 * 4;
        this.drawing.putImageData(Array.from(localImageData));
        this.imageSize = Number(window.localStorage.getItem('size'));
      } else {
        this.drawing.init(this.$refs['drawing-board'], this.imageSize);
        this.drawing.putImageData();
      }
      history.record(this.drawing.imageData.data);
      this.$refs['mouse-track'].init(size ?? this.imageSize);
    },
    // Storage
    storage() {
      window.localStorage.setItem('size', JSON.stringify(this.imageSize));
      window.localStorage.setItem('imageData', JSON.stringify(this.drawing.imageData.data));
    },
  },
  watch: {
    size(val) {
      this.imageSize = val;
    },
    currentScale: {
      handler(val) {
        this.$emit('scale', val);
      },
      immediate: true,
    }
  },
  mounted() {
    this.create();
    this.$refs['drawing-board'].onwheel = this.zoomWheel;
    this.$refs['drawing-board'].onmousedown = this.mousedown;
    this.$refs['drawing-board'].onmousemove = this.mousemove;
    this.$refs['drawing-board'].onmouseout = this.mouseout;
    this.$refs['drawing-board'].onmouseenter = this.mouseenter;
    this.$refs['drawing-board'].onclick = this.click;
    this.$refs['drawing-board'].onmouseup = this.mouseup;
    document.body.onmouseup = this.bodyMouseup;
    window.onbeforeunload = this.storage;
  },
  beforeDestroy() {
    this.$refs['drawing-board'].onwheel = null;
    this.$refs['drawing-board'].onmousedown = null;
    this.$refs['drawing-board'].onmousemove = null;
    this.$refs['drawing-board'].onmouseout = null;
    this.$refs['drawing-board'].onmouseenter = null;
    this.$refs['drawing-board'].onclick = null;
    this.$refs['drawing-board'].onmouseup = null;
    document.body.onmouseup = null;
    window.onbeforeunload = null;
    this.storage();
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
  background-color: #fff0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.drawing-board {
  background: url("./../../../assets/background/transparent-big.png");
}
</style>