<template>
<div id="mainApp">
  <center> {{ $store.state.user }} </center>
  <router-view></router-view>
</div>
</template>

<script>
import Vue from 'vue'
import SubBoard from "./Board.vue";
import { mapActions } from 'vuex'
export default {
  components: {
    "kanban-board": SubBoard
  },
  data() {
    return {
    };
  },
  created: function() {
    this.loadLocalToken()
  },
  methods: {
    ...mapActions([
      'loadLocalToken'
    ])
  }
};
</script>

<style lang="scss">
@font-face {
  font-family: 'C64';
  src: url('./assets/C64_Pro-STYLE.woff') format('woff');
};
body {
  font-family: 'C64';
}

</style>
