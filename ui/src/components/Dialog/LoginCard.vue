<template>
  <div>
    <v-card width="320" min-height="320" v-if="!toggleIndex">
      <v-card-title style="color: #ff4785" class="flex-center">
        Sign Up
      </v-card-title>
      <v-card-text class="flex-center">
        Become part of sprite crossing
      </v-card-text>
      <v-card-text class="pl-6 pr-6">
        <v-form ref="form">
          <v-text-field
            v-model="email"
            color="#FF4785"
            :rules="emailRules"
            label="Email"
            required
            outlined
            dense
          ></v-text-field>
          <span class="error-span">{{ emailErrors }}</span>
          <v-text-field
            v-model="nickname"
            color="#FF4785"
            :rules="nicknameRules"
            label="Nickname"
            required
            outlined
            dense
          ></v-text-field>
          <span class="error-span">{{ nicknameErrors }}</span>
          <v-text-field
            v-model="password"
            color="#FF4785"
            :rules="passwordRules"
            label="Password"
            type="password"
            required
            outlined
            dense
          ></v-text-field>
          <span class="error-span">{{ passwordErrors }}</span>
        </v-form>
      </v-card-text>
      <v-card-actions class="flex-center">
        <v-btn color="#ff4785cc" depressed width="80%" @click="login">
          <span style="color: white">Create account</span>
        </v-btn>
      </v-card-actions>
      <v-card-text class="flex-center">
        Already a member?
        <span
          class="pointer-cursor ml-2"
          style="color: #ff4785"
          @click="toggleIndex=1"
        >Sign in</span>
      </v-card-text>
    </v-card>
    <v-card width="320" min-height="320" v-if="toggleIndex">
      <v-card-title style="color: #ff4785" class="flex-center">
        Sign In
      </v-card-title>
      <v-card-text class="flex-center">
        Welcome back!
      </v-card-text>
      <v-card-text class="pl-6 pr-6">
        <v-form ref="form">
          <v-text-field
            v-model="email"
            color="#FF4785"
            label="Email"
            required
            outlined
            dense
          ></v-text-field>
          <span class="error-span">{{ emailErrors }}</span>
          <v-text-field
            v-model="password"
            color="#FF4785"
            label="Password"
            type="password"
            required
            outlined
            dense
          ></v-text-field>
          <span class="error-span">{{ passwordErrors }}</span>
        </v-form>
      </v-card-text>
      <v-card-actions class="flex-center">
        <v-btn color="#ff4785cc" depressed width="80%" @click="login">
          <span style="color: white">Sign In</span>
        </v-btn>
      </v-card-actions>
      <v-card-text class="flex-center">
        Not a member?
        <span
          class="pointer-cursor ml-2"
          style="color: #ff4785"
          @click="toggleIndex=0"
        >Sign up</span>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import {reqSignup, reqLogin} from '../../require/auth';

export default {
  name: 'LoginCard',
  data() {
    return {
      toggleIndex: 0,

      // values
      email: '',
      password: '',
      nickname: '',

      // rules
      emailRules: [
        v => Boolean(v) || 'email required',
      ],
      nicknameRules: [
        v => Boolean(v) || 'nickname required',
        v => (v && v.length <= 12) || 'nickname maxlength is 12',
      ],
      passwordRules: [
        v => Boolean(v) || 'password required',
        v => (v && v.length >= 8) || 'password minlength is 8',
      ],

      // errors
      emailErrors: '',
      nicknameErrors: '',
      passwordErrors: '',
    };
  },
  methods: {
    async login() {
      if (this.$refs.form.validate()) {
        let result;
        if (this.toggleIndex) {
          result = await reqLogin(this.email, this.password);
        } else {
          result = await reqSignup(this.email, this.password, this.nickname);
        }
        if (result === true) {
          this.$emit('login');
        } else {
          this.emailErrors = result.email || '';
          this.passwordErrors = result.password || '';
          this.nicknameErrors = result.nickname || '';
        }
      }
    },
  },
  watch: {
    toggleIndex() {
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
      this.emailErrors = this.nicknameErrors = this.passwordErrors = '';
    }
  },
}
</script>

<style lang="scss">
@import "src/styles/common";
.error-span {
  color: rgb(255, 82, 82);
  font-size: 12px;
  font-weight: 400;
  position: relative;
  left: 12px;
  bottom: 16px;
}
</style>