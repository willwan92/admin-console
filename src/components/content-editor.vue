<template>
	<div>
		编辑 {{getMenuId}}
	</div>
</template>

<script type="text/javascript">
	export default {
		name: 'content-editor',
		data () {
			return {
				
			}
		},
		computed: {
			getMenuId () {
				return this.$store.state.menuId;
			}
		}
	}
</script>