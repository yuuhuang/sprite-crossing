<template>
  <v-dialog width="960" scrollable v-model="show" @input="input">
    <v-card>
      <v-card-title>
        <v-row>
          <v-col :cols="$vuetify.breakpoint.mdAndUp ? 8 : 12">
            {{ workData.title }}
          </v-col>
          <v-col v-if="!$vuetify.breakpoint.smAndDown" cols="4"
            style="display: flex;align-items: center;justify-content: right">
            <nickname-avatar
              :nickname="workData.nickname"
              :avatar="workData.avatar"
            ></nickname-avatar>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text class="hide-scroll">
        <v-row>
          <v-col :cols="$vuetify.breakpoint.mdAndUp ? 9 : 12" ref="img-col">
            <v-card
              class="img-card flex-center pointer-cursor"
              max-width="100%"
              min-width="100%"
              :max-height="$vuetify.breakpoint.smAndDown ? '100%' : 480"
              :min-height="$vuetify.breakpoint.smAndDown ? '100%' : 480"
              tile
              flat>
              <v-img
                :src="imageSrc"
                max-width="100%"
                :max-height="$vuetify.breakpoint.smAndDown ? '100%' : 480"
                contain
              >
                <template v-slot:placeholder>
                  <v-skeleton-loader type="image" height="100%" tile></v-skeleton-loader>
                </template>
              </v-img>
              <div class="icon-options flex-center" v-if="!$vuetify.breakpoint.smAndDown && showOverlay">
                <eye class="gray-filter mr-2"></eye>
                <span class="gray-filter mr-2">{{ currentViewNum }}</span>
                <comment class="gray-filter mr-2"></comment>
                <span class="gray-filter mr-2">{{ workData.comments ? workData.comments.length : 0 }}</span>
                <heart
                  :class="{'gray-filter': !currentLiked, 'mr-2': true, 'pointer-cursor': true}"
                  @click="clickHeart"></heart>
                <span class="gray-filter mr-2">{{ currentLikeNum }}</span>
              </div>
              <div class="overlay" v-if="!$vuetify.breakpoint.smAndDown && showOverlay"></div>
            </v-card>
          </v-col>
          <v-col
            :cols="$vuetify.breakpoint.mdAndUp ? 3 : 12"
            :class="{'pl-0': true, 'pr-0': true, 'hide-scroll': true,
              'pa-0': $vuetify.breakpoint.mdAndUp, 'mt-3': $vuetify.breakpoint.mdAndUp}"
            :style="{height: $vuetify.breakpoint.mdAndUp ? '480px' : '', overflowY: 'scroll'}"
          >
            <v-card flat>
              <v-card-text v-if="$vuetify.breakpoint.smAndDown" class="pt-0 pb-0">
                <v-row>
                  <v-col class="pt-0" cols="5">
                    <nickname-avatar
                      :nickname="workData.nickname"
                      :avatar="workData.avatar"
                    ></nickname-avatar>
                  </v-col>
                  <v-col class="pt-0" style="font-size: 16px;display: flex;justify-content: right" cols="7">
                    <eye class="gray-filter mr-2"></eye>
                    <span class="gray-filter mr-2">{{ currentViewNum }}</span>
                    <comment class="gray-filter mr-2"></comment>
                    <span class="gray-filter mr-2">{{ workData.comments ? workData.comments.length : 0 }}</span>
                    <heart
                      :class="{'gray-filter': !currentLiked, 'mr-2': true, 'pointer-cursor': true}"
                      @click="clickHeart"></heart>
                    <span class="gray-filter mr-2">{{ currentLikeNum }}</span>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-text class="pt-1 pb-1">{{ workData.description }}</v-card-text>
              <v-card-subtitle class="pt-1 pb-1">{{ formatTime(workData.uploadTime) }}</v-card-subtitle>
              <tags-show :tags="workData.tags" class="ml-4 mr-4"></tags-show>
            </v-card>
            <replies :work-id="workData.title" :sub-comments="workData.comments"></replies>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import TagsShow from '@/components/Tags/TagsShow';
import NicknameAvatar from '@/components/Avatar/NicknameAvatar';
import Replies from '@/pages/Community/DiscussDialog/Replies';

import {reqGetWork, reqLikeWork, reqViewWork} from '@/require/work';

import {formatTime} from '@/utils';

require('@/assets/cards');

export default {
  name: 'WorkDialog',
  components: {Replies, NicknameAvatar, TagsShow},
  props: {
    image: String,
    work: Object,
  },
  data() {
    return {
      show: true,
      showOverlay: false,
      // comment
      comment: '',
      replyId: 0,
      replyName: 'caitou',
      // work
      workData: {
        image: '',
        title: '',
        description: '',
        tags: [],
        comments: [],
        viewNum: 0,
        likeNum: 0,
        liked: false,
        uploadTime: {},
        nickname: '',
        avatar: '',
      },
      // Num
      viewNum: '',
      likeNum: '',
      liked: '',

      formatTime,
    };
  },
  methods: {
    async init() {
      this.workData = await reqGetWork(this.image);
      const result = await reqViewWork(this.workData.image);
      if (result.success) {
        this.viewNum = result.viewNum;
      }
    },

    input(state) {
      if (!state) {
        this.$emit('close');
      }
    },

    async clickHeart() {
      const result = await reqLikeWork(this.workData.image);
      if (result.success) {
        this.liked = result.liked;
        this.likeNum = result.likeNum;
      }
    },

    addReply(id, nickname) {
      this.replyId = id;
      this.replyName = nickname;
    },
    cancelReply() {
      this.replyId = -1;
      this.replyName = '';
    },
    sendComment() {
      console.log('send comment', this.comment, this.replyName);
    },

    enterOptions() {
      this.showOverlay = true;
    },
    leaveOptions() {
      this.showOverlay = false;
    },
  },
  computed: {
    currentViewNum() {
      return this.viewNum === '' ? this.workData.viewNum : this.viewNum;
    },
    currentLikeNum() {
      return this.likeNum === '' ? this.workData.likeNum : this.likeNum;
    },
    currentLiked() {
      return this.liked === '' ? this.workData.liked : this.liked;
    },
    imageSrc() {
      return this.workData.image === '' ? '' : `${this.$store.state.imagePrefix}image/work/${this.workData.image}`
    }
  },
  created() {
    if (this.work) {
      this.workData = this.work;
    } else {
      this.init();
    }
  },
  mounted() {
    if (!this.$vuetify.breakpoint.smAndDown) {
      this.$refs['img-col'].addEventListener('mouseenter', this.enterOptions);
      this.$refs['img-col'].addEventListener('mouseleave', this.leaveOptions);
    }
  },
  beforeDestroy() {
    if (!this.$vuetify.breakpoint.smAndDown) {
      this.$refs['img-col'].removeEventListener('mouseenter', this.enterOptions);
      this.$refs['img-col'].removeEventListener('mouseleave', this.leaveOptions);
    }
  },
}
</script>

<style lang="scss">
@import "src/styles/common";

.img-card {
  background-color: #ccc6 !important;
}
.icon-options {
  position: absolute;
  bottom: 4px;
  right: 2px;
  font-size: 16px;
  z-index: 99;
}
.overlay {
  background: linear-gradient(#0000, 75%, #fff);
  width: 100%;
  height: 100%;
  position: absolute;
}
.reply-span {
  color: #FF4785;
}
.comment-text:hover {
  background-color: #FF478522;
}
.comment-time {
  position: absolute;
  right: 4px;
  font-size: small;
}
</style>