<template>
  <div
    class="block"
    ref="color-block"
    :style="{
      width: size,
      height: size,
      backgroundColor: color,
      borderRadius: '2px',
    }"
  ></div>
</template>

<script>
export default {
  name: 'ColorBlock',
  props: {
    size: {
      type: String,
      default: '20px'
    },
    color: {
      type: String,
      default: '#666'
    },
  },
  mounted() {
    this.$refs['color-block'].addEventListener('click', () => {
      this.$emit('left-click', this.color);
    });
  }
}
</script>

<style scoped>
.block {
  display: inline-block;
}
</style>