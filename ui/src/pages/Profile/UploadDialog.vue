<template>
  <v-dialog v-model="show" @input="input" width="640">
    <v-card>
      <v-card-title style="color: #FF4785">Upload Artworks</v-card-title>
      <v-card-text class="mt-4">
        <v-form ref="form">
          <v-file-input
            v-model="work"
            :counter="1"
            color="#FF4785"
            :rules="workRules"
            label="Artwork"
            outlined
            dense
            prepend-icon=""
          ></v-file-input>
          <v-text-field
            v-model="title"
            :counter="32"
            color="#FF4785"
            :rules="titleRules"
            label="Title"
            required
            outlined
            dense
          ></v-text-field>
          <v-textarea
            v-model="description"
            :counter="128"
            color="#FF4785"
            :rules="descriptionRules"
            label="Description"
            height="128"
            outlined
            dense
          ></v-textarea>
          <v-combobox
            v-model="labels"
            chips
            clearable
            label="Labels"
            prepend-icon=""
            multiple
            outlined
            color="#FF4785"
          >
            <template v-slot:selection="{ attrs, item, select, selected }">
              <v-chip
                class="pr-0"
                v-bind="attrs"
                :input-value="selected"
                color="#FF4785"
                outlined
                small
                @click="select"
              >
                <span>{{ item }}</span>
                <v-btn small icon color="#FF4785" class="ml-2" >
                  <close-circle @click="removeLabel(item)"></close-circle>
                </v-btn>
              </v-chip>
            </template>
          </v-combobox>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="upload" color="#ff4785">Upload</v-btn>
        <v-btn text @click="cancel">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
require('@/assets/cards')

export default {
  name: 'UploadDialog',
  data() {
    return {
      // basic
      show: false,
      // values
      work: [],
      title: '',
      description: '',
      labels: [],
      // rules
      workRules: [
        f => !f || f.size < 2000000 || 'Art work size should be less than 2 MB!',
      ],
      titleRules: [
        v => Boolean(v) || 'Title is required',
        v => (v && v.length <= 32) || 'Title must be less than 32 characters',
      ],
      descriptionRules: [
        v => (typeof v === 'string' && v.length <= 128) || 'Descriptions must be less than 128 characters',
      ],
    };
  },
  methods: {
    input(status) {
      if (!status) {
        this.$emit('close');
      }
    },
    removeLabel(item) {
      this.labels.splice(this.labels.indexOf(item), 1)
      this.labels = [...this.labels]
    },
    upload() {
      if (this.$refs.form.validate()) {
        console.log('upload', this.work, this.title, this.description, this.labels);
      }
    },
    cancel() {
      this.$emit('close');
    },
  },
  mounted() {
    this.show = true;
  },
}
</script>

<style scoped>

</style>