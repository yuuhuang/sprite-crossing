<template>
  <v-app-bar
    class="nav-bar"
    dense
  >
    <v-app-bar-title>Sprite Crossing</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-app-bar-title
      :class="{isChosen: $route.name === item.name, 'nav-bar-title': true}"
      v-for="item in pages"
      :key="item.name"
    >
      <v-btn
        tile
        elevation="0"
        @click="$route.name !== item.name ? $router.push(item.path) : ''"
      >{{item.title}}</v-btn>
    </v-app-bar-title>
    <v-avatar>
      <img src="../../assets/caitou.png">
    </v-avatar>
  </v-app-bar>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      pages: this.$router.options.routes.filter(item => item.title)
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.nav-bar {
  padding: 0;
}
.nav-bar-title {
  height: 40px;

  .isChosen {
    border-bottom: 8px solid $teal-1;
  }
}
</style>