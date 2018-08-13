<template>
	<section class="login-container">
		<div class="login-wrapper">
		        <h2 class="login-title text-center">管理员登录</h2>
		        <form class="form-horizontal" id="loginForm" action="" method="post">
		            <div class="form-group">
		                <label for="userName" class="col-sm-3 control-label">账号</label>
		                <div class="div col-sm-8"><input type="text" class="form-control"  id="userName" name="userName"  placeholder=""></div>
		            </div>
		            <div class="form-group">
		                <label for="password" class="col-sm-3 control-label">密码</label>
		                <div class="div col-sm-8"><input type="password" class="form-control" id="password" name="password" placeholder=""></div>
		            </div>
		            <div class="form-group text-center login-btn">
		                <button id="login" type="submit" class="btn btn-sm btn-green" style="width: 120px; color: #fff;">登 录</button>
		            </div>
		        </form>
		    </div>
	</section>
</template>

<script>
	
</script>

<style scoped="" lang="less">
	@import '../assets/styles/global.less';

	.login-container {
	  width: 100%;
	  padding-top: 200px;
	  .login-wrapper {
	    width: 380px;
	    height: 310px;
	    padding: 30px 46px;
	    .border();
	    margin: 0 auto;
	    .login-title {
	      margin-top: 0px;
	      margin-bottom: 35px;
	      height: 28px;
	      line-height: 28px;
	      font-size: 20px;
	      color: @theme-color;
	    }
	    .control-label {
	      font-weight: normal;
	    }
	    .login-btn {
	      margin-top: 48px;
	    }
	  }
	}
</style>