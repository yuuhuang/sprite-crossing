<template>
  <div>
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
            <v-card-subtitle class="pl-3">
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
            <v-col cols="5" class="pl-0 pb-0 pt-0">
            </v-col>
          </v-row>
        </v-container>
        <v-divider></v-divider>
        <color-group
          ref="color-group"
          :current-color="currentColor"
          @drag="handleDrag"
          @click-color="clickColor"
        ></color-group>
      </v-card>
    </v-menu>
    <trash class="trash" v-show="drag"></trash>
  </div>
</template>

<script>
import ColorSwitch from './ColorSwitch';
import ColorGroup from './ColorGroup';
import Trash from '@/components/Trash';
require('@/assets/chevron')

export default {
  name: 'Swatch',
  components: {ColorGroup, ColorSwitch, Trash},
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
      drag: false,
    }
  },
  watch: {
    recentSwatch(val) {
      if (val.length > 12) {
        val.splice(12);
      }
    },
    currentColor(val) {
      this.$refs['color-switch'].setCurrentColor(val);
    }
  },
  methods: {
    handleDrag(val) {
      this.drag = val;
    },
    addColor(color) {
      this.$refs['color-group'].addColor(color);
    },
    clickColor(color) {
      this.$emit('click-color', color);
    }
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
  z-index: 999;
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
.trash {
  position: absolute;
  top: 310px;
  left: calc(100vw - 230px);
  z-index: 999;
}

</style>