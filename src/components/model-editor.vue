<template>
	<div>
		<!-- model：表单数据对象；rules：表单验证规则；-->
		<el-form class="editor-form" :model="modelForm" :rules="rules" ref="modelForm" label-width="180px">
			<!-- prop设置校验的字段名 -->
			<el-form-item prop="name" label="姓名">
				<el-input v-model="modelForm.name" placeholder="(必填)"></el-input>
			</el-form-item>
			<el-form-item prop="department" label="部门">
				<el-input v-model="modelForm.department"  placeholder="(必填)"></el-input>
			</el-form-item>
			<el-form-item prop="mainDeeds" label="主要事迹">
				<el-input v-model="modelForm.mainDeeds"  placeholder="(必填)"></el-input>
			</el-form-item>
			<el-form-item prop="picUrl" label="人物图片">
				<el-input 
					:readonly="false"
					v-model="modelForm.picUrl"
					@click.native="handlePicInput"
					:placeholder="picPlaceholder">
				</el-input>
				<input ref="picFile" type="file" @change="uploadPic" class="hidden">
			</el-form-item>
			<el-form-item prop="deedContent" label="人物介绍">
				<el-input 
				type="textarea" 
				v-model="modelForm.deedContent" 
				:autosize="{minRows:12}" 
				placeholder="（必填）可输入文字和图片，图片拖拽到目标位置即可..."></el-input>
			</el-form-item>
			<el-form-item>
				<el-button @click="saveModel">保存</el-button>
				<el-button @click="publishModel">发布</el-button>
			</el-form-item>
		</el-form>

	</div>
</template>

<script type="text/javascript">
	
	export default {
		name: 'model-editor',
		props: {
			newsData: {
				type: Object
			}
		},
		data () {
			return {
				id: '',
				picUrlShow: false,
				picPlaceholder: '（必填）点击上传图片  建议尺寸100*140，图片不超过5M',
				multipartFile: '',
				modelForm: {
					"fid": "",
					"name": "",
					"department": "",
					"mainDeeds": "",
					"picUrl": "",
					"deedContent": ""
				},
				rules: {
					fid: [{
						required: true
					}],
					name: [{
						required: true,
						message: '请输人物姓名',
						trigger: 'blur'
					}],
					department: [{
						required: true,
						message: '请输入部门',
						trigger: 'blur'
					}],
					mainDeeds: [{
						required: true,
						message: '请输主要事迹',
						trigger: 'blur'
					}],
					picUrl: [{
						required: true,
						message: '请选择图片',
						trigger: 'blur'
					}],
					deedContent: [{
						required: true,
						message: '请输人物介绍',
						trigger: 'blur'
					}],
				}
			}
		},
		created () {
			this.modelForm.fid = this.menuId;
		},
		beforeRouteEnter(to, from, next) {
			next(vm => {
				let id = to.params.id;
				// 编辑时
				if (id) {
					vm.id = id;
					vm.getModelById(id);
				}
			});
		},
		methods: {
			getModelById(id) {
				let self = this;

				self.$axios
				.get(this.baseUrl + '/admin/getTypicalById?newsId=' + id, {
					params: {
						timestamp: new Date().getTime()
					}
				})
				.then(res => {
					let data = res.data,
						body = data.body,
						modelForm = self.modelForm;
					if (data.status !== 1) {
						self.$message.error(data.message);
					} else {
						modelForm.name = body.name;
						modelForm.department = body.department;
						modelForm.mainDeeds = body.mainDeeds;
						modelForm.picUrl = body.picUrl;
						modelForm.deedContent = body.deedContent;
					}
				})
				.catch(err => console.log(err));
			},
			publishModel() {
				let self = this;

				// validate 对表单进行校验的方法，参数为一个回调函数(在校验结束后被调用)
				// 回调函数接受两个参数：是否校验成功和未通过校验的字段。
				// 若不传入回调函数，则会返回一个 promise
				self.$refs.modelForm.validate(valid => {
					if (!valid) return false; 

					self.$confirm('确认要发布吗?', '提示', {
						type: 'info',
						confirmButton: '确认发布',
						cancelButton: '取消'
					})
					.then(() => {
						// 编辑时
						if (self.id) self.modelForm.id = self.id;
						
						self.$axios
						.post(self.baseUrl + '/admin/publishTypical', self.modelForm)
						.then(res => {
							let data = res.data;
							if (data.status !== 1) {
								self.$message.error(data.message);
							} else {
								self.$message.success('发布成功');
							}
						})
						.then(() => {
							self.$router.push('/menu/' + self.menuId);
						})
						.catch(err => console.log(err));
					})
					.catch(() => {
						self.$message('已取消发布！')
					})
				})
			},
			saveModel() {
				let self = this;
				// validate 对表单进行校验的方法，参数为一个回调函数(在校验结束后被调用)
				// 回调函数接受两个参数：是否校验成功和未通过校验的字段。
				// 若不传入回调函数，则会返回一个 promise
				self.$refs.modelForm.validate((valid) => {
					if (valid) {
						let id = self.id ? '?id=' + self.id : '';

						self.$axios
						.post(self.baseUrl + "/admin/previewTypical" + id, self.modelForm)
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
			handlePicInput() {
				this.$refs.picFile.click();
			},
			uploadPic() {
				let self = this;
				let picFile = this.$refs.picFile;
				let formData = new FormData();

				formData.append('multipartFile', picFile.files[0]);

				self.$axios
				.post(this.baseUrl + '/img/upload', formData)
				.then((res) => {
					let data = res.data;
					if (data.status === 1) {
						self.modelForm.picUrl = data.body;
					    self.$message.success("图片上传成功");
					}
					else {
					    self.$message.error(data.message);
					}
				})
				.catch((err) => {
					console.log(err);
				})
			}
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

<style type="text/css">
.editor-form {
	padding-right: 100px;
}
</style>