<template>
  <div>
    <v-card>
      <v-card-title class="pointer-cursor" @click="showDialog=true">{{ discussData.title }}</v-card-title>
      <v-card-text
        class="pointer-cursor"
        style="overflow-y: hidden;max-height: 48px;"
        @click="showDialog=true"
      >{{ discussData.textPreview }}</v-card-text>
      <v-card-actions class="flex justify-space-between">
        <nickname-avatar
          :user-id="discussData.authorId"
          :nickname="discussData.authorNickname"
          :avatar="discussData.avatar"
        ></nickname-avatar>
        <div class="flex-center gray-filter">
          <eye class="mr-2"></eye>
          <span class="mr-2">{{ discussData.viewNum }}</span>
          <comment class="mr-2"></comment>
          <span class="mr-2">{{ discussData.commentNum }}</span>
          <span class="mr-2">{{ formatTime(discussData.updateTime) }}</span>
        </div>
      </v-card-actions>
    </v-card>
    <discuss-dialog v-if="showDialog" @close="showDialog=false"></discuss-dialog>
  </div>
</template>

<script>
import NicknameAvatar from '@/components/Avatar/NicknameAvatar';
import DiscussDialog from '@/components/Dialog/DiscussDialog';

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
}
</script>

<style lang="scss">
@import "src/styles/common";
</style>