<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="1" class="mr-12">
        <sort-menu @change="changeSort"></sort-menu>
      </v-col>
      <v-col cols="1" class="mr-8">
        <filter-menu @change="changeFilter"></filter-menu>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="4">
        <search-menu @change="changeSearch"></search-menu>
      </v-col>
    </v-row>
    <v-row>
      <work-list></work-list>
    </v-row>
  </v-container>
</template>

<script>
import SearchMenu from './Menus/SearchMenu'
import SortMenu from './Menus/SortMenu';
import FilterMenu from './Menus/FilterMenu';
import WorkList from './Works/WorkList';

export default {
  name: 'Gallery',
  components: {WorkList, FilterMenu, SortMenu, SearchMenu},
  data() {
    return {
      // sort
      // filter
      // search
    }
  },
  methods: {
    changeSort(sort) {
      console.log(sort);
    },
    changeSearch(search) {
      console.log(search);
    },
    changeFilter(filter) {
      console.log(filter);
    }
  }
}
</script>

<style scoped>
</style>