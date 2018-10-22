// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ContentList from './components/content-list.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import './assets/styles/reset.css'
import './assets/styles/bootstrap.min.css'
import './assets/styles/global.css'

Vue.config.productionTip = false

/* eslint-disable no-new */

Vue.use(VueRouter)
Vue.use(Vuex)

var menuData = {
					"1010" : "新闻资讯",
					"1050" : "本地资讯",
					"201"  : "通知公告",
					"202"  : "政策法规",
					"30"   : "先进典型"
				};

var store = new Vuex.Store({
	state: {
		// baseUrl: 'http://10.60.5.74:9090',
		baseUrl: 'http://192.168.0.155:9090',
		// 打开的一级菜单索引
		openIndex: 0,
		menuId: '1010',
		breadcrumb: [menuData['1010']]
	},
	mutations: {
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

const router = new VueRouter({
	routes: [
		{
			path: '/admin/:menuId',
			component: ContentList,
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
	},
  	template: '<App/>'
})

router.push('/admin/1010')

