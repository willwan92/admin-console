<template>
	<header id="header" class="">
		<a href="#" class="logo"><img src="../assets/imgs/logo.png" alt="logo"></a>
		<h1 class="title">新闻发布后台</h1>
		<div class="login-state">
			<span class="user">你好，<span class="user-name">管理员</span></span>
			<span class="login">请登录</span>
		</div>
	</header><!-- /header -->
</template>

<script>
	export default {
		name: "Header",
		data() {
			return {

			}
		}
	}
</script>

<style scoped="" lang="less">
	@import "../assets/styles/global.less";

	#header {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		width: 100%;
		height: 80px;
		color: #fff;
		background-color: @theme-color;
		.logo {
			position: relative;
			float: left;
			width: 200px;
			height: 100%;
			overflow: hidden;
			line-height: 80px;
			img {
			  .absolute-center;
			  width: 156px;
			  height: 58px;
			}
	    }
		.title {
			float: left;
			width: 280px;
			height: 28px;
			padding: 13px 0;
			font-weight: normal;
			font-size: 20px;
		}
		.login-state {
			float: right;
			width: 200px;
			padding:30px 20px;
			.login,
			.logout {
				padding-left: 10px;
			}
			.logout:hover {
				cursor: pointer;
			  	text-decoration: underline;
			}
		}
	}
</style>