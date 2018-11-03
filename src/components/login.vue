<template>
	<section class="login-container">
		<div class="login-wrapper">
	        <h2 class="login-title text-center">管理员登录</h2>
	        <form class="form-horizontal">
	            <div class="form-group">
	                <label for="userName" class="col-sm-3 control-label">账号</label>
	                <div class="div col-sm-8">
	                	<input 
	                		type="text" 
	                		class="form-control"  
	                		id="userName" 
	                		name="userName" 
	                		v-model="userName"
                		>
	                </div>
	            </div>
	            <div class="form-group">
	                <label for="password" class="col-sm-3 control-label">密码</label>
	                <div class="div col-sm-8">
	                	<input
	                		type="password" 
	                		class="form-control" 
	                		id="password" 
	                		name="password"
	                		v-model="password"
                		>
	                </div>
	            </div>
	            <div class="form-group text-center login-btn-wrapper">
	                <button
	                	type="submit" 
	                	class="btn btn-sm btn-green"
	                	id="login-btn"
	                	@click.prevent="loginSubmit"
                	>登 录</button>
	            </div>
	        </form>
	    </div>
	</section>
</template>

<script>

	export default {
		name: "Login",
		data() {
			return {
				userName: "",
				password: ""
			}
		},
		methods: {
			loginSubmit(event) {

	           	var self = this;
	            self.$axios({
	                method: 'post',
	                data: {
	                	userName: self.userName,
	                	password: self.password 
	                },
	                url: this.$store.state.baseUrl + '/admin/login',
	            })
	            .then(function (res) { //res包含了data和headers等等信息
	            	let data = res.data;
                    if (data.status === 1) {
                        sessionStorage.setItem('isLogin', true);
                        self.toggleLoginState();
                    }
                    else {
                        alert('错误：' + data.message);
                    }
                })
	        },
	        toggleLoginState() {
	        	this.$emit('toggleLoginState');
	        }
		}
	}
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
	    .login-btn-wrapper {
	      margin-top: 48px;
	      #login-btn {
	      	width: 120px;
	      	color: #fff;
	      }
	    }
	  }
	}
</style>