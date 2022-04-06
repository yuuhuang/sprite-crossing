<template>
  <v-container>
    <v-row class="list-scroll hide-scroll">
      <v-col :cols="12 / colsNum" v-for="(colItem, colIndex) in colArray" :key="colIndex">
        <WorkCard
          class="mb-6"
          v-for="(item, index) in workList.filter((item, index) => index % colsNum === colIndex)"
          :key="index"
          :work-data="item"
        ></WorkCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import WorkCard from './WorkCard'
import {workList} from '@/mock/workList'

export default {
  name: 'WorkList',
  components: {WorkCard},
  data() {
    return {
      // style
      colsNum: 0,
      // data
      workList,
    };
  },
  methods: {
    init() {
      switch (this.$vuetify.breakpoint.name) {
      case 'xs':
        this.colsNum = 1;
        break;
      case 'sm':
        this.colsNum = 2;
        break;
      case 'md':
        this.colsNum = 3;
        break;
      case 'lg':
        this.colsNum = 4;
        break;
      case 'xl':
        this.colsNum = 6;
        break;
      default:
        break;
      }
    }
  },
  computed: {
    breakpoint() {
      return this.$vuetify.breakpoint.name;
    },
    colArray() {
      return Array.from({length: this.colsNum});
    },
  },
  watch: {
    breakpoint: {
      handler() {
        this.init();
      },
      immediate: true,
    },
  },
}
</script>

<style lang="scss">
@import "src/styles/common";

.list-scroll {
  height: 80vh;
  overflow-y: scroll;
}
</style>