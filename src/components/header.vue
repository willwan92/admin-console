<template>
	<header id="header" class="">
		<div class="left">
			<span class="logo">Admin Console</span>
			<span>=</span>
		</div>
		<div class="right user">
			管理员
		</div>
	</header><!-- /header -->
</template>

<script>
	export default {
		name: "Header"
	}
</script>

<style scoped="" lang="less">
	#header {
		height: 60px;
		background-color: #010101;
		color: #fff;
		.left {
			float: left;
		}
		.right {
			float: right;
		}
	}
</style>