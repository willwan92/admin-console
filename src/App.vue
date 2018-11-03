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
    <Footer></Footer>
  </div>
</template>

<script>

import Header from './components/header.vue'
import Footer from './components/footer.vue'
import Login from './components/login.vue'
import Sidebar from './components/sidebar.vue'
import ContentList from './components/content-list.vue'
import Breadcrumb from './components/breadcrumb'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Login,
    Sidebar,
    ContentList,
    Breadcrumb,
  },
  data () {
    return {
      isLogin: this.getLoginState(),
      menuData: [],
    }
  },
  beforeMount() {
    if (this.isLogin) {
      this.getMenuData()
      .then(() => {
        this.$router.push(this.$store.state.path);  
      })
    } else {
      
    }
  },
  created () {
    // 登录转态下，刷新页面是保存state数据到sessionStorage，
    // 退出登录时删除相关sessionStorage中的数据
    window.addEventListener('beforeunload', this.saveState)

    if (!this.isLogin) {
      this.$router.push('/login');
    } else {
      let state = sessionStorage.getItem('state');
      // 刷新时
      if (state) {
        // Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。
        this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(state)));
      } else {
        // this.getMenuData()
        // .then(() => {
        //   this.$router.push(this.$store.state.path);  
        // })
      }
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
      let self = this;
      
      let p = self.$axios
      .get(this.$store.state.baseUrl + '/admin/getMenu')
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

      return p;
    },
    saveState() {
      // 在登录后才保存状态数据
      if (this.isLogin) {
        let fullPath = this.$router.history.current.fullPath;

        this.$store.commit({
          type: 'changePath',
          path: fullPath
        })

        sessionStorage.setItem('state', JSON.stringify(this.$store.state));
      }
    }
  },
  computed: {
    breadcrumbs() {
      return this.$store.state.breadcrumb;
    }
  },
  watch: {
    'isLogin' () {
      if (!this.isLogin) {
        // 注意：在退出登录时
        
        // 1. 要把sessionStorage和state数据清除，
        // 否则在未关闭页面的情况下，
        // 下次登录时显示的刷新页面时保存的转态
        sessionStorage.removeItem('state');

        // 2. $store里的state数据要重置
        // 否则在未刷新页面的情况下，
        // 下次登录时显示的退出前保存的转态
        this.$store.replaceState({
          baseUrl: 'http://10.60.5.74:9090',
          // baseUrl: 'http://192.168.0.155:9090',
          path: '/menu/1010',
          // 打开的一级菜单索引
          openIndex: 0,
          menuId: '1010',
          fid: '',
          breadcrumb: ['新闻资讯']
        });

        this.$router.push('/login')
      } else {
        this.getMenuData()
        .then(() => {
          this.$router.push(this.$store.state.path);  
        })
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