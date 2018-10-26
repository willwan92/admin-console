<template>
	<!-- 组件模板内容必须要包含在一个根元素里 -->
	<div class="real-content">
		<div id="table-toolbar">	
			<Button @click.native="newListItem">新建</Button>
		</div>

		<Tabs v-if="tabList" 
			:tabList="tabList"
			:tabIndex="tabIndex"
			@changeTab="changeTab">
		</Tabs>
		<!-- 为了避免渲染子组件时newsListObj.newDTOList还未被异步请求结果赋值
			导致子组件验证属性时报错，用v-if判断存在newsListObj.newDTOList时再渲染子组件 -->
		<CustomTable 
			v-if="newsListObj.newDTOList"
			:thead="thead"
			:newDTOList="newsListObj.newDTOList">		
		</CustomTable>
		<el-pagination
			@current-change="handleCurrentChange"
			class="text-center"
			background
			layout="prev, pager, next"
			:current-page="currentPage"
			:page-count="newsListObj.pageSumCount">
		</el-pagination>
	</div>
</template>

<script>
	import axios from 'axios'

	import Button from './button.vue'
	import Tabs from './tabs.vue'
	import CustomTable from './custom-table.vue'

	export default {
		name: 'content-list',
		components: {
			Button,
			Tabs,
			CustomTable,
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
				tabIndex: 0,
				currentPage: 1
			}
		},
		computed: {
			getMenuId () {
				return this.$route.params.menuId;
			}
		},
		methods: {
			changeTab(tabIndex) {
				this.tabIndex = tabIndex;
				this.currentPage = 1;
				this.getNewsListObj(this.tabIndex, this.currentPage);
			},
			changeMenu(to) {
				let menuId = to.params.menuId;
				let tabIndex = parseInt(to.query.tabIndex);
				// 打开的一级菜单索引
				let openIndex = parseInt(menuId.charAt(0)) - 1;
				let $store = this.$store;

				this.tabIndex = tabIndex ? tabIndex : 0;

				// 重置tab和页码
				this.currentPage = 1;

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

				var thead = this.thead;
				if (openIndex === 2) {
					thead.newsTitle = "先进人物";
				} else {
					if (thead.newsTitle !== "标题") {
						thead.newsTitle = "标题";
					}
				}

				if (openIndex === 0) {
					this.getTypeByPid()
						.then(() => {
							this.getNewsListObj(this.tabIndex, this.currentPage);
						});
				} else {
					this.tabList = null;
					this.getNewsListObj(this.tabIndex, this.currentPage);
				}				
			},
			getTypeByPid () {
				let self = this;
				let _state = self.$store.state;

				let p = axios
					.get(_state.baseUrl + '/admin/getTypeByPid?pid=' + _state.menuId)
					.then((res) => {
						self.tabList = res.data.body.typeDTOList;
					})
					.catch(function (err) {
						console.log(err);
					});

				// 返回promise实例供依赖此异步操作结果的程序使用
				return p;
			},
			handleCurrentChange(currentPage) {
				this.currentPage = currentPage;
				this.getNewsListObj(this.tabIndex, this.currentPage);
			},
			/**
			 * [getNewsListObj 获取列表页数据]
			 * @param  {[type]} tabIndex   	[当前tab的索引值]
			 * @param  {[type]} currentPage [当前的页码]
			 * @return {[type]}             [description]
			 */
			getNewsListObj(tabIndex, currentPage) {
				let listIndex,
					self = this,
					_state = self.$store.state,
					baseUrl = _state.baseUrl,
					pathUrl = "/admin/getNewsList",
					menuId = _state.menuId,
					openIndex = parseInt(menuId.charAt(0)) - 1,
					pageNo = this.currentPage,
					params = {};

				params.pageNo = pageNo;

				if (openIndex === 2) {
					pathUrl = "/admin/getTypicalList";
				} else if (openIndex === 0) {
					listIndex = tabIndex ? tabIndex : 0;
					params.menuId = _state.menuId;
					params.fid = this.tabList[listIndex].fid;
				} else if (openIndex === 1) {
					listIndex = 0;
					params.menuId = _state.menuId
				}
				

				axios.get(baseUrl + pathUrl, {
					params: params
				})
				.then(function(res) {
					let data = res.data;
					if (data.status !== 1) {
						self.$message.error(data.message);
					}
					else {
						if (openIndex === 2) {
							self.newsListObj = self.dataAdapter(data.body);
						} else {
							self.newsListObj = data.body.newsDTOList[listIndex];
						}
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
				this.$router.push({path: '/admin/' + menuId + '/edit'});
			},
			dataAdapter(data) {
				data.typicalDTOList.forEach((item) => {
					item.newsTitle = item.typical;
					delete item.typical;
				});
				data.newDTOList = data.typicalDTOList;
				delete data.typicalDTOList;

				return data;
			}
		},
		beforeRouteEnter(to, from, next) {

			// beforeRouteEnter 守卫不能访问 this，因为当守卫执行前，组件实例还没被创建
			// 可以通过传一个回调函数给next，并且把组件实例作为回调方法的参数，在导航被确认的时候执行回调。
			// 注意：next的回调函数只接受vm实例作为参数，不能随意加参数。另外，在回调函数内部可以访问路由to和from 
			next(vm => {
				let fromEdit = from.path.search('edit');
				if (fromEdit !== -1) {
					vm.$store.commit({
						type: 'removeBreadcrumb'
					});
				}

				vm.changeMenu(to);
			});
		},
		beforeRouteLeave(to, from, next) {
			this.tabList = null;
			this.newsListObj = null;
			// next函数必须调用
			next();
		},
		beforeRouteUpdate(to, from, next) {
			// to：到达的路由
			if (to.params.menuId) {
				this.changeMenu(to);
			}

			// next函数必须调用
			next();
		}
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