<template>
  <div id="app">
    <Header 
      :isLogin="isLogin"
      @toggleLoginState="toggleLoginState"
    />
    <div v-if="isLogin === 'true'" class="clearfix" id="main">
      <Sidebar :menuData="menuData"/>
      <router-view></router-view>
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
import Sidebar from './components/sidebar.vue'
import Content from './components/Content.vue'
import Breadcrumb from './components/breadcrumb'

import axios from '../bower_components/axios/dist/axios.min.js'

export default {
  name: 'App',
  components: {
    Header,
    Login,
    Sidebar,
    Content,
    Breadcrumb,
  },
  data () {
    return {
      isLogin: this.getLoginState(),
      menuData: [],
    }
  },
  created () {
    let self = this;
    axios.get(this.$store.state.baseUrl + '/admin/getMenu')
      .then(function (res) {
        if (res.data.status === 1) {
          self.menuData = res.data.body;
          console.log(self.menuData)
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
