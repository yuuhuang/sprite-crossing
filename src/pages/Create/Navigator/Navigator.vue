<template>
  <v-menu
    class="v-menu__content"
    :close-on-click="false"
    :close-on-content-click="false"
    transition="slide-x-reverse-transition"
    offset-x
    right
    v-model="showNavigator"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-show="!showNavigator"
        class="tool-box-drawer rounded-tr-0 rounded-br-0 rounded-tl-lg rounded-bl-lg"
        v-bind="attrs"
        v-on="on"
      >
        <div class="vertical">
          <chevron-down></chevron-down>
          Nav
        </div>
      </v-btn>
    </template>
    <v-card
      width="210px"
      height="180px"
    >
      <!-- subheader -->
      <v-subheader>
        <v-row
          justify="space-between"
          align="center"
        >
          <v-card-subtitle>
            Navigator
          </v-card-subtitle>
          <v-btn
            depressed
            color="white"
            width="16px"
            min-width="16px"
            @click="showNavigator=!showNavigator">
            <chevron-right></chevron-right>
          </v-btn>
        </v-row>
      </v-subheader>
    </v-card>
  </v-menu>
</template>


<script>
require('@/assets/chevron')

export default {
  name: 'Navigator',
  data() {
    return {
      showNavigator: true,
    }
  }
}
</script>

<style lang="scss" scoped>
.tool-box-drawer {
  position: absolute;
  right: 0;
  top: 10px;
  min-width: 30px !important;
  width: 30px;
  height: 75px !important;
  padding: 0 !important;
  z-index: 199;
}
.vertical {
  transform: rotateZ(90deg);
  width: 75px;
  height: 30px;
  line-height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.v-menu__content {
  top: 10px !important;
  left: calc(100vw - 220px) !important;
}
</style>