<template>
	<div>
		<!-- model：表单数据对象；rules：表单验证规则；-->
		<el-form class="editor-form" :model="newsForm" :rules="rules" ref="newsForm" label-width="180px">
			<!-- prop设置校验的字段名 -->
			<el-form-item prop="fid" label="新闻类型">
				<el-radio-group v-model="newsForm.fid">
					<el-radio-button 
						v-for="type in newsType" 
						:label="type.fid"
						:key="type.orderNum">
						{{ type.typeName }}
					</el-radio-button>
				</el-radio-group>
				<span class="text-muted">选择后，新闻会显示在相应的类型中</span>
			</el-form-item>
			<el-form-item prop="newsTitle" label="新闻标题">
				<el-input v-model="newsForm.newsTitle" placeholder="(必填)"></el-input>
			</el-form-item>
			<el-form-item prop="newsFrom" label="发布者">
				<el-input v-model="newsForm.newsFrom"></el-input>
			</el-form-item>
			<el-form-item prop="showPic" label="图片展示">
				<el-radio-group v-model="newsForm.showPic" @change="showPicChange">
					<el-radio-button label="0">不显示</el-radio-button>
					<el-radio-button label="1">轮播图</el-radio-button>
					<el-radio-button label="2">活动图片</el-radio-button>
					<el-radio-button label="3">横幅</el-radio-button>
				</el-radio-group>
				<span class="text-muted">设置图片在主页的展示位置，分别是轮播图、活动图片和横幅模块</span>
			</el-form-item>
			<el-form-item v-show="picUrlShow" prop="picUrl" label="图片上传">
				<el-input 
					:readonly="true"
					@click.native="handlePicInput"
					:placeholder="picPlaceholder">
				</el-input>
				<input ref="picFile" type="file" @change="uploadPic" class="hidden">
			</el-form-item>
			<el-form-item prop="newsContent" label="新闻正文">
				<el-input 
				type="textarea" 
				v-model="newsForm.newsContent" 
				:autosize="{minRows:12}" 
				placeholder="（必填）可输入文字和图片，图片拖拽到目标位置即可..."></el-input>
			</el-form-item>
			<el-form-item>
				<el-button @click.native="saveNews">保存</el-button>
				<el-button @click.native="publishNews">发布</el-button>
			</el-form-item>
		</el-form>

	</div>
</template>

<script type="text/javascript">
	import axios from 'axios'

	export default {
		name: 'content-editor',
		data () {
			return {
				id: '',
				newsType: [],
				picUrlShow: false,
				picPlaceholder: '（必填）点击上传图片  建议尺寸340*240，图片不超过5M',
				multipartFile: '',
				newsForm: {
					"fid": "",
					"newsTitle": "",
					"newsContent": "",
					"newsFrom": "",
					"picUrl": "",
					"showPic": "0"
				},
				rules: {
					fid: [{
						required: true,
						message: '请选择新闻类型',
						trigger: 'blur'
					}],
					newsTitle: [{
						required: true,
						message: '请输入新闻标题',
						trigger: 'blur'
					}],
					newsContent: [{
						required: true,
						message: '请输入新闻正文',
						trigger: 'blur'
					}],
					picUrl: [{
						required: false,
						message: '请选择图片',
						trigger: 'blur'
					}]
				}
			}
		},
		created() {
			this.getTypeByPid();
		},
		beforeRouteEnter(to, from, next) {
			next(vm => {
				let id = to.params.id;
				// 编辑时
				if (id) {
					vm.id = id;
					vm.getNewsById();
				}
			});
		},
		methods: {
			typeIndex() {
				let newsType = this.newsType;
				for(let i = 0, len = newsType.length; i < len; i++) {
					if (newsType[i].fid === this.newsForm.fid) {
						return i;
					}
				}
			},
			getNewsById() {
				let self = this;

				axios
					.get(this.baseUrl + '/admin/getNewsById?newsId=' + this.id)
					.then(res => {
						let data = res.data,
							body = data.body,
							newsForm = self.newsForm;
						if (data.status !== 1) {
							self.$message.error(data.message);
						} else {
							newsForm.fid = body.fid;
							newsForm.newsTitle = body.newsTitle;
							newsForm.newsContent = body.newsContent;
							newsForm.showPic = body.showPic;
							newsForm.picUrl = body.picUrl;
							newsForm.newsFrom = body.newsFrom;
						}
					})
					.catch(err => console.log(err));
			},
			publishNews() {
				let self = this;
				self.$confirm('你确认要发布此条新闻吗？', '提示', {
					type: 'info',
					confirmButtonText: '确认发布',
					cancelButtonText: '取消'
				})
				.then(() => {
					// validate 对表单进行校验的方法，参数为一个回调函数(在校验结束后被调用)
					// 回调函数接受两个参数：是否校验成功和未通过校验的字段。
					// 若不传入回调函数，则会返回一个 promise
					self.$refs.newsForm.validate((valid) => {
						if (valid) {
							if (self.id) self.newsForm.id = self.id;
							axios
								.post(self.baseUrl + "/admin/publishNews", self.newsForm)
								.then(res => {
									let data = res.data;
									if (data.status !== 1) {
										self.$message.error(data.message);
									} else {
										self.$message.success('发布成功');
									}
								})
								.then(() => {
									self.$router.push('/admin/' + self.menuId + '?tabIndex=' + self.typeIndex());
								})
								.catch(err => {
									console.log(err);
								})
						} else {
							return false;
						}
					})
				})
				.catch(() => {
					self.$message('已取消发布！')
				})
			},
			saveNews() {
				let self = this;
				// validate 对表单进行校验的方法，参数为一个回调函数(在校验结束后被调用)
				// 回调函数接受两个参数：是否校验成功和未通过校验的字段。
				// 若不传入回调函数，则会返回一个 promise
				self.$refs.newsForm.validate((valid) => {
					if (valid) {
						let id = self.id ? '?id=' + self.id : '';
						axios
							.post(self.baseUrl + "/admin/previewNews" + id, self.newsForm)
							.then(res => {
								let data = res.data;
								if (data.status !== 1) {
									self.$message.error(data.message);
								} else {
									self.id = data.body.id;
									self.$message.success('保存成功');
								}
							})
							.then()
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

				axios
				.post(this.baseUrl + '/img/upload', formData)
				.then((res) => {
					let data = res.data;
					if (data.status === 1) {
						self.newsForm.picUrl = data.body;
					    self.$message.success("图片上传成功");
					}
					else {
					    self.$message.error(data.message);
					}
				})
				.catch((err) => {
					console.log(err);
				})
			},
			getTypeByPid () {
				let self = this;

				let p = axios
					.get(this.baseUrl + '/admin/getTypeByPid?pid=' + this.menuId)
					.then((res) => {
						self.newsType = res.data.body.typeDTOList;
					})
					.catch(function (err) {
						console.log(err);
					});

				// 返回promise实例供依赖此异步操作结果的程序使用
				return p;
			},
			showPicChange(val) {
				if (val === '0') {
					this.picUrlShow = false;
					this.rules.picUrl[0].required = false;
				} else {
					this.picUrlShow = true;
					this.rules.picUrl[0].required = true;
					switch(val) {
						case '1':
							this.picPlaceholder = '（必填）点击上传图片  建议尺寸340*240，图片不超过5M';
							break;
						case '2':
							this.picPlaceholder = '（必填）点击上传图片  建议尺寸180*128，图片不超过5M';
							break;
						case '3':
							this.picPlaceholder = '（必填）点击上传图片  建议尺寸1000*100，图片不超过5M';
							break;
					}
				}
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