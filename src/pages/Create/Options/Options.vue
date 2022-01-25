<template>
  <div class="options-container">
    <v-btn-toggle
      class="btn-bar elevation-3"
      multiple
    >
      <v-btn class="white">
        <new></new>
      </v-btn>
      <v-btn class="white">
        <overscan></overscan>
      </v-btn>
      <v-btn class="white">
        <grid></grid>
      </v-btn>
      <v-btn class="white">
        <revocation></revocation>
      </v-btn>
      <v-btn class="white">
        <redo></redo>
      </v-btn>
      <v-btn class="white">
        <save></save>
      </v-btn>
    </v-btn-toggle>
  </div>
</template>

<script>
require('@/assets/optionsBar/index')

export default {
  name: 'Options',
  props: {
    currentScale: Number
  }
}
</script>

<style scoped>
.options-container {
  position: absolute;
  width: 100%;
  height: 0;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-bar {
  margin: auto;
}
</style>