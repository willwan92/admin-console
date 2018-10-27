// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import { 
	Radio, RadioGroup, RadioButton, Pagination, Row, Col, Form, FormItem,
	Input, Button, Message, MessageBox, Dialog, Upload
} from 'element-ui'
import App from './App'
import ContentList from './components/content-list.vue'
import NewsEditor from './components/news-editor.vue'
import NoticeEditor from './components/notice-editor.vue'
import ModelEditor from './components/model-editor.vue'

import './assets/styles/reset.css'
import './assets/styles/bootstrap.min.css'
import './assets/styles/global.css'

Vue.config.productionTip = false

/* eslint-disable no-new */

//全局方法 Vue.use() 用来注册插件。 它会自动阻止多次注册相同插件。
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Pagination)
Vue.use(Row)
Vue.use(Col)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Upload)

// message, msgbox等组件是在Vue原型上添加方法，不必用Vue.use()注册插件。
Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;

var menuData = {
					"1010" : "新闻资讯",
					"1050" : "本地资讯",
					"201"  : "通知公告",
					"202"  : "政策法规",
					"30"   : "先进典型"
				};

var store = new Vuex.Store({
	state: {
		baseUrl: 'http://10.60.5.74:9090',
		// baseUrl: 'http://192.168.0.155:9090',
		// 打开的一级菜单索引
		openIndex: 0,
		menuId: '1010',
		fid: '',
		breadcrumb: [menuData['1010']]
	},
	mutations: {
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

const router = new VueRouter({
	routes: [
		{
			path: '/admin/:menuId',
			component: ContentList,
		},
		{
			path: '/admin/1010/edit/:id?',
			component: NewsEditor,
		},
		{
			path: '/admin/1050/edit/:id?',
			component: NewsEditor,
		},
		{
			path: '/admin/201/edit/:id?',
			component: NoticeEditor,
		},
		{
			path: '/admin/202/edit/:id?',
			component: NoticeEditor,
		},
		{
			path: '/admin/30/edit/:id?',
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
  	beforeCreate() {
  		this.$router.push('/');
  	}
})

