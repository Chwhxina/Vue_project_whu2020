<template>
  	<div class="register_page fillcontain">
	  	<transition name="form-fade" mode="in-out">
	  		<section class="form_contianer" v-show="showRegister">
                <div class="manage_tip" style="opacity: initial">
                    <p>账号注册</p>
                </div>

		    	<el-form :model="registerForm" :rules="rules" ref="registerForm">
					<el-form-item prop="username"  >
						<el-input placeholder="用户名" v-model="registerForm.username"><span></span></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input type="password" placeholder="密码" v-model="registerForm.password"></el-input>
					</el-form-item>
                    <el-form-item prop="confirm">
						<el-input type="password" placeholder="确认密码" v-model="registerForm.confirm"></el-input>
					</el-form-item>
                    <el-form-item prop="realname"  >
						<el-input placeholder="姓名" v-model="registerForm.realname"><span></span></el-input>
					</el-form-item>
                    <el-form-item prop="address"  >
						<el-input placeholder="地址" v-model="registerForm.address"><span></span></el-input>
					</el-form-item>
					<el-form-item>
				    	<el-button type="primary" @click="submitForm('registerForm')" class="submit_btn">注册</el-button>
				  	</el-form-item>
                    <p><router-link to="/login">返回</router-link></p>
				</el-form>
	  		</section>
	  	</transition>
  	</div>
</template>

<script>
	import {register} from '@/api/getData'
	import {mapActions, mapState} from 'vuex'
	import {mapMutations} from 'vuex';

	export default {
	    data(){
			return {
				registerForm: {
					username: '',
					password: '',
                    comfirm:  '',
                    realname: '',
                    address:  '',
				},
				rules: {
					username: [
			            { required: true, message: '请输入用户名', trigger: 'blur' },
			        ],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					],
                    comfirm:  [
			            { required: true, message: '请再次输入密码', trigger: 'blur' }, 
                        { 
                            validator: (rule, value, callback) => {
                                if (value === '') {
                                    callback(new Error('请再次输入密码'))
                                }
                                else if (value !== this.registerForm.password) {
                                    callback(new Error('两次输入密码不一致'))
                                }
                                else {
                                    callback()
                                }
                            },
                            trigger:'blur'
                        }
			        ],
					realname: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					],
                    address:  [
						{ required: true, message: '请输入地址', trigger: 'blur' }
					],
				},
				showRegister: false,
			}
		},
		mounted(){
			this.showRegister = true;
		},
		computed: {
		},
		methods: {
			//...mapMutations(['changeLogin']),
			async submitForm(formName) {
				let _this = this;
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						register({name: this.registerForm.username, password: this.registerForm.password, realname: this.registerForm.realname, address: this.registerForm.address})
						.then(res => {
							if (res.rspCode == '000000') {
									this.$message({
		                        	type: 'success',
		                        	message: '登录成功'
		                    	});
		                    	console.log(res.rspData.token);
		                    	//_this.changeLogin({ Authorization: res.rspData.token});
								//this.$router.push('login');
							} else {
								this.$message({
		                        	type: 'error',
		                        	message: res.rspMsg
		                    	});
							}
						});
					} else {
						this.$notify.error({
							title: '错误',
							message: '请输入正确的用户名密码',
							offset: 100
						});
						return false;
					}
				});
			},
		}
	}
</script>

<style lang="less" scoped>
	@import '../style/mixin';
	.register_page{
        background-image: url("../assets/img/background.jpeg");
	}
	.manage_tip{
		position: absolute;
		width: 100%;
		top: -100px;
		left: 0;
		p{
			font-size: 34px;
			color: #fff;
		}
	}
	.form_contianer{
		.wh(350px, 360px);
		.ctp(-500px, 220px);
		padding: 25px;
		border-radius: 5px;
		text-align: center;
		background-color: #dee0e0;
		.submit_btn{
			width: 100%;
			font-size: 16px;
		}
        //opacity: 30%;
	}
	.tip{
		font-size: 12px;
		color: red;
	}
	.form-fade-enter-active, .form-fade-leave-active {
	  	transition: all 1s;
	}
	.form-fade-enter, .form-fade-leave-active {
	  	transform: translate3d(0, -50px, 0);
	  	opacity: 0;
	}
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
</style>
