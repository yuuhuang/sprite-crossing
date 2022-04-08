<template>
  <div>
    <v-container
      class="pl-0 pr-0 pt-0"
      :class="{
        'container-scroll': $vuetify.breakpoint.smAndDown,
        'hide-scroll': true,
        'flex-center': !login,
       }"
    >
      <login-card v-if="!login" @login="init"></login-card>
      <div v-else>
        <v-img
          :src="user.backgroundImage"
          height="256"
          width="100%"
          gradient="to top, #fff, #0000"
          style="border-radius: 8px 8px 0 0"
        ></v-img>
        <v-row style="position: relative; bottom: 96px;">
          <v-col :cols="$vuetify.breakpoint.mdAndUp ? 5 : 12" class="flex-column align-center" style="display: flex">
            <v-avatar size="160" style="border: 2px #fff solid;box-shadow: 0 0 0 2px #ccc">
              <avatar-default v-if="!user.avatar || user.avatar === ''" class="gray-filter"></avatar-default>
              <v-img aspect-ratio="1" :src="user.avatar" v-else>
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
              <v-btn outlined color="#aaa" class="ml-1" width="36" min-width="36" @click="logout">
                <exit class="gray-filter"></exit>
              </v-btn>
            </div>
          </v-col>
          <v-col :cols="$vuetify.breakpoint.mdAndUp ? 7 : 12"
                 :class="{'hide-scroll': true, 'time-line-scroll': $vuetify.breakpoint.mdAndUp}">
            <work-time-line
              :work-list="user.worksList || []"
              style="position: relative; right: 24px;"
              @open-upload="showUpload=true"
            ></work-time-line>
          </v-col>
        </v-row>
      </div>
    </v-container>
    <edit-dialog v-if="showEdit" @close="showEdit=false" @edit-success="init"></edit-dialog>
    <upload-dialog v-if="showUpload" @close="showUpload=false"></upload-dialog>
  </div>
</template>

<script>
import {reqCheckLogin, reqLogout} from '@/require/auth';
import {reqGetUser} from '@/require/user';

import WorkTimeLine from '@/pages/Profile/WorkTimeLine';
import EditDialog from '@/pages/Profile/EditDialog';
import UploadDialog from '@/pages/Profile/UploadDialog';
import LoginCard from '@/components/Dialog/LoginCard';

import AvatarDefault from '@/assets/avatar-large.svg';

export default {
  name: 'Profile',
  components: {LoginCard, UploadDialog, EditDialog, WorkTimeLine, AvatarDefault},
  data() {
    return {
      showEdit: false,
      showUpload: false,
      user: {},
      login: false,
    };
  },
  methods: {
    async init() {
      this.login = await reqCheckLogin();
      if (this.login) {
        this.user = await reqGetUser();
      }
    },

    openProfile() {
      console.log('open my profile');
    },
    setProfile() {
      this.showEdit = true;
    },
    async logout() {
      await reqLogout();
      await this.init();
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