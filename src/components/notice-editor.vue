<template>
	<el-form :model="noticeForm" :rules="rules" ref="noticeForm" label-width="180px">
		<el-form-item label="标题" prop="newsTitle">
			<el-input v-model="noticeForm.newsTitle" placeholder="（ 必填 ）"></el-input>
		</el-form-item>
		<el-form-item label="发布者" prop="newsFrom">
			<el-input v-model="noticeForm.newsFrom"></el-input>
		</el-form-item>
		<el-form-item label="正文" prop="newsContent">
			<el-input 
				type="textarea" 
				v-model="noticeForm.newsContent" 
				:autosize="{minRows:12}" 
				placeholder="（必填）可输入文字和图片，图片拖拽到目标位置即可...">
			</el-input>
		</el-form-item>
		<el-form-item>
			<el-button @click="save">保存</el-button>
			<el-button @click="publish">发布</el-button>
		</el-form-item>
	</el-form>
</template>

<script type="text/javascript">
	export default {
		name: 'NoticeEditor',
		data() {
			return {
				id: '',
				noticeForm: {
					"fid": "",
					"newsTitle": "",
					"newsFrom": "",
					"showPic": "0",
					"newsContent": ""
				},
				rules: {
					"newsTitle": [{
						required: true,
						message: '请输入标题',
						trigger: 'blur'
					}],
					"newsFrom": [{
						required: false,
					}],
					"newsContent": [{
						required: true,
						message: '请输入正文',
						trigger: 'blur'
					}]
				}
			}
		},
		beforeRouteEnter(to, from, next) {
			next(vm => {
				let id = to.params.id;
				if (id) {
					vm.id = id;
					vm.getDataById(id);
				}
			})
		},
		created () {
			this.noticeForm.fid = this.menuId;
		},
		methods: {
			getDataById(id) {
				let self = this;

				self.$axios
				.get(this.baseUrl + '/admin/getNewsById', {
					params: {
						newsId: id,
						timestamp: new Date().getTime()
					}
				})
				.then(res => {
					let data = res.data,
						body = data.body,
						noticeForm = self.noticeForm;
					if (data.status !== 1) {
						self.$message.error(data.message);
					} else {
						noticeForm.newsTitle = body.newsTitle;
						noticeForm.newsContent = body.newsContent;
						noticeForm.newsFrom = body.newsFrom;
					}
				})
				.catch(err => console.log(err));
			},
			save() {
				let self = this;
				console.log(self)
				self.$refs.noticeForm.validate(valid => {
					if (valid) {
						let id = self.id ? '?id=' + self.id : '';
						self.$axios
							.post(self.baseUrl + "/admin/previewNews" + id, self.noticeForm)
							.then(res => {
								let data = res.data;
								if (data.status !== 1) {
									self.$message.error(data.message);
								} else {
									self.id = data.body.id;
									self.$message.success('保存成功');
								}
							})
							.catch(err => {
								console.log(err);
							})
					} else {
						return false;
					}
				})
			},
			publish() {
				let self = this;

				self.$refs.noticeForm.validate(valid => {
					if (!valid) return false; 

					self.$confirm('确认要发布吗?', '提示', {
						type: 'info',
						confirmButton: '确认发布',
						cancelButton: '取消'
					})
					.then(() => {

						// 编辑时
						if (self.id) self.noticeForm.id = self.id;

						self.$axios
						.post(self.baseUrl + '/admin/publishNews', self.noticeForm)
						.then(res => {
							let data = res.data;
							if (data.status !== 1) {
								self.$message.error(data.message);
							} else {
								self.$message.success('发布成功');
							}
						})
						.then(() => {
							self.$router.push('/menu/' + self.menuId)
						})
						.catch(err => console.log(err));
					})
					.catch(() => {
						self.$message('已取消发布！')
					})
				})

			},
		},
		computed: {
			baseUrl() {
				return this.$store.state.baseUrl;
			},
			menuId() {
				return this.$store.state.menuId;
			}
		}
	}
</script>