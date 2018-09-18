<template>
	<span class="location-item"> {{ getLocation }}</span>
</template>

<style lang="less" scoped="">
	
</style>

<script>
	export default {
		computed: {
			getLocation () {
				const locations = {
					"1010" : "新闻资讯",
					"1050" : "本地资讯",
					"201"  : "通知公告",
					"202"  : "政策法规",
					"30"   : "先进典型"
				};

				return locations[this.$store.state.menuId];
			}
		}
	}
</script>