<template>
	<div id="main-content">
		<Breadcrumb/>
		<Button>新建</Button>
	</div>
</template>

<script>
	import axios from '../../bower_components/axios/dist/axios.min.js'

	import Breadcrumb from './breadcrumb.vue'
	import Button from './button.vue'

	export default {
		name: 'Content',
		components: {
			Breadcrumb,
			Button,
		},
		data () {
			return {
				
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
						console.log(res)
					})
			}
		},
		watch: {
			'$route' (to, from) {
				let menuId = to.params.menuId;
				let openIndex = parseInt(menuId.charAt(0)) - 1;
				let $store = this.$store;

				if (openIndex === 0) this.getTypeByPid()

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
</style>