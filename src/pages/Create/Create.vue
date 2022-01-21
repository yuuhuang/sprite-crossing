<template>
  <div class="create-page">
    <tools ref="tools"></tools>
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
  </div>
</template>

<script>
import Tools from './Tools/Tools'
import Colors from './Colors/Colors'
import Swatch from './Swatch/Swatch';
import Navigator from './Navigator/Navigator';

export default {
  name: 'Create',
  components: {
    Tools,
    Colors,
    Swatch,
    Navigator,
  },
  data() {
    return {
      currentColor: {
        alpha: 1,
        hex: '#000000',
        hexa: '#000000FF',
        hsla: {h: 0, s: 0, l: 0, a: 1},
        hsva: {h: 0, s: 0, v: 0, a: 1},
        hue: 0,
        rgba: {r: 0, g: 0, b: 0, a: 1}
      },
    }
  },
  methods: {
    pickCurrentColor(color) {
      this.$set(this.$data, 'currentColor', color);
    },
    addColor(color) {
      this.$refs.swatch.addColor(color);
    },
    clickColor(color) {
      this.$refs.colors.setCurrentColor(color);
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