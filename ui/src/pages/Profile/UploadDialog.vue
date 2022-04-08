<template>
  <v-dialog v-model="show" @input="input" width="640">
    <v-card>
      <v-card-title style="color: #FF4785" class="flex-center">Upload Artworks</v-card-title>
      <v-card-text class="mt-4 pl-8 pr-8">
        <v-form ref="form">
          <v-file-input
            v-model="image"
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
            v-model="tags"
            chips
            clearable
            label="Labels"
            :rules="tagsRules"
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
      <v-card-actions class="flex-center">
        <v-btn color="#ff4785cc" depressed min-width="96" @click="upload">
          <span style="color: white">Upload</span>
        </v-btn>
        <v-btn color="#aaa" depressed min-width="96" @click="cancel">
          <span style="color: white">Cancel</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
require('@/assets/cards')
import {reqPostWork} from '@/require/work';

export default {
  name: 'UploadDialog',
  data() {
    return {
      // basic
      show: false,
      // values
      image: [],
      title: '',
      description: '',
      tags: [],
      // rules
      workRules: [
        f => !f || f.size < 2000000 || 'art work maxsize is 2 MB!',
      ],
      titleRules: [
        v => Boolean(v) || 'title required',
        v => (v && v.length <= 32) || 'title maxlength is 32',
      ],
      descriptionRules: [
        v => (typeof v === 'string' && v.length <= 128) || 'descriptions maxlength is 128',
      ],
      tagsRules: [
        v => (v.length <= 12) || 'tags max number is 12'
      ]
    };
  },
  methods: {
    input(status) {
      if (!status) {
        this.$emit('close');
      }
    },
    removeLabel(item) {
      this.tags.splice(this.tags.indexOf(item), 1)
      this.tags = [...this.tags]
    },
    async upload() {
      if (this.$refs.form.validate()) {
        const result =
            await reqPostWork({image: this.image, title: this.title, description: this.description, tags: this.tags});
        if (result) {
          this.$emit('upload-success');
          this.$emit('close');
        }
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