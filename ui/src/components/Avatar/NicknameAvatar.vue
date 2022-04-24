<template>
  <div style="display: flex;align-items: center">
    <v-avatar size="32" class="pointer-cursor" @click="openProfile">
      <v-img
        v-if="avatar"
        class="elevation-6"
        alt="avatar"
        :src="avatar ? `${$store.state.host}/image/avatar/${avatar}` : ''"
      >
        <template v-slot:placeholder>
          <account class="gray-filter"></account>
        </template>
      </v-img>
      <account v-else class="gray-filter"></account>
    </v-avatar>
    <span class="ml-2 pointer-cursor" @click="openProfile">{{nickname}}</span>
    <profile-dialog v-if="showProfileDialog" :nickname="nickname" @close="showProfileDialog=false"></profile-dialog>
  </div>
</template>

<script>
import ProfileDialog from '@/components/Dialog/ProfileDialog';

export default {
  name: 'NicknameAvatar',
  components: {ProfileDialog},
  props: {
    nickname: String,
    avatar: String,
  },
  data() {
    return {
      showProfileDialog: false,
    };
  },
  methods: {
    openProfile() {
      this.showProfileDialog = true;
    }
  }
}
</script>

<style lang="scss">
@import "src/styles/common";
</style>