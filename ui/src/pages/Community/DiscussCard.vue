<template>
  <div>
    <v-card>
      <v-card-title class="pointer-cursor" @click="showDialog=true">{{ discussData.title }}</v-card-title>
      <v-card-text
        class="pointer-cursor"
        style="overflow-y: hidden;max-height: 48px;"
        @click="showDialog=true"
      >{{ discussData.description }}</v-card-text>
      <v-card-actions class="flex justify-space-between">
        <nickname-avatar
          class="ml-2"
          :nickname="discussData.nickname"
          :avatar="discussData.avatar"
        ></nickname-avatar>
        <div class="flex-center gray-filter">
          <eye class="mr-2"></eye>
          <span class="mr-2">{{ discussData.viewNum }}</span>
          <comment class="mr-2"></comment>
          <span class="mr-2">{{ discussData.commentNum }}</span>
          <span class="mr-2">{{ formatTime(discussData.uploadTime) }}</span>
        </div>
      </v-card-actions>
    </v-card>
    <discuss-dialog v-if="showDialog" :discuss-id="discussData.id" @close="close"></discuss-dialog>
  </div>
</template>

<script>
import NicknameAvatar from '@/components/Avatar/NicknameAvatar';
import DiscussDialog from './DiscussDialog/DiscussDialog';

require('@/assets/cards')

import {formatTime} from '@/utils';

export default {
  name: 'DiscussCard',
  components: {DiscussDialog, NicknameAvatar},
  props: {
    discussData: Object,
  },
  data() {
    return {
      showDialog: false,
      formatTime,
    };
  },
  methods: {
    close() {
      this.showDialog = false;
      this.$emit('close-dialog');
    }
  }
}
</script>

<style lang="scss">
@import "src/styles/common";
</style>