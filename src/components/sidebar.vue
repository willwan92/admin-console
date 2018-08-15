<template>
	<ul id="sidebar-menu">
	    {{#each body}}
	    <li class="menu-item">
	        <h2 class="menu-title {{fid}}" data-id="{{ fid }}" data-type="{{ isType }}">{{typeName}}</h2>
	        <ul class="nav">
	            {{#each list}}
	            <li class="nav-link {{fid}}" data-id="{{ fid }}" data-type="{{ isType }}">{{typeName}}</li>
	            {{/each}}
	        </ul>
	    </li>
	    {{/each}}
	</ul>
</template>

<script>
	
</script>

<style scoped lang="less">
	
</style>