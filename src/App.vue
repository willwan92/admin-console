<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <router-view/> -->
    <Header/>
    <Login/>
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
  }
}
</script>

<style>
</style>
