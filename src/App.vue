<template>
  <v-app>
    <nav-bar></nav-bar>
    <v-main class="grey lighten-3">
      <v-container>
        <v-sheet
          min-height="70vh"
          rounded="lg"
        >
          {{$route.name}}
          {{$vuetify.breakpoint.name}}
          {{$vuetify.breakpoint.width}}
          <router-view></router-view>
        </v-sheet>
      </v-container>
    </v-main>
  </v-app>
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
