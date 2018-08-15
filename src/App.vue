<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <router-view/> -->
    <Header/>
    <div v-if="isLogin === true" class="clearfix" id="main">
      <div class="pull-left" id="sidebar">
        已登录
      </div>
      <div id="main-content">
        已登录
      </div>
    </div>
    <Login 
      v-else
      @toggleLoginState="toggleLoginState"
    />
  </div>
</template>

<script>

import Header from './components/header.vue'
import Login from './components/login.vue'

export default {
  name: 'App',
  components: {
    Header,
    Login,
  },
  data () {
    return {
      isLogin: false
    }
  },
  methods: {
    toggleLoginState() {
      this.isLogin = this.getLoginState();
    },
    getLoginState() {
      return sessionStorage.getItem('isLogin');
    }
  }
}
</script>

<style scoped lang="less">
#main {
  position: relative;
  margin-top: 80px;
  width: 100%;
  height: 100%;
}
</style>
