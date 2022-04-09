<template>
  <v-card
    ref="replies"
    style="background-color: #FF478512;overflow-y: scroll !important;"
    flat
    class="hide-scroll"
    :max-height="workImg ? '100%' : '320px'"
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
        @click="sendReply(-1)"
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
                  :nickname="subComment.nickname"
                  :avatar="subComment.avatar"
                ></nickname-avatar>
                <span class="font-italic">{{ formatTime(subComment.uploadTime) }}</span>
              </div>
              <div class="pt-2 pl-2">
                <span
                  v-if="subComment.replyTo !== ''"
                  style="color: #FF4785"
                >@{{ subComment.replyTo }}</span>
                <span v-if="subComment.replyTo !== ''">: </span>
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
              v-model="replyTexts[index]"
            ></v-text-field>
            <v-btn
              class="mt-4"
              icon
              small
              color="#FF4785"
              @click="sendReply(index, subComment.nickname)"
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
import {reqCommentWork} from '@/require/work'
import NicknameAvatar from '@/components/Avatar/NicknameAvatar'

export default {
  name: 'Replies',
  components: {NicknameAvatar},
  props: {
    subComments: Array,
    commentId: Number,
    discussId: Number,
    workImg: String,
  },
  data() {
    return {
      replyTexts: {},
      expandIndex: -1,
      formatTime,
    }
  },
  methods: {
    async sendReply(index, replyTo) {
      await reqCommentWork({image: this.workImg, text: this.replyTexts[index],
        uploadTime: Date.now(), replyTo: replyTo || ''});
      this.replyTexts[index] = '';
      this.$emit('send-comment');
    },
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