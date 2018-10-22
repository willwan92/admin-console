<template>
	<!-- 组件模板内容必须要包含在一个根元素里 -->
	<div class="real-content">
		<div id="table-toolbar">	
			<Button @click.native="newListItem">新建</Button>
		</div>

		<Tabs v-if="tabList" 
			:tabList="tabList"
			@changeTab="changeTab">
		</Tabs>
		<CustomTable :thead="thead" :newsListObj="newsListObj"></CustomTable>
	</div>
</template>

<script>
	import axios from 'axios'

	import Button from './button.vue'
	import Tabs from './tabs.vue'
	import CustomTable from './custom-table.vue'
	import ContentEditor from './content-editor.vue'

	export default {
		name: 'content-list',
		components: {
			Button,
			Tabs,
			CustomTable,
			ContentEditor,
		},
		data () {
			return {
				tabList: null,
				thead: {
					newsTitle: '标题', 
					date: '发布/编辑时间',
					status: '操作'
				},
				newsListObj: {},
			}
		},
		computed: {
			getMenuId () {
				return this.$route.params.menuId;
			}
		},
		created () {
			this.getTypeByPid();
			this.getNewsListObj();
		},
		methods: {
			changeTab(index) {
				this.getNewsListObj(index);
			},
			getTypeByPid () {
				let self = this;
				let _state = self.$store.state;

				axios
				.get(_state.baseUrl + '/admin/getTypeByPid?pid=' + _state.menuId)
				.then((res) => {
					self.tabList = res.data.body.typeDTOList;
				})
			},
			getNewsListObj(index) {
				let self = this,
					_state = this.$store.state,
					baseUrl = _state.baseUrl,
					params = {
						menuId: _state.menuId,
					};

				if (index) {
					params.fid = this.tabList[index].fid;
				}

				axios.get(baseUrl + '/admin/getNewsList', {
					params: params
				})
				.then(function(res) {
					let data = res.data;
					if (data.status !== 1) {
						alert(data.message)
					}
					else {
						self.newsListObj = data.body.newsDTOList[0];
					}
				})
				.catch(function (err) {
					console.log(err);
				})
			},
			newListItem () {
				let menuId = this.$store.state.menuId;
				this.$store.commit({
					type: 'addBreadcrumb',
					breadcrumb: '新建'
				})
				this.$router.push({path: '/admin/' + menuId + '/edit', component: ContentEditor});
			}
		},
		// beforeRouteEnter(to, from, next) {
		// 	console.log(to)
		// },
		// beforeRouteLeave(to, from, next) {
		// 	console.log(to)
		// },
		// beforeRouteUpdate(to, from, next) {
		// 	console.log(to)
		// 	// let menuId = to.params.menuId;
		// 	// let isFromEdit = from;
		// 	// // 打开的一级菜单索引
		// 	// let openIndex = parseInt(menuId.charAt(0)) - 1;
		// 	// let $store = this.$store;

		// 	// // to：到达的路由
		// 	// // from：来自的路由
		// 	// $store.commit({
		// 	// 	type: 'changeMenuId',
		// 	// 	menuId: menuId,
		// 	// })

		// 	// $store.commit({
		// 	// 	type: 'changeOpenIndex',
		// 	// 	openIndex: openIndex,
		// 	// })

		// 	// $store.commit({
		// 	//   type: 'changeBreadcrumb',
		// 	//   breadcrumb: menuId,
		// 	// })

		// 	// if (openIndex === 0) {
		// 	// 	this.getTypeByPid();
		// 	// } else {
		// 	// 	this.tabList = null;
		// 	// }
		// 	// this.getNewsListObj();
		// },
		// watch: {
		// 	'$route' (to, from) {
		// 		// console.log(to)
		// 	}
		// }
	}
</script>

<style lang="less" scoped>
	#table-toolbar {
		margin-bottom:15px;
	}

	#news-list {
	  margin-bottom: 20px;
	}
</style>