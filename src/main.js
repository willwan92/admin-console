// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Content from './components/Content.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import './assets/styles/reset.css'
import './assets/styles/bootstrap.min.css'
import './assets/styles/global.css'

Vue.config.productionTip = false

/* eslint-disable no-new */

Vue.use(VueRouter)
Vue.use(Vuex)

var store = new Vuex.Store({
	state: {
		baseUrl: 'http://10.60.5.74:9090',
		// baseUrl: 'http://192.168.0.155:9090',
		openIndex: 0,
		menuId: '1010'
	},
	mutations: {
		changeMenuId (state, playload) {
			state.menuId = playload.menuId;
		},
		changeOpenIndex (state, playload) {
			state.openIndex = playload.openIndex;
		}
	}
})

const router = new VueRouter({
	routes: [
		{
			path: '/admin/:menuId',
			component: Content,
		},
	]
})

new Vue({
  	el: '#app',
  	store,
  	router,
  	components: { 
  		App,
  		Content,
	},
  	template: '<App/>'
})

router.push('/admin/1010')

