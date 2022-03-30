<template>
  <v-dialog v-model="show" @input="input" width="640">
    <v-card>
      <v-card-title style="color: #FF4785">Initiate a discussion</v-card-title>
      <v-card-text class="mt-4">
        <v-form ref="form">
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
            :counter="512"
            color="#FF4785"
            :rules="descriptionRules"
            label="Description"
            height="128"
            outlined
            dense
          ></v-textarea>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="initiate" color="#ff4785">Initiate</v-btn>
        <v-btn text @click="cancel">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'StartDiscuss',
  data() {
    return {
      // basic
      show: false,
      // values
      title: '',
      description: '',
      // rules
      titleRules: [
        v => Boolean(v) || 'Title is required',
        v => (v && v.length <= 32) || 'Title must be less than 12 characters',
      ],
      descriptionRules: [
        v => (typeof v === 'string' && v.length <= 512) || 'Description must be less than 128 characters',
      ],
    };
  },
  methods: {
    input(status) {
      if (!status) {
        this.$emit('close');
      }
    },

    initiate() {
      if (this.$refs.form.validate()) {
        console.log('initiate', this.title, this.description);
      }
    },
    cancel() {
      this.$emit('close');
    },
  },
  mounted() {
    this.show = true;
  }
}
</script>

<style scoped>

</style>