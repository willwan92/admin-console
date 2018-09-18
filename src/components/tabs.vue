<template>
	<div class="tabs">
		<div class="tab-list">
			<Item 
				v-for="(item, index) in tabList"
				:class="index === activeIndex ? 'active' : ''"
				:data-index="index"
				@click="toggleActive"
			>{{ item.typeName }}</Item>
		</div>
		<div class="tab-content">
			
		</div>
	</div>
</template>

<script type="text/javascript">

	import Item from './tab-item.vue'

	export default {
		name: 'Nav-tab',
		props: ['tabList'],
		data () {
			return {
				activeIndex: 0,
			}
		},
		methods () {
			toggleActive:  (e) => {

			}
		},
		components: {
			Item,
			// tabPane
		}
	}
</script>

<style lang="less" scoped="">
	@import '../assets/styles/global.less';

	.tab-list {
	    height: 40px;
	    .border-bottom;
	    margin-bottom: 12px;
	    .tab-item {
		   	float: left;
		    padding: 10px 46px 9px;
	        color: @theme-color;
	    }
	    .active {
	      .border-bottom;
	      font-weight: bold;
	    }
  	}

  	.tab-content {
		height: 600px;
  	}
</style>