<template>
  <v-app>
    <nav-bar></nav-bar>
    <create v-if="$route.name === 'create'"></create>
    <page-content v-else></page-content>
  </v-app>
</template>

<script>
import NavBar from '@/components/Layout/NavBar'
import PageContent from '@/components/Layout/PageContent';
import Create from '@/pages/Create/Create';

export default {
  name: 'App',
  components: {
    NavBar,
    PageContent,
    Create,
  },
}
</script>

<style>
#app {
}
</style>
