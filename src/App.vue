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
      menuData: [{"fid":"10","typeName":"新闻管理","currentLevel":1,"orderNum":1,"isMenu":1,"isType":0,"list":[{"fid":"1010","typeName":"新闻资讯","currentLevel":2,"orderNum":1,"isMenu":1,"isType":0,"list":[]},{"fid":"1050","typeName":"本地资讯","currentLevel":2,"orderNum":2,"isMenu":1,"isType":0,"list":[]}]},{"fid":"20","typeName":"通知政策管理","currentLevel":1,"orderNum":2,"isMenu":1,"isType":0,"list":[{"fid":"201","typeName":"通知公告","currentLevel":2,"orderNum":1,"isMenu":1,"isType":1,"list":[]},{"fid":"202","typeName":"政策法规","currentLevel":2,"orderNum":2,"isMenu":1,"isType":1,"list":[]}]},{"fid":"30","typeName":"先进典型","currentLevel":1,"orderNum":3,"isMenu":1,"isType":1,"list":[]}],
    }
  },
  methods: {
    toggleLoginState() {
      this.isLogin = this.getLoginState();
    },
    getLoginState() {
      return sessionStorage.getItem('isLogin');
    },
    getMenuData() {
      axios.get(baseUrl + 'admin/getMenu')
        .then(function (res) {
          if (res.data.status === 1) {
            return res.data.body;
          }
          else {
            alert(res.data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        })
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
