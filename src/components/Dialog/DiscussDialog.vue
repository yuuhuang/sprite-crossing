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
            <v-card
              style="background-color: #FF478512;overflow-y: scroll !important;"
              flat
              class="hide-scroll"
              max-height="270"
            >
              <v-card-text class="flex-center pt-0">
                <v-text-field
                  color="#FF4785"
                  placeholder="leave a comment..."
                  hide-details
                ></v-text-field>
                <v-btn
                  class="mt-6"
                  small
                  text
                  color="#FF4785"
                  @click="sendReply(index)"
                >Send</v-btn>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-text v-for="(subComment, index) in comment.subComments" :key="index" class="pt-2 pb-0 pl-0 pr-0">
                <div style="display: flex;justify-content: space-between;align-items: center" class="pl-4 pr-4">
                  <nickname-avatar
                    :user-id="subComment.replierId"
                    :nickname="subComment.replierNickname"
                    :avatar="subComment.replierAvatar"
                  ></nickname-avatar>
                  <span>{{ formatTime(subComment.createTime) }}</span>
                </div>
                <v-expansion-panels flat tile>
                  <v-expansion-panel>
                    <v-expansion-panel-header style="background-color: #FF478512;color: #666" class="pb-2">
                      <template v-slot>
                        <div class="mt-2 mb-2 pl-4 pr-4">
                          <span
                            v-if="subComment.replyToId > -1"
                            style="color: #FF4785"
                          >@{{ subComment.replyToNickname }}</span>
                          <span v-if="subComment.replyToId > -1">: </span>
                          <span>{{ subComment.text }}</span>
                        </div>
                      </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content style="background-color: #FF478512">
                      <div class="flex-center">
                        <span style="color: #FF4785" class="pt-4">Reply to {{ subComment.replierNickname }}: </span>
                        <v-text-field
                          dense
                          color="#FF4785"
                          placeholder="leave a reply..."
                          style="width: 100%;"
                          hide-details
                        ></v-text-field>
                        <v-btn
                          class="mt-4"
                          text
                          small
                          color="#FF4785"
                          @click="sendReply(index, subComment.replierId)"
                        >Send</v-btn>
                      </div>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
                <v-divider v-if="index !== comment.subComments.length - 1"></v-divider>
              </v-card-text>
            </v-card>
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

export default {
  name: 'DiscussDialog',
  components: {NicknameAvatar},
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