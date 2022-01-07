<template>
  <v-menu
    class="v-menu__content"
    :close-on-click="false"
    :close-on-content-click="false"
    transition="slide-x-reverse-transition"
    offset-x
    right
    v-model="showTools"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-show="!showColors"
        class="tool-box-drawer rounded-tr-0 rounded-br-0 rounded-tl-lg rounded-bl-lg"
        v-bind="attrs"
        v-on="on"
      >
        <div class="vertical">
          <chevron-up></chevron-up>
          Colors
        </div>
      </v-btn>
    </template>
    <v-card
      width="210px"
    >
      <v-subheader>Colors</v-subheader>
      <v-color-picker
        class="color-picker"
        dot-size="13"
        canvas-height="200px"
        width="200px"
        mode="hexa"
        show-swatches
        :swatches="swatches"
        swatches-max-height="100"
      ></v-color-picker>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: 'Colors',
  data() {
    return {
      showColors: false,
      swatches: [
        ['#FF0000', '#AA0000', '#550000'],
        ['#FFFF00', '#AAAA00', '#555500'],
        ['#00FF00', '#00AA00', '#005500'],
        ['#00FFFF', '#00AAAA', '#005555'],
        ['#0000FF', '#0000AA', '#000055'],
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.tool-box-drawer {
  position: absolute;
  right: 0;
  top: 30px;
  min-width: 30px !important;
  width: 30px;
  height: 100px !important;
  padding: 0 !important;
}
.vertical {
  transform: rotateZ(90deg);
  width: 100px;
  height: 30px;
  line-height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.v-menu__content {
  top: 30px !important;
}
.color-picker {
  margin: 0 auto;
}
</style>