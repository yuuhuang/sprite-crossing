<template>
  <v-dialog v-model="show" @input="input" width="320">
    <v-card>
      <v-card-title style="color: #FF4785">Edit Profile</v-card-title>
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
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="save" color="#ff4785">Save</v-btn>
        <v-btn text @click="cancel">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
require('@/assets/cards')

export default {
  name: 'EditDialog',
  data() {
    return {
      // basic
      show: false,
      // values
      nickname: '',
      bio: '',
      avatar: [],
      background: [],
      // rules
      nameRules: [
        v => Boolean(v) || 'Nickname is required',
        v => (v && v.length <= 12) || 'Nickname must be less than 12 characters',
      ],
      bioRules: [
        v => (typeof v === 'string' && v.length <= 128) || 'Bio must be less than 128 characters',
      ],
      avatarRules: [
        f => !f || f.size < 2000000 || 'Avatar size should be less than 2 MB!',
      ],
      backgroundRules: [
        f => !f || f.size < 5000000 || 'Avatar size should be less than 5 MB!',
      ],
    };
  },
  methods: {
    input(status) {
      if (!status) {
        this.$emit('close');
      }
    },

    save() {
      if (this.$refs.form.validate()) {
        console.log('save', this.nickname, this.avatar, this.bio, this.background);
      }
    },
    cancel() {
      this.$emit('close');
    },
  },
  mounted() {
    this.show = true;
  }
}
</script>

<style scoped>

</style>