<template>
  <v-dialog width="720" @input="input" v-model="show" content-class="hide-scroll" ref="dialog" eager>
    <v-card tile>
      <v-card-title>
        {{ discuss.title }}
      </v-card-title>
      <v-card-text style="display: flex;justify-content: space-between;align-items: center;">
        <nickname-avatar
          :nickname="discuss.nickname"
          :avatar="discuss.avatar"
        ></nickname-avatar>
        <span class="font-italic">{{ formatTime(discuss.uploadTime) }}</span>
      </v-card-text>
      <v-card-text class="pb-0">{{ discuss.description }}</v-card-text>
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
                :rules="textRules"
                filled
                v-model="poster"
              ></v-textarea>
              <v-btn
                class="mb-2"
                style="color: white"
                color="#FF4785aa"
                depressed
                width="80%"
                @click="sendPoster"
              >Send Comment</v-btn>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
    <posters :comments="discuss.comments || []" :discuss-id="discussId" @reply="init"></posters>
  </v-dialog>
</template>

<script>
import {reqGetDiscuss, reqPostComment, reqViewDiscuss} from '@/require/discuss';

import {formatTime} from '@/utils'

require('@/assets/chevron')

import NicknameAvatar from '@/components/Avatar/NicknameAvatar'
import Posters from '@/pages/Community/DiscussDialog/Posters';

export default {
  name: 'DiscussDialog',
  components: {Posters, NicknameAvatar},
  props: {
    discussId: String,
  },
  data() {
    return {
      show: true,
      openPoster: false,
      poster: '',
      discuss: {},
      textRules: [
        v => typeof v === 'string' && v.length <= 128 || 'text maxlength is 128',
      ],
      formatTime,
    };
  },
  methods: {
    async init() {
      const result = await reqGetDiscuss(this.discussId);
      if (result) {
        this.discuss = result;
        if (this.discuss.comments.length === 0) {
          this.openPoster = 0;
        }
      }
    },

    input(status) {
      if (!status) {
        this.$emit('close');
      }
    },

    async sendPoster() {
      if (this.poster) {
        await reqPostComment({text: this.poster, uploadTime: Date.now(), id: this.discussId});
        this.openPoster = false;
        await this.init();
      }
    },
  },
  async created() {
    await reqViewDiscuss(this.discussId);
    await this.init();
  },
}
</script>

<style lang="scss">
@import "src/styles/common";
</style>