<template>
	<div id="main-content">
		<Breadcrumb :menuId="getMenuId"/>
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
			let self = this;

			// axios.get(self.$store.state.baseUrl + '')
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