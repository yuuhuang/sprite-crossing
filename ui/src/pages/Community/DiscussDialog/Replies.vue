<template>
  <v-card
    ref="replies"
    style="background-color: #FF478512;overflow-y: scroll !important;"
    flat
    class="hide-scroll"
    :max-height="workId ? '100%' : '320px'"
  >
    <v-card-text class="flex-center pt-0">
      <v-text-field
        v-model="replyTexts[-1]"
        color="#FF4785"
        placeholder="leave a comment..."
        hide-details
      ></v-text-field>
      <v-btn
        class="mt-6"
        small
        icon
        color="#FF4785"
        @click="sendReply"
      >
        <send></send>
      </v-btn>
    </v-card-text>
    <v-divider></v-divider>
    <v-expansion-panels flat tile accordion v-model="expandIndex">
      <v-expansion-panel v-for="(subComment, index) in subComments" :key="index">
        <v-expansion-panel-header style="background-color: #FF478512;color: #666" class="pl-3 pr-3">
          <template v-slot>
            <div class="flex-column">
              <div style="display: flex;justify-content: space-between;align-items: center">
                <nickname-avatar
                  :user-id="subComment.replierId"
                  :nickname="subComment.replierNickname"
                  :avatar="subComment.replierAvatar"
                ></nickname-avatar>
                <span class="font-italic">{{ formatTime(subComment.createTime) }}</span>
              </div>
              <div class="pt-2 pl-2">
                <span
                  v-if="subComment.replyToId > -1"
                  style="color: #FF4785"
                >@{{ subComment.replyToNickname }}</span>
                <span v-if="subComment.replyToId > -1">: </span>
                <span>{{ subComment.text }}</span>
              </div>
            </div>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content style="background-color: #FF478512" class="pl-4 pr-2 pb-4">
          <div class="flex-center">
<!--            <span-->
<!--              class="mt-4 mr-2"-->
<!--              style="color: #FF4785;font-size: smaller"-->
<!--            >@{{ subComment.replierNickname }}: </span>-->
            <v-text-field
              dense
              color="#FF4785"
              placeholder="leave a reply..."
              style="width: 100%;"
              hide-details
              v-model="replyTexts[subComment.replierId]"
            ></v-text-field>
            <v-btn
              class="mt-4"
              icon
              small
              color="#FF4785"
              @click="sendReply(subComment.replierId)"
            >
              <send></send>
            </v-btn>
          </div>
        </v-expansion-panel-content>
        <v-divider v-if="index !== subComments.length - 1"></v-divider>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
import {formatTime} from '@/utils'

import NicknameAvatar from '@/components/Avatar/NicknameAvatar'

export default {
  name: 'Replies',
  components: {NicknameAvatar},
  props: {
    subComments: Array,
    commentId: Number,
    discussId: Number,
    workId: Number,
  },
  data() {
    return {
      replyTexts: {},
      expandIndex: -1,
      formatTime,
    }
  },
  methods: {
    sendReply(replyTo) {
      if (typeof this.workId === 'number' && this.workId > -1) {
        if (typeof replyTo === 'number' && replyTo > -1) {
          console.log('myId', replyTo, this.workId, this.replyTexts[replyTo], new Date());
        } else {
          console.log('myId', -1, this.workId, this.replyTexts[-1], new Date());
        }
      } else if (typeof replyTo === 'number' && replyTo > -1) {
          console.log('myId', replyTo, this.discussId, this.commentId, this.replyTexts[replyTo], new Date());
        } else {
          console.log('myId', -1, this.discussId, this.commentId, this.replyTexts[-1], new Date());
        }
    },
  },
  created() {
    if (Array.isArray(this.subComments)) {
      this.replyTexts[-1] = '';
      // eslint-disable-next-line array-callback-return
      this.subComments.map(item => {
        if (!(item in this.replyTexts)) {
          this.replyTexts[item.replierId] = '';
        }
      })
    }
  },
  watch: {
    expandIndex(newVal) {
      if (newVal === this.subComments.length - 1) {
        const tempTimer = setTimeout(() => {
          this.$refs.replies.$el.scrollBy(0, 100);
          clearTimeout(tempTimer);
        }, 150);
      }
    }
  }
}
</script>

<style lang="scss">
@import "src/styles/common";
</style>