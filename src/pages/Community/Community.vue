<template>
  <div class="pa-4 hide-scroll" style="height:89vh;overflow: scroll">
    <discuss-card
      class="mb-4"
      v-for="(discuss, index) in discussList"
      :key="index"
      :discuss-data="discuss"
    ></discuss-card>
  </div>
</template>

<script>
import DiscussCard from '@/pages/Community/DiscussCard'
import {discussList} from '@/mock/discussList'

export default {
  name: 'Community',
  components: {DiscussCard},
  data() {
    return {
      discussList,
    }
  }
}
</script>

<style scoped>

</style>