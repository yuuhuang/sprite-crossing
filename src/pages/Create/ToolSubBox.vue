<template>
  <v-menu
    transition="slide-x-transition"
    offset-x
    min-width="48px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-list-item
        v-bind="attrs"
        v-on="on"
        :value="mainTool">
        <v-tooltip
          right
          open-delay="100"
          transition="slide-x-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              depressed
              color="white"
              width="36px"
              min-width="36px"
              v-bind="attrs"
              v-on="on"
              @click="chooseTool(mainTool)"
            >
              <slot :name="mainTool"></slot>
            </v-btn>
          </template>
          <span>{{tips[chosenIndex] || mainTool}}</span>
        </v-tooltip>
      </v-list-item>
    </template>
    <v-list>
      <v-list-item
        class="sub-list-item"
        v-for="(item, index) in sideTools"
        :key="item"
        value=""
        inactive
        dense
      >
        <v-tooltip
          right
          open-delay="100"
          transition="slide-x-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              depressed
              color="white"
              width="36px"
              min-width="36px"
              v-bind="attrs"
              v-on="on"
              @click="chooseTool(item)"
            >
              <slot :name="item"></slot>
            </v-btn>
          </template>
          <span>{{chosenIndex <= index ? tips[index + 1] : tips[index]}}</span>
        </v-tooltip>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'ToolSubBox',
  props: {
    value: String,
    tool: String,
    defaultTool: String,
    subTools: Array,
    tips: Array,
  },
  computed: {
    mainTool() {
      return this.subTools.includes(this.tool) ? this.tool : this.defaultTool;
    },
    sideTools() {
      return this.subTools.filter(item => item !== this.mainTool);
    },
    chosenIndex() {
      return this.subTools.indexOf(this.mainTool);
    }
  },
  methods: {
    chooseTool(chosenTool) {
      this.$emit('choose-tool', chosenTool);
    }
  },
}
</script>

<style scoped>
.sub-list {
  width: 48px;
  min-width: 48px !important;
}
.sub-list-item {
  padding-left: 6px;
  padding-right: 6px;
  width: 48px;
  min-width: 48px !important;
  margin: 0;
}
</style>