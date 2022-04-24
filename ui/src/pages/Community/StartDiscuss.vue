<template>
  <div>
    <v-dialog v-model="show" @input="input" width="640">
      <v-card>
        <v-card-title style="color: #FF4785" class="flex-center">Initiate a discussion</v-card-title>
        <v-card-text class="mt-4 pl-8 pr-8">
          <v-form ref="form">
            <v-text-field
                v-model="title"
                :counter="32"
                color="#FF4785"
                :rules="titleRules"
                label="Title"
                required
                outlined
                dense
            ></v-text-field>
            <v-textarea
                v-model="description"
                :counter="512"
                color="#FF4785"
                :rules="descriptionRules"
                label="Description"
                height="128"
                outlined
                dense
            ></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions class="flex-center">
          <v-btn color="#ff4785cc" depressed width="25%" @click="initiate">
            <span style="color: white">Initiate</span>
          </v-btn>
          <v-btn color="#888" depressed width="25%" @click="cancel">
            <span style="color:white;">Cancel</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <login-dialog v-if="showLogin" @close="showLogin = false"></login-dialog>
  </div>
</template>

<script>
import {reqPostDiscuss} from '@/require/discuss'

import LoginDialog from '@/components/Dialog/LoginDialog'

export default {
  name: 'StartDiscuss',
  components: {LoginDialog},
  data() {
    return {
      // basic
      show: false,
      showLogin: false,
      // values
      title: '',
      description: '',
      // rules
      titleRules: [
        v => Boolean(v) || 'Title is required',
        v => (v && v.length <= 32) || 'Title must be less than 12 characters',
      ],
      descriptionRules: [
        v => (typeof v === 'string' && v.length <= 512) || 'Description must be less than 128 characters',
      ],
    };
  },
  methods: {
    input(status) {
      if (!status) {
        this.$emit('close');
      }
    },

    async initiate() {
      if (this.$refs.form.validate()) {
        const result = await reqPostDiscuss(this.title, this.description);
        if (result.notLogged) {
          this.showLogin = true;
        } else {
          this.$emit('initiate');
          this.$emit('close');
        }
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

<style lang="scss">
@import "src/styles/common";
</style>