<template>
  <v-app-bar
    app
    :flat="!collapse"
    :collapse="collapse"
    color="white"
  >
    <v-container :class="{'py-0': true, 'fill-height': true, 'collapse-nav': collapse}">
      <v-img
        v-if="!collapse"
        class="mr-6"
        :src="$vuetify.breakpoint.width >= 360 ?
         require('@/assets/logo.png') : require('@/assets/logo-thumbnail.png')"
        :max-width="$vuetify.breakpoint.width >= 360 ? '180px' : '32px'"
      >
      </v-img>
      <div v-if="$vuetify.breakpoint.width >= 960 && !collapse">
        <v-btn
          :class="{isChosen: $route.name === item.name}"
          depressed
          color="white"
          v-for="item in pages"
          :key="item.name"
          @click="pushRoute(item.path)"
        >
          {{item.title}}
        </v-btn>
      </div>
      <v-spacer v-if="!collapse"></v-spacer>
      <v-avatar
        class="hover-pointer"
        width="32px"
        height="32px"
        @click="pushRoute('/profile')"
      >
        <img src="@/assets/caitou.png">
      </v-avatar>
      <v-menu
        v-if="$vuetify.breakpoint.width < 960 || collapse"
        class="v-menu__content"
        rounded="lg"
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="bar-button"
            icon
            v-bind="attrs"
            v-on="on"
          >
            <menu-svg class="svg"></menu-svg>
          </v-btn>
        </template>
        <v-list
          class="pink-shadow"
          dense
          nav
        >
          <v-list-item
            :class="{isChosen: $route.name === item.name}"
            v-for="item in pages"
            :key="item.name"
            @click="pushRoute(item.path)"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-container>
  </v-app-bar>
</template>

<script>
import MenuSvg from '@/assets/menu.svg'

export default {
  name: 'NavBar',
  components: {
    MenuSvg,
  },
  data() {
    return {
      pages: this.$router.options.routes.filter(item => item.title),
      collapse: this.$route.name === 'create',
    }
  },
  watch: {
    $route(cur) {
      this.collapse = cur.name === 'create';
    }
  },
  methods: {
    pushRoute(path) {
      if (this.$route.path !== path) {
        this.$router.push(path)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/colors';

.isChosen {
  color: $pink !important;
}
.v-menu__content {
  box-shadow: 0 5px 5px -3px rgba(255,71,133,.2),
              0 8px 10px 1px rgba(255,71,133,.14),
              0 3px 14px 2px rgba(255,71,133,.12) !important;
}
.hover-pointer:hover {
  cursor: pointer;
}
.bar-button {
  width: 32px !important;
  height: 32px !important;
  color: rgba(255,71,133,1) !important;
  border-radius: 50% !important;
}
.collapse-nav {
  padding: 0 !important;
}
</style>