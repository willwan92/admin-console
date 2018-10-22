<template>
	<div class="tabs">
		<div class="tab-list">
			<Item 
				v-for="(tab, index) in tabList"
				:class="{active: index === activeIndex}"
				@click.native="clickTab(index);"
			>{{ tab.typeName }}</Item>
		</div>
		<div class="tab-content">
			<div class="tab-panel">
				<CustomTable :thead="thead" :newsListObj="newsListObj"/>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import axios from 'axios'

	import Item from './tab-item.vue'
	import CustomTable from './custom-table.vue'

	export default {
		name: 'Nav-tab',
		props: ['tabList'],
		components: {
			Item,
			CustomTable,
		},
		data () {
			return {
				activeIndex: 0,
				thead: {
					newsTitle: '标题', 
					date: '发布/编辑时间',
					status: '操作'
				},
				newsListObj: {},
			}
		},
		beforeCreated() {
			this.getNewsListObj(0)
		},
		methods: {
			clickTab(index) {
				this.activeIndex = index;
				
				this.getNewsListObj(index);
			},
			getNewsListObj(index) {
				let self = this,
					_state = this.$store.state,
					baseUrl = _state.baseUrl,
					menuId = _state.menuId,
					fid = this.tabList[index].fid;

				axios.get(baseUrl + '/admin/getNewsList', {
					params: {
						menuId: menuId,
						fid: fid,
					}
				})
				.then(function(res) {
					let data = res.data;
					if (data.status !== 1) {
						alert(data.message)
					}
					else {
						self.newsListObj = data.body.newsDTOList[index];
					}
				})
				.catch(function (err) {
					console.log(err);
				})
			}
		},
		computed: {

		},
		watch: {
			tabList: function () {
				this.activeIndex = 0;
				this.getNewsListObj(0);
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