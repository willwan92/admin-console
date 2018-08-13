<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <router-view/> -->
    <Header/>
    <Login v-if="isLogin === false"></Login>
    <div v-else class="clearfix" id="main">
      <div class="pull-left" id="sidebar">
        
      </div>

      <div id="main-content">
        
      </div>
    </div>
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
  }
}
</script>

<style>
</style>
