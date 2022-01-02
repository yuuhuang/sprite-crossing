<template>
  <v-app-bar
    app
    flat
    color="white"
  >
    <v-container class="py-0 fill-height">
      <v-img
        class="mr-6"
        :src="$vuetify.breakpoint.width >= 360 ?
         require('@/assets/logo.png') : require('@/assets/logo-thumbnail.png')"
        :max-width="$vuetify.breakpoint.width >= 360 ? '180px' : '32px'"
      >
      </v-img>
      <div v-if="$vuetify.breakpoint.width >= 960">
        <v-btn
          :class="{isChosen: $route.name === item.name}"
          depressed
          color="white"
          v-for="item in pages"
          :key="item.name"
          @click="$router.push(item.path)"
        >
          {{item.title}}
        </v-btn>
      </div>
      <v-spacer></v-spacer>
      <v-avatar
        width="32px"
        height="32px"
      >
        <img src="@/assets/caitou.png">
      </v-avatar>
      <v-menu
        v-if="$vuetify.breakpoint.width < 960"
        class="v-menu__content"
        bottom
        left
        rounded="lg"
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            dark
            icon
            v-bind="attrs"
            v-on="on"
          >
            <menu-svg></menu-svg>
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
            @click="$router.push(item.path)"
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
      expanded: false,
    }
  },
}
</script>

<style lang="scss" scoped>
.isChosen {
  color: $pink !important;
}
.v-menu__content {
  box-shadow: 0 5px 5px -3px rgba(255,71,133,.2),
              0 8px 10px 1px rgba(255,71,133,.14),
              0 3px 14px 2px rgba(255,71,133,.12) !important;
}
</style>