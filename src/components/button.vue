<template>
	<span class="btn">
		<slot></slot>
	</span>
</template>

<script>
	export default {
		name: 'Button'
	}
</script>

<style lang="less" scoped="">
	@import '../assets/styles/global.less';

	.btn {
      display: inline-block;
      text-align: center;
      color: #fff;
      cursor: pointer;
      background-color: @theme-color;
    }

    .btn-lg {
      margin-right: 20px;
      width: 80px;
      height: 35px;
      line-height: 35px;
    }
</style>