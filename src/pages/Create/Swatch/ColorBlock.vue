<template>
  <div
    class="bg-block"
    :style="{
      width: size,
      height: size,
    }"
  >
    <div
      class="block"
      ref="color-block"
      :style="{backgroundColor: color}"
    >
    </div>
  </div>
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
  width: 100%;
  height: 100%;
  border-radius: 3px;
}
.bg-block {
  border-radius: 3px;
  background: url("./../../../assets/background/transparent-small.png");
}
</style>