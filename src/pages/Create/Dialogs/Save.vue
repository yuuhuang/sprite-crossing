<template>
  <v-dialog v-model="show" max-width="480" width="480" persistent>
    <v-card>
      <v-card-title style="color: #FF4785">Save</v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field color="#ff4785" label="File Name" v-model="fileName"></v-text-field>
          <v-row>
            <v-col cols="6">
              <v-text-field color="#ff4785" label="Size" :value="`${downloadSize}px`" disabled></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                color="#ff4785"
                label="Resize"
                v-model="resize"
                suffix="%"
                :rules="[x => /^[0-9]+$/.test(x) || 'Percentage Needed']"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="save" color="#ff4785">Save</v-btn>
        <v-btn text @click="hideSave">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {addAllKeypress, preventCtrlS, removeAllKeypress} from '@/scripts/keypress';

export default {
  name: 'Save',
  props: {
    imageSize: {
      type: Number,
      default: 32
    }
  },
  data() {
    return {
      show: false,
      fileName: 'MyArtwork',
      resize: 100,
    }
  },
  computed: {
    downloadSize() {
      if (isNaN(this.resize)) {
        return this.imageSize;
      }

      return Math.floor(this.imageSize * this.resize / 100);
    }
  },
  methods: {
    showSave() {
      this.show = true;
      preventCtrlS();
      removeAllKeypress();
    },
    hideSave() {
      this.show = false;
      addAllKeypress();
    },
    save() {
      if (this.$refs.form.validate()) {
        this.$emit('save', this.fileName, this.downloadSize);
        this.hideSave();
      }
    }
  }
}
</script>

<style scoped>

</style>