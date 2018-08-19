<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <router-view/> -->
    <Header 
      :isLogin="isLogin"
      :baseUrl="baseUrl"
      @toggleLoginState="toggleLoginState"
    />
    <div v-if="isLogin === 'true'" class="clearfix" id="main">
      <Sidebar :menuData="menuData"/>
      <div id="main-content">
        
      </div>
    </div>
    <Login 
      v-else
      :baseUrl="baseUrl"
      @toggleLoginState="toggleLoginState"
    />
  </div>
</template>

<script>

import Header from './components/header.vue'
import Login from './components/login.vue'
import Sidebar from './components/sidebar.vue'

import axios from '../bower_components/axios/dist/axios.min.js'

// const baseUrl = 'http://192.168.0.155:9090/';
  const baseUrl = 'http://10.60.5.74:9090/';

export default {
  name: 'App',
  components: {
    Header,
    Login,
    Sidebar,
  },
  data () {
    return {
      baseUrl: baseUrl,
      isLogin: this.getLoginState(),
      menuData: [],
    }
  },
  created () {
    let self = this;
    axios.get(baseUrl + 'admin/getMenu')
      .then(function (res) {
        if (res.data.status === 1) {
          console.log(self.menuData)
          self.menuData = res.data.body;
        }
        else {
          alert(res.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  },
  methods: {
    toggleLoginState() {
      this.isLogin = this.getLoginState();
    },
    getLoginState() {
      return sessionStorage.getItem('isLogin');
    },
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
