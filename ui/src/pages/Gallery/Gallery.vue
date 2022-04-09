<template>
  <v-container>
    <v-row>
      <v-col cols="4">
        <v-row>
          <v-col cols="6">
            <sort-menu @change="changeSort"></sort-menu>
          </v-col>
          <v-col cols="6">
            <filter-menu @change="changeFilter"></filter-menu>
          </v-col>
        </v-row>
      </v-col>
      <v-spacer></v-spacer>
      <v-col :cols="$vuetify.breakpoint.mdAndUp ? 4 : ($vuetify.breakpoint.sm ? 6 : 8)">
        <search-menu @change="changeSearch"></search-menu>
      </v-col>
    </v-row>
    <v-row>
      <work-list :search="search" :sort="sort"></work-list>
    </v-row>
  </v-container>
</template>

<script>
import SearchMenu from '@/components/Menus/SearchMenu'
import SortMenu from '@/components/Menus/SortMenu';
import FilterMenu from '@/components/Menus/FilterMenu';
import WorkList from './Works/WorkList';

export default {
  name: 'Gallery',
  components: {WorkList, FilterMenu, SortMenu, SearchMenu},
  data() {
    return {
      sort: '',
      search: '',
    }
  },
  methods: {
    changeSort(sort) {
      this.sort = sort;
    },
    changeSearch(search) {
      this.search = search;
    },
    changeFilter(filter) {
      console.log(filter);
    }
  }
}
</script>

<style scoped>
</style>