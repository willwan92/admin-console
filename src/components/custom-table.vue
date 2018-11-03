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
					<el-button 
						v-if="row.status === '0'"
						@click="edit(row.id)"
						type="text">编辑
					</el-button>

					<el-button 
						v-else-if="openIndex ===0 && row.status === '1'"
						type="text"
						@click="set(row.id)">设置
					</el-button>

					<el-button 
						type="text"
						@click="del([row.id], [index])">删除
					</el-button>
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
				this.$router.push({path: '/menu/' + this.menuId + '/edit/' + id});
			},
			set (id) {
				this.$emit('setDialog', id)
			},
			/**
			 * [del 删除新闻]
			 * @param  {[Array]} idArr    [新闻id]
			 * @param  {[Array]} indexArr [新闻数据在数组里的索引]
			 * @return {[type]}        	  [description]
			 */
			del (idArr, indexArr) {
				let pathUrl,
					self = this;
				if (self.openIndex === 2) {
					pathUrl = '/admin/deleteByTypicalId';
				} else {
					pathUrl = '/admin/deleteByNewsId';
				}
				self.$confirm('该条数据将被立即删除，删除后您不能撤销此操作！', '提示', {
					confirmButtonText: '确认删除',
					cancelButtonText: '取消',
					type: 'warning'
				})
				.then(() => {
					self.$axios
					.post(this.baseUrl + pathUrl, {id: idArr})
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
 			},
 			openIndex() {
 				return this.$store.state.openIndex;
 			}
 		}
	}
</script>