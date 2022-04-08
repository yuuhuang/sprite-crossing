<template>
  <v-dialog v-model="show" @input="input" width="320">
    <v-card>
      <v-card-title style="color: #FF4785" class="flex-center">Edit Profile</v-card-title>
      <v-card-text class="mt-4">
        <v-form ref="form">
          <v-text-field
            v-model="nickname"
            :counter="12"
            color="#FF4785"
            :rules="nameRules"
            label="Nickname"
            required
            outlined
            dense
          ></v-text-field>
          <v-textarea
            v-model="bio"
            :counter="128"
            color="#FF4785"
            :rules="bioRules"
            label="Bio"
            height="96"
            outlined
            dense
          ></v-textarea>
          <v-file-input
            v-model="avatar"
            :counter="1"
            color="#FF4785"
            :rules="avatarRules"
            label="Avatar"
            outlined
            dense
            prepend-icon=""
          ></v-file-input>
          <v-file-input
            v-model="background"
            :counter="1"
            color="#FF4785"
            :rules="backgroundRules"
            label="Background"
            outlined
            dense
            prepend-icon=""
          ></v-file-input>
        </v-form>
      </v-card-text>
      <v-card-actions class="flex-center">
        <v-btn color="#ff4785cc" depressed min-width="96" @click="save"><span style="color: white">Save</span></v-btn>
        <v-btn color="#aaa" depressed min-width="96" @click="cancel"><span style="color: white">Cancel</span></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {reqGetUser, reqPostUser} from '../../require/user';

export default {
  name: 'EditDialog',
  data() {
    return {
      // basic
      show: false,
      // values
      nickname: '',
      bio: '',
      avatar: {},
      background: {},
      // rules
      nameRules: [
        v => Boolean(v) || 'nickname required',
        v => (v && v.length <= 12) || 'nickname maxlength is 12',
      ],
      bioRules: [
        v => (typeof v === 'string' && v.length <= 128) || 'bio maxlength is 128',
      ],
      avatarRules: [
        // f => !f || f && f.size < 2000000 || 'avatar maxsize is 2 MB!',
      ],
      backgroundRules: [
        // f => !f || f.size < 3000000 || 'backgroundImage maxsize is 3 MB!',
      ],
    };
  },
  methods: {
    input(status) {
      if (!status) {
        this.$emit('close');
      }
    },

    async save() {
      if (this.$refs.form.validate()) {
        const result = await reqPostUser({
          nickname: this.nickname,
          avatar: this.avatar,
          bio: this.bio,
          backgroundImage: this.background,
        });
        if (result.success) {
          this.$emit('edit-success');
          this.$emit('close');
        }
      }
    },
    cancel() {
      this.$emit('close');
    },
  },
  async created() {
    const user = await reqGetUser();
    this.nickname = user.nickname;
    this.bio = user.bio;
  },
  mounted() {
    this.show = true;
  }
}
</script>

<style lang="scss">
@import "src/styles/common";
</style>