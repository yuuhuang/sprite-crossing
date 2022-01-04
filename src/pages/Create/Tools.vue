<template>
  <v-menu
    class="v-menu__content"
    :close-on-click="false"
    :close-on-content-click="false"
    transition="slide-x-transition"
    offset-x
    left
    v-on:keyup.b="tool='pencil'"
    v-model="showTools"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        ref="drawer"
        v-show="!showTools"
        class="tool-box-drawer rounded-tr-lg rounded-br-lg rounded-tl-0 rounded-bl-0"
        v-bind="attrs"
        v-on="on"
      >
        <div class="vertical">
          Tools
          <chevron-up></chevron-up>
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
          default-tool="rectangle-fill"
          :sub-tools="['rectangle-fill', 'rectangle-outline', 'ellipse-fill', 'ellipse-outline']"
          :tips="[
              'Rectangle Filled Tool ( u )',
              'Rectangle Outline Tool ( Shift + u )',
              'Ellipse Filled Tool ( o )',
              'Ellipse Outline Tool ( Shift + o )'
          ]"
          @choose-tool="chooseSubTool"
        >
          <template>
            <rectangle-fill slot="rectangle-fill"></rectangle-fill>
            <rectangle-outline slot="rectangle-outline"></rectangle-outline>
            <ellipse-fill slot="ellipse-fill"></ellipse-fill>
            <ellipse-outline slot="ellipse-outline"></ellipse-outline>
          </template>
        </tool-sub-box>
        <tool-btn value="move" tip="Move Tool ( v )">
          <move></move>
        </tool-btn>
        <tool-sub-box
          :tool="tool"
          default-tool="zoom-in"
          :sub-tools="['zoom-in', 'zoom-out']"
          :tips="[
            'Zoom In ( z )',
            'Zoom Out ( Shift + z )',
          ]"
            @choose-tool="chooseSubTool"
        >
          <template>
            <zoom-in slot="zoom-in"></zoom-in>
            <zoom-out slot="zoom-out"></zoom-out>
            <zoom-resize slot="zoom-resize"></zoom-resize>
          </template>
        </tool-sub-box>
      </v-list-item-group>
      <tool-btn tip="Hide ToolBox">
        <chevron-left @click="showTools=false"></chevron-left>
      </tool-btn>
    </v-list>
  </v-menu>
</template>

<script>
require('@/assets/tools/index.js')
require('@/assets/chevron/index.js')
import ToolBtn from './ToolBtn'
import ToolSubBox from './ToolSubBox'

import {toolKeypress} from './keypress.js'

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
  methods: {
    chooseSubTool(subTool) {
      this.tool = subTool;
    }
  },
  mounted() {
    toolKeypress(this);
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