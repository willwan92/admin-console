// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import { 
	Radio, RadioGroup, RadioButton, Pagination, Form, FormItem,
	Input, Button, Message, MessageBox, Dialog, Upload, Loading
} from 'element-ui'
import App from './App'
import ContentList from './components/content-list.vue'
import NewsEditor from './components/news-editor.vue'
import NoticeEditor from './components/notice-editor.vue'
import ModelEditor from './components/model-editor.vue'

import './assets/styles/reset.css'
import './assets/styles/bootstrap.min.css'
import './assets/styles/global.css'

import axios from 'axios'

Vue.config.productionTip = false

/* eslint-disable no-new */

//全局方法 Vue.use() 用来注册插件。 它会自动阻止多次注册相同插件。
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Pagination)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Upload)

Vue.prototype.$axios = axios;
// message, msgbox等组件是在Vue原型上添加方法，不能用Vue.use()注册插件。
Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$loading = Loading.service;

var menuData = {
					"1010" : "新闻资讯",
					"1050" : "本地资讯",
					"201"  : "通知公告",
					"202"  : "政策法规",
					"30"   : "先进典型"
				};

// 打包生产环境代码时，如果需要配置静态资源的公共路径，
// 可从config目录的index.js的build下的assetsPublicPath属性配置，默认是根目录'/'

var store = new Vuex.Store({
	state: {
		// 加/api是为了区分后台数据接口路径和其他路径（例如：/admin），
		// 便于在nginx.conf配置反向代理，解决生产环境的跨域问题
		baseUrl: '/api',
		path: '/menu/1010',
		// 打开的一级菜单索引
		openIndex: 0,
		menuId: '1010',
		fid: '',
		breadcrumb: [menuData['1010']]
	},
	mutations: {
		changePath(state, playload) {
			state.path = playload.path;
		},
		changeFid(state, playload) {
			state.fid = playload.fid;
		},
		changeMenuId (state, playload) {
			state.menuId = playload.menuId;
		},
		changeOpenIndex (state, playload) {
			state.openIndex = playload.openIndex;
		},
		changeBreadcrumb(state, playload) {
			// 注意：在修改数组时，如果使用某些方法，vue可能检测不到数据的更新。
			state.breadcrumb.splice(0, 1, menuData[playload.breadcrumb]);
		},
		addBreadcrumb(state, playload) {
			state.breadcrumb.push(playload.breadcrumb);
		},
		removeBreadcrumb(state, playload) {
			state.breadcrumb.pop();
		}
	}
})

// 注意：不同路由路径不能重复，例如:/login和/:menuId就是重复的
const router = new VueRouter({
	routes: [
		{
			path: '/menu/:menuId',
			component: ContentList,
		},
		{
			path: '/menu/1010/edit/:id?',
			component: NewsEditor,
		},
		{
			path: '/menu/1050/edit/:id?',
			component: NewsEditor,
		},
		{
			path: '/menu/201/edit/:id?',
			component: NoticeEditor,
		},
		{
			path: '/menu/202/edit/:id?',
			component: NoticeEditor,
		},
		{
			path: '/menu/30/edit/:id?',
			component: ModelEditor,
		}
	]
})

new Vue({
  	el: '#app',
  	store,
  	router,
  	components: { 
  		App,
  		ContentList,
  		NewsEditor,
  		NoticeEditor,
  		ModelEditor
	},
  	template: '<App/>',
})

