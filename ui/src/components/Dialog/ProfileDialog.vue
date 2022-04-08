<template>
  <v-dialog width="480" scrollable v-model="show" @input="input">
    <v-card width="100%">
      <v-card-text
        class="title-field pb-2"
        :style="{
          backgroundImage: `linear-gradient(#0000, 50%, #fff), url(${backgroundSrc})`}">
        <v-avatar size="64" class="avatar">
          <v-img :src="avatarSrc"></v-img>
        </v-avatar>
        <h1 class="mt-3 nickname">{{ user.nickname }}</h1>
        <h4 class="mt-2 self-introduction">{{ user.bio }}</h4>
      </v-card-text>
      <v-card-title class="flex justify-space-between pb-0">
        Art Works
        <div class="flex-center">
          <heart class="mr-2"></heart>
          {{ user.likeNum }}
        </div>
      </v-card-title>
      <v-card-text class="pt-8 pr-8 pl-4 hide-scroll" style="max-height: 360px">
        <work-time-line :work-list="user.worksList || []" profile-dialog></work-time-line>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import WorkTimeLine from '@/pages/Profile/WorkTimeLine';
import {reqGetUser} from '../../require/user';
require('@/assets/cards');

export default {
  name: 'ProfileDialog',
  components: {WorkTimeLine},
  props: {
    nickname: String,
  },
  data() {
    return {
      user: {},
      show: false,
    };
  },
  methods: {
    async init() {
      this.user = await reqGetUser();
    },
    input(state) {
      if (!state) {
        this.$emit('close');
      }
    },
    clickWork(work) {
      console.log('open work', work);
    },
  },
  computed: {
    backgroundSrc() {
      if (this.user.backgroundImage) {
        return `${this.$store.state.imagePrefix}image/background/${this.user.backgroundImage}`;
      }

      return '';
    },
    avatarSrc() {
      if (this.user.avatar) {
        return `${this.$store.state.imagePrefix}image/avatar/${this.user.avatar}`;
      }

      return '';
    },
  },
  mounted() {
    this.show = true;
  },
  created() {
    this.init();
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
  text-shadow: 1px 1px 3px #444c;
}
.self-introduction {
  color: white;
  text-shadow: 1px 1px 2px #333;
}
</style>