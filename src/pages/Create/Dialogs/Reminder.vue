<template>
  <v-dialog v-model="show" max-width="360" width="360" persistent>
    <v-card>
      <v-card-title>
        <v-container subtitle-1>
          Do you want to save the current work?
        </v-container>
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="showSave" color="#ff4785">Yes</v-btn>
        <v-btn text @click="showNew">No</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {addAllKeypress, removeAllKeypress} from '@/scripts/keypress';

export default {
  name: 'Reminder',
  data() {
    return {
      show: false,
    }
  },
  methods: {
    showReminder() {
      this.show = true;
      removeAllKeypress();
    },
    hideReminder() {
      this.show = false;
      addAllKeypress();
    },
    showNew() {
      this.hideReminder();
      this.$emit('open-new');
    },
    showSave() {
      this.hideReminder();
      this.$emit('open-save');
    }
  }
}
</script>

<style scoped>

</style>