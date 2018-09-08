<template>
<div class="container" id="mainApp">
  <app-navbar v-if="isAuthenticated"></app-navbar>
  <router-view></router-view>
</div>
</template>

<script>
import Vue from 'vue'
import NavBar from "./NavBar.vue";
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    "app-navbar": NavBar
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
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
