<template>
  <v-dialog width="720" @input="input" v-model="show" content-class="hide-scroll" ref="dialog" eager>
    <v-card tile>
      <v-card-title>
        {{ discuss.title }}
      </v-card-title>
      <v-card-text style="display: flex;justify-content: space-between;align-items: center;">
        <nickname-avatar
          :user-id="discuss.authorId"
          :nickname="discuss.authorNickname"
          :avatar="discuss.avatar"
        ></nickname-avatar>
        <span class="font-italic">{{ formatTime(discuss.createTime) }}</span>
      </v-card-text>
      <v-card-text class="pb-0">{{ discuss.text }}</v-card-text>
      <v-expansion-panels flat tile v-model="openPoster">
        <v-expansion-panel>
          <v-expansion-panel-header class="pt-0 pb-0">
            <template v-slot:default="{ open }">
              <v-card-text
                class="gray-filter pl-0 pr-0"
                style="display: flex;justify-content: space-between;align-items: center">
                <div class="flex-center">
                  <chevron-up v-if="open"></chevron-up>
                  <chevron-down v-else></chevron-down>
                  Reply
                </div>
                <div class="flex-center">
                  <eye class="mr-2"></eye>
                  <span class="mr-2">{{ discuss.viewNum }}</span>
                  <comment class="mr-2"></comment>
                  <span class="mr-2">{{ discuss.comments ? discuss.comments.length : 0 }}</span>
                </div>
              </v-card-text>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div class="flex-column flex-center">
              <v-textarea
                color="#FF4785"
                background-color="#FF478512"
                label=""
                placeholder="leave a comment..."
                style="width: 100%;"
                hide-details
                filled
                v-model="poster"
              ></v-textarea>
              <v-btn
                class="align-self-end mt-2"
                small
                text
                color="#FF4785"
                @click="sendPoster"
              >Send</v-btn>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
    <v-card tile flat v-for="(comment, index) in discuss.comments" :key="index">
      <v-divider class="mb-4"></v-divider>
      <v-card-text style="display: flex;justify-content: space-between;align-items: center;">
        <nickname-avatar
          :user-id="comment.posterId"
          :nickname="comment.posterNickname"
          :avatar="comment.posterAvatar"
        ></nickname-avatar>
        <span class="font-italic">{{ formatTime(comment.createTime) }}</span>
      </v-card-text>
      <v-card-text class="pb-1">{{ comment.text }}</v-card-text>
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
            <replies :poster-id="comment.posterId" :sub-comments="comment.subComments"></replies>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </v-dialog>
</template>

<script>
import {discuss} from '@/mock/discuss'
import {formatTime} from '@/utils'

require('@/assets/chevron')

import NicknameAvatar from '@/components/Avatar/NicknameAvatar'
import Replies from '@/pages/Community/DiscussDialog/Replies';

export default {
  name: 'DiscussDialog',
  components: {Replies, NicknameAvatar},
  props: {
    discussId: Number,
  },
  data() {
    return {
      show: true,
      openPoster: false,
      openReply: [],
      poster: '',
      reply: [],
      discuss,
      formatTime,
    };
  },
  methods: {
    input(status) {
      if (!status) {
        this.$emit('close');
      }
    },

    sendPoster() {
      this.openPoster = false;
      console.log('send poster', this.poster, this.discuss.discussId, new Date());
    },
    sendReply(index, replyTo) {
      console.log('send reply', this.reply[index], this.discuss.discussId, index, replyTo, new Date());
    },
  },
  computed: {
    lastOpenReply() {
      return this.openReply[this.openReply.length - 1];
    },
  },
  watch: {
    lastOpenReply(newVal, oldVal) {
      console.log(newVal, oldVal)
      if (newVal === 0 && oldVal !== 0) {
        console.log(1111)
        console.log(this.$refs.dialog.$el)
        this.$refs.dialog.$el.scrollBy(0, 84);
      }
    }
  },
  beforeMount() {
    this.openReply.length = this.discuss.comments.length;
    this.openReply.fill(0);
    // eslint-disable-next-line array-callback-return
    this.openReply.map((item, index) => {
      if (!this.discuss.comments[index].subComments || this.discuss.comments[index].subComments.length <= 0) {
        this.openReply[index] = -1;
      }
    });
  }
}
</script>

<style lang="scss">
@import "src/styles/common";
</style>