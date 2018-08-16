<template>
<div>
  <kanban-board></kanban-board>
</div>
</template>

<script>
import SubBoard from "./Board.vue";
export default {
  components: {
    "kanban-board": SubBoard
  },
  data() {
    return {
    };
  },
  methods: {
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
