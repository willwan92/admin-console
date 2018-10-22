<template>
	<table class="table table-bordered table-striped">
		<!-- 注意：不要省略tbody标签，自定义的table标签浏览器不自动添加tbody -->
		<tbody>
			<tr>
				<th v-for="value in thead">{{ value }}</th>
			</tr>
			<tr v-for="row in newsListObj.newDTOList"  :key="row.id">
				<td>
					<span v-if="row.status === '0'" class="text-danger">【草稿】</span>
					{{ row.newsTitle }}
				</td>
				<td>
					<span v-if="row.status === '0'" class="text-danger">上次编辑：{{ row.date }}</span>
					<span v-else>发布时间：{{ row.date }}</span>
				</td>
				<td>
					<span 
						v-if="row.status === '0'"
						class="edit"
						@click="edit"
					>编辑</span>

					<span 
						v-else-if="row.status === '1'"
						class="set" 
						@click="set"
					>设置</span>

					<span class="del" @click="del">删除</span>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script type="text/javascript">
	export default {
		name: 'custom-table',
		props: {
			thead: {
				type: Object,
				required: true,
			},
			newsListObj: {
				type: Object,
				required: true,
			}
		},
		methods: {
			edit () {

			},
			set () {

			},
			del () {

			}
 		},
		created () {

		}
	}
</script>

<style lang="less" scoped="">
	.edit,
    .set,
    .del {
      cursor: pointer;
    }

    .edit:hover {
      font-weight: bold;
    }

    .set:hover {
      font-weight: bold;
    }

    .del:hover {
      font-weight: bold;
      color: red;
    }
</style>