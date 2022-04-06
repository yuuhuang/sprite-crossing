<template>
  <div>
    <v-container
      class="pl-0 pr-0 pt-0"
      :class="{'container-scroll': $vuetify.breakpoint.smAndDown, 'hide-scroll': true}">
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
            <v-img aspect-ratio="1" :src="user.avatar">
              <template v-slot:placeholder>
                <v-skeleton-loader type="image" height="100%" tile></v-skeleton-loader>
              </template>
            </v-img>
          </v-avatar>
          <span class="mt-4" style="font-size: 24px;font-weight: 300">{{ user.nickname }}</span>
          <div class="mt-4">
            <v-btn outlined dark color="#FF4785" class="mr-1" @click="setProfile">Edit Profile</v-btn>
            <v-btn outlined dark color="#FF4785" class="ml-1" @click="openProfile">Preview</v-btn>
          </div>
        </v-col>
        <v-col :cols="$vuetify.breakpoint.mdAndUp ? 7 : 12"
          :class="{'hide-scroll': true, 'time-line-scroll': $vuetify.breakpoint.mdAndUp}">
          <work-time-line
            :work-list="user.workList"
            style="position: relative; right: 24px;"
            @open-upload="showUpload=true"
          ></work-time-line>
        </v-col>
      </v-row>
    </v-container>
    <edit-dialog v-if="showEdit" @close="showEdit=false"></edit-dialog>
    <upload-dialog v-if="showUpload" @close="showUpload=false"></upload-dialog>
  </div>
</template>

<script>
import {user} from '@/mock/user'
import WorkTimeLine from '@/pages/Profile/WorkTimeLine'
import EditDialog from '@/pages/Profile/EditDialog'
import UploadDialog from '@/pages/Profile/UploadDialog'

export default {
  name: 'Profile',
  components: {UploadDialog, EditDialog, WorkTimeLine},
  data() {
    return {
      showEdit: false,
      showUpload: false,
      user,
    };
  },
  methods: {
    openProfile() {
      console.log('open my profile');
    },
    setProfile() {
      this.showEdit = true;
    },
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