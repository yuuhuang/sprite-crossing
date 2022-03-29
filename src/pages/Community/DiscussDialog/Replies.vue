<template>
  <v-card
    ref="replies"
    style="background-color: #FF478512;overflow-y: scroll !important;"
    flat
    class="hide-scroll"
    max-height="270"
  >
    <v-card-text class="flex-center pt-0">
      <v-text-field
        v-model="replyTexts[posterId]"
        color="#FF4785"
        placeholder="leave a comment..."
        hide-details
      ></v-text-field>
      <v-btn
        class="mt-6"
        small
        text
        color="#FF4785"
        @click="sendReply"
      >
        Send
      </v-btn>
    </v-card-text>
    <v-divider></v-divider>
    <v-expansion-panels flat tile accordion v-model="expandIndex">
      <v-expansion-panel v-for="(subComment, index) in subComments" :key="index">
        <v-expansion-panel-header style="background-color: #FF478512;color: #666" class="pl-4 pr-4">
          <template v-slot>
            <div class="flex-column">
              <div style="display: flex;justify-content: space-between;align-items: center">
                <nickname-avatar
                  :user-id="subComment.replierId"
                  :nickname="subComment.replierNickname"
                  :avatar="subComment.replierAvatar"
                ></nickname-avatar>
                <span>{{ formatTime(subComment.createTime) }}</span>
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
        <v-expansion-panel-content style="background-color: #FF478512">
          <div class="flex-center">
            <span style="color: #FF4785">Reply to {{ subComment.replierNickname }}: </span>
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
              text
              small
              color="#FF4785"
              @click="sendReply(subComment.replierId)"
            >Send</v-btn>
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
    posterId: Number,
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
      if (typeof replyTo === 'number') {
        console.log('my id', replyTo, this.replyTexts[replyTo], new Date());
      } else {
        console.log('my id', this.posterId, this.replyTexts[this.posterId], new Date());
      }
    },
  },
  created() {
    this.replyTexts[this.posterId] = '';
    // eslint-disable-next-line array-callback-return
    this.subComments.map(item => {
      if (!(item in this.replyTexts)) {
        this.replyTexts[item.replierId] = '';
      }
    })
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