<template>
  <v-dialog width="480" scrollable v-model="show" @input="input">
    <v-card width="100%">
      <v-card-text
        class="title-field pb-2"
        :style="{
          backgroundImage: `linear-gradient(#0000, 40%, #ccc), url(${userData.backgroundImage})`}">
        <v-avatar size="64" class="avatar">
          <v-img :src="userData.avatar"></v-img>
        </v-avatar>
        <h1 class="mt-3 nickname">{{ userData.nickname }}</h1>
        <h4 class="mt-2 self-introduction">{{ userData.bio }}</h4>
      </v-card-text>
      <v-card-title class="flex justify-space-between pb-0">
        Art Works
        <div class="flex-center">
          <heart class="mr-2"></heart>
          {{ userData.likeNum }}
        </div>
      </v-card-title>
      <v-card-text class="pt-8 pr-8 pl-4 hide-scroll" style="max-height: 360px">
        <work-time-line :work-list="userData.workList" profile-dialog></work-time-line>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import {user} from '@/mock/user'
import WorkTimeLine from '@/pages/Profile/WorkTimeLine';
require('@/assets/cards')

export default {
  name: 'ProfileDialog',
  components: {WorkTimeLine},
  props: {
    userId: Number,
  },
  data() {
    return {
      userData: user,
      show: false,
    };
  },
  methods: {
    input(state) {
      if (!state) {
        this.$emit('close');
      }
    },
    clickWork(work) {
      console.log('open work', work);
    },
  },
  mounted() {
    this.show = true;
  },
}
</script>

<style lang="scss">
@import "src/styles/common";

.title-field {
  height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  background-size: cover;
  background-position: center;
}
.avatar {
  border: white 3px solid;
}
.nickname {
  color: white;
  text-shadow: 1px 1px 1px black;
}
.self-introduction {
  color: white;
  text-shadow: 1px 1px 1px #666;
}
</style>