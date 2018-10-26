<template>
	<table class="table table-bordered table-striped">
		<!-- 注意：不要省略tbody标签，自定义的table标签浏览器不自动添加tbody -->
		<tbody>
			<tr>
				<th v-for="value in thead">{{ value }}</th>
			</tr>
			<tr v-for="(row, index) in newsList"  :key="row.id">
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
						@click="edit(row.id)"
					>编辑</span>

					<span 
						v-else-if="row.status === '1'"
						class="set" 
						@click="set"
					>设置</span>

					<span class="del" @click="del([row.id], [index])">删除</span>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script type="text/javascript">
	import axios from 'axios'

	export default {
		name: 'custom-table',
		props: {
			thead: {
				type: Object,
				required: true,
			},
			newDTOList: {
				type: Array,
				required: true,
			}
		},
		methods: {
			edit (id) {
				this.$store.commit({
					type: 'addBreadcrumb',
					breadcrumb: '编辑'
				})
				this.$router.push({path: '/admin/' + this.menuId + '/edit/' + id});
			},
			set () {

			},
			/**
			 * [del 删除新闻]
			 * @param  {[Array]} idArr    [新闻id]
			 * @param  {[Array]} indexArr [新闻数据在数组里的索引]
			 * @return {[type]}        	  [description]
			 */
			del (idArr, indexArr) {
				let self = this;
				self.$confirm('该新闻将被立即删除，删除后您不能撤销此操作！', '提示', {
					confirmButtonText: '确认删除',
					cancelButtonText: '取消',
					type: 'warning'
				})
				.then(() => {
					axios
					.post(this.baseUrl + '/admin/deleteByNewsId', {id: idArr})
					.then(res => {
						let data = res.data;
						if (data.status !== 1) {
							self.$message.error(data.message);
						} else {
							indexArr.forEach((index, i) => {
								self.newsList.splice(indexArr[i], 1);
							})
							self.$message({
								type: 'success',
								message: '删除成功！'
							})
						}
					})
					.catch(err => console.log(err));
				})
				.catch(() => {
					self.$message('已取消删除！')
				})
			}
 		},
 		computed: {
 			baseUrl() {
 				return this.$store.state.baseUrl;
 			},
 			menuId() {
 				return this.$store.state.menuId;
 			},
 			newsList() {
 				return this.newDTOList;
 			}
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