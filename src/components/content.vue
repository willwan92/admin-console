<template>
	<div id="main-content">
		<div class="location">当前位置：
			<Breadcrumb/>
		</div>
		
		<div id="table-toolbar">
			<Button>新建</Button>
		</div>

		<Tabs id="news-list" v-if="tabList" :tabList="tabList"></Tabs>
	</div>
</template>

<script>
	import axios from '../../bower_components/axios/dist/axios.min.js'

	import Breadcrumb from './breadcrumb.vue'
	import Button from './button.vue'
	import Tabs from './tabs.vue'

	export default {
		name: 'Content',
		components: {
			Breadcrumb,
			Button,
			Tabs,
		},
		data () {
			return {
				tabList: null,
			}
		},
		computed: {
			getMenuId () {
				return this.$route.params.menuId;
			}
		},
		created () {

		},
		methods: {
			getTypeByPid () {
				let self = this;
				let _state = self.$store.state;

				axios.get(_state.baseUrl + '/admin/getTypeByPid?pid=' + _state.menuId)
					.then((res) => {
						self.tabList = res.data.body.typeDTOList;
					})
			}
		},
		watch: {
			'$route' (to, from) {
				let menuId = to.params.menuId;
				let openIndex = parseInt(menuId.charAt(0)) - 1;
				let $store = this.$store;

				if (openIndex === 0) {
					this.getTypeByPid()
				} else {
					this.tabList = null;
				}

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
			}
		}
	}
</script>

<style lang="less" scoped>
	@import '../assets/styles/global.less';

	#main-content {
		margin-left: @leftWidth;
		padding: 10px 20px;
	}

	.location {
	    margin-bottom: 20px;
	    color: @muted-color;
	}

	#news-list {
	  height: 700px;
	  margin-bottom: 20px;
	}
</style>