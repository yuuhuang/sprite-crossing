<template>
  <canvas
    ref="grid"
    class="canvas"
  ></canvas>
</template>

<script>
export default {
  name: 'Grid',
  props: {
    size: Number,
  },
  data() {
    return {
      ctx: null
    }
  },
  mounted() {
    this.ctx = this.$refs.grid.getContext('2d');
    this.drawGrid();
  },
  watch: {
    size() {
      this.drawGrid();
    }
  },
  methods: {
    drawGrid() {
      this.$refs.grid.width = this.$refs.grid.height = this.size;
      this.ctx.clearRect(0, 0, this.size, this.size);
      this.ctx.beginPath();
      this.ctx.strokeStyle = '#FF4785';
      this.ctx.lineWidth = 1;
      this.ctx.moveTo(0, this.size / 2);
      this.ctx.lineTo(this.size, this.size / 2);
      this.ctx.moveTo(this.size / 2, 0);
      this.ctx.lineTo(this.size / 2, this.size);
      this.ctx.stroke();
    }
  }
}
</script>

<style scoped>
.canvas {
  background-color: #fff0;
  pointer-events: none;
  position: absolute;
  z-index: 3;
}
</style>