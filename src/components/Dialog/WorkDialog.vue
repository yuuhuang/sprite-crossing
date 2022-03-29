<template>
  <v-dialog width="960" scrollable v-model="show" @input="input">
    <v-card>
      <v-card-title>
        <v-row>
          <v-col :cols="$vuetify.breakpoint.mdAndUp ? 8 : 12">
            {{ workData.title }}
          </v-col>
          <v-col v-if="!$vuetify.breakpoint.smAndDown" cols="4"
            style="display: flex;align-items: center;justify-content: right">
            <nickname-avatar
              :nickname="workData.nickname"
              :avatar="workData.avatar"
              :user-id="workData.userId"
            ></nickname-avatar>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text class="hide-scroll">
        <v-row>
          <v-col :cols="$vuetify.breakpoint.mdAndUp ? 9 : 12" ref="img-col">
            <v-card
              class="img-card flex-center pointer-cursor"
              max-width="100%"
              min-width="100%"
              :max-height="$vuetify.breakpoint.smAndDown ? '100%' : 480"
              :min-height="$vuetify.breakpoint.smAndDown ? '100%' : 480"
              tile
              flat>
              <v-img
                :src="workData.image"
                max-width="100%"
                :max-height="$vuetify.breakpoint.smAndDown ? '100%' : 480"
                contain
              >
                <template v-slot:placeholder>
                  <v-skeleton-loader type="image" height="100%" tile></v-skeleton-loader>
                </template>
              </v-img>
              <div class="icon-options flex-center" v-if="!$vuetify.breakpoint.smAndDown && showOverlay">
                <eye class="gray-filter mr-2"></eye>
                <span class="gray-filter mr-2">{{ workData.viewNum }}</span>
                <comment class="gray-filter mr-2"></comment>
                <span class="gray-filter mr-2">{{ workData.comments ? workData.comments.length : 0 }}</span>
                <heart
                  :class="{'gray-filter': !workData.like, 'mr-2': true, 'pointer-cursor': true}"
                  @click="clickHeart"></heart>
                <span class="gray-filter mr-2">{{ workData.likeNum }}</span>
              </div>
              <div class="overlay" v-if="!$vuetify.breakpoint.smAndDown && showOverlay"></div>
            </v-card>
          </v-col>
          <v-col
            :cols="$vuetify.breakpoint.mdAndUp ? 3 : 12"
            class="pl-0 pr-0 hide-scroll"
            :style="{height: $vuetify.breakpoint.mdAndUp ? '480px' : '', overflowY: 'scroll'}"
          >
            <v-card flat>
              <v-card-text v-if="$vuetify.breakpoint.smAndDown" class="pt-0 pb-0">
                <v-row>
                  <v-col class="pt-0" cols="5">
                    <nickname-avatar
                        :nickname="workData.nickname"
                        :avatar="workData.avatar"
                        :user-id="workData.userId"
                    ></nickname-avatar>
                  </v-col>
                  <v-col class="pt-0" style="font-size: 16px;display: flex;justify-content: right" cols="7">
                    <eye class="gray-filter mr-2"></eye>
                    <span class="gray-filter mr-2">{{ workData.viewNum }}</span>
                    <comment class="gray-filter mr-2"></comment>
                    <span class="gray-filter mr-2">{{ workData.comments ? workData.comments.length : 0 }}</span>
                    <heart
                        :class="{'gray-filter': !workData.like, 'mr-2': true, 'pointer-cursor': true}"
                        @click="clickHeart"></heart>
                    <span class="gray-filter mr-2">{{ workData.likeNum }}</span>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-text class="pt-1 pb-1">{{ workData.text }}</v-card-text>
              <v-card-subtitle class="pt-1 pb-1">{{ workData.uploadTime }}</v-card-subtitle>
              <tags-show :tags="workData.tags" class="ml-4 mr-4"></tags-show>
            </v-card>
            <v-card flat>
              <v-card-title class="mb-2">Comments({{ workData.comments ? workData.comments.length : 0 }})</v-card-title>
              <v-card-subtitle v-for="(comment, index) in workData.comments" :key="index"
                class="flex justify-space-between">
                <nickname-avatar
                  :nickname="comment.nickname"
                  :avatar="comment.avatar"
                  :user-id="comment.userId"
                ></nickname-avatar>
                <v-tooltip bottom open-delay="500" color="#FF4785">
                  <template v-slot:activator="{ on, attrs }">
                    <div
                      class="mt-1 pointer-cursor comment-text"
                      v-bind="attrs"
                      v-on="on"
                      @click="addReply(comment.userId, comment.nickname)">
                      <span
                        v-if="comment.replyId"
                        class="reply-span ml-1"
                        @click="openProfile(comment.replyId)"
                      >@{{ comment.replyNickName }}: </span>
                      <span class="ml-1">{{ comment.comment }}</span>
                    </div>
                  </template>
                  <span style="font-size: smaller">Click To Reply</span>
                </v-tooltip>
                <span class="comment-time">{{ comment.updateTime }}</span>
              </v-card-subtitle>
              <v-card-actions class="mt-2 flex-column">
                <v-textarea
                  color="#FF4785"
                  label="Comment"
                  placeholder="leave a comment..."
                  style="width: 100%"
                  hide-details
                  filled
                  v-model="comment"
                ></v-textarea>
                <div
                  :style="{
                    width: '100%',
                    display: 'flex',
                    'justify-content': replyId > -1 ? 'space-between' : 'flex-end',
                    'align-items': 'center',
                  }"
                >
                  <v-chip v-if="replyId > -1" color="#FF4785" small class="mt-1 pl-0" style="opacity: 0.9">
                    <v-btn icon small @click="cancelReply">
                      <close></close>
                    </v-btn>
                    <span style="color: white">@{{ replyName }}</span>
                  </v-chip>
                  <v-btn class="align-self-end mt-1" small text color="#FF4785" @click="sendComment">Send</v-btn>
                </div>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import TagsShow from '@/components/Tags/TagsShow';
