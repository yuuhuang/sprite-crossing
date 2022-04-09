<template>
  <v-container>
    <v-row class="list-scroll hide-scroll">
      <v-col :cols="12 / colsNum" v-for="(colItem, colIndex) in colArray" :key="colIndex">
        <WorkCard
          class="mb-6"
          v-for="item in formatWorksList.filter((item, index) => index % colsNum === colIndex)"
          :work="item"
          :key="item.title"
        ></WorkCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import WorkCard from './WorkCard'
import {reqGetAllWorks} from '@/require/work';

export default {
  name: 'WorkList',
  components: {WorkCard},
  props: {
    sort: String,
    search: String,
  },
  data() {
    return {
      // style
      colsNum: 0,
      // data
      worksList: [],
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
    formatWorksList() {
      let compare;
      const copyList = [...this.worksList];
      switch (this.sort) {
      case 'Favourite':
        compare = (a, b) => b.likeNum - a.likeNum;
        break;
      case 'Most View':
        compare = (a, b) => b.viewNum - a.viewNum;
        break;
      default: // Latest
        compare = (a, b) => a.uploadTime - b.uploadTime;
        break;
      }
      if (this.search) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return copyList.sort(compare).filter(item => item.title.includes(this.search) ||
            item.description.includes(this.search) ||
            item.tags.some(tag => tag.includes(this.search)));
      }

      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return copyList.sort(compare);
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
  async created() {
    const result = await reqGetAllWorks();
    this.worksList = result.worksList;
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