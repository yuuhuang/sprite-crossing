<template>
  <v-dialog v-model="show" max-width="480" width="480" persistent>
    <v-card>
      <v-card-title style="color: #FF4785">New Project</v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form">
            <v-row>
              <v-col cols="6">
                <v-text-field
                  color="#ff4785"
                  label="Size"
                  v-model="size"
                  suffix="px"
                  :rules="[
                    x => /^[0-9]+$/.test(x) && Number(x) > 0 || 'Positive Integer Needed',
                    x => Number(x) <= 256 || 'Not Greater Than 256px Please'
                  ]"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="create" color="#ff4785">Create</v-btn>
        <v-btn text @click="hideNew">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {addAllKeypress, removeAllKeypress} from '@/scripts/keypress';

export default {
  name: 'New',
  data() {
    return {
      show: false,
      size: 32,
    }
  },
  methods: {
    create() {
      if (this.$refs.form.validate()) {
        this.$emit('create', Number(this.size));
        this.hideNew();
      }
    },
    showNew() {
      this.show = true;
      removeAllKeypress();
    },
    hideNew() {
      this.show = false;
      addAllKeypress();
    }
  }
}
</script>

<style scoped>

</style>