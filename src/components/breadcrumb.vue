<template>
	<div class="location">当前位置：
		<span class="location-item"> {{ getLocation }}</span>
	</div>
</template>

<style lang="less" scoped="">
	@import '../assets/styles/global.less';

	.location {
	    margin-bottom: 20px;
	    color: @muted-color;
	  }
</style>

<script>
	export default {
		props: ['menuId'],
		computed: {
			getLocation () {
				const locations = {
					"1010" : "新闻资讯",
					"1050" : "本地资讯",
					"201"  : "通知公告",
					"202"  : "政策法规",
					"30"   : "先进典型"
				};

				return locations[this.menuId];
			}
		}
	}
</script>