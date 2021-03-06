<template>
  <v-menu
    class="v-menu__content"
    :close-on-click="false"
    :close-on-content-click="false"
    transition="slide-x-transition"
    offset-x
    left
    v-model="showTools"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-show="!showTools"
        class="tool-box-drawer rounded-tr-lg rounded-br-lg rounded-tl-0 rounded-bl-0"
        v-bind="attrs"
        v-on="on"
      >
        <div class="vertical">
          Tools
          <chevron-down></chevron-down>
        </div>
      </v-btn>
    </template>
    <v-list
      subheader
    >
      <v-subheader>
        Tools
      </v-subheader>
      <v-list-item-group
        v-model="tool"
        mandatory
      >
        <tool-btn value="pencil" tip="Pencil Tool ( b )">
          <pencil></pencil>
        </tool-btn>
        <tool-btn value="eraser" tip="Eraser Tool ( e )">
          <eraser></eraser>
        </tool-btn>
        <tool-btn value="eyedropper" tip="Eyedropper Tool ( i )">
          <eyedropper></eyedropper>
        </tool-btn>
        <tool-btn value="bucket" tip="Bucket Tool ( g )">
          <bucket></bucket>
        </tool-btn>
        <tool-sub-box
          :tool="tool"
          default-tool="straight"
          :sub-tools="['straight', 'rectangle-fill', 'rectangle-outline', 'ellipse-fill', 'ellipse-outline']"
          :tips="[
            'Straight Line Tool ( l )',
            'Rectangle Filled Tool ( u )',
            'Rectangle Outline Tool ( Shift + u )',
            'Ellipse Filled Tool ( o )',
            'Ellipse Outline Tool ( Shift + o )'
          ]"
          @choose-tool="chooseSubTool"
        >
          <template>
            <straight slot="straight"></straight>
            <rectangle-fill slot="rectangle-fill"></rectangle-fill>
            <rectangle-outline slot="rectangle-outline"></rectangle-outline>
            <ellipse-fill slot="ellipse-fill"></ellipse-fill>
            <ellipse-outline slot="ellipse-outline"></ellipse-outline>
          </template>
        </tool-sub-box>
        <tool-sub-box
          :tool="tool"
          default-tool="move-object"
          :sub-tools="['move-object', 'move-board']"
          :tips="[
            'Move Object ( v )',
            'Move Board ( space )',
          ]"
            @choose-tool="chooseSubTool"
        >
          <template>
            <move-object slot="move-object"></move-object>
            <move-board slot="move-board"></move-board>
          </template>
        </tool-sub-box>
<!--        <tool-sub-box-->
<!--          :tool="tool"-->
<!--          default-tool="zoom-in"-->
<!--          :sub-tools="['zoom-in', 'zoom-out']"-->
<!--          :tips="[-->
<!--            'Zoom In ( z )',-->
<!--            'Zoom Out ( Shift + z )',-->
<!--          ]"-->
<!--            @choose-tool="chooseSubTool"-->
<!--        >-->
<!--          <template>-->
<!--            <zoom-in slot="zoom-in"></zoom-in>-->
<!--            <zoom-out slot="zoom-out"></zoom-out>-->
<!--          </template>-->
<!--        </tool-sub-box>-->
      </v-list-item-group>
      <tool-btn tip="Hide ToolBox">
        <chevron-left @click="showTools=false"></chevron-left>
      </tool-btn>
    </v-list>
  </v-menu>
</template>

<script>
require('@/assets/tools')
require('@/assets/chevron')
import ToolBtn from './ToolBtn'
import ToolSubBox from './ToolSubBox'

import {toolsKeypress} from '@/scripts/keypress.js'

export default {
  name: 'Tools',
  components: {
    ToolBtn,
    ToolSubBox
  },
  data() {
    return {
      tool: '',
      showTools: true,
    }
  },
  watch: {
    tool: {
      handler(val) {
        this.$emit('tool', val);
      },
      immediate: true,
    }
  },
  methods: {
    chooseSubTool(subTool) {
      this.tool = subTool;
    }
  },
  mounted() {
    toolsKeypress(this);
  },
}
</script>

<style scoped>
.tool-box-drawer {
  position: absolute;
  left: 0;
  top: 100px;
  min-width: 30px !important;
  width: 30px;
  height: 90px !important;
  padding: 0 !important;
  z-index: 199;
}
.vertical {
  transform: rotateZ(-90deg);
  width: 90px;
  height: 30px;
  line-height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.v-menu__content {
  top: 100px !important;
}
</style>