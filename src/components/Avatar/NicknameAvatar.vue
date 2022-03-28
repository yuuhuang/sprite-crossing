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
  </div>
</template>

<script>
export default {
  name: 'NicknameAvatar',
  props: {
    nickname: String,
    avatar: String,
    userId: Number,
  },
  methods: {
    openProfile() {
      console.log('open profile', this.userId);
    }
  }
}
</script>

<style scoped>
</style>