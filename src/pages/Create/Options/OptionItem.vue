<template>
  <v-tooltip
    bottom
    open-delay="250"
  >
    <template v-slot:activator="{on, attrs}">
      <v-btn
        ref="btn"
        class="elevation-0 btn"
        :style="{borderRadius: `${leftRadius} ${rightRadius} ${rightRadius} ${leftRadius}`}"
        color="white"
        v-bind="attrs"
        v-on="on"
        tile
        :value="value"
        @click="click"
      >
        <slot></slot>
      </v-btn>
    </template>
    <span>{{tip}}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: 'OptionItem',
  props: {
    tip: String,
    value: String,
    withChosenStatus: Boolean,

    leftStyle: Boolean,
    rightStyle: Boolean,
  },
  computed: {
    leftRadius() {
      return this.leftStyle ? '4px' : '0px';
    },
    rightRadius() {
      return this.rightStyle ? '4px' : '0px';
    },
  },
  methods: {
    click() {
      if (this.withChosenStatus) {
        this.$refs.btn.isActive = !this.$refs.btn.isActive;
      }
      this.$emit('click-option', this.value);
    }
  }
}
</script>

<style scoped>
.btn {
  width: 40px !important;
  min-width: 40px !important;
  height: 32px !important;
  border: 1px solid rgba(0, 0, 0, 0.12) !important;
}
</style>