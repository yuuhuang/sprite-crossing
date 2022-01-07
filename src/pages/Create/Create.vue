<template>
  <div class="create-page">
    <tools></tools>
    <colors></colors>
  </div>
</template>

<script>
import Tools from './Tools'
import Colors from './Colors'

export default {
  name: 'Create',
  components: {
    Tools,
    Colors
  }
}
</script>

<style lang="scss" scoped>
.create-page {
  background-color: $gray;
  height: 100%;
}
</style>