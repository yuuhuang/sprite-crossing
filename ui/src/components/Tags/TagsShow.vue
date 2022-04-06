<template>
  <div>
    <v-slide-group v-if="omit" show-arrows>
      <template v-slot:prev>
        <chevron-left></chevron-left>
      </template>
      <template v-slot:next>
        <chevron-right></chevron-right>
      </template>
      <v-chip-group column>
        <v-chip v-for="(tag, index) in tags" :key="index" small @click="chooseTag(tag)">{{ tag }}</v-chip>
      </v-chip-group>
    </v-slide-group>
    <v-chip-group v-else column>
      <v-chip v-for="(tag, index) in tags" :key="index" small @click="chooseTag(tag)">{{ tag }}</v-chip>
    </v-chip-group>
  </div>
</template>

<script>
require('@/assets/chevron')

export default {
  name: 'TagsShow',
  props: {
    tags: Array,
    omit: Boolean,
  },
  methods: {
    chooseTag(tag) {
      this.$emit('choose-tag', tag);
    },
  },
}
</script>

<style scoped>

</style>