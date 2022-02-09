<template>
  <v-menu
    class="v-menu__content"
    :close-on-click="false"
    :close-on-content-click="false"
    transition="slide-x-reverse-transition"
    offset-x
    right
    v-model="showColors"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-show="!showColors"
        class="tool-box-drawer rounded-tr-0 rounded-br-0 rounded-tl-lg rounded-bl-lg"
        v-bind="attrs"
        v-on="on"
      >
        <div class="vertical">
          <chevron-down></chevron-down>
          Colors
        </div>
      </v-btn>
    </template>
    <v-card
      width="175px"
      height="315px"
    >
      <!-- subheader -->
      <v-subheader>
        <v-row
          justify="space-between"
          align="center"
        >
          <v-card-subtitle class="pl-3">
            Colors
          </v-card-subtitle>
          <div>
            <v-btn
              depressed
              color="white"
              width="16px"
              min-width="16px"
              @click="addCurrentColor"
            >
              <upload></upload>
            </v-btn>
            <v-btn
              depressed
              color="white"
              width="16px"
              min-width="16px"
              @click="showColors=!showColors"
            >
              <chevron-right></chevron-right>
            </v-btn>
          </div>
        </v-row>
      </v-subheader>
      <!-- picker -->
      <div @mousedown="pickStart" @click="pickColor">
        <v-color-picker
          ref="color-picker"
          class="color-picker"
          dot-size="13"
          canvas-height="165px"
          width="165px"
          hide-inputs
          v-model="colorValue"
          @update:color="pickCurrentColor"
        ></v-color-picker>
      </div>
      <!-- input -->
      <v-row
        justify="end"
        align="center"
      >
        <v-btn
          class="refresh-mode"
          depressed
          color="#0000"
          height="32px"
          min-height="32px"
          width="32px"
          min-width="32px"
          rounded
          @click="changeMode">
          <refresh-svg class="opacity-half"></refresh-svg>
        </v-btn>
      </v-row>
      <v-form
        onsubmit="return false;"
      >
        <v-container class="container">
          <!-- RGBA | HSLA -->
          <v-row
            v-if="mode === 'RGBA' || mode === 'HSLA'"
            dense
          >
            <v-col
              v-for="(item, index) in mode"
              :key="item"
              cols="3"
            >
              <v-text-field
                class="v-text-field"
                color="#000"
                :label="item"
                :rules="rules[`${mode}Rules`][index]"
                hide-details
                v-model="$data[mode][index]"
                @input="inputColor"
              ></v-text-field>
            </v-col>
          </v-row>
          <!-- hex -->
          <v-row
            v-show="mode==='hex'"
            dense
          >
            <v-col cols="10">
              <v-text-field
                ref="hexa-input"
                dense
                prefix="#"
                color="#000"
                :rules="rules.hexRules"
                hide-details
                v-model="hexa"
                @input="inputHex"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </v-menu>
</template>

<script>
require('@/assets/chevron')
import RefreshSvg from '@/assets/refresh.svg'
import Upload from '@/assets/upload.svg'

import {RGBARules, HSLARules, hexRules} from '@/scripts/rules'

import {checkRGBAObj, rgba2hexa, hsla2hexa, fixTwoDecimal} from '@/utils';

import {colorsKeypress} from '@/scripts/keypress.js'

export default {
  name: 'Colors',
  components: {
    RefreshSvg,
    Upload,
  },
  data() {
    return {
      showColors: true,
      pick: false,
      currentColor: {
        alpha: 1,
        hex: '#000000',
        hexa: '#000000FF',
        hsla: {h: 0, s: 0, l: 0, a: 1},
        hsva: {h: 0, s: 0, v: 0, a: 1},
        hue: 0,
        rgba: {r: 0, g: 0, b: 0, a: 1}
      },
      colorValue: '#000000ff',

      modeIndex: 0,
      modes: ['RGBA', 'HSLA', 'hex'],
      rules: {RGBARules, HSLARules, hexRules},
      RGBA: [0, 0, 0, 1],
      HSLA: [0, 0, 0, 1],
      hexa: '000000ff',
    }
  },
  computed: {
    mode() {
      return this.modes[this.modeIndex];
    }
  },
  methods: {
    changeMode() {
      this.modeIndex = (this.modeIndex + 1) % 3;
    },
    inputColor() {
      if (this.mode === 'RGBA') {
        this.colorValue = rgba2hexa(this.RGBA);
      }
      if (this.mode === 'HSLA') {
        this.colorValue = hsla2hexa(this.HSLA);
      }
    },
    inputHex(color) {
      this.colorValue = color || `#${this.hexa}`
    },
    pickCurrentColor(color) {
      this.currentColor = color;
      this.pickColor();
      this.$emit('change-current-color', this.currentColor);
    },
    setCurrentColor(color) {
      if (checkRGBAObj(color)) {
        color = rgba2hexa(Object.values(color));
      }
      this.inputHex(color);
      this.$refs['hexa-input'].$emit('input', color.slice(1));
    },
    pickStart() {
      window.addEventListener('mousemove', this.pickColor);
      window.addEventListener('mouseup', () => {
        window.removeEventListener('mousemove', this.pickColor);
      }, {
        once: true
      });
    },
    pickColor() {
      this.RGBA = [
        this.currentColor.rgba.r,
        this.currentColor.rgba.g,
        this.currentColor.rgba.b,
        this.currentColor.rgba.a
      ];
      this.HSLA = [
        this.currentColor.hsla.h,
        fixTwoDecimal(this.currentColor.hsla.s),
        fixTwoDecimal(this.currentColor.hsla.l),
        this.currentColor.hsla.a,
      ];
      this.hexa = this.currentColor.hexa.slice(1, 8);
    },
    addCurrentColor() {
      this.$emit('add-color', this.currentColor.hexa);
    }
  },
  mounted() {
    colorsKeypress(this);
  }
}
</script>

<style lang="scss" scoped>
.tool-box-drawer {
  position: absolute;
  right: 0;
  top: 360px !important;
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
  top: 360px !important;
  left: calc(100vw - 185px) !important;
}
.color-picker {
  margin: 0 auto;
}
.container {
  padding-top: 0;
}
.v-text-field {
  margin-top: 0;
  padding-top: 0;
}
.opacity-half {
  opacity: 0.6;
}
.refresh-mode {
  position: relative;
  right: 16px;
  top: 4px;
}
</style>