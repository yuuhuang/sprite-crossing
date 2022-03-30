<template>
  <div>
    <v-card tile flat v-for="(comment, index) in comments" :key="index">
      <v-divider class="mb-4"></v-divider>
      <v-card-text style="display: flex;justify-content: space-between;align-items: center;">
        <nickname-avatar
          :user-id="comment.posterId"
          :nickname="comment.posterNickname"
          :avatar="comment.posterAvatar"
        ></nickname-avatar>
        <span class="font-italic">{{ formatTime(comment.createTime) }}</span>
      </v-card-text>
      <v-card-text class="pb-1 pt-1 pl-6 pr-6">{{ comment.text }}</v-card-text>
      <v-expansion-panels
        flat
        tile
        v-model="openReply[index]"
      >
        <v-expansion-panel>
          <v-expansion-panel-header class="gray-filter pt-0 pb-0">
            <template v-slot:default="{ open }">
              <v-card-text class="pl-0 pr-0 pt-0 pb-0" style="display: flex;justify-content: flex-start;">
                <div v-if="open" class="flex-center">
                  <chevron-up></chevron-up>
                  Hide Comments
                </div>
                <div v-else class="flex-center">
                  <chevron-down></chevron-down>
                  {{ comment.subComments && comment.subComments.length > 0 ? 'Show Comments' : 'Add Comments' }}
                </div>
              </v-card-text>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <replies
              :discuss-id="discussId"
              :comment-id="comment.commentId"
              :sub-comments="comment.subComments"
            ></replies>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </div>
</template>

<script>
require('@/assets/chevron')

import {formatTime} from '@/utils'

import NicknameAvatar from '@/components/Avatar/NicknameAvatar'
import Replies from '@/pages/Community/DiscussDialog/Replies'

export default {
  name: 'Posters',
  components: {Replies, NicknameAvatar},
  props: {
    comments: Array,
    discussId: Number,
  },
  data() {
    return {
      formatTime,
      openReply: [],
    };
  },
  computed: {
    lastPosterStatus() {
      return this.openReply[this.openReply.length - 1];
    },
  },
  watch: {
    lastPosterStatus(newVal, oldVal) {
      if (newVal === 0 && oldVal !== 0) {
        setTimeout(() => {
          document.getElementsByClassName('v-dialog hide-scroll v-dialog--active')[0].scrollBy(0, 100);
        }, 180);
      }
    }
  },
  beforeMount() {
    this.openReply.length = this.comments.length;
    this.openReply.fill(0);
    // eslint-disable-next-line array-callback-return
    this.openReply.map((item, index) => {
      if (!this.comments[index].subComments || this.comments[index].subComments.length <= 0) {
        this.openReply[index] = -1;
      }
    });
  },
}
</script>

<style lang="scss">
@import "src/styles/common";
</style>