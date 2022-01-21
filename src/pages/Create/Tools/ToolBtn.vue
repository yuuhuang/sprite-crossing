<template>
  <v-list-item :value="value">
    <v-tooltip
      right
      open-delay="100"
      transition="slide-x-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          depressed
          color="white"
          width="36px"
          min-width="36px"
        >
          <slot></slot>
        </v-btn>
      </template>
      <span>{{tip || value}}</span>
    </v-tooltip>
  </v-list-item>
</template>

<script>
export default {
  name: 'ToolBtn',
  props: {
    value: String,
    tip: String,
  }
}
</script>

<style scoped>

</style>