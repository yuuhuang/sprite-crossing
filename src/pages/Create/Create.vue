<template>
  <div class="create-page">
    <tools></tools>
  </div>
</template>

<script>
import Tools from './Tools';
export default {
  name: 'Create',
  components: {Tools}
}
</script>

<style lang="scss" scoped>
.create-page {
  background-color: $gray;
  height: 100%;
}
</style>