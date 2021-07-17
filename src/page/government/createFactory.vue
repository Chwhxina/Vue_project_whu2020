<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            
            <el-form :model="createForm" ref="createForm" :rules="rules" class="createForm">
                <el-form-item label="账户" prop="object">
                    <el-input v-model="createForm.object" placeholder="请输入账户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
						<el-input type="password" placeholder="请输入密码" v-model="createForm.password"></el-input>
					</el-form-item>
                <el-form-item label="确认密码" prop="confirm">
                    <el-input type="password" placeholder="请再次输入密码" v-model="createForm.confirm"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="realname">
                    <el-input v-model="createForm.realname" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input v-model="createForm.address" placeholder="请输入地址"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('createForm')">创建</el-button>
                </el-form-item>
            </el-form>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="200"
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
/* 创建控件(工厂创建) */
    import headTop from '../../components/headTop'
    import {createFactory} from '@/api/getData'
    export default {
        data() {
            var validatePass = (rule, value, callback) => {
                if (value !== this.createForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } 
                else {
                    callback();
                }
            };
            return {
                createForm: {
                    object:   '',
                    password: '',
                    confirm:  '',
                    realname: '',
                    address:  ''
                },
                rules: {
                    object: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    confirm:  [
                        { required: true, message: '请再次输入密码', trigger: 'blur' }, 
                        { validator: validatePass, trigger: "blur" }
                    ],
                    realname: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ],
                    address:  [
                        { required: true, message: '请输入地址', trigger: 'blur' }
                    ],
                }
            }
        },
    	components: {
    		headTop,
    	},
        created() {
            this.initData();
        },
        methods: {
            //...mapMutations(['changeLogin']),
            async onSubmit(formName) {
                let _this = this;
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        let res = await createFactory({object: this.createForm.object, password: this.createForm.password, realname: this.createForm.realname, address: this.createForm.address});
                        if (res.rspCode == '000000') {
                                this.$message({
                                type: 'success',
                                message: '创建成功'
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
                    } 
                    else {
                        this.$notify.error({
                            title: '错误',
                            message: '请输入正确的账户信息',
                            offset: 100
                        });
                        return false;
                    }
                });
            },
        }
        /*---*/
    }
</script>

<style lang="less">
	@import '../../style/mixin';
    .table_container{
        padding: 20px;
        .wh(1220px, 600px);
    }
</style>
