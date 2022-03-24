<template>
  <v-container>
    <v-row>
      <v-col :cols="12 / colsNum">
        <WorkCard
          class="mb-12"
          v-for="(item, index) in workList.filter((item, index) => index % colsNum === 0)"
          :key="index"
          :id="item.id"
          :avatar="item.avatar"
          :nickname="item.nickname"
          :upload-time="item.uploadTime"
          :image="item.image"
          :title="item.title"
          :text="item.text"
          :tags="item.tags"
          :view-num="item.viewNum"
          :comment-num="item.commentNum"
          :like-num="item.likeNum"
        ></WorkCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import WorkCard from './WorkCard'

export default {
  name: 'WorkList',
  components: {WorkCard},
  data() {
    return {
      // style
      colsNum: 3,
      // data
      workList: [
        {
          id: 0,
          avatar: '/src/assets/caitou.png',
          nickname: 'caitou',
          uploadTime: '2022-03-23',
          image: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
          title: 'My First Art Work',
          text: 'This is my first pixel art!!!',
          tags: ['Animals', 'pink', 'kawaii'],
          viewNum: 0,
          commentNum: 0,
          likeNum: 0
        }, {}, {}, {}, {}, {}, {},
      ]
    };
  },
  methods: {
    init() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          this.colsNum = 1;
          break;
        case 'sm':
          this.colsNum = 2;
          break;
        case 'md':
          this.colsNum = 3;
          break;
        case 'lg':
          this.colsNum = 4;
          break;
        case 'xl':
          this.colsNum = 6;
          break;
        default:
          break;
      }
    }
  },
  computed: {
    breakpoint() {
      return this.$vuetify.breakpoint.name;
    },
  },
  watch: {
    breakpoint: {
      handler() {
        this.init();
      },
      immediate: true,
    },
  },
}
</script>

<style scoped>
</style>