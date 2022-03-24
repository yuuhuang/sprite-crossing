<template>
  <v-container>
    <v-row class="list-scroll">
      <v-col :cols="12 / colsNum" v-for="(colItem, colIndex) in colArray" :key="colIndex">
        <WorkCard
          class="mb-6"
          v-for="(item, index) in workList.filter((item, index) => index % colsNum === colIndex)"
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
      colsNum: 0,
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
    colArray() {
      return Array.from({length: this.colsNum});
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
.list-scroll {
  height: 80vh;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.list-scroll::-webkit-scrollbar {
  display: none;
}
</style>