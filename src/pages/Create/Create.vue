<template>
  <div class="create-page">
    <tools ref="tools" @tool="tool => this.currentTool=tool"></tools>
    <navigator ref="navigator" v-if="false"></navigator>
    <swatch
      ref="swatch"
      :current-color="currentColor.hexa"
      @click-color="clickColor"
    ></swatch>
    <colors
      ref="colors"
      @add-color="addColor"
      @change-current-color="pickCurrentColor"
    ></colors>
    <board
      ref="board"
      :tool="currentTool"
      :color="currentColor.rgba"
      @scale="scale => this.currentScale=scale"
      @eyedropper-pick="color => this.$refs.colors.setCurrentColor(color)"
    ></board>
    <options ref="options" :current-scale="currentScale" @click-option="clickOption"></options>
  </div>
</template>

<script>
import Tools from './Tools/Tools'
import Colors from './Colors/Colors'
import Swatch from './Swatch/Swatch';
import Navigator from './Navigator/Navigator';
import Board from './Board/Board';
import Options from './Options/Options';

export default {
  name: 'Create',
  components: {
    Options,
    Board,
    Tools,
    Colors,
    Swatch,
    Navigator,
  },
  data() {
    return {
      currentTool: 'pencil',
      currentColor: {
        alpha: 1,
        hex: '#000000',
        hexa: '#000000FF',
        hsla: {h: 0, s: 0, l: 0, a: 1},
        hsva: {h: 0, s: 0, v: 0, a: 1},
        hue: 0,
        rgba: {r: 0, g: 0, b: 0, a: 1}
      },
      currentScale: 0.25,
    }
  },
  methods: {
    // Colors
    pickCurrentColor(color) {
      this.$set(this.$data, 'currentColor', color);
    },
    addColor(color) {
      this.$refs.swatch.addColor(color);
    },
    // Swatch
    clickColor(color) {
      this.$refs.colors.setCurrentColor(color);
    },
    // Options
    clickOption(option) {
      switch (option) {
        case 'new':
          this.newProject();
          break;
        case 'rescale':
          this.$refs.board.zoomResize();
          break;
        case 'grid':
          if (this.$refs.board.gridShown) {
            this.$refs.board.hideGrid();
          } else {
            this.$refs.board.showGrid();
          }
          break;
        case 'undo':
          this.undo();
          break;
        case 'redo':
          this.redo();
          break;
        case 'save':
          this.save();
          break;
        default:
          break;
      }
    },
    newProject() {
      console.log('new project');
    },
    undo() {
      console.log('undo');
    },
    redo() {
      console.log('redo');
    },
    save() {
      console.log('save');
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/colors';

.create-page {
  background-color: $gray;
  height: 100%;
}
</style>