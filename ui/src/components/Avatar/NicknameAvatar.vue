<template>
  <div>
    <v-avatar size="32" class="pointer-cursor" @click="openProfile">
      <v-img
        v-if="avatar"
        class="elevation-6"
        alt="avatar"
        :src="avatar"
      >
        <template v-slot:placeholder>
          <account class="gray-filter"></account>
        </template>
      </v-img>
      <account v-else class="gray-filter"></account>
    </v-avatar>
    <span class="ml-1 pointer-cursor" @click="openProfile">{{nickname}}</span>
    <profile-dialog v-if="showProfileDialog" :user-id="userId" @close="showProfileDialog=false"></profile-dialog>
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
    userId: Number,
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

<style scoped>
</style>