<template>
  <div>
    <v-card width="100%" class="chooseCard">
      <v-card-subtitle class="pt-2 pb-2">
        <v-row>
          <v-col cols="6">
            <nickname-avatar
              :avatar="workData.avatar"
              :nickname="workData.nickname"
              :user-id="workData.userId"
            ></nickname-avatar>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="5" style="display: flex;align-items: center;justify-content: right">
            {{workData.uploadTime}}
          </v-col>
        </v-row>
      </v-card-subtitle>
      <v-img
        class="pointer-cursor"
        :src="workData.image"
        @click="openImg"
      >
        <template v-slot:placeholder>
          <v-skeleton-loader type="image" height="100%" tile></v-skeleton-loader>
        </template>
      </v-img>
      <v-card-title class="mt-n2">{{ workData.title }}</v-card-title>
      <v-card-text class="mt-n4 overflow-hidden" style="max-height: 64px">
        {{ workData.text }}
      </v-card-text>
      <tags-show class="ml-4 mr-4" :tags="workData.tags" omit @choose-tag="chooseTag"></tags-show>
      <v-card-actions class="">
        <v-spacer></v-spacer>
        <eye class="gray-filter mr-2"></eye>
        <span class="subheading mr-2">{{ workData.viewNum }}</span>
        <comment class="gray-filter mr-2"></comment>
        <span class="subheading mr-2">{{ workData.comments ? workData.comments.length : 0 }}</span>
        <heart
          :class="{'gray-filter': !workData.like, 'mr-2': true, 'pointer-cursor': true}" @click="clickHeart"></heart>
        <span class="subheading mr-2">{{ workData.likeNum }}</span>
      </v-card-actions>
    </v-card>
    <work-dialog v-if="openWorkDialog" :work-data="workData" @close="openWorkDialog=false"></work-dialog>
  </div>
</template>

<script>
import WorkDialog from '@/components/Dialog/WorkDialog';
import TagsShow from '@/components/Tags/TagsShow';
import NicknameAvatar from '@/components/Avatar/NicknameAvatar';
require('@/assets/cards')

export default {
  name: 'WorkCard',
  components: {NicknameAvatar, TagsShow, WorkDialog},
  props: {
    workData: Object,
  },
  data() {
    return {
      openWorkDialog: false,
    };
  },
  methods: {
    // Events
    openImg() {
      this.openWorkDialog = true;
    },
    chooseTag(tag) {
      this.$emit('choose-tag', tag);
    },
    clickHeart() {
      console.log('like', this.workData.id, 'userId');
    },
  },
}
</script>

<style lang="scss">
@import "src/styles/common";

.chooseCard:hover {
  transform: scale(1.08);
  box-shadow: 0px 6px 2px -4px rgba(0,0,0,0.2), 0px 4px 4px 0px rgba(0,0,0,0.15), 0px 2px 10px 0px rgba(0,0,0,0.12);
  transition: all 250ms ease-in-out;
  z-index: 99;
}
</style>