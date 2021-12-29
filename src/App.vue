<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from '@/components/Layout/NavBar'

export default {
  name: 'App',
  components: {
    NavBar,
  }
}
</script>

<style>
#app {
}
</style>
