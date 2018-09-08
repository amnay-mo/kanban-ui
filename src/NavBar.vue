<template>
		<nav class="navbar" id="main-navbar">
			<div class="navbar-item navbar-end has-dropdown is-hoverable">
				<a class="navbar-link navbar-thing">{{ user }}</a>
				<div class="navbar-dropdown is-right is-boxed">
					<a class="navbar-item">
						<span class="icon"><i class="fa fa-gear"></i></span>
						<span class="navbar-thing">Settings</span>
					</a>
					<a class="navbar-item" @click="logout">
						<span class="icon"><i class="fa fa-sign-out"></i></span>
						<span class="navbar-thing navbar-thing-red">Log out</span>
					</a>
					<div class="navbar-divider"></div>
					<div class="navbar-item">
						<span class="icon"><i class="fa fa-refresh"></i></span>
						<span class="navbar-thing">Last updated at 14:32:08 on 25 Sep 17</span>
					</div>
				</div>
			</div>
		</nav>
</template>

<script>
import TaskCard from "./TaskCard.vue";

import { mapState, mapActions } from 'vuex'

export default {
  components: {
    "task-card": TaskCard
  },
  data() {
    return {
      newTaskText: ""
    };
  },
  computed: {
    ...mapState([
        "user"
      ]),
  },
  created: function() {
    // this.refreshTasks()
  },
  methods: {
    ...mapActions([
      "endSession"
    ]),
    logout() {
        this.endSession()
        this.$router.push("/login")
    }
  }
};

</script>

<style lang="scss" scoped>

.navbar-thing {
  font-family: "C64";
  font-size: 12px;
  width: 100%;
  border-color: chocolate;
}

.navbar-thing-red {
    color: red;
}

</style>
