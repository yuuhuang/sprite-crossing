<template>
  <v-menu offset-y @input="e => showMenu = e">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        text
        :color="showMenu ? '#FF4785' : '#666'"
        width="100%"
        v-bind="attrs"
        v-on="on"
      >
        <sort :class="{'gray-filter': !showMenu}"></sort>
        {{ $vuetify.breakpoint.xs ? '' : options[chosenOption] }}
      </v-btn>
    </template>
    <v-list>
      <v-list-item-group v-model="chosenOption" color="#FF4785" @change="chooseOption">
        <v-list-item
          v-for="(item, index) in options"
          :key="index"
          mandatory
          dense
        >
          {{ item }}
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script>
require('@/assets/gallery')

export default {
  name: 'SortMenu',
  data() {
    return {
      chosenOption: 0,
      showMenu: false,
    }
  },
  props: {
    options: {
      type: Array,
      default() {
        return ['Latest', 'Favourite', 'Most View']
      }
    }
  },
  methods: {
    chooseOption(e) {
      this.$emit('change', this.options[e]);
    }
  }
}
</script>

<style lang="scss">
@import "src/styles/common";
</style>