<template>
	<div>
		编辑 {{getMenuId}}
	</div>
</template>

<script type="text/javascript">
	export default {
		name: 'content-editor',
		data () {

		},
		computed: {
			getMenuId () {
				return this.$state.menuId;
			}
		}
	}
</script>