<template>
	<div class="breadcrumb-wrapper">
		<span v-for="(breadcrumb, index) in breadcrumbs" class="location-item">
		<span v-if="index"> >> </span>
	 	{{ breadcrumb }}
	 </span>
	</div>
</template>

<style lang="less" scoped="">
	.breadcrumb-wrapper{
		display: inline-block;
	}
</style>

<script>
	export default {
		props: {
			breadcrumbs: {
				type: Array,
				required: true
			}
		}
	}
</script>