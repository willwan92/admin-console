<template>
	<!-- 组件模板内容必须要包含在一个根元素里 -->
	<div class="real-content">
		<div id="table-toolbar">	
			<Button @click.native="newListItem">新建</Button>
		</div>

		<Tabs id="news-list" v-if="tabList" :tabList="tabList"></Tabs>
		<CustomTable v-else  :thead="thead" :newsListObj="newsListObj"></CustomTable>
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
				tabList: [],
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
			this.getTypeByPid()
		},
		methods: {
			getTypeByPid () {
				let self = this;
				let _state = self.$store.state;

				axios
				.get(_state.baseUrl + '/admin/getTypeByPid?pid=' + _state.menuId)
				.then((res) => {
					self.tabList = res.data.body.typeDTOList;
				})
			},
			getNewsListObj() {
				let self = this,
					_state = this.$store.state,
					baseUrl = _state.baseUrl,
					menuId = _state.menuId;

				axios.get(baseUrl + '/admin/getNewsList', {
					params: {
						menuId: menuId,
					}
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
		watch: {
			'$route' (to, from) {
				let menuId = to.params.menuId;
				let isFromEdit = from;
				console.log(to);
				// 打开的一级菜单索引
				let openIndex = parseInt(menuId.charAt(0)) - 1;
				let $store = this.$store;

				// to：到达的路由
				// from：来自的路由
				$store.commit({
					type: 'changeMenuId',
					menuId: menuId,
				})

				$store.commit({
					type: 'changeOpenIndex',
					openIndex: openIndex,
				})

				$store.commit({
				  type: 'changeBreadcrumb',
				  breadcrumb: menuId,
				})

				if (openIndex === 0) {
					this.getTypeByPid()
				} else {
					this.tabList = null;
					this.getNewsListObj();
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	#table-toolbar {
		margin-bottom:15px;
	}

	#news-list {
	  height: 700px;
	  margin-bottom: 20px;
	}
</style>