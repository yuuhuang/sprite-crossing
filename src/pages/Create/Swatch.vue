<template>
  <v-menu
    class="v-menu__content"
    :close-on-click="false"
    :close-on-content-click="false"
    transition="slide-x-reverse-transition"
    offset-x
    right
    v-model="showSwatch"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-show="!showSwatch"
        class="tool-box-drawer rounded-tr-0 rounded-br-0 rounded-tl-lg rounded-bl-lg"
        v-bind="attrs"
        v-on="on"
      >
        <div class="vertical">
          <chevron-down></chevron-down>
          Swatch
        </div>
      </v-btn>
    </template>
    <v-card
      width="175"
      height="340px"
    >
      <!-- subheader -->
      <v-subheader>
        <v-row
          justify="space-between"
          align="center"
        >
          <v-card-subtitle>
            Swatch
          </v-card-subtitle>
          <v-btn
            depressed
            color="white"
            width="16px"
            min-width="16px"
            @click="showSwatch=!showSwatch">
            <chevron-right></chevron-right>
          </v-btn>
        </v-row>
      </v-subheader>
      <v-container>
        <v-row>
          <v-col cols="7" class="pt-0">
            <color-switch ref="color-switch"></color-switch>
          </v-col>
          <v-col cols="5">
            <v-container class="flex-column pt-0 pl-0">
              <v-row>
                <color-block
                  v-for="item in recentSwatch"
                  :key="item"
                  :color="item"
                  size="16px"
                  margin="2px"
                ></color-block>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
      <v-divider></v-divider>
      <v-container class="swatch-grid">
        <color-block
          class="ma-auto"
          :style="{'grid-column': (index + 1) % 5, 'gird-row': index / 5 + 1}"
          v-for="(item, index) in customSwatch"
          :key="item"
          :color="item"
          size="24px"
          left-click
          right-click
          :focus="index === focusCustomIndex"
          @left-click="focusCustomIndex=index"
        ></color-block>
      </v-container>
    </v-card>
  </v-menu>
</template>

<script>
import ColorSwitch from './ColorSwitch';
import ColorBlock from './ColorBlock';
require('@/assets/chevron/index.js')

export default {
  name: 'Swatch',
  components: {ColorBlock, ColorSwitch},
  props: {
    currentColor: String,
    customSwatchInit: Array,
  },
  data() {
    return {
      showSwatch: true,
      customSwatch: [
        '#FF0000FF', '#AA0000FF', '#550000FF', '#FFFF00FF',
        '#AAAA00FF', '#555500FF', '#00FF00FF', '#00AA00FF',
        '#005500FF', '#00AAAAFF', '#005555FF', '#0000FFFF',
        '#0000AAFF', '#000055FF',
      ],
      recentSwatch: [
        '#FF0000FF', '#AA0000FF', '#550000FF', '#FFFF00FF',
        '#AAAA00FF', '#555500FF', '#00FF00FF', '#00AA00FF',
        '#005500FF', '#00FFFFFF', '#00AAAAFF', '#005555FF',
      ],
      focusCustomIndex: -1,
    }
  },
  watch: {
    recentSwatch(val) {
      if (val.length > 12) {
        val.splice(12);
      }
    },
    currentColor(val, oldVal) {
      this.$refs['color-switch'].setCurrentColor(val);
      if (this.recentSwatch.indexOf(oldVal) > -1) {
        // eslint-disable-next-line no-warning-comments
        // TODO: record recent color by pen and eyepoint
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.tool-box-drawer {
  position: absolute;
  right: 0;
  top: 10px !important;
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
  top: 10px !important;
  left: calc(100vw - 185px) !important;
}
.swatch-grid {
  display: grid;
  grid-template-columns: repeat(5, auto);
  grid-template-rows: repeat(6, 30px);
}

</style>