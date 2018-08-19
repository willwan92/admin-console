<template>
	<div class="pull-left" id="sidebar">
		<ul id="sidebar-menu">
		    <!-- <li class="menu-item open">
		        <h2 class="menu-title 10" data-id="10" data-type="0">新闻管理</h2>
		        <ul class="nav" style="display: block;">
		            <li class="nav-link 1010" data-id="1010" data-type="0">新闻资讯</li>
		            <li class="nav-link 1050" data-id="1050" data-type="0">本地资讯</li>
		        </ul>
		    </li> -->
		    <li  v-for="(item, index) in menuData" :class="[index === 0 ? 'open' : '', 'menu-item']" :key="item.id">
		        <h2 class="menu-title" :data-id="item.fid" :data-type="item.isType">{{ item.typeName }}</h2>
		        <ul class="nav" style="display: block;">
		            <li v-for="(subItem, subIndex) in item.list" :class="[index === 0 && subIndex === 0 ? 'active' : '', 'nav-link']" :data-id="item.fid" :data-type="item.isType">{{ subItem.typeName }}</li>
		        </ul>
		    </li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: "Sidebar",
		props: {
			menuData: {
				type: Array,
				required: true
			}
		},
		methods: {
		}
	}
</script>

<style scoped lang="less">
	@import '../assets/styles/global.less';

	#sidebar {
	  position: fixed;
	  top: 80px;
	  left: 0;
	  z-index: 998;
	  width: @leftWidth;
	  height: 100%;
	  background-color: #fff;
	  color: @theme-color;
	  height: 100%;
	  border-right: 1px solid @theme-color;
	  #sidebar-menu {
	    .menu-item{
	      .menu-title {
	        height: 40px;
	        margin-top: 0;
	        margin-bottom: 1px;
	        line-height: 40px;
	        padding-left: 40px;
	        font-size: 14px;
	        font-weight: bold;
	        cursor: pointer;
	        background-color: #F2F2F2;
	      }
	      .nav {
	        .nav-link {
	          height: 40px;
	          line-height: 40px;
	          margin-bottom: 1px;
	          padding-left: 50px;
	          cursor: pointer;
	          background-color: #F2F2F2;
	        }
	        .active {
	          background-color: #CDDDD6;
	        }
	      }
	    }
	    .open {
	      .menu-title {
	        background-color: #CDDDD6 !important;
	      }
	    }
	  }
	}
</style>