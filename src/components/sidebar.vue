<template>
	<div class="pull-left" id="sidebar">
		<ul id="sidebar-menu">
		    <li 
		    	 v-for="(item, index) in menuList" 
		    	:class="['menu-item', index === getOpenIndex ? 'open' : '']" 
		    	:key="item.id">	
		        <h2 
		        	class="menu-title" 
		        	:data-id="item.fid" 
		        	:data-type="item.isType"
		        	:data-index="index"
		        	@click="toggle"
	        	>{{ item.typeName }}</h2>

		        <div v-if="item.list.length" class="nav">
		            <router-link 
		            	v-for="subItem in item.list"
		            	:key="subItem.fid"
		            	:to="'/menu/' + subItem.fid"
		            	class="nav-link"
		            	:data-type="item.isType">
						{{ subItem.typeName }}
	            	</router-link>
		        </div>
		        <div v-else class="nav">
	            	<router-link
	            		:to="'/menu/' + item.fid"
						class="nav-link"
		            	:data-type="item.isType"
            		>{{ item.typeName }}</router-link>
		        </div>
		    </li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: "Sidebar",
		data () {
			return {
				
			}
		},
		props: {
			menuData: {
				type: Array,
				required: true
			}
		},
		computed: {
			getOpenIndex() {
				return this.$store.state.openIndex;
			},
			menuList() {
				return this.menuData;
			}
		},
		methods: {
			toggle (event) {
				var dataIndex = this.attr(event.target, 'data-index')

				this.$store.commit({
					type: "changeOpenIndex",
					openIndex: parseInt(dataIndex)
				})

				// 重置上次选中的子菜单项索引，默认不选中子菜单项
				// this.activeIndex = -1
			},
			attr (target, attr) {
				return target.getAttribute(attr);
			}
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
	      	display: none;
	        .nav-link {
	          display: block;
	          height: 40px;
	          line-height: 40px;
	          margin-bottom: 1px;
	          padding-left: 50px;
	          cursor: pointer;
	          background-color: #F2F2F2;
	        }
	        .router-link-active {
	          background-color: #CDDDD6;
	        }
	      }
	    }
	    .open {
	    	.nav {
	    		display: block;
	    	}
		    .menu-title {
		      background-color: #CDDDD6 !important;
		    }	    
		}
	  }
	}
</style>