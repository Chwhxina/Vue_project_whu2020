<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            
            <el-form :model="createForm" ref="createForm" :rules="rules" class="createForm">
                <el-form-item label="工厂" prop="object">
                    <el-input v-model="createForm.object" placeholder="请输入工厂名"></el-input>
                </el-form-item>
                <el-form-item label="传感器编号" prop="sensorId">
                    <el-input v-model="createForm.sensorId" placeholder="请输入传感器编号"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="describe">
                    <el-input v-model="createForm.describe" placeholder="请输入描述信息"></el-input>
                </el-form-item>
                <el-form-item label="分值" prop="point">
                    <el-input v-model="createForm.point" placeholder="请输入分值(加分取正,扣分取负)"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('createForm')">提交</el-button>
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
/* 创建控件模板(记录添加) */
    import headTop from '../components/headTop'
    import {incCredit} from '@/api/getData'
    export default {
        data() {
            return {
                createForm: {
                    object:   '',
                    sensorId: '',
                    describe: '',
                    point:    ''
                },
                rules: {
                    object: [
                        { required: true, message: '请输入工厂名', trigger: 'blur' },
                    ],
                    sensorId: [
                        { required: true, message: '请输入传感器编号', trigger: 'blur' }
                    ],
                    describe: [
                        { required: true, message: '请输入描述信息', trigger: 'blur' }
                    ],
                    point:  [
                        { required: true, message: '请输入分值', trigger: 'blur' }
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
                        let res = await incCredit({object: this.createForm.object, sensorId: this.createForm.sensorId, describe: this.createForm.describe, point: this.createForm.point});
                        if (res.rspCode == '000000') {
                                this.$message({
                                type: 'success',
                                message: '提交成功'
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
	@import '../style/mixin';
    .table_container{
        padding: 20px;
        .wh(1220px, 600px);
    }
</style>
