<template>
  <v-dialog v-model="show" @input="input" width="240">
    <v-card>
      <v-card-title style="color: #FF4785" class="flex-center">Confirm to log out ?</v-card-title>
      <v-card-text class="mt-2 flex-center">
        <span style="
          color: #ccc;
          font-weight: bolder;
          font-size: xx-large;
          transform: rotateZ(90deg);
        ">:(</span>
      </v-card-text>
      <v-card-actions class="flex-center">
        <v-btn color="#ff4785cc" depressed @click="cancel">
          <span style="color: white">Cancel</span>
        </v-btn>
        <v-btn color="#aaa" depressed @click="confirm">
          <span style="color: white">Bye!</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ExitConfirm',
  data() {
    return {
      // basic
      show: false,
    };
  },
  methods: {
    input(status) {
      if (!status) {
        this.$emit('close');
      }
    },
    cancel() {
      this.$emit('close');
    },
    confirm() {
      this.$emit('logout');
      this.$emit('close');
    },
  },
  mounted() {
    this.show = true;
  },
}
</script>

<style lang="scss">
@import "src/styles/common";
</style>