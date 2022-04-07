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
          <v-text-field
            v-model="nickname"
            color="#FF4785"
            :rules="nicknameRules"
            label="Nickname"
            required
            outlined
            dense
          ></v-text-field>
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
        </v-form>
      </v-card-text>
      <v-card-actions class="flex-center">
        <v-btn color="#ff4785cc" depressed width="80%">
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
            :rules="emailRules"
            label="Email"
            required
            outlined
            dense
          ></v-text-field>
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
        </v-form>
      </v-card-text>
      <v-card-actions class="flex-center">
        <v-btn color="#ff4785cc" depressed width="80%">
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
export default {
  name: 'LoginCard',
  data() {
    return {
      toggleIndex: 0,
    };
  },
}
</script>

<style lang="scss">
@import "src/styles/common";
</style>