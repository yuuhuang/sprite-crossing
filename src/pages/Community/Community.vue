<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="3">
          <sort-menu @change="changeSort"></sort-menu>
        </v-col>
        <v-col>
          <v-btn width="100%" depressed color="#FF478534" @click="startDiscuss">
            <span style="color: #FF4785">Discuss</span>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pa-4 hide-scroll" style="height:89vh;overflow: scroll">
          <discuss-card
            class="mb-4"
            v-for="(discuss, index) in discussList"
            :key="index"
            :discuss-data="discuss"
          ></discuss-card>
        </v-col>
      </v-row>
    </v-container>
    <start-discuss v-if="showStartDiscuss" @close="showStartDiscuss=false"></start-discuss>
  </div>
</template>

<script>
import DiscussCard from '@/pages/Community/DiscussCard'
import SortMenu from '@/components/Menus/SortMenu'
import StartDiscuss from '@/pages/Community/StartDiscuss'
import {discussList} from '@/mock/discussList'

export default {
  name: 'Community',
  components: {StartDiscuss, SortMenu, DiscussCard},
  data() {
    return {
      discussList,
      showStartDiscuss: false,
    }
  },
  methods: {
    changeSort(sort) {
      console.log(sort);
    },
    startDiscuss() {
      this.showStartDiscuss = true;
    },
  },
}
</script>

<style lang="scss">
@import "src/styles/common";
</style>