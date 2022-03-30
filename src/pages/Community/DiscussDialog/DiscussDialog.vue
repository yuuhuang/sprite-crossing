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
    <posters :discuss-id="discussId" :comments="discuss.comments"></posters>
  </v-dialog>
</template>

<script>
import {discuss} from '@/mock/discuss'
import {formatTime} from '@/utils'

require('@/assets/chevron')

import NicknameAvatar from '@/components/Avatar/NicknameAvatar'
import Posters from '@/pages/Community/DiscussDialog/Posters';

export default {
  name: 'DiscussDialog',
  components: {Posters, NicknameAvatar},
  props: {
    discussId: Number,
  },
  data() {
    return {
      show: true,
      openPoster: false,
      poster: '',
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
      console.log('myId', this.discuss.discussId, this.poster, new Date());
    },
  },
}
</script>

<style lang="scss">
@import "src/styles/common";
</style>