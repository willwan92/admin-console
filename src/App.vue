<template>
  <div id="app">
    <Header 
      :isLogin="isLogin"
      @toggleLoginState="toggleLoginState"
    />
    <div v-if="isLogin === 'true'" class="clearfix" id="main">
      <!-- 向子组件传递响应式属性menuData，须在初始化实例前声明根级响应式属性menuData -->
      <Sidebar :menuData="menuData"/>
      <div id="main-content">
        <div class="location">当前位置：
          <Breadcrumb :breadcrumbs="breadcrumbs"/>
        </div>
        <router-view></router-view>
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
import Sidebar from './components/sidebar.vue'
import ContentList from './components/content-list.vue'
import Breadcrumb from './components/breadcrumb'

import axios from 'axios'

export default {
  name: 'App',
  components: {
    Header,
    Login,
    Sidebar,
    ContentList,
    Breadcrumb,
  },
  data () {
    return {
      isLogin: this.getLoginState(),
      menuData: [],
      breadcrumbs: this.getBreadcrumb()
    }
  },
  beforeMount() {
    if (this.isLogin) {
      this.$router.push('/admin/1010')
    } else {
      this.$router.push('/login')
    }
  },
  created () {
    let self = this;
    axios.get(this.$store.state.baseUrl + '/admin/getMenu')
      .then(function (res) {
        if (res.data.status === 1) {
          self.menuData = res.data.body;    
        }
        else {
          self.$message.error(res.data.message);
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
    getBreadcrumb() {
      return this.$store.state.breadcrumb;
    }
  },
  watch: {
    'isLogin' () {
      if (!this.isLogin) {
        this.$router.push('/login')
      } else {
        this.$router.push('/admin/1010')
      }
    }
  }
}
</script>

<style scoped lang="less">
@import './assets/styles/global.less';

#main {
  position: relative;
  margin-top: 80px;
  width: 100%;
  height: 100%;

  #main-content {
    margin-left: @leftWidth;
    padding: 10px 20px;
  }
  
  .location {
      margin-bottom: 20px;
      color: @muted-color;
  }

}


</style>
