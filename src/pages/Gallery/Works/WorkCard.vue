<template>
  <v-card width="100%" class="chooseCard" ref="card">
    <v-card-subtitle class="pt-2 pb-2">
      <v-row>
        <v-col cols="6">
          <v-avatar size="32" class="pointer-cursor" @click="openProfile">
            <v-img
              v-if="avatar"
              class="elevation-6"
              alt="avatar"
              :src="avatar"
            ></v-img>
            <account v-else class="gray-filter"></account>
          </v-avatar>
          <span class="ml-1 pointer-cursor" @click="openProfile">{{nickname}}</span>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="5" style="display: flex;align-items: center;justify-content: right">
          {{uploadTime}}
        </v-col>
      </v-row>
    </v-card-subtitle>
    <v-skeleton-loader
      loading
      type="image"
      :height="imgHeight"
    >
      <v-img
        class="pointer-cursor"
        :height="imgHeight"
        :src="image"
        @click="openImg"
        @load="loadedImg = true"
      ></v-img>
    </v-skeleton-loader>
    <v-card-title class="mt-n2">{{ title }}</v-card-title>
    <v-card-text class="mt-n4 overflow-hidden" style="max-height: 64px">
      {{ text }}
    </v-card-text>
    <v-slide-group show-arrows class="ml-4 mr-4">
      <template v-slot:prev>
        <chevron-left></chevron-left>
      </template>
      <template v-slot:next>
        <chevron-right></chevron-right>
      </template>
      <v-chip-group column>
        <v-chip v-for="tag in tags" :key="tag" small @click="chooseTag(tag)">{{ tag }}</v-chip>
      </v-chip-group>
    </v-slide-group>
    <v-card-actions class="">
      <v-spacer></v-spacer>
        <eye class="gray-filter mr-2"></eye>
        <span class="subheading mr-2">{{viewNum}}</span>
        <comment class="gray-filter mr-2"></comment>
        <span class="subheading mr-2">{{commentNum}}</span>
        <heart :class="{'gray-filter': !like, 'mr-2': true, 'pointer-cursor': true}" @click="clickHeart"></heart>
        <span class="subheading mr-2">{{likes}}</span>
    </v-card-actions>
  </v-card>
</template>

<script>
require('@/assets/cards')
require('@/assets/chevron')

export default {
  name: 'WorkCard',
  props: {
    // style

    // data internal
    id: Number,
    aspectRatio: {
      type: Number,
      default: 1
    },
    // data showing
    avatar: String,
    nickname: {
      type: String,
      default: 'Neil',
    },
    uploadTime: {
      type: String,
      default: '2022-03-23',
    },
    image: {
      type: String,
      default: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
    },
    title: {
      type: String,
      default: 'My First Art Work',
    },
    text: {
      type: String,
      default: 'This is my first pixel art!!!',
    },
    tags: {
      type: Array,
      default: () => ['Animals', 'pink', 'kawaii'],
    },
    viewNum: {
      type: [String, Number],
      default: 0,
    },
    commentNum: {
      type: [String, Number],
      default: 0,
    },
    likeNum: {
      type: [String, Number],
      default: 0,
    },
  },
  data() {
    return {
      like: false,
      likes: this.likeNum,
      loadedImg: false,
      loadedAvatar: false,
      width: 0,
      imgHeight: 0,
    };
  },
  methods: {
    // Events
    openProfile() {
      this.$emit('open-profile', this.nickname);
    },
    openImg() {
      this.$emit('open-img', this.id);
    },
    chooseTag(tag) {
      this.$emit('choose-tag', tag);
    },
    clickHeart() {
      this.like = !this.like;
      this.likes += this.like ? 1 : -1;
      // 接口操作
    },
  },
  mounted() {
    this.width = this.$refs.card.$el.clientWidth;
    this.imgHeight = this.width * this.aspectRatio;
  },
}
</script>

<style scoped>
.gray-filter {
  filter: brightness(0) opacity(0.5);
}
.pointer-cursor:hover {
  cursor: pointer;
}
.chooseCard:hover {
  transform: scale(1.08);
  box-shadow: 0px 6px 2px -4px rgba(0,0,0,0.2), 0px 4px 4px 0px rgba(0,0,0,0.15), 0px 2px 10px 0px rgba(0,0,0,0.12);
  transition: all 250ms ease-in-out;
  z-index: 99;
}
.hide {
  visibility: hidden;
  position: absolute;
}
</style>