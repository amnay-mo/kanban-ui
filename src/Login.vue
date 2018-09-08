<template>
<section class="section has-text-centered" id="login">
    <h1 class="title is-1">Login</h1>
    <br/>
    <br/>
    <input class="input is-large" type="text" v-model="email" @keyup.enter="login"/>
    <br>
    <br>
    <input class="input is-large" type="password" v-model="password" @keyup.enter="login"/>
</section>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  created: function() {
//    this.refreshTasks();
  },
  methods: {
    ...mapActions([
      'authenticate'
    ]),
    login() {
      this.authenticate({ email: this.email, password: this.password})
    }
  }
};
</script>

<style lang="scss" scoped>
.input {
  font-family: "C64";
  text-align: center;
  width: 100%;
  border-color: chocolate;  
}

#login {
  background-color: #5eb5a6;
  height: 100vh;
}

</style>
