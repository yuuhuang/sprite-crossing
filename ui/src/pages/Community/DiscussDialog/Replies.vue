<template>
  <div>
    <v-card
      ref="replies"
      style="background-color: #FF478512;overflow-y: scroll !important;"
      flat
      class="hide-scroll"
      :max-height="workImg ? '100%' : '320px'"
    >
      <v-card-text class="flex-center pt-0 pb-0">
        <v-text-field
          v-model="replyTexts[-1]"
          color="#FF4785"
          placeholder="leave a comment..."
          :rules="textRules"
        ></v-text-field>
        <v-btn
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
                <div class="pt-2 pl-2" style="line-height: 24px;"
                     :class="{'w-200': $vuetify.breakpoint.mdAndUp && workImg}">
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
          <v-expansion-panel-content style="background-color: #FF478512" class="pl-4 pr-2">
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
                :rules="textRules"
                v-model="replyTexts[index]"
              ></v-text-field>
              <v-btn
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
    <login-dialog v-if="showLogin" @close="showLogin = false"></login-dialog>
  </div>
</template>

<script>
import {formatTime} from '@/utils'
import {reqCommentWork} from '@/require/work'
import {reqPostReply} from '@/require/discuss'

import LoginDialog from '@/components/Dialog/LoginDialog'
import NicknameAvatar from '@/components/Avatar/NicknameAvatar'

export default {
  name: 'Replies',
  components: {NicknameAvatar, LoginDialog},
  props: {
    discussId: String,
    commentIndex: Number,
    subComments: Array,
    workImg: String,
  },
  data() {
    return {
      showLogin: false,
      replyTexts: {},
      expandIndex: -1,
      textRules: [
        v => typeof v === 'string' && v.length <= 128 || 'text maxlength is 128',
      ],
      formatTime,
    }
  },
  methods: {
    async sendReply(index, replyTo) {
      if (typeof this.replyTexts[index] === 'string' &&
          this.replyTexts[index].length <= 128 &&
          this.replyTexts !== '') {
        let result;
        if (this.workImg) {
          result = await reqCommentWork({image: this.workImg, text: this.replyTexts[index],
            uploadTime: Date.now(), replyTo: replyTo || ''});
        } else {
          result = await reqPostReply({id: this.discussId,
            commentIndex: this.commentIndex,
            text: this.replyTexts[index],
            uploadTime: Date.now(),
            replyTo: replyTo || ''});
          this.$emit('reply');
        }
        if (result.notLogged) {
          this.showLogin = true;
        } else {
          this.replyTexts[index] = '';
          this.expandIndex = -1;
          this.$emit('send-comment');
        }
      }
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
.w-200 {
  width: 200px;
}
</style>