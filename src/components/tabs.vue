<template>
	<div class="tabs">
		<div class="tab-list">
			<Item 
				v-for="(tab, index) in tabList"
				:key="index"
				:class="{active: index === activeIndex}"
				@click.native="clickTab(index);"
			>{{ tab.typeName }}</Item>
		</div>
	</div>
</template>

<script type="text/javascript">
	import Item from './tab-item.vue'

	export default {
		name: 'Nav-tab',
		props: {
			tabList: {
				type: Array,
				required: true
			},
			tabIndex: {
				type: Number
			}
		},
		components: {
			Item,
		},
		data () {
			return {
				activeIndex: this.tabIndex
			}
		},
		methods: {
			clickTab(index) {
				if (index !== this.activeIndex) {
					this.activeIndex = index;
					this.$emit('changeTab', this.activeIndex);
				}
			},
		},
		watch: {
			'tabIndex' () {
				this.activeIndex = this.tabIndex;
			}
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
	        cursor: pointer;
	    }
	    .active {
	      .border-bottom;
	      font-weight: bold;
	    }
  	}
</style>