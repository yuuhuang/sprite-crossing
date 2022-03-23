<template>
  <v-menu
    ref="menu"
    offset-y
    :close-on-content-click="false"
    @input="e => showMenu = e"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        text
        :color="showMenu ? '#FF4785' : '#666'"
        small
        v-bind="attrs"
        v-on="on"
      >
        <filter-svg :class="{'gray-filter': !showMenu}"></filter-svg>
        Filter
      </v-btn>
    </template>
      <v-card width="320" max-width="320">
        <v-card-subtitle>Size Range</v-card-subtitle>
        <v-card-text>
          <v-range-slider
            v-model="sizeRange"
            color="#FF4785"
            track-color="#6666"
            thumb-size="24"
            max="256"
            min="0"
            dense
          >
            <template v-slot:thumb-label="props">
              {{ props.value }}
            </template>
          </v-range-slider>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="#FF4785" @click="confirm">OK</v-btn>
          <v-btn text color="#666" @click="cancel">Cancel</v-btn>
        </v-card-actions>
      </v-card>
  </v-menu>
</template>

<script>
require('@/assets/gallery')

export default {
  name: 'FilterMenu',
  data() {
    return {
      showMenu: false,
      sizeRange: [0, 256],
      filter: {
        sizeRange: [0, 256],
      },
    }
  },
  methods: {
    confirm() {
      this.filter.sizeRange = this.sizeRange;
      this.$refs.menu.isActive = false;
    },
    cancel() {
      this.sizeRange = this.filter.sizeRange;
      this.$refs.menu.isActive = false;
    }
  },
  watch: {
    filter: {
      handler(val) {
        this.$emit('change', val);
      },
      deep: true,
    },
  },
}
</script>

<style scoped>
.gray-filter {
  filter: brightness(0) opacity(0.5);
}
</style>