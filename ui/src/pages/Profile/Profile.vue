<template>
  <div>
    <v-container
      class="pl-0 pr-0 pt-0"
      :class="{
        'container-scroll': $vuetify.breakpoint.smAndDown,
        'hide-scroll': true,
        'flex-center': login === false,
       }"
    >
      <login-dialog v-if="login === false" ref="login" @close="init"></login-dialog>
      <div v-if="login === true">
        <v-img
          :src="backgroundSrc"
          height="256"
          width="100%"
          gradient="to top, #fff, #0000"
          style="border-radius: 8px 8px 0 0"
        ></v-img>
        <v-row style="position: relative; bottom: 96px;">
          <v-col :cols="$vuetify.breakpoint.mdAndUp ? 5 : 12" class="flex-column align-center" style="display: flex">
            <v-avatar size="160" style="border: 2px #fff solid;box-shadow: 0 0 0 2px #ccc">
              <avatar-default v-if="!user.avatar || user.avatar === ''" class="gray-filter"></avatar-default>
              <v-img aspect-ratio="1" :src="avatarSrc" v-else>
                <template v-slot:placeholder>
                  <v-skeleton-loader type="image" height="100%" tile></v-skeleton-loader>
                </template>
              </v-img>
            </v-avatar>
            <span class="mt-4" style="font-size: 24px;font-weight: 300">{{ user.nickname }}</span>
            <span v-if="user.bio" class="mt-2" style="font-size: 16px;font-weight: 200">{{ user.bio }}</span>
            <div class="mt-4">
              <v-btn outlined dark color="#FF4785" class="mr-1" @click="setProfile">Edit</v-btn>
              <v-btn outlined dark color="#FF4785" class="ml-1 mr-1" @click="openProfile">Preview</v-btn>
              <v-btn outlined color="#aaa" class="ml-1" width="36" min-width="36" @click="showExit=true">
                <exit class="gray-filter"></exit>
              </v-btn>
            </div>
          </v-col>
          <v-col :cols="$vuetify.breakpoint.mdAndUp ? 7 : 12"
                 :class="{'hide-scroll': true, 'time-line-scroll': $vuetify.breakpoint.mdAndUp}">
            <work-time-line
              style="position: relative; right: 24px;"
              :works-list="worksList"
              @open-upload="showUpload=true"
            ></work-time-line>
          </v-col>
        </v-row>
      </div>
      <div v-if="login === false" class="flex-center" style="height: 64px">
        <span
          class="pointer-cursor"
          style="color: #ff4785;text-decoration: none;font-size: larger;font-weight: bolder;"
          @click="$refs.login.show=true"
        >Login</span>
        &nbsp;to become part of Sprite-Crossing.
      </div>
    </v-container>
    <profile-dialog v-if="showProfile" @close="showProfile=false"></profile-dialog>
    <edit-dialog v-if="showEdit" @close="showEdit=false" @edit-success="init"></edit-dialog>
    <upload-dialog v-if="showUpload" @close="showUpload=false" @upload-success="init"></upload-dialog>
    <exit-confirm v-if="showExit" @close="showExit=false" @logout="logout"></exit-confirm>
  </div>
</template>

<script>
import {reqCheckLogin, reqLogout} from '@/require/auth';
import {reqGetUser, reqGetUserWork} from '@/require/user';

import WorkTimeLine from '@/pages/Profile/WorkTimeLine';
import EditDialog from '@/pages/Profile/EditDialog';
import UploadDialog from '@/pages/Profile/UploadDialog';
import LoginDialog from '@/components/Dialog/LoginDialog';
import ExitConfirm from './ExitConfirm';
import ProfileDialog from '@/components/Dialog/ProfileDialog';

import AvatarDefault from '@/assets/avatar-large.svg';

export default {
  name: 'Profile',
  components: {
    ProfileDialog,
    ExitConfirm,
    LoginDialog,
    UploadDialog,
    EditDialog,
    WorkTimeLine,
    AvatarDefault
  },
  data() {
    return {
      showWork: false,
      showProfile: false,
      showEdit: false,
      showUpload: false,
      showExit: false,
      user: {},
      login: '',
      worksList: [],
      openWorkImage: '',
    };
  },
  methods: {
    async init() {
      this.login = await reqCheckLogin();
      if (this.login) {
        this.user = await reqGetUser();
        const result = await reqGetUserWork(this.nickname);
        this.worksList = result.works;
      }
    },

    openProfile() {
      this.showProfile = true;
    },
    setProfile() {
      this.showEdit = true;
    },
    async logout() {
      await reqLogout();
      this.$store.commit('logout');
      await this.init();
    },
  },
  computed: {
    backgroundSrc() {
      if (this.user.backgroundImage) {
        return `${this.$store.state.host}/image/background/${this.user.backgroundImage}`;
      }

      return '';
    },
    avatarSrc() {
      if (this.user.avatar) {
        return `${this.$store.state.host}/image/avatar/${this.user.avatar}`;
      }

      return '';
    },
  },
  created() {
    this.init();
  }
}
</script>

<style lang="scss">
@import "src/styles/common";
.container-scroll {
  height: 89vh;
  overflow-y: scroll;
}
.time-line-scroll {
  overflow-y: scroll;
  height: 480px;
}
</style>