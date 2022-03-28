<template>
  <v-text-field
    label="Search"
    color="#FF4785"
    hide-details
    outlined
    dense
    @focus="focus=true"
    @blur="focus=false"
    @input="debounceChangeInput"
  >
    <template v-slot:prepend-inner>
      <search :class="{'gray-filter': !focus}"></search>
    </template>
  </v-text-field>
</template>

<script>
require('@/assets/gallery')
import {debounce} from '@/utils'

export default {
  name: 'SearchMenu',
  data() {
    return {
      focus: false,
      debounceChangeInput: debounce(this.changeInput, 400),
    }
  },
  methods: {
    changeInput(e) {
      this.$emit('change', e)
    },
  }
}
</script>

<style lang="scss">
@import "src/styles/common";
</style>