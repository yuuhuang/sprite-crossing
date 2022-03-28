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
          <v-col xl="3" lg="3" md="3" sm="12" class="pl-0 pr-0">
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
            <v-card>
              <v-card-title>Comments({{ workData.comments ? workData.comments.length : 0 }})</v-card-title>
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
</style>