import NicknameAvatar from '@/components/Avatar/NicknameAvatar';
require('@/assets/cards');

export default {
  name: 'WorkDialog',
  components: {NicknameAvatar, TagsShow},
  props: {
    workData: Object,
  },
  data() {
    return {
      show: true,
      showOverlay: false,
      // comment
      comment: '',
      replyId: 0,
      replyName: 'caitou'
    };
  },
  methods: {
    input(state) {
      if (!state) {
        this.$emit('close');
      }
    },

    openProfile() {
      console.log('open profile', this.workData.userId);
    },
    clickHeart() {
      console.log('like', this.workData.id, 'userId');
    },

    addReply(id, nickname) {
      this.replyId = id;
      this.replyName = nickname;
    },
    cancelReply() {
      this.replyId = -1;
      this.replyName = '';
    },
    sendComment() {
      console.log('send comment', this.comment, this.replyName);
    },

    enterOptions() {
      this.showOverlay = true;
    },
    leaveOptions() {
      this.showOverlay = false;
    },
  },
  mounted() {
    if (!this.$vuetify.breakpoint.smAndDown) {
      this.$refs['img-col'].addEventListener('mouseenter', this.enterOptions);
      this.$refs['img-col'].addEventListener('mouseleave', this.leaveOptions);
    }
  },
  beforeDestroy() {
    if (!this.$vuetify.breakpoint.smAndDown) {
      this.$refs['img-col'].removeEventListener('mouseenter', this.enterOptions);
      this.$refs['img-col'].removeEventListener('mouseleave', this.leaveOptions);
    }
  },
}
</script>

<style lang="scss">
@import "src/styles/common";

.img-card {
  background-color: #ccc6 !important;
}
.icon-options {
  position: absolute;
  bottom: 4px;
  right: 2px;
  font-size: 16px;
  z-index: 99;
}
.overlay {
  background: linear-gradient(#0000, 75%, #fff);
  width: 100%;
  height: 100%;
  position: absolute;
}
.reply-span {
  color: #FF4785;
}
.comment-text:hover {
  background-color: #FF478522;
}
.comment-time {
  position: absolute;
  right: 4px;
  font-size: small;
}
</style>