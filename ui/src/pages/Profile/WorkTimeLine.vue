<template>
  <v-timeline
    align-top
    dense
  >
    <v-timeline-item
      v-if="!Object.keys(this.workTimeLine).includes(formatToday) && !profileDialog"
      small color="#FF4785">
      <v-card flat style="background-color: #0000">
        <v-card-title class="text-h4 pt-0" style="color: #FF4785; font-weight: 300">
          {{ formatToday }}
        </v-card-title>
        <v-card-text>
          <v-btn
            :width="$vuetify.breakpoint.xs || profileDialog ? 64 : 100"
            :height="$vuetify.breakpoint.xs || profileDialog ? 64 :100"
            tile
            style="display: inline-block"
            @click="uploadWork"
          >
            <new style="transform: scale(2);filter: brightness(1) opacity(0.5)"></new>
          </v-btn>
        </v-card-text>
      </v-card>
    </v-timeline-item>
    <v-timeline-item
      small
      color="#FF4785"
      v-for="(value, key) in workTimeLine"
      :key="key"
    >
      <v-card flat style="background-color: #0000">
        <v-card-title class="text-h4 pt-0" style="color: #FF4785; font-weight: 300">
          {{ key }}
        </v-card-title>
        <v-card-text class="flex">
          <v-img v-if="key === formatToday && !profileDialog"
            style="display: inline-block;margin-right: 6px;">
            <v-btn
              :width="$vuetify.breakpoint.xs || profileDialog ? 64 : 100"
              :height="$vuetify.breakpoint.xs || profileDialog ? 64 :100"
              tile
              @click="uploadWork"
            >
              <new style="transform: scale(2);filter: brightness(1) opacity(0.5)"></new>
            </v-btn>
          </v-img>
          <v-img
            v-for="(item, index) in value"
            :key="index"
            :src="`${$store.state.host}/image/work/${item.image}`"
            :width="$vuetify.breakpoint.xs || profileDialog ? 64 : 100"
            :height="$vuetify.breakpoint.xs || profileDialog ? 64 :100"
            class="pointer-cursor"
            style="display: inline-block;margin-right: 6px;"
            @click="openWork(item.image)"
          ></v-img>
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
require('@/assets/optionsBar')

export default {
  name: 'WorkTimeLine',
  props: {
    worksList: {
      type: Array,
      default() {
        return [];
      }
    },
    profileDialog: Boolean,
  },
  methods: {
    openWork(image) {
      this.$emit('open-work', image);
    },
    uploadWork() {
      this.$emit('open-upload');
    },

  },
  computed: {
    workTimeLine() {
      const result = {};
      // eslint-disable-next-line array-callback-return
      this.worksList.map(item => {
        const itemDate = new Date(item.uploadTime);
        let formatItemDate = `${itemDate.getMonth() + 1}-${itemDate.getDate()}`;
        if (itemDate.getFullYear() !== new Date().getFullYear()) {
          formatItemDate = `${itemDate.getFullYear()}-${formatItemDate}`;
        }
        if (formatItemDate in result) {
          result[formatItemDate].push(item);
        } else {
          result[formatItemDate] = [item];
        }
      })

      return result;
    },
    formatToday() {
      return `${new Date().getMonth() + 1}-${new Date().getDate()}`;
    },
  },
}
</script>

<style lang="scss">
@import "src/styles/common";
</style>