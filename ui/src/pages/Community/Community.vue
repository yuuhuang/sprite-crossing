<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="4">
          <sort-menu :options="['Latest', 'Most Comments', 'Most View']" @change="changeSort"></sort-menu>
        </v-col>
        <v-col>
          <v-btn width="100%" depressed color="#FF478534" @click="startDiscuss">
            <span style="color: #FF4785">Discuss</span>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pa-4 hide-scroll" style="height:85vh;overflow: scroll">
          <discuss-card
            class="mb-4"
            v-for="(discuss, index) in formatDiscussList"
            :key="index"
            :discuss-data="discuss"
            @close-dialog="init"
          ></discuss-card>
        </v-col>
      </v-row>
    </v-container>
    <start-discuss v-if="showStartDiscuss" @initiate="init" @close="showStartDiscuss=false"></start-discuss>
  </div>
</template>

<script>
import DiscussCard from '@/pages/Community/DiscussCard'
import SortMenu from '@/components/Menus/SortMenu'
import StartDiscuss from '@/pages/Community/StartDiscuss'

import {reqGetAllDiscusses} from '@/require/discuss';

export default {
  name: 'Community',
  components: {StartDiscuss, SortMenu, DiscussCard},
  data() {
    return {
      discussList: [],
      showStartDiscuss: false,
      sort: String,
    }
  },
  methods: {
    async init() {
      const result = await reqGetAllDiscusses();
      if (result) {
        this.discussList = result.discussList;
      }
    },
    changeSort(sort) {
      this.sort = sort;
    },
    startDiscuss() {
      this.showStartDiscuss = true;
    },
  },
  computed: {
    formatDiscussList() {
      let compare;
      const copyList = [...this.discussList];
      switch (this.sort) {
      case 'Most Comments':
        compare = (a, b) => b.commentNum - a.commentNum;
        break;
      case 'Most View':
        compare = (a, b) => b.viewNum - a.viewNum;
        break;
      default: // Latest
        compare = (a, b) => new Date(b.uploadTime) - new Date(a.uploadTime);
        break;
      }


      return copyList.sort(compare);
    },
  },
  created() {
    this.init();
  },
}
</script>

<style lang="scss">
@import "src/styles/common";
</style>