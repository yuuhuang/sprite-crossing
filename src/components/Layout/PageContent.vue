<template>
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
</template>

<script>
export default {
  name: 'PageContent'
}
</script>

<style scoped>

</style